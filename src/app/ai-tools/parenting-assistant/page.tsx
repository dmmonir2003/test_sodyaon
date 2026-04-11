"use client";

import { useState } from "react";
import { Send, Bot, User, Menu, Search, MessageSquare, AlertCircle, X } from "lucide-react";

export default function ParentingAssistant() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "ai", text: "হ্যালো! আমি আপনার প্লেটাইম প্যারেন্টিং অ্যাসিস্ট্যান্ট। আমি খেলনার নিরাপত্তা নির্দেশিকা, বাচ্চাদের বিকাশ এবং বৃষ্টির দিনে ঘরে খেলার মজার আইডিয়া দিতে সাহায্য করতে পারি। আজ আপনাকে কীভাবে সাহায্য করতে পারি?" }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: "খুব সুন্দর একটি প্রশ্ন করেছেন! পেডিয়াট্রিক নির্দেশিকা অনুসারে, এই বয়সের বাচ্চাদের খেলনাগুলোতে প্রধানত সেন্সরি বা সংবেদনশীল বিকাশের দিকে ফোকাস করা উচিত। উজ্জ্বল রং এবং বিভিন্ন টেক্সচারযুক্ত খেলনা খুঁজুন। সর্বদা খেয়াল রাখবেন এতে যেন এমন কোনো ছোট অংশ না থাকে যা গলায় আটকে যাওয়ার ঝুঁকি তৈরি করতে পারে।" 
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      
      {/* Sidebar Overlay for Mobile */}
      {!isSidebarOpen && (
        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden absolute top-24 left-4 z-20 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700">
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary-500" /> অ্যাসিস্ট্যান্ট
          </h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          <button className="w-full py-2 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-bold rounded-lg border border-primary-100 dark:border-primary-800 mb-6 hover:bg-primary-100 transition-colors flex justify-center items-center gap-2">
            <MessageSquare className="w-4 h-4" /> নতুন চ্যাট
          </button>

          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">সাজেস্ট করা টপিক</h3>
          <ul className="space-y-2">
            <TopicButton icon={<AlertCircle className="w-4 h-4 text-rose-500" />} text="গলায় আটকে যাওয়ার ঝুঁকি সংক্রান্ত নির্দেশিকা" onClick={() => setInput("বাচ্চাদের গলায় খেলনার টুকরো আটকে যাওয়ার ঝুঁকি এড়াতে নির্দেশিকাগুলো কী কী?")} />
            <TopicButton icon={<Search className="w-4 h-4 text-blue-500" />} text="২ বছর বয়সীদের মানসিক বিকাশ" onClick={() => setInput("২ বছর বয়সী শিশুর মানসিক ও শারীরিক বিকাশের মাইলফলকগুলো কী কী?")} />
            <TopicButton icon={<MessageSquare className="w-4 h-4 text-emerald-500" />} text="বৃষ্টির দিনে ঘরের কাজ" onClick={() => setInput("বৃষ্টির দিনে ঘরের ভিতরে করার মতো ৫টি মজার কাজের আইডিয়া দিন।")} />
          </ul>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-900 relative">
        {/* Chat Header */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md flex items-center justify-center px-4">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
             প্লেটাইম প্যারেন্টিং অ্যাসিস্ট্যান্ট <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">ভিটা</span>
          </h2>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-tl-none'}`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
               <div className="flex gap-4">
               <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                 <Bot className="w-5 h-5" />
               </div>
               <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none px-6 py-4 shadow-sm max-w-max flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></div>
                 <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                 <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
             </div>
            )}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative flex items-center group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="নিরাপত্তা, বিকাশ বা খেলার আইডিয়া সম্পর্কে আমাকে জিজ্ঞাসা করুন..."
                className="w-full pl-6 pr-14 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:bg-white focus:border-primary-400 focus:ring-4 focus:ring-primary-50 transition-all outline-none text-slate-800 dark:text-slate-200 shadow-sm"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-primary-600"
              >
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            </form>
            <p className="text-center text-xs text-slate-400 mt-3">
              এটি এআই জেনারেটেড পরামর্শ। যেকোনো মেডিকেল বা ডেভেলপমেন্টাল উদ্বেগের জন্য সর্বদা একজন শিশু বিশেষজ্ঞের সাথে পরামর্শ করুন।
            </p>
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
