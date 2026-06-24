// ARCHIVE Isolated Script
let arcCartCount = 0;

function addToArcCart(id, price) {
  arcCartCount++;
  const countEl = document.getElementById('arcCartCount');
  if (countEl) {
    countEl.textContent = arcCartCount;
  }
}



// Accordion Logic
document.querySelectorAll('.arc-accordion__header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const indicator = header.querySelector('.arc-accordion__indicator');
    
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      if (indicator) indicator.textContent = '[ + ]';
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      if (indicator) indicator.textContent = '[ - ]';
    }
  });
});
