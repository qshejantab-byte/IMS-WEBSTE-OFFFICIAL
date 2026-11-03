/* IMS site behaviour: navigation, mega-menu, accordions, tabs, reveal, enquiry forms.
   No dependencies. Everything degrades to plain HTML without JS. */
(function () {
  'use strict';
  window.__imsReady = true;
  var doc = document;
  var $ = function (s, r) { return (r || doc).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── header scroll state ── */
  var header = $('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── mega menus (Products, Services) ── */
  var triggers = $$('[data-mega-trigger]');
  var megaTimer;
  function panelOf(t) { return doc.getElementById(t.getAttribute('aria-controls')); }
  function closeAll(except) {
    triggers.forEach(function (t) { if (t !== except) { t.setAttribute('aria-expanded', 'false'); panelOf(t).hidden = true; } });
  }
  function megaOpen(t, open, focusTrigger) {
    if (open) closeAll(t);
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
    panelOf(t).hidden = !open;
    if (!open && focusTrigger) t.focus();
  }
  if (triggers.length && header) {
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    triggers.forEach(function (t) {
      var p = panelOf(t);
      t.addEventListener('click', function () { megaOpen(t, p.hidden); });
      if (canHover) {
        var enter = function () { clearTimeout(megaTimer); if (p.hidden) megaOpen(t, true); };
        var leave = function () { clearTimeout(megaTimer); megaTimer = setTimeout(function () { megaOpen(t, false); }, 170); };
        t.addEventListener('mouseenter', enter); p.addEventListener('mouseenter', enter);
        t.addEventListener('mouseleave', leave); p.addEventListener('mouseleave', leave);
      }
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      triggers.forEach(function (t) { if (!panelOf(t).hidden) megaOpen(t, false, true); });
    });
    doc.addEventListener('click', function (e) {
      if (!header.contains(e.target)) closeAll();
      else triggers.forEach(function (t) { if (!panelOf(t).hidden && !panelOf(t).contains(e.target) && !t.contains(e.target)) megaOpen(t, false); });
    });
    header.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !header.contains(e.relatedTarget)) closeAll();
    });
  }

  /* ── mobile nav ── */
  var burger = $('[data-burger]');
  var mnav = $('[data-mnav]');
  function mnavOpen(open) {
    if (!burger || !mnav) return;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mnav.hidden = !open;
    doc.body.style.overflow = open ? 'hidden' : '';
    doc.documentElement.classList.toggle('menu-open', open);
  }
  if (burger && mnav) {
    burger.addEventListener('click', function () { mnavOpen(mnav.hidden); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mnav.hidden) { mnavOpen(false); burger.focus(); } });
    window.matchMedia('(min-width: 1081px)').addEventListener('change', function (e) { if (e.matches) mnavOpen(false); });
    $$('[data-mnav-acc]').forEach(function (b) {
      b.addEventListener('click', function () {
        var sub = doc.getElementById(b.getAttribute('aria-controls'));
        var open = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        sub.hidden = !open;
      });
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', function () { mnavOpen(false); }); });
  }

  /* ── accordions ── */
  $$('[data-acc]').forEach(function (acc) {
    var btns = $$('.acc__btn', acc);
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = doc.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.classList.toggle('open', open);
      });
      btn.addEventListener('keydown', function (e) {
        var i = btns.indexOf(btn), n = btns.length, t = null;
        if (e.key === 'ArrowDown') t = btns[(i + 1) % n];
        else if (e.key === 'ArrowUp') t = btns[(i - 1 + n) % n];
        else if (e.key === 'Home') t = btns[0];
        else if (e.key === 'End') t = btns[n - 1];
        if (t) { e.preventDefault(); t.focus(); }
      });
    });
  });

  /* ── tabs ── */
  $$('[data-tabs]').forEach(function (root) {
    var tabs = $$('[role="tab"]', root);
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        var p = doc.getElementById(t.getAttribute('aria-controls'));
        if (p) p.hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = tabs.length, j = null;
        if (e.key === 'ArrowRight') j = (i + 1) % n;
        else if (e.key === 'ArrowLeft') j = (i - 1 + n) % n;
        else if (e.key === 'Home') j = 0;
        else if (e.key === 'End') j = n - 1;
        if (j !== null) { e.preventDefault(); select(tabs[j], true); }
      });
    });
  });

  /* ── reveal on scroll ── */
  var rv = $$('.rv');
  if (rv.length) {
    if (reduce || !('IntersectionObserver' in window)) {
      rv.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      rv.forEach(function (el) { io.observe(el); });
    }
  }

  /* ── enquiry forms ── */
  $$('[data-enquiry]').forEach(function (form) {
    var endpoint = form.getAttribute('data-endpoint');
    var mailto = form.getAttribute('data-mailto');
    var status = $('[data-status]', form);
    var submit = $('[type="submit"]', form);
    var submitLabel = submit.innerHTML;
    var radios = $$('input[name="topic"]', form);
    var groups = $$('[data-for]', form);

    function currentTopic() { var c = radios.filter(function (r) { return r.checked; })[0]; return c ? c.value : ''; }
    function applyTopic() {
      var t = currentTopic();
      groups.forEach(function (g) {
        var show = g.getAttribute('data-for').split(' ').indexOf(t) !== -1;
        g.hidden = !show;
        $$('input,select,textarea', g).forEach(function (f) { f.disabled = !show; });
      });
      var q = $('[data-topic-title]', form);
      var picked = radios.filter(function (r) { return r.checked; })[0];
      if (q && picked) q.textContent = picked.getAttribute('data-label');
    }
    var param = new URLSearchParams(location.search).get('topic');
    var match = radios.filter(function (r) { return r.value === param; })[0];
    if (match) match.checked = true;
    else if (!currentTopic() && radios[0]) radios[0].checked = true;
    radios.forEach(function (r) { r.addEventListener('change', applyTopic); });
    applyTopic();

    function fieldOf(el) { return el.closest('.field'); }
    function setErr(el, msg) {
      var f = fieldOf(el); if (!f) return;
      var e = $('.err', f);
      if (msg) { f.setAttribute('data-invalid', ''); el.setAttribute('aria-invalid', 'true'); if (e) e.textContent = msg; }
      else { f.removeAttribute('data-invalid'); el.removeAttribute('aria-invalid'); }
    }
    function validateField(el) {
      if (el.disabled) return true;
      var v = (el.type === 'checkbox') ? el.checked : el.value.trim();
      if (el.required && !v) { setErr(el, el.getAttribute('data-msg') || 'This field is required.'); return false; }
      if (el.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { setErr(el, 'Enter a valid email address.'); return false; }
      if (el.type === 'tel' && v && !/^[+\d][\d\s().-]{6,}$/.test(v)) { setErr(el, 'Enter a valid phone number.'); return false; }
      setErr(el, null); return true;
    }
    $$('input:not([type=radio]),select,textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value || el.type === 'checkbox') validateField(el); });
      el.addEventListener('input', function () { if (fieldOf(el) && fieldOf(el).hasAttribute('data-invalid')) validateField(el); });
    });

    function say(kind, html) {
      status.hidden = false; status.setAttribute('data-kind', kind); status.innerHTML = html;
      status.focus();
    }
    function summary() {
      var lines = [];
      $$('input,select,textarea', form).forEach(function (el) {
        if (el.disabled || !el.name || el.name === 'company_website' || el.type === 'submit') return;
        if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;
        if (el.name === 'consent') return;
        var lab = (el.getAttribute('data-label') || el.name) + ': ' + el.value;
        if (el.value) lines.push(lab);
      });
      return lines.join('\n');
    }
    function fallbackHtml() {
      var h = '<p><strong>Your enquiry was not sent.</strong> The form could not reach our server.</p>' +
        '<p>Your details are still on this page. You can copy them and send them another way once IMS shares a contact address.</p>' +
        '<p><button type="button" class="btn btn--ghost btn--sm" data-copy>Copy my enquiry</button></p>';
      if (mailto) h += '<p><a class="link" href="mailto:' + mailto + '?subject=' + encodeURIComponent('Enquiry') + '&body=' + encodeURIComponent(summary()) + '">Send by email instead</a></p>';
      return h;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.hidden = true;
      var bad = [];
      $$('input:not([type=radio]),select,textarea', form).forEach(function (el) { if (!validateField(el)) bad.push(el); });
      if (bad.length) {
        say('error', '<p><strong>Please check ' + bad.length + (bad.length === 1 ? ' field' : ' fields') + ' below.</strong></p>');
        var first = bad[0]; setTimeout(function () { first.focus(); }, 0);
        return;
      }
      var data = new FormData(form);
      var picked = radios.filter(function (r) { return r.checked; })[0];
      data.set('topic_label', picked ? picked.getAttribute('data-label') : '');
      data.set('page', location.pathname);
      submit.setAttribute('aria-busy', 'true'); submit.disabled = true; submit.textContent = 'Sending…';
      var ctrl = new AbortController(); var to = setTimeout(function () { ctrl.abort(); }, 15000);
      fetch(endpoint, { method: 'POST', body: data, signal: ctrl.signal, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok || !res.j || !res.j.ok) {
            var msg = res.j && res.j.errors ? Object.keys(res.j.errors).map(function (k) { return res.j.errors[k]; }).join(' ') : '';
            say('error', '<p><strong>We could not send your enquiry.</strong> ' + (msg || 'Please try again in a moment.') + '</p>' + (msg ? '' : fallbackHtml()));
            return;
          }
          say('ok', '<p><strong>Thank you. Your enquiry has been received.</strong></p><p>Your reference is <span class="mono">' + res.j.reference + '</span>. A member of the IMS team will review it and get back to you.</p>');
          form.reset(); applyTopic();
          if (match) match.checked = true;
        })
        .catch(function () { say('error', fallbackHtml()); })
        .then(function () { clearTimeout(to); submit.removeAttribute('aria-busy'); submit.disabled = false; submit.innerHTML = submitLabel; });
    });

    status.addEventListener('click', function (e) {
      if (e.target.matches('[data-copy]')) {
        var txt = summary();
        (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(function () { e.target.textContent = 'Copied'; }, function () {
          var ta = doc.createElement('textarea'); ta.className = 'textarea'; ta.readOnly = true; ta.value = txt; e.target.parentNode.appendChild(ta); ta.select();
        });
      }
    });
  });
})();
