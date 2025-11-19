import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router"; // <- updated import

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://habituo-server.vercel.app/publicHabits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setFilteredHabits(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching habits:", error);
        setLoading(false);
      });
  }, []);

  // Dynamic Search + Filter
  useEffect(() => {
    let results = habits;

    if (category !== "All") {
      results = results.filter(
        (habit) =>
          habit.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      results = results.filter(
        (habit) =>
          habit.habitName.toLowerCase().includes(term) ||
          habit.shortDescription?.toLowerCase().includes(term)
      );
    }

    setFilteredHabits(results);
  }, [search, category, habits]);

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
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
      <p className="mt-6 text-gray-600 font-semibold text-lg tracking-wide animate-pulse">
        Loading awesome habits...
      </p>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-white dark:from-[#3d84dc] dark:via-[#58e28f] dark:to-[#cae640]">
      <div className="flex-grow py-14 px-5">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-red-600">
          Browse Public Habits
        </h2>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 max-w-5xl mx-auto mb-10">
          <input
            type="text"
            placeholder="🔍 Search habits..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredHabits.map((habit, i) => (
              <div
                key={habit._id || i}
                className="flex flex-col justify-between relative overflow-hidden rounded-2xl shadow-lg group hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="relative z-10 p-6 bg-white/70 dark:bg-gray-800/80 backdrop-blur-md flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2 group-hover:text-pink-500 transition-colors">
                      {habit.habitName}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                      {habit.shortDescription || "No description available."}
                    </p>
                    <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        <strong>👤 Creator:</strong> {habit.creatorName || "Unknown"}
                      </p>
                      <p>
                        <strong>📂 Category:</strong> {habit.category || "General"}
                      </p>
                      <p>
                        <strong>🕒 Created:</strong>{" "}
                        {new Date(habit.createDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <Link to={`/habit-details/${habit._id}`}>
                      <button className="w-full py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Decorative Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[60vh]">
            <p className="text-center text-gray-500 text-lg">No habits found 😔</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;
