// ===== CART MODULE =====

let cart = JSON.parse(localStorage.getItem('luxe-cart') || '[]');

function saveCart() {
  localStorage.setItem('luxe-cart', JSON.stringify(cart));
}

function addToCart(productId, size = 'M') {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const key = `${productId}-${size}`;
  const existing = cart.find(c => c.key === key);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, size, qty: 1, key });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to bag`);
}

function removeFromCart(key) {
  cart = cart.filter(c => c.key !== key);
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function updateCartQty(key, change) {
  const item = cart.find(c => c.key === key);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) { removeFromCart(key); return; }
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartUI();
  renderCartSidebar();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) {
    badge.textContent = total;
    badge.style.animation = 'none';
    requestAnimationFrame(() => badge.style.animation = '');
  }
  document.getElementById('cartItemCount').textContent = `(${total})`;
}

function renderCartSidebar() {
  const container = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-msg">
        <div class="empty-icon">🛍</div>
        <p>Your bag is empty.<br/>Start shopping!</p>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-size">Size: ${item.size}</div>
        <div class="cart-item-bottom">
          <div class="qty-row">
            <button class="qty-btn" onclick="updateCartQty('${item.key}', -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.key}', 1)">+</button>
          </div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>
      </div>
      <button class="remove-item-btn" onclick="removeFromCart('${item.key}')">✕</button>
    </div>
  `).join('');

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 2999 ? 0 : 149;
  const total = subtotal + delivery;

  footer.innerHTML = `
    <div class="cart-total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
    <div class="cart-total-row"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
    <div class="cart-grand-total"><span>Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
    <button class="checkout-btn" onclick="handleCheckout()">Checkout →</button>
    <button class="continue-btn" onclick="toggleCart()">Continue Shopping</button>
  `;
}

function handleCheckout() {
  showToast('🎉 Order placed! Thank you for shopping with LUXE');
  clearCart();
  toggleCart();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('overlay');
  const wishlist = document.getElementById('wishlistSidebar');
  wishlist.classList.remove('open');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  if (sidebar.classList.contains('open')) renderCartSidebar();
}
