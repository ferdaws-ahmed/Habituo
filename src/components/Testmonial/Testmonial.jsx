import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Product Designer",
      image: "https://i.pravatar.cc/150?u=alex",
      quote: "Habituo changed how I track my daily focus. The system blueprints are a game-changer for someone starting from scratch!",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      role: "Fitness Coach",
      image: "https://i.pravatar.cc/150?u=sarah",
      quote: "Managing my clients' habits and seeing their global stats helps me keep them motivated. Simple, clean, and very powerful.",
      rating: 5,
    },
    {
      id: 3,
      name: "David Chen",
      role: "Software Engineer",
      image: "https://i.pravatar.cc/150?u=david",
      quote: "The API speed and the minimal UI make habit tracking actually fun. I’ve integrated my morning routine seamlessly.",
      rating: 4,
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0b1120] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-black uppercase tracking-[0.3em] text-indigo-600 mb-3"
          >
            Community Voices
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black dark:text-white tracking-tighter"
          >
            Loved by habit <span className="text-indigo-600 italic">architects</span> worldwide.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-sm relative group"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    size={16} 
                    className={i < review.rating ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-700"} 
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-8 leading-relaxed italic">
                "{review.quote}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 border-t dark:border-slate-800 pt-6">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-indigo-500 p-0.5"
                />
                <div>
                  <h4 className="font-black dark:text-white text-sm uppercase tracking-wider">{review.name}</h4>
                  <p className="text-xs font-bold text-indigo-500">{review.role}</p>
                </div>
              </div>

              {/* Decorator */}
              <div className="absolute top-6 right-8 text-6xl font-serif text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                ”
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;