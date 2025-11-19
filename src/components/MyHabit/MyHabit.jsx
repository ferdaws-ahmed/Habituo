import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const MyHabits = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

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
    if (streak >= 30) return "🏆";
    if (streak >= 15) return "🎯";
    if (streak >= 10) return "🔥";
    if (streak >= 5) return "💪";
    if (streak >= 3) return "✨";
    if (streak >= 2) return "👍";
    if (streak >= 1) return "😊";
    return "❌";
  };

  // Fetch habits
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

  useEffect(() => {
    fetchHabits();
  }, [user?.email]);

  const confirmDelete = (id) => setDeleteId(id);

  const handleDelete = async () => {
    try {
      await fetch(`https://habituo-server.vercel.app/myhabit/${deleteId}`, { method: "DELETE" });
      toast.success("Habit deleted successfully!");
      setHabits(habits.filter((habit) => habit._id !== deleteId));
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete habit!");
      setDeleteId(null);
    }
  };

  //  Mark Complete with backend sync to both collections
const handleMarkComplete = async (habitId) => {
  const habit = habits.find(h => h._id === habitId);
  if (!habit) return;

  const today = new Date().toISOString().split("T")[0];
  if (habit.completionHistory?.some(entry => entry.date === today)) {
    toast.error("Already marked today!");
    return;
  }

  try {
    // backend call
    const res = await fetch(`https://habituo-server.vercel.app/syncMarkComplete/${habitId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user.email }),
    });

    if (!res.ok) throw new Error("Failed to mark complete");

    const updatedHabit = await res.json(); // ⚠ backend থেকে পুরো habit object

    // frontend state update
    setHabits(prev =>
      prev.map(h => (h._id === habitId
        ? { ...updatedHabit, currentStreak: calculateStreak(updatedHabit.completionHistory) }
        : h
      ))
    );

    toast.success("Marked complete successfully!");
  } catch (err) {
    console.error(err);
    toast.error("Failed to mark complete!");
  }
};


  // Loader
  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      >
        <motion.div
          className="absolute rounded-full border-t-4 border-b-4 border-indigo-500 w-24 h-24"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        ></motion.div>
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full shadow-lg"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
      <p className="mt-6 text-gray-600 font-semibold text-lg tracking-wide animate-pulse">
        Loading your habits...
      </p>
    </div>
  );

  if (authLoading || loading) return <Loader />;

  return (
    <div className="min-h-[80vh] py-10 px-5 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600">📝 My Habits</h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">You have no habits yet.</p>
      ) : (
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-lg divide-y divide-gray-200">
            <thead className="bg-indigo-100 text-left">
              <tr>
                <th className="px-4 py-3 border-b">Title</th>
                <th className="px-4 py-3 border-b">Category</th>
                <th className="px-4 py-3 border-b">Reminder Time</th>
                <th className="px-4 py-3 border-b">Created Date</th>
                <th className="px-4 py-3 border-b">Current Streak</th>
                <th className="px-4 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {habits.map((habit) => {
                const today = new Date().toISOString().split("T")[0];
                const todayDone = habit.completionHistory?.some((entry) => entry.date === today);
                const streak = habit.currentStreak || 0;

                return (
                  <tr key={habit._id} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-3 border-b font-medium text-gray-700">{habit.habitName}</td>
                    <td className="px-4 py-3 border-b text-gray-600">{habit.category}</td>
                    <td className="px-4 py-3 border-b text-gray-600">{habit.reminderTime || "Not set"}</td>
                    <td className="px-4 py-3 border-b text-gray-500">{new Date(habit.createDate).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3 border-b font-bold text-indigo-600">{streak} {getStreakBadge(streak)}</td>
                    <td className="px-4 py-3 border-b space-x-2">
                      <Link to={`/updatehabit/${habit._id}`}>
                        <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">Update</button>
                      </Link>
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition" onClick={() => confirmDelete(habit._id)}>Delete</button>
                      <button
                        className={`px-3 py-1 rounded transition ${todayDone ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                        onClick={() => handleMarkComplete(habit._id)}
                        disabled={todayDone}
                      >
                        {todayDone ? "Completed Today" : "Mark Complete"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-2xl shadow-xl p-8 text-center w-80" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">⚠ Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this habit?</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">Cancel</button>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyHabits;
