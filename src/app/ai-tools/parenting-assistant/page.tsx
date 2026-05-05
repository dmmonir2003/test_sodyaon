"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Menu, Search, MessageSquare, AlertCircle, X, Utensils, Moon, Heart } from "lucide-react";

const RECENT_ASSIST = [
  { 
    id: "safety", 
    label: "নিরাপত্তা", 
    icon: <AlertCircle className="w-4 h-4 text-rose-500" />,
    suggestions: [
      "বাচ্চাদের গলায় খেলনার টুকরো আটকে যাওয়ার ঝুঁকি এড়াতে নির্দেশিকাগুলো কী কী?",
      "ব্যাটারি চালিত খেলনার নিরাপত্তা টিপস দিন।",
      "খেলনা কেনার সময় কোন কোন সেফটি লোগো দেখা উচিত?"
    ]
  },
  { 
    id: "growth", 
    label: "বিকাশ", 
    icon: <Search className="w-4 h-4 text-blue-500" />,
    suggestions: [
      "২ বছর বয়সী শিশুর মানসিক ও শারীরিক বিকাশের মাইলফলকগুলো কী কী?",
      "শিশুর কথা বলা শেখার জন্য কোন ধরনের খেলনা সহায়ক?",
      "৫ বছর বয়সীদের জন্য সেরা লজিক্যাল গেম কোনগুলো?"
    ]
  },
  { 
    id: "play", 
    label: "খেলাধুলা", 
    icon: <MessageSquare className="w-4 h-4 text-emerald-500" />,
    suggestions: [
      "বৃষ্টির দিনে ঘরের ভিতরে করার মতো ৫টি মজার কাজের আইডিয়া দিন।",
      "অ্যাকশন ফিগার দিয়ে খেলার মাধ্যমে সৃজনশীলতা কীভাবে বাড়ে?",
      "বাচ্চাদের জন্য আউটডোর গেমসের প্রয়োজনীয়তা কী?"
    ]
  },
  { 
    id: "food", 
    label: "খাবার", 
    icon: <Utensils className="w-4 h-4 text-orange-500" />,
    suggestions: [
      "বাচ্চাদের পুষ্টিকর টিফিন আইডিয়া দিন।",
      "সকালের নাস্তায় কী কী স্বাস্থ্যকর খাবার দেওয়া যায়?",
      "বাচ্চাদের সবজি খেতে উৎসাহিত করার উপায় কী?"
    ]
  },
  { 
    id: "sleep", 
    label: "ঘুম", 
    icon: <Moon className="w-4 h-4 text-indigo-500" />,
    suggestions: [
      "বাচ্চাদের সঠিক ঘুমের রুটিন কীভাবে তৈরি করব?",
      "রাতে ঘুমানোর আগে কী ধরনের বই পড়া ভালো?",
      "শিশুর পর্যাপ্ত ঘুম নিশ্চিত করার টিপস দিন।"
    ]
  },
  { 
    id: "behavior", 
    label: "আচরণ", 
    icon: <Heart className="w-4 h-4 text-pink-500" />,
    suggestions: [
      "বাচ্চাদের জেদ কমানোর কৌশল কী কী?",
      "শিশুদের মধ্যে শেয়ার করার মানসিকতা কীভাবে তৈরি করব?",
      "পজিটিভ প্যারেন্টিং এর মূল বিষয়গুলো কী?"
    ]
  }
];

