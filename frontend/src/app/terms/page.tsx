import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'পরিষেবার শর্তাবলী (Terms of Service) | সদায়ন',
  description: 'সদায়োন ই-কমার্স প্ল্যাটফর্মের ব্যবহারের জন্য পরিষেবার শর্তাবলী।',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
          পরিষেবার শর্তাবলী (Terms of Service)
        </h1>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            সদায়োন (Sodayon) ওয়েবসাইট ব্যবহার করার জন্য আপনাকে স্বাগতম। এই ওয়েবসাইট ব্যবহার বা এখান থেকে পণ্য ক্রয়ের মাধ্যমে আপনি নিচের শর্তাবলীতে সম্মত হচ্ছেন:
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">১. সাধারণ শর্তাবলী</h2>
            <p>
              সদায়োন যেকোনো সময় এই শর্তাবলী পরিবর্তন বা পরিমার্জন করার অধিকার সংরক্ষণ করে। গ্রাহকদের নিয়মিত এই পেজ পরিদর্শনের অনুরোধ করা হচ্ছে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">২. অর্ডার এবং মূল্য নির্ধারণ</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>ওয়েবসাইটে প্রকাশিত সকল পণ্যের মূল্য বাংলাদেশ টাকায় (BDT) প্রদর্শিত।</li>
              <li>পণ্য স্টকে থাকা সাপেক্ষে অর্ডার নিশ্চিত করা হয়। কোনো কারণে পণ্য সরবরাহে অক্ষম হলে আমরা আপনাকে অবগত করব।</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">৩. ডেলিভারি ও রিটার্ন</h2>
            <p>
              আমরা ঢাকার মধ্যে ১-২ দিন এবং ঢাকার বাইরে ২-৪ দিনের মধ্যে ডেলিভারি সম্পন্ন করার চেষ্টা করি। ক্ষতিগ্রস্ত বা ভুল পণ্য প্রাপ্ত হলে ২৪ ঘণ্টার মধ্যে আমাদের সাপোর্ট টিমে যোগাযোগ করতে হবে।
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">৪. বুদ্ধিবৃত্তিক সম্পদ</h2>
            <p>
              ওয়েবসাইটের সকল কন্টেন্ট, লোগো, গ্রাফিক্স এবং টেক্সট সদায়োন-এর নিজস্ব সম্পদ এবং অনুমোদিত ব্যবহার ছাড়া কপি করা নিষিদ্ধ।
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
