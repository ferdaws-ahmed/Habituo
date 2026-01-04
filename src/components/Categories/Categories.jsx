import React from "react";
import { motion } from "framer-motion";
import { FiSunrise, FiBriefcase, FiActivity, FiMoon, FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Morning",
      icon: <FiSunrise />,
      color: "from-orange-400 to-amber-500",
      description: "Start your day with energy.",
      count: "Early Birds",
    },
    {
      name: "Work",
      icon: <FiBriefcase />,
      color: "from-blue-500 to-indigo-600",
      description: "Focus and productivity.",
      count: "Deep Work",
    },
    {
      name: "Fitness",
      icon: <FiActivity />,
      color: "from-rose-500 to-pink-600",
      description: "Health and vitality.",
      count: "Active Life",
    },
    {
      name: "Evening",
      icon: <FiMoon />,
      color: "from-purple-600 to-indigo-900",
      description: "Unwind and reflect.",
      count: "Night Owl",
    },
    {
      name: "Study",
      icon: <FiBookOpen />,
      color: "from-emerald-400 to-teal-600",
      description: "Learn and grow.",
      count: "Knowledge",
    },
  ];

  return (
    <section className="py-24 px-4 mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 mb-3">
              Explore Blueprint
            </h2>
            <h1 className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter leading-none">
              Master your day by <br />
              <span className="text-slate-400 italic">Categories.</span>
            </h1>
          </div>
          
          
          <button 
            onClick={() => navigate('/browsePublicHabits')}
            className="px-8 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-lg active:scale-95"
          >
            View All Blueprints
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -12, transition: { duration: 0.2 } }}
              
             
              onClick={() => navigate(`/browsePublicHabits?category=${cat.name}`)}
              
              className="cursor-pointer group relative h-[320px] rounded-[2.5rem] overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-transparent transition-all"
            >
              {/* Hover Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-500 
                    ${cat.name === 'Morning' ? 'text-orange-500' : 
                      cat.name === 'Work' ? 'text-blue-500' : 
                      cat.name === 'Fitness' ? 'text-rose-500' : 
                      cat.name === 'Evening' ? 'text-purple-500' : 'text-emerald-500'}`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-2xl font-black dark:text-white group-hover:text-white mb-2 tracking-tighter leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-white/80 transition-colors">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 group-hover:border-white/20">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-white/60">
                    {cat.count}
                  </span>
                </div>
              </div>

              {/* Decorative Blur Circle */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-black/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;