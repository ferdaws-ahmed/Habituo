
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FiAlertCircle } from 'react-icons/fi';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-4 w-10/12 mx-auto">
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-lg text-center"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 15 }}
      >
        <motion.div
          className="text-7xl text-red-500 mb-6 animate-bounce inline-block"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FiAlertCircle />
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          Oops! Something went wrong
        </motion.h1>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you are looking for might be under maintenance or does not exist.
        </motion.p>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
