import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users, Tag, FileText, Star, Settings, BarChart3, Image, Eye, Edit, Trash2, Plus, LogOut } from 'lucide-react';
import { useAuthStore, useOrderStore } from '../store';
import { products, categories, blogPosts, offers, formatPrice } from '../data';

// === ADMIN LOGIN ===
export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = adminLogin(email, password);
    if (result.success) navigate('/admin');
    else setError(result.message);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold">কা</span>
          </div>
          <h1 className="text-xl font-bold text-forest">অ্যাডমিন লগইন</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-light-border space-y-4">
          {error && <p className="text-sm text-terracotta bg-terracotta/5 p-2 rounded">{error}</p>}
          <div>
            <label className="text-sm font-medium block mb-1">ইমেইল</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">পাসওয়ার্ড</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
          </div>
          <button type="submit" className="w-full bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors">
            লগইন
          </button>
          <div className="text-xs text-center text-warm-gray border-t border-light-border pt-3">
            <p>ডেমো: admin@karukotha.com / admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

// === ADMIN DASHBOARD ===
export const AdminDashboard: React.FC = () => {
  const { isAdmin, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'pending').length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  const menuItems = [
    { id: 'overview', label: 'ড্যাশবোর্ড', icon: BarChart3 },
    { id: 'products', label: 'পণ্য', icon: Package },
    { id: 'orders', label: 'অর্ডার', icon: ShoppingCart },
    { id: 'categories', label: 'ক্যাটাগরি', icon: Tag },
    { id: 'blog', label: 'ব্লগ', icon: FileText },
    { id: 'offers', label: 'অফার', icon: Tag },
    { id: 'reviews', label: 'রিভিউ', icon: Star },
    { id: 'media', label: 'মিডিয়া', icon: Image },
    { id: 'settings', label: 'সেটিংস', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-forest text-white p-4 hidden lg:block">
        <div className="mb-8">
          <h2 className="text-lg font-bold">কারুকথা অ্যাডমিন</h2>
          <p className="text-xs text-white/60">ম্যানেজমেন্ট প্যানেল</p>
        </div>
        <nav className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                activeSection === item.id ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-8 pt-4 border-t border-white/10">
          <button onClick={() => { logout(); navigate('/'); }} className="text-sm text-white/60 hover:text-white flex items-center gap-2">
            <LogOut size={14} /> লগআউট
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Mobile menu */}
        <div className="lg:hidden mb-4 overflow-x-auto">
          <div className="flex gap-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-1.5 rounded text-xs whitespace-nowrap ${
                  activeSection === item.id ? 'bg-forest text-white' : 'bg-white border border-light-border'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview */}
        {activeSection === 'overview' && (
          <div>
            <h1 className="text-2xl font-bold text-forest mb-6">ড্যাশবোর্ড</h1>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'মোট অর্ডার', value: orders.length, color: 'bg-forest' },
                { label: 'পেন্ডিং অর্ডার', value: pendingOrders, color: 'bg-mustard' },
                { label: 'মোট আয়', value: formatPrice(totalRevenue), color: 'bg-terracotta' },
                { label: 'কম স্টক', value: lowStockProducts, color: 'bg-earth' },
              ].map((card, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                  className="bg-white p-4 rounded-lg border border-light-border">
                  <p className="text-xs text-warm-gray">{card.label}</p>
                  <p className="text-xl font-bold text-charcoal mt-1">{card.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg border border-light-border p-4 mb-6">
              <h3 className="font-semibold mb-3">সাম্প্রতিক অর্ডার</h3>
              {orders.length === 0 ? (
                <p className="text-sm text-warm-gray">কোনো অর্ডার নেই</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-light-border">
                        <th className="text-left py-2 px-2">অর্ডার নং</th>
                        <th className="text-left py-2 px-2">গ্রাহক</th>
                        <th className="text-left py-2 px-2">মোট</th>
                        <th className="text-left py-2 px-2">অবস্থা</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b border-light-border/50">
                          <td className="py-2 px-2 font-medium text-forest">{order.orderNumber}</td>
                          <td className="py-2 px-2">{order.customerName}</td>
                          <td className="py-2 px-2">{formatPrice(order.total)}</td>
                          <td className="py-2 px-2">
                            <span className="bg-cream text-charcoal text-xs px-2 py-0.5 rounded">{order.orderStatus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border border-light-border p-4">
                <h3 className="font-semibold mb-3">পণ্য পরিসংখ্যান</h3>
                <div className="space-y-2 text-sm">
                  <p>মোট পণ্য: {products.length}</p>
                  <p>প্রকাশিত: {products.filter(p => p.isPublished).length}</p>
                  <p>ফিচার্ড: {products.filter(p => p.isFeatured).length}</p>
                  <p>নতুন: {products.filter(p => p.isNewArrival).length}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg border border-light-border p-4">
                <h3 className="font-semibold mb-3">ব্লগ পরিসংখ্যান</h3>
                <div className="space-y-2 text-sm">
                  <p>মোট পোস্ট: {blogPosts.length}</p>
                  <p>প্রকাশিত: {blogPosts.filter(p => p.isPublished).length}</p>
                  <p>খসড়া: {blogPosts.filter(p => !p.isPublished).length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Management */}
        {activeSection === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-forest">পণ্য ব্যবস্থাপনা</h1>
              <button className="bg-forest text-white px-4 py-2 rounded text-sm flex items-center gap-1 hover:bg-forest-light">
                <Plus size={14} /> নতুন পণ্য
              </button>
            </div>
            <div className="bg-white rounded-lg border border-light-border overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-light-border bg-cream/50">
                    <th className="text-left py-3 px-3">পণ্য</th>
                    <th className="text-left py-3 px-3">SKU</th>
                    <th className="text-left py-3 px-3">মূল্য</th>
                    <th className="text-left py-3 px-3">স্টক</th>
                    <th className="text-left py-3 px-3">অবস্থা</th>
                    <th className="text-left py-3 px-3">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 15).map(product => (
                    <tr key={product.id} className="border-b border-light-border/50 hover:bg-cream/30">
                      <td className="py-2 px-3">
                        <div className="flex items-center gap-2">
                          <img src={product.images[0]?.url} alt="" className="w-8 h-8 rounded object-cover" />
                          <span className="font-medium line-clamp-1">{product.nameBn}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-warm-gray">{product.sku}</td>
                      <td className="py-2 px-3">{formatPrice(product.price)}</td>
                      <td className="py-2 px-3">
                        <span className={product.stock < 10 ? 'text-terracotta' : ''}>{product.stock}</span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`text-xs px-2 py-0.5 rounded ${product.isPublished ? 'bg-forest/10 text-forest' : 'bg-warm-gray/10 text-warm-gray'}`}>
                          {product.isPublished ? 'প্রকাশিত' : 'খসড়া'}
                        </span>
                        {product.isDemoData && <span className="ml-1 text-xs text-warm-gray">(DEMO)</span>}
                      </td>
                      <td className="py-2 px-3">
                        <div className="flex gap-1">
                          <button className="p-1 hover:bg-cream rounded"><Eye size={14} /></button>
                          <button className="p-1 hover:bg-cream rounded"><Edit size={14} /></button>
                          <button className="p-1 hover:bg-cream rounded text-terracotta"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Management */}
        {activeSection === 'orders' && (
          <div>
            <h1 className="text-2xl font-bold text-forest mb-6">অর্ডার ব্যবস্থাপনা</h1>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-light-border">
                <ShoppingCart size={48} className="mx-auto text-warm-gray mb-3" />
                <p className="text-warm-gray">কোনো অর্ডার নেই</p>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-light-border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-light-border bg-cream/50">
                      <th className="text-left py-3 px-3">অর্ডার নং</th>
                      <th className="text-left py-3 px-3">গ্রাহক</th>
                      <th className="text-left py-3 px-3">ফোন</th>
                      <th className="text-left py-3 px-3">মোট</th>
                      <th className="text-left py-3 px-3">পেমেন্ট</th>
                      <th className="text-left py-3 px-3">অবস্থা</th>
                      <th className="text-left py-3 px-3">তারিখ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-b border-light-border/50">
                        <td className="py-2 px-3 font-medium text-forest">{order.orderNumber}</td>
                        <td className="py-2 px-3">{order.customerName}</td>
                        <td className="py-2 px-3">{order.phone}</td>
                        <td className="py-2 px-3">{formatPrice(order.total)}</td>
                        <td className="py-2 px-3">
                          <span className={`text-xs px-2 py-0.5 rounded ${order.paymentStatus === 'paid' ? 'bg-forest/10 text-forest' : 'bg-mustard/10 text-earth'}`}>
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <select
                            value={order.orderStatus}
                            onChange={e => {
                              const { updateOrderStatus } = useOrderStore.getState();
                              updateOrderStatus(order.id, e.target.value as any);
                            }}
                            className="text-xs border border-light-border rounded px-2 py-1"
                          >
                            <option value="pending">পেন্ডিং</option>
                            <option value="confirmed">নিশ্চিত</option>
                            <option value="preparing">প্রস্তুতি</option>
                            <option value="shipped">পাঠানো হয়েছে</option>
                            <option value="delivered">ডেলিভারি হয়েছে</option>
                            <option value="cancelled">বাতিল</option>
                          </select>
                        </td>
                        <td className="py-2 px-3 text-warm-gray">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {activeSection === 'categories' && (
          <div>
            <h1 className="text-2xl font-bold text-forest mb-6">ক্যাটাগরি ব্যবস্থাপনা</h1>
            <div className="grid md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-white p-4 rounded-lg border border-light-border flex items-center justify-between">
                  <div>
                    <p className="font-medium">{cat.nameBn}</p>
                    <p className="text-sm text-warm-gray">{cat.nameEn} — {cat.productCount}টি পণ্য</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-cream rounded"><Edit size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blog Management */}
        {activeSection === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-forest">ব্লগ ব্যবস্থাপনা</h1>
              <button className="bg-forest text-white px-4 py-2 rounded text-sm flex items-center gap-1 hover:bg-forest-light">
                <Plus size={14} /> নতুন পোস্ট
              </button>
            </div>
            <div className="space-y-3">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-white p-4 rounded-lg border border-light-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={post.featuredImage} alt="" className="w-12 h-12 rounded object-cover" />
                    <div>
                      <p className="font-medium">{post.titleBn}</p>
                      <p className="text-xs text-warm-gray">{new Date(post.publishedAt).toLocaleDateString('bn-BD')} • {post.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${post.isPublished ? 'bg-forest/10 text-forest' : 'bg-mustard/10 text-earth'}`}>
                      {post.isPublished ? 'প্রকাশিত' : 'খসড়া'}
                    </span>
                    <button className="p-1 hover:bg-cream rounded"><Edit size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offers Management */}
        {activeSection === 'offers' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-forest">অফার ব্যবস্থাপনা</h1>
              <button className="bg-forest text-white px-4 py-2 rounded text-sm flex items-center gap-1 hover:bg-forest-light">
                <Plus size={14} /> নতুন অফার
              </button>
            </div>
            <div className="space-y-3">
              {offers.map(offer => (
                <div key={offer.id} className="bg-white p-4 rounded-lg border border-light-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{offer.publicTitleBn}</p>
                      <p className="text-sm text-warm-gray">
                        {offer.type === 'percentage' ? `${offer.value}% ছাড়` : offer.type === 'fixed' ? `৳${offer.value} ছাড়` : 'ফ্রি ডেলিভারি'}
                        {offer.code && ` • কোড: ${offer.code}`}
                      </p>
                      <p className="text-xs text-warm-gray">
                        ব্যবহার: {offer.usageCount}/{offer.usageLimit || '∞'} • মেয়াদ: {new Date(offer.endDate).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${offer.isActive ? 'bg-forest/10 text-forest' : 'bg-terracotta/10 text-terracotta'}`}>
                        {offer.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </span>
                      <button className="p-1 hover:bg-cream rounded"><Edit size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeSection === 'reviews' && (
          <div>
            <h1 className="text-2xl font-bold text-forest mb-6">রিভিউ মডারেশন</h1>
            <div className="bg-white p-8 rounded-lg border border-light-border text-center">
              <Star size={48} className="mx-auto text-warm-gray mb-3" />
              <p className="text-warm-gray">কোনো রিভিউ নেই</p>
              <p className="text-sm text-warm-gray mt-2">গ্রাহকরা রিভিউ দিলে এখানে দেখা যাবে।</p>
            </div>
          </div>
        )}

        {/* Media */}
        {activeSection === 'media' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-forest">মিডিয়া লাইব্রেরি</h1>
              <button className="bg-forest text-white px-4 py-2 rounded text-sm flex items-center gap-1 hover:bg-forest-light">
                <Plus size={14} /> আপলোড
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg border border-light-border text-center">
              <Image size={48} className="mx-auto text-warm-gray mb-3" />
              <p className="text-warm-gray">মিডিয়া লাইব্রেরি খালি</p>
              <p className="text-sm text-warm-gray mt-2">প্রোডাকশনে Supabase Storage ব্যবহার করা হবে।</p>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeSection === 'settings' && (
          <div>
            <h1 className="text-2xl font-bold text-forest mb-6">সাইট সেটিংস</h1>
            <div className="bg-white p-6 rounded-lg border border-light-border space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">ব্র্যান্ড নাম (বাংলা)</label>
                <input type="text" defaultValue="কারুকথা" className="w-full px-3 py-2 border border-light-border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">ব্র্যান্ড নাম (English)</label>
                <input type="text" defaultValue="Karukotha" className="w-full px-3 py-2 border border-light-border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">অ্যানাউন্সমেন্ট বার</label>
                <input type="text" defaultValue="🎉 সকল পণ্যে ১৫% ছাড়! কোড: EID15" className="w-full px-3 py-2 border border-light-border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">যোগাযোগ ইমেইল</label>
                <input type="email" defaultValue="[placeholder@example.com]" className="w-full px-3 py-2 border border-light-border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">যোগাযোগ ফোন</label>
                <input type="tel" defaultValue="[placeholder-phone]" className="w-full px-3 py-2 border border-light-border rounded" />
              </div>
              <button className="bg-forest text-white px-6 py-2 rounded font-medium hover:bg-forest-light">
                সংরক্ষণ করুন
              </button>
              <p className="text-xs text-warm-gray">ডেমো: প্রোডাকশনে ডাটাবেসে সংরক্ষণ হবে।</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
