import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { useCartStore, useOrderStore, useUIStore } from '../store';
import { formatPrice, storeSettings } from '../data';

// === CART PAGE ===
export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const shipping = 60; // Default Dhaka
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-warm-gray mb-4" />
        <h1 className="text-2xl font-bold text-forest mb-2">আপনার ব্যাগ খালি</h1>
        <p className="text-warm-gray mb-6">সুন্দর হস্তশিল্প পণ্য দেখুন এবং ব্যাগে যোগ করুন।</p>
        <Link to="/shop" className="bg-forest text-white px-6 py-3 rounded font-medium hover:bg-forest-light transition-colors inline-block">
          শপ দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-forest mb-6">শপিং ব্যাগ</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => (
            <motion.div
              key={`${item.product.id}-${item.variant?.id}-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 bg-white p-4 rounded-lg border border-light-border"
            >
              <Link to={`/product/${item.product.slug}`}>
                <img src={item.product.images[0]?.url} alt={item.product.nameBn} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.slug}`} className="font-medium hover:text-forest transition-colors line-clamp-2">
                  {item.product.nameBn}
                </Link>
                {item.variant && <p className="text-sm text-warm-gray mt-0.5">{item.variant.nameBn}</p>}
                <p className="text-sm text-warm-gray mt-0.5">৳{(item.product.price + (item.variant?.priceModifier || 0)).toLocaleString()} /টি</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-light-border rounded">
                    <button onClick={() => updateQuantity(item.product.id, item.variant?.id || null, item.quantity - 1)} className="px-2 py-1 hover:bg-cream">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1 text-sm border-x border-light-border">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.variant?.id || null, item.quantity + 1)} className="px-2 py-1 hover:bg-cream">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-forest">৳{((item.product.price + (item.variant?.priceModifier || 0)) * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.product.id, item.variant?.id || null)} className="text-warm-gray hover:text-terracotta">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <button onClick={clearCart} className="text-sm text-terracotta hover:underline">সব মুছুন</button>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg border border-light-border h-fit sticky top-24">
          <h2 className="font-semibold text-lg mb-4">অর্ডার সারাংশ</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>সাবটোটাল</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            <hr className="border-light-border" />
            <div className="flex justify-between font-semibold text-lg">
              <span>মোট</span>
              <span className="text-forest">{formatPrice(total)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-forest text-white py-3 rounded font-medium mt-6 hover:bg-forest-light transition-colors"
          >
            চেকআউট করুন
          </button>
          <Link to="/shop" className="block text-center text-sm text-forest mt-3 hover:underline">
            আরও কিনুন
          </Link>
        </div>
      </div>
    </div>
  );
};

