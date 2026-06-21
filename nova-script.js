// ============================================================
// AURA NOVA — V4 Script (Architecture Absent, Curation Absent)
// ============================================================

let novaCart = JSON.parse(localStorage.getItem('nova_cart') || '[]');

function showNovaToast(msg) {
  const t = document.getElementById('nova-toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

function updateNovaCartCount() {
  document.querySelectorAll('.nova-cart-count').forEach(el => {
    el.textContent = novaCart.length;
  });
}

function addToNovaCart(id, price, name) {
  if (novaCart.find(i => i.id === id)) {
    showNovaToast(`${name} is already in your bag!`);
    return;
  }
  novaCart.push({ id, price, name });
  localStorage.setItem('nova_cart', JSON.stringify(novaCart));
  updateNovaCartCount();
  showNovaToast(`${name} added to bag! 🛍️`);

  // Update any add buttons for this product
  document.querySelectorAll(`[data-product="${id}"]`).forEach(btn => {
    btn.textContent = 'ADDED ✓';
    btn.classList.add('added');
  });
}

function toggleWishlist(el) {
  el.classList.toggle('active');
  if (el.classList.contains('active')) {
    el.innerHTML = '♥';
    showNovaToast('Added to Wishlist! ♥');
  } else {
    el.innerHTML = '♡';
    showNovaToast('Removed from Wishlist');
  }
}

// Size button selector
document.addEventListener('DOMContentLoaded', () => {
  updateNovaCartCount();

  document.querySelectorAll('.nova-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.nova-sizes').querySelectorAll('.nova-size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
