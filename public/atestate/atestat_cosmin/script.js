document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || revealItems.length === 0) {
    revealItems.forEach((item) => item.classList.add('show'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -20px 0px'
    }
  );

  revealItems.forEach((item) => observer.observe(item));
});
