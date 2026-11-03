/* IMS motion layer: network canvas, split headline, scroll-filled statement,
   scroll progress, timeline, magnetic buttons, card spotlight, floating action.
   Everything is optional polish: content is complete without it, and
   reduced-motion users get the finished state with no movement. */
(function () {
  'use strict';
  var doc = document;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ── split headline into masked words ── */
  function splitInto(node, counter) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = doc.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(' ')); return; }
          var w = doc.createElement('span'); w.className = 'w';
          var i = doc.createElement('span'); i.textContent = part; i.style.setProperty('--i', counter.n++);
          w.appendChild(i); frag.appendChild(w);
        });
        node.replaceChild(frag, n);
      } else if (n.nodeType === 1) splitInto(n, counter);
    });
  }
  $$('[data-split]').forEach(function (el) {
    if (reduce) return;
    splitInto(el, { n: 0 });
    el.classList.add('is-split');
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add('in'); }); });
  });

  /* ── statement: words fill in as it scrolls through ── */
  $$('[data-fill]').forEach(function (el) {
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function (w) { return '<span class="fw" aria-hidden="true">' + w + '</span>'; }).join(' ');
    var spans = $$('.fw', el);
    if (reduce) { spans.forEach(function (s) { s.classList.add('on'); }); return; }
    function upd() {
      var r = el.getBoundingClientRect(), vh = window.innerHeight;
      var p = clamp((vh * 0.82 - r.top) / (r.height + vh * 0.32), 0, 1);
      var n = Math.round(p * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle('on', i < n); });
    }
    window.addEventListener('scroll', upd, { passive: true }); window.addEventListener('resize', upd); upd();
  });

  /* ── back to top ── */
  $$('[data-top]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); }); });

  /* ── progress bar, floating action, timeline ── */
  var bar = doc.querySelector('[data-progress]');
  var fab = doc.querySelector('[data-fab]');
  var tl = doc.querySelector('[data-timeline]');
  function onScroll() {
    var y = window.scrollY, h = doc.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    if (fab) fab.classList.toggle('is-on', y > 600 && y < h - 500);
    if (tl) {
      var r = tl.getBoundingClientRect(), vh = window.innerHeight;
      tl.style.setProperty('--p', clamp((vh * 0.6 - r.top) / r.height, 0, 1).toFixed(3));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll); onScroll();

  /* ── magnetic buttons + card spotlight (fine pointers only) ── */
  if (fine && !reduce) {
    $$('[data-magnet]').forEach(function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.2).toFixed(1) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
    $$('.fx-card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ── hero arc: product cards travel along a curve ── */
  $$('[data-arc]').forEach(function (arc) {
    var cards = $$('.arc__card', arc), items = [], total = 0, W = 0, H = 0, off = 0, last = 0, hover = false, vis = true;
    function measure() {
      W = arc.clientWidth; H = arc.clientHeight;
      var base = W < 600 ? W * 0.46 : clamp(W * 0.2, 150, 300), gap = clamp(W * 0.018, 14, 30);
      total = 0;
      items = cards.map(function (c) {
        var w = c.classList.contains('arc__card--phone') ? base * 0.58 : base;
        var h = c.classList.contains('arc__card--phone') ? base * 1.02 : base * 0.74;
        c.style.width = w + 'px'; c.style.height = h + 'px';
        var it = { el: c, w: w, h: h, x: total };
        total += w + gap; return it;
      });
    }
    function place() {
      var half = W / 2, depth = H * 0.55;
      items.forEach(function (it) {
        var x = ((it.x - off) % total + total) % total;
        if (x > total - it.w - 40) x -= total;           // wrap the tail to the left edge
        var cx = x + it.w / 2 - half, n = cx / half;
        var y = n * n * depth;
        it.el.style.transform = 'translate3d(' + (x) + 'px,' + y.toFixed(1) + 'px,0) rotate(' + (n * 20).toFixed(2) + 'deg)';
        it.el.style.zIndex = String(100 - Math.round(Math.abs(n) * 50));
      });
    }
    function tick(t) {
      requestAnimationFrame(tick);
      var dt = Math.min(t - last, 64) / 1000; last = t;
      if (!vis || hover || reduce) return;
      off += dt * 34; place();
    }
    measure(); off = total * 0.12; place();
    arc.classList.add('is-ready');
    if (!reduce) {
      requestAnimationFrame(tick);
      arc.addEventListener('pointerenter', function () { hover = true; });
      arc.addEventListener('pointerleave', function () { hover = false; });
      new IntersectionObserver(function (en) { vis = en[0].isIntersecting; }, { threshold: 0.01 }).observe(arc);
    }
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { measure(); place(); }, 120); });
  });

  /* ── services list: art preview follows the pointer ── */
  $$('[data-peek]').forEach(function (list) {
    if (!fine || reduce) return;
    var peekEl = list.parentNode.querySelector('.sl__peek'); if (!peekEl) return;
    var arts = $$('.sl__art', peekEl);
    list.addEventListener('pointermove', function (e) {
      var a = e.target.closest('a[data-i]'); if (!a) { peekEl.classList.remove('on'); return; }
      var i = a.getAttribute('data-i');
      arts.forEach(function (x) { x.classList.toggle('on', x.getAttribute('data-i') === i); });
      peekEl.style.left = (e.clientX + 40) + 'px'; peekEl.style.top = (e.clientY - 20) + 'px';
      peekEl.classList.add('on');
    });
    list.addEventListener('pointerleave', function () { peekEl.classList.remove('on'); });
  });

  /* ── gentle image parallax ── */
  var par = $$('[data-parallax]');
  if (par.length && !reduce) {
    var pt = false;
    var pu = function () {
      pt = false;
      var vh = window.innerHeight;
      par.forEach(function (el) {
        var r = el.parentNode.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var d = (r.top + r.height / 2 - vh / 2) / vh;
        el.style.transform = 'translate3d(0,' + (d * -90).toFixed(1) + 'px,0) scale(1.18)';
      });
    };
    window.addEventListener('scroll', function () { if (!pt) { pt = true; requestAnimationFrame(pu); } }, { passive: true });
    pu();
  }

  /* ── network canvas (hero and page heroes) ── */
  $$('.phero, .bhero, .hhero, .cx, .pg').forEach(function (h) {
    if (h.querySelector('canvas[data-field]')) return;
    var c = doc.createElement('canvas'); c.className = 'net'; c.setAttribute('data-field', ''); c.setAttribute('aria-hidden', 'true');
    h.insertBefore(c, h.firstChild);
  });
  $$('canvas[data-field]').forEach(function (cv) {
    var ctx = cv.getContext('2d'), host = cv.parentNode;
    var W = 0, H = 0, dpr = 1, nodes = [], mouse = { x: -999, y: -999 }, running = !reduce, raf = 0;
    function size() {
      var r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + 'px'; cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(clamp(W * H / 16000, 26, 80));
      nodes = [];
      for (var i = 0; i < n; i++) nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, r: Math.random() * 1.4 + 0.8, gold: Math.random() < 0.14 });
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var L = 130, i, j, a, b, dx, dy, d;
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (running) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > W) a.vx *= -1; if (a.y < 0 || a.y > H) a.vy *= -1;
          dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) { a.x += dx / d * 0.7; a.y += dy / d * 0.7; }
        }
      }
      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j]; dx = a.x - b.x; dy = a.y - b.y; d = dx * dx + dy * dy;
          if (d < L * L) {
            var al = (1 - Math.sqrt(d) / L) * 0.22;
            ctx.strokeStyle = (a.gold || b.gold) ? 'rgba(201,169,107,' + al * 1.3 + ')' : 'rgba(174,181,192,' + al * 1.6 + ')';
            ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        ctx.fillStyle = a.gold ? 'rgba(201,169,107,.85)' : 'rgba(200,206,216,.7)';
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, 6.283); ctx.fill();
      }
    }
    function loop() { raf = requestAnimationFrame(loop); if (running) draw(); }
    size(); draw();
    if (!reduce) {
      raf = requestAnimationFrame(loop);
      new IntersectionObserver(function (en) { running = en[0].isIntersecting; }, { threshold: 0.02 }).observe(host);
      doc.addEventListener('visibilitychange', function () { if (doc.hidden) running = false; });
      if (fine) {
        host.addEventListener('pointermove', function (e) { var r = host.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
        host.addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
      }
    }
    var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { size(); draw(); }, 150); });
  });
})();
