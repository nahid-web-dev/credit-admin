import React, { useEffect, useState } from 'react';
import { FaBars, FaHome, FaUser, FaCog, FaSignOutAlt, FaLink } from 'react-icons/fa';
import { MdDashboard, MdRestaurantMenu } from 'react-icons/md';
import { NavLink, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ isUserAuthenticated, setIsUserAuthenticated, userData, setUserData }) => {
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem('isUserAuthenticated')
    localStorage.removeItem('userData')
    setIsUserAuthenticated(false)
    setUserData(null)
    toast.success('Logout Successful!')
    navigate('/login')
  }

  if (!isUserAuthenticated || !userData) {
    return (
      <div></div>
    )
  }

  return (
    <div className=' z-20'>
      <div className={`flex !h-screen fixed md:sticky top-0 left-0 bg-sky-700 pt-[10vh] transition-all duration-300 ease-in ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:w-64 w-[90vw] max-w-64 `}>
        {/* Sidebar */}
        <div className={`  text-white shadow-lg w-full overflow-y-scroll hide-scrollbar`} >
          <div className="flex items-center justify-between px-4 py-3 border-b border-sky-500">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            {/* <button
              className="text-white md:hidden"
              onCNavLinkck={toggleSidebar}
            >
              ✕
            </button> */}
          </div>

          <div className="mt-4 space-y-2 ">
            <NavLink to='/dashboard' className="px-4 py-2 hover:bg-sky-600 flex items-center gap-3 cursor-pointer transition-all" >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to='/links' className="px-4 py-2 hover:bg-sky-600 transition-all flex items-center gap-3 cursor-pointer">
              <FaLink className="text-xl" />
              <span>Links</span>
            </NavLink>

            {
              userData?.role == 'admin' || userData?.role == 'manager' ? <NavLink to='/users' className="px-4 py-2 hover:bg-sky-600 transition-all flex items-center gap-3 cursor-pointer">
                <FaUser className="text-xl" />
                <span>Users</span>
              </NavLink>
                : null
            }

          </div>

          <button onClick={logout} className="px-4 py-4 w-[90%] absolute bottom-8 left-1/2 -translate-x-1/2 rounded-xl bg-blue-500 transition-colors flex items-center gap-3 cursor-pointer">
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </div>

        {/* Main content */}
      </div>
      <div className="flex-1">
        {/* Toggle button */}
        <button
          className="fixed top-16 right-4 z-30 text-2xl text-white bg-slate-600/70 backdrop-blur-sm p-3 rounded-lg md:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <MdRestaurantMenu /> : <FaBars />}
        </button>

      </div>
    </div>
  );

};

export default Navbar;
