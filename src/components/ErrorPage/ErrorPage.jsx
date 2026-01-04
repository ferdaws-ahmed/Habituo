import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const ErrorPage = () => {
  const navigate = useNavigate();

  // প্রতিটি সংখ্যার জন্য আলাদা অ্যানিমেশন ভেরিয়েন্ট
  const numberVariants = {
    animate: (i) => ({
      y: [0, -30, 0],
      rotate: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.4,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center overflow-hidden font-sans relative">
      
      {/* Background: Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main 404 Section */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Animated Numbers - Elegant Floating */}
        <div className="flex gap-4 md:gap-8 mb-4">
          {[4, 0, 4].map((num, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={numberVariants}
              animate="animate"
              whileHover={{ scale: 1.1, color: "#a855f7" }}
              className="text-[10rem] md:text-[18rem] font-black text-white cursor-default select-none transition-colors duration-300"
              style={{
                textShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}
            >
              {num}
            </motion.span>
          ))}
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light text-gray-400 tracking-[0.3em] uppercase mb-12">
            The page has <span className="text-white font-medium">Vanished</span>
          </h2>

          {/* New Interactive Buttons */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <motion.button
              whileHover={{ y: -5, backgroundColor: "white", color: "black" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="group flex items-center gap-3 px-8 py-4 border border-white/20 text-white rounded-full transition-all duration-300"
            >
              <FiHome className="text-xl" />
              <span className="font-medium tracking-wide">Return Home</span>
            </motion.button>

            <motion.button
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors duration-300"
            >
              <FiArrowLeft />
              <span>Go Back</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Line */}
      <div className="absolute bottom-20 left-0 w-full flex justify-center opacity-20 px-10">
        <div className="h-[1px] w-full max-w-7xl bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      {/* Corner Labels */}
      <div className="absolute top-10 left-10 overflow-hidden hidden md:block">
        <motion.p 
          initial={{ x: -100 }} animate={{ x: 0 }}
          className="text-[10px] text-gray-600 tracking-[0.5em] uppercase"
        >
          Habituo // Error Log
        </motion.p>
      </div>
    </div>
  );
};

export default ErrorPage;