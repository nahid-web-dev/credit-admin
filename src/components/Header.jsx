import React from 'react';
import { FaHome, FaHeart, FaBolt } from 'react-icons/fa';
import { GiMonkey } from 'react-icons/gi';
import { MdImageSearch } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

  const { pathname } = useLocation()


  return (
    <div className="text-gray-600 py-4 w-full border-b-2 border-gray-300">

      {/* Navigation Links */}
      <nav className=" flex gap-x-4 md:gap-x-8 px-6 hide-scrollbar w-full overflow-scroll">
        <Link
          to="/dashboard"
          className={`text-lg pb-1 sm:text-xl flex items-center px-1 border-b-2 transition-all hover:text-blue-400 ${pathname == '/dashboard' || pathname == '/dashboard/' || pathname == '/' ? 'border-blue-500' : 'border-transparent'} `}
        >
          <FaHome className="mr-2 text-blue-400" /> Gmail
        </Link>
        <Link
          to="/dashboard/tryst"
          className={`text-lg pb-1 sm:text-xl flex items-center px-1 border-b-2 transition-all hover:text-blue-400 ${pathname == '/dashboard/tryst' ? 'border-blue-500' : 'border-transparent'} `}
        >
          <FaHeart className="mr-2 text-blue-400" /> Tryst
        </Link>
        <Link
          to="/dashboard/mega"
          className={`text-lg pb-1 sm:text-xl flex items-center px-1 border-b-2 transition-all hover:text-blue-400 ${pathname == '/dashboard/mega' ? 'border-blue-500' : 'border-transparent'} `}
        >
          <FaBolt className="mr-2 text-blue-400" /> Mega
        </Link>
        <Link
          to="/dashboard/eroticmonkey"
          className={`text-lg pb-1 sm:text-xl flex items-center px-1 border-b-2 transition-all hover:text-blue-400 ${pathname == '/dashboard/eroticmonkey' ? 'border-blue-500' : 'border-transparent'} `}
        >
          <GiMonkey className="mr-2 text-blue-400" /> E.Monkey
        </Link>
        <Link
          to="/dashboard/adultsearch"
          className={`text-lg pb-1 sm:text-xl flex items-center px-1 border-b-2 transition-all hover:text-blue-400 ${pathname == '/dashboard/adultsearch' ? 'border-blue-500' : 'border-transparent'} `}
        >
          <MdImageSearch className="mr-2 text-blue-400" /> A.Search
        </Link>
      </nav>
    </div>
  );
};

export default Header;
