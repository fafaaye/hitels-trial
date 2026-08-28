// ponytail: three small behaviours, no framework. <details> already handles the FAQ.

// ── mobile nav ──────────────────────────────────────────────
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
});

// ── testimonial carousel ────────────────────────────────────
const quotes = [...document.querySelectorAll('[data-quote]')];
if (quotes.length > 1) {
  let i = quotes.findIndex(q => !q.hidden);
  if (i < 0) i = 0;

  const show = next => {
    i = (next + quotes.length) % quotes.length;
    quotes.forEach((q, n) => { q.hidden = n !== i; });
  };

  show(i);
  document.querySelector('[data-quote-prev]')?.addEventListener('click', () => show(i - 1));
  document.querySelector('[data-quote-next]')?.addEventListener('click', () => show(i + 1));
}

// ── ticker width guard ──────────────────────────────────────
// The marquee translates by -50%, which only lines up if both logo
// sets are identical — assert it rather than debug a visible jump later.
const sets = document.querySelectorAll('.logos__set');
if (sets.length === 2 && sets[0].children.length !== sets[1].children.length) {
  console.warn('Logo ticker sets differ in length — the marquee loop will jump.');
}
