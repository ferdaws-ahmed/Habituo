import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiCalendar, FiZap } from "react-icons/fi";

const MyHabits = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  // Streak calculation logic remains same
  const calculateStreak = (history) => {
    if (!history || !history.length) return 0;
    const dates = history.map((entry) => entry.date).sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    let today = new Date();
    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      const diff = Math.floor((today - date) / (1000 * 60 * 60 * 24));
      if (diff <= streak) streak++;
      else break;
      today.setDate(today.getDate() - 1);
    }
    return streak;
  };

  const getStreakBadge = (streak) => {
    if (streak >= 10) return "bg-orange-100 text-orange-600";
    if (streak >= 5) return "bg-purple-100 text-purple-600";
    return "bg-indigo-100 text-indigo-600";
  };

  const fetchHabits = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`https://habituo-server.vercel.app/myhabit?userEmail=${user.email}`);
      const data = await res.json();
      const habitsArray = Array.isArray(data) ? data : [];
      const updated = habitsArray.map((habit) => ({
        ...habit,
        currentStreak: calculateStreak(habit.completionHistory || []),
      }));
      setHabits(updated);
      setLoading(false);
    } catch {
      toast.error("Failed to fetch habits!");
      setLoading(false);
    }
  };

  useEffect(() => { fetchHabits(); }, [user?.email]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://habituo-server.vercel.app/myhabit/${deleteId}`, { method: "DELETE" });
      if(res.ok) {
        toast.success("Habit removed from your library!");
        setHabits(habits.filter((h) => h._id !== deleteId));
      }
      setDeleteId(null);
    } catch {
      toast.error("Delete failed!");
      setDeleteId(null);
    }
  };

  const handleMarkComplete = async (habitId) => {
    const habit = habits.find(h => h._id === habitId);
    if (!habit) return;
    const today = new Date().toISOString().split("T")[0];
    if (habit.completionHistory?.some(entry => entry.date === today)) return;

    try {
      const res = await fetch(`https://habituo-server.vercel.app/syncMarkComplete/${habitId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: user.email }),
      });
      const updatedHabit = await res.json();
      setHabits(prev => prev.map(h => h._id === habitId ? { ...updatedHabit, currentStreak: calculateStreak(updatedHabit.completionHistory) } : h));
      toast.success("Daily target achieved! 🎯");
    } catch {
      toast.error("Failed to mark complete!");
    }
  };

  if (authLoading || loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 md:px-6 bg-[#f8fafc] dark:bg-[#0b0f1a] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-10 gap-6">
        <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter">My <span className="text-indigo-600 italic">Habits.</span></h2>
            <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Manage and track your daily performance</p>
        </div>
        <Link to="/dashboard/addHabit" className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-3.5 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all text-center">
            + New Habit
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Habit Name</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Schedule</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">Progress</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {habits.map((habit) => {
                const today = new Date().toISOString().split("T")[0];
                const todayDone = habit.completionHistory?.some((e) => e.date === today);
                const streak = habit.currentStreak || 0;

                return (
                  <tr key={habit._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-5 md:px-8 py-5 md:py-6">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover" src={habit.imageURL} alt="" />
                        <div>
                          <p className="font-black text-sm md:text-base text-slate-800 dark:text-white tracking-tight">{habit.habitName}</p>
                          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{habit.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-8 py-5 md:py-6">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] md:text-xs">
                          <FiClock size={12} className="text-indigo-500" />
                          <span className="font-bold tracking-tight">{habit.reminderTime || "Anytime"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 text-[9px] md:text-[10px]">
                          <FiCalendar size={11} />
                          <span className="font-medium italic">{new Date(habit.createDate).toLocaleDateString("en-GB")}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 md:px-8 py-5 md:py-6">
                      <div className={`inline-flex items-center gap-2 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full ${getStreakBadge(streak)} font-black text-[9px] md:text-[10px] uppercase tracking-tighter`}>
                        <FiZap className="fill-current" size={10} md:size={12} />
                        {streak} Day Streak
                      </div>
                    </td>
                    <td className="px-5 md:px-8 py-5 md:py-6 text-right">
                      <div className="flex items-center justify-end gap-1.5 md:gap-2">
                        <button
                          onClick={() => handleMarkComplete(habit._id)}
                          disabled={todayDone}
                          title={todayDone ? "Done for today" : "Mark as done"}
                          className={`p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all ${todayDone ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 shadow-sm"}`}
                        >
                          <FiCheckCircle size={16} md:size={18} />
                        </button>
                        <Link to={`/updatehabit/${habit._id}`} className="p-2 md:p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl text-slate-400 hover:text-green-600 hover:border-green-600 transition-all shadow-sm">
                          <FiEdit2 size={16} md:size={18} />
                        </Link>
                        <button onClick={() => setDeleteId(habit._id)} className="p-2 md:p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl text-slate-400 hover:text-red-600 hover:border-red-600 transition-all shadow-sm">
                          <FiTrash2 size={16} md:size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {habits.length === 0 && (
          <div className="py-16 md:py-20 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] md:text-xs">No habits tracked yet.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-slate-900/60 backdrop-blur-md z-50 p-4 md:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl p-8 md:p-10 text-center max-w-sm w-full border border-slate-200 dark:border-slate-800" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <FiTrash2 className="text-red-500" size={28} md:size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">Are you sure?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-[13px] md:text-sm font-medium mb-6 md:mb-8">This action will permanently remove this habit from your library.</p>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setDeleteId(null)} className="px-4 py-3 md:py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-3 md:py-3.5 bg-red-600 text-white rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyHabits;