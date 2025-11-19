import React, { useState } from "react";

const TermsAndConditions = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Introduction",
      text: "Welcome to Habituo! These terms outline the rules and regulations for using our website. By accessing this site, you agree to accept these terms in full.",
    },
    {
      id: 2,
      title: "Use of the Website",
      text: "You agree to use Habituo only for lawful purposes. Do not harm the site, upload malicious content, or disturb other users' experience.",
    },
    {
      id: 3,
      title: "User Accounts",
      text: "Keep your login information private. You are responsible for any actions under your account.",
    },
    {
      id: 4,
      title: "Intellectual Property",
      text: "All content (text, graphics, logo) belongs to Habituo or its licensors. Please do not copy or reuse without permission.",
    },
    {
      id: 5,
      title: "Limitation of Liability",
      text: "We do our best to keep Habituo safe, but we are not responsible for losses or damages caused by using the site.",
    },
    {
      id: 6,
      title: "Changes to Terms",
      text: "We may update our Terms from time to time. The new version will always be posted here with an updated date.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 relative overflow-hidden">
    
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full opacity-40 blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
              H
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Habituo Terms & Conditions</h1>
              <p className="text-gray-500 text-sm">Please read carefully before using our site.</p>
            </div>
          </div>

          
          <div className="space-y-3">
            {sections.map((sec) => (
              <div key={sec.id} className="border border-gray-100 rounded-xl shadow-sm">
                <button
                  onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition rounded-xl"
                >
                  <span className="font-semibold text-gray-700">{sec.title}</span>
                  <span className="text-xl text-gray-500">
                    {openSection === sec.id ? "−" : "+"}
                  </span>
                </button>
                {openSection === sec.id && (
                  <div className="p-4 bg-white text-gray-600 border-t border-gray-100">
                    {sec.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center mt-8">
            Last updated: November 13, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
