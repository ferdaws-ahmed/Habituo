import React, { useState } from "react";

const PrivacyPolicy = () => {
  const [open, setOpen] = useState(null);

  const items = [
    {
      id: 1,
      title: "What information we collect",
      body:
        "We may collect information you give us directly (name, email, profile info) and data collected automatically (device info, usage data, cookies). We only collect what helps us improve Habituo.",
    },
    {
      id: 2,
      title: "How we use your information",
      body:
        "We use your information to provide and improve our services, communicate with you (notifications, support), personalize your experience, and for security and fraud prevention.",
    },
    {
      id: 3,
      title: "Cookies & tracking",
      body:
        "We use cookies and similar technologies to remember preferences, measure site performance, and show relevant content. You can control cookies from your browser, but blocking them may reduce functionality.",
    },
    {
      id: 4,
      title: "Data sharing & third parties",
      body:
        "We do not sell your personal information. We may share data with service providers (hosting, analytics, payments) who perform services for us under contract and follow our privacy requirements.",
    },
    {
      id: 5,
      title: "Security",
      body:
        "We use reasonable technical and organizational measures to protect your data. No method is 100% secure, so please be careful with your account credentials.",
    },
    {
      id: 6,
      title: "Your rights",
      body:
        "Depending on your location, you may have rights to access, correct, or delete your personal information. Contact us to request changes or to ask questions about how we handle your data.",
    },
    {
      id: 7,
      title: "Contact us",
      body:
        "If you have questions about this Privacy Policy, email us at privacy@habituo.example (replace with your real support address).",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-indigo-50 px-4 py-12">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 md:p-10 relative overflow-hidden">
        
        <div className="absolute -top-14 -left-14 w-48 h-48 bg-gradient-to-br from-green-200 to-indigo-200 rounded-full opacity-30 blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 text-white font-bold text-xl w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
              P
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Privacy Policy</h2>
              <p className="text-sm text-gray-500">How Habituo collects and uses your information.</p>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.id} className="border border-gray-100 rounded-xl shadow-sm">
                <button
                  onClick={() => setOpen(open === it.id ? null : it.id)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition rounded-xl"
                  aria-expanded={open === it.id}
                >
                  <span className="font-medium text-gray-700">{it.title}</span>
                  <span className="text-lg text-gray-500">{open === it.id ? "−" : "+"}</span>
                </button>

                {open === it.id && (
                  <div className="p-4 bg-white text-gray-600 border-t border-gray-100">
                    {it.body}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">
            <p>Effective date: November 13, 2025</p>
            <p className="mt-2">Habituo — your privacy matters to us.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
