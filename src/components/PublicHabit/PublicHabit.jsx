import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router";
import { FiSearch, FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [displayHabits, setDisplayHabits] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    fetch("https://habituo-server.vercel.app/publicHabits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        const params = new URLSearchParams(location.search);
        const categoryFromUrl = params.get("category") || "All";
        applyFilters(data, categoryFromUrl, search, 1);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const applyFilters = (allData, currentCat, currentSearch, currentPage) => {
    let filtered = allData.filter((h) => {
      const matchesCategory = currentCat === "All" || h.category?.toLowerCase() === currentCat.toLowerCase();
      const matchesSearch = h.habitName.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    const paginatedData = filtered.slice(0, currentPage * itemsPerPage);
    setDisplayHabits(paginatedData);
    setHasMore(paginatedData.length < filtered.length);
  };

  useEffect(() => {
    setPage(1);
    applyFilters(habits, category, search, 1);
  }, [category, search, habits]);

  const fetchMoreData = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    applyFilters(habits, category, search, nextPage);
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#0b0f1a]">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0f1a]">
      {/* Header & Filters*/}
      <header className="pt-20 pb-10 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
          Global <span className="text-indigo-600 italic">Habits.</span>
        </h1>
      </header>

      {/* Sticky Search & Filter Bar */}
      <div className="sticky top-0 z-30 px-6 py-4 bg-[#f8fafc]/80 dark:bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Search habits..."
              value={search}
              className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:text-white font-medium"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-48 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold dark:text-white cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {displayHabits.length > 0 ? (
          <InfiniteScroll
            dataLength={displayHabits.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="flex justify-center py-10"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayHabits.map((habit) => (
                <motion.div
                  key={habit._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
                >
                  {/* Top Image & Category */}
                  <div className="h-44 relative overflow-hidden">
                    <img 
                      src={habit.imageURL || "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b"} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      alt="" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                        {habit.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex flex-col flex-1">
                    {/* Creator Info */}
                    <div className="flex items-center gap-3 mb-4">
                        <img 
                            src={habit.creatorImage || `https://ui-avatars.com/api/?name=${habit.creatorName}`} 
                            className="w-8 h-8 rounded-full border border-indigo-100 dark:border-indigo-900" 
                            alt={habit.creatorName} 
                        />
                        <div className="text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1 tracking-tighter">Architect</p>
                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{habit.creatorName}</h4>
                        </div>
                    </div>

                    <h3 className="text-xl font-black dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors text-left">
                      {habit.habitName}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 font-medium text-left">
                      {habit.shortDescription}
                    </p>

                    {/* Metadata: Time & Date */}
                    <div className="mt-auto grid grid-cols-2 gap-2 mb-6 py-4 border-t border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <FiClock className="text-indigo-500" size={14} />
                            <span className="text-[11px] font-bold tracking-tight">{habit.reminderTime || "Anytime"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 justify-end">
                            <FiCalendar className="text-indigo-500" size={14} />
                            <span className="text-[11px] font-bold tracking-tight">
                                {new Date(habit.createDate).toLocaleDateString("en-GB")}
                            </span>
                        </div>
                    </div>

                    <Link to={`/habit-details/${habit._id}`}>
                      <button className="w-full py-3.5 bg-slate-900 dark:bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                        Explore Habit <FiArrowRight />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          /* No Results  */
          <div className="py-20 bg-white dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
             <p className="text-slate-400 font-black uppercase tracking-widest">No Habits Found Matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;