import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { IoEyeOff, IoEye } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { TbBrain, TbCheckupList, TbChartDots, TbUserShield, TbUserCircle } from 'react-icons/tb';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  
  // input field control করার জন্য state (Demo fill এর জন্য মাস্ট লাগবে)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  // Demo Credentials Handler
  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    toast.info(`Credentials set for ${demoEmail === 'admin@habituo.com' ? 'Admin' : 'User'}`);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    signInUser(email, password)
      .then(() => {
        toast.success('🎉 Welcome Back to Habituo!');
        navigate('/'); 
      })
      .catch((error) => {
        console.error(error);
        toast.error("⚠️ Invalid email or password!");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success('🚀 Logged in with Google!');
        navigate('/'); 
      })
      .catch((error) => {
        console.error(error);
        toast.error("❌ Google login failed!");
      });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500 overflow-hidden px-4'>
      <div className="flex w-full max-w-[1200px] min-h-[720px] bg-white dark:bg-slate-900 md:shadow-2xl md:rounded-[40px] overflow-hidden border border-slate-100 dark:border-slate-800">
        
        {/* Left Side: Animation & Brand */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 text-white">
              <TbBrain className="text-4xl" />
              <span className="text-3xl font-black tracking-tighter">Habituo</span>
            </Link>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-full max-w-sm aspect-square bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-pulse">
               <TbChartDots className="text-[180px] text-white/40" />
            </div>
            <div className="mt-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Master Your Routine</h2>
              <p className="text-white/80 text-lg">Consistent small wins leads to massive success.</p>
            </div>
          </div>

          <div className="relative z-10 flex gap-6 justify-center text-white/70 text-sm italic">
            <div className="flex items-center gap-2"><TbCheckupList /> Verified Progress</div>
            <div className="flex items-center gap-2"><TbCheckupList /> Data Security</div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="max-w-[400px] mx-auto w-full">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Login</h1>
              <p className="text-slate-500 dark:text-slate-400">Please enter your details or use demo access.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300">Email</span>
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-lg" 
                  required 
                />
              </div>

              {/* Password Field */}
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text font-bold text-slate-700 dark:text-slate-300">Password</span>
                </label>
                <input 
                  type={show ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="input input-bordered w-full h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-primary text-lg pr-12" 
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-4 top-[44px] text-slate-400 hover:text-primary transition-colors"
                >
                  {show ? <IoEyeOff size={22} /> : <IoEye size={22} />}
                </button>
              </div>

              {/* Forget Password */}
              <div className="flex justify-end pt-1">
                <button type="button" onClick={() => toast.info("Reset system coming soon!")} className="text-sm font-bold text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* ✨ DEMO ACCOUNTS ✨ */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => fillDemo('mahir@asif.com', 'Admin123')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-emerald-500/50 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/5 hover:bg-emerald-500 hover:text-white transition-all duration-300 group font-bold text-xs"
                >
                  <TbUserShield className="text-xl animate-bounce group-hover:animate-none" />
                  Demo Admin
                </button>
                <button 
                  type="button"
                  onClick={() => fillDemo('mahi@alom.com', 'User123')}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-blue-500/50 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/5 hover:bg-blue-500 hover:text-white transition-all duration-300 group font-bold text-xs"
                >
                  <TbUserCircle className="text-xl animate-pulse group-hover:animate-none" />
                  Demo User
                </button>
              </div>

              <button type="submit" className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-4">
                Sign In
              </button>

              <div className="divider dark:before:bg-slate-800 dark:after:bg-slate-800 text-xs font-bold text-slate-400 uppercase tracking-widest">Or Secure Login</div>

              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full h-13 rounded-2xl border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold"
              >
                <FcGoogle className="text-2xl" /> Continue with Google
              </button>
            </form>

            <p className="mt-8 text-center text-slate-500 dark:text-slate-400">
              New to Habituo? <Link to="/register" className="text-primary font-black hover:underline">Join now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;