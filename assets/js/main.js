// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
const sections = [...document.querySelectorAll('section[id]')];

function clearActive() {
  navLinks.forEach(a => a.classList.remove('isActive'));
}

function setActive(id) {
  //  Only highlight links that exist (no "contact" in nav now)
  navLinks.forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('isActive', href === `#${id}`);
  });
}

//  Default state: no nav highlight on load while at top/hero
function setActiveFromScroll() {
  const y = window.scrollY;

  // If user is near the top (hero), clear highlight (matches Lovable)
  if (y < 220) {
    clearActive();
    return;
  }

  // Find the most visible section
  const visible = sections
    .map(sec => {
      const rect = sec.getBoundingClientRect();
      const visiblePx = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);
      return { sec, visiblePx };
    })
    .filter(x => x.visiblePx > 0)
    .sort((a,b) => b.visiblePx - a.visiblePx)[0];

  if (visible) setActive(visible.sec.id);
}

window.addEventListener('scroll', setActiveFromScroll, { passive: true });
window.addEventListener('load', setActiveFromScroll);

//  Brand click -> clean top, no About highlight
document.querySelectorAll('a[href="#top"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearActive();
  });
});

//  When clicking nav links, set highlight immediately for that target
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    const target = a.getAttribute('href')?.replace('#','');
    if (target) setActive(target);
  });
});
