import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShoppingBag, Heart, Package, User, LogOut } from 'lucide-react';
import { useAuthStore, useOrderStore, useWishlistStore } from '../store';
import { getProductById, formatPrice } from '../data';

// === LOGIN PAGE ===
export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) navigate('/account');
    else setError(result.message);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-forest text-center mb-6">লগইন</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-light-border space-y-4">
          {error && <p className="text-sm text-terracotta bg-terracotta/5 p-2 rounded">{error}</p>}
          <div>
            <label className="text-sm font-medium block mb-1">ইমেইল</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" placeholder="email@example.com" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest pr-10" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors">
            লগইন
          </button>
          <p className="text-sm text-center text-warm-gray">
            অ্যাকাউন্ট নেই? <Link to="/register" className="text-forest hover:underline">রেজিস্টার করুন</Link>
          </p>
          <div className="text-xs text-center text-warm-gray border-t border-light-border pt-3">
            <p>ডেমো: যেকোনো ইমেইল ও ৬+ অক্ষরের পাসওয়ার্ড দিয়ে লগইন করুন</p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// === REGISTER PAGE ===
export const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('পাসওয়ার্ড মিলছে না'); return; }
    const result = register(form.name, form.email, form.phone, form.password);
    if (result.success) navigate('/account');
    else setError(result.message);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-forest text-center mb-6">রেজিস্টার</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-light-border space-y-4">
          {error && <p className="text-sm text-terracotta bg-terracotta/5 p-2 rounded">{error}</p>}
          <div>
            <label className="text-sm font-medium block mb-1">নাম</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">ইমেইল</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">ফোন</label>
            <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" placeholder="01XXXXXXXXX" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">পাসওয়ার্ড</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input type="password" value={form.confirm} onChange={e => setForm({...form, confirm: e.target.value})} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <button type="submit" className="w-full bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors">
            অ্যাকাউন্ট তৈরি করুন
          </button>
          <p className="text-sm text-center text-warm-gray">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login" className="text-forest hover:underline">লগইন করুন</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

// === ACCOUNT PAGE ===
export const AccountPage: React.FC = () => {
  const { user, logout, isLoggedIn } = useAuthStore();
  const { orders } = useOrderStore();
  const { items: wishlistItems } = useWishlistStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const wishlistProducts = wishlistItems.map(id => getProductById(id)).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-forest">আমার অ্যাকাউন্ট</h1>
        <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-warm-gray hover:text-terracotta flex items-center gap-1">
          <LogOut size={14} /> লগআউট
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white p-4 rounded-lg border border-light-border mb-6">
        <p className="font-medium">{user?.name}</p>
        <p className="text-sm text-warm-gray">{user?.email}</p>
        {user?.phone && <p className="text-sm text-warm-gray">{user?.phone}</p>}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-light-border mb-6">
        <button onClick={() => setTab('orders')} className={`pb-2 text-sm font-medium border-b-2 ${tab === 'orders' ? 'border-forest text-forest' : 'border-transparent text-warm-gray'}`}>
          <Package size={14} className="inline mr-1" /> অর্ডার
        </button>
        <button onClick={() => setTab('wishlist')} className={`pb-2 text-sm font-medium border-b-2 ${tab === 'wishlist' ? 'border-forest text-forest' : 'border-transparent text-warm-gray'}`}>
          <Heart size={14} className="inline mr-1" /> পছন্দের তালিকা ({wishlistItems.length})
        </button>
        <button onClick={() => setTab('profile')} className={`pb-2 text-sm font-medium border-b-2 ${tab === 'profile' ? 'border-forest text-forest' : 'border-transparent text-warm-gray'}`}>
          <User size={14} className="inline mr-1" /> প্রোফাইল
        </button>
      </div>

      {/* Orders Tab */}
      {tab === 'orders' && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-warm-gray mb-3" />
              <p className="text-warm-gray">কোনো অর্ডার নেই</p>
              <Link to="/shop" className="text-forest underline text-sm mt-2 inline-block">শপিং শুরু করুন</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-white p-4 rounded-lg border border-light-border">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-forest">{order.orderNumber}</p>
                      <p className="text-xs text-warm-gray">{new Date(order.createdAt).toLocaleDateString('bn-BD')}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                      <p className="text-xs text-forest capitalize">{order.orderStatus}</p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/70">{order.items.length}টি পণ্য</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {tab === 'wishlist' && (
        <div>
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-warm-gray mb-3" />
              <p className="text-warm-gray">পছন্দের তালিকা খালি</p>
              <Link to="/shop" className="text-forest underline text-sm mt-2 inline-block">পণ্য দেখুন</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wishlistProducts.map(p => p && (
                <Link key={p.id} to={`/product/${p.slug}`} className="group">
                  <div className="aspect-square bg-cream rounded overflow-hidden mb-2">
                    <img src={p.images[0]?.url} alt={p.nameBn} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium line-clamp-2 group-hover:text-forest">{p.nameBn}</p>
                  <p className="text-sm font-semibold text-forest">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Profile Tab */}
      {tab === 'profile' && (
        <div className="bg-white p-6 rounded-lg border border-light-border">
          <h3 className="font-semibold mb-4">প্রোফাইল তথ্য</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-warm-gray">নাম</span><span>{user?.name}</span></div>
            <div className="flex justify-between"><span className="text-warm-gray">ইমেইল</span><span>{user?.email}</span></div>
            <div className="flex justify-between"><span className="text-warm-gray">ফোন</span><span>{user?.phone || '—'}</span></div>
          </div>
          <p className="text-xs text-warm-gray mt-4 border-t border-light-border pt-3">
            ডেমো অ্যাকাউন্ট — প্রোডাকশনে Supabase Auth ব্যবহার করা হবে।
          </p>
        </div>
      )}
    </div>
  );
};

// === WISHLIST PAGE ===
export const WishlistPage: React.FC = () => {
  const { items, toggleItem } = useWishlistStore();
  const wishlistProducts = items.map(id => getProductById(id)).filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-forest mb-6">পছন্দের তালিকা</h1>
      {wishlistProducts.length === 0 ? (
        <div className="text-center py-16">
          <Heart size={64} className="mx-auto text-warm-gray mb-4" />
          <h2 className="text-lg font-medium mb-2">পছন্দের তালিকা খালি</h2>
          <p className="text-warm-gray mb-4">পছন্দের পণ্য ❤️ চিহ্ন দিয়ে যোগ করুন।</p>
          <Link to="/shop" className="bg-forest text-white px-6 py-3 rounded font-medium hover:bg-forest-light transition-colors inline-block">
            শপ দেখুন
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistProducts.map(p => p && (
            <div key={p.id} className="relative group">
              <Link to={`/product/${p.slug}`}>
                <div className="aspect-square bg-cream rounded overflow-hidden mb-2">
                  <img src={p.images[0]?.url} alt={p.nameBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-sm font-medium line-clamp-2">{p.nameBn}</p>
                <p className="text-sm font-semibold text-forest">{formatPrice(p.price)}</p>
              </Link>
              <button onClick={() => toggleItem(p.id)} className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-terracotta hover:text-white transition-colors">
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
