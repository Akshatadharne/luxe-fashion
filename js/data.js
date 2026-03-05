// ===== PRODUCT & CATEGORY DATA =====

const CATEGORIES = [
  { id: 'women',       label: 'Women',       emoji: '👗', count: '120+ styles', bg: '#f0e6d8' },
  { id: 'men',         label: 'Men',         emoji: '🧥', count: '80+ styles',  bg: '#e8e0d6' },
  { id: 'accessories', label: 'Accessories', emoji: '👜', count: '60+ styles',  bg: '#ede8df' },
  { id: 'footwear',    label: 'Footwear',    emoji: '👠', count: '50+ styles',  bg: '#f5ede2' },
];

const PRODUCTS = [
  {
    id: 1, name: 'Silk Wrap Dress', brand: 'LUXE Studio',
    category: 'women', emoji: '👗',
    price: 4999, originalPrice: 7999,
    sizes: ['XS','S','M','L','XL'],
    tag: 'New', rating: 5,
    colors: ['#c8a87c','#2d2417','#8b5e3c'],
    desc: 'Effortlessly elegant silk wrap dress with a fluid silhouette.'
  },
  {
    id: 2, name: 'Linen Blazer', brand: 'LUXE Men',
    category: 'men', emoji: '🧥',
    price: 5999, originalPrice: 8500,
    sizes: ['S','M','L','XL','XXL'],
    tag: 'New', rating: 5,
    colors: ['#c9a96e','#1e1a16'],
    desc: 'Tailored Italian linen blazer for the modern gentleman.'
  },
  {
    id: 3, name: 'Leather Tote Bag', brand: 'LUXE Atelier',
    category: 'accessories', emoji: '👜',
    price: 8999, originalPrice: 12999,
    sizes: ['One Size'],
    tag: 'Best Seller', rating: 5,
    colors: ['#8b5e3c','#0e0c0a'],
    desc: 'Full-grain vegetable-tanned leather tote, handcrafted.'
  },
  {
    id: 4, name: 'Block Heel Mules', brand: 'LUXE Footwear',
    category: 'footwear', emoji: '👠',
    price: 3499, originalPrice: 5500,
    sizes: ['36','37','38','39','40','41'],
    tag: 'Sale', rating: 4,
    colors: ['#c9a96e','#2d2417'],
    desc: 'Architectural block heel mules in supple leather.'
  },
  {
    id: 5, name: 'Cashmere Sweater', brand: 'LUXE Studio',
    category: 'women', emoji: '🧶',
    price: 6499, originalPrice: 9999,
    sizes: ['XS','S','M','L'],
    tag: 'New', rating: 5,
    colors: ['#f8f4ef','#c9a96e','#8b5e3c'],
    desc: 'Pure Mongolian cashmere in a relaxed oversized fit.'
  },
  {
    id: 6, name: 'Slim Chinos', brand: 'LUXE Men',
    category: 'men', emoji: '👖',
    price: 2999, originalPrice: 4500,
    sizes: ['28','30','32','34','36'],
    tag: null, rating: 4,
    colors: ['#c9a96e','#2d2417','#8b8b8b'],
    desc: 'Japanese stretch cotton chinos with a tailored slim fit.'
  },
  {
    id: 7, name: 'Pearl Drop Earrings', brand: 'LUXE Gems',
    category: 'accessories', emoji: '💎',
    price: 1999, originalPrice: 2999,
    sizes: ['One Size'],
    tag: 'New', rating: 5,
    colors: ['#f8f4ef'],
    desc: 'Freshwater pearl drops set in 18k gold-plated brass.'
  },
  {
    id: 8, name: 'Oxford Brogues', brand: 'LUXE Footwear',
    category: 'footwear', emoji: '👞',
    price: 7999, originalPrice: 11000,
    sizes: ['40','41','42','43','44','45'],
    tag: 'Best Seller', rating: 5,
    colors: ['#0e0c0a','#8b5e3c'],
    desc: 'Hand-stitched full-grain leather Oxford brogues.'
  },
];

const TESTIMONIALS = [
  {
    text: "LUXE completely transformed my wardrobe. The quality is extraordinary — every piece feels like it was made just for me.",
    author: "Priya Sharma", location: "Mumbai", stars: 5, avatar: "👩"
  },
  {
    text: "I've shopped at many premium stores but LUXE stands apart. The attention to detail in every garment is unmatched.",
    author: "Arjun Mehta", location: "Delhi", stars: 5, avatar: "👨"
  },
  {
    text: "Received so many compliments wearing the Silk Wrap Dress. Fast delivery, beautiful packaging — a truly luxury experience.",
    author: "Sneha Patel", location: "Bangalore", stars: 5, avatar: "👩‍💼"
  },
];

const FILTERS = ['All', 'Women', 'Men', 'Accessories', 'Footwear'];
