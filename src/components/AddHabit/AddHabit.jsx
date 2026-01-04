import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiLock, FiPlusCircle } from "react-icons/fi";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // input field values 
   
    const habitName = form.elements.habitName.value;
    const shortDescription = form.elements.shortDescription.value;
    const fullDescription = form.elements.fullDescription.value;
    const category = form.elements.category.value;
    const reminderTime = form.elements.reminderTime.value;
    const imageURL = form.elements.imageURL.value;
    
    // Read-only field user context 
    const creatorName = user?.displayName || "Anonymous";
    const userEmail = user?.email || "";
    const creatorImage = user?.photoURL || "";

    const habitData = {
      habitName,
      shortDescription,
      fullDescription,
      category,
      reminderTime,
      imageURL,
      creatorName,
      userEmail,
      creatorImage,
      createDate: new Date().toISOString(),
      completionHistory: [],
    };

    try {
      setLoading(true);

      // save at my-habit
      const res = await fetch("https://habituo-server.vercel.app/myhabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      const data = await res.json();

      if (data.insertedId) {
        // save at public collection
        try {
          await fetch("https://habituo-server.vercel.app/publicHabits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(habitData),
          });
        } catch (err) {
          console.error("Public sync error:", err);
        }

        toast.success("🎯 Habit published successfully!");
        form.reset();
      } else {
        toast.error("Database error! Could not save.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Check console!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] py-12 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* Left Section (Identity) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-zinc-800">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Create Your <br />
              <span className="text-indigo-600 dark:text-indigo-400 font-serif italic">Daily Ritual.</span>
            </h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Every time you add a new habit here, it is added to your personal dashboard and community feed simultaneously.
            </p>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-indigo-500/10">
            <div className="flex items-center gap-2 mb-4 italic text-sm opacity-80">
              <FiLock /> Locked Identity (Auto-filled)
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase opacity-60 ml-1">Creator Name</label>
                <div className="w-full bg-white/10 rounded-xl py-3 px-4 text-sm font-medium">{user?.displayName}</div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase opacity-60 ml-1">Email</label>
                <div className="w-full bg-white/10 rounded-xl py-3 px-4 text-sm font-medium">{user?.email}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section (Form) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-white dark:bg-[#111] p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-zinc-800 shadow-sm"
        >
          <form onSubmit={handleAddHabit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Habit Title</label>
              <input name="habitName" type="text" placeholder="E.g. Morning Meditation" className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 transition-all outline-none dark:text-white" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Category</label>
                <select name="category" className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 outline-none dark:text-white">
                  <option value="Morning">Morning</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Work">Work</option>
                  <option value="Evening">Evening</option>
                  <option value="Evening">Study</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Reminder Time</label>
                <input name="reminderTime" type="time" className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 outline-none dark:text-white" required />
              </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
                <input name="imageURL" type="url" placeholder="https://unsplash.com/..." className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 outline-none dark:text-white" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Short Pitch</label>
              <input name="shortDescription" type="text" placeholder="What's the goal?" className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 outline-none dark:text-white" required />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">The Details</label>
              <textarea name="fullDescription" placeholder="Science behind this habit..." className="w-full bg-slate-50 dark:bg-[#1a1a1a] border-none rounded-2xl py-4 px-6 outline-none h-32 resize-none dark:text-white" required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              {loading ? "SAVING..." : <><FiPlusCircle className="text-xl" /> PUBLISH HABIT</>}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddHabit;