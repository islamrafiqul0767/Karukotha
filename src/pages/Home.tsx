import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Truck, Shield, Leaf, Award } from 'lucide-react';
import { ProductCard } from '../components/ProductComponents';
import { categories, getFeaturedProducts, getNewArrivals, getBestSellers, getActiveOffers, getPublishedBlogPosts, storeSettings } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export const HomePage: React.FC = () => {
  const featured = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const activeOffers = getActiveOffers();
  const blogPosts = getPublishedBlogPosts().slice(0, 3);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative bg-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-6">
              <motion.p variants={fadeUp} className="text-terracotta font-medium text-sm tracking-wide uppercase">
                {storeSettings.tagline}
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-forest leading-tight">
                বাংলার কারুশিল্প,<br />আপনার ঘরে
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg text-charcoal/70 max-w-lg">
                ঐতিহ্য, যত্ন আর সৃজনশীলতায় তৈরি অনন্য সব হস্তশিল্প আবিষ্কার করুন। প্রতিটি পণ্যে থাকে বাংলাদেশের কারিগরদের ভালোবাসা।
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/shop" className="bg-forest text-white px-6 py-3 rounded font-medium hover:bg-forest-light transition-colors inline-flex items-center gap-2">
                  পণ্য দেখুন <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="border border-forest text-forest px-6 py-3 rounded font-medium hover:bg-forest hover:text-white transition-colors">
                  আমাদের গল্প
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-forest/10 to-terracotta/10 rounded-2xl overflow-hidden">
                <img
                  src="https://image.qwenlm.ai/generated-images/80ad9f58-271c-4e80-b9e7-03138a18a7a4/_result.png"
                  alt="Bangladeshi Handicrafts Collection — কারুকথা"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-forest">৩০+</p>
                <p className="text-xs text-warm-gray">হস্তশিল্প পণ্য</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: 'সারা বাংলাদেশে ডেলিভারি', sub: 'দ্রুত ও নিরাপদ' },
              { icon: Shield, text: 'নিরাপদ পেমেন্ট', sub: 'ক্যাশ অন ডেলিভারি' },
              { icon: Leaf, text: 'প্রাকৃতিক উপকরণ', sub: 'পরিবেশবান্ধব' },
              { icon: Award, text: 'হাতে তৈরি', sub: 'অনন্য শিল্পকর্ম' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon size={24} className="text-forest flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-warm-gray">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
          <h2 className="text-3xl font-bold text-forest mb-2">ক্যাটাগরি অনুযায়ী কিনুন</h2>
          <p className="text-warm-gray">বাংলার বিভিন্ন ঐতিহ্যবাহী শিল্পের সংগ্রহ</p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.slice(0, 8).map((cat, idx) => (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link to={`/category/${cat.slug}`} className="group block">
                <div className="aspect-square bg-cream rounded-lg overflow-hidden mb-2 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-forest/5 to-terracotta/5 group-hover:from-forest/10 group-hover:to-terracotta/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">
                      {idx === 0 ? '🎋' : idx === 1 ? '🏺' : idx === 2 ? '🧶' : idx === 3 ? '🧵' : idx === 4 ? '🪭' : idx === 5 ? '🧶' : idx === 6 ? '🪵' : '📜'}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-medium text-center group-hover:text-forest transition-colors">{cat.nameBn}</h3>
                <p className="text-xs text-warm-gray text-center">{cat.productCount}টি পণ্য</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-forest">বিশেষ নির্বাচন</h2>
              <p className="text-warm-gray mt-1">আমাদের সেরা হস্তশিল্প সংগ্রহ</p>
            </div>
            <Link to="/shop" className="text-forest font-medium flex items-center gap-1 hover:underline text-sm">
              সব দেখুন <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.slice(0, 8).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-forest">নতুন পণ্য</h2>
            <p className="text-warm-gray mt-1">সাম্প্রতিক সংযোজন</p>
          </div>
          <Link to="/shop?filter=new" className="text-forest font-medium flex items-center gap-1 hover:underline text-sm">
            সব দেখুন <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.slice(0, 4).map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </section>

      {/* OFFERS BANNER */}
      {activeOffers.length > 0 && (
        <section className="bg-gradient-to-r from-forest to-forest-light py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold mb-3">বিশেষ অফার</h2>
              <p className="text-white/80 mb-6">সীমিত সময়ের জন্য বিশেষ ছাড় ও অফার</p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                {activeOffers.map(offer => (
                  <div key={offer.id} className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                    <p className="font-semibold">{offer.publicTitleBn}</p>
                    {offer.code && <p className="text-sm text-white/70 mt-1">কোড: {offer.code}</p>}
                  </div>
                ))}
              </div>
              <Link to="/offers" className="bg-white text-forest px-6 py-3 rounded font-medium hover:bg-cream transition-colors inline-block">
                সব অফার দেখুন
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CRAFTSMANSHIP STORY */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-forest mb-4">হস্তশিল্পের পেছনের গল্প</h2>
              <p className="text-charcoal/70 mb-4">
                বাংলাদেশের প্রতিটি হস্তশিল্পে লুকিয়ে আছে শত বছরের ঐতিহ্য, কারিগরের নিপুণ হাতের ছাপ এবং প্রাকৃতিক উপকরণের সাথে মানুষের গভীর সম্পর্ক।
              </p>
              <p className="text-charcoal/70 mb-6">
                কারুকথায় আমরা বিশ্বাস করি — প্রতিটি হাতে তৈরি পণ্য একটি গল্প বলে। সেই গল্প আপনার ঘরে পৌঁছে দেওয়াই আমাদের কাজ।
              </p>
              <Link to="/about" className="text-forest font-medium flex items-center gap-1 hover:underline">
                আমাদের গল্প জানুন <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src="https://image.qwenlm.ai/generated-images/d61b27d1-29e7-4737-934d-3024eff7d869/_result.png"
                alt="কারিগরের হাতে বাঁশ বোনার কাজ"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-white p-3 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-forest">হাতে তৈরি</p>
              <p className="text-xs text-warm-gray">প্রতিটি পণ্যে ভালোবাসা</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-forest">জনপ্রিয় পণ্য</h2>
              <p className="text-warm-gray mt-1">সবচেয়ে বেশি পছন্দ করা পণ্যসমূহ</p>
            </div>
            <Link to="/shop?filter=bestseller" className="text-forest font-medium flex items-center gap-1 hover:underline text-sm">
              সব দেখুন <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.slice(0, 4).map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-forest">জার্নাল</h2>
            <p className="text-warm-gray mt-1">হস্তশিল্প, ঐতিহ্য ও অনুপ্রেরণা</p>
          </div>
          <Link to="/blog" className="text-forest font-medium flex items-center gap-1 hover:underline text-sm">
            সব পড়ুন <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="group block">
                <div className="aspect-video bg-cream rounded-lg overflow-hidden mb-3">
                  <img src={post.featuredImage} alt={post.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <p className="text-xs text-warm-gray mb-1">{new Date(post.publishedAt).toLocaleDateString('bn-BD')} • {post.category}</p>
                <h3 className="font-semibold group-hover:text-forest transition-colors line-clamp-2">{post.titleBn}</h3>
                <p className="text-sm text-charcoal/60 mt-1 line-clamp-2">{post.excerptBn}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-forest py-16">
        <div className="max-w-xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">আমাদের সাথে যুক্ত থাকুন</h2>
          <p className="text-white/70 mb-6">নতুন পণ্য, অফার ও হস্তশিল্পের গল্প সরাসরি আপনার ইনবক্সে।</p>
          <form onSubmit={e => { e.preventDefault(); alert('ডেমো: সাবস্ক্রিপশন সফল!'); }} className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="flex-1 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50"
            />
            <button type="submit" className="bg-terracotta text-white px-6 py-3 rounded font-medium hover:bg-terracotta-light transition-colors">
              সাবস্ক্রাইব
            </button>
          </form>
          <p className="text-xs text-white/50 mt-3">আমরা আপনার তথ্য গোপন রাখি। যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।</p>
        </div>
      </section>
    </div>
  );
};
