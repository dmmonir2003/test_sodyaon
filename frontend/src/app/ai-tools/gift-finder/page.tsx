"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Check, Bot, Gift } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

export default function AIGiftFinder() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  // Form State
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    setIsAnalyzing(true);
    // Simulate AI processing time
    setTimeout(() => {
      setIsAnalyzing(false);
      setResults(true);
    }, 2500);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary-100 text-secondary-600 dark:bg-secondary-900/30 dark:text-secondary-400 mb-6 shadow-sm">
            <Bot className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-heading text-slate-900 dark:text-white mb-4">এআই গিফট ফাইন্ডার</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            নিখুঁত খেলনা খুঁজে পেতে সমস্যা হচ্ছে? আমাদের এআইকে বাচ্চার সম্পর্কে কিছু তথ্য দিন, আর আমরা নিখুঁত উপহারের তালিকা তৈরি করে দেব তাত্ক্ষণিকভাবে।
          </p>
        </div>

        {/* Interactive Wizard */}
        {!results && !isAnalyzing && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 dark:border-slate-700">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-10 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 dark:bg-slate-700 -z-10"></div>
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-secondary-500 text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-400'}`}>
                  {step > num ? <Check className="w-5 h-5" /> : num}
                </div>
              ))}
            </div>

            {/* Step 1: Age */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">কার জন্য খেলনা খুঁজছি?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['০-২ বছর', '৩-৫ বছর', '৬-৮ বছর', '৯-১২ বছর', '১৩+ বছর'].map((ageOption) => (
                    <button 
                      key={ageOption}
                      onClick={() => setAge(ageOption)}
                      className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${age === ageOption ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-secondary-300'}`}
                    >
                      {ageOption}
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-end">
                  <button onClick={() => setStep(2)} disabled={!age} className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                    পরবর্তী ধাপ <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Gender */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">লিঙ্গ কী?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['ছেলে', 'মেয়ে', 'নিউট্রাল / নির্দিষ্ট নয়'].map((genderOption) => (
                    <button 
                      key={genderOption}
                      onClick={() => setGender(genderOption)}
                      className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${gender === genderOption ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-secondary-300'}`}
                    >
                      {genderOption}
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-between">
                  <button onClick={() => setStep(1)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors">পেছনে যান</button>
                  <button onClick={() => setStep(3)} disabled={!gender} className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                    পরবর্তী ধাপ <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">তাদের শখ কী? (৩টি পর্যন্ত বেছে নিন)</h3>
                <div className="flex flex-wrap gap-3">
                  {['সায়েন্স ও স্টেম', 'ডাইনোসর', 'আর্টস এবং ক্র্যাফটস', 'মিউজিক', 'বিল্ডিং', 'আউটডোর স্পোর্টস', 'গাড়ি এবং ট্রাক', 'অ্যানিমেলস', 'পাজলস', 'ম্যাজিক'].map((interest) => (
                    <button 
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`px-5 py-2.5 rounded-full border-2 text-sm font-bold transition-all ${interests.includes(interest) ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-secondary-300'}`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-between">
                  <button onClick={() => setStep(2)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors">পেছনে যান</button>
                  <button onClick={() => setStep(4)} disabled={interests.length === 0} className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
                    পরবর্তী ধাপ <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Budget */}
            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">আপনার বাজেট কত?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['২৫০০ টাকার নিচে', '২৫০০ থেকে ৫০০০ টাকা', '৫০০০ থেকে ১০০০০ টাকা', '১০০০০ টাকার উপরে'].map((budgetOption) => (
                    <button 
                      key={budgetOption}
                      onClick={() => setBudget(budgetOption)}
                      className={`p-4 rounded-xl border-2 text-center font-bold transition-all ${budget === budgetOption ? 'border-secondary-500 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-secondary-300'}`}
                    >
                      {budgetOption}
                    </button>
                  ))}
                </div>
                <div className="mt-10 flex justify-between">
                  <button onClick={() => setStep(3)} className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors">পেছনে যান</button>
                  <button onClick={handleGenerate} disabled={!budget} className="px-8 py-3 bg-secondary-500 text-white font-bold rounded-xl shadow-lg hover:bg-secondary-600 transition-colors disabled:opacity-50 flex items-center gap-2 group">
                    <Sparkles className="w-5 h-5 group-hover:animate-pulse" /> নিখুঁত উপহার খুঁজুন
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-16 shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 relative mb-8">
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-secondary-500 rounded-full border-t-transparent animate-spin"></div>
              <Bot className="absolute inset-0 m-auto w-8 h-8 text-secondary-500 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">প্রোফাইল অ্যানালাইজ করা হচ্ছে...</h3>
            <p className="text-slate-500">{age} বয়সী {gender} যে {interests.join(', ')} পছন্দ করে তার জন্য সেরা খেলনা খোঁজা হচ্ছে...</p>
          </div>
        )}

        {/* Results State */}
        {results && (
          <div className="animate-in slide-in-from-bottom-8 duration-700">
            <div className="bg-gradient-to-r from-secondary-500 to-primary-600 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
              <Sparkles className="absolute right-8 top-8 w-24 h-24 text-white/10" />
              <h2 className="text-2xl font-bold font-heading mb-2 flex items-center gap-2">
                <Gift className="w-6 h-6" /> পারফেক্ট ম্যাচ পাওয়া গেছে!
              </h2>
              <p className="text-white/80 max-w-xl">
                আমাদের সাইকোলজিকাল ডেটাবেস বিশ্লেষণ করে, {budget} বাজেটের মধ্যে {age} বছরের {gender} এর জন্য সেরা খেলনা নিচে দেওয়া হলো, যার শখ {interests.join(' এবং ')}।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard name="ইন্টারঅ্যাক্টিভ স্মার্ট রোবট" price="৳৮৯৯৯" img="bg-indigo-100" />
              <ProductCard name="ডাইনোসর ফসিল ডিগ কিট" price="৳২৪৯৯" img="bg-amber-100" />
              <ProductCard name="প্রোগ্রামেবল মিউজিক কীবোর্ড" price="৳৪৯৯৯" img="bg-purple-100" />
            </div>

            <div className="mt-12 text-center">
              <button onClick={() => { setResults(false); setStep(1); setAge(""); setInterests([]); setBudget(""); }} className="text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors underline underline-offset-4">
                নতুন করে শুরু করুন
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
