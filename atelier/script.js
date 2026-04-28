/* atelier — clicking a blob smooth-scrolls to the matching study */
const blobs = document.querySelectorAll('.blob');
blobs.forEach((b) => {
  b.addEventListener('click', () => {
    const id = b.dataset.target;
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
