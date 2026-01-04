import React, { useState } from "react";
import { TbLockSquareRounded, TbFingerprint, TbDatabase, TbCookie, TbShareOff, TbShieldLock, TbUserCheck, TbMailForward } from "react-icons/tb";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState(1);

  const items = [
    {
      id: 1,
      icon: <TbFingerprint />,
      title: "Data Collection",
      body: "We collect information you provide directly (name, email, profile info) and data collected automatically (device info, usage data). We only collect what helps us improve your Habituo experience.",
    },
    {
      id: 2,
      icon: <TbDatabase />,
      title: "Usage Policy",
      body: "Your information is used to personalize your dashboard, provide notifications, and prevent fraud. We analyze patterns to make Habituo more effective for your career growth.",
    },
    {
      id: 3,
      icon: <TbCookie />,
      title: "Cookies & Tracking",
      body: "We use essential cookies to remember your preferences and session. You can manage these via browser settings, though some features might require them to function properly.",
    },
    {
      id: 4,
      icon: <TbShareOff />,
      title: "Data Sharing",
      body: "We never sell your personal data. Sharing only happens with trusted service providers (like hosting or analytics) who comply with our strict privacy standards.",
    },
    {
      id: 5,
      icon: <TbShieldLock />,
      title: "Security Measures",
      body: "We use industry-standard encryption to protect your data. While no system is 100% foolproof, we constantly update our protocols to keep your habits and history safe.",
    },
    {
      id: 6,
      icon: <TbUserCheck />,
      title: "Your Rights",
      body: "You have full control. You can access, correct, or delete your data at any time. Your privacy is a fundamental right, not a feature at Habituo.",
    },
    {
      id: 7,
      icon: <TbMailForward />,
      title: "Contact Support",
      body: "Questions about your privacy? Reach out to our dedicated privacy team at privacy@habituo.com. We're here to help.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] transition-colors duration-500 py-12 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-xl shadow-emerald-500/5">
            <TbLockSquareRounded />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Privacy <span className="text-emerald-500 italic">Policy</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-400 max-w-2xl">
            At Habituo, your privacy is built into every habit you track. Learn how we handle your information with total transparency.
          </p>
        </div>

        {/* Main Content: Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900/50 p-4 md:p-8 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative">
          
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

          {/* Left: Tabs List */}
          <div className="lg:col-span-5 space-y-2 relative z-10">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all duration-300 ${
                  activeTab === item.id
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 translate-x-2"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold text-lg">{item.title}</span>
              </button>
            ))}
          </div>

          {/* Right: Content Display */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] flex items-center relative z-10 min-h-[400px]">
            {items.map((item) => (
              item.id === activeTab && (
                <div key={item.id} className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">
                    {item.title}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{item.body}"
                  </p>
                  <div className="mt-10 h-1 w-20 bg-emerald-500 rounded-full"></div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Effective Date: <span className="text-emerald-500 font-mono">January 04, 2026</span>
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <div className="px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              #PrivacyFirst
            </div>
            <div className="px-4 py-1 rounded-full border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              #HabituoSafe
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;