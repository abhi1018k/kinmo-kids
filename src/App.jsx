import { useState, useEffect, useRef } from 'react'
import {
  MessageCircle, Menu, X, Star, Check, ChevronRight,
  Palette, Brain, Smartphone, Hand, ShoppingBag, Gift,
  Shield, Smile, ArrowRight, Phone
} from 'lucide-react'

// WhatsApp helper
const WA_BASE = 'https://wa.me/916353926280'
const waLink = (msg) => `${WA_BASE}?text=${encodeURIComponent(msg)}`

const WA_MSGS = {
  jungle: 'Hi KinMo Kids! I want to order Jungle Kit Combo for ₹249. Quantity: 1',
  mega: 'Hi KinMo Kids! I want to order Mega Combo for ₹499. Quantity: 1',
  floral: 'Hi KinMo Kids! I want to order Floral Kit Combo for ₹199. Quantity: 1',
  general: 'Hi KinMo Kids! I want help choosing a combo kit.',
}

// WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

// Scroll reveal hook
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// ── ANNOUNCEMENT BAR ─────────────────────────────────────────────────
function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-orange-400 text-white text-sm py-2 px-4 flex items-center justify-between">
      <span className="font-semibold">🎨 Fun Creative Kits for Kids | Paint, Play &amp; Learn</span>
      <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
        className="hidden sm:flex items-center gap-1 bg-white text-green-700 font-bold text-xs px-3 py-1 rounded-full hover:bg-green-50 transition-colors">
        <WhatsAppIcon size={14} /> Order Now
      </a>
    </div>
  )
}

// ── HEADER ────────────────────────────────────────────────────────────
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = ['Home', 'Combos', 'Benefits', 'Gallery', 'Order']

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95'}`}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img src="/assets/kinmo-kids-logo.png" alt="KinMo Kids Logo" className="h-12 w-12 object-contain rounded-full" />
          <div className="hidden sm:block">
            <span className="font-extrabold text-xl" style={{ fontFamily: 'Nunito' }}>
              <span className="text-orange-500">Kin</span><span className="text-blue-500">Mo</span>{' '}
              <span className="text-green-600">Kids</span>
            </span>
            <div className="text-xs text-gray-400 -mt-1">Paint, Play &amp; Learn</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3">
          <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex btn-whatsapp text-sm px-4 py-2">
            <WhatsAppIcon size={16} /> Order on WhatsApp
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-600">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-4">
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-gray-700 font-semibold py-2 border-b border-gray-100"
              onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
            className="btn-whatsapp justify-center text-sm">
            <WhatsAppIcon size={16} /> Order on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────