export default function ParentingAssistant() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "হ্যালো! আমি আপনার সদায়ন প্যারেন্টিং অ্যাসিস্ট্যান্ট। আমি খেলনার নিরাপত্তা নির্দেশিকা, বাচ্চাদের বিকাশ এবং বৃষ্টির দিনে ঘরে খেলার মজার আইডিয়া দিতে সাহায্য করতে পারি। আজ আপনাকে কীভাবে সাহায্য করতে পারি?" }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [activeRecentTopic, setActiveRecentTopic] = useState(RECENT_ASSIST[0]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: messageText }]);
    setInput("");
    setIsTyping(true);
    setIsRightDrawerOpen(false);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "খুব সুন্দর একটি প্রশ্ন করেছেন! পেডিয়াট্রিক নির্দেশিকা অনুসারে, এই বয়সের বাচ্চাদের বিকাশের জন্য সঠিক খেলনা নির্বাচন অত্যন্ত গুরুত্বপূর্ণ। আমাদের ক্যাটালগে এই টপিক সংক্রান্ত বেশ কিছু নিরাপদ এবং শিক্ষামূলক খেলনা রয়েছে। আপনি কি সেগুলো দেখতে চান?" 
      }]);
    }, 1500);
  };

  const handleRecentClick = (topic: typeof RECENT_ASSIST[0]) => {
    setActiveRecentTopic(topic);
    // On mobile, open right drawer. On desktop, sidebar stays as is.
    if (window.innerWidth < 768) {
      setIsRightDrawerOpen(true);
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] h-[calc(100dvh-80px)] bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 overflow-hidden relative">
      
      {/* Left Sidebar (Desktop Only) */}
      <div className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary-500" /> অ্যাসিস্ট্যান্ট
          </h2>
        </div>
        
        <div className="p-4 h-[calc(100%-65px)] overflow-y-auto md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]">
          <button onClick={() => setMessages([messages[0]])} className="w-full py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold rounded-lg border border-primary-100 dark:border-primary-800 mb-6 hover:bg-primary-100 transition-colors flex justify-center items-center gap-2">
            <MessageSquare className="w-4 h-4" /> নতুন চ্যাট
          </button>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">সম্প্রতি সাহায্য করা হয়েছে</h3>
          <div className="space-y-1 mb-6">
            {RECENT_ASSIST.map((topic) => (
              <button 
                key={topic.id}
                onClick={() => handleRecentClick(topic)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-colors ${activeRecentTopic.id === topic.id ? 'bg-slate-100 dark:bg-slate-700/50 text-primary-600 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30'}`}
              >
                <div className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm">{topic.icon}</div>
                <span className="text-sm">{topic.label}</span>
              </button>
            ))}
          </div>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">সাজেস্ট করা টপিক</h3>
          <ul className="space-y-2">
            {activeRecentTopic.suggestions.map((s, i) => (
              <TopicButton key={i} icon={activeRecentTopic.icon} text={s} onClick={() => handleSend(s)} />
            ))}
          </ul>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-900 relative">
        {/* Chat Header */}
        <div className="h-14 md:h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center px-4 shrink-0 relative z-10">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm md:text-base">
             সদায়ন প্যারেন্টিং অ্যাসিস্ট্যান্ট <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-[10px] md:text-xs rounded-full">ভিটা</span>
          </h2>
        </div>

        {/* Message Stream */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-3 md:p-6 pb-48 md:pb-6 space-y-4 md:space-y-6 scroll-smooth md:[&::-webkit-scrollbar]:hidden md:[-ms-overflow-style:none] md:[scrollbar-width:none]"
        >
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5" />}
                </div>
                <div className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-4 py-2.5 md:px-6 md:py-4 shadow-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}>
                  <p className="leading-relaxed text-sm md:text-base">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
               <div className="flex gap-3 md:gap-4">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                 <Bot className="w-4 h-4 md:w-5 md:h-5" />
               </div>
               <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none px-4 py-3 md:px-6 md:py-4 shadow-sm max-w-max flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400 animate-bounce"></div>
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
             </div>
            )}
          </div>
        </div>

        {/* Mobile Fixed Footer (pinned above site nav) / Desktop Flow Footer */}
        <div className="fixed bottom-[80px] left-0 right-0 md:relative md:bottom-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shrink-0 z-20 pb-4 md:pb-4">
          {/* Mobile Recently Assist Chips */}
          <div className="md:hidden flex w-full overflow-x-auto gap-2 p-3 scroll-smooth [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {RECENT_ASSIST.map((topic) => (
              <button 
                key={topic.id}
                onClick={() => handleRecentClick(topic)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all whitespace-nowrap shadow-sm ${activeRecentTopic.id === topic.id ? 'bg-primary-600 text-white border-primary-600' : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'}`}
              >
                {topic.label}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="px-3 md:px-4 max-w-3xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center group w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="আমাকে জিজ্ঞাসা করুন..."
                className="w-full pl-4 md:pl-6 pr-10 md:pr-14 py-3 md:py-4 rounded-full border md:border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-2 md:focus:ring-4 focus:ring-primary-50 transition-all outline-none text-sm md:text-base text-slate-800 dark:text-slate-200 shadow-sm"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="absolute right-1 md:right-1.5 p-2 md:p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
              </button>
            </form>
            <p className="text-center text-[10px] md:text-xs text-slate-400 mt-2">
              এটি এআই পরামর্শ। শিশু বিশেষজ্ঞের মতামত নিন।
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Right Drawer (Suggestions) - Positioned between bars */}
      <div className={`fixed top-[80px] bottom-[80px] inset-x-0 z-40 md:hidden transition-all duration-300 ${isRightDrawerOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity duration-300 ${isRightDrawerOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsRightDrawerOpen(false)} />
        <div className={`absolute inset-y-0 right-0 w-80 bg-white dark:bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-out ${isRightDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 pt-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg">{activeRecentTopic.icon}</div>
              <h2 className="font-bold text-slate-900 dark:text-white text-sm md:text-base">{activeRecentTopic.label} সংক্রান্ত সাজেস্ট</h2>
            </div>
            <button onClick={() => setIsRightDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
          </div>
          <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-65px)]">
             <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">সাজেস্ট করা টপিক</h3>
             {activeRecentTopic.suggestions.map((s, i) => (
                <button 
                  key={i} 
                  onClick={() => handleSend(s)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-700/30 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-slate-700 dark:text-slate-200 text-sm text-left rounded-xl border border-slate-200 dark:border-slate-600 transition-all active:scale-95"
                >
                  {s}
                </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicButton({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) {
  return (
    <li>
      <button onClick={onClick} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-sm text-left transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
        <div className="p-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
          {icon}
        </div>
        <span className="font-medium truncate">{text}</span>
      </button>
    </li>
  );
}
