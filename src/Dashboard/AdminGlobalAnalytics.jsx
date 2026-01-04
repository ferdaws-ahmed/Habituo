import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiGlobe, FiActivity, FiZap, FiPieChart } from "react-icons/fi";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const GlobalAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://habituo-server.vercel.app/global-analytics")
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="h-64 md:h-96 flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-600">Syncing Global Data...</p>
    </div>
  );

  const chartData = [
    { name: 'Users', value: data.totalUsers },
    { name: 'Public Habits', value: data.publicHabits },
    { name: 'Personalized', value: data.totalPersonalHabits },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-10">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black dark:text-white tracking-tight">Global <span className="text-indigo-600">Analytics</span></h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm italic">Master control of Habituo ecosystem</p>
        </div>
        <div className="bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl border border-indigo-100 dark:border-indigo-900">
           <p className="text-[8px] md:text-[10px] font-black text-indigo-500 uppercase">System Status</p>
           <p className="text-[10px] md:text-xs font-bold dark:text-emerald-400">● {data.systemHealth}</p>
        </div>
      </div>

      {/* High-Level Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard label="Global Citizens" val={data.totalUsers} icon={<FiUsers />} trend="+5% this week" />
        <StatCard label="Public Library" val={data.publicHabits} icon={<FiGlobe />} trend="Standard" />
        <StatCard label="Active Rituals" val={data.totalPersonalHabits} icon={<FiZap />} trend="High Engagement" />
        <StatCard label="Total Impact" val={data.totalCompletions} icon={<FiActivity />} trend="Life-changing" />
      </div>

      {/* Data Visualization Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Main Growth Chart */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <FiPieChart className="text-indigo-600" size={20} />
            <h3 className="font-black text-[10px] md:text-sm uppercase tracking-widest text-slate-400">Ecosystem Distribution</h3>
          </div>
          <div className="h-64 md:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{borderRadius: '15px', border: 'none', background: '#0f172a', color: '#fff', fontSize: '12px'}} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} md:strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Insights List */}
        <div className="bg-indigo-600 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl shadow-indigo-600/20">
            <h3 className="font-black text-lg md:text-xl mb-4 md:mb-6">Live Intelligence</h3>
            <div className="space-y-4 md:space-y-6">
                <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">Top Habit Engagement</p>
                    <p className="font-bold text-sm md:text-lg">Morning Meditation</p>
                </div>
                <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">Avg. Consistency</p>
                    <p className="font-bold text-sm md:text-lg">78.4% Across Users</p>
                </div>
                <div className="bg-white/10 p-3 md:p-4 rounded-xl md:rounded-2xl backdrop-blur-md border border-white/5">
                    <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">Database Load</p>
                    <p className="font-bold text-sm md:text-lg">1.2ms Response</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ label, val, icon, trend }) => (
  <div className="bg-white dark:bg-slate-900 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:translate-y-[-5px] transition-all">
    <div className="flex justify-between items-start mb-3 md:mb-4">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 flex items-center justify-center text-lg md:text-xl shadow-inner">
        {icon}
      </div>
      <span className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5 md:px-2 md:py-1 rounded-lg">
        {trend}
      </span>
    </div>
    <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
    <p className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter">{val}</p>
  </div>
);

export default GlobalAnalytics;