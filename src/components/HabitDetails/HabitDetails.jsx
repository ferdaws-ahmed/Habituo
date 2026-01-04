import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { FiArrowLeft, FiAward, FiCalendar, FiTarget, FiZap, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  const calculateStreak = (history) => {
    if (!history || !history.length) return 0;
    const dates = history.map((entry) => entry.date).sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      date.setHours(0, 0, 0, 0);
      const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      if (diff <= streak) streak++;
      else break;
      today.setDate(today.getDate() - 1);
    }
    return streak;
  };

  const getStreakIcon = (streak) => {
    if (streak >= 15) return "🔥";
    if (streak >= 7) return "✨";
    return "💪";
  };

useEffect(() => {
  const fetchHabitAndStatus = async () => {
    if (!id || !user?.email) return;

    try {
      
      const res = await fetch(`https://habituo-server.vercel.app/publicHabits/${id}/${user.email}`);
      const data = await res.json();
      
      setHabit(data);

      
      const statusRes = await fetch(`https://habituo-server.vercel.app/check-status/${id}/${user.email}`);
      const statusData = await statusRes.json();
      setTodayCompleted(statusData.completed);

      
      const history = data.completionHistory || [];
      setCurrentStreak(calculateStreak(history));
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  
  fetchHabitAndStatus();
}, [id, user?.email]);

 const handleMarkComplete = async () => {
  if (!user) {
    toast.warn("Please login to track this habit!");
    return navigate("/login");
  }

  const submissionData = {
    habit: habit, 
    userEmail: user.email,
    userName: user.displayName || "Habituo User"
  };

  try {
    const res = await fetch(`https://habituo-server.vercel.app/mark-complete-final`, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submissionData),
    });

    if (res.ok) {
      toast.success("Great job! Today's progress saved. 🚀");
      
      
      setTodayCompleted(true);
      
     
      setCurrentStreak(prev => prev + 1);

      
      setHabit(prev => ({
        ...prev,
        completionHistory: [...(prev.completionHistory || []), { userEmail: user.email, date: new Date().toISOString().split("T")[0] }]
      }));

    } else {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to save");
    }
  } catch (err) {
    toast.error(err.message || "Could not save progress.");
  }
};

  if (loading) return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!habit) return <div className="text-center py-20 font-bold text-gray-400">Habit not found.</div>;

  const progressPercent = Math.min(Math.floor(((habit.completionHistory?.length || 0) / 30) * 100), 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 font-bold text-sm mb-6 transition-all group">
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          <div className="relative h-72 w-full">
            <img 
              src={habit.imageURL || "https://images.unsplash.com/photo-1506784919141-93919e6ee0f3?q=80&w=2070&auto=format&fit=crop"} 
              className="w-full h-full object-cover" 
              alt="habit cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex items-end p-8 md:p-12">
              <div>
                <span className="bg-indigo-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 inline-block shadow-lg">
                  {habit.category || "General"}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">{habit.habitName}</h1>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
                <FiZap className="text-orange-500 mb-3" size={28} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Streak</p>
                <p className="text-2xl font-black dark:text-white">{currentStreak} Day{currentStreak !== 1 && 's'} {getStreakIcon(currentStreak)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
                <FiTarget className="text-indigo-500 mb-3" size={28} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Target</p>
                <p className="text-2xl font-black dark:text-white">30 Days</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-shadow">
                <FiAward className="text-emerald-500 mb-3" size={28} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Community Done</p>
                <p className="text-2xl font-black dark:text-white">{habit.completionHistory?.length || 0} Times</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-lg font-black dark:text-white tracking-tight">Global Achievement</h3>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm">{progressPercent}% Achieved</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-5 rounded-full p-1 shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full shadow-lg"
                />
              </div>
            </div>

            <div className="mb-12 bg-indigo-50/30 dark:bg-indigo-500/5 p-8 rounded-[2rem] border border-indigo-100/50 dark:border-indigo-500/10">
              <h3 className="text-lg font-black dark:text-white mb-4 flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
                <FiCalendar /> Actionable Plan
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg italic">
                "{habit.longDescription || habit.fullDescription || "Consistency is the only bridge between goals and accomplishment."}"
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-black text-slate-500">
                  {habit.creatorName?.charAt(0) || "H"}
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastermind</p>
                  <p className="font-bold dark:text-slate-200">{habit.creatorName || "Habituo Elite"}</p>
                </div>
              </div>

              <motion.button
                whileHover={!todayCompleted ? { scale: 1.02 } : {}}
                whileTap={!todayCompleted ? { scale: 0.98 } : {}}
                onClick={handleMarkComplete}
                disabled={todayCompleted}
                className={`w-full md:w-auto px-12 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.15em] transition-all shadow-2xl flex items-center justify-center gap-3 ${
                  !todayCompleted
                    ? "bg-indigo-600 text-white shadow-indigo-500/30 hover:bg-indigo-700"
                    : "bg-emerald-500 text-white shadow-emerald-500/20 cursor-not-allowed"
                }`}
              >
                {todayCompleted ? (
                  <><FiCheckCircle size={20} /> Completed</>
                ) : (
                  "Mark as Complete"
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;