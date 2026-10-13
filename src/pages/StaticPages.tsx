import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { storeSettings } from '../data';

// === ABOUT PAGE ===
export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-3xl font-bold text-forest mb-6">আমাদের কথা</h1>
      <div className="prose max-w-none text-charcoal/80 space-y-4">
        <p className="text-lg">
          কারুকথা — বাংলার হস্তশিল্পের গল্প বলার একটি প্ল্যাটফর্ম। আমরা বিশ্বাস করি প্রতিটি হাতে তৈরি পণ্যের পেছনে একটি গল্প আছে — কারিগরের নিপুণ হাতের, প্রজন্মের পর প্রজন্ম ধরে চলে আসা ঐতিহ্যের, এবং প্রাকৃতিক উপকরণের সাথে মানুষের গভীর সম্পর্কের।
        </p>
        <h2 className="text-xl font-bold text-forest mt-8">আমাদের লক্ষ্য</h2>
        <p>
          বাংলাদেশের বিভিন্ন প্রান্তের প্রতিভাবান কারিগরদের হাতে তৈরি পণ্যগুলোকে সঠিক মূল্যে, সঠিক মানের সাথে, সারা বাংলাদেশের ক্রেতাদের কাছে পৌঁছে দেওয়া। আমরা চাই প্রতিটি হস্তশিল্প তার যথাযথ মর্যাদা পাক।
        </p>
        <h2 className="text-xl font-bold text-forest mt-8">আমরা কী করি</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>বাংলাদেশের বিভিন্ন অঞ্চলের কারিগরদের সাথে কাজ করি</li>
          <li>প্রাকৃতিক ও পরিবেশবান্ধব উপকরণ ব্যবহার করি</li>
          <li>প্রতিটি পণ্যের গুণগত মান নিশ্চিত করি</li>
          <li>ন্যায্য মূল্যে পণ্য সরবরাহ করি</li>
          <li>ঐতিহ্যবাহী শিল্পের সংরক্ষণ ও প্রচার করি</li>
        </ul>
        <h2 className="text-xl font-bold text-forest mt-8">আমাদের পণ্যসমূহ</h2>
        <p>
          বাঁশ ও বেত শিল্প, টেরাকোটা ও মৃৎশিল্প, পাট শিল্প, নকশি কাঁথা, শীতলপাটি, ক্রোশিয়া, কাঠের শিল্পকর্ম এবং হাতে তৈরি কাগজের পণ্য — এই সব ক্যাটাগরিতে আমরা অনন্য সব হস্তশিল্প সংগ্রহ করি।
        </p>
        <div className="bg-cream p-6 rounded-lg mt-8">
          <p className="text-sm text-charcoal/70">
            <strong>যোগাযোগ:</strong> আমাদের সাথে যোগাযোগ করতে ইমেইল বা ফোনে কল করুন। আমরা শিঘ্রই আপনার প্রশ্নের উত্তর দেব।
          </p>
        </div>
      </div>
    </motion.div>
  </div>
);