// === CHECKOUT PAGE ===
export const CheckoutPage: React.FC = () => {
  const { items, getSubtotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { addToast } = useUIStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    division: 'ঢাকা', district: '', upazila: '', address: '',
    orderNotes: '', paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">চেকআউট করতে ব্যাগে পণ্য যোগ করুন</h1>
        <Link to="/shop" className="text-forest underline">শপ দেখুন</Link>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const shippingFee = form.division === 'ঢাকা' ? 60 : form.division ? 130 : 60;
  const total = subtotal - discount + shippingFee;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'নাম আবশ্যক';
    if (!form.phone.trim()) errs.phone = 'ফোন নম্বর আবশ্যক';
    else if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) errs.phone = 'সঠিক ফোন নম্বর দিন';
    if (!form.district.trim()) errs.district = 'জেলা আবশ্যক';
    if (!form.address.trim()) errs.address = 'ঠিকানা আবশ্যক';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const order = addOrder({
        items,
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        division: form.division,
        district: form.district,
        upazila: form.upazila,
        address: form.address,
        orderNotes: form.orderNotes,
        subtotal,
        discount,
        shippingFee,
        total,
        paymentMethod: form.paymentMethod,
      });

      clearCart();
      addToast('অর্ডার সফলভাবে সম্পন্ন হয়েছে!', 'success');
      navigate(`/order-confirmation/${order.id}`);
    } catch {
      addToast('অর্ডার দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) return;
    // Simple demo coupon validation
    const validCoupons: Record<string, { type: string; value: number; min: number }> = {
      'EID15': { type: 'percentage', value: 15, min: 1000 },
      'DHAKAFREE': { type: 'freeship', value: 0, min: 2000 },
      'NEWYEAR500': { type: 'fixed', value: 500, min: 3000 },
    };
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (!coupon) {
      setCouponMessage('অবৈধ কুপন কোড');
      setDiscount(0);
      return;
    }
    if (subtotal < coupon.min) {
      setCouponMessage(`সর্বনিম্ন ৳${coupon.min} অর্ডার প্রয়োজন`);
      setDiscount(0);
      return;
    }
    let d = 0;
    if (coupon.type === 'percentage') d = Math.round(subtotal * coupon.value / 100);
    else if (coupon.type === 'fixed') d = coupon.value;
    setDiscount(d);
    setCouponMessage(`৳${d} ছাড় প্রযোজ্য!`);
  };

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/cart" className="text-sm text-forest flex items-center gap-1 mb-6 hover:underline">
        <ArrowLeft size={14} /> ব্যাগে ফিরে যান
      </Link>

      <h1 className="text-2xl font-bold text-forest mb-6">চেকআউট</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg border border-light-border">
              <h2 className="font-semibold text-lg mb-4">যোগাযোগের তথ্য</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-name" className="text-sm font-medium block mb-1">
                    নাম <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="checkout-name"
                    type="text" 
                    value={form.name} 
                    onChange={e => updateField('name', e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:border-forest min-h-[44px] ${errors.name ? 'border-terracotta' : 'border-light-border'}`}
                    placeholder="আপনার পূর্ণ নাম"
                  />
                  {errors.name && <p id="name-error" className="text-xs text-terracotta mt-1" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="text-sm font-medium block mb-1">
                    ফোন নম্বর <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel" 
                    value={form.phone} 
                    onChange={e => updateField('phone', e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    pattern="01[3-9][0-9]{8}"
                    className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:border-forest min-h-[44px] ${errors.phone ? 'border-terracotta' : 'border-light-border'}`}
                    placeholder="01XXXXXXXXX"
                  />
                  {errors.phone && <p id="phone-error" className="text-xs text-terracotta mt-1" role="alert">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="checkout-email" className="text-sm font-medium block mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input
                    id="checkout-email"
                    type="email" 
                    value={form.email} 
                    onChange={e => updateField('email', e.target.value)}
                    className="w-full px-3 py-2.5 border border-light-border rounded focus:outline-none focus:border-forest min-h-[44px]"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-lg border border-light-border">
              <h2 className="font-semibold text-lg mb-4">ডেলিভারি ঠিকানা</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkout-division" className="text-sm font-medium block mb-1">
                    বিভাগ <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <select 
                    id="checkout-division"
                    value={form.division} 
                    onChange={e => updateField('division', e.target.value)}
                    required
                    aria-required="true"
                    className="w-full px-3 py-2.5 border border-light-border rounded focus:outline-none focus:border-forest min-h-[44px]"
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    <option>ঢাকা</option><option>চট্টগ্রাম</option><option>রাজশাহী</option><option>খুলনা</option>
                    <option>বরিশাল</option><option>সিলেট</option><option>রংপুর</option><option>ময়মনসিংহ</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="checkout-district" className="text-sm font-medium block mb-1">
                    জেলা <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="checkout-district"
                    type="text" 
                    value={form.district} 
                    onChange={e => updateField('district', e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.district}
                    aria-describedby={errors.district ? 'district-error' : undefined}
                    className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:border-forest min-h-[44px] ${errors.district ? 'border-terracotta' : 'border-light-border'}`}
                    placeholder="জেলা"
                  />
                  {errors.district && <p id="district-error" className="text-xs text-terracotta mt-1" role="alert">{errors.district}</p>}
                </div>
                <div>
                  <label htmlFor="checkout-upazila" className="text-sm font-medium block mb-1">উপজেলা/থানা</label>
                  <input
                    id="checkout-upazila"
                    type="text" 
                    value={form.upazila} 
                    onChange={e => updateField('upazila', e.target.value)}
                    className="w-full px-3 py-2.5 border border-light-border rounded focus:outline-none focus:border-forest min-h-[44px]"
                    placeholder="উপজেলা/থানা"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="checkout-address" className="text-sm font-medium block mb-1">
                    সম্পূর্ণ ঠিকানা <span className="text-terracotta" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="checkout-address"
                    value={form.address} 
                    onChange={e => updateField('address', e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                    rows={3}
                    className={`w-full px-3 py-2.5 border rounded focus:outline-none focus:border-forest ${errors.address ? 'border-terracotta' : 'border-light-border'}`}
                    placeholder="বাড়ি নং, রাস্তা, এলাকা"
                  />
                  {errors.address && <p id="address-error" className="text-xs text-terracotta mt-1" role="alert">{errors.address}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="checkout-notes" className="text-sm font-medium block mb-1">অর্ডার নোট (ঐচ্ছিক)</label>
                  <textarea
                    id="checkout-notes"
                    value={form.orderNotes} 
                    onChange={e => updateField('orderNotes', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2.5 border border-light-border rounded focus:outline-none focus:border-forest"
                    placeholder="বিশেষ নির্দেশনা থাকলে লিখুন"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg border border-light-border">
              <h2 className="font-semibold text-lg mb-4">পেমেন্ট পদ্ধতি</h2>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'ক্যাশ অন ডেলিভারি', desc: 'পণ্য হাতে পেয়ে টাকা দিন', available: true },
                  { id: 'bkash', label: 'বিকাশ', desc: 'বর্তমানে চালু নয় — শীঘ্রই আসছে', available: false },
                  { id: 'nagad', label: 'নগদ', desc: 'বর্তমানে চালু নয় — শীঘ্রই আসছে', available: false },
                  { id: 'sslcommerz', label: 'অনলাইন পেমেন্ট', desc: 'বর্তমানে চালু নয় — কনফিগারেশন প্রয়োজন', available: false },
                ].map(method => (
                  <label 
                    key={method.id} 
                    className={`flex items-start gap-3 p-3 border rounded transition-colors ${
                      !method.available 
                        ? 'border-light-border bg-gray-50 opacity-60 cursor-not-allowed' 
                        : form.paymentMethod === method.id 
                          ? 'border-forest bg-forest/5 cursor-pointer' 
                          : 'border-light-border hover:border-forest/50 cursor-pointer'
                    }`}
                  >
                    <input
                      type="radio" 
                      name="payment" 
                      value={method.id}
                      checked={form.paymentMethod === method.id}
                      onChange={e => updateField('paymentMethod', e.target.value)}
                      disabled={!method.available}
                      className="mt-0.5 accent-forest"
                    />
                    <div>
                      <p className="font-medium text-sm">{method.label}</p>
                      <p className="text-xs text-warm-gray">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-light-border sticky top-24">
              <h2 className="font-semibold text-lg mb-4">আপনার অর্ডার</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm">
                    <img src={item.product.images[0]?.url} alt="" className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="line-clamp-1 font-medium">{item.product.nameBn}</p>
                      {item.variant && <p className="text-xs text-warm-gray">{item.variant.nameBn}</p>}
                      <p className="text-xs text-warm-gray">×{item.quantity}</p>
                    </div>
                    <p className="font-medium">৳{((item.product.price + (item.variant?.priceModifier || 0)) * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
                    <input
                      type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                      placeholder="কুপন কোড"
                      className="w-full pl-8 pr-3 py-2 border border-light-border rounded text-sm focus:outline-none focus:border-forest"
                    />
                  </div>
                  <button type="button" onClick={applyCoupon} className="px-3 py-2 bg-forest text-white rounded text-sm hover:bg-forest-light">
                    প্রয়োগ
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-xs mt-1 ${discount > 0 ? 'text-forest' : 'text-terracotta'}`}>{couponMessage}</p>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm border-t border-light-border pt-4">
                <div className="flex justify-between"><span>সাবটোটাল</span><span>{formatPrice(subtotal)}</span></div>
                {discount > 0 && <div className="flex justify-between text-forest"><span>ছাড়</span><span>-{formatPrice(discount)}</span></div>}
                <div className="flex justify-between"><span>ডেলিভারি</span><span>{formatPrice(shippingFee)}</span></div>
                <hr className="border-light-border" />
                <div className="flex justify-between font-bold text-lg"><span>মোট</span><span className="text-forest">{formatPrice(total)}</span></div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-forest text-white py-3 rounded font-medium mt-4 hover:bg-forest-light transition-colors disabled:bg-warm-gray disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : `অর্ডার করুন — ${formatPrice(total)}`}
              </button>

              <p className="text-xs text-warm-gray text-center mt-3">
                অর্ডার করে আপনি আমাদের <Link to="/terms" className="underline">শর্তাবলী</Link> মেনে নিচ্ছেন।
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// === ORDER CONFIRMATION ===
export const OrderConfirmationPage: React.FC = () => {
  const { orders } = useOrderStore();
  const { addToast } = useUIStore();
  const orderId = window.location.pathname.split('/').pop() || '';
  const order = orders.find(o => o.id === orderId);
  const [isDownloading, setIsDownloading] = useState<'png' | 'pdf' | null>(null);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-forest mb-4">অর্ডার পাওয়া যায়নি</h1>
        <p className="text-warm-gray mb-6">এই অর্ডারের তথ্য পাওয়া যায়নি বা আপনার অ্যাক্সেস নেই।</p>
        <Link to="/" className="text-forest underline">হোমে ফিরে যান</Link>
      </div>
    );
  }

  const handleDownloadPNG = async () => {
    try {
      setIsDownloading('png');
      const { generateInvoiceData, downloadInvoicePNG } = await import('../utils/invoiceGenerator');
      const invoiceData = generateInvoiceData(order);
      await downloadInvoicePNG(invoiceData);
      addToast('ইনভয়েস ডাউনলোড হয়েছে', 'success');
    } catch (error) {
      console.error('Failed to download PNG:', error);
      addToast('ইনভয়েস ডাউনলোড করতে সমস্যা হয়েছে', 'error');
    } finally {
      setIsDownloading(null);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setIsDownloading('pdf');
      const { generateInvoiceData, downloadInvoicePDF } = await import('../utils/invoiceGenerator');
      const invoiceData = generateInvoiceData(order);
      await downloadInvoicePDF(invoiceData);
      addToast('ইনভয়েস ডাউনলোড হয়েছে', 'success');
    } catch (error) {
      console.error('Failed to download PDF:', error);
      addToast('ইনভয়েস ডাউনলোড করতে সমস্যা হয়েছে', 'error');
    } finally {
      setIsDownloading(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-20 h-20 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-4xl text-forest">✓</span>
        </motion.div>
        <h1 className="text-2xl font-bold text-forest mb-2">অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h1>
        <p className="text-warm-gray">আপনার অর্ডারের বিস্তারিত নিচে দেওয়া হলো। ইনভয়েস ডাউনলোড করতে পারেন।</p>
      </motion.div>

      {/* Invoice Card */}
      <div className="bg-white p-6 rounded-lg border border-light-border space-y-4" id="invoice-content">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-light-border pb-4">
          <div>
            <h2 className="text-xl font-bold text-forest">কারুকথা</h2>
            <p className="text-sm text-warm-gray">ইনভয়েস / Invoice</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-warm-gray">ইনভয়েস নং</p>
            <p className="font-mono font-semibold">INV-{order.orderNumber.replace('KK-', '')}</p>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-forest mb-2">অর্ডারের তথ্য</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-warm-gray">অর্ডার নং:</span> {order.orderNumber}</p>
              <p><span className="text-warm-gray">তারিখ:</span> {new Date(order.createdAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><span className="text-warm-gray">সময়:</span> {new Date(order.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-forest mb-2">গ্রাহকের তথ্য</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-warm-gray">নাম:</span> {order.customerName}</p>
              <p><span className="text-warm-gray">ফোন:</span> {order.phone}</p>
              {order.email && <p><span className="text-warm-gray">ইমেইল:</span> {order.email}</p>}
              <p><span className="text-warm-gray">ঠিকানা:</span> {order.address}</p>
              <p className="text-warm-gray">{order.district}, {order.division}</p>
            </div>
          </div>
        </div>

        <hr className="border-light-border" />

        {/* Payment Info */}
        <div className="flex justify-between items-center text-sm">
          <div>
            <p><span className="text-warm-gray">পেমেন্ট পদ্ধতি:</span> {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod}</p>
            <p><span className="text-warm-gray">পেমেন্ট অবস্থা:</span> <span className={order.paymentStatus === 'paid' ? 'text-forest font-medium' : 'text-mustard font-medium'}>{order.paymentStatus === 'paid' ? 'পরিশোধিত' : 'অপেক্ষমান'}</span></p>
          </div>
          <div className="text-right">
            <p><span className="text-warm-gray">অর্ডার অবস্থা:</span> <span className="text-forest font-medium">{order.orderStatus === 'pending' ? 'অপেক্ষমান' : order.orderStatus}</span></p>
          </div>
        </div>

        <hr className="border-light-border" />

        {/* Items */}
        <div>
          <p className="text-sm font-medium text-forest mb-3">পণ্যের বিবরণ</p>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-sm pb-2 border-b border-light-border/50 last:border-0">
                <div className="flex-1">
                  <p className="font-medium">{item.product.nameBn}</p>
                  {item.variant && <p className="text-xs text-warm-gray">{item.variant.nameBn}</p>}
                  <p className="text-xs text-warm-gray">SKU: {item.product.sku}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="text-warm-gray">{item.quantity} × ৳{(item.product.price + (item.variant?.priceModifier || 0)).toLocaleString()}</p>
                  <p className="font-semibold">৳{((item.product.price + (item.variant?.priceModifier || 0)) * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-light-border" />

        {/* Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>সাবটোটাল</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-forest">
              <span>ছাড়</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>ডেলিভারি চার্জ</span>
            <span>{formatPrice(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-light-border">
            <span>সর্বমোট</span>
            <span className="text-forest">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-light-border pt-4 text-center text-xs text-warm-gray">
          <p>এই ইনভয়েস কম্পিউটার দিয়ে তৈরি করা হয়েছে</p>
          <p>কারুকথা | {storeSettings.contactEmail} | ঢাকা, বাংলাদেশ</p>
        </div>
      </div>

      {/* Download Actions */}
      <div className="mt-6 space-y-3">
        <p className="text-sm font-medium text-forest">ইনভয়েস ডাউনলোড করুন</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <button
            onClick={handleDownloadPNG}
            disabled={isDownloading !== null}
            className="bg-forest text-white py-3 px-4 rounded font-medium hover:bg-forest-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isDownloading === 'png' ? (
              <>
                <span className="spinner" /> ডাউনলোড হচ্ছে...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                PNG ডাউনলোড (3×)
              </>
            )}
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading !== null}
            className="border border-forest text-forest py-3 px-4 rounded font-medium hover:bg-cream transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px]"
          >
            {isDownloading === 'pdf' ? (
              <>
                <span className="spinner" /> ডাউনলোড হচ্ছে...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                PDF ডাউনলোড
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="border border-light-border text-charcoal py-3 px-4 rounded font-medium hover:bg-cream transition-colors flex items-center justify-center gap-2 min-h-[48px]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            প্রিন্ট করুন
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        <Link to="/shop" className="flex-1 text-center border border-forest text-forest py-3 rounded font-medium hover:bg-cream transition-colors min-h-[48px] flex items-center justify-center">
          আরও কিনুন
        </Link>
        <Link to="/" className="flex-1 text-center bg-forest text-white py-3 rounded font-medium hover:bg-forest-light transition-colors min-h-[48px] flex items-center justify-center">
          হোমে ফিরে যান
        </Link>
      </div>

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-cream rounded-lg text-xs text-warm-gray">
        <p className="font-medium text-charcoal mb-1">নিরাপত্তা নোটিশ:</p>
        <p>এই ইনভয়েস আপনার অর্ডারের তথ্য দেখায়। ইনভয়েস ডাউনলোড আপনার ডিভাইসে সংরক্ষিত হবে। প্রয়োজনে প্রিন্ট করে রাখুন।</p>
      </div>
    </div>
  );
};
