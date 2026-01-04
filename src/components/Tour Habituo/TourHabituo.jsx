import React from "react";
import { Link } from "react-router";
import { TbBrain, TbChartHistogram, TbUserCheck, TbTargetArrow, TbRocket } from "react-icons/tb";

const TourHabituo = () => {
  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-900 transition-colors duration-500">
      {/* Hero Section */}
      <div className="py-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20">
          <TbRocket className="animate-bounce" /> Your Journey Starts Here
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Explore Habituo
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Habituo is not just a tracker; it's your personal growth companion. Build consistency, analyze your progress, and transform your career.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Feature 1: Habit Building */}
          <div className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-base-200 dark:border-slate-700 shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TbTargetArrow className="text-3xl text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">Smart Habit Building</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Set goals with precision. Whether it's reading, gym, or coding, Habituo keeps you on track with daily reminders and streaks.
            </p>
          </div>

          {/* Feature 2: Dashboard Analysis */}
          <div className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-base-200 dark:border-slate-700 shadow-xl hover:shadow-secondary/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TbChartHistogram className="text-3xl text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">Deep Analysis</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Visualize your growth through our intuitive dashboard. Track your total activity and see how your habits evolve over time.
            </p>
          </div>

          {/* Feature 3: Profile & Career */}
          <div className="group p-8 bg-white dark:bg-slate-800 rounded-3xl border border-base-200 dark:border-slate-700 shadow-xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-2">
            <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TbUserCheck className="text-3xl text-accent" />
            </div>
            <h3 className="text-2xl font-bold mb-3 dark:text-white">Career Impact</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Build a personal brand of consistency. Your habit stats reflect your dedication, directly impacting your personal and professional life.
            </p>
          </div>

        </div>

        {/* Concept Section - Highlight */}
        <div className="mt-20 relative overflow-hidden rounded-[3rem] bg-slate-900 dark:bg-primary/5 p-8 md:p-16 border border-white/10">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your lifestyle?
              </h2>
              <p className="text-slate-300 dark:text-gray-400 text-lg mb-8">
                Consistency is the key to success. Join thousands of users who are already building their dream life one habit at a time.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/login" className="btn btn-primary px-8 rounded-full">Get Started Free</Link>
                <Link to="/browsePublicHabits" className="btn btn-outline text-white hover:bg-white hover:text-slate-900 px-8 rounded-full">Explore Habits</Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <TbBrain className="text-[12rem] text-primary/30 animate-pulse" />
            </div>
          </div>
          
          {/* Background Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default TourHabituo;