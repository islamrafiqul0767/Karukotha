import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, ProductVariant, generateOrderNumber, offers } from '../data';

// === CART STORE ===
export interface CartItem {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant | null, quantity: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
  getDiscount: (code: string) => { valid: boolean; discount: number; message: string };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, variant, quantity) => {
        set(state => {
          const existingIndex = state.items.findIndex(
            item => item.product.id === product.id && item.variant?.id === variant?.id
          );
          if (existingIndex >= 0) {
            const newItems = [...state.items];
            const maxStock = variant ? variant.stock : product.stock;
            newItems[existingIndex].quantity = Math.min(newItems[existingIndex].quantity + quantity, maxStock);
            return { items: newItems };
          }
          const maxStock = variant ? variant.stock : product.stock;
          return { items: [...state.items, { product, variant, quantity: Math.min(quantity, maxStock) }] };
        });
      },
      removeItem: (productId, variantId) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.product.id === productId && item.variant?.id === variantId)
          ),
        }));
      },
      updateQuantity: (productId, variantId, quantity) => {
        set(state => ({
          items: state.items.map(item => {
            if (item.product.id === productId && item.variant?.id === variantId) {
              const maxStock = item.variant ? item.variant.stock : item.product.stock;
              return { ...item, quantity: Math.max(1, Math.min(quantity, maxStock)) };
            }
            return item;
          }),
        }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price + (item.variant?.priceModifier || 0);
          return total + price * item.quantity;
        }, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      getDiscount: (code: string) => {
        const offer = offers.find((o) => o.code === code && o.isActive && new Date(o.endDate) > new Date());
        if (!offer) return { valid: false, discount: 0, message: 'অবৈধ কুপন কোড' };
        if (offer.usageCount >= (offer.usageLimit || Infinity)) return { valid: false, discount: 0, message: 'কুপন ব্যবহার সীমা শেষ' };
        const subtotal = get().getSubtotal();
        if (offer.minOrder && subtotal < offer.minOrder) return { valid: false, discount: 0, message: `সর্বনিম্ন ৳${offer.minOrder} অর্ডার প্রয়োজন` };
        let discount = 0;
        if (offer.type === 'percentage') discount = Math.round(subtotal * offer.value / 100);
        else if (offer.type === 'fixed') discount = offer.value;
        else if (offer.type === 'freeship') discount = 0; // handled separately
        return { valid: true, discount, message: `৳${discount} ছাড় প্রযোজ্য` };
      },
    }),
    { name: 'karukotha-cart' }
  )
);

// === WISHLIST STORE ===
interface WishlistStore {
  items: string[];
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (productId) => {
        set(state => ({
          items: state.items.includes(productId)
            ? state.items.filter(id => id !== productId)
            : [...state.items, productId],
        }));
      },
      isInWishlist: (productId) => get().items.includes(productId),
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'karukotha-wishlist' }
  )
);

// === ORDER STORE ===
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerName: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  address: string;
  orderNotes: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  adminNotes: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'paymentStatus' | 'orderStatus' | 'adminNotes'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  getOrdersByPhone: (phone: string) => Order[];
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          orderNumber: generateOrderNumber(),
          createdAt: new Date().toISOString(),
          paymentStatus: 'pending',
          orderStatus: 'pending',
          adminNotes: '',
        };
        set(state => ({ orders: [order, ...state.orders] }));
        return order;
      },
      updateOrderStatus: (orderId, status) => {
        set(state => ({
          orders: state.orders.map(o => o.id === orderId ? { ...o, orderStatus: status } : o),
        }));
      },
      getOrdersByPhone: (phone) => {
        return get().orders.filter(o => o.phone === phone);
      },
    }),
    { name: 'karukotha-orders' }
  )
);

// === AUTH STORE ===
interface AuthStore {
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: { name: string; email: string; phone: string } | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; message: string };
  adminLogin: (email: string, password: string) => { success: boolean; message: string };
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAdmin: false,
      user: null,
      login: (email, password) => {
        // Demo authentication - in production, use Supabase Auth
        if (email && password.length >= 6) {
          set({ isLoggedIn: true, user: { name: email.split('@')[0], email, phone: '' } });
          return { success: true, message: 'সফলভাবে লগইন হয়েছে' };
        }
        return { success: false, message: 'ভুল ইমেইল বা পাসওয়ার্ড' };
      },
      register: (name, email, phone, password) => {
        if (name && email && phone && password.length >= 6) {
          set({ isLoggedIn: true, user: { name, email, phone } });
          return { success: true, message: 'অ্যাকাউন্ট তৈরি হয়েছে' };
        }
        return { success: false, message: 'সকল তথ্য সঠিকভাবে পূরণ করুন' };
      },
      adminLogin: (email, password) => {
        // Demo admin - in production, use Supabase Auth with role-based access
        if (email === 'admin@karukotha.com' && password === 'admin123') {
          set({ isLoggedIn: true, isAdmin: true, user: { name: 'Admin', email, phone: '' } });
          return { success: true, message: 'অ্যাডমিন লগইন সফল' };
        }
        return { success: false, message: 'ভুল অ্যাডমিন তথ্য' };
      },
      logout: () => set({ isLoggedIn: false, isAdmin: false, user: null }),
    }),
    { name: 'karukotha-auth' }
  )
);

// === UI STORE ===
interface UIStore {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  toasts: { id: string; message: string; type: 'success' | 'error' | 'info'; count?: number }[];
  openCart: () => void;
  closeCart: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  toasts: [],
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  addToast: (message, type) => {
    const id = Date.now().toString();
    set(state => {
      // Check if similar toast exists and aggregate
      const existingToast = state.toasts.find(t => t.message === message && t.type === type);
      if (existingToast) {
        return {
          toasts: state.toasts.map(t => 
            t.id === existingToast.id 
              ? { ...t, count: (t.count || 1) + 1 }
              : t
          )
        };
      }
      return { toasts: [...state.toasts, { id, message, type, count: 1 }] };
    });
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set(state => ({ toasts: state.toasts.filter(t => t.id !== id) })),
}));
