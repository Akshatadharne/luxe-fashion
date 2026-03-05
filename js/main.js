// ===== MAIN APP =====

let activeFilter = 'all';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  renderCategories();
  renderFilterStrip();
  renderProducts('all');
  renderTestimonials();
  updateCartUI();
  updateWishlistUI();
  initReveal();
});

// ===== LOADER =====
function initLoader() {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
}

// ===== RENDER CATEGORIES =====
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="filterProducts('${cat.id}')">
      <div class="cat-bg" style="background:${cat.bg}">${cat.emoji}</div>
      <div class="cat-overlay">
        <h3>${cat.label}</h3>
        <p>${cat.count}</p>
      </div>
    </div>
  `).join('');
}

// ===== RENDER FILTER STRIP =====
function renderFilterStrip() {
  const strip = document.getElementById('filterStrip');
  if (!strip) return;

  strip.innerHTML = FILTERS.map(f => `
    <button class="filter-chip ${f.toLowerCase() === activeFilter ? 'active' : ''}"
      onclick="filterProducts('${f.toLowerCase()}', this)">
      ${f}
    </button>
  `).join('');
}

// ===== FILTER PRODUCTS =====
function filterProducts(filter, btn) {
  activeFilter = filter === 'all' ? 'all' : filter;

  document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Scroll to products section
  const section = document.getElementById('productsGrid');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  renderProducts(activeFilter);
}

// ===== RENDER PRODUCTS =====
function renderProducts(filter) {
  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  renderProductCards(filtered);
}

function renderProductCards(items) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted);font-size:15px">No products found.</div>`;
    return;
  }

  grid.innerHTML = items.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.06}s">
      <div class="product-img-wrap">
        ${p.tag ? `<span class="product-tag ${p.tag === 'Sale' ? 'sale' : p.tag === 'New' ? 'new' : ''}">${p.tag}</span>` : ''}
        <div class="product-actions">
          <button class="action-btn ${isWished(p.id) ? 'wished' : ''}"
            onclick="handleWishToggle(event, ${p.id})"
            title="Wishlist">
            ${isWished(p.id) ? '❤️' : '🤍'}
          </button>
          <button class="action-btn" onclick="addToCart(${p.id})" title="Quick Add">🛍</button>
        </div>
        <span style="font-size:90px">${p.emoji}</span>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-sizes">
          ${p.sizes.slice(0, 4).map(s => `<span class="size-dot">${s}</span>`).join('')}
          ${p.sizes.length > 4 ? `<span class="size-dot">+${p.sizes.length - 4}</span>` : ''}
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

// ===== WISH TOGGLE =====
function handleWishToggle(event, productId) {
  event.stopPropagation();
  const added = toggleWishlistItem(productId);
  renderProducts(activeFilter); // re-render to update heart icons
}

// ===== RENDER TESTIMONIALS =====
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  if (!grid) return;

  grid.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
      <p class="testimonial-text">"${t.text}"</p>
      <div class="testimonial-author">
        <div class="author-avatar">${t.avatar}</div>
        <div>
          <div class="author-name">${t.author}</div>
          <div class="author-location">${t.location}</div>
        </div>
      </div>
    </div>
  `).join('');
}
