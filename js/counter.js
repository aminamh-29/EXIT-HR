document.querySelectorAll('[data-count]').forEach(el => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  let started = false;

  const run = () => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) { started = true; run(); obs.disconnect(); }
    });
  }, { threshold: 0.4 }).observe(el);
});
