import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { getPublishedBlogPosts, getBlogPostBySlug, getProductById, offers as allOffers } from '../data';
import { ProductCard } from '../components/ProductComponents';

// === BLOG LISTING ===
export const BlogPage: React.FC = () => {
  const posts = getPublishedBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-forest mb-2">জার্নাল</h1>
        <p className="text-warm-gray">হস্তশিল্প, ঐতিহ্য ও অনুপ্রেরণার গল্প</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={`/blog/${post.slug}`} className="group block">
              <div className="aspect-video bg-cream rounded-lg overflow-hidden mb-4">
                <img src={post.featuredImage} alt={post.titleBn} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="flex items-center gap-3 text-xs text-warm-gray mb-2">
                <span className="flex items-center gap-1"><Calendar size={12} />{new Date(post.publishedAt).toLocaleDateString('bn-BD')}</span>
                <span className="flex items-center gap-1"><User size={12} />{post.author}</span>
              </div>
              <h2 className="text-lg font-semibold group-hover:text-forest transition-colors line-clamp-2 mb-2">{post.titleBn}</h2>
              <p className="text-sm text-charcoal/60 line-clamp-3">{post.excerptBn}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-cream text-warm-gray px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

// === BLOG POST DETAIL ===
export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug || '');

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">আর্টিকেল পাওয়া যায়নি</h1>
        <Link to="/blog" className="text-forest underline">ব্লগে ফিরে যান</Link>
      </div>
    );
  }

  const relatedProducts = post.relatedProducts.map(id => getProductById(id)).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-warm-gray mb-6">
        <Link to="/" className="hover:text-forest">হোম</Link>
        <span className="mx-2">/</span>
        <Link to="/blog" className="hover:text-forest">ব্লগ</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{post.titleBn}</span>
      </nav>

      <article>
        <header className="mb-8">
          <div className="flex items-center gap-3 text-sm text-warm-gray mb-3">
            <span className="flex items-center gap-1"><Calendar size={14} />{new Date(post.publishedAt).toLocaleDateString('bn-BD')}</span>
            <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
            <span className="bg-cream px-2 py-0.5 rounded text-xs">{post.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-forest mb-4">{post.titleBn}</h1>
          <p className="text-lg text-charcoal/70">{post.excerptBn}</p>
        </header>

        <div className="aspect-video bg-cream rounded-lg overflow-hidden mb-8">
          <img src={post.featuredImage} alt={post.titleBn} className="w-full h-full object-cover" />
        </div>

        <div className="prose max-w-none text-charcoal/80 leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: post.contentBn }} />

        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-light-border">
          {post.tags.map(tag => (
            <span key={tag} className="text-sm bg-cream text-warm-gray px-3 py-1 rounded flex items-center gap-1">
              <Tag size={12} /> {tag}
            </span>
          ))}
        </div>
      </article>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-light-border">
          <h2 className="text-2xl font-bold text-forest mb-6">আলোচিত পণ্য</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p, idx) => p && <ProductCard key={p.id} product={p} index={idx} />)}
          </div>
        </div>
      )}
    </div>
  );
};

// === OFFERS PAGE ===
export const OffersPage: React.FC = () => {
  const activeOffers = allOffers.filter((o) => o.isActive && new Date(o.endDate) > new Date());

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-forest mb-2">বিশেষ অফার</h1>
        <p className="text-warm-gray">সীমিত সময়ের জন্য বিশেষ ছাড় ও প্রমোশন</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeOffers.map((offer: any) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-forest to-forest-light text-white p-6 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-2">{offer.publicTitleBn}</h3>
            <p className="text-white/80 text-sm mb-4">{offer.description}</p>
            {offer.code && (
              <div className="bg-white/10 rounded px-3 py-2 inline-block mb-3">
                <p className="text-xs text-white/60">কুপন কোড</p>
                <p className="font-mono font-bold text-lg">{offer.code}</p>
              </div>
            )}
            <div className="text-sm text-white/70 space-y-1 mt-3">
              {offer.minOrder && <p>সর্বনিম্ন অর্ডার: ৳{offer.minOrder}</p>}
              <p>মেয়াদ: {new Date(offer.startDate).toLocaleDateString('bn-BD')} — {new Date(offer.endDate).toLocaleDateString('bn-BD')}</p>
            </div>
            <Link to="/shop" className="mt-4 inline-block bg-white text-forest px-4 py-2 rounded text-sm font-medium hover:bg-cream transition-colors">
              এখনই কিনুন
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
