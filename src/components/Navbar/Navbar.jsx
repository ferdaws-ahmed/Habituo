import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import { FaUserCircle, FaSun, FaMoon, FaChevronDown } from "react-icons/fa"; 
import { HiMenu, HiX } from "react-icons/hi";
import { TbBrain } from "react-icons/tb";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.log(err));
    setUserMenuOpen(false);
  };

  const linkStyle = ({ isActive }) =>
    `font-semibold transition-all duration-300 px-3 py-2 rounded-md ${
      isActive
        ? "text-primary bg-primary/10"
        : "hover:text-primary hover:bg-base-200 dark:hover:bg-gray-800 dark:text-gray-300"
    }`;

 
  const commonLinks = (
    <>
      <li><NavLink to="/" className={linkStyle}>Home</NavLink></li>
      <li><NavLink to="/tour-habituo" className={linkStyle}>Tour Habituo</NavLink></li>
    </>
  );

  const extraLinks = (
    <>
      <li><NavLink to="/browsePublicHabits" className={linkStyle}>Browse Habits</NavLink></li>
      <li><NavLink to="/contact" className={linkStyle}>Contact Us</NavLink></li>
    </>
  );

  return (
    <nav className="navbar bg-base-100 dark:bg-slate-900 shadow-sm sticky top-0 z-50 px-4 md:px-10 border-b border-base-200 dark:border-gray-800 transition-colors duration-500">
      
      <div className="navbar-start">
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost btn-circle text-2xl dark:text-white"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <TbBrain className="text-3xl text-primary hover:rotate-180 transition-all" />
          <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Habituo
          </span>
        </Link>
      </div>

      {/* --- Desktop Menu --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2 px-1">
          {commonLinks}
          {extraLinks}
          
          {user && (
            <li className="relative group">
              <button className={`${linkStyle({isActive: false})} flex items-center gap-1 cursor-pointer`}>
                Activity <FaChevronDown className="text-[10px] group-hover:rotate-180 transition-transform" />
              </button>
              
              {/* Dropdown Box */}
              <ul className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <li><NavLink to="/dashboard/addHabit" className={linkStyle}>Add Habit</NavLink></li>
                <li className="mt-1"><NavLink to="/dashboard/myHabits" className={linkStyle}>My Habit</NavLink></li>
              </ul>
            </li>
          )}

          
        </ul>
      </div>

      <div className="navbar-end gap-3">
        <button 
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-xl"
        >
          {theme === "light" ? <FaMoon className="text-slate-700" /> : <FaSun className="text-yellow-400" />}
        </button>

        {user ? (
          <div className="relative">
            <div 
              className="avatar online cursor-pointer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 dark:ring-offset-slate-900 ring-offset-2">
                <img 
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://i.ibb.co/placeholder.png"} 
                  alt="Profile" 
                />
              </div>
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 mt-4 w-56 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 z-50 p-3">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 mb-2 text-center">
                  <p className="font-bold text-base dark:text-white">{user.displayName || "User"}</p>
                  <p className="text-xs opacity-60 dark:text-gray-400">{user.email}</p>
                </div>
                <div className="flex flex-col gap-2"> 
                  <Link to={'/dashboard/profile'}><button className="btn btn-error btn-sm btn-block hover:bg-amber-400">Profile</button></Link>
                  <Link to={'/dashboard'}><button className="btn btn-error btn-sm btn-block hover:bg-amber-400">Dashboard</button></Link>
                  <button onClick={handleLogout} className="btn btn-error btn-sm btn-block hover:bg-amber-400">Logout</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm rounded-full">Login</Link>
        )}
      </div>

      {/* --- Mobile Menu --- */}
      {menuOpen && (
        <div className="absolute top-[68px] left-0 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 lg:hidden p-4 z-[60]">
          <ul className="flex flex-col gap-2">
            {commonLinks}
            
           {extraLinks}
            {user && (
              <>
                <li><NavLink to="/dashboard/addHabit" className={linkStyle}>Add Habit</NavLink></li>
                <li><NavLink to="/dashboard/myHabits" className={linkStyle}>My Habit</NavLink></li>
              </>
            )}

            
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;