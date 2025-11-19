
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

const HabitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  //Calculate streak based on completionHistory
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

  const getStreakIcon = (streak) => {
    if (streak >= 30) return "🏆";
    if (streak >= 15) return "🎯";
    if (streak >= 10) return "🔥";
    if (streak >= 5) return "💪";
    if (streak >= 3) return "✨";
    if (streak >= 2) return "👍";
    if (streak >= 1) return "😊";
    return "😐";
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
        console.error(err);
        toast.error("Failed to load habit details");
        setLoading(false);
      }
    };

    fetchHabit();
  }, [id]);

  const handleMarkComplete = async () => {
    if (!habit) return;

    const today = new Date().toISOString().split("T")[0];
    if (habit.completionHistory?.some((entry) => entry.date === today)) {
      toast.error("Already marked today!");
      return;
    }

    try {
      const newEntry = { userEmail: user.email, date: today };
      const updatedHistory = [...(habit.completionHistory || []), newEntry];

      // PATCH request to backend
      const res = await fetch(`https://habituo-server.vercel.app/publicHabits/${habit._id}/markComplete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completionHistory: updatedHistory }),
      });
      const data = await res.json();

      toast.success("Marked as complete!");
      setHabit((prev) => ({ ...prev, completionHistory: data.completionHistory }));
      setTodayCompleted(true);
      setCurrentStreak(calculateStreak(data.completionHistory));
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark complete!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner text-indigo-600 w-12 h-12"></span>
      </div>
    );

  if (!habit)
    return (
      <div className="text-center text-gray-500 py-20">Habit not found.</div>
    );

  const progressPercent = Math.floor(((habit.completionHistory?.length || 0) / 30) * 100);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
      {habit.imageURL && (
        <img
          src={habit.imageURL}
          alt={habit.habitName}
          className="w-full h-56 object-cover rounded-lg mb-6 border"
        />
      )}

      <h1 className="text-3xl font-bold text-indigo-600 mb-2">{habit.habitName}</h1>
      <p className="text-gray-600 mb-4">
        Category: <span className="font-medium">{habit.category || "General"}</span>
      </p>

      <p className="text-gray-500 mb-4">
        Creator: <span className="font-medium">{habit.creatorName || "Unknown"}</span> | Created:{" "}
        <span className="font-medium">
          {habit.createDate ? new Date(habit.createDate).toLocaleDateString() : "Unknown"}
        </span>
      </p>

      <p className="text-gray-700 mb-6">
        {habit.longDescription || habit.shortDescription || "No description available."}
      </p>

      <div className="mb-4">
        <div className="flex justify-between mb-1 text-gray-700">
          <span>Progress</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-indigo-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full font-semibold">
          {getStreakIcon(currentStreak)} Current Streak: {currentStreak} day{currentStreak > 1 ? "s" : ""}
        </span>
      </div>

      <p className="text-gray-700 mb-6">
        Completed Last 30 Days: {habit.completionHistory?.length || 0}
      </p>

      <button
        onClick={handleMarkComplete}
        disabled={todayCompleted}
        className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${
          !todayCompleted
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {todayCompleted ? "Completed Today" : "Mark Complete"}
      </button>
    </div>
  );
};

export default HabitDetails;
