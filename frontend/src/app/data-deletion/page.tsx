import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'ইউজার ডেটা মুছে ফেলার নির্দেশিকা (User Data Deletion Instructions) | সদায়ন',
  description: 'সদায়োন ই-কমার্স প্ল্যাটফর্মের ফেসবুক ও গুগল ইউজার ডেটা মুছে ফেলার নিয়ম ও নির্দেশিকা।',
};

export default function DataDeletionPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">
          ইউজার ডেটা মুছে ফেলার নির্দেশিকা (User Data Deletion Instructions)
        </h1>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Sodayon app respects your privacy and is committed to protecting your personal information. According to Meta (Facebook) Platform rules and Privacy Policies, users have the right to request the deletion of their personal data associated with our application.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">1. How to Delete Your Facebook Account Data (মেটা/ফেসবুক ডেটা মোছার নিয়ম)</h2>
            <p>
              If you want to remove your Sodayon activities and login authorization from Facebook:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in to your <strong>Facebook Account</strong>.</li>
              <li>Go to <strong>Settings &amp; Privacy</strong> &gt; <strong>Settings</strong>.</li>
              <li>Look for <strong>Apps and Websites</strong> on the left side menu.</li>
              <li>Search for <strong>Sodayon</strong> in the list of active apps.</li>
              <li>Click <strong>Remove</strong> next to Sodayon.</li>
              <li>Optionally check the box to delete all posts, videos, or events Sodayon posted on your timeline on your behalf.</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">2. Request Manual Data Deletion from Sodayon (সরাসরি অনুরোধ জানানোর উপায়)</h2>
            <p>
              If you wish to permanently delete your account profile, order history, address records, and associated user data from our databases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Send an email from your registered email address to: <span className="font-semibold text-primary-600">sodayonbd@gmail.com</span>
              </li>
              <li>Subject line: <strong>Request to Delete Personal Data - Sodayon Account</strong></li>
              <li>Include your full name and registered phone number or email address.</li>
            </ul>
            <p className="text-sm text-slate-600 bg-slate-100 p-4 rounded-xl">
              ⚡ Our technical support team will process your request and permanently delete all your personal records from our servers within <strong>48 hours</strong>, sending you a confirmation email upon completion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900">3. Contact Us (যোগাযোগ)</h2>
            <p>
              If you have any questions regarding data deletion or privacy compliance:
            </p>
            <p className="font-semibold text-slate-800">
              Email: <span className="text-primary-600">sodayonbd@gmail.com</span> / <span className="text-primary-600">support@sodayon.com</span><br />
              Website: <Link href="/" className="text-primary-600 underline">https://sodayon.com</Link>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; হোম পেজে ফিরে যান
          </Link>
          <Link href="/privacy" className="text-slate-600 hover:text-slate-900 font-medium">
            গোপনীয়তা নীতি (Privacy Policy)
          </Link>
        </div>
      </div>
    </div>
  );
}
