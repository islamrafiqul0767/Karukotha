import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, formatPrice, translateMaterialsBn } from '../data';
import { useCartStore, useWishlistStore, useUIStore } from '../store';

// === PRODUCT CARD ===
export const ProductCard: React.FC<{ product: Product; index?: number }> = ({ product, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addToast } = useUIStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent duplicate clicks
    if (isAdding || product.stock === 0) return;
    
    setIsAdding(true);
    
    if (product.stock > 0) {
      addItem(product, product.variants.length > 0 ? product.variants[0] : null, 1);
      addToast('কার্টে যোগ হয়েছে', 'success');
      setJustAdded(true);
      
      setTimeout(() => {
        setJustAdded(false);
        setIsAdding(false);
      }, 1200);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    addToast(inWishlist ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় যোগ করা হয়েছে', 'info');
  };

  const discount = product.previousPrice
    ? Math.round(((product.previousPrice - product.price) / product.previousPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col"
    >
      {/* Product Image Link */}
      <Link 
        to={`/product/${product.slug}`} 
        className="block relative aspect-square bg-cream rounded-t-lg overflow-hidden"
        aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
      >
        <img
          src={product.images[0]?.url || '/assets/brand/image-pending.svg'}
          alt={product.images[0]?.altBn || product.nameBn}
          width={400}
          height={400}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/brand/image-pending.svg'; }}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="bg-forest text-white text-[10px] px-2 py-0.5 rounded font-medium">নতুন</span>
          )}
          {product.isBestSeller && (
            <span className="bg-mustard text-charcoal text-[10px] px-2 py-0.5 rounded font-medium">বেস্ট সেলার</span>
          )}
          {discount > 0 && (
            <span className="bg-terracotta text-white text-[10px] px-2 py-0.5 rounded font-medium">-{discount}%</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            isHovered || inWishlist ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          } ${inWishlist ? 'bg-terracotta text-white' : 'bg-white text-charcoal hover:bg-cream'}`}
          aria-label={inWishlist ? 'পছন্দের তালিকা থেকে সরান' : 'পছন্দের তালিকায় যোগ করুন'}
        >
          <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded text-sm font-medium">স্টক শেষ</span>
          </div>
        )}
      </Link>

      {/* Add to Cart Button - Separate from image, below image */}
      <div className="bg-white border-x border-b border-light-border rounded-b-lg">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
          className={`w-full py-3 text-sm font-medium transition-all duration-200 disabled:bg-warm-gray disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] ${
            justAdded 
              ? 'bg-green-600 text-white' 
              : 'bg-forest text-white hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest'
          }`}
          aria-label={justAdded ? 'কার্টে যোগ হয়েছে' : `${product.nameBn} কার্টে যোগ করুন`}
          aria-busy={isAdding}
        >
          {justAdded ? (
            <>
              <Check size={18} /> যোগ হয়েছে
            </>
          ) : isAdding ? (
            <>
              <span className="spinner" /> যোগ হচ্ছে...
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> ব্যাগে যোগ করুন
            </>
          )}
        </button>
      </div>

      {/* Product Info - Below button */}
      <div className="pt-3 px-1">
        <p className="text-xs text-warm-gray mb-1">{translateMaterialsBn(product.materials)}</p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium line-clamp-2 mb-2 hover:text-forest transition-colors">
            {product.nameBn}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-forest">{formatPrice(product.price)}</span>
          {product.previousPrice && (
            <span className="text-sm text-warm-gray line-through">{formatPrice(product.previousPrice)}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

// === PRODUCT GALLERY ===
export const ProductGallery: React.FC<{ product: Product }> = ({ product }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const images = product.images;

  const handlePrev = () => setActiveIndex(i => (i > 0 ? i - 1 : images.length - 1));
  const handleNext = () => setActiveIndex(i => (i < images.length - 1 ? i + 1 : 0));

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative aspect-square bg-cream rounded overflow-hidden cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        <motion.img
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[activeIndex]?.url || '/assets/brand/image-pending.svg'}
          alt={images[activeIndex]?.altBn || images[activeIndex]?.alt || product.nameBn}
          width={800}
          height={800}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = '/assets/brand/image-pending.svg'; }}
        />
        {/* Navigation Arrows */}
        <button
          onClick={e => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
        >
          <span className="text-lg">‹</span>
        </button>
        <button
          onClick={e => { e.stopPropagation(); handleNext(); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition-colors"
        >
          <span className="text-lg">›</span>
        </button>
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
              idx === activeIndex ? 'border-forest thumb-active' : 'border-transparent hover:border-warm-gray'
            }`}
          >
            <img src={img.url} alt={img.altBn || img.alt} className="w-full h-full object-cover" loading="lazy" width={64} height={64} onError={(e) => { (e.target as HTMLImageElement).src = '/assets/brand/image-pending.svg'; }} />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setIsLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white p-2" onClick={() => setIsLightboxOpen(false)}>✕</button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 rounded-full hover:bg-white/20"
            onClick={e => { e.stopPropagation(); handlePrev(); }}
          >‹</button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 bg-white/10 rounded-full hover:bg-white/20"
            onClick={e => { e.stopPropagation(); handleNext(); }}
          >›</button>
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[activeIndex]?.url}
            alt={images[activeIndex]?.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-4 text-white text-sm">
            {activeIndex + 1} / {images.length} — {images[activeIndex]?.alt}
          </div>
        </div>
      )}
    </div>
  );
};