function Hero() {
  const badges = [
    { icon: <Shield size={14} />, text: 'Safe & Kid Friendly', color: 'bg-green-100 text-green-700' },
    { icon: <Palette size={14} />, text: 'Creative Learning Fun', color: 'bg-yellow-100 text-yellow-700' },
    { icon: <Gift size={14} />, text: 'Perfect Gift Idea', color: 'bg-pink-100 text-pink-700' },
    { icon: <MessageCircle size={14} />, text: 'Easy WhatsApp Order', color: 'bg-blue-100 text-blue-700' },
  ]

  return (
    <section id="home" className="bg-cream dots-pattern py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        {/* Left content */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            🎨 India's Fun DIY Painting Kits for Kids
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-5" style={{ fontFamily: 'Nunito' }}>
            <span className="text-orange-500">Let Your Child</span><br />
            <span className="text-green-600">Paint, Play</span>{' '}
            <span className="text-blue-500">&amp; Create!</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-lg">
            Fun DIY painting combo kits that help kids learn colours, improve creativity and enjoy screen-free playtime.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-8">
            {badges.map((b, i) => (
              <span key={i} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${b.color}`}>
                {b.icon} {b.text}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a href="#combos"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-7 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base">
              Explore Combo Kits <ChevronRight size={18} />
            </a>
            <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp justify-center btn-pulse text-base">
              <WhatsAppIcon size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Product collage */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto relative">
            {/* Main large image */}
            <div className="col-span-2 relative rounded-3xl overflow-hidden shadow-xl">
              <img src="/assets/mega-combo-499.jpeg"
                alt="KinMo Kids Mega Combo Kit - All products"
                className="w-full h-56 object-cover" loading="lazy" />
              <div className="absolute top-3 left-3 bg-white/90 text-orange-600 font-bold text-xs px-3 py-1 rounded-full shadow">
                🏆 Best Value ₹499
              </div>
            </div>
            {/* Bottom two */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src="/assets/jungle-kit-combo-249.jpeg"
                alt="Jungle Kit Combo ₹249"
                className="w-full h-36 object-cover" loading="lazy" />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 text-center font-bold text-xs text-green-700 py-1 rounded-full">
                🌿 From ₹249
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src="/assets/floral-kit-combo-199.jpeg"
                alt="Floral Kit Combo ₹199"
                className="w-full h-36 object-cover" loading="lazy" />
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 text-center font-bold text-xs text-pink-600 py-1 rounded-full">
                🌸 From ₹199
              </div>
            </div>
          </div>

          {/* Floating labels */}
          <div className="absolute -top-3 -right-2 bg-yellow-400 text-white font-extrabold text-xs px-3 py-1.5 rounded-full rotate-12 shadow-md hidden md:block">
            Screen-Free Fun! 📵
          </div>
          <div className="absolute -bottom-3 -left-2 bg-pink-400 text-white font-extrabold text-xs px-3 py-1.5 rounded-full -rotate-6 shadow-md hidden md:block">
            Creative Gift Idea 🎁
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PRODUCTS ─────────────────────────────────────────────────────────
const products = [
  {
    id: 'jungle',
    name: 'Jungle Kit Combo',
    price: '₹249',
    image: '/assets/jungle-kit-combo-249.jpeg',
    badge: null,
    badgeColor: '',
    description: 'Bring jungle friends to life with colourful painting fun.',
    includes: ['2 Big Jungle Toys', '4 Mini Toys', '12 Colours', '1 Brush', 'Colour Guidance Card'],
    color: 'from-green-400 to-emerald-500',
    waKey: 'jungle',
    border: 'border-green-200',
  },
  {
    id: 'mega',
    name: 'Mega Combo',
    price: '₹499',
    image: '/assets/mega-combo-499.jpeg',
    badge: 'Best Value ⭐',
    badgeColor: 'bg-orange-500',
    description: 'The ultimate creative combo with more toys, more colours and more fun.',
    includes: ['5 Big Toys', '4 Mini Toys', '12 Colours', '1 Brush', 'Colour Guidance Card'],
    color: 'from-orange-400 to-yellow-500',
    waKey: 'mega',
    border: 'border-orange-200',
  },
  {
    id: 'floral',
    name: 'Floral Kit Combo',
    price: '₹199',
    image: '/assets/floral-kit-combo-199.jpeg',
    badge: null,
    badgeColor: '',
    description: 'Paint beautiful flowers and enjoy a relaxing creative activity.',
    includes: ['3 Flower Toys', '6 Colours', '1 Brush', 'Colour Guidance Card'],
    color: 'from-pink-400 to-rose-500',
    waKey: 'floral',
    border: 'border-pink-200',
  },
]

function ProductCard({ product }) {
  return (
    <div className={`card border-2 ${product.border} flex flex-col`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} - KinMo Kids painting kit`}
          className="w-full h-56 object-cover transition-transform duration-400 hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <div className={`absolute top-3 right-3 ${product.badgeColor} text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-lg`}>
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-extrabold mb-1" style={{ fontFamily: 'Nunito' }}>{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{product.description}</p>

        {/* Includes */}
        <div className="mb-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">What's Included</p>
          <ul className="space-y-1">
            {product.includes.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <Check size={14} className="text-green-500 flex-shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          {/* Price */}
          <div className={`text-3xl font-black bg-gradient-to-r ${product.color} bg-clip-text text-transparent mb-3`}
            style={{ fontFamily: 'Nunito' }}>
            {product.price}
          </div>

          {/* WhatsApp Button */}
          <a
            href={waLink(WA_MSGS[product.waKey])}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full justify-center text-sm"
          >
            <WhatsAppIcon size={16} /> Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

function ProductsSection() {
  return (
    <section id="combos" className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            <span className="text-green-600">Choose Your</span>{' '}
            <span className="text-orange-500">Favourite Combo</span>
          </h2>
          <p className="section-sub">
            Every kit includes fun paintable toys, colours, brush and colour-mixing guidance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 reveal">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}

// ── HOW IT WORKS ──────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '1', icon: <ShoppingBag size={28} />, title: 'Choose Your Kit', desc: 'Pick your favourite creative combo.', color: 'bg-blue-100 text-blue-600' },
    { num: '2', icon: <Palette size={28} />, title: 'Paint Your Toys', desc: 'Use colours and brush to make your own design.', color: 'bg-yellow-100 text-yellow-600' },
    { num: '3', icon: <Smile size={28} />, title: 'Play & Display', desc: 'Enjoy your colourful creations or gift them.', color: 'bg-pink-100 text-pink-600' },
  ]

  return (
    <section className="py-16 px-4 bg-cream dots-pattern">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            <span className="text-blue-500">Paint.</span>{' '}
            <span className="text-green-600">Play.</span>{' '}
            <span className="text-orange-500">Learn.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative reveal">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-300 via-yellow-300 to-pink-300 z-0" />
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mb-4 shadow-lg text-4xl font-black`}>
                {step.icon}
              </div>
              <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-500 mb-3 -mt-2">
                {step.num}
              </div>
              <h3 className="text-lg font-extrabold mb-2" style={{ fontFamily: 'Nunito' }}>{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── BEFORE AFTER ─────────────────────────────────────────────────────
function BeforeAfter() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            <span className="text-gray-700">From Plain Toys to</span>{' '}
            <span className="text-orange-500">Colourful Creations!</span>
          </h2>
        </div>
        <div className="reveal">
          <div className="rounded-3xl overflow-hidden shadow-xl max-w-3xl mx-auto">
            <img
              src="/assets/before-after.png"
              alt="Before and after - plain white toys transformed into colourful painted creations by kids"
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="text-center text-gray-500 mt-6 text-base max-w-lg mx-auto">
            ✨ Every child creates something unique — no two toys look the same!
          </p>
        </div>
      </div>
    </section>
  )
}

// ── GALLERY ──────────────────────────────────────────────────────────
function Gallery() {
  const images = [
    { src: '/assets/jungle-kit-combo-249.jpeg', alt: 'Jungle Kit Combo - paintable jungle animal toys for kids' },
    { src: '/assets/kids-activity.jpeg', alt: 'Child painting KinMo Kids toys - creative activity' },
    { src: '/assets/mega-combo-499.jpeg', alt: 'Mega Combo Kit - complete painting set for kids' },
    { src: '/assets/product-shoot.jpeg', alt: 'KinMo Kids Floral painting kit product display' },
    { src: '/assets/floral-kit-combo-199.jpeg', alt: 'Floral Kit Combo - flower toys for painting' },
    { src: '/assets/before-after.png', alt: 'KinMo Kids before and after toy painting results' },
  ]

  return (
    <section id="gallery" className="py-16 px-4 bg-cream">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            <span className="text-pink-500">Made for</span>{' '}
            <span className="text-blue-500">Little Artists</span> 🎨
          </h2>
        </div>
        <div className="gallery-grid reveal">
          {images.map((img, i) => (
            <div key={i} className="gallery-item shadow-md">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── BENEFITS ─────────────────────────────────────────────────────────
function Benefits() {
  const items = [
    { icon: '🎨', title: 'Boosts Creativity', desc: 'Kids explore colours, ideas and their own imagination.', color: 'bg-yellow-50 border-yellow-200' },
    { icon: '🧠', title: 'Supports Learning', desc: 'Helps children understand colour mixing and creative thinking.', color: 'bg-blue-50 border-blue-200' },
    { icon: '📵', title: 'Screen-Free Activity', desc: 'A fun hands-on activity away from mobile screens.', color: 'bg-green-50 border-green-200' },
    { icon: '🤲', title: 'Builds Focus & Motor Skills', desc: 'Painting helps improve patience, focus and hand coordination.', color: 'bg-pink-50 border-pink-200' },
  ]

  return (
    <section id="benefits" className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            More Than Just a <span className="text-orange-500">Toy</span>
          </h2>
          <p className="section-sub">Why parents across India love KinMo Kids kits.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 reveal">
          {items.map((item, i) => (
            <div key={i} className={`rounded-2xl border-2 p-6 ${item.color} transition-all duration-300 hover:-translate-y-1`}>
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-extrabold mb-2" style={{ fontFamily: 'Nunito' }}>{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center reveal">
          <div className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-2xl px-8 py-4">
            <p className="text-orange-700 font-bold text-base">
              🎁 Perfect for birthdays, return gifts, weekends and family playtime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── REVIEWS ──────────────────────────────────────────────────────────
function Reviews() {
  const reviews = [
    { text: 'Such a fun activity for my child. The toys came out beautiful!', author: 'Parent Review', stars: 5 },
    { text: 'My daughter loved mixing colours and painting the flowers. Great quality kit!', author: 'Happy Parent', stars: 5 },
    { text: 'Perfect birthday gift idea. Kept kids busy and creative for hours.', author: 'Customer Review', stars: 5 },
  ]

  return (
    <section className="py-16 px-4 bg-cream dots-pattern">
      <div className="max-w-5xl mx-auto">
        <div className="reveal">
          <h2 className="section-heading">
            Parents Love <span className="text-green-600">KinMo Kids</span> ❤️
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="stars flex gap-1 mb-3">
                {[...Array(r.stars)].map((_, j) => <Star key={j} size={16} fill="#FFC107" color="#FFC107" />)}
              </div>
              <p className="text-gray-700 text-sm mb-4 italic">"{r.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {r.author[0]}
                </div>
                <span className="font-semibold text-sm text-gray-600">— {r.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── FINAL CTA ─────────────────────────────────────────────────────────
function FinalCTA() {
  const pills = [
    { label: 'Jungle Kit', price: '₹249', color: 'bg-green-100 text-green-700', key: 'jungle' },
    { label: 'Mega Combo', price: '₹499', color: 'bg-orange-100 text-orange-700', key: 'mega' },
    { label: 'Floral Kit', price: '₹199', color: 'bg-pink-100 text-pink-700', key: 'floral' },
  ]

  return (
    <section id="order" className="py-20 px-4 bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="text-5xl mb-4">🎨</div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4" style={{ fontFamily: 'Nunito' }}>
          Ready for a Colourful Playtime?
        </h2>
        <p className="text-white/90 text-base mb-8 max-w-xl mx-auto">
          Order your KinMo Kids Combo today and give your child a fun, creative and screen-free activity.
        </p>

        {/* Price pills */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {pills.map(p => (
            <a key={p.key} href={waLink(WA_MSGS[p.key])} target="_blank" rel="noopener noreferrer"
              className={`${p.color} font-bold px-5 py-2 rounded-full text-sm hover:scale-105 transition-transform shadow-md`}>
              {p.label} {p.price}
            </a>
          ))}
        </div>

        <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-white text-green-700 font-extrabold text-lg py-4 px-10 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 btn-pulse">
          <WhatsAppIcon size={24} /> Order on WhatsApp
        </a>
      </div>
    </section>
  )
}

// ── FOOTER ────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <img src="/assets/kinmo-kids-logo.png" alt="KinMo Kids Logo" className="h-14 w-14 object-contain rounded-full" />
            <div>
              <div className="font-extrabold text-xl" style={{ fontFamily: 'Nunito' }}>
                <span className="text-orange-400">Kin</span><span className="text-blue-400">Mo</span>{' '}
                <span className="text-green-400">Kids</span>
              </div>
              <div className="text-xs text-gray-400">Paint, Play &amp; Learn</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Phone size={14} className="text-green-400" /> +91 6353926280
            </div>
            <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp text-sm px-5 py-2">
              <WhatsAppIcon size={16} /> Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500 space-y-1">
          <p>© 2026 KinMo Kids. All Rights Reserved.</p>
          <p className="text-xs">Product colours and designs may vary slightly.</p>
        </div>
      </div>
    </footer>
  )
}

// ── STICKY BOTTOM BAR (mobile) ───────────────────────────────────────
function StickyBottomBar() {
  return (
    <div className="sticky-bar md:hidden">
      <a href={waLink(WA_MSGS.general)} target="_blank" rel="noopener noreferrer"
        className="btn-whatsapp btn-pulse w-full justify-center text-base px-6 py-3">
        <WhatsAppIcon size={20} /> Order on WhatsApp
      </a>
    </div>
  )
}

// ── APP ───────────────────────────────────────────────────────────────
export default function App() {
  useReveal()

  return (
    <div className="pb-20 md:pb-0">
      <AnnouncementBar />
      <Header />
      <Hero />
      <ProductsSection />
      <HowItWorks />
      <BeforeAfter />
      <Gallery />
      <Benefits />
      <Reviews />
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </div>
  )
}
