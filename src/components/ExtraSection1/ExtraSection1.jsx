
import React from "react";
import Marquee from "react-fast-marquee";
import { BoltIcon, HeartIcon, FireIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

const cardData = [
  {
    id: 1,
    title: "Build Daily Habits",
    description: "Track your daily habits and stay consistent with your goals.",
    icon: <CalendarDaysIcon className="w-10 h-10 text-indigo-400" />,
  },
  {
    id: 2,
    title: "Stay Motivated",
    description: "Get reminders and notifications to keep your habit streak alive.",
    icon: <BoltIcon className="w-10 h-10 text-yellow-400" />,
  },
  {
    id: 3,
    title: "Improve Yourself",
    description: "Small daily actions lead to big improvements over time.",
    icon: <FireIcon className="w-10 h-10 text-orange-400" />,
  },
  {
    id: 4,
    title: "Loved by Users",
    description: "Join thousands of users improving their life one habit at a time.",
    icon: <HeartIcon className="w-10 h-10 text-red-400" />,
  },
];

const ExtraSection1 = () => {
  return (
    <section className="bg-gray-900 py-12 mt-10 border rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">
        🚀 Why Choose Habituo?
      </h2>

      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        <div className="flex space-x-6 px-4">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="bg-gray-800 text-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center min-w-[220px] hover:scale-105 transform transition"
            >
              {card.icon}
              <h3 className="mt-4 font-semibold text-lg text-center">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-300 text-center">{card.description}</p>
            </div>
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default ExtraSection1;
