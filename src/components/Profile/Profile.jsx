import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiCalendar, FiAward, FiActivity, FiMapPin, FiX, FiCheck, FiLoader, FiCamera } from "react-icons/fi";
import Swal from "sweetalert2";

const Profile = () => {
  // ১. updateUserProfile ফাংশনটি কনটেক্সট থেকে আনা হয়েছে
  const { user, updateUserProfile } = useContext(AuthContext);
  const [habitCount, setHabitCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    name: "",
    location: "",
    photoURL: "",
    coverURL: "",
    previewPhotoFile: null,
    previewCoverFile: null,
  });

  const IMGBB_API_KEY = "815a66cca711317101c3c1db1fbff7c0"; 

  useEffect(() => {
    if (user?.email) {
      fetchUser();
      fetchHabitCount();
    }
  }, [user?.email]);

  const fetchUser = () => {
    fetch(`https://habituo-server.vercel.app/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDbUser(data);
        setEditData({
          name: data.name || user?.displayName || "Md. Ferdaws",
          location: data.location || "Global Citizen",
          photoURL: data.photoURL || user?.photoURL,
          coverURL: data.coverURL || "",
        });
      });
  };

  const fetchHabitCount = () => {
    fetch(`https://habituo-server.vercel.app/myhabit?userEmail=${user.email}`)
      .then((res) => res.json())
      .then((data) => setHabitCount(data.length));
  };

  const handleImageSelect = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setEditData({ ...editData, previewPhotoFile: file, photoURL: reader.result });
        } else {
          setEditData({ ...editData, previewCoverFile: file, coverURL: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.display_url;
  };

  const handleFinalSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPhotoURL = editData.photoURL;
      let finalCoverURL = editData.coverURL;

      if (editData.previewPhotoFile) {
        finalPhotoURL = await uploadImage(editData.previewPhotoFile);
      }
      if (editData.previewCoverFile) {
        finalCoverURL = await uploadImage(editData.previewCoverFile);
      }

      // update profile firebase 
      if (updateUserProfile) {
        await updateUserProfile(editData.name, finalPhotoURL);
      }

      const updatedDoc = {
        name: editData.name,
        location: editData.location,
        photoURL: finalPhotoURL,
        coverURL: finalCoverURL,
      };

      const response = await fetch(`https://habituo-server.vercel.app/users/update/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDoc),
      });

      const result = await response.json();
      if (result.success) {
        setDbUser({ ...dbUser, ...updatedDoc });
        setIsModalOpen(false);
        Swal.fire({
          title: "Updated!",
          text: "Profile & Firebase Synced successfully",
          icon: "success",
          background: "#111",
          color: "#fff",
          confirmButtonColor: "#4f46e5",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong during sync", "error");
    } finally {
      setLoading(false);
    }
  };

  const rawRole = dbUser?.role || "user";
  const isAdmin = rawRole.toLowerCase() === "admin";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] py-8 md:py-12 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        
        {/* Cover Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-40 sm:h-48 md:h-64 bg-slate-200 dark:bg-zinc-800 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-lg"
        >
          {dbUser?.coverURL ? (
            <img src={dbUser.coverURL} className="w-full h-full object-cover" alt="Cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
          )}
        </motion.div>

        {/* Profile Content */}
        <div className="relative -mt-16 md:-mt-24 px-4 md:px-8 pb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 mb-10">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative">
              <img 
                src={dbUser?.photoURL || user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                alt="Avatar" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-[1.5rem] md:rounded-[2.5rem] object-cover border-4 md:border-8 border-slate-50 dark:border-[#0a0a0a] shadow-xl"
              />
              {isAdmin && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-xl shadow-lg border-4 border-white dark:border-[#0a0a0a] animate-bounce">
                  <FiAward className="text-slate-900" size={18} />
                </div>
              )}
            </motion.div>

            <div className="flex-1 pb-2">
              <h1 className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {dbUser?.name || "Md. Ferdaws"}
              </h1>
              <p className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center md:justify-start gap-2 mt-1 uppercase text-[10px] md:text-xs tracking-widest">
                <FiActivity /> Habit Professional
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto px-8 py-3 bg-white dark:bg-zinc-900 text-slate-900 dark:text-white rounded-xl md:rounded-2xl font-bold shadow-sm border border-slate-100 dark:border-zinc-800 hover:bg-slate-50 transition-all"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white dark:bg-[#111] p-6 rounded-[1.5rem] border border-slate-100 dark:border-zinc-800">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 text-left">Details</h3>
                <ul className="space-y-4 text-left">
                  <li className="flex items-center gap-3 text-sm dark:text-slate-300 overflow-hidden">
                    <FiMail className="text-indigo-500 shrink-0" /> <span className="truncate">{user?.email}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm dark:text-slate-300">
                    <FiMapPin className="text-indigo-500 shrink-0" /> <span>{dbUser?.location || "Global Citizen"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm dark:text-slate-300">
                    <FiCalendar className="text-indigo-500 shrink-0" /> 
                    <span>Joined {dbUser?.createdAt ? new Date(dbUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "November 2025"}</span>
                  </li>
                </ul>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#111] p-8 rounded-[1.5rem] border border-slate-100 dark:border-zinc-800 flex flex-col justify-between items-start">
                <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                  <FiActivity size={20} />
                </div>
                <div className="text-left">
                  <h4 className="text-3xl font-black dark:text-white">{habitCount}</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">My Habits</p>
                </div>
              </div>

              {isAdmin ? (
                <motion.div 
                  animate={{ background: ["linear-gradient(to bottom right, #4f46e5, #9333ea)", "linear-gradient(to bottom right, #db2777, #4f46e5)"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="p-8 rounded-[1.5rem] text-white flex flex-col justify-between items-start shadow-xl relative overflow-hidden"
                >
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4"><FiAward size={20} /></div>
                  <div className="text-left">
                    <h4 className="text-3xl font-black tracking-tighter uppercase italic">ADMIN</h4>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold">System Controller</p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-[#1e293b] p-8 rounded-[1.5rem] text-white flex flex-col justify-between items-start border border-slate-700 shadow-xl">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 mb-4 font-bold tracking-widest">
                    <FiCheck size={20} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-3xl font-black tracking-tighter uppercase">USER</h4>
                    <p className="text-[10px] text-indigo-300 uppercase tracking-widest font-bold">Standard Access</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-black dark:text-white tracking-tighter uppercase mb-6">Update <span className="text-indigo-600">Profile</span></h2>
              
              <form onSubmit={handleFinalSave} className="space-y-6">
                <div className="relative h-24 bg-slate-100 dark:bg-zinc-800 rounded-2xl overflow-hidden group">
                  <img src={editData.coverURL} className="w-full h-full object-cover opacity-50" alt="" />
                  <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <FiCamera className="dark:text-white" size={24} />
                    <span className="text-[10px] dark:text-white font-bold uppercase mt-1">Change Cover</span>
                    <input type="file" className="hidden" onChange={(e) => handleImageSelect(e, "cover")} />
                  </label>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                   <div className="relative w-24 h-24 shrink-0 group">
                      <img src={editData.photoURL} className="w-full h-full rounded-2xl object-cover border-4 border-indigo-500/20 shadow-lg" alt="" />
                      <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl cursor-pointer opacity-0 group-hover:opacity-100 transition-all">
                        <FiCamera className="text-white" size={20} />
                        <input type="file" className="hidden" onChange={(e) => handleImageSelect(e, "profile")} />
                      </label>
                   </div>
                   
                   <div className="flex-1 w-full space-y-4 text-left">
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          value={editData.name} 
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="w-full px-5 py-3 mt-1 bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl outline-none dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Location</label>
                        <input 
                          type="text" 
                          value={editData.location} 
                          onChange={(e) => setEditData({...editData, location: e.target.value})}
                          className="w-full px-5 py-3 mt-1 bg-slate-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-xl outline-none dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                        />
                      </div>
                   </div>
                </div>

                <motion.button 
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  {loading ? <FiLoader className="animate-spin" /> : <><FiCheck /> Save All Changes</>}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;