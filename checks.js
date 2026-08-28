/* Smallest thing that fails if the page logic breaks.
   Run: open the site, then paste this file into the browser console
   (or temporarily add <script src="checks.js"></script> after main.js). */
(() => {
  const fails = [];
  const check = (name, cond) => { if (!cond) fails.push(name); };

  // carousel: exactly one quote visible, next/prev cycle and wrap.
  // Blog pages have no carousel, so this block is skipped rather than failed.
  const quotes = [...document.querySelectorAll('[data-quote]')];
  if (quotes.length > 1) {
    const shown = () => quotes.findIndex(q => !q.hidden);
    check('one quote visible at rest', quotes.filter(q => !q.hidden).length === 1);

    const start = shown();
    document.querySelector('[data-quote-next]').click();
    check('next advances', shown() === (start + 1) % quotes.length);
    quotes.forEach(() => document.querySelector('[data-quote-next]').click());
    check('next wraps to the same slide after a full lap', shown() === (start + 1) % quotes.length);
    document.querySelector('[data-quote-prev]').click();
    check('prev goes back', shown() === start);
  }

  // mobile nav toggle keeps aria-expanded honest
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  toggle.click();
  check('nav opens', nav.classList.contains('is-open') && toggle.getAttribute('aria-expanded') === 'true');
  toggle.click();
  check('nav closes', !nav.classList.contains('is-open') && toggle.getAttribute('aria-expanded') === 'false');

  // the stories row is meant to overflow its own box, never the page
  const d = document.documentElement;
  check('no horizontal page overflow', d.scrollWidth <= d.clientWidth);

  // every referenced asset actually resolved
  const broken = [...document.images].filter(i => !i.complete || i.naturalWidth === 0);
  check('no broken images: ' + broken.map(i => i.getAttribute('src')).join(', '), broken.length === 0);

  // the marquee translates -50%, which only loops seamlessly on identical halves
  const sets = document.querySelectorAll('.logos__set');
  if (sets.length) check('logo ticker halves match', sets.length === 2 && sets[0].children.length === sets[1].children.length);

  // every internal link resolves to a file that exists
  const links = [...document.querySelectorAll('a[href]')]
    .map(a => a.getAttribute('href'))
    .filter(h => h && !/^(#|mailto:|tel:|https?:)/.test(h));
  Promise.all([...new Set(links)].map(h =>
    fetch(h, { method: 'HEAD' }).then(r => (r.ok ? null : h)).catch(() => h)
  )).then(bad => {
    const dead = bad.filter(Boolean);
    console[dead.length ? 'error' : 'log'](
      dead.length ? 'DEAD LINKS: ' + dead.join(', ') : 'All internal links resolve.'
    );
  });

  console[fails.length ? 'error' : 'log'](
    fails.length ? 'FAIL:\n- ' + fails.join('\n- ') : 'All checks passed.'
  );
  return fails.length === 0;
})();
