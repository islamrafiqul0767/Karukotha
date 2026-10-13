import React from 'react';
import { BrowserRouter, Routes, Route, useParams, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ShopPage } from './pages/Shop';
import { ProductDetailPage } from './pages/ProductDetail';
import { CartPage, CheckoutPage, OrderConfirmationPage } from './pages/CartCheckout';
import { BlogPage, BlogPostPage, OffersPage } from './pages/BlogOffers';
import { AboutPage, ContactPage, FAQPage, ShippingPage, ReturnsPage, PrivacyPage, TermsPage } from './pages/StaticPages';
import { LoginPage, RegisterPage, AccountPage, WishlistPage } from './pages/Auth';
import { AdminLoginPage, AdminDashboard } from './pages/Admin';
import { OrderTrackingPage } from './pages/OrderTracking';
import { categories, products } from './data';
import { ProductCard } from './components/ProductComponents';

// Category page component
const CategoryPageComponent: React.FC = () => {
  const { catSlug } = useParams<{ catSlug: string }>();
  const category = categories.find(c => c.slug === catSlug);
  const categoryProducts = products.filter(p => p.categoryId === category?.id && p.isPublished);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">ক্যাটাগরি পাওয়া যায়নি</h1>
        <Link to="/shop" className="text-forest underline">সকল পণ্য দেখুন</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-sm text-warm-gray mb-6">
        <Link to="/" className="hover:text-forest">হোম</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-forest">শপ</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{category.nameBn}</span>
      </nav>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest mb-2">{category.nameBn}</h1>
        <p className="text-warm-gray">{category.descriptionBn}</p>
        <p className="text-sm text-warm-gray mt-2">{categoryProducts.length}টি পণ্য</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {categoryProducts.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes (no layout) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Public routes (with layout) */}
        <Route path="*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/category/:catSlug" element={<CategoryPageComponent />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/order-tracking" element={<OrderTrackingPage />} />
              {/* 404 Page */}
              <Route path="*" element={
                <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                  <h1 className="text-6xl font-bold text-forest mb-4">৪০৪</h1>
                  <h2 className="text-2xl font-semibold text-charcoal mb-3">পৃষ্ঠা পাওয়া যায়নি</h2>
                  <p className="text-warm-gray mb-8">আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই বা সরিয়ে ফেলা হয়েছে।</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/shop" className="bg-forest text-white px-6 py-3 rounded font-medium hover:bg-forest-light transition-colors inline-flex items-center justify-center gap-2">
                      শপে ফিরুন
                    </Link>
                    <Link to="/" className="border border-forest text-forest px-6 py-3 rounded font-medium hover:bg-cream transition-colors">
                      হোম
                    </Link>
                  </div>
                  {/* Search */}
                  <div className="mt-8 max-w-md mx-auto">
                    <p className="text-sm text-warm-gray mb-2">অথবা পণ্য খুঁজুন:</p>
                    <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.querySelector('input'); if (input?.value) window.location.href = `/shop?search=${encodeURIComponent(input.value)}`; }}>
                      <input type="text" placeholder="পণ্যের নাম লিখুন..." className="w-full px-4 py-3 border border-light-border rounded focus:outline-none focus:border-forest" />
                    </form>
                  </div>
                </div>
              } />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
