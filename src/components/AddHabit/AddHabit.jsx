import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const habitData = {
      habitName: form.habitTitle.value,
      shortDescription: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      imageURL: form.imageURL.value,
      creatorName: user.displayName || "Unknown",
      userEmail: user.email,
      createDate: new Date(),
    };

    if (!habitData.habitName || !habitData.shortDescription) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);
      //Insert into myhabit collection
      const res = await fetch("https://habituo-server.vercel.app/myhabit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(habitData),
      });

      const data = await res.json();

      if (data.insertedId) {
        toast.success("Habit added successfully!");

        //  Insert into public-habits collection
        try {
          await fetch("https://habituo-server.vercel.app/publicHabits", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(habitData),
          });
        } catch (err) {
          console.error("Failed to add habit to public-habits:", err);
          toast.warning(
            "Habit added to your collection, but failed to add to public habits"
          );
        }

        form.reset();
      } else {
        toast.error("Failed to add habit. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="card bg-white dark:bg-gray-800 shadow-xl rounded-2xl w-full max-w-lg p-6">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-indigo-700 dark:text-indigo-300">
          Add New Habit
        </h2>

        <form onSubmit={handleAddHabit} className="space-y-4">
          {/* Habit Title */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Habit Title
            </label>
            <input
              type="text"
              name="habitTitle"
              placeholder="Morning Meditation"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Short description of your habit..."
              className="input input-bordered w-full h-24"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select name="category" className="input input-bordered w-full">
              <option value="Morning">Morning</option>
              <option value="Work">Work</option>
              <option value="Fitness">Fitness</option>
              <option value="Evening">Evening</option>
              <option value="Study">Study</option>
            </select>
          </div>

          {/* Reminder Time */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Reminder Time
            </label>
            <input type="time" name="reminderTime" className="input input-bordered w-full" />
          </div>

          {/* Image URL */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Image URL (optional)
            </label>
            <input
              type="url"
              name="imageURL"
              placeholder="https://example.com/image.jpg"
              className="input input-bordered w-full"
            />
          </div>

          {/* User Info */}
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="label font-semibold text-gray-700 dark:text-gray-300">
              Your Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2 text-lg font-bold"
          >
            {loading ? "Saving..." : "Add Habit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;
