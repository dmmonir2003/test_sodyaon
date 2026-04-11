"use client";

import { useState } from "react";
import { Search, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Zap, Plus, X, ArrowRight } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";

export default function ToyComparisonPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedToys, setSelectedToys] = useState<any[]>([
    { id: 1, name: "ইন্টারঅ্যাক্টিভ স্মার্ট রোবট", price: "৳৮৯৯৯", img: "bg-indigo-100", category: "স্টেম" },
  ]);
  const [isComparing, setIsComparing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const mockInventory = [
    { id: 2, name: "প্রোগ্রামেবল মিউজিক কীবোর্ড", price: "৳৪৯৯৯", img: "bg-purple-100", category: "আর্টস" },
    { id: 3, name: "ডাইনোসর ফসিল ডিগ কিট", price: "৳২৪৯৯", img: "bg-amber-100", category: "বিজ্ঞান" },
    { id: 4, name: "ম্যাগনা-টাইলস ১০০-পিস", price: "৳১১৯৯৯", img: "bg-blue-100", category: "বিল্ডিং" },
  ];

  const handleSelectToy = (toy: any) => {
    if (selectedToys.length < 3 && !selectedToys.find(t => t.id === toy.id)) {
      setSelectedToys([...selectedToys, toy]);
      setSearchQuery("");
      setResults(null); 
    }
  };

  const handleRemoveToy = (id: number) => {
    setSelectedToys(selectedToys.filter(t => t.id !== id));
    setResults(null);
  };

  const handleCompare = () => {
    if (selectedToys.length < 2) return;
    
    setIsComparing(true);
    // Simulate AI loading delay
    setTimeout(() => {
      setIsComparing(false);
      setResults(true); // Normally we'd set an object with actual comparison data
    }, 2000);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-32">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900 via-primary-900 to-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-primary-200 font-bold text-sm mb-6">
            <Sparkles className="w-4 h-4" /> স্মার্ট প্যারেন্টিংকে শক্তিশালী করা
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-6">
            এআই টয় <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">কম্পারিজন</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            দুটি উপহারের মধ্যে কোনটি নেবেন বুঝতে পারছেন না? আমাদের এআইকে ৩টি পর্যন্ত খেলনার শিক্ষাগত মান, খেলনার মেয়াদ এবং স্থায়িত্ব বিশ্লেষণ করতে দিন।
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* Selection Area */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
             <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-3">
               তুলনা করার জন্য খেলনা বেছে নিন <span className="text-sm font-medium px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500">{selectedToys.length} / ৩</span>
             </h2>
             <button 
                onClick={handleCompare}
                disabled={selectedToys.length < 2 || isComparing}
                className={`px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 ${selectedToys.length >= 2 ? 'bg-primary-600 hover:bg-primary-500 shadow-primary-500/30' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500'}`}
             >
               {isComparing ? (
                 <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> এআই অ্যানালাইসিস হচ্ছে...</>
               ) : (
                 <><Zap className="w-5 h-5 fill-current" /> এআই অ্যানালাইসিস চালান</>
               )}
             </button>
          </div>

          {/* Selected Toys Tray */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Render slots */}
            {[0, 1, 2].map((index) => {
              const toy = selectedToys[index];
              return (
                <div key={index} className="relative group h-[300px]">
                  {toy ? (
                    <div className="h-full w-full relative">
                      <ProductCard name={toy.name} price={toy.price} img={toy.img} />
                      <button 
                        onClick={() => handleRemoveToy(toy.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-slate-900 text-slate-400 hover:text-red-500 rounded-full flex items-center justify-center shadow-md transition-colors"
                      >
                         <X className="w-4 h-4 cursor-pointer" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-full w-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/50">
                       <Plus className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                       <span className="text-slate-400 font-medium">খালি স্লট</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search Bar for adding toys */}
          {selectedToys.length < 3 && (
            <div className="relative max-w-2xl mx-auto border-t border-slate-100 dark:border-slate-700 pt-8 mt-4">
               <div className="relative z-20">
                 <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                 <input 
                   type="text"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="তুলনা করার জন্য আরেকটি খেলনা খুঁজুন..."
                   className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary-400 outline-none transition-colors dark:text-white"
                 />
               </div>
               
               {/* Search Results Dropdown Matrix */}
               {searchQuery.length > 0 && (
                 <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 mt-2 z-30 overflow-hidden transform animate-in fade-in slide-in-from-top-4">
                    {mockInventory.map(toy => (
                       <div key={toy.id} 
                            onClick={() => handleSelectToy(toy)}
                            className="flex items-center gap-4 p-4 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                       >
                         <div className={`w-12 h-12 rounded-lg ${toy.img}`}></div>
                         <div className="flex-1">
                           <h4 className="font-bold text-slate-800 dark:text-white text-sm">{toy.name}</h4>
                           <span className="text-xs text-slate-400">{toy.category}</span>
                         </div>
                         <div className="text-sm font-bold text-slate-800 dark:text-white">{toy.price}</div>
                       </div>
                    ))}
                 </div>
               )}
            </div>
          )}

        </div>

        {/* AI Results Table */}
        {results && (
          <div className="mt-16 animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-primary-500" />
              <h2 className="text-3xl md:text-4xl font-black font-heading text-slate-900 dark:text-white">এআই অ্যানালাইসিস সম্পন্ন</h2>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/50 w-1/4 border-b border-slate-100 dark:border-slate-700"></th>
                      {selectedToys.map(toy => (
                        <th key={toy.id} className="p-6 md:p-8 border-l border-b border-slate-100 dark:border-slate-700 w-1/4 align-bottom bg-slate-50 dark:bg-slate-900/50">
                           <div className={`w-16 h-16 rounded-xl ${toy.img} mb-4 shadow-sm`}></div>
                           <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2">{toy.name}</h3>
                           <span className="text-primary-600 dark:text-primary-400 font-black">{toy.price}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="group">
                      <td className="p-6 px-8 font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 transition-colors">শিক্ষাগত মান</td>
                      {selectedToys.map((toy, i) => (
                        <td key={toy.id} className="p-6 border-l border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 text-slate-700 dark:text-slate-300">
                          {i === 0 ? "প্রোগ্রামিং লজিক এবং সিকোয়েন্সের উপর দারুণ ফোকাস।" : "স্থানিক সচেতনতা এবং জ্যামিতিক চিন্তাভাবনাকে উৎসাহিত করে।"}
                        </td>
                      ))}
                    </tr>
                    <tr className="group">
                      <td className="p-6 px-8 font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 transition-colors">খেলার সময়কাল</td>
                      {selectedToys.map((toy, i) => (
                        <td key={toy.id} className="p-6 border-l border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30">
                          <div className="flex items-center gap-2">
                             <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${i === 0 ? 'w-[75%] bg-blue-500' : 'w-[95%] bg-emerald-500'}`}></div>
                             </div>
                             <span className="text-xs font-bold text-slate-500">{i === 0 ? '৩-৪ বছর' : '৫+ বছর'}</span>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr className="group">
                      <td className="p-6 px-8 font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 transition-colors">যাদের জন্য সেরা</td>
                      {selectedToys.map((toy, i) => (
                        <td key={toy.id} className="p-6 border-l border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                             <CheckCircle2 className="w-3 h-3" /> {i === 0 ? 'প্রযুক্তি-প্রেমী শিশু' : 'সৃজনশীল বিল্ডার'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="group">
                      <td className="p-6 px-8 font-bold text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 transition-colors">এআই এর মতামত</td>
                      {selectedToys.map((toy, i) => (
                        <td key={toy.id} className={`p-6 border-l border-b border-slate-100 dark:border-slate-700 group-hover:bg-slate-50 dark:group-hover:bg-slate-900/30 ${i===1 && selectedToys.length > 1 ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                          {i === 1 && selectedToys.length > 1 ? (
                            <div>
                               <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold mb-2">
                                 <ShieldCheck className="w-5 h-5" /> এআই অনুমোদিত
                               </div>
                               <p className="text-sm text-slate-600 dark:text-slate-400">উচ্চতর স্থায়িত্ব এবং ওপেন-এন্ডেড প্লে ভ্যালু একে দীর্ঘমেয়াদী খেলার জন্য সেরা করে তোলে।</p>
                               <button className="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors">এটি বেছে নিন</button>
                            </div>
                          ) : (
                            <div>
                               <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">দারুণ বিশেষায়িত উপহার, তবে শিশুর বড় হওয়ার সাথে সাথে এর খেলার মেয়াদ কম হতে পারে।</p>
                               <button className="w-full py-2 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 transition-colors">এটি বেছে নিন</button>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
