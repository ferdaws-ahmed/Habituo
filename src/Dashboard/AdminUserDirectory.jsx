import React, { useEffect, useState } from "react";
import { FiSearch, FiUserCheck, FiUserX, FiTrash2, FiMail, FiShield, FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const UserDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://habituo-server.vercel.app/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (email, newRole) => {
    try {
      const res = await fetch(`https://habituo-server.vercel.app/users/role/${email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        toast.success(`User updated to ${newRole}`);
        fetchUsers();
      }
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 md:space-y-8"
    >
      {/* Header & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black dark:text-white tracking-tight">User Directory</h1>
          <p className="text-slate-500 text-xs md:text-sm font-medium italic">Manage Habituo ecosystem citizens</p>
        </div>

        <div className="relative group w-full lg:w-96">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-12 pr-4 py-3 md:py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl md:rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-sm font-bold"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-xl md:rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <p className="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-widest">Total Users</p>
            <p className="text-xl md:text-2xl font-black dark:text-white">{users.length}</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl md:rounded-2xl border border-emerald-100 dark:border-emerald-800">
            <p className="text-[9px] md:text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active Admins</p>
            <p className="text-xl md:text-2xl font-black dark:text-white">{users.filter(u => u.role === 'admin').length}</p>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[700px] md:min-w-full">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 md:px-8 py-4 md:py-5 text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <AnimatePresence>
                {filteredUsers.map((u) => (
                  <motion.tr 
                    key={u._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="px-6 md:px-8 py-4 md:py-5">
                      <div className="flex items-center gap-3 md:gap-4">
                        <img 
                          src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}&background=random`} 
                          className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-indigo-500/20 transition-all"
                          alt="user" 
                        />
                        <div className="max-w-[120px] md:max-w-none">
                          <p className="font-black text-xs md:text-sm dark:text-slate-200 truncate">{u.name}</p>
                          <p className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1 font-medium truncate">
                            <FiMail className="text-[9px] shrink-0" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-5">
                      <span className={`text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 rounded-full uppercase tracking-tighter ${
                        u.role === 'admin' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'
                      }`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-5">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-emerald-500">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="hidden xs:inline">Active</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-5 text-right">
                      <div className="flex justify-end gap-1.5 md:gap-2">
                        {u.role !== 'admin' ? (
                          <button 
                            onClick={() => handleRoleChange(u.email, 'admin')}
                            title="Make Admin"
                            className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                          >
                            <FiShield size={14} className="md:w-[16px]" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleRoleChange(u.email, 'user')}
                            title="Remove Admin"
                            className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                          >
                            <FiUserX size={14} className="md:w-[16px]" />
                          </button>
                        )}
                        <button className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                          <FiTrash2 size={14} className="md:w-[16px]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="p-12 md:p-20 text-center flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <FiFilter size={20} className="md:w-[24px]" />
            </div>
            <p className="font-black text-slate-400 uppercase text-[10px] md:text-xs tracking-widest">No users found matching your search</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserDirectory;