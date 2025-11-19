import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const FeaturedHabits = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("https://habituo-server.vercel.app/featuresHabit")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched habits:", data);
        setHabits(data);
      })
      .catch((error) => console.log("Error fetching habits:", error));
  }, []);

  return (
    <div className="py-14 px-5 bg-gradient-to-b from-gray-100/80 via-gray-50/80 to-white/80 dark:from-[#273a70] dark:via-[#1e2d57] dark:to-[#252557] mt-10 border rounded-2xl">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
        🌟 Featured Habits
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {habits && habits.length > 0 ? (
          habits.map((habit, i) => (
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
                    {habit.shortDescription}
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

                {/* Button at the very bottom */}
                <div className="mt-auto">
                  <Link  to={`/habit-details/${habit._id}`}>
                  <button className="w-full py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200">
                    View Details
                  </button>
                  </Link>
                  
                </div>
              </div>

              {/* Decorative Bottom Bar */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No habits found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedHabits;
