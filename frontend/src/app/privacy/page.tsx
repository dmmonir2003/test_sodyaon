import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'গোপনীয়তা নীতি (Privacy Policy) | সদায়ন',
  description: 'সদায়োন ই-কমার্স প্ল্যাটফর্মের গোপনীয়তা নীতি এবং ডেটা সুরক্ষা নির্দেশিকা।',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
          গোপনীয়তা নীতি (Privacy Policy)
        </h1>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            সদায়োন (Sodayon) এ আপনার তথ্যের নিরাপত্তা এবং গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি সে সম্পর্কে নিচে বিস্তারিত আলোচনা করা হলো:
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">১. সংগৃহীত তথ্য</h2>
            <p>
              অর্ডার প্রক্রিয়াকরণ এবং উন্নত সেবা দেওয়ার জন্য আমরা নিম্নোক্ত তথ্যসমূহ সংগ্রহ করতে পারি:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>আপনার নাম, ইমেইল ঠিকানা, ফোন নম্বর এবং ডেলিভারি ঠিকানা।</li>
              <li>পেমেন্ট সম্পর্কিত প্রয়োজনীয় তথ্য (সুরক্ষিত এনক্রিপশনের মাধ্যমে)।</li>
              <li>ওয়েবসাইট ব্যবহারের অভিজ্ঞতা উন্নত করার জন্য কুকিজ (Cookies) ডাটা।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">২. তথ্যের ব্যবহার</h2>
            <p>
              আমরা আপনার তথ্য শুধুমাত্র নিম্নলিখিত কাজের জন্য ব্যবহার করে থাকি:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>অর্ডার প্রসেসিং এবং পণ্য যথাসময়ে আপনার ঠিকানায় পৌঁছানো।</li>
              <li>গ্রাহক সেবা ও সহায়তার সুবিধা প্রদান।</li>
              <li>নতুন অফার, ডিসকাউন্ট এবং আপডেট সম্পর্কিত বার্তা পাঠানো (যদি আপনি ইমেইল সাবস্ক্রাইব করে থাকেন)।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">৩. তথ্যের নিরাপত্তা</h2>
            <p>
              আপনার ডাটা এনক্রিপ্টেড SSL চ্যানেল ও সিকিউর সার্ভারের মাধ্যমে সংরক্ষিত হয়। তৃতীয় কোনো পক্ষের কাছে আপনার ব্যক্তিগত তথ্য বিক্রি বা হস্তান্তর করা হয় না।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">৪. যোগাযোগ</h2>
            <p>
              গোপনীয়তা নীতি সম্পর্কিত যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন: <span className="font-semibold text-primary-600">support@sodayon.com</span>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
