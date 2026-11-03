/* BarMS Pro film player. The 58 MB portrait film is never fetched until a
   visitor presses play (preload="none", poster first). Chapters let people
   jump to a scene. Scenes marked `hold` (dashboard / profit figures) are
   skipped until reporting is verified (see src/config.mjs, flags). */
(function () {
  'use strict';
  var roots = Array.prototype.slice.call(document.querySelectorAll('[data-film]'));
  if (!roots.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); };

  function init(root) {
    var cfg = JSON.parse(root.getAttribute('data-config'));
    var chapters = cfg.chapters, reporting = cfg.reportingVerified;
    var video = root.querySelector('[data-film-video]');
    var poster = root.querySelector('[data-film-poster]');
    var playBtn = root.querySelector('[data-film-play]');
    var toggle = root.querySelector('[data-film-toggle]');
    var mute = root.querySelector('[data-film-mute]');
    var restart = root.querySelector('[data-film-restart]');
    var now = root.querySelector('[data-film-now]');
    var chBtns = Array.prototype.slice.call(root.querySelectorAll('[data-chapter]'));
    var loaded = false, timer = null;

    function holds() { return reporting ? [] : chapters.filter(function (c) { return c.hold; }); }
    function holdAt(t) { var h = holds(); for (var i = 0; i < h.length; i++) if (t >= h[i].start - 0.04 && t < h[i].end) return h[i]; return null; }
    function chapterAt(t) { for (var i = 0; i < chapters.length; i++) { var c = chapters[i]; if (!c.hold && t >= c.start && t < c.end) return c; } return null; }
    function ensure(cb) {
      if (loaded) { cb(); return; }
      loaded = true;
      video.poster = poster.getAttribute('src');
      video.src = root.getAttribute('data-src');
      video.hidden = false; poster.hidden = true;
      video.addEventListener('loadedmetadata', cb, { once: true });
      video.load();
      now.textContent = 'Loading…';
    }
    function label() {
      toggle.textContent = video.ended ? 'Replay' : (video.paused ? 'Play' : 'Pause');
      playBtn.hidden = !video.paused || video.currentTime > 0.2;
    }
    function guard() {
      var t = video.currentTime, h = holdAt(t);
      if (h) {
        if (h.end >= video.duration - 0.1) { video.pause(); video.currentTime = Math.max(0, h.start - 0.1); }
        else video.currentTime = h.end;
        return;
      }
      var c = chapterAt(t);
      chBtns.forEach(function (b) {
        var on = c && b.getAttribute('data-chapter') === c.id;
        if (on) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      now.textContent = (c ? c.title + ' · ' : '') + fmt(t) + ' / ' + fmt(video.duration || cfg.duration) + (video.muted ? ' · sound off' : '');
    }
    function startTimer() { stopTimer(); timer = setInterval(guard, 50); }
    function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
    function playFrom(t) {
      ensure(function () {
        var h = holdAt(t); if (h) t = h.end;
        video.currentTime = t;
        var p = video.play(); if (p && p.catch) p.catch(function () { label(); });
      });
    }
    function playChapter(id) { var c = chapters.filter(function (x) { return x.id === id; })[0]; if (c) playFrom(c.start); }
    root.__playChapter = playChapter;

    playBtn.addEventListener('click', function () { playFrom(loaded && !video.ended ? video.currentTime : 0); });
    toggle.addEventListener('click', function () {
      if (!loaded || video.ended) { playFrom(0); return; }
      if (video.paused) video.play(); else video.pause();
    });
    restart.addEventListener('click', function () { playFrom(0); });
    mute.addEventListener('click', function () {
      video.muted = !video.muted;
      mute.setAttribute('aria-pressed', video.muted ? 'true' : 'false');
      mute.textContent = video.muted ? 'Sound off' : 'Sound on';
      guard();
    });
    chBtns.forEach(function (b) { b.addEventListener('click', function () { playChapter(b.getAttribute('data-chapter')); }); });
    video.addEventListener('play', function () { startTimer(); label(); });
    video.addEventListener('pause', function () { stopTimer(); guard(); label(); });
    video.addEventListener('ended', function () { stopTimer(); label(); });
    video.addEventListener('seeking', function () { var h = holdAt(video.currentTime); if (h && h.end < video.duration - 0.1) video.currentTime = h.end; });
    video.addEventListener('error', function () { now.textContent = 'The film could not be loaded.'; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) { if (!en[0].isIntersecting && !video.paused) video.pause(); }, { threshold: 0.05 }).observe(root);
    }
  }
  roots.forEach(init);

  document.addEventListener('click', function (e) {
    var j = e.target.closest('[data-film-jump]'); if (!j) return;
    var root = roots[0];
    root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    setTimeout(function () { root.__playChapter(j.getAttribute('data-film-jump')); }, reduce ? 0 : 450);
  });
})();
