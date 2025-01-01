import React from 'react';
import { FaRegThumbsUp, FaCalendarDay, FaCalendarMinus } from 'react-icons/fa';

const ClicksOverview = ({ totalClicks, todayClicks, yesterdayClicks }) => {
  const boxData = [
    {
      title: 'Total Clicks',
      icon: <FaRegThumbsUp className="text-3xl text-blue-500" />,
      data: totalClicks,
      bgColor: 'bg-blue-50 border-animation-blue',
    },
    {
      title: 'Today\'s Clicks',
      icon: <FaCalendarDay className="text-3xl text-green-500" />,
      data: todayClicks,
      bgColor: 'bg-green-50 border-animation-green',
    },
    {
      title: 'Yesterday\'s Clicks',
      icon: <FaCalendarMinus className="text-3xl text-yellow-500" />,
      data: yesterdayClicks,
      bgColor: 'bg-yellow-50 border-animation-yellow',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {boxData.map((box, index) => (
        <div
          key={index}
          className={`relative flex flex-col items-center justify-center ${box.bgColor} p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg`}
        >
          <div className="mb-4">{box.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{box.title}</h3>
          <ul className="text-gray-700 text-center">
            {box.data ? (
              Object.entries(box.data).map(([name, count]) => (
                <li key={name} className="flex justify-between text-sm sm:text-base w-full px-4">
                  <span className="font-semibold text-xl">{name} : </span>
                  <span className=' text-xl font-semibold'> ____{count}</span>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ClicksOverview;
