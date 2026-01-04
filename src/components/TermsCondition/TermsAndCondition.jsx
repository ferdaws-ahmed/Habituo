import React, { useState } from "react";
import { TbShieldCheck, TbCircleNumber1, TbCircleNumber2, TbCircleNumber3, TbCircleNumber4, TbCircleNumber5, TbCircleNumber6, TbChevronRight } from "react-icons/tb";

const TermsAndConditions = () => {
  const [activeId, setActiveId] = useState(1);

  const sections = [
    { id: 1, icon: <TbCircleNumber1 />, title: "Introduction", text: "Welcome to Habituo! By using our platform, you're joining a community dedicated to growth. These terms ensure a safe environment for everyone." },
    { id: 2, icon: <TbCircleNumber2 />, title: "Usage Policy", text: "Use Habituo for positive habit building. Avoid any actions that could disrupt the service or compromise other users' data security." },
    { id: 3, icon: <TbCircleNumber3 />, title: "Account Responsibility", text: "Your progress is personal. Keep your credentials secure; you are the sole captain of your account's journey." },
    { id: 4, icon: <TbCircleNumber4 />, title: "Intellectual Property", text: "The Habituo identity, including our unique brain logo and dashboard designs, are protected. Please don't replicate them without a nod from us." },
    { id: 5, icon: <TbCircleNumber5 />, title: "Service Liability", text: "While we strive for 100% uptime to keep your streaks alive, we are not liable for unexpected technical interruptions or data loss." },
    { id: 6, icon: <TbCircleNumber6 />, title: "Term Updates", text: "As we evolve, so will our terms. We’ll keep this page updated to reflect how we protect your habit-building experience." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-500 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Static Content */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide">
            <TbShieldCheck className="text-xl" /> LEGAL FRAMEWORK
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            Our <span className="text-primary italic">Terms</span> & <br /> Conditions
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            At Habituo, we believe in transparency. These rules are here to protect your data and ensure your consistency never breaks.
          </p>
          <div className="hidden lg:block pt-10">
             <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
             <p className="mt-4 text-xs font-mono text-slate-400 uppercase tracking-widest italic">Version 2.0.1 // 2026</p>
          </div>
        </div>

        {/* Right Side: Interactive List */}
        <div className="lg:col-span-7 space-y-4">
          {sections.map((sec) => (
            <div
              key={sec.id}
              onClick={() => setActiveId(sec.id)}
              className={`group cursor-pointer p-6 rounded-3xl transition-all duration-500 border-2 ${
                activeId === sec.id
                  ? "bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-2xl scale-[1.02]"
                  : "bg-transparent border-slate-100 dark:border-slate-800 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`text-3xl transition-colors duration-500 ${
                    activeId === sec.id ? "text-primary" : "text-slate-300 dark:text-slate-700"
                  }`}>
                    {sec.icon}
                  </span>
                  <h3 className={`text-xl font-bold transition-colors duration-500 ${
                    activeId === sec.id ? "text-white dark:text-slate-900" : "text-slate-700 dark:text-slate-300"
                  }`}>
                    {sec.title}
                  </h3>
                </div>
                <TbChevronRight className={`text-xl transition-all duration-500 ${
                  activeId === sec.id ? "rotate-90 text-primary" : "text-slate-300 opacity-0 group-hover:opacity-100"
                }`} />
              </div>

              {/* Collapsible Content */}
              <div className={`overflow-hidden transition-all duration-500 ${
                activeId === sec.id ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <p className={`text-md leading-relaxed ${
                  activeId === sec.id ? "text-slate-300 dark:text-slate-600" : ""
                }`}>
                  {sec.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;