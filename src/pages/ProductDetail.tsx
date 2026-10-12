import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Minus, Plus, Truck, RotateCcw, Shield, Star, ChevronRight } from 'lucide-react';
import { ProductGallery, ProductCard } from '../components/ProductComponents';
import { getProductBySlug, getProductsByCategory, categories, formatPrice } from '../data';
import { useCartStore, useWishlistStore, useUIStore } from '../store';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || '');
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { openCart, addToast } = useUIStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">পণ্য পাওয়া যায়নি</h1>
        <Link to="/shop" className="text-forest underline">শপে ফিরে যান</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const variant = product.variants[selectedVariant] || null;
  const currentPrice = product.price + (variant?.priceModifier || 0);
  const currentStock = variant ? variant.stock : product.stock;
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = getProductsByCategory(product.categoryId).filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (currentStock > 0) {
      addItem(product, variant, quantity);
      addToast('ব্যাগে যোগ করা হয়েছে', 'success');
      openCart();
    }
  };

  const handleBuyNow = () => {
    if (currentStock > 0) {
      addItem(product, variant, quantity);
      navigate('/checkout');
    }
  };

  const discount = product.previousPrice
    ? Math.round(((product.previousPrice - currentPrice) / product.previousPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-warm-gray mb-6 flex items-center flex-wrap gap-1">
        <Link to="/" className="hover:text-forest">হোম</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-forest">শপ</Link>
        <ChevronRight size={12} />
        {category && <><Link to={`/category/${category.slug}`} className="hover:text-forest">{category.nameBn}</Link><ChevronRight size={12} /></>}
        <span className="text-charcoal truncate">{product.nameBn}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <ProductGallery product={product} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            {product.isDemoData && (
              <span className="inline-block bg-charcoal/10 text-charcoal text-xs px-2 py-0.5 rounded mb-2">DEMO DATA</span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-forest mb-2">{product.nameBn}</h1>
            <p className="text-sm text-warm-gray">{product.nameEn}</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className={s <= Math.round(product.rating) ? 'text-mustard fill-mustard' : 'text-warm-gray'} />
                ))}
              </div>
              <span className="text-sm text-warm-gray">({product.reviewCount} রিভিউ)</span>
              <span className="text-sm text-warm-gray">SKU: {product.sku}</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-forest">{formatPrice(currentPrice)}</span>
            {product.previousPrice && (
              <>
                <span className="text-lg text-warm-gray line-through">{formatPrice(product.previousPrice + (variant?.priceModifier || 0))}</span>
                <span className="bg-terracotta/10 text-terracotta text-sm px-2 py-0.5 rounded font-medium">-{discount}%</span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div>
            {currentStock > 0 ? (
              <p className="text-sm text-forest font-medium">✓ স্টকে আছে ({currentStock}টি)</p>
            ) : (
              <p className="text-sm text-terracotta font-medium">✕ স্টক শেষ</p>
            )}
          </div>

          {/* Short Description */}
          <p className="text-charcoal/70">{product.shortDescBn}</p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">ভেরিয়েন্ট নির্বাচন করুন</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVariant(idx); setQuantity(1); }}
                    className={`px-4 py-2 border rounded text-sm transition-all ${
                      idx === selectedVariant
                        ? 'border-forest bg-forest/5 text-forest font-medium'
                        : 'border-light-border hover:border-forest text-charcoal/70'
                    } ${v.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={v.stock === 0}
                  >
                    {v.nameBn}
                    {v.priceModifier > 0 && <span className="ml-1 text-xs">(+৳{v.priceModifier})</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium mb-2 block">পরিমাণ</label>
            <div className="flex items-center border border-light-border rounded w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-cream transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 border-x border-light-border min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                className="px-3 py-2 hover:bg-cream transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={currentStock === 0}
              className="flex-1 bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors disabled:bg-warm-gray disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> ব্যাগে যোগ করুন
            </button>
            <button
              onClick={handleBuyNow}
              disabled={currentStock === 0}
              className="flex-1 bg-terracotta text-white py-3 rounded font-medium hover:bg-terracotta-light transition-colors disabled:bg-warm-gray disabled:cursor-not-allowed"
            >
              এখনই কিনুন
            </button>
            <button
              onClick={() => { toggleItem(product.id); addToast(inWishlist ? 'সরানো হয়েছে' : 'যোগ করা হয়েছে', 'info'); }}
              className={`p-3 border rounded transition-colors ${inWishlist ? 'border-terracotta text-terracotta bg-terracotta/5' : 'border-light-border hover:border-forest'}`}
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="border border-light-border rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck size={18} className="text-forest" />
              <span>ঢাকায় ২-৩ দিন, ঢাকার বাইরে ৩-৫ দিন</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw size={18} className="text-forest" />
              <span>৭ দিনের মধ্যে রিটার্ন/এক্সচেঞ্জ</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield size={18} className="text-forest" />
              <span>নিরাপদ পেমেন্ট ও প্যাকেজিং</span>
            </div>
          </div>

          {/* Materials & Dimensions */}
          <div className="text-sm space-y-2">
            <div className="flex gap-2">
              <span className="text-warm-gray min-w-[80px]">উপকরণ:</span>
              <span>{product.materials.join(', ')}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-warm-gray min-w-[80px]">মাপ:</span>
              <span>{product.dimensions}</span>
            </div>
            {product.weight && (
              <div className="flex gap-2">
                <span className="text-warm-gray min-w-[80px]">ওজন:</span>
                <span>{product.weight}</span>
              </div>
            )}
            {product.craftTechnique && (
              <div className="flex gap-2">
                <span className="text-warm-gray min-w-[80px]">শিল্পকৌশল:</span>
                <span>{product.craftTechnique}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 border-t border-light-border pt-8">
        <div className="flex gap-6 border-b border-light-border mb-6">
          {(['description', 'details', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab ? 'border-forest text-forest' : 'border-transparent text-warm-gray hover:text-charcoal'
              }`}
            >
              {tab === 'description' ? 'বিবরণ' : tab === 'details' ? 'বিস্তারিত' : 'রিভিউ'}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none text-charcoal/80">
            <p>{product.descriptionBn}</p>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-cream p-4 rounded">
              <h4 className="font-medium mb-2">পণ্যের তথ্য</h4>
              <dl className="space-y-1">
                <dt className="text-warm-gray">SKU</dt><dd>{product.sku}</dd>
                <dt className="text-warm-gray">উপকরণ</dt><dd>{product.materials.join(', ')}</dd>
                <dt className="text-warm-gray">মাপ</dt><dd>{product.dimensions}</dd>
                <dt className="text-warm-gray">ওজন</dt><dd>{product.weight}</dd>
                <dt className="text-warm-gray">শিল্পকৌশল</dt><dd>{product.craftTechnique}</dd>
              </dl>
            </div>
            <div className="bg-cream p-4 rounded">
              <h4 className="font-medium mb-2">শিপিং তথ্য</h4>
              <dl className="space-y-1">
                <dt className="text-warm-gray">ঢাকা সিটি</dt><dd>৳৬০ — ২-৩ দিন</dd>
                <dt className="text-warm-gray">ঢাকা বিভাগ</dt><dd>৳১০০ — ৩-৪ দিন</dd>
                <dt className="text-warm-gray">অন্যান্য বিভাগ</dt><dd>৳১৩০ — ৪-৫ দিন</dd>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="text-center py-8">
            <p className="text-warm-gray mb-4">এই পণ্যে এখনো কোনো রিভিউ নেই।</p>
            <p className="text-sm text-warm-gray">প্রথম রিভিউ দিতে অর্ডার করুন।</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-forest mb-6">একই ক্যাটাগরির পণ্য</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
