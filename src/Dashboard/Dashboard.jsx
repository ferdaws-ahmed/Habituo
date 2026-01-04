import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Link, useNavigate, NavLink, Outlet, useLocation } from "react-router"; 
import { 
  FiGrid, FiPlus, FiUsers, FiBarChart2, 
  FiShield, FiCheckSquare, FiActivity, FiAward, 
  FiLogOut, FiHome, FiSun, FiMoon, 
  FiArrowLeft, FiTrendingUp,
  FiAnchor,
  FiArchive,
  FiUser,
} from "react-icons/fi";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchRole = async () => {
      if (user?.email) {
        try {
          const res = await fetch(`https://habituo-server.vercel.app/users/${user.email}`);
          const data = await res.json();
          setRole(data?.role || "user");
          setLoading(false);
        } catch (err) {
          setRole("user");
          setLoading(false);
        }
      }
    };
    fetchRole();
  }, [user]);

  const handleLogout = () => {
    logOut().then(() => navigate("/"));
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617]">
      <div className="w-12 h-12 lg:w-16 lg:h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-black text-indigo-600 tracking-widest animate-pulse uppercase text-xs lg:text-sm">Initializing Habituo Core</p>
    </div>
  );

  const menuItems = role === "admin" ? [
    { name: "Admin HQ", icon: <FiShield />, path: "/dashboard" },
    { name: "User Directory", icon: <FiUsers />, path: "/dashboard/user-directory" },
    { name: "Global Analytics", icon: <FiBarChart2 />, path: "/dashboard/global-analytics" },
    { name: "All Habits", icon: <FiArchive />, path: "/dashboard/all-habits" },
    { name: "System Logs", icon: <FiAnchor />, path: "/dashboard/system-log" },
    { name: "Admin Profile", icon: <FiUser />, path: "/dashboard/profile" },
    { name: "Add Habit", icon: <FiPlus />, path: "/dashboard/addHabit" },
    { name: "My Habits", icon: <FiGrid />, path: "/dashboard/myHabits" },
  ] : [
    { name: "Personal Hub", icon: <FiHome />, path: "/dashboard" },
    { name: "User Profile", icon: <FiUser />, path: "/dashboard/profile" },
    { name: "Add Habit", icon: <FiPlus/>, path: "/dashboard/addHabit" },
    { name: "My Habits", icon: <FiGrid />, path: "/dashboard/myHabits" },
    { name: "Milestones", icon: <FiAward />, path: "/dashboard/leaderboard" },
  ];

  return (
    <div className="flex min-h-screen bg-[#fcfdff] dark:bg-[#020617] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* --- SIDEBAR --- */}
      {/* Mobile-friendly width adjustments */}
      <aside className="fixed left-0 top-0 h-full w-16 md:w-20 lg:w-72 bg-white dark:bg-[#0b1120] border-r border-slate-100 dark:border-slate-800/60 z-50 shadow-xl overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-6 lg:p-8 mb-4">
          <Link to="/" className="text-xl lg:text-2xl font-black text-indigo-600 hidden lg:block tracking-tighter italic">
            HABITUO<span className="text-indigo-400">.</span>
          </Link>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl lg:hidden flex items-center justify-center text-white shadow-lg shadow-indigo-500/40 mx-auto font-black">H</div>
        </div>

        <nav className="px-2 md:px-4 space-y-2">
          {menuItems.map((item, index) => (
            <NavLink 
              key={index} 
              to={item.path} 
              end={item.path === "/dashboard"}
              className={({ isActive }) => `flex items-center justify-center lg:justify-start gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl transition-all group ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-indigo-600'}`}
            >
              <span className="text-lg md:text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold text-sm hidden lg:block">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 lg:p-6 border-t border-slate-50 dark:border-slate-800 space-y-3 bg-white dark:bg-[#0b1120]">
          <button onClick={toggleTheme} className="flex items-center justify-center lg:justify-start gap-4 p-3 w-full rounded-xl md:rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-yellow-400 font-bold text-[10px] uppercase tracking-wider">
            {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            <span className="hidden lg:block">Toggle Mode</span>
          </button>
          <button onClick={handleLogout} className="flex items-center justify-center lg:justify-start gap-4 p-3 w-full rounded-xl md:rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-bold text-[10px] uppercase tracking-wider">
            <FiLogOut size={18} />
            <span className="hidden lg:block">Disconnect</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      {/* Dynamic margin for sidebar width on mobile/tablet/desktop */}
      <main className="flex-1 ml-16 md:ml-20 lg:ml-72 p-4 md:p-8 lg:p-10">
        
        {/* Navbar Header */}
        <header className="flex justify-between items-center mb-6 md:mb-10">
          <div className="flex items-center gap-3 md:gap-4">
             <Link to="/" className="p-2 md:p-3 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg md:rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm">
                <FiArrowLeft size={16} />
             </Link>
             <h2 className="text-lg md:text-xl font-black tracking-tight hidden xs:block">Control <span className="text-indigo-600">Center</span></h2>
          </div>

          <div className="flex items-center gap-2 md:gap-4 bg-white dark:bg-slate-800 p-1.5 md:p-2 pr-3 md:pr-5 rounded-xl md:rounded-2xl border dark:border-slate-700 shadow-sm">
            <img src={user?.photoURL} className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border-2 border-indigo-500/10 object-cover" alt="user" />
            <div className="hidden sm:block text-right">
              <p className="text-[10px] md:text-xs font-black leading-none mb-1">{user?.displayName}</p>
              <div className="flex items-center justify-end gap-1">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[8px] md:text-[9px] text-slate-400 uppercase font-bold tracking-widest">{role} session</span>
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC RENDERING LOGIC --- */}
        {location.pathname === "/dashboard" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            
            {/* Dynamic Hero Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-10">
              <div className="xl:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 lg:p-12 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                       <span className="bg-white/10 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">System Protocol: Active</span>
                       <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mt-4 md:mt-6 mb-3 md:mb-4 leading-tight">
                         {role === 'admin' ? "Global Infrastructure & Governance." : "Architect your future with consistency."}
                       </h1>
                       <p className="text-indigo-100/80 max-w-md font-medium text-xs md:text-sm lg:text-base">
                         {role === 'admin' ? "Monitor user trends, system health, and global habit deployments." : "Your current success rate is 84%. Keep the streak alive!"}
                       </p>
                    </div>
                    <div className="mt-6 md:mt-8 flex flex-wrap gap-4">
                       <button className="bg-white text-indigo-600 px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase shadow-xl hover:translate-y-[-2px] transition-all">
                         {role === 'admin' ? "Quick Statistics" : "My Rituals"}
                       </button>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full -mr-16 -mt-16 md:-mr-32 md:-mt-32 blur-3xl"></div>
              </div>

              {/* Progress Circle Card */}
              <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border dark:border-slate-700 shadow-sm flex flex-col justify-center items-center text-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-700" />
                      <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="283" strokeDashoffset={283 - (283 * 84) / 100} strokeLinecap="round" className="text-indigo-500" />
                    </svg>
                    <div className="absolute font-black text-xl md:text-2xl dark:text-white">84%</div>
                  </div>
                  <p className="mt-4 text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">Efficiency Rate</p>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
               {[
                 { label: 'Energy Points', val: '2,400 XP', icon: <FiAward />, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                 { label: 'Weekly Intensity', val: '+14%', icon: <FiTrendingUp />, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                 { label: 'Global Standing', val: '#42', icon: <FiActivity />, color: 'text-fuchsia-500', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/30' },
                 { label: 'Subscription', val: 'PRO PLAN', icon: <FiShield />, color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-950/30' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-slate-800 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border dark:border-slate-700 flex items-center gap-4 md:gap-5 shadow-sm">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                    <div>
                      <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                      <p className="text-lg md:text-xl font-black dark:text-white">{stat.val}</p>
                    </div>
                 </div>
               ))}
            </div>

          </motion.div>
        ) : (
          <div className="mt-2 md:mt-4">
             <Outlet /> 
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;