import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'সাইটম্যাপ (Sitemap) | সদায়ন',
  description: 'সদায়োন ই-কমার্স প্ল্যাটফর্মের সকল পেজ এবং ক্যাটাগরি ডিরেক্টরি।',
};

export default function SitemapPage() {
  const sections = [
    {
      title: 'প্রধান পেজসমূহ',
      links: [
        { label: 'হোম পেজ', url: '/' },
        { label: 'সকল পণ্য', url: '/shop' },
        { label: 'ফ্ল্যাশ ডিল', url: '/deals' },
        { label: 'কম্বো অফার', url: '/combo' },
        { label: 'ব্লগ', url: '/blog' },
      ],
    },
    {
      title: 'ক্যাটাগরি ও শপ',
      links: [
        { label: 'শিশু খাবার', url: '/shop/baby-food' },
        { label: 'শিশু ব্যাগ', url: '/shop/baby-bags' },
        { label: 'ডায়াপার', url: '/shop/diapers' },
        { label: 'শিশু পোশাক', url: '/shop/baby-clothes' },
        { label: 'শিশু যত্ন পণ্য', url: '/shop/baby-care' },
      ],
    },
    {
      title: 'এআই টুলস',
      links: [
        { label: 'এআই গিফট ফাইন্ডার', url: '/ai-tools/gift-finder' },
        { label: 'প্যারেন্টিং অ্যাসিস্ট্যান্ট', url: '/ai-tools/parenting-assistant' },
        { label: 'প্রোডাক্ট তুলনা', url: '/ai-tools/compare' },
      ],
    },
    {
      title: 'গ্রাহক তথ্য ও নীতি',
      links: [
        { label: 'আমার অ্যাকাউন্ট', url: '/profile' },
        { label: 'অর্ডার ট্র্যাক করুন', url: '/track-order' },
        { label: 'গোপনীয়তা নীতি', url: '/privacy' },
        { label: 'পরিষেবার শর্তাবলী', url: '/terms' },
        { label: 'XML সাইটম্যাপ', url: '/sitemap.xml' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
          সাইটম্যাপ (Sitemap)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-lg font-semibold text-primary-600 border-b border-slate-100 pb-2">
                {sec.title}
              </h2>
              <ul className="space-y-2 text-slate-700">
                {sec.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.url} className="hover:text-primary-600 transition-colors">
                      • {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
