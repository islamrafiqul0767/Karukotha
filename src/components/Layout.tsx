import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Heart, Menu, X, User, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore, useAuthStore } from '../store';
import { storeSettings, categories } from '../data';

// === TOAST COMPONENT ===
export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`px-4 py-3 rounded shadow-lg text-sm max-w-xs ${
              toast.type === 'success' ? 'bg-forest text-white' :
              toast.type === 'error' ? 'bg-terracotta text-white' :
              'bg-charcoal text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white">
                <X size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// === CART DRAWER ===
export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-light-border">
              <h2 className="text-lg font-semibold text-forest">শপিং ব্যাগ ({items.length})</h2>
              <button onClick={closeCart} className="p-2 hover:bg-cream rounded"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-warm-gray mb-4" />
                  <p className="text-warm-gray">আপনার ব্যাগ খালি</p>
                  <button onClick={() => { closeCart(); navigate('/shop'); }} className="mt-4 text-forest underline">
                    শপ দেখুন
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, idx) => (
                    <div key={`${item.product.id}-${item.variant?.id}-${idx}`} className="flex gap-3 bg-white p-3 rounded border border-light-border">
                      <img src={item.product.images[0]?.url} alt={item.product.nameBn} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.product.nameBn}</p>
                        {item.variant && <p className="text-xs text-warm-gray">{item.variant.nameBn}</p>}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-light-border rounded">
                            <button onClick={() => updateQuantity(item.product.id, item.variant?.id || null, item.quantity - 1)} className="px-2 py-1 text-sm">−</button>
                            <span className="px-2 text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.variant?.id || null, item.quantity + 1)} className="px-2 py-1 text-sm">+</button>
                          </div>
                          <p className="text-sm font-semibold text-forest">
                            ৳{((item.product.price + (item.variant?.priceModifier || 0)) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.variant?.id || null)} className="text-warm-gray hover:text-terracotta self-start">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="border-t border-light-border p-4">
                <div className="flex justify-between mb-3">
                  <span>সাবটোটাল</span>
                  <span className="font-semibold">৳{getSubtotal().toLocaleString()}</span>
                </div>
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors"
                >
                  চেকআউট করুন
                </button>
                <button onClick={() => { closeCart(); navigate('/cart'); }} className="w-full mt-2 border border-forest text-forest py-2 rounded font-medium hover:bg-cream transition-colors">
                  ব্যাগ দেখুন
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// === SEARCH MODAL ===
export const SearchModal: React.FC = () => {
  const { isSearchOpen, toggleSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      toggleSearch();
      setQuery('');
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
          onClick={toggleSearch}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="bg-ivory w-full max-w-lg mx-4 rounded-lg shadow-xl p-4"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="পণ্য খুঁজুন..."
                className="flex-1 px-4 py-3 border border-light-border rounded focus:outline-none focus:border-forest bg-white"
                autoFocus
              />
              <button type="submit" className="bg-forest text-white px-6 py-3 rounded hover:bg-forest-light transition-colors">
                <Search size={20} />
              </button>
            </form>
            <div className="mt-3 text-sm text-warm-gray">
              জনপ্রিয়: বাঁশ, টেরাকোটা, নকশি কাঁথা, পাট
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// === HEADER ===
export const Header: React.FC = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, openCart, toggleSearch } = useUIStore();
  const itemCount = useCartStore(s => s.getItemCount());
  const wishlistCount = useWishlistStore(s => s.items.length);
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();
  const [catOpen, setCatOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      {storeSettings.announcementBarActive && (
        <div className="bg-forest text-white text-center py-2 text-sm">
          <p>{storeSettings.announcementBarBn}</p>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button onClick={toggleMobileMenu} className="lg:hidden p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">কা</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-forest leading-tight">{storeSettings.brandNameBn}</h1>
              <p className="text-[10px] text-warm-gray leading-tight hidden sm:block">{storeSettings.tagline}</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/shop" className="text-sm font-medium hover:text-forest transition-colors">শপ</Link>
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="text-sm font-medium hover:text-forest transition-colors flex items-center gap-1">
                ক্যাটাগরি <ChevronDown size={14} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded shadow-lg border border-light-border py-2"
                  >
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/category/${cat.slug}`} className="block px-4 py-2 text-sm hover:bg-cream transition-colors">
                        {cat.nameBn}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/shop?filter=new" className="text-sm font-medium hover:text-forest transition-colors">নতুন পণ্য</Link>
            <Link to="/offers" className="text-sm font-medium hover:text-forest transition-colors">অফার</Link>
            <Link to="/blog" className="text-sm font-medium hover:text-forest transition-colors">ব্লগ</Link>
            <Link to="/about" className="text-sm font-medium hover:text-forest transition-colors">আমাদের কথা</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggleSearch} className="p-2 hover:bg-cream rounded transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-cream rounded transition-colors relative hidden sm:block">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to={isLoggedIn ? '/account' : '/login'} className="p-2 hover:bg-cream rounded transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <button onClick={openCart} className="p-2 hover:bg-cream rounded transition-colors relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-light-border overflow-hidden bg-ivory"
            >
              <nav className="p-4 space-y-3">
                <Link to="/shop" onClick={closeMobileMenu} className="block py-2 font-medium">শপ</Link>
                <div>
                  <p className="py-1 text-sm text-warm-gray">ক্যাটাগরি</p>
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/category/${cat.slug}`} onClick={closeMobileMenu} className="block py-1.5 pl-4 text-sm">
                      {cat.nameBn}
                    </Link>
                  ))}
                </div>
                <Link to="/shop?filter=new" onClick={closeMobileMenu} className="block py-2 font-medium">নতুন পণ্য</Link>
                <Link to="/offers" onClick={closeMobileMenu} className="block py-2 font-medium">অফার</Link>
                <Link to="/blog" onClick={closeMobileMenu} className="block py-2 font-medium">ব্লগ</Link>
                <Link to="/about" onClick={closeMobileMenu} className="block py-2 font-medium">আমাদের কথা</Link>
                <hr className="border-light-border" />
                <Link to="/wishlist" onClick={closeMobileMenu} className="block py-2">পছন্দের তালিকা ({wishlistCount})</Link>
                <Link to={isLoggedIn ? '/account' : '/login'} onClick={closeMobileMenu} className="block py-2">
                  {isLoggedIn ? 'আমার অ্যাকাউন্ট' : 'লগইন'}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

// === FOOTER ===
export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3">{storeSettings.brandNameBn}</h3>
            <p className="text-sm text-gray-400 mb-4">{storeSettings.taglineBn}</p>
            <p className="text-sm text-gray-400">ঐতিহ্য, যত্ন আর সৃজনশীলতায় তৈরি অনন্য সব হস্তশিল্প।</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">দ্রুত লিংক</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/shop" className="hover:text-white transition-colors">শপ</Link></li>
              <li><Link to="/offers" className="hover:text-white transition-colors">অফার</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">ব্লগ</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">আমাদের কথা</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">যোগাযোগ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-3">গ্রাহক সেবা</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition-colors">প্রশ্নোত্তর</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">ডেলিভারি তথ্য</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">রিটার্ন পলিসি</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">গোপনীয়তা নীতি</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">শর্তাবলী</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Mail size={14} /> {storeSettings.contactEmail}</li>
              <li className="flex items-center gap-2"><Phone size={14} /> {storeSettings.contactPhone}</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> ঢাকা, বাংলাদেশ</li>
            </ul>
            <div className="mt-4">
              <h5 className="text-sm font-medium mb-2">নিউজলেটার</h5>
              <form className="flex gap-2" onSubmit={e => { e.preventDefault(); alert('ডেমো: নিউজলেটার সাবস্ক্রিপশন'); }}>
                <input type="email" placeholder="ইমেইল" className="flex-1 px-3 py-2 rounded bg-white/10 border border-white/20 text-sm text-white placeholder:text-gray-500" />
                <button type="submit" className="bg-forest px-4 py-2 rounded text-sm hover:bg-forest-light transition-colors">সাবস্ক্রাইব</button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} {storeSettings.brandNameBn}। সকল অধিকার সংরক্ষিত।</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>ডেমো ডেটা — প্রোডাকশনের জন্য যাচাই করুন</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// === LAYOUT WRAPPER ===
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <CartDrawer />
      <SearchModal />
      <ToastContainer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
