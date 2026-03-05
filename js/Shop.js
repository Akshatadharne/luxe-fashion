// ===== SHOP PAGE JS =====

let shopActiveFilter = 'all';
let shopPriceFilter = 'all';
let shopSort = 'default';
let shopView = 'grid';

document.addEventListener('DOMContentLoaded', () => {
  renderShopProducts();
  updateCartUI();
  updateWishlistUI();
  initReveal();
});

function getFilteredProducts() {
  let items = [...PRODUCTS];

  // Category filter
  if (shopActiveFilter !== 'all') {
    items = items.filter(p => p.category === shopActiveFilter);
  }

  // Price filter
  if (shopPriceFilter === 'low')  items = items.filter(p => p.price < 3000);
  if (shopPriceFilter === 'mid')  items = items.filter(p => p.price >= 3000 && p.price <= 6000);
  if (shopPriceFilter === 'high') items = items.filter(p => p.price > 6000);

  // Sort
  if (shopSort === 'price-low')  items.sort((a,b) => a.price - b.price);
  if (shopSort === 'price-high') items.sort((a,b) => b.price - a.price);
  if (shopSort === 'name')       items.sort((a,b) => a.name.localeCompare(b.name));

  return items;
}

function renderShopProducts() {
  const grid = document.getElementById('shopGrid');
  const items = getFilteredProducts();

  document.getElementById('resultsCount').textContent = `Showing ${items.length} product${items.length !== 1 ? 's' : ''}`;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)">No products match your filters.</div>`;
    return;
  }

  grid.innerHTML = items.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s">
      <div class="product-img-wrap">
        ${p.tag ? `<span class="product-tag ${p.tag === 'Sale' ? 'sale' : p.tag === 'New' ? 'new' : ''}">${p.tag}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn ${isWished(p.id) ? 'wished' : ''}"
            onclick="handleShopWish(event, ${p.id})">
            ${isWished(p.id) ? '❤️' : '🤍'}
          </button>
          <button class="action-btn" onclick="addToCart(${p.id})">🛍</button>
        </div>
        <span style="font-size:90px">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-sizes">
          ${p.sizes.slice(0,4).map(s => `<span class="size-dot">${s}</span>`).join('')}
        </div>
        <div class="product-price-row">
          <div>
            <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
            ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
      </div>
    </div>
  `).join('');
}

function shopFilter(cat) {
  shopActiveFilter = cat;
  renderShopProducts();
}

function priceFilter(range) {
  shopPriceFilter = range;
  renderShopProducts();
}

function sortProducts(val) {
  shopSort = val;
  renderShopProducts();
}

function setView(view) {
  shopView = view;
  const grid = document.getElementById('shopGrid');
  grid.classList.toggle('list-view', view === 'list');
  document.getElementById('gridBtn').classList.toggle('active-view', view === 'grid');
  document.getElementById('listBtn').classList.toggle('active-view', view === 'list');
}

function handleShopWish(event, productId) {
  event.stopPropagation();
  toggleWishlistItem(productId);
  renderShopProducts();
}

// Override handleSearch for shop page
function handleSearch(query) {
  if (!query.trim()) { renderShopProducts(); return; }
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase())
  );
  const grid = document.getElementById('shopGrid');
  document.getElementById('resultsCount').textContent = `Showing ${filtered.length} results`;
  grid.innerHTML = filtered.map((p,i) => `
    <div class="product-card" style="animation-delay:${i*0.06}s">
      <div class="product-img-wrap">
        <span style="font-size:90px">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price.toLocaleString('en-IN')}</span>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Bag</button>
        </div>
      </div>
    </div>
  `).join('');
}