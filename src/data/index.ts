// Karukotha - Complete Data Layer
// All demo data is clearly marked. Replace with verified data before production launch.

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  sku: string;
  categoryId: string;
  shortDescBn: string;
  shortDescEn: string;
  descriptionBn: string;
  descriptionEn: string;
  materials: string[];
  dimensions: string;
  weight: string;
  craftTechnique: string;
  price: number;
  previousPrice?: number;
  stock: number;
  variants: ProductVariant[];
  images: ProductImage[];
  seoTitle: string;
  seoDescription: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isPublished: boolean;
  isDemoData: boolean;
  rating: number;
  reviewCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  nameBn: string;
  priceModifier: number;
  stock: number;
  imageIndex?: number;
}

export interface ProductImage {
  url: string;
  alt: string;
  altBn: string;
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  descriptionBn: string;
  descriptionEn: string;
  image: string;
  productCount: number;
}

export interface BlogPost {
  id: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  excerptBn: string;
  excerptEn: string;
  contentBn: string;
  contentEn: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  isDemoData: boolean;
  relatedProducts: string[];
}

export interface Offer {
  id: string;
  name: string;
  publicTitle: string;
  publicTitleBn: string;
  description: string;
  type: 'percentage' | 'fixed' | 'freeship';
  value: number;
  code?: string;
  minOrder?: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
  applicableCategories?: string[];
  applicableProducts?: string[];
}

export interface StoreSettings {
  brandName: string;
  brandNameBn: string;
  tagline: string;
  taglineBn: string;
  currency: string;
  currencySymbol: string;
  announcementBar: string;
  announcementBarBn: string;
  announcementBarActive: boolean;
  contactEmail: string;
  contactPhone: string;
  socialLinks: { platform: string; url: string }[];
  shippingZones: { name: string; fee: number }[];
}

// === CATEGORIES ===
export const categories: Category[] = [
  { id: 'bamboo-cane', nameBn: 'বাঁশ ও বেত শিল্প', nameEn: 'Bamboo & Cane Crafts', slug: 'bamboo-cane', descriptionBn: 'প্রাকৃতিক বাঁশ ও বেত দিয়ে তৈরি ঐতিহ্যবাহী হস্তশিল্প', descriptionEn: 'Traditional handicrafts made from natural bamboo and cane', image: '', productCount: 7 },
  { id: 'pottery', nameBn: 'মৃৎশিল্প ও টেরাকোটা', nameEn: 'Pottery & Terracotta', slug: 'pottery-terracotta', descriptionBn: 'হাতে তৈরি মাটির পাত্র ও টেরাকোটা শিল্পকর্ম', descriptionEn: 'Handmade clay pots and terracotta art', image: '', productCount: 5 },
  { id: 'jute', nameBn: 'পাট শিল্প', nameEn: 'Jute Crafts', slug: 'jute-crafts', descriptionBn: 'প্রাকৃতিক পাট ফাইবার থেকে তৈরি ব্যবহারিক ও সৌন্দর্যমণ্ডিত পণ্য', descriptionEn: 'Practical and beautiful products from natural jute fiber', image: '', productCount: 4 },
  { id: 'nakshi-kantha', nameBn: 'নকশি কাঁথা ও এমব্রয়ডারি', nameEn: 'Nakshi Kantha & Embroidery', slug: 'nakshi-kantha', descriptionBn: 'ঐতিহ্যবাহী নকশি কাঁথা ও হাতে সেলাই করা শিল্প', descriptionEn: 'Traditional Nakshi Kantha and hand-embroidered art', image: '', productCount: 4 },
  { id: 'shital-pati', nameBn: 'শীতলপাটি', nameEn: 'Shital Pati', slug: 'shital-pati', descriptionBn: 'বাংলার ঐতিহ্যবাহী শীতলপাটি শিল্প', descriptionEn: 'Traditional Bengali Shital Pati craft', image: '', productCount: 3 },
  { id: 'crochet', nameBn: 'ক্রোশিয়া শিল্প', nameEn: 'Crochet Crafts', slug: 'crochet', descriptionBn: 'হাতে বোনা ক্রোশিয়া শিল্পকর্ম', descriptionEn: 'Hand-crocheted craft items', image: '', productCount: 2 },
  { id: 'wood-folk', nameBn: 'কাঠ ও লোকশিল্প', nameEn: 'Wood & Folk Art', slug: 'wood-folk-art', descriptionBn: 'হাতে খোদাই করা কাঠের শিল্প ও লোকজ সাজসজ্জা', descriptionEn: 'Hand-carved wooden art and folk decorations', image: '', productCount: 3 },
  { id: 'paper-gifts', nameBn: 'হাতে তৈরি কাগজ ও উপহার', nameEn: 'Handmade Paper & Gifts', slug: 'handmade-paper-gifts', descriptionBn: 'পুনর্ব্যবহৃত কাগজের তৈরি পণ্য ও উপহার সামগ্রী', descriptionEn: 'Products from recycled paper and gift items', image: '', productCount: 2 },
];

// === PRODUCT IMAGES GENERATOR ===
// Uses real AI-generated images for products with available assets,
// and category-appropriate concept placeholders for others.
// All images are clearly marked as concept/development assets.

const REAL_IMAGES: Record<string, string> = {
  'p001': 'https://image.qwenlm.ai/generated-images/49fa09d3-0167-4979-b794-9623c67feb5d/_result.png',
  'p008': 'https://image.qwenlm.ai/generated-images/9cf27221-819c-4e6a-a175-294dbf31a042/_result.png',
  'p013': 'https://image.qwenlm.ai/generated-images/5d170e81-44cb-454b-8809-835299af83d4/_result.png',
  'p017': 'https://image.qwenlm.ai/generated-images/7a0bfbc1-80a9-48c2-8545-803d0934953c/_result.png',
  'p021': 'https://image.qwenlm.ai/generated-images/a43fefe7-ba1a-4d40-ada4-6e8ea6212c5f/_result.png',
  'p024': 'https://image.qwenlm.ai/generated-images/4b7cbf9e-bfc9-4eb9-a64b-027fa29aa235/_result.png',
  'p027': 'https://image.qwenlm.ai/generated-images/97a05c40-5c61-4383-9515-e6ac9c0d9dcc/_result.png',
};

const generateProductImages = (productId: string, nameEn: string, color: string): ProductImage[] => {
  const colors: Record<string, string> = {
    'bamboo': '8B7355', 'cane': 'A0826D', 'terracotta': 'C1440E',
    'clay': 'B87333', 'jute': 'C4A882', 'kantha': '4A6741',
    'shital': 'D4C5A9', 'crochet': 'E8D5B7', 'wood': '6B4226',
    'paper': 'F5F0E8', 'default': '8B7E74'
  };
  const bgColor = colors[color] || colors['default'];
  const textColor = ['paper', 'shital', 'crochet', 'jute'].includes(color) ? '3D3D3D' : 'FFFFFF';
  
  // If we have a real image for this product, use it as hero
  const heroUrl = REAL_IMAGES[productId] || `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn)}&font=roboto`;
  
  return [
    { url: heroUrl, alt: `${nameEn} - Hero Shot (Concept)`, altBn: `${nameEn} - প্রধান ছবি` },
    { url: `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn + ' Front')}&font=roboto`, alt: `${nameEn} - Front View`, altBn: `${nameEn} - সামনের দিক` },
    { url: `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn + ' Detail')}&font=roboto`, alt: `${nameEn} - Detail Shot`, altBn: `${nameEn} - বিস্তারিত` },
    { url: `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn + ' Lifestyle')}&font=roboto`, alt: `${nameEn} - Lifestyle`, altBn: `${nameEn} - লাইফস্টাইল` },
    { url: `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn + ' Macro')}&font=roboto`, alt: `${nameEn} - Macro Detail`, altBn: `${nameEn} - ম্যাক্রো বিস্তারিত` },
    { url: `https://placehold.co/800x800/${bgColor}/${textColor}?text=${encodeURIComponent(nameEn + ' Scale')}&font=roboto`, alt: `${nameEn} - Size Reference`, altBn: `${nameEn} - মাপের রেফারেন্স` },
  ];
};

