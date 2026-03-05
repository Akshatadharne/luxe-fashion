// ===== WISHLIST MODULE =====

let wishlist = JSON.parse(localStorage.getItem('luxe-wishlist') || '[]');

function saveWishlist() {
  localStorage.setItem('luxe-wishlist', JSON.stringify(wishlist));
}

function toggleWishlistItem(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlist.findIndex(w => w.id === productId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast(`Removed from wishlist`);
  } else {
    wishlist.push(product);
    showToast(`${product.emoji} Added to wishlist`);
  }

  saveWishlist();
  updateWishlistUI();
  return idx === -1;
}

function isWished(productId) {
  return wishlist.some(w => w.id === productId);
}

function updateWishlistUI() {
  const badge = document.getElementById('wishCount');
  if (badge) badge.textContent = wishlist.length;
  document.getElementById('wishItemCount').textContent = `(${wishlist.length})`;
}

function renderWishlistSidebar() {
  const container = document.getElementById('wishlistItems');
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-msg">
        <div class="empty-icon">🤍</div>
        <p>Your wishlist is empty.<br/>Save items you love!</p>
      </div>`;
    return;
  }

  container.innerHTML = wishlist.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-details">
        <div class="cart-item-brand">${item.brand}</div>
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <button class="add-btn" onclick="addToCart(${item.id}); toggleWishlistItem(${item.id})" style="margin-top:8px;color:var(--dark);border-bottom:1px solid var(--dark)">Move to Bag</button>
      </div>
      <button class="remove-item-btn" onclick="toggleWishlistItem(${item.id}); renderWishlistSidebar()">✕</button>
    </div>
  `).join('');
}

function toggleWishlist() {
  const sidebar = document.getElementById('wishlistSidebar');
  const overlay = document.getElementById('overlay');
  const cart = document.getElementById('cartSidebar');
  cart.classList.remove('open');
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  if (sidebar.classList.contains('open')) renderWishlistSidebar();
}