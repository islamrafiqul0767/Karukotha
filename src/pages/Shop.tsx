import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductComponents';
import { products, categories } from '../data';
import { fadeInUp, staggerContainer, pageTransition } from '../utils/animations';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode] = useState<'grid' | 'list'>('grid');

  const filterType = searchParams.get('filter');

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.isPublished);

    // Filter by type
    if (filterType === 'new') result = result.filter(p => p.isNewArrival);
    if (filterType === 'bestseller') result = result.filter(p => p.isBestSeller);
    if (filterType === 'featured') result = result.filter(p => p.isFeatured);

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.nameBn.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescBn.toLowerCase().includes(q) ||
        p.materials.some(m => m.toLowerCase().includes(q))
      );
    }

    // Category
    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    // Price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'newest': result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break;
      case 'name': result.sort((a, b) => a.nameBn.localeCompare(b.nameBn)); break;
    }

    return result;
  }, [searchQuery, selectedCategory, priceRange, sortBy, filterType]);

  const pageTitle = filterType === 'new' ? 'নতুন পণ্য' :
    filterType === 'bestseller' ? 'জনপ্রিয় পণ্য' :
    filterType === 'featured' ? 'বিশেষ নির্বাচন' :
    searchQuery ? `"${searchQuery}" এর ফলাফল` :
    'সকল পণ্য';

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Breadcrumb */}
      <motion.nav variants={fadeInUp} className="text-sm text-warm-gray mb-6">
        <Link to="/" className="hover:text-forest transition-colors">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{pageTitle}</span>
      </motion.nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-forest">{pageTitle}</h1>
          <p className="text-warm-gray text-sm mt-1">{filteredProducts.length}টি পণ্য পাওয়া গেছে</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন..."
              className="w-full pl-9 pr-4 py-2 border border-light-border rounded text-sm focus:outline-none focus:border-forest"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X size={14} className="text-warm-gray" />
              </button>
            )}
          </div>
          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden p-2 border border-light-border rounded"
          >
            <SlidersHorizontal size={18} />
          </button>
          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="hidden md:block px-3 py-2 border border-light-border rounded text-sm focus:outline-none focus:border-forest"
          >
            <option value="newest">নতুন আগে</option>
            <option value="price-low">দাম: কম থেকে বেশি</option>
            <option value="price-high">দাম: বেশি থেকে কম</option>
            <option value="name">নাম অনুযায়ী</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? 'fixed inset-0 z-50 bg-ivory p-4 overflow-y-auto' : 'hidden'} md:block md:static md:w-56 flex-shrink-0`}>
          <div className="flex items-center justify-between md:hidden mb-4">
            <h3 className="font-semibold">ফিল্টার</h3>
            <button onClick={() => setShowFilters(false)}><X size={20} /></button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">ক্যাটাগরি</h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`text-sm ${!selectedCategory ? 'text-forest font-medium' : 'text-charcoal/70 hover:text-forest'}`}
                >
                  সব ক্যাটাগরি
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-sm ${selectedCategory === cat.id ? 'text-forest font-medium' : 'text-charcoal/70 hover:text-forest'}`}
                  >
                    {cat.nameBn} ({cat.productCount})
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">মূল্য পরিসীমা</h4>
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-forest"
              />
              <div className="flex justify-between text-xs text-warm-gray">
                <span>৳{priceRange[0]}</span>
                <span>৳{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sort (mobile) */}
          <div className="md:hidden mb-6">
            <h4 className="font-medium text-sm mb-2">সাজান</h4>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-light-border rounded text-sm"
            >
              <option value="newest">নতুন আগে</option>
              <option value="price-low">দাম: কম থেকে বেশি</option>
              <option value="price-high">দাম: বেশি থেকে কম</option>
              <option value="name">নাম অনুযায়ী</option>
            </select>
          </div>

          {/* Quick filters */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">দ্রুত ফিল্টার</h4>
            <div className="space-y-1.5">
              <Link to="/shop?filter=new" className="block text-sm text-charcoal/70 hover:text-forest">নতুন পণ্য</Link>
              <Link to="/shop?filter=bestseller" className="block text-sm text-charcoal/70 hover:text-forest">বেস্ট সেলার</Link>
              <Link to="/shop?filter=featured" className="block text-sm text-charcoal/70 hover:text-forest">ফিচার্ড</Link>
            </div>
          </div>

          {/* Clear filters */}
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory(''); setPriceRange([0, 10000]); setSortBy('newest'); }}
            className="text-sm text-terracotta hover:underline"
          >
            সব ফিল্টার মুছুন
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="text-lg font-medium mb-2">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-warm-gray mb-4">অনুসন্ধান বা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory(''); setPriceRange([0, 10000]); }}
                className="text-forest underline"
              >
                সব ফিল্টার মুছুন
              </button>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// CategoryPage is handled in App.tsx via CategoryPageComponent