// === 30 PRODUCTS ===
export const products: Product[] = [
  // CATEGORY A — Bamboo and Cane Crafts
  {
    id: 'p001', nameBn: 'হাতে বোনা বেতের স্টোরেজ ঝুড়ি', nameEn: 'Handwoven Cane Storage Basket', slug: 'handwoven-cane-storage-basket',
    sku: 'KK-BC-001', categoryId: 'bamboo-cane',
    shortDescBn: 'প্রাকৃতিক বেত দিয়ে হাতে বোনা বহুমুখী স্টোরেজ ঝুড়ি', shortDescEn: 'Versatile storage basket handwoven from natural cane',
    descriptionBn: 'এই সুন্দর স্টোরেজ ঝুড়িটি বাংলাদেশের দক্ষ কারিগরদের দ্বারা প্রাকৃতিক বেত দিয়ে হাতে বোনা। এটি ঘরের বিভিন্ন জিনিসপত্র গুছিয়ে রাখতে ব্যবহার করা যায়। প্রতিটি ঝুড়ি অনন্য এবং হস্তশিল্পের নিদর্শন।',
    descriptionEn: 'This beautiful storage basket is handwoven from natural cane by skilled Bangladeshi artisans. Perfect for organizing various household items. Each basket is unique and a testament to handcraft.',
    materials: ['Natural Cane', 'Cotton Lining'], dimensions: '30cm × 25cm × 20cm', weight: '450g', craftTechnique: 'Handweaving',
    price: 1250, previousPrice: 1500, stock: 25,
    variants: [{ id: 'v001a', name: 'Small', nameBn: 'ছোট', priceModifier: 0, stock: 15 }, { id: 'v001b', name: 'Large', nameBn: 'বড়', priceModifier: 350, stock: 10 }],
    images: generateProductImages('p001', 'Cane Basket', 'cane'),
    seoTitle: 'হাতে বোনা বেতের স্টোরেজ ঝুড়ি | Karukotha', seoDescription: 'প্রাকৃতিক বেত দিয়ে তৈরি সুন্দর স্টোরেজ ঝুড়ি। ঘর গুছিয়ে রাখুন ঐতিহ্যবাহী শিল্পের সাথে।',
    isFeatured: true, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p002', nameBn: 'বাঁশের কাপড়ের ঝুড়ি', nameEn: 'Bamboo Laundry Basket', slug: 'bamboo-laundry-basket',
    sku: 'KK-BC-002', categoryId: 'bamboo-cane',
    shortDescBn: 'টেকসই বাঁশ দিয়ে তৈরি মজবুত কাপড়ের ঝুড়ি', shortDescEn: 'Durable laundry basket crafted from sturdy bamboo',
    descriptionBn: 'প্রাকৃতিক বাঁশ দিয়ে তৈরি এই কাপড়ের ঝুড়ি টেকসই এবং পরিবেশবান্ধব। এর মজবুত গঠন দীর্ঘদিন ব্যবহারের উপযোগী।',
    descriptionEn: 'Made from natural bamboo, this laundry basket is durable and eco-friendly. Its sturdy construction ensures long-lasting use.',
    materials: ['Natural Bamboo', 'Cotton Liner'], dimensions: '40cm × 35cm × 50cm', weight: '800g', craftTechnique: 'Bamboo Weaving',
    price: 1850, stock: 18,
    variants: [{ id: 'v002a', name: 'Natural', nameBn: 'প্রাকৃতিক', priceModifier: 0, stock: 10 }, { id: 'v002b', name: 'Dark Stained', nameBn: 'গাঢ় রং', priceModifier: 200, stock: 8 }],
    images: generateProductImages('p002', 'Bamboo Laundry Basket', 'bamboo'),
    seoTitle: 'বাঁশের কাপড়ের ঝুড়ি | Karukotha', seoDescription: 'প্রাকৃতিক বাঁশের তৈরি টেকসই কাপড়ের ঝুড়ি।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p003', nameBn: 'হাতে তৈরি বেতের সার্ভিং ট্রে', nameEn: 'Handcrafted Cane Serving Tray', slug: 'handcrafted-cane-serving-tray',
    sku: 'KK-BC-003', categoryId: 'bamboo-cane',
    shortDescBn: 'অতিথি আপ্যায়নের জন্য সুন্দর বেতের ট্রে', shortDescEn: 'Elegant cane tray for serving guests',
    descriptionBn: 'বেত দিয়ে হাতে তৈরি এই সার্ভিং ট্রেটি আপনার মেহমানদারিকে আরও সুন্দর করবে। হালকা ওজনের এবং সহজে বহনযোগ্য।',
    descriptionEn: 'This handcrafted cane serving tray will enhance your hospitality. Lightweight and easy to carry.',
    materials: ['Natural Cane', 'Food-safe Lacquer'], dimensions: '35cm × 25cm × 5cm', weight: '350g', craftTechnique: 'Cane Weaving',
    price: 980, stock: 30,
    variants: [{ id: 'v003a', name: 'Round', nameBn: 'গোলাকার', priceModifier: 100, stock: 15 }, { id: 'v003b', name: 'Rectangular', nameBn: 'আয়তাকার', priceModifier: 0, stock: 15 }],
    images: generateProductImages('p003', 'Cane Serving Tray', 'cane'),
    seoTitle: 'হাতে তৈরি বেতের সার্ভিং ট্রে | Karukotha', seoDescription: 'বেতের সুন্দর সার্ভিং ট্রে।',
    isFeatured: true, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p004', nameBn: 'প্রাকৃতিক বাঁশের ল্যাম্পশেড', nameEn: 'Natural Bamboo Lampshade', slug: 'natural-bamboo-lampshade',
    sku: 'KK-BC-004', categoryId: 'bamboo-cane',
    shortDescBn: 'ঘরে উষ্ণ আলো ছড়ানো বাঁশের ল্যাম্পশেড', shortDescEn: 'Bamboo lampshade casting warm ambient light',
    descriptionBn: 'বাঁশের ফাঁক দিয়ে আলো ছড়িয়ে পড়ে সুন্দর ছায়া তৈরি করে। আপনার ঘরে প্রাকৃতিক সৌন্দর্য যোগ করুন।',
    descriptionEn: 'Light filters through bamboo creating beautiful shadow patterns. Add natural beauty to your space.',
    materials: ['Natural Bamboo', 'Metal Frame'], dimensions: '30cm diameter × 25cm height', weight: '500g', craftTechnique: 'Bamboo Craft',
    price: 2200, stock: 12,
    variants: [],
    images: generateProductImages('p004', 'Bamboo Lampshade', 'bamboo'),
    seoTitle: 'প্রাকৃতিক বাঁশের ল্যাম্পশেড | Karukotha', seoDescription: 'বাঁশের তৈরি সুন্দর ল্যাম্পশেড।',
    isFeatured: true, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p005', nameBn: 'বাঁশের ডেস্ক অর্গানাইজার', nameEn: 'Bamboo Desk Organizer', slug: 'bamboo-desk-organizer',
    sku: 'KK-BC-005', categoryId: 'bamboo-cane',
    shortDescBn: 'কাজের টেবিল গুছিয়ে রাখতে বাঁশের অর্গানাইজার', shortDescEn: 'Keep your workspace tidy with this bamboo organizer',
    descriptionBn: 'বহুবিধ কম্পার্টমেন্ট সহ এই বাঁশের ডেস্ক অর্গানাইজার আপনার কাজের জায়গা সুন্দর ও সুশৃঙ্খল রাখবে।',
    descriptionEn: 'With multiple compartments, this bamboo desk organizer keeps your workspace neat and organized.',
    materials: ['Natural Bamboo'], dimensions: '25cm × 15cm × 12cm', weight: '400g', craftTechnique: 'Bamboo Craft',
    price: 850, stock: 22,
    variants: [],
    images: generateProductImages('p005', 'Bamboo Desk Organizer', 'bamboo'),
    seoTitle: 'বাঁশের ডেস্ক অর্গানাইজার | Karukotha', seoDescription: 'কাজের টেবিল সুশৃঙ্খল রাখুন।',
    isFeatured: false, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p006', nameBn: 'ঐতিহ্যবাহী বাঁশের পাখা', nameEn: 'Traditional Bamboo Hand Fan', slug: 'traditional-bamboo-hand-fan',
    sku: 'KK-BC-006', categoryId: 'bamboo-cane',
    shortDescBn: 'হাতে পাখা বোনানোর ঐতিহ্যবাহী শিল্প', shortDescEn: 'Traditional art of hand fan weaving',
    descriptionBn: 'বাংলার গ্রামীণ ঐতিহ্যের অংশ এই বাঁশের পাখা। হাতে বোনা, হালকা ও ব্যবহারযোগ্য।',
    descriptionEn: 'Part of Bengali rural heritage, this bamboo hand fan is handwoven, lightweight and functional.',
    materials: ['Natural Bamboo Strips'], dimensions: '25cm × 35cm', weight: '80g', craftTechnique: 'Fan Weaving',
    price: 350, stock: 50,
    variants: [{ id: 'v006a', name: 'Natural', nameBn: 'প্রাকৃতিক', priceModifier: 0, stock: 30 }, { id: 'v006b', name: 'Colored', nameBn: 'রঙিন', priceModifier: 100, stock: 20 }],
    images: generateProductImages('p006', 'Bamboo Hand Fan', 'bamboo'),
    seoTitle: 'ঐতিহ্যবাহী বাঁশের পাখা | Karukotha', seoDescription: 'বাঁশের ঐতিহ্যবাহী পাখা।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p007', nameBn: 'হাতে বোনা বেতের টিস্যু বক্স কভার', nameEn: 'Handwoven Cane Tissue Box Cover', slug: 'handwoven-cane-tissue-box-cover',
    sku: 'KK-BC-007', categoryId: 'bamboo-cane',
    shortDescBn: 'টিস্যু বক্সকে সুন্দর করতে বেতের কভার', shortDescEn: 'Decorative cane cover for tissue boxes',
    descriptionBn: 'সাধারণ টিস্যু বক্সকে ঐতিহ্যবাহী শিল্পের ছোঁয়ায় সুন্দর করুন।',
    descriptionEn: 'Add a traditional craft touch to an ordinary tissue box.',
    materials: ['Natural Cane'], dimensions: '25cm × 13cm × 9cm', weight: '200g', craftTechnique: 'Cane Weaving',
    price: 550, stock: 35,
    variants: [],
    images: generateProductImages('p007', 'Cane Tissue Box Cover', 'cane'),
    seoTitle: 'বেতের টিস্যু বক্স কভার | Karukotha', seoDescription: 'বেতের সুন্দর টিস্যু বক্স কভার।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY B — Pottery and Terracotta
  {
    id: 'p008', nameBn: 'টেরাকোটা টব', nameEn: 'Terracotta Plant Pot', slug: 'terracotta-plant-pot',
    sku: 'KK-PT-001', categoryId: 'pottery',
    shortDescBn: 'হাতে তৈরি টেরাকোটা ফুলের টব', shortDescEn: 'Handmade terracotta flower pot',
    descriptionBn: 'প্রাকৃতিক মাটি দিয়ে তৈরি এই টেরাকোটা টব আপনার গাছপালার জন্য আদর্শ। প্রতিটি টব অনন্য হস্তশিল্প।',
    descriptionEn: 'Made from natural clay, this terracotta pot is ideal for your plants. Each pot is a unique piece of craftsmanship.',
    materials: ['Natural Clay', 'Food-safe Glaze'], dimensions: '18cm diameter × 16cm height', weight: '600g', craftTechnique: 'Pottery',
    price: 450, stock: 40,
    variants: [{ id: 'v008a', name: 'Small', nameBn: 'ছোট', priceModifier: 0, stock: 20 }, { id: 'v008b', name: 'Medium', nameBn: 'মাঝারি', priceModifier: 200, stock: 12 }, { id: 'v008c', name: 'Large', nameBn: 'বড়', priceModifier: 450, stock: 8 }],
    images: generateProductImages('p008', 'Terracotta Plant Pot', 'terracotta'),
    seoTitle: 'টেরাকোটা টব | Karukotha', seoDescription: 'হাতে তৈরি টেরাকোটা ফুলের টব।',
    isFeatured: true, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p009', nameBn: 'ঐতিহ্যবাহী শোখের হাড়ি', nameEn: 'Traditional Shokher Hari Decorative Pot', slug: 'traditional-shokher-hari',
    sku: 'KK-PT-002', categoryId: 'pottery',
    shortDescBn: 'বাংলার ঐতিহ্যবাহী সাজসজ্জার হাড়ি', shortDescEn: 'Traditional Bengali decorative pot',
    descriptionBn: 'শোখের হাড়ি বাংলার গ্রামীণ ঐতিহ্যের প্রতীক। সাজসজ্জার জন্য উপযোগী।',
    descriptionEn: 'The Shokher Hari symbolizes Bengali rural heritage. Suitable for decoration.',
    materials: ['Natural Clay', 'Traditional Paint'], dimensions: '20cm × 20cm × 30cm', weight: '900g', craftTechnique: 'Traditional Pottery',
    price: 750, stock: 15,
    variants: [{ id: 'v009a', name: 'Red', nameBn: 'লাল', priceModifier: 0, stock: 8 }, { id: 'v009b', name: 'White', nameBn: 'সাদা', priceModifier: 0, stock: 7 }],
    images: generateProductImages('p009', 'Shokher Hari', 'terracotta'),
    seoTitle: 'ঐতিহ্যবাহী শোখের হাড়ি | Karukotha', seoDescription: 'বাংলার ঐতিহ্যবাহী সাজসজ্জার হাড়ি।',
    isFeatured: true, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p010', nameBn: 'হাতে আঁকা মাটির চায়ের কাপ সেট', nameEn: 'Hand-Painted Clay Tea Cup Set', slug: 'hand-painted-clay-tea-cup-set',
    sku: 'KK-PT-003', categoryId: 'pottery',
    shortDescBn: '৪টি হাতে আঁকা মাটির চায়ের কাপ', shortDescEn: 'Set of 4 hand-painted clay tea cups',
    descriptionBn: 'প্রতিটি কাপ হাতে আঁকা, অনন্য ডিজাইন। চা পানের অভিজ্ঞতা আরও সুন্দর করুন।',
    descriptionEn: 'Each cup is hand-painted with unique designs. Enhance your tea experience.',
    materials: ['Natural Clay', 'Food-safe Glaze', 'Natural Pigments'], dimensions: '8cm × 8cm × 6cm each', weight: '500g (set)', craftTechnique: 'Hand Painting',
    price: 1200, stock: 20,
    variants: [],
    images: generateProductImages('p010', 'Clay Tea Cup Set', 'clay'),
    seoTitle: 'হাতে আঁকা মাটির চায়ের কাপ সেট | Karukotha', seoDescription: 'হাতে আঁকা মাটির চায়ের কাপ।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p011', nameBn: 'টেরাকোটা ক্যান্ডেল হোল্ডার', nameEn: 'Terracotta Candle Holder', slug: 'terracotta-candle-holder',
    sku: 'KK-PT-004', categoryId: 'pottery',
    shortDescBn: 'সুন্দর টেরাকোটা মোমবাতি ধারক', shortDescEn: 'Beautiful terracotta candle holder',
    descriptionBn: 'মোমবাতির আলোয় ঘরে মায়াময় পরিবেশ তৈরি করুন এই হাতে তৈরি টেরাকোটা হোল্ডারে।',
    descriptionEn: 'Create a magical ambiance with candlelight in this handmade terracotta holder.',
    materials: ['Natural Clay'], dimensions: '10cm × 10cm × 8cm', weight: '350g', craftTechnique: 'Pottery',
    price: 380, stock: 30,
    variants: [{ id: 'v011a', name: 'Single', nameBn: 'একক', priceModifier: 0, stock: 20 }, { id: 'v011b', name: 'Set of 3', nameBn: '৩টি সেট', priceModifier: 600, stock: 10 }],
    images: generateProductImages('p011', 'Terracotta Candle Holder', 'terracotta'),
    seoTitle: 'টেরাকোটা ক্যান্ডেল হোল্ডার | Karukotha', seoDescription: 'সুন্দর টেরাকোটা মোমবাতি ধারক।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p012', nameBn: 'হাতে তৈরি মাটির ফুলদানি', nameEn: 'Handmade Clay Vase', slug: 'handmade-clay-vase',
    sku: 'KK-PT-005', categoryId: 'pottery',
    shortDescBn: 'শিল্পসম্মত হাতে তৈরি মাটির ফুলদানি', shortDescEn: 'Artistic handmade clay vase',
    descriptionBn: 'প্রতিটি ফুলদানি অনন্য, কারিগরের হাতের ছাপ বহন করে। ফুল বা সাজসজ্জার জন্য আদর্শ।',
    descriptionEn: 'Each vase is unique, bearing the artisan\'s touch. Ideal for flowers or decoration.',
    materials: ['Natural Clay', 'Natural Glaze'], dimensions: '15cm × 15cm × 25cm', weight: '700g', craftTechnique: 'Wheel Throwing',
    price: 950, stock: 18,
    variants: [{ id: 'v012a', name: 'Natural', nameBn: 'প্রাকৃতিক', priceModifier: 0, stock: 10 }, { id: 'v012b', name: 'Painted', nameBn: 'রঙিন', priceModifier: 250, stock: 8 }],
    images: generateProductImages('p012', 'Clay Vase', 'clay'),
    seoTitle: 'হাতে তৈরি মাটির ফুলদানি | Karukotha', seoDescription: 'শিল্পসম্মত মাটির ফুলদানি।',
    isFeatured: false, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY C — Jute Crafts
  {
    id: 'p013', nameBn: 'প্রাকৃতিক পাটের টোট ব্যাগ', nameEn: 'Natural Jute Tote Bag', slug: 'natural-jute-tote-bag',
    sku: 'KK-JT-001', categoryId: 'jute',
    shortDescBn: 'পরিবেশবান্ধব পাটের টোট ব্যাগ', shortDescEn: 'Eco-friendly jute tote bag',
    descriptionBn: 'প্রাকৃতিক পাট ফাইবার দিয়ে তৈরি এই টোট ব্যাগ পরিবেশবান্ধব এবং টেকসই। দৈনন্দিন ব্যবহারের জন্য আদর্শ।',
    descriptionEn: 'Made from natural jute fiber, this tote bag is eco-friendly and durable. Ideal for daily use.',
    materials: ['Natural Jute', 'Cotton Handles'], dimensions: '35cm × 30cm × 10cm', weight: '250g', craftTechnique: 'Jute Weaving',
    price: 650, stock: 45,
    variants: [{ id: 'v013a', name: 'Natural', nameBn: 'প্রাকৃতিক', priceModifier: 0, stock: 25 }, { id: 'v013b', name: 'With Print', nameBn: 'প্রিন্ট সহ', priceModifier: 150, stock: 20 }],
    images: generateProductImages('p013', 'Jute Tote Bag', 'jute'),
    seoTitle: 'প্রাকৃতিক পাটের টোট ব্যাগ | Karukotha', seoDescription: 'পরিবেশবান্ধব পাটের টোট ব্যাগ।',
    isFeatured: true, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p014', nameBn: 'হাতে তৈরি পাটের শপিং ব্যাগ', nameEn: 'Handcrafted Jute Shopping Bag', slug: 'handcrafted-jute-shopping-bag',
    sku: 'KK-JT-002', categoryId: 'jute',
    shortDescBn: 'মজবুত ও স্টাইলিশ পাটের শপিং ব্যাগ', shortDescEn: 'Sturdy and stylish jute shopping bag',
    descriptionBn: 'বাজার বা শপিংয়ের জন্য উপযোগী মজবুত পাটের ব্যাগ। প্লাস্টিকের বিকল্প।',
    descriptionEn: 'Sturdy jute bag suitable for market or shopping. A plastic alternative.',
    materials: ['Natural Jute', 'Reinforced Stitching'], dimensions: '40cm × 35cm × 12cm', weight: '300g', craftTechnique: 'Jute Craft',
    price: 550, stock: 50,
    variants: [],
    images: generateProductImages('p014', 'Jute Shopping Bag', 'jute'),
    seoTitle: 'পাটের শপিং ব্যাগ | Karukotha', seoDescription: 'মজবুত পাটের শপিং ব্যাগ।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p015', nameBn: 'পাটের প্ল্যান্টার কভার', nameEn: 'Jute Planter Cover', slug: 'jute-planter-cover',
    sku: 'KK-JT-003', categoryId: 'jute',
    shortDescBn: 'ফুলের টব সুন্দর করতে পাটের কভার', shortDescEn: 'Decorative jute cover for plant pots',
    descriptionBn: 'আপনার ফুলের টবকে আরও সুন্দর করুন এই হাতে বোনা পাটের কভার দিয়ে।',
    descriptionEn: 'Enhance your plant pots with this handwoven jute cover.',
    materials: ['Natural Jute', 'Cotton Lining'], dimensions: '20cm diameter × 22cm height', weight: '180g', craftTechnique: 'Jute Weaving',
    price: 420, stock: 35,
    variants: [{ id: 'v015a', name: 'Small', nameBn: 'ছোট', priceModifier: 0, stock: 20 }, { id: 'v015b', name: 'Large', nameBn: 'বড়', priceModifier: 150, stock: 15 }],
    images: generateProductImages('p015', 'Jute Planter Cover', 'jute'),
    seoTitle: 'পাটের প্ল্যান্টার কভার | Karukotha', seoDescription: 'পাটের সুন্দর প্ল্যান্টার কভার।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p016', nameBn: 'পাটের টেবিল রানার ও কোস্টার সেট', nameEn: 'Jute Table Runner and Coaster Set', slug: 'jute-table-runner-coaster-set',
    sku: 'KK-JT-004', categoryId: 'jute',
    shortDescBn: 'ডাইনিং টেবিল সাজাতে পাটের সেট', shortDescEn: 'Jute set to decorate your dining table',
    descriptionBn: 'টেবিল রানার ও ৬টি কোস্টার সহ সম্পূর্ণ সেট। প্রাকৃতিক সৌন্দর্য আপনার খাবার ঘরে।',
    descriptionEn: 'Complete set with table runner and 6 coasters. Natural beauty for your dining room.',
    materials: ['Natural Jute', 'Cotton Backing'], dimensions: 'Runner: 180cm × 35cm, Coasters: 10cm each', weight: '450g', craftTechnique: 'Jute Weaving',
    price: 1100, stock: 20,
    variants: [],
    images: generateProductImages('p016', 'Jute Table Runner Set', 'jute'),
    seoTitle: 'পাটের টেবিল রানার সেট | Karukotha', seoDescription: 'পাটের টেবিল রানার ও কোস্টার সেট।',
    isFeatured: true, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY D — Nakshi Kantha and Embroidery
  {
    id: 'p017', nameBn: 'নকশি কাঁথা কুশন কভার', nameEn: 'Nakshi Kantha Cushion Cover', slug: 'nakshi-kantha-cushion-cover',
    sku: 'KK-NK-001', categoryId: 'nakshi-kantha',
    shortDescBn: 'ঐতিহ্যবাহী নকশি কাঁথার কুশন কভার', shortDescEn: 'Traditional Nakshi Kantha cushion cover',
    descriptionBn: 'হাতে সেলাই করা নকশি কাঁথার সুন্দর কুশন কভার। বাংলার ঐতিহ্য আপনার ঘরে।',
    descriptionEn: 'Beautiful hand-stitched Nakshi Kantha cushion cover. Bengali heritage in your home.',
    materials: ['Cotton Fabric', 'Cotton Thread'], dimensions: '40cm × 40cm', weight: '150g', craftTechnique: 'Kantha Stitching',
    price: 850, previousPrice: 1000, stock: 30,
    variants: [{ id: 'v017a', name: 'Geometric', nameBn: 'জ্যামিতিক', priceModifier: 0, stock: 10 }, { id: 'v017b', name: 'Floral', nameBn: 'ফুলের', priceModifier: 0, stock: 10 }, { id: 'v017c', name: 'Abstract', nameBn: 'বিমূর্ত', priceModifier: 100, stock: 10 }],
    images: generateProductImages('p017', 'Nakshi Kantha Cushion', 'kantha'),
    seoTitle: 'নকশি কাঁথা কুশন কভার | Karukotha', seoDescription: 'হাতে সেলাই করা নকশি কাঁথার কুশন কভার।',
    isFeatured: true, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p018', nameBn: 'নকশি কাঁথা বেড রানার', nameEn: 'Nakshi Kantha Bed Runner', slug: 'nakshi-kantha-bed-runner',
    sku: 'KK-NK-002', categoryId: 'nakshi-kantha',
    shortDescBn: 'বিছানা সাজাতে নকশি কাঁথার বেড রানার', shortDescEn: 'Nakshi Kantha bed runner for bedroom decor',
    descriptionBn: 'হাতে সেলাই করা এই বেড রানার আপনার শয়নকক্ষে ঐতিহ্যের ছোঁয়া আনবে।',
    descriptionEn: 'This hand-stitched bed runner brings a touch of tradition to your bedroom.',
    materials: ['Cotton Fabric', 'Cotton Thread'], dimensions: '150cm × 40cm', weight: '300g', craftTechnique: 'Kantha Stitching',
    price: 1650, stock: 15,
    variants: [{ id: 'v018a', name: 'Red Theme', nameBn: 'লাল থিম', priceModifier: 0, stock: 8 }, { id: 'v018b', name: 'Blue Theme', nameBn: 'নীল থিম', priceModifier: 0, stock: 7 }],
    images: generateProductImages('p018', 'Nakshi Kantha Bed Runner', 'kantha'),
    seoTitle: 'নকশি কাঁথা বেড রানার | Karukotha', seoDescription: 'হাতে সেলাই করা বেড রানার।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p019', nameBn: 'কাঁথা সেলাইয়ের টোট ব্যাগ', nameEn: 'Kantha-Stitched Tote Bag', slug: 'kantha-stitched-tote-bag',
    sku: 'KK-NK-003', categoryId: 'nakshi-kantha',
    shortDescBn: 'নকশি কাঁথা সেলাই করা স্টাইলিশ টোট ব্যাগ', shortDescEn: 'Stylish tote bag with Kantha stitching',
    descriptionBn: 'নকশি কাঁথার ঐতিহ্যবাহী সেলাই দিয়ে সাজানো সুন্দর টোট ব্যাগ।',
    descriptionEn: 'Beautiful tote bag adorned with traditional Kantha stitching.',
    materials: ['Cotton Fabric', 'Cotton Thread', 'Cotton Lining'], dimensions: '38cm × 32cm × 8cm', weight: '200g', craftTechnique: 'Kantha Stitching',
    price: 950, stock: 25,
    variants: [],
    images: generateProductImages('p019', 'Kantha Tote Bag', 'kantha'),
    seoTitle: 'কাঁথা সেলাইয়ের টোট ব্যাগ | Karukotha', seoDescription: 'নকশি কাঁথা সেলাইয়ের টোট ব্যাগ।',
    isFeatured: false, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p020', nameBn: 'হাতে এমব্রয়ডারড ড্রস্ট্রিং পাউচ', nameEn: 'Hand-Embroidered Drawstring Pouch', slug: 'hand-embroidered-drawstring-pouch',
    sku: 'KK-NK-004', categoryId: 'nakshi-kantha',
    shortDescBn: 'হাতে এমব্রয়ডারি করা সুন্দর পাউচ', shortDescEn: 'Beautiful hand-embroidered pouch',
    descriptionBn: 'ছোট জিনিসপত্র রাখার জন্য সুন্দর হাতে এমব্রয়ডারড পাউচ। উপহার হিসেবেও আদর্শ।',
    descriptionEn: 'Beautiful hand-embroidered pouch for small items. Also ideal as a gift.',
    materials: ['Cotton Fabric', 'Embroidery Thread'], dimensions: '20cm × 15cm', weight: '80g', craftTechnique: 'Hand Embroidery',
    price: 450, stock: 40,
    variants: [{ id: 'v020a', name: 'Floral', nameBn: 'ফুলের', priceModifier: 0, stock: 20 }, { id: 'v020b', name: 'Geometric', nameBn: 'জ্যামিতিক', priceModifier: 0, stock: 20 }],
    images: generateProductImages('p020', 'Embroidered Pouch', 'kantha'),
    seoTitle: 'হাতে এমব্রয়ডারড পাউচ | Karukotha', seoDescription: 'হাতে এমব্রয়ডারি করা সুন্দর পাউচ।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY E — Shital Pati
  {
    id: 'p021', nameBn: 'ঐতিহ্যবাহী শীতলপাটি ফ্লোর ম্যাট', nameEn: 'Traditional Shital Pati Floor Mat', slug: 'traditional-shital-pati-floor-mat',
    sku: 'KK-SP-001', categoryId: 'shital-pati',
    shortDescBn: 'হাতে বোনা ঐতিহ্যবাহী শীতলপাটি', shortDescEn: 'Handwoven traditional Shital Pati',
    descriptionBn: 'সিলেটের ঐতিহ্যবাহী শীতলপাটি। মাদুর পাটায় তৈরি, গরমকালে আরামদায়ক।',
    descriptionEn: 'Traditional Shital Pati from Sylhet. Made from madur grass, comfortable in summer.',
    materials: ['Madur Grass', 'Cotton Border'], dimensions: '180cm × 120cm', weight: '1.2kg', craftTechnique: 'Shital Pati Weaving',
    price: 2500, stock: 10,
    variants: [{ id: 'v021a', name: 'Single', nameBn: 'সিঙ্গেল', priceModifier: 0, stock: 5 }, { id: 'v021b', name: 'Double', nameBn: 'ডাবল', priceModifier: 1000, stock: 5 }],
    images: generateProductImages('p021', 'Shital Pati Floor Mat', 'shital'),
    seoTitle: 'ঐতিহ্যবাহী শীতলপাটি | Karukotha', seoDescription: 'হাতে বোনা ঐতিহ্যবাহী শীতলপাটি।',
    isFeatured: true, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p022', nameBn: 'শীতলপাটি প্লেসম্যাট সেট', nameEn: 'Shital Pati Placemat Set', slug: 'shital-pati-placemat-set',
    sku: 'KK-SP-002', categoryId: 'shital-pati',
    shortDescBn: 'ডাইনিং টেবিলের জন্য শীতলপাটি প্লেসম্যাট', shortDescEn: 'Shital Pati placemats for dining table',
    descriptionBn: '৪টি শীতলপাটি প্লেসম্যাটের সেট। ডাইনিং টেবিলে ঐতিহ্যের ছোঁয়া।',
    descriptionEn: 'Set of 4 Shital Pati placemats. A touch of tradition on your dining table.',
    materials: ['Madur Grass'], dimensions: '35cm × 45cm each', weight: '300g (set)', craftTechnique: 'Shital Pati Weaving',
    price: 800, stock: 25,
    variants: [],
    images: generateProductImages('p022', 'Shital Pati Placemat Set', 'shital'),
    seoTitle: 'শীতলপাটি প্লেসম্যাট সেট | Karukotha', seoDescription: 'শীতলপাটি প্লেসম্যাট সেট।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p023', nameBn: 'শীতলপাটি টোট ব্যাগ', nameEn: 'Shital Pati Tote Bag', slug: 'shital-pati-tote-bag',
    sku: 'KK-SP-003', categoryId: 'shital-pati',
    shortDescBn: 'শীতলপাটি শিল্পের আধুনিক রূপ', shortDescEn: 'Modern interpretation of Shital Pati craft',
    descriptionBn: 'ঐতিহ্যবাহী শীতলপাটি শিল্পের আধুনিক ব্যাগ রূপ। অনন্য ও স্টাইলিশ।',
    descriptionEn: 'A modern bag form of traditional Shital Pati craft. Unique and stylish.',
    materials: ['Madur Grass', 'Cotton Lining'], dimensions: '30cm × 28cm × 8cm', weight: '250g', craftTechnique: 'Shital Pati Weaving',
    price: 1200, stock: 15,
    variants: [],
    images: generateProductImages('p023', 'Shital Pati Tote Bag', 'shital'),
    seoTitle: 'শীতলপাটি টোট ব্যাগ | Karukotha', seoDescription: 'শীতলপাটি শিল্পের আধুনিক ব্যাগ।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY F — Crochet Crafts
  {
    id: 'p024', nameBn: 'হাতে বোনা ক্রোশিয়া কোস্টার সেট', nameEn: 'Handmade Crochet Coaster Set', slug: 'handmade-crochet-coaster-set',
    sku: 'KK-CR-001', categoryId: 'crochet',
    shortDescBn: '৬টি হাতে বোনা ক্রোশিয়া কোস্টার', shortDescEn: 'Set of 6 handmade crochet coasters',
    descriptionBn: 'হাতে বোনা ক্রোশিয়া কোস্টার সেট। টেবিল সাজান ও সুরক্ষিত রাখুন।',
    descriptionEn: 'Handmade crochet coaster set. Decorate and protect your table.',
    materials: ['Cotton Yarn'], dimensions: '10cm diameter each', weight: '100g (set)', craftTechnique: 'Crochet',
    price: 480, stock: 35,
    variants: [{ id: 'v024a', name: 'Pastel', nameBn: 'পেস্টেল', priceModifier: 0, stock: 18 }, { id: 'v024b', name: 'Earth Tones', nameBn: 'মাটির রং', priceModifier: 0, stock: 17 }],
    images: generateProductImages('p024', 'Crochet Coaster Set', 'crochet'),
    seoTitle: 'ক্রোশিয়া কোস্টার সেট | Karukotha', seoDescription: 'হাতে বোনা ক্রোশিয়া কোস্টার সেট।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p025', nameBn: 'ক্রোশিয়া প্ল্যান্ট হ্যাঙ্গার', nameEn: 'Crochet Plant Hanger', slug: 'crochet-plant-hanger',
    sku: 'KK-CR-002', categoryId: 'crochet',
    shortDescBn: 'হাতে বোনা ক্রোশিয়া প্ল্যান্ট হ্যাঙ্গার', shortDescEn: 'Handmade crochet plant hanger',
    descriptionBn: 'ঝুলন্ত গাছের জন্য সুন্দর ক্রোশিয়া প্ল্যান্ট হ্যাঙ্গার। ঘরে সবুজের ছোঁয়া।',
    descriptionEn: 'Beautiful crochet plant hanger for hanging plants. Bring greenery to your space.',
    materials: ['Cotton Rope'], dimensions: '80cm length', weight: '150g', craftTechnique: 'Macrame Crochet',
    price: 550, stock: 20,
    variants: [{ id: 'v025a', name: 'Natural', nameBn: 'প্রাকৃতিক', priceModifier: 0, stock: 12 }, { id: 'v025b', name: 'White', nameBn: 'সাদা', priceModifier: 0, stock: 8 }],
    images: generateProductImages('p025', 'Crochet Plant Hanger', 'crochet'),
    seoTitle: 'ক্রোশিয়া প্ল্যান্ট হ্যাঙ্গার | Karukotha', seoDescription: 'হাতে বোনা ক্রোশিয়া প্ল্যান্ট হ্যাঙ্গার।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY G — Wood and Folk Art
  {
    id: 'p026', nameBn: 'হাতে খোদাই করা কাঠের সার্ভিং ট্রে', nameEn: 'Hand-Carved Wooden Serving Tray', slug: 'hand-carved-wooden-serving-tray',
    sku: 'KK-WF-001', categoryId: 'wood-folk',
    shortDescBn: 'কারিগরের হাতে খোদাই করা কাঠের ট্রে', shortDescEn: 'Artisan hand-carved wooden serving tray',
    descriptionBn: 'মেহগনি কাঠে হাতে খোদাই করা সুন্দর সার্ভিং ট্রে। প্রতিটি ট্রে অনন্য শিল্পকর্ম।',
    descriptionEn: 'Beautiful serving tray hand-carved from mahogany wood. Each tray is a unique artwork.',
    materials: ['Mahogany Wood', 'Food-safe Oil Finish'], dimensions: '40cm × 28cm × 4cm', weight: '800g', craftTechnique: 'Wood Carving',
    price: 2800, stock: 8,
    variants: [],
    images: generateProductImages('p026', 'Wooden Serving Tray', 'wood'),
    seoTitle: 'হাতে খোদাই করা কাঠের ট্রে | Karukotha', seoDescription: 'কারিগরের হাতে খোদাই করা কাঠের ট্রে।',
    isFeatured: true, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p027', nameBn: 'কাঠের গয়নার বাক্স', nameEn: 'Wooden Keepsake or Jewelry Box', slug: 'wooden-keepsake-jewelry-box',
    sku: 'KK-WF-002', categoryId: 'wood-folk',
    shortDescBn: 'হাতে তৈরি কাঠের সুন্দর গয়নার বাক্স', shortDescEn: 'Handmade wooden jewelry box',
    descriptionBn: 'মূল্যবান জিনিসপত্র রাখার জন্য সুন্দর হাতে তৈরি কাঠের বাক্স। উপহারের জন্য আদর্শ।',
    descriptionEn: 'Beautiful handmade wooden box for valuables. Ideal as a gift.',
    materials: ['Sheesham Wood', 'Brass Hinges'], dimensions: '20cm × 15cm × 10cm', weight: '500g', craftTechnique: 'Wood Craft',
    price: 1500, stock: 12,
    variants: [{ id: 'v027a', name: 'Small', nameBn: 'ছোট', priceModifier: 0, stock: 7 }, { id: 'v027b', name: 'Large', nameBn: 'বড়', priceModifier: 500, stock: 5 }],
    images: generateProductImages('p027', 'Wooden Jewelry Box', 'wood'),
    seoTitle: 'কাঠের গয়নার বাক্স | Karukotha', seoDescription: 'হাতে তৈরি কাঠের গয়নার বাক্স।',
    isFeatured: false, isNewArrival: false, isBestSeller: true, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p028', nameBn: 'রিকশা আর্ট ওয়াল ডেকর ফ্রেম', nameEn: 'Rickshaw-Art Wall Decor Frame', slug: 'rickshaw-art-wall-decor-frame',
    sku: 'KK-WF-003', categoryId: 'wood-folk',
    shortDescBn: 'ঢাকার রিকশা শিল্পের অনুপ্রেরণায় ওয়াল ডেকর', shortDescEn: 'Wall decor inspired by Dhaka rickshaw art',
    descriptionBn: 'ঢাকার বিখ্যাত রিকশা চিত্রকলার অনুপ্রেরণায় তৈরি ওয়াল ডেকর। বাংলার রঙিন সংস্কৃতি আপনার দেয়ালে।',
    descriptionEn: 'Wall decor inspired by famous Dhaka rickshaw paintings. Colorful Bengali culture on your wall.',
    materials: ['Wood Frame', 'Hand-painted Canvas'], dimensions: '30cm × 40cm', weight: '600g', craftTechnique: 'Folk Painting',
    price: 1800, stock: 10,
    variants: [{ id: 'v028a', name: 'Floral Design', nameBn: 'ফুলের ডিজাইন', priceModifier: 0, stock: 5 }, { id: 'v028b', name: 'Bird Design', nameBn: 'পাখির ডিজাইন', priceModifier: 0, stock: 5 }],
    images: generateProductImages('p028', 'Rickshaw Art Frame', 'wood'),
    seoTitle: 'রিকশা আর্ট ওয়াল ডেকর | Karukotha', seoDescription: 'রিকশা শিল্পের অনুপ্রেরণায় ওয়াল ডেকর।',
    isFeatured: true, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  // CATEGORY H — Handmade Paper and Gifts
  {
    id: 'p029', nameBn: 'হাতে তৈরি পুনর্ব্যবহৃত কাগজের জার্নাল', nameEn: 'Handmade Recycled-Paper Journal', slug: 'handmade-recycled-paper-journal',
    sku: 'KK-PG-001', categoryId: 'paper-gifts',
    shortDescBn: 'পুনর্ব্যবহৃত কাগজে হাতে তৈরি জার্নাল', shortDescEn: 'Handmade journal from recycled paper',
    descriptionBn: 'পরিবেশবান্ধব পুনর্ব্যবহৃত কাগজের সুন্দর জার্নাল। লেখা, আঁকা বা ডায়েরি রাখার জন্য আদর্শ।',
    descriptionEn: 'Beautiful journal from eco-friendly recycled paper. Ideal for writing, drawing or diary.',
    materials: ['Recycled Paper', 'Cotton Thread Binding', 'Handmade Cover'], dimensions: '20cm × 15cm', weight: '250g', craftTechnique: 'Paper Making',
    price: 450, stock: 50,
    variants: [{ id: 'v029a', name: 'Ruled', nameBn: 'লাইন করা', priceModifier: 0, stock: 25 }, { id: 'v029b', name: 'Blank', nameBn: 'খালি', priceModifier: 0, stock: 25 }],
    images: generateProductImages('p029', 'Recycled Paper Journal', 'paper'),
    seoTitle: 'হাতে তৈরি জার্নাল | Karukotha', seoDescription: 'পুনর্ব্যবহৃত কাগজের হাতে তৈরি জার্নাল।',
    isFeatured: false, isNewArrival: false, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
  {
    id: 'p030', nameBn: 'বাংলার লোকশিল্প গ্রিটিং কার্ড সেট', nameEn: 'Bengali Folk-Art Greeting Card Set', slug: 'bengali-folk-art-greeting-card-set',
    sku: 'KK-PG-002', categoryId: 'paper-gifts',
    shortDescBn: '৫টি হাতে আঁকা লোকশিল্প গ্রিটিং কার্ড', shortDescEn: 'Set of 5 hand-painted folk-art greeting cards',
    descriptionBn: 'বাংলার লোকশিল্পের অনুপ্রেরণায় হাতে আঁকা ৫টি গ্রিটিং কার্ড। বিশেষ দিনে বিশেষ উপহার।',
    descriptionEn: '5 hand-painted greeting cards inspired by Bengali folk art. Special gift for special occasions.',
    materials: ['Handmade Paper', 'Natural Ink'], dimensions: '15cm × 10cm each', weight: '120g (set)', craftTechnique: 'Folk Painting',
    price: 380, stock: 60,
    variants: [],
    images: generateProductImages('p030', 'Folk Art Greeting Cards', 'paper'),
    seoTitle: 'লোকশিল্প গ্রিটিং কার্ড সেট | Karukotha', seoDescription: 'হাতে আঁকা লোকশিল্প গ্রিটিং কার্ড সেট।',
    isFeatured: false, isNewArrival: true, isBestSeller: false, isPublished: true, isDemoData: true, rating: 0, reviewCount: 0,
  },
];

// === BLOG POSTS ===
export const blogPosts: BlogPost[] = [
  {
    id: 'b001', titleBn: 'নকশি কাঁথা: বাংলার ঐতিহ্যবাহী সেলাই শিল্প', titleEn: 'Nakshi Kantha: The Traditional Embroidery Art of Bengal',
    slug: 'nakshi-kantha-traditional-embroidery',
    excerptBn: 'নকশি কাঁথা বাংলার নারীদের সৃজনশীলতার অনন্য নিদর্শন। জানুন এই শিল্পের ইতিহাস ও ঐতিহ্য।',
    excerptEn: 'Nakshi Kantha is a unique testament to Bengali women\'s creativity. Learn about its history and tradition.',
    contentBn: '<p>নকশি কাঁথা বাংলার গ্রামীণ নারীদের হাতের অসাধারণ সৃষ্টি। পুরনো কাপড়কে নতুন রূপ দেওয়ার এই শিল্পকর্ম শতাব্দী ধরে চলে আসছে...</p>',
    contentEn: '<p>Nakshi Kantha is the extraordinary creation of rural Bengali women. This art of giving old cloth new form has continued for centuries...</p>',
    featuredImage: 'https://image.qwenlm.ai/generated-images/7a0bfbc1-80a9-48c2-8545-803d0934953c/_result.png', author: 'কারুকথা টিম',
    publishedAt: '2025-01-15', category: 'heritage', tags: ['nakshi-kantha', 'embroidery', 'heritage'],
    isPublished: true, isDemoData: true, relatedProducts: ['p017', 'p018', 'p019', 'p020'],
  },
  {
    id: 'b002', titleBn: 'বাঁশ ও বেত শিল্পের ইতিহাস', titleEn: 'History of Bamboo and Cane Crafts',
    slug: 'bamboo-cane-crafts-history',
    excerptBn: 'বাংলাদেশে বাঁশ ও বেত শিল্পের সমৃদ্ধ ইতিহাস রয়েছে। জানুন এই ঐতিহ্যবাহী শিল্পের কথা।',
    excerptEn: 'Bangladesh has a rich history of bamboo and cane crafts. Learn about this traditional art.',
    contentBn: '<p>বাংলাদেশের গ্রামীণ জনপদে বাঁশ ও বেত শিল্পের দীর্ঘ ঐতিহ্য রয়েছে...</p>',
    contentEn: '<p>Bangladesh\'s rural areas have a long tradition of bamboo and cane crafts...</p>',
    featuredImage: 'https://image.qwenlm.ai/generated-images/49fa09d3-0167-4979-b794-9623c67feb5d/_result.png', author: 'কারুকথা টিম',
    publishedAt: '2025-01-20', category: 'crafts', tags: ['bamboo', 'cane', 'crafts'],
    isPublished: true, isDemoData: true, relatedProducts: ['p001', 'p002', 'p003'],
  },
  {
    id: 'b003', titleBn: 'হস্তশিল্পের যত্ন: আপনার পণ্য দীর্ঘস্থায়ী করুন', titleEn: 'Handicraft Care: Making Your Products Last',
    slug: 'handicraft-care-guide',
    excerptBn: 'হাতে তৈরি পণ্যের সঠিক যত্ন কিভাবে নিবেন? জানুন আমাদের সম্পূর্ণ গাইড।',
    excerptEn: 'How to properly care for handmade products? Read our complete guide.',
    contentBn: '<p>হাতে তৈরি পণ্য বিশেষ যত্নের দাবি রাখে। সঠিক পরিচর্যা করলে এগুলো দীর্ঘদিন সুন্দর থাকে...</p>',
    contentEn: '<p>Handmade products require special care. With proper maintenance, they remain beautiful for a long time...</p>',
    featuredImage: 'https://image.qwenlm.ai/generated-images/d61b27d1-29e7-4737-934d-3024eff7d869/_result.png', author: 'কারুকথা টিম',
    publishedAt: '2025-02-01', category: 'guides', tags: ['care', 'maintenance', 'tips'],
    isPublished: true, isDemoData: true, relatedProducts: [],
  },
  {
    id: 'b004', titleBn: 'টেরাকোটা: মাটির শিল্প, বাংলার গর্ব', titleEn: 'Terracotta: Clay Art, Pride of Bengal',
    slug: 'terracotta-clay-art-bengal',
    excerptBn: 'বাংলার টেরাকোটা শিল্পের ঐতিহ্য ও বর্তমান অবস্থা নিয়ে একটি বিশেষ আলেখ্য।',
    excerptEn: 'A special feature on the tradition and current state of Bengal\'s terracotta art.',
    contentBn: '<p>টেরাকোটা বাংলার অন্যতম প্রাচীন শিল্পরূপ...</p>',
    contentEn: '<p>Terracotta is one of Bengal\'s oldest art forms...</p>',
    featuredImage: 'https://image.qwenlm.ai/generated-images/9cf27221-819c-4e6a-a175-294dbf31a042/_result.png', author: 'কারুকথা টিম',
    publishedAt: '2025-02-10', category: 'heritage', tags: ['terracotta', 'pottery', 'heritage'],
    isPublished: true, isDemoData: true, relatedProducts: ['p008', 'p009', 'p010', 'p011', 'p012'],
  },
  {
    id: 'b005', titleBn: 'সোনালি আঁশ: পাট শিল্পের নতুন দিগন্ত', titleEn: 'Golden Fiber: New Horizons of Jute Industry',
    slug: 'jute-industry-new-horizons',
    excerptBn: 'পাট শিল্পে আধুনিক ডিজাইনের সংযোজনে নতুন সম্ভাবনা।',
    excerptEn: 'New possibilities with modern design integration in the jute industry.',
    contentBn: '<p>সোনালি আশ খ্যাত পাট এখন নতুন রূপে ফিরে আসছে...</p>',
    contentEn: '<p>Jute, known as the golden fiber, is returning in new forms...</p>',
    featuredImage: 'https://image.qwenlm.ai/generated-images/5d170e81-44cb-454b-8809-835299af83d4/_result.png', author: 'কারুকথা টিম',
    publishedAt: '2025-02-15', category: 'crafts', tags: ['jute', 'sustainable', 'crafts'],
    isPublished: true, isDemoData: true, relatedProducts: ['p013', 'p014', 'p015', 'p016'],
  },
];

// === OFFERS ===
export const offers: Offer[] = [
  {
    id: 'off001', name: 'Eid Seasonal Discount', publicTitle: 'ঈদ স্পেশাল ছাড়', publicTitleBn: 'ঈদ স্পেশাল ছাড়',
    description: '15% off on all products', type: 'percentage', value: 15, code: 'EID15',
    minOrder: 1000, startDate: '2025-03-01', endDate: '2026-12-31', isActive: true,
    usageLimit: 500, usageCount: 42, applicableCategories: [], applicableProducts: [],
  },
  {
    id: 'off002', name: 'Free Shipping Dhaka', publicTitle: 'ঢাকায় ফ্রি ডেলিভারি', publicTitleBn: 'ঢাকায় ফ্রি ডেলিভারি',
    description: 'Free delivery within Dhaka', type: 'freeship', value: 0, code: 'DHAKAFREE',
    minOrder: 2000, startDate: '2025-01-01', endDate: '2026-12-31', isActive: true,
    usageLimit: 1000, usageCount: 156, applicableCategories: [], applicableProducts: [],
  },
  {
    id: 'off003', name: 'New Year Fixed Discount', publicTitle: '৫০০ টাকা ছাড়', publicTitleBn: '৫০০ টাকা ছাড়',
    description: 'Flat 500 BDT off on orders above 3000', type: 'fixed', value: 500, code: 'NEWYEAR500',
    minOrder: 3000, startDate: '2025-01-01', endDate: '2026-06-30', isActive: true,
    usageLimit: 200, usageCount: 35, applicableCategories: [], applicableProducts: [],
  },
];

// === STORE SETTINGS ===
export const storeSettings: StoreSettings = {
  brandName: 'Karukotha',
  brandNameBn: 'কারুকথা',
  tagline: 'Authentic Bangladeshi Handicrafts',
  taglineBn: 'বাংলার কারুশিল্প, আপনার ঘরে',
  currency: 'BDT',
  currencySymbol: '৳',
  announcementBar: '🎉 সকল পণ্যে ১৫% ছাড়! কোড: EID15',
  announcementBarBn: '🎉 সকল পণ্যে ১৫% ছাড়! কোড: EID15',
  announcementBarActive: true,
  contactEmail: '[placeholder@example.com]',
  contactPhone: '[placeholder-phone]',
  socialLinks: [],
  shippingZones: [
    { name: 'ঢাকা সিটি', fee: 60 },
    { name: 'ঢাকা বিভাগ (সিটি ছাড়া)', fee: 100 },
    { name: 'অন্যান্য বিভাগ', fee: 130 },
  ],
};

// === HELPER FUNCTIONS ===
export const getProductBySlug = (slug: string): Product | undefined => products.find(p => p.slug === slug);
export const getProductById = (id: string): Product | undefined => products.find(p => p.id === id);
export const getProductsByCategory = (categoryId: string): Product[] => products.filter(p => p.categoryId === categoryId);
export const getCategoryBySlug = (slug: string): Category | undefined => categories.find(c => c.slug === slug);
export const getFeaturedProducts = (): Product[] => products.filter(p => p.isFeatured && p.isPublished);
export const getNewArrivals = (): Product[] => products.filter(p => p.isNewArrival && p.isPublished);
export const getBestSellers = (): Product[] => products.filter(p => p.isBestSeller && p.isPublished);
export const getPublishedBlogPosts = (): BlogPost[] => blogPosts.filter(p => p.isPublished);
export const getActiveOffers = (): Offer[] => offers.filter(o => o.isActive && new Date(o.endDate) > new Date());
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => blogPosts.find(p => p.slug === slug);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(p =>
    p.nameBn.toLowerCase().includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.shortDescBn.toLowerCase().includes(q) ||
    p.shortDescEn.toLowerCase().includes(q) ||
    p.materials.some(m => m.toLowerCase().includes(q))
  );
};

export const formatPrice = (price: number): string => {
  return `৳${price.toLocaleString('bn-BD')}`;
};

export const generateOrderNumber = (): string => {
  const now = new Date();
  const ym = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
  const seq = String(Math.floor(Math.random() * 999999) + 1).padStart(6, '0');
  return `KK-${ym}-${seq}`;
};
