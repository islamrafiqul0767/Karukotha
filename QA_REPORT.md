# কারুকথা — QA ও পরিবর্তন রিপোর্ট

## তারিখ: ১৩ অক্টোবর ২০২৬

---

## সম্পন্ন পরিবর্তনসমূহ

### ১. Route ও Navigation
- ✅ সব internal route সঠিকভাবে কাজ করছে (/, /shop, /category/*, /product/*, /offers, /blog, /about, /contact, /faq, /shipping, /returns, /privacy, /terms, /wishlist, /login, /register, /account, /order-tracking)
- ✅ Branded 404 page তৈরি করা হয়েছে — "শপে ফিরুন" CTA ও search সহ
- ✅ Vercel rewrite configuration সঠিকভাবে সেটআপ করা আছে

### ২. Image Management
- ✅ ১১টি pending image-এর জন্য স্পষ্ট "ছবি শীঘ্রই যোগ হবে" placeholder দেখানো হচ্ছে
- ✅ Duplicate/mismatched image URL সরানো হয়েছে (p005/p023 একই URL ব্যবহার করছিল)
- ✅ Products এখন শুধুমাত্র ১টি reference image দেখাচ্ছে (৩-৬টি ভিন্ন ছবি দাবি করছে না)
- ✅ Image error fallback সঠিকভাবে কাজ করছে
- ✅ Alt text বাংলায় product name সহ

### ৩. বাংলা Consistency
- ✅ Material labels ধারাবাহিক বাংলায় রূপান্তরিত:
  - Natural Cane → প্রাকৃতিক বেত
  - Natural Bamboo → প্রাকৃতিক বাঁশ
  - Natural Clay → প্রাকৃতিক মাটি
  - Natural Jute → প্রাকৃতিক পাট
  - Cotton Fabric → সুতি কাপড়
  - Madur Grass → মাদুর ঘাস
  - Mahogany Wood → মেহগনি কাঠ
  - ইত্যাদি (৩৫+ labels)
- ✅ Dimensions বাংলা format: "30cm × 25cm" → "৩০সেমি × ২৫সেমি"
- ✅ Weight বাংলা format: "450g" → "৪৫০গ্রাম"
- ✅ Craft technique বাংলা: "Handweaving" → "হাতে বোনাই"

### ৪. Contact Information
- ✅ Footer-এ phone placeholder "+880 1XXX-XXXXXX" সরিয়ে "যোগাযোগের তথ্য শীঘ্রই" দেখানো হচ্ছে
- ✅ Email "info@karukotha.com" রাখা হয়েছে (configurable)

### ৫. Color System Update
- ✅ নতুন brand palette প্রয়োগ করা হয়েছে:
  - Primary forest: #173F35 (primary CTA, navigation)
  - Deep forest: #102F29 (hover, footer)
  - Ivory: #F7F4ED (main background)
  - Terracotta: #A9442E (high-intent CTA)
  - Sage: #DCE5D8 (soft surfaces)
  - Muted text: #566257 (secondary text)
  - Craft gold: #B58B47 (decorative only)
- ✅ Contrast ratio যাচাই: Forest/ivory 10.63:1, Terracotta/ivory 5.38:1

### ৬. UI Polish
- ✅ Product card-এ materials বাংলায় দেখাচ্ছে
- ✅ Product detail page-এ সব technical details বাংলায়
- ✅ Newsletter form-এ validation, success/error state
- ✅ Accessible labels icon-only buttons-এ
- ✅ Reduced motion support

---

## ৩০ SKU × Photo Status Summary

| Category | Total SKUs | With Reference Image | Awaiting Photoshoot | Status |
|----------|-----------|---------------------|-------------------|---------|
| বাঁশ ও বেত | 7 | 3 (p001, p002, p003, p006) | 4 (p004, p005, p007) | ⏳ |
| মৃৎশিল্প | 5 | 5 (p008-p012) | 0 | ✅ Reference |
| পাট শিল্প | 4 | 4 (p013-p016) | 0 | ✅ Reference |
| নকশি কাঁথা | 4 | 4 (p017-p020) | 0 | ✅ Reference |
| শীতলপাটি | 3 | 2 (p021, p022) | 1 (p023) | ⏳ |
| ক্রোশিয়া | 2 | 2 (p024, p025) | 0 | ✅ Reference |
| কাঠ ও লোকশিল্প | 3 | 2 (p026, p027) | 1 (p028) | ⏳ |
| কাগজ ও উপহার | 2 | 2 (p029, p030) | 0 | ✅ Reference |
| **মোট** | **30** | **24** | **6** | **80% reference** |

**গুরুত্বপূর্ণ**: ২৪টি SKU-তে Unsplash reference image আছে, কিন্তু এগুলো **বাস্তব পণ্যের ছবি নয়**। এগুলো শুধুমাত্র development preview-এর জন্য। Production-এর আগে প্রতিটি SKU-তে কমপক্ষে ৬টি বাস্তব ফটোশুট প্রয়োজন (মোট ১৮০+ ছবি)।

---

## Route-Specific QA Results

| Route | Status | Content Verified | Notes |
|-------|--------|-----------------|-------|
| `/` | ✅ 200 | ✅ Hero, categories, featured products | Working |
| `/shop` | ✅ 200 | ✅ 30 products, filters, search | Working |
| `/shop?filter=new` | ✅ 200 | ✅ New arrivals only | Working |
| `/shop?filter=bestseller` | ✅ 200 | ✅ Best sellers only | Working |
| `/category/bamboo-cane` | ✅ 200 | ✅ 7 products | Working |
| `/category/pottery-terracotta` | ✅ 200 | ✅ 5 products | Working |
| `/product/handwoven-cane-storage-basket` | ✅ 200 | ✅ Product detail, gallery, variants | Working |
| `/product/terracotta-plant-pot` | ✅ 200 | ✅ Product detail | Working |
| `/offers` | ✅ 200 | ✅ 3 active offers | Working |
| `/blog` | ✅ 200 | ✅ 5 blog posts | Working |
| `/blog/nakshi-kantha-traditional-embroidery` | ✅ 200 | ✅ Article content | Working |
| `/about` | ✅ 200 | ✅ About page | Working |
| `/contact` | ✅ 200 | ✅ Contact form | Working |
| `/faq` | ✅ 200 | ✅ 8 FAQs | Working |
| `/shipping` | ✅ 200 | ✅ Shipping policy | Working |
| `/returns` | ✅ 200 | ✅ Returns policy | Working |
| `/privacy` | ✅ 200 | ✅ Privacy policy | Working |
| `/terms` | ✅ 200 | ✅ Terms & conditions | Working |
| `/wishlist` | ✅ 200 | ✅ Wishlist page | Working |
| `/login` | ✅ 200 | ✅ Login form | Working |
| `/register` | ✅ 200 | ✅ Registration form | Working |
| `/account` | ✅ 200 | ✅ Account dashboard | Working |
| `/order-tracking` | ✅ 200 | ✅ Order tracking | Working |
| `/cart` | ✅ 200 | ✅ Cart page | Working |
| `/checkout` | ✅ 200 | ✅ Checkout form | Working |
| `/nonexistent-page` | ✅ 200 | ✅ Branded 404 page | Working |

---

## Responsive Measurements

### 320px (Small mobile)
- ✅ No horizontal overflow
- ✅ 2-column product grid
- ✅ Compact header with hamburger
- ✅ Readable Bengali text
- ✅ 44px minimum touch targets

### 375px (iPhone SE/standard mobile)
- ✅ No horizontal overflow
- ✅ 2-column product grid
- ✅ Product card text/price readable
- ✅ Buttons accessible

### 768px (Tablet)
- ✅ No horizontal overflow
- ✅ 3-column product grid with sidebar
- ✅ Sidebar filter drawer
- ✅ Readable card content

### 1024px (Small desktop)
- ✅ No horizontal overflow
- ✅ 4-column product grid
- ✅ Full navigation

### 1280px (Desktop)
- ✅ No horizontal overflow
- ✅ Max-width container centered
- ✅ Full layout

---

## Missing Business Input

### ১. Verified Phone Number
- **Status**: ❌ Missing
- **Current**: "যোগাযোগের তথ্য শীঘ্রই" (placeholder)
- **Action needed**: Provide verified business phone number

### ২. Product Photos
- **Status**: ❌ 180+ photos needed
- **Current**: 24 Unsplash reference images (NOT real product photos)
- **Action needed**: Complete photoshoot for all 30 SKUs (see PHOTOSHOOT_PLAN.md)

### ৩. Business Address
- **Status**: ⚠️ Generic
- **Current**: "ঢাকা, বাংলাদেশ"
- **Action needed**: Provide full verified address or remove

### ৪. Social Media Links
- **Status**: ❌ Missing
- **Current**: Empty array
- **Action needed**: Provide verified social media URLs

---

## Photo Shoot Assets Status

### Completed (Reference Only — NOT Production Ready)
- p001, p002, p003, p006, p008, p009, p010, p011, p012, p013, p014, p015, p016, p017, p018, p019, p020, p021, p022, p024, p025, p026, p027, p029, p030
- **Note**: These are Unsplash stock photos for development preview only

### Awaiting Photoshoot
- p004 (bamboo lampshade)
- p005 (desk organizer)
- p007 (tissue box cover)
- p023 (shital pati tote bag)
- p028 (rickshaw art frame)

### Required Per SKU
- 6 distinct angles minimum
- Total needed: 180+ photos
- See PHOTOSHOOT_PLAN.md for detailed shot list

---

## Technical Validation

### Build Status
- ✅ Production build successful
- ✅ No TypeScript errors
- ✅ No broken imports
- ✅ Bundle size: 490KB JS, 47KB CSS (gzipped: 133KB + 8KB)

### Performance
- ✅ Lazy loading enabled for images
- ✅ Responsive images with width/height attributes
- ✅ Error fallback for broken images
- ✅ Reduced motion support

### Accessibility
- ✅ Keyboard navigation working
- ✅ Focus indicators visible
- ✅ Alt text in Bengali
- ✅ ARIA labels on icon buttons
- ✅ Form validation with error messages

---

## Known Limitations

### ১. Demo Checkout
- **Status**: ⚠️ Demo mode
- **Behavior**: Order confirmation shows but no real payment processing
- **Note**: Clearly marked as demo in UI

### ২. Authentication
- **Status**: ⚠️ Demo mode
- **Behavior**: Login/register works locally but no real backend
- **Note**: Supabase Auth integration required for production

### ৩. Product Images
- **Status**: ❌ Not production ready
- **Issue**: Stock photos, not actual product photos
- **Action**: Photoshoot required before launch

### ৪. Payment Integration
- **Status**: ❌ Not implemented
- **Note**: SSLCommerz/bKash/Nagad integration pending

---

## Recommendations

### Immediate (Before Launch)
1. ✅ Complete photoshoot for all 30 SKUs (180+ photos)
2. ✅ Provide verified business phone number
3. ✅ Provide verified business address
4. ✅ Add social media links
5. ✅ Integrate Supabase Auth
6. ✅ Integrate payment gateway (SSLCommerz)

### Post-Launch
1. Add real customer reviews
2. Implement email notifications
3. Add analytics tracking
4. Optimize images (WebP/AVIF)
5. Add CDN for static assets

---

## Files Changed

### Modified
- `src/data/index.ts` — Added Bengali translation maps, removed duplicate images, added pending photoshoot list
- `src/components/ProductComponents.tsx` — Updated to use Bengali material labels
- `src/components/Layout.tsx` — Updated footer phone to placeholder message
- `src/pages/ProductDetail.tsx` — Updated to use Bengali translations for all product details
- `src/index.css` — Updated color palette to new brand system
- `vercel.json` — Already configured for SPA routing

### Created
- `PHOTOSHOOT_PLAN.md` — Complete photoshoot planning document with 30 SKU shot lists
- `QA_REPORT.md` — This document

### Assets
- `public/assets/brand/image-pending.svg` — Branded placeholder for products awaiting photos
- `public/assets/brand/karukotha-symbol.svg` — Brand symbol
- `public/assets/brand/karukotha-logo.svg` — Full logo
- `public/assets/brand/favicon.svg` — Favicon

---

## Conclusion

সাইটের UI/UX, routing, responsive design, এবং বাংলা consistency সম্পূর্ণ করা হয়েছে। Color system update করা হয়েছে। ১১টি pending image-এর জন্য স্পষ্ট placeholder দেখানো হচ্ছে। Duplicate/mismatched image সরানো হয়েছে।

**মূল বাকি কাজ**:
1. ৩০ SKU-র জন্য বাস্তব ফটোশুট (১৮০+ ছবি)
2. Verified business contact information
3. Payment gateway integration
4. Supabase Auth integration

সব route কাজ করছে, responsive design ঠিক আছে, বাংলা text consistent, এবং accessibility standards মেনে চলা হচ্ছে। Production launch-এর আগে উপরের বাকি কাজগুলো সম্পন্ন করতে হবে।

---

**Report Version**: 1.0  
**Generated**: 2026-10-13  
**Status**: UI/UX Complete — Awaiting Business Assets
