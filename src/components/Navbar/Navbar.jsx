import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { TbBrain } from "react-icons/tb"; 
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-red-500 font-bolder " : "hover:text-primary"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/addHabit"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-green-400 font-semibold " : "hover:text-primary"
            }`
          }
        >
          Add Habit
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myHabits"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-blue-600 font-semibold " : "hover:text-primary"
            }`
          }
        >
          My Habit
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/browsePublicHabits"
          className={({ isActive }) =>
            `font-medium transition-colors ${
              isActive ? "text-orange-500 font-semibold " : "hover:text-primary"
            }`
          }
        >
          Browse Public Habits
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.log(err));
    setUserMenuOpen(false);
  };

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      
      <div className="navbar-start">
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="btn btn-ghost text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <Link to="/" className="flex items-center gap-2">
          <TbBrain className="text-3xl text-primary drop-shadow-sm" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent tracking-wide">
            Habituo
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
      </div>

      <div className="navbar-end relative">
        {user ? (
          <div className="relative">
            <img 
              referrerPolicy="no-referrer"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              src={
                
                user.photoURL || user.reloadUserInfo?.photoUrl || "https://i.ibb.co/placeholder.png"
              }
              alt={user.displayName || "User"}
              className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
            />

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50 p-4">
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  {user.displayName || "User"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full btn btn-outline btn-error text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline btn-primary flex items-center gap-2 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-pink-500"
          >
            <FaUserCircle className="text-lg" />
            Login
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-base-100 shadow-md lg:hidden">
          <ul className="menu p-4">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
