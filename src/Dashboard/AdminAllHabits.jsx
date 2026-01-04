import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiStar, FiSearch, FiClock, FiEye } from "react-icons/fi";
import Swal from "sweetalert2";

const AllHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = () => {
    setLoading(true);
    fetch("https://habituo-server.vercel.app/publicHabits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const TableSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5].map((item) => (
        <tr key={item} className="animate-pulse border-b dark:border-slate-800">
          <td className="px-4 md:px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-200 dark:bg-slate-800 rounded-xl md:rounded-2xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 md:w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-32 md:w-48 bg-slate-100 dark:bg-slate-800/50 rounded"></div>
              </div>
            </div>
          </td>
          <td className="hidden md:table-cell px-6 py-5"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div></td>
          <td className="hidden lg:table-cell px-6 py-5"><div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div></td>
          <td className="px-4 md:px-6 py-5"><div className="flex justify-end gap-3"><div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div></div></td>
        </tr>
      ))}
    </>
  );

  const handleToggleFeature = (habit) => {
    const actionText = habit.isFeatured ? "remove from featured" : "mark as featured";
    Swal.fire({
      title: "Confirm Action",
      text: `Do you want to ${actionText} this habit?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      confirmButtonText: "Yes, Confirm",
      background: "#0f172a",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = !habit.isFeatured;
        fetch(`https://habituo-server.vercel.app/publicHabits/feature/${habit._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFeatured: newStatus }),
        })
        .then(res => res.json())
        .then(() => {
          setHabits(habits.map(h => h._id === habit._id ? { ...h, isFeatured: newStatus } : h));
          Swal.fire("Updated!", `Habit status updated.`, "success");
        });
      }
    });
  };

  const handleDelete = (habit) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the habit from all collections!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete Everywhere",
      background: "#0f172a",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://habituo-server.vercel.app/publicHabits/${habit._id}`, { 
          method: "DELETE" 
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setHabits(habits.filter((h) => h._id !== habit._id));
            Swal.fire("Success!", "Habit removed from both databases.", "success");
          }
        })
        .catch(err => {
          console.error(err);
          Swal.fire("Error", "Could not complete delete request", "error");
        });
      }
    });
  };

  const filteredHabits = habits.filter(h => h.habitName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-2 md:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-10 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white uppercase tracking-tighter">System <span className="text-indigo-600">Blueprints</span></h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm italic">Audit and curate global habits library</p>
        </div>
        <div className="relative w-full lg:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by habit name..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[#0f172a] rounded-[1.5rem] md:rounded-[2rem] border dark:border-slate-800 overflow-hidden shadow-xl overflow-x-auto scrollbar-hide">
        <table className="w-full text-left min-w-[600px] md:min-w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
            <tr>
              <th className="px-4 md:px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Habit Details</th>
              <th className="hidden md:table-cell px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Architect</th>
              <th className="hidden lg:table-cell px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category & Time</th>
              <th className="px-4 md:px-6 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            <AnimatePresence mode="wait">
              {loading ? (
                <TableSkeleton />
              ) : (
                filteredHabits.map((habit) => (
                  <motion.tr 
                    key={habit._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="hover:bg-slate-50/50 dark:hover:bg-indigo-500/[0.02] transition-colors group"
                  >
                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img src={habit.imageURL} className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0" alt="" />
                        <div className="max-w-[120px] md:max-w-[200px]">
                          <p className="font-black text-sm md:text-base text-slate-800 dark:text-slate-200 truncate">{habit.habitName}</p>
                          <p className="text-[10px] md:text-[11px] text-slate-400 line-clamp-1">{habit.shortDescription}</p>
                          {/* Mobile-only info */}
                          <div className="md:hidden mt-1 flex flex-wrap gap-1">
                            <span className="text-[8px] font-black uppercase text-indigo-500">{habit.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="hidden md:table-cell px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={habit.creatorImage || "https://i.ibb.co/5GzXkwq/user.png"} 
                          className="w-8 h-8 rounded-full border dark:border-slate-700 object-cover" 
                          alt="" 
                        />
                        <div>
                          <p className="text-xs font-black dark:text-slate-300">{habit.creatorName || "Unknown"}</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[100px]">{habit.userEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden lg:table-cell px-6 py-5">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black uppercase text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded w-fit">
                          {habit.category}
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <FiClock size={12} /> {habit.createDate}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 md:px-6 py-4 md:py-5">
                      <div className="flex justify-end gap-1.5 md:gap-3">
                        <button 
                          onClick={() => navigate(`/habit-details/${habit._id}`)}
                          className="p-2 md:p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl text-slate-400 hover:text-indigo-500 transition-all shadow-sm"
                        >
                          <FiEye className="text-sm md:text-lg" />
                        </button>

                        <button 
                          onClick={() => handleToggleFeature(habit)}
                          className={`p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all shadow-sm border ${
                            habit.isFeatured 
                            ? 'bg-amber-500 border-amber-400 text-white' 
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-amber-500'
                          }`}
                        >
                          <FiStar className="text-sm md:text-lg" fill={habit.isFeatured ? "currentColor" : "none"} />
                        </button>

                        <button 
                          onClick={() => handleDelete(habit)}
                          className="p-2 md:p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg md:rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"
                        >
                          <FiTrash2 className="text-sm md:text-lg" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Mobile Empty State adjustment */}
      {!loading && filteredHabits.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-400 font-bold">No blueprints found.</p>
        </div>
      )}
    </div>
  );
};

export default AllHabits;