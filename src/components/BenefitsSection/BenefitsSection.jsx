import React from "react";
import { FaBrain, FaSmile, FaClock, FaRunning } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaBrain size={28} className="text-indigo-600" />,
      title: "Better Focus",
      description: "Build mental clarity and stay productive throughout your day.",
    },
    {
      icon: <FaSmile size={28} className="text-pink-500" />,
      title: "Reduced Stress",
      description: "Reduce anxiety by creating structured and manageable routines.",
    },
    {
      icon: <FaClock size={28} className="text-green-500" />,
      title: "Time Management",
      description: "Learn to prioritize important tasks and use your time wisely.",
    },
    {
      icon: <FaRunning size={28} className="text-yellow-500" />,
      title: "Health & Energy",
      description: "Incorporate habits that improve both physical and mental health.",
    },
  ];

  return (
    <div className="py-16 px-5 bg-gradient-to-b from-gray-50 via-gray-100 to-white dark:from-[#1f4068] dark:via-[#162447] dark:to-[#1a1a2e] mt-10 border rounded-2xl">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-400 dark:to-pink-400">
        Why Build Habits?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 
                       bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                        hover:from-indigo-50 hover:via-pink-50 hover:to-yellow-50 transform hover:-translate-y-1"
          >
            <div className="mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{benefit.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
