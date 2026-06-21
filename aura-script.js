// AURA LUXE Isolated Script
let auraCartCount = 0;

function addToAuraCart(id, price) {
  auraCartCount++;
  const countEl = document.getElementById('auraCartCount');
  if (countEl) {
    countEl.textContent = auraCartCount;
  }
  
  // Simple alert mimicking an add-to-cart flash
  alert(`Added to Cart! Subtotal: $${auraCartCount * price}.00`);
}
