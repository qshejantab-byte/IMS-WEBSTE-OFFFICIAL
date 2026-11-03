/* BarMS Pro page: the "one sale" sequence and the offline simulation. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* one sale, everything updated */
  var os = $('[data-onesale]');
  if (os) {
    var nodes = $$('[data-node]', os), core = $('[data-core]', os), btn = $('[data-onesale-run]', os), timers = [];
    var setAll = function (on) { nodes.forEach(function (n) { n.classList.toggle('on', on); }); };
    var run = function () {
      timers.forEach(clearTimeout); timers = [];
      setAll(false); core.classList.remove('fired'); void core.offsetWidth; core.classList.add('fired');
      nodes.forEach(function (n, i) { timers.push(setTimeout(function () { n.classList.add('on'); }, 420 + i * 260)); });
    };
    if (reduce) setAll(true);
    else {
      os.classList.add('is-armed');
      new IntersectionObserver(function (en, io) { if (en[0].isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.45 }).observe(os);
    }
    btn.addEventListener('click', function () {
      if (reduce) { setAll(false); setTimeout(function () { setAll(true); }, 120); } else run();
    });
  }

  /* offline simulation */
  var od = $('[data-offdemo]');
  if (od) {
    var sw = $('[data-net]', od), swl = $('[data-net-label]', od), sell = $('[data-sell]', od), stat = $('[data-offstatus]', od), q = $('[data-queue]', od);
    var online = true, n = 0, off = 0, pending = [], syncing = false;
    var row = function (text, state, cls) {
      var li = document.createElement('li');
      li.className = 'offdemo__row ' + (cls || '');
      li.innerHTML = '<span class="mono"></span><span class="st"></span>';
      li.firstChild.textContent = text; li.lastChild.textContent = state;
      q.insertBefore(li, q.firstChild);
      while (q.children.length > 7) q.removeChild(q.lastChild);
      return li;
    };
    var setNet = function (v) {
      if (syncing) return;
      online = v; sw.setAttribute('aria-checked', v ? 'true' : 'false'); swl.textContent = v ? 'On' : 'Off';
      if (!v) { stat.textContent = 'Offline. The main device keeps selling; orders are saved on the device and numbered OFF-0001, OFF-0002…'; return; }
      if (!pending.length) { stat.textContent = 'Online. Orders are saved to the server as they happen.'; return; }
      syncing = true; sell.disabled = true;
      stat.textContent = 'Back online. Uploading ' + pending.length + ' offline order' + (pending.length > 1 ? 's' : '') + ', oldest first…';
      var list = pending.slice(); pending = [];
      var i = 0;
      (function next() {
        if (i >= list.length) {
          syncing = false; sell.disabled = false;
          stat.textContent = list.length + ' offline order' + (list.length > 1 ? 's' : '') + ' uploaded, oldest first. No duplicates.';
          return;
        }
        var li = list[i++]; li.querySelector('.st').textContent = 'Uploaded'; li.classList.add('done');
        setTimeout(next, reduce ? 0 : 520);
      })();
    };
    sw.addEventListener('click', function () { setNet(!online); });
    sell.addEventListener('click', function () {
      if (online) { n++; row('Order ' + n, 'Saved to server', 'done'); }
      else {
        off++;
        var li = row('OFF-' + ('000' + off).slice(-4), 'Saved on device'); pending.push(li);
        stat.textContent = pending.length + ' order' + (pending.length > 1 ? 's' : '') + ' waiting on this device. Selling continues.';
      }
    });
  }
})();
