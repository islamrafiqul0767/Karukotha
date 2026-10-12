// Karukotha - Product Media Manifest
// Maps real generated images to products. Unavailable shots use category-appropriate concept placeholders.
// All AI-generated images are clearly marked as concept assets for development preview.

export const IMAGE_URLS = {
  // Brand
  logo: '/assets/brand/karukotha-logo.svg',
  symbol: '/assets/brand/karukotha-symbol.svg',
  favicon: '/assets/brand/favicon.svg',
  
  // Homepage
  heroBanner: 'https://image.qwenlm.ai/generated-images/80ad9f58-271c-4e80-b9e7-03138a18a7a4/_result.png',
  craftsmanshipBanner: 'https://image.qwenlm.ai/generated-images/d61b27d1-29e7-4737-934d-3024eff7d869/_result.png',
  
  // Product Images - Real AI-generated photography (marked as concept assets)
  // Product 1: Cane Storage Basket
  p001_hero: 'https://image.qwenlm.ai/generated-images/49fa09d3-0167-4979-b794-9623c67feb5d/_result.png',
  
  // Product 8: Terracotta Plant Pot
  p008_hero: 'https://image.qwenlm.ai/generated-images/9cf27221-819c-4e6a-a175-294dbf31a042/_result.png',
  
  // Product 17: Nakshi Kantha Cushion
  p017_hero: 'https://image.qwenlm.ai/generated-images/7a0bfbc1-80a9-48c2-8545-803d0934953c/_result.png',
  
  // Product 13: Jute Tote Bag
  p013_hero: 'https://image.qwenlm.ai/generated-images/5d170e81-44cb-454b-8809-835299af83d4/_result.png',
  
  // Product 21: Shital Pati
  p021_hero: 'https://image.qwenlm.ai/generated-images/a43fefe7-ba1a-4d40-ada4-6e8ea6212c5f/_result.png',
  
  // Product 27: Wooden Jewelry Box
  p027_hero: 'https://image.qwenlm.ai/generated-images/97a05c40-5c61-4383-9515-e6ac9c0d9dcc/_result.png',
  
  // Product 24: Crochet Coaster Set
  p024_hero: 'https://image.qwenlm.ai/generated-images/4b7cbf9e-bfc9-4eb9-a64b-027fa29aa235/_result.png',
};

// Category-appropriate concept placeholder generator
// These use placehold.co with category-specific colors and are clearly marked as DEMO/CONCEPT
export const getCategoryPlaceholder = (category: string, productSlug: string, shotType: string): string => {
  const categoryColors: Record<string, { bg: string; text: string }> = {
    'bamboo-cane': { bg: '8B7355', text: 'FFFFFF' },
    'pottery': { bg: 'C1440E', text: 'FFFFFF' },
    'jute': { bg: 'C4A882', text: '3D3D3D' },
    'nakshi-kantha': { bg: '4A6741', text: 'FFFFFF' },
    'shital-pati': { bg: 'D4C5A9', text: '3D3D3D' },
    'crochet': { bg: 'E8D5B7', text: '3D3D3D' },
    'wood-folk': { bg: '6B4226', text: 'FFFFFF' },
    'paper-gifts': { bg: 'F5F0E8', text: '3D3D3D' },
  };
  
  const colors = categoryColors[category] || { bg: 'E8E0D5', text: '8B7E74' };
  const label = encodeURIComponent(`${shotType}`);
  return `https://placehold.co/800x800/${colors.bg}/${colors.text}?text=${label}&font=roboto`;
};

// Asset status tracking
export interface AssetRecord {
  productId: string;
  shotType: string;
  url: string;
  status: 'verified' | 'concept' | 'pending';
  altText: string;
}

export const assetManifest: AssetRecord[] = [
  // Products with real AI-generated hero images
  { productId: 'p001', shotType: 'hero', url: IMAGE_URLS.p001_hero, status: 'concept', altText: 'Handwoven Cane Storage Basket - Hero Shot' },
  { productId: 'p008', shotType: 'hero', url: IMAGE_URLS.p008_hero, status: 'concept', altText: 'Terracotta Plant Pot - Hero Shot' },
  { productId: 'p013', shotType: 'hero', url: IMAGE_URLS.p013_hero, status: 'concept', altText: 'Natural Jute Tote Bag - Hero Shot' },
  { productId: 'p017', shotType: 'hero', url: IMAGE_URLS.p017_hero, status: 'concept', altText: 'Nakshi Kantha Cushion Cover - Hero Shot' },
  { productId: 'p021', shotType: 'hero', url: IMAGE_URLS.p021_hero, status: 'concept', altText: 'Traditional Shital Pati - Hero Shot' },
  { productId: 'p024', shotType: 'hero', url: IMAGE_URLS.p024_hero, status: 'concept', altText: 'Crochet Coaster Set - Hero Shot' },
  { productId: 'p027', shotType: 'hero', url: IMAGE_URLS.p027_hero, status: 'concept', altText: 'Wooden Keepsake Box - Hero Shot' },
];
