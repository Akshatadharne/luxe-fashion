// ===== UI HELPERS =====

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

function closeAll() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('wishlistSidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}

function toggleSearch() {
  document.getElementById('searchBar').classList.toggle('open');
  if (document.getElementById('searchBar').classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
}

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

function handleSearch(query) {
  if (!query.trim()) { renderProducts('all'); return; }
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );
  renderProductCards(filtered);
}

function subscribeNewsletter() {
  const email = document.getElementById('emailInput').value;
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address');
    return;
  }
  showToast('✓ Thank you! You\'re now on the LUXE list.');
  document.getElementById('emailInput').value = '';
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// Reveal on scroll
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
