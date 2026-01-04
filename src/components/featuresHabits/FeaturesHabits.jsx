import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FiArrowRight, FiClock, FiStar } from "react-icons/fi";

const FeaturedHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://habituo-server.vercel.app/publicHabits") 
      .then((res) => res.json())
      .then((data) => {
        
        const featured = data
          .filter((habit) => habit.isFeatured === true)
          .sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
          .slice(0, 6);

        setHabits(featured);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return null; 

  return (
    <section className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FiStar className="text-amber-500 fill-amber-500" />
            <span className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600">
              Handpicked Selection
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black dark:text-white tracking-tighter">
            Featured <span className="text-slate-400 italic">Habits.</span>
          </h2>
        </div>

        {/* Habits Grid (Max 6 habits, 3 per row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {habits.length > 0 ? (
            habits.map((habit, i) => (
              <motion.div
                key={habit._id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Area */}
                <div className="h-44 relative overflow-hidden">
                  <img
                    src={habit.imageURL || "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                      {habit.category}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-1">
                  {/* Creator */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={habit.creatorImage || `https://ui-avatars.com/api/?name=${habit.creatorName}`}
                      className="w-8 h-8 rounded-full ring-2 ring-indigo-500/10"
                      alt=""
                    />
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Architect</p>
                      <p className="text-xs font-bold dark:text-slate-200">{habit.creatorName}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-black dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {habit.habitName}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                    {habit.shortDescription}
                  </p>

                  {/* Metadata & Button */}
                  <div className="mt-auto space-y-6">
                    <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
                      <div className="flex items-center gap-2">
                        <FiClock className="text-indigo-500" size={14} />
                        <span className="text-[11px] font-bold tracking-tight uppercase">{habit.reminderTime || "Flexi"}</span>
                      </div>
                      <span className="text-[11px] font-bold tracking-tight uppercase">
                        {new Date(habit.createDate).toLocaleDateString("en-GB")}
                      </span>
                    </div>

                    <Link to={`/habit-details/${habit._id}`}>
                      <button className="w-full py-4 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10">
                        View Habit Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Featured Habits Available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedHabits;