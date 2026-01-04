import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import { FiArrowLeft, FiAward, FiCalendar, FiTarget, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
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
    const fetchHabit = async () => {
      try {
        const res = await fetch(`https://habituo-server.vercel.app/publicHabits/${id}`);
        const data = await res.json();
        setHabit(data);
        const today = new Date().toISOString().split("T")[0];
        const history = data.completionHistory || [];
        setTodayCompleted(history.some((entry) => entry.date === today));
        setCurrentStreak(calculateStreak(history));
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load habit details");
        setLoading(false);
      }
    };
    fetchHabit();
  }, [id]);

  const handleMarkComplete = async () => {
    if (!habit || !user) return;
    const today = new Date().toISOString().split("T")[0];
    try {
      const newEntry = { userEmail: user.email, date: today };
      const updatedHistory = [...(habit.completionHistory || []), newEntry];
      const res = await fetch(`https://habituo-server.vercel.app/publicHabits/${habit._id}/markComplete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completionHistory: updatedHistory }),
      });
      const data = await res.json();
      toast.success("Great job! Keep it up.");
      setHabit((prev) => ({ ...prev, completionHistory: data.completionHistory }));
      setTodayCompleted(true);
      setCurrentStreak(calculateStreak(data.completionHistory));
    } catch (err) {
      toast.error("Failed to update habit.");
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-20">
      <div className="max-w-4xl mx-auto px-4 pt-10">
        
        {/* Back Navigation */}
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm mb-6 transition-colors">
          <FiArrowLeft /> Back to Dashboard
        </Link>

        {/* Main Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
          
          {/* Header Image Section */}
          <div className="relative h-64 w-full">
            <img 
              src={habit.imageURL || "https://images.unsplash.com/photo-1506784919141-93919e6ee0f3?q=80&w=2070&auto=format&fit=crop"} 
              className="w-full h-full object-cover" 
              alt="habit cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
              <div>
                <span className="bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                  {habit.category || "General"}
                </span>
                <h1 className="text-4xl font-black text-white tracking-tight">{habit.habitName}</h1>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border dark:border-slate-800">
                <FiZap className="text-orange-500 mb-2" size={24} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Streak</p>
                <p className="text-2xl font-black dark:text-white">{currentStreak} Day{currentStreak !== 1 && 's'} {getStreakIcon(currentStreak)}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border dark:border-slate-800">
                <FiTarget className="text-indigo-500 mb-2" size={24} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Target</p>
                <p className="text-2xl font-black dark:text-white">30 Days</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border dark:border-slate-800">
                <FiAward className="text-emerald-500 mb-2" size={24} />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Done</p>
                <p className="text-2xl font-black dark:text-white">{habit.completionHistory?.length || 0} Times</p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mb-10">
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-lg font-black dark:text-white">Monthly Progress</h3>
                <span className="text-indigo-600 font-black text-sm">{progressPercent}% Achieved</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-4 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-r from-indigo-500 to-violet-600 h-full rounded-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-lg font-black dark:text-white mb-3 flex items-center gap-2">
                <FiCalendar className="text-slate-400" /> Description & Plan
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {habit.longDescription || habit.fullDescription || "No detailed instructions provided for this habit. Consistency is key!"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t dark:border-slate-800">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Created By</p>
                <p className="font-bold dark:text-slate-200">{habit.creatorName || "Habituo User"}</p>
              </div>

              <motion.button
                whileHover={!todayCompleted ? { scale: 1.05 } : {}}
                whileTap={!todayCompleted ? { scale: 0.95 } : {}}
                onClick={handleMarkComplete}
                disabled={todayCompleted}
                className={`w-full md:w-auto px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${
                  !todayCompleted
                    ? "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-none hover:bg-indigo-700"
                    : "bg-emerald-500 text-white cursor-not-allowed shadow-none"
                }`}
              >
                {todayCompleted ? "✓ Completed Today" : "Mark as Complete"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetails;