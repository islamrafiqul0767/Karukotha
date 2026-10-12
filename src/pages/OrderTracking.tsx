import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Phone, Search, CheckCircle, Truck, Clock, AlertCircle } from 'lucide-react';
import { useOrderStore } from '../store';
import { formatPrice } from '../data';

export const OrderTrackingPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [searched, setSearched] = useState(false);
  const { orders } = useOrderStore();

  const foundOrders = searched
    ? orders.filter(o =>
        (phone && o.phone === phone) ||
        (orderNumber && o.orderNumber.toLowerCase() === orderNumber.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const getStatusStep = (status: string) => {
    const steps = ['pending', 'confirmed', 'preparing', 'shipped', 'delivered'];
    return steps.indexOf(status);
  };

  const statusLabels: Record<string, string> = {
    pending: 'পেন্ডিং',
    confirmed: 'নিশ্চিত',
    preparing: 'প্রস্তুতি চলছে',
    shipped: 'পাঠানো হয়েছে',
    delivered: 'ডেলিভারি সম্পন্ন',
    cancelled: 'বাতিল',
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-forest mb-6">অর্ডার ট্র্যাকিং</h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg border border-light-border mb-8">
        <p className="text-sm text-warm-gray mb-4">আপনার ফোন নম্বর বা অর্ডার নম্বর দিয়ে খুঁজুন।</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">ফোন নম্বর</label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full pl-9 pr-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">অর্ডার নম্বর</label>
            <div className="relative">
              <Package size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-gray" />
              <input
                type="text"
                value={orderNumber}
                onChange={e => setOrderNumber(e.target.value)}
                placeholder="KK-202501-000001"
                className="w-full pl-9 pr-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="mt-4 bg-forest text-white px-6 py-2 rounded font-medium hover:bg-forest-light transition-colors flex items-center gap-2">
          <Search size={16} /> খুঁজুন
        </button>
      </form>

      {/* Results */}
      {searched && (
        <div>
          {foundOrders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-light-border">
              <AlertCircle size={48} className="mx-auto text-warm-gray mb-3" />
              <p className="text-warm-gray">কোনো অর্ডার পাওয়া যায়নি।</p>
              <p className="text-sm text-warm-gray mt-2">অর্ডার নম্বর বা ফোন নম্বর সঠিকভাবে দিন।</p>
            </div>
          ) : (
            <div className="space-y-6">
              {foundOrders.map(order => {
                const currentStep = order.orderStatus === 'cancelled' ? -1 : getStatusStep(order.orderStatus);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-lg border border-light-border"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-bold text-forest text-lg">{order.orderNumber}</p>
                        <p className="text-sm text-warm-gray">{new Date(order.createdAt).toLocaleDateString('bn-BD')}</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded font-medium ${
                        order.orderStatus === 'delivered' ? 'bg-forest/10 text-forest' :
                        order.orderStatus === 'cancelled' ? 'bg-terracotta/10 text-terracotta' :
                        'bg-mustard/10 text-earth'
                      }`}>
                        {statusLabels[order.orderStatus] || order.orderStatus}
                      </span>
                    </div>

                    {/* Progress Steps */}
                    {order.orderStatus !== 'cancelled' && (
                      <div className="flex items-center justify-between mb-6 relative">
                        <div className="absolute top-4 left-0 right-0 h-0.5 bg-light-border" />
                        <div
                          className="absolute top-4 left-0 h-0.5 bg-forest transition-all duration-500"
                          style={{ width: `${(currentStep / 4) * 100}%` }}
                        />
                        {['পেন্ডিং', 'নিশ্চিত', 'প্রস্তুতি', 'পাঠানো', 'ডেলিভারি'].map((label, idx) => (
                          <div key={idx} className="relative flex flex-col items-center z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              idx <= currentStep ? 'bg-forest text-white' : 'bg-cream text-warm-gray border border-light-border'
                            }`}>
                              {idx <= currentStep ? <CheckCircle size={16} /> : <Clock size={14} />}
                            </div>
                            <span className="text-[10px] mt-1 text-center text-warm-gray whitespace-nowrap">{label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Order Details */}
                    <div className="border-t border-light-border pt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-warm-gray">পণ্য</span>
                        <span>{order.items.length}টি আইটেম</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-warm-gray">মোট</span>
                        <span className="font-semibold">{formatPrice(order.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-warm-gray">পেমেন্ট</span>
                        <span>{order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : order.paymentMethod}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!searched && (
        <div className="text-center py-12">
          <Truck size={48} className="mx-auto text-warm-gray mb-3" />
          <p className="text-warm-gray">আপনার অর্ডারের অবস্থা জানতে উপরে খুঁজুন।</p>
        </div>
      )}
    </div>
  );
};
