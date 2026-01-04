import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { FiUsers, FiActivity, FiLayers, FiCheckCircle } from "react-icons/fi";

// Counting Animation Component
const Counter = ({ from, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, { duration: 2, ease: "easeOut" });
    return rounded.onChange((v) => setDisplayValue(v));
  }, [to]);

  return <span>{displayValue}</span>;
};

const GlobalStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("https://habituo-server.vercel.app/global-analytics")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const statCards = [
    {
      label: "Global Architects",
      value: stats?.totalUsers || 0,
      icon: <FiUsers className="text-blue-500" />,
      color: "bg-blue-500/10",
    },
    {
      label: "System Blueprints",
      value: stats?.publicHabits || 0,
      icon: <FiLayers className="text-indigo-500" />,
      color: "bg-indigo-500/10",
    },
    {
      label: "Personal Journeys",
      value: stats?.totalPersonalHabits || 0,
      icon: <FiActivity className="text-emerald-500" />,
      color: "bg-emerald-500/10",
    },
    {
      label: "Habits Conquered",
      value: stats?.totalCompletions || 0,
      icon: <FiCheckCircle className="text-amber-500" />,
      color: "bg-amber-500/10",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 mb-2">Live Ecosystem Stats</h2>
          <p className="text-3xl font-black dark:text-white tracking-tighter">Habituo is growing <span className="italic text-slate-400">every second.</span></p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-xl overflow-hidden group"
            >
              {/* Background Decoration */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full ${stat.color} blur-3xl group-hover:scale-150 transition-transform duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${stat.color} flex items-center justify-center text-2xl mb-6 shadow-inner`}>
                  {stat.icon}
                </div>
                
                <h3 className="text-4xl font-black dark:text-white mb-1 tracking-tighter">
                  <Counter from={0} to={stat.value} />
                  <span className="text-indigo-600">+</span>
                </h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalStats;