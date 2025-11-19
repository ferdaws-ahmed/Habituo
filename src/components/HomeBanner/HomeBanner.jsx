import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";

const slides = [
  {
    title: "Welcome to Habituo!",
    description: ["Build Habits.", "Stay Consistent.", "Achieve Goals."],
    subtext: "Start your journey towards a productive lifestyle today.",
    bgGradient: "bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800",
  },
  {
    title: "Track Your Progress",
    description: ["Daily Tracking.", "Boost Motivation.", "Stay on Track."],
    subtext: "Monitor your daily achievements and never lose focus.",
    bgGradient: "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700",
  },
  {
    title: "Achieve Your Dreams",
    description: ["Small Steps.", "Big Wins.", "Reach Success."],
    subtext: "Transform small habits into lifelong successes.",
    bgGradient: "bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600",
  },
];

const HomeBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden rounded-b-2xl shadow-lg">
      
      <div
        className={`absolute inset-0 transition-all duration-1000 ${slides[current].bgGradient}`}
      ></div>

    
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            index === current && (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
              >
                <h1 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md mb-2">
                  {slide.title}{" "}
                  <span className="text-yellow-300">
                    <Typewriter
                      words={slide.description}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={90}
                      deleteSpeed={50}
                      delaySpeed={1800}
                    />
                  </span>
                </h1>

                <p className="text-sm sm:text-lg text-gray-200 mb-4 drop-shadow-sm">
                  {slide.subtext}
                </p>

                
                <button
                  onClick={() => navigate("/login")}
                  className="w-[30%] md:w-[10%] mx-auto py-2 font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
                >
                  Get Started
                </button>
              </motion.div>
            )
        )}
      </AnimatePresence>

     
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === idx ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
