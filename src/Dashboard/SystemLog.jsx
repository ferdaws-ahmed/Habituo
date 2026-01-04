import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiActivity, FiAlertCircle, FiEye, FiTrash2, 
  FiClock, FiUser, FiTag, FiCheckCircle 
} from "react-icons/fi";

const SystemLogs = () => {
  const [activeTab, setActiveTab] = useState("activity"); // activity or reports
  const [logs, setLogs] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [logsRes, reportsRes] = await Promise.all([
          fetch("https://habituo-server.vercel.app/system-logs"),
          fetch("https://habituo-server.vercel.app/reports")
        ]);
        const logsData = await logsRes.json();
        const reportsData = await reportsRes.json();
        setLogs(logsData);
        setReports(reportsData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load logs");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6 md:space-y-8 pb-10"
    >
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black dark:text-white tracking-tight">System <span className="text-indigo-600">Logs</span></h1>
          <p className="text-slate-500 font-bold text-xs md:text-sm">Real-time infrastructure audit & moderation</p>
        </div>

        <div className="flex w-full lg:w-auto bg-slate-100 dark:bg-slate-800 p-1 md:p-1.5 rounded-xl md:rounded-2xl border dark:border-slate-700">
          <button 
            onClick={() => setActiveTab("activity")}
            className={`flex-1 lg:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${activeTab === 'activity' ? 'bg-white dark:bg-slate-700 text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-indigo-500'}`}
          >
            Activity Stream
          </button>
          <button 
            onClick={() => setActiveTab("reports")}
            className={`flex-1 lg:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'bg-white dark:bg-slate-700 text-red-500 shadow-sm' : 'text-slate-400 hover:text-red-500'}`}
          >
            Reported Items
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-[#0b1120] border border-slate-100 dark:border-slate-800/60 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left min-w-[600px] md:min-w-full">
            <thead className="bg-slate-50/50 dark:bg-slate-800/40 border-b dark:border-slate-800">
              <tr>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">{activeTab === 'activity' ? 'Creator/Action' : 'Reporter'}</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                <th className="px-5 md:px-8 py-4 md:py-5 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              <AnimatePresence mode="wait">
                {activeTab === 'activity' ? (
                  logs.map((log) => (
                    <ActivityRow key={log._id} log={log} />
                  ))
                ) : (
                  reports.map((report) => (
                    <ReportRow key={report._id} report={report} />
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>

          {(activeTab === 'activity' ? logs : reports).length === 0 && (
            <div className="p-16 md:p-20 text-center flex flex-col items-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 mb-4 animate-pulse">
                <FiActivity size={24} className="md:w-[32px]" />
              </div>
              <p className="font-black text-slate-400 uppercase text-[10px] md:text-xs tracking-widest">No logs found in this sector</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Activity Stream Row
const ActivityRow = ({ log }) => (
  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/20 transition-colors group">
    <td className="px-5 md:px-8 py-4 md:py-5">
      <div className="flex items-center gap-3 md:gap-4">
        <img src={log.habitImage} className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover ring-2 md:ring-4 ring-slate-50 dark:ring-slate-900" alt="" />
        <div>
          <p className="font-black text-xs md:text-sm dark:text-slate-200 truncate max-w-[100px] md:max-w-none">{log.habitName}</p>
          <span className={`text-[8px] md:text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${
            log.type === 'ADD' ? 'bg-green-100 text-green-600' : 
            log.type === 'DELETE' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}>
            {log.type}
          </span>
        </div>
      </div>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5">
      <div className="flex items-center gap-2">
        <FiUser className="text-slate-400 text-xs md:text-sm" />
        <span className="text-[10px] md:text-xs font-bold text-slate-600 dark:text-slate-400">{log.creatorName}</span>
      </div>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5">
      <div className="flex items-center gap-2 text-slate-400">
        <FiClock className="text-xs md:text-[14px]" />
        <span className="text-[10px] md:text-xs font-medium">{new Date(log.timestamp).toLocaleDateString()}</span>
      </div>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5 text-right">
      <button className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all">
        <FiEye className="text-sm md:text-[16px]" />
      </button>
    </td>
  </motion.tr>
);

// Reported Item Row
const ReportRow = ({ report }) => (
  <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-red-50/30 dark:hover:bg-red-950/10 transition-colors">
    <td className="px-5 md:px-8 py-4 md:py-5">
      <div className="flex items-center gap-3 md:gap-4">
        <img src={report.habitImage} className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl object-cover grayscale opacity-70" alt="" />
        <div>
          <p className="font-black text-xs md:text-sm dark:text-slate-200 truncate max-w-[100px] md:max-w-none">{report.habitName}</p>
          <p className="text-[9px] md:text-[11px] text-red-500 font-bold italic line-clamp-1">"{report.reason}"</p>
        </div>
      </div>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5">
      <p className="text-[10px] md:text-xs font-black dark:text-slate-400">{report.reporterName}</p>
      <p className="text-[8px] md:text-[9px] text-slate-400 uppercase font-bold">ID: #{report.reporterId?.slice(-5)}</p>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5">
      <span className="text-[10px] md:text-xs font-medium text-slate-400">{new Date(report.timestamp).toLocaleDateString()}</span>
    </td>
    <td className="px-5 md:px-8 py-4 md:py-5 text-right">
      <div className="flex justify-end gap-1.5 md:gap-2">
        <button className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm" title="Mark as Safe">
          <FiCheckCircle className="text-sm md:text-[16px]" />
        </button>
        <button className="p-2 md:p-2.5 rounded-lg md:rounded-xl bg-red-50 dark:bg-red-950 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm" title="Remove Habit">
          <FiTrash2 className="text-sm md:text-[16px]" />
        </button>
      </div>
    </td>
  </motion.tr>
);

export default SystemLogs;