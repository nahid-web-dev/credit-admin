import React from 'react';
import { FaRegThumbsUp, FaCalendarDay, FaCalendarMinus, FaChartLine, FaExternalLinkAlt, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ClicksOverview = ({ totalClicks, todayClicks, yesterdayClicks }) => {
  const boxData = [
    {
      title: 'Total Clicks',
      icon: <FaChartLine className="text-3xl text-white" />,
      data: totalClicks,
      bgGradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-400',
      delay: 0,
    },
    {
      title: 'Today\'s Clicks',
      icon: <FaCalendarDay className="text-3xl text-white" />,
      data: todayClicks,
      bgGradient: 'from-sky-500 to-sky-600',
      iconBg: 'bg-sky-400',
      delay: 0.1,
    },
    {
      title: 'Yesterday\'s Clicks',
      icon: <FaCalendarMinus className="text-3xl text-white" />,
      data: yesterdayClicks || {}, // Ensure we have an object even if yesterdayClicks is null/undefined
      bgGradient: 'from-indigo-500 to-indigo-600',
      iconBg: 'bg-indigo-400',
      delay: 0.2,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const dataItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {boxData.map((box, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className={`relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100`}
        >
          {/* Top gradient header */}
          <div className={`bg-gradient-to-r ${box.bgGradient} p-4 text-white`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{box.title}</h3>
              <div className={`${box.iconBg} p-3 rounded-full`}>
                {box.icon}
              </div>
            </div>
          </div>

          {/* Content area */}
          <div className="p-5">
            {box.data && Object.keys(box.data).length > 0 ? (
              <ul className="space-y-3 mt-2">
                {Object.entries(box.data).map(([name, count], idx) => (
                  <motion.li
                    key={name}
                    variants={dataItemVariants}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-700 flex items-center">
                      <FaExternalLinkAlt className="text-xs mr-2 text-gray-400" />
                      {name}
                    </span>
                    <span className="font-bold text-lg text-gray-800">{count}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <motion.div
                variants={dataItemVariants}
                className="flex flex-col items-center justify-center h-32 text-center"
              >
                <FaRegClock className="text-3xl text-gray-300 mb-2" />
                <p className="text-gray-500">No data available yet</p>
              </motion.div>
            )}
          </div>

          {/* Bottom info */}
          <div className="px-5 py-3 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ClicksOverview;
