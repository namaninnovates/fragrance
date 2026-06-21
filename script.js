// ============================================
// L'ESSENCE — Atelier Lux Shared Logic
// ============================================

const PRODUCTS = {
  'l-ambre-noir': {
    name: 'ONIRIQUE',
    image: 'images/fragrance_two.png',
  },
  'vesper': {
    name: 'ETOILE',
    image: 'images/fragrance_one.png',
  },
  'solstice': {
    name: 'NEIGE',
    image: 'images/fragrance_three.png',
  }
};

let cart = JSON.parse(localStorage.getItem('lessence_cart') || '[]');

// Loader removed. Reveals handled purely by IntersectionObserver.

// Nav scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav && window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else if (nav) {
    nav.classList.remove('scrolled');
  }
});

// Reveal Observer
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Size Selector
document.querySelectorAll('.pdp__size-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pdp__size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const price = btn.dataset.price;
    const priceEl = document.getElementById('pdpPrice');
    if (priceEl) priceEl.textContent = `$${price}`;
  });
});

// Cart Logic
function saveCart() {
  localStorage.setItem('lessence_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = document.getElementById('bagCount');
  if (count) count.textContent = cart.length;

  const empty = document.getElementById('cartEmpty');
  const foot = document.getElementById('cartFoot');
  const body = document.getElementById('cartBody');
  const totalEl = document.getElementById('cartTotal');

  document.querySelectorAll('.cart-item').forEach(e => e.remove());

  if (cart.length === 0) {
    if (empty) empty.style.display = 'block';
    if (foot) foot.style.display = 'none';
    return;
  }

  if (empty) empty.style.display = 'none';
  if (foot) foot.style.display = 'block';

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const d = document.createElement('div');
    d.className = 'cart-item';
    d.innerHTML = `
      <img src="${item.image}" class="cart-item__img">
      <div class="cart-item__info">
        <h4 class="cart-item__name">${item.name}</h4>
        <p class="cart-item__meta">${item.size}</p>
        <div class="cart-item__price">$${item.price}</div>
        <button class="cart-item__remove" onclick="removeFromCart('${item.uid}')">Remove</button>
      </div>
    `;
    body.insertBefore(d, empty);
  });

  if (totalEl) totalEl.textContent = `$${total}`;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function addProductToCart(id) {
  const p = PRODUCTS[id];
  const activeBtn = document.querySelector('.pdp__size-btn.active');
  const size = activeBtn ? activeBtn.dataset.size : '100ML';
  const price = activeBtn ? parseInt(activeBtn.dataset.price) : 0;
  
  const uid = id + '-' + size;
  
  if (cart.find(i => i.uid === uid)) {
    showToast(`${p.name} (${size}) is already in your bag`);
    openCart();
    return;
  }

  cart.push({ uid, id, name: p.name, image: p.image, size, price });
  saveCart();
  updateCartUI();
  showToast(`Added ${p.name} to bag`);
  openCart();
}

function removeFromCart(uid) {
  cart = cart.filter(i => i.uid !== uid);
  saveCart();
  updateCartUI();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('bagToggle')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
document.getElementById('cartBackdrop')?.addEventListener('click', closeCart);

updateCartUI();