// === CONTACT PAGE ===
export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-forest mb-6">যোগাযোগ</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">আমাদের সাথে কথা বলুন</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail size={20} className="text-forest mt-0.5" />
              <div>
                <p className="font-medium">ইমেইল</p>
                <p className="text-warm-gray text-sm">{storeSettings.contactEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={20} className="text-forest mt-0.5" />
              <div>
                <p className="font-medium">ফোন</p>
                <p className="text-warm-gray text-sm">{storeSettings.contactPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-forest mt-0.5" />
              <div>
                <p className="font-medium">ঠিকানা</p>
                <p className="text-warm-gray text-sm">ঢাকা, বাংলাদেশ</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={20} className="text-forest mt-0.5" />
              <div>
                <p className="font-medium">কার্যদিবস</p>
                <p className="text-warm-gray text-sm">শনি-বৃহস্পতি, সকাল ১০টা — রাত ৮টা</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">বার্তা পাঠান</h2>
          {sent ? (
            <div className="bg-forest/5 border border-forest/20 p-6 rounded-lg text-center">
              <p className="text-forest font-medium">ধন্যবাদ! আপনার বার্তা পাঠানো হয়েছে।</p>
              <p className="text-sm text-warm-gray mt-2">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">নাম</label>
                <input type="text" required className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">ইমেইল</label>
                <input type="email" required className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">বিষয়</label>
                <input type="text" className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">বার্তা</label>
                <textarea rows={4} required className="w-full px-3 py-2 border border-light-border rounded focus:outline-none focus:border-forest" />
              </div>
              <button type="submit" className="bg-forest text-white px-6 py-3 rounded font-medium hover:bg-forest-light transition-colors">
                পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// === FAQ PAGE ===
export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'ডেলিভারি কত দিনে পাবো?', a: 'ঢাকা সিটির মধ্যে ২-৩ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি করা হয়।' },
    { q: 'পেমেন্ট কিভাবে করব?', a: 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং অনলাইন পেমেন্ট (SSLCommerz) — এই সব পদ্ধতিতে পেমেন্ট করতে পারবেন।' },
    { q: 'রিটার্ন পলিসি কী?', a: 'পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন। পণ্য অবশ্যই অব্যবহৃত ও মূল প্যাকেজিংয়ে থাকতে হবে।' },
    { q: 'পণ্য কি আসলেই হাতে তৈরি?', a: 'হ্যাঁ, আমাদের সকল পণ্য বাংলাদেশের কারিগরদের দ্বারা হাতে তৈরি। প্রতিটি পণ্য অনন্য।' },
    { q: 'ডেলিভারি চার্জ কত?', a: 'ঢাকা সিটিতে ৬০ টাকা, ঢাকা বিভাগে ১০০ টাকা এবং অন্যান্য বিভাগে ১৩০ টাকা।' },
    { q: 'কুপন কোড কিভাবে ব্যবহার করব?', a: 'চেকআউট পেজে "কুপন কোড" ঘরে কোডটি লিখে "প্রয়োগ" বাটনে ক্লিক করুন।' },
    { q: 'অর্ডার ট্র্যাক কিভাবে করব?', a: 'আপনার অ্যাকাউন্টে লগইন করে "অর্ডার ইতিহাস" থেকে অর্ডারের বর্তমান অবস্থা দেখতে পারবেন।' },
    { q: 'পণ্যের মূল্য কি আলোচনাযোগ্য?', a: 'না, আমাদের মূল্য নির্ধারিত। তবে নিয়মিত অফার ও ডিসকাউন্ট চালু থাকে।' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-forest mb-6">প্রশ্নোত্তর</h1>
      <div className="space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-light-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-cream transition-colors"
            >
              <span className="font-medium text-sm">{faq.q}</span>
              <ChevronDown size={18} className={`transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                <p className="px-4 pb-3 text-sm text-charcoal/70">{faq.a}</p>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// === POLICY PAGES ===
export const ShippingPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 prose max-w-none">
    <h1 className="text-3xl font-bold text-forest mb-6">শিপিং ও ডেলিভারি নীতি</h1>
    <div className="space-y-4 text-charcoal/80">
      <h2 className="text-xl font-semibold text-forest">ডেলিভারি সময়</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>ঢাকা সিটি: ২-৩ কার্যদিবস</li>
        <li>ঢাকা বিভাগ (সিটি ছাড়া): ৩-৪ কার্যদিবস</li>
        <li>অন্যান্য বিভাগ: ৪-৫ কার্যদিবস</li>
      </ul>
      <h2 className="text-xl font-semibold text-forest">ডেলিভারি চার্জ</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>ঢাকা সিটি: ৳৬০</li>
        <li>ঢাকা বিভাগ: ৳১০০</li>
        <li>অন্যান্য বিভাগ: ৳১৩০</li>
      </ul>
      <h2 className="text-xl font-semibold text-forest">গুরুত্বপূর্ণ তথ্য</h2>
      <p>ডেলিভারির সময় গ্রাহককে ফোনে যোগাযোগ করা হবে। ৩ বার চেষ্টার পরও পাওয়া না গেলে অর্ডার বাতিল বলে গণ্য হবে।</p>
    </div>
  </div>
);

export const ReturnsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 prose max-w-none">
    <h1 className="text-3xl font-bold text-forest mb-6">রিটার্ন, এক্সচেঞ্জ ও রিফান্ড নীতি</h1>
    <div className="space-y-4 text-charcoal/80">
      <h2 className="text-xl font-semibold text-forest">রিটার্ন শর্ত</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে রিটার্ন করতে হবে</li>
        <li>পণ্য অবশ্যই অব্যবহৃত ও মূল প্যাকেজিংয়ে থাকতে হবে</li>
        <li>হস্তশিল্প পণ্যের ক্ষেত্রে সামান্য ভিন্নতা স্বাভাবিক — এটি রিটার্নের কারণ নয়</li>
      </ul>
      <h2 className="text-xl font-semibold text-forest">রিফান্ড প্রক্রিয়া</h2>
      <p>রিটার্ন গ্রহণের পর ৫-৭ কার্যদিবসের মধ্যে রিফান্ড প্রক্রিয়া সম্পন্ন হবে। ক্যাশ অন ডেলিভারি অর্ডারের ক্ষেত্রে বিকাশ/নগদে রিফান্ড করা হবে।</p>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 prose max-w-none">
    <h1 className="text-3xl font-bold text-forest mb-6">গোপনীয়তা নীতি</h1>
    <div className="space-y-4 text-charcoal/80">
      <p>আমরা আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ।</p>
      <h2 className="text-xl font-semibold text-forest">কোন তথ্য সংগ্রহ করি</h2>
      <p>অর্ডার প্রসেসিংয়ের জন্য নাম, ফোন নম্বর, ডেলিভারি ঠিকানা এবং ইমেইল (ঐচ্ছিক) সংগ্রহ করি।</p>
      <h2 className="text-xl font-semibold text-forest">কিভাবে ব্যবহার করি</h2>
      <p>আপনার তথ্য শুধুমাত্র অর্ডার প্রসেসিং, ডেলিভারি এবং যোগাযোগের জন্য ব্যবহৃত হয়।</p>
      <h2 className="text-xl font-semibold text-forest">তথ্য সুরক্ষা</h2>
      <p>আমরা আপনার তথ্য তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12 prose max-w-none">
    <h1 className="text-3xl font-bold text-forest mb-6">শর্তাবলী</h1>
    <div className="space-y-4 text-charcoal/80">
      <p>কারুকথা ওয়েবসাইট ব্যবহার করে আপনি নিম্নলিখিত শর্তাবলী মেনে নিচ্ছেন।</p>
      <h2 className="text-xl font-semibold text-forest">পণ্যের তথ্য</h2>
      <p>সকল পণ্য হাতে তৈরি হওয়ায় রঙ, আকার বা ডিজাইনে সামান্য ভিন্নতা থাকতে পারে। এটি হস্তশিল্পের বৈশিষ্ট্য।</p>
      <h2 className="text-xl font-semibold text-forest">মূল্য</h2>
      <p>সকল মূল্য বাংলাদেশি টাকায় (BDT)। মূল্য পরিবর্তনের অধিকার সংরক্ষিত।</p>
      <h2 className="text-xl font-semibold text-forest">অর্ডার বাতিল</h2>
      <p>শিপিং শুরু হওয়ার আগে পর্যন্ত অর্ডার বাতিল করা যায়।</p>
    </div>
  </div>
);
