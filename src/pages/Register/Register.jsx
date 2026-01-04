import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { IoEyeOff, IoEye, IoMail, IoPerson, IoLink, IoLockClosed } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { TbBrain, TbSparkles, TbTargetArrow, TbShieldCheck } from "react-icons/tb";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    if (!/[A-Z]/.test(password)) setPasswordError("One uppercase letter required");
    else if (!/[a-z]/.test(password)) setPasswordError("One lowercase letter required");
    else if (password.length < 6) setPasswordError("Minimum 6 characters");
    else setPasswordError("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const { name, email, photoURL, password } = Object.fromEntries(new FormData(form));

    if (passwordError) return toast.error("Check password rules!");

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, { displayName: name, photoURL }).then(() => {
          result.user.reload().then(() => {
            fetch("https://habituo-server.vercel.app/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, photoURL, provider: "email", createdAt: new Date() }),
            }).then(() => {
              toast.success("Welcome to Habituo! 🚀");
              navigate("/");
            });
          });
        });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle().then((result) => {
      const user = { name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL, provider: "google", createdAt: new Date() };
      fetch("https://habituo-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      }).then(() => {
        toast.success("Login Successful!");
        navigate("/");
      });
    }).catch((err) => toast.error(err.message));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f1a] flex items-center justify-center p-4 transition-colors duration-500 relative overflow-hidden font-sans">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-10 items-center relative z-10">
        
        {/* Left Side: Brand Visuals (Hidden on mobile) */}
        <div className="hidden lg:block space-y-8 p-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full shadow-sm backdrop-blur-md">
            <TbSparkles className="text-primary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Habituo Ecosystem</span>
          </div>
          
          <h1 className="text-6xl font-black leading-tight text-slate-900 dark:text-white">
            Transform Your <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
              Daily Rhythm.
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md leading-relaxed">
            Join thousands of consistency-seekers who are turning small actions into life-changing habits.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-bold">
               <div className="p-2 bg-primary/10 rounded-lg"><TbTargetArrow className="text-primary text-2xl" /></div>
               Personalized Goal Tracking
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-bold">
               <div className="p-2 bg-secondary/10 rounded-lg"><TbShieldCheck className="text-secondary text-2xl" /></div>
               Secure & Private Data
            </div>
          </div>
        </div>

        {/* Right Side: Register Card */}
        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl dark:shadow-none transition-all">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Account</h2>
            <p className="text-slate-500 dark:text-slate-400">Step into the consistency zone.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative group">
                <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input type="text" name="name" placeholder="Full Name" className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-primary/50 rounded-2xl py-3.5 pl-11 pr-4 outline-none text-slate-900 dark:text-white transition-all" required />
              </div>
              <div className="relative group">
                <IoLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input type="url" name="photoURL" placeholder="Photo URL" className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-primary/50 rounded-2xl py-3.5 pl-11 pr-4 outline-none text-slate-900 dark:text-white transition-all" required />
              </div>
            </div>

            <div className="relative group">
              <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input type="email" name="email" placeholder="Email Address" className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-primary/50 rounded-2xl py-3.5 pl-11 pr-4 outline-none text-slate-900 dark:text-white transition-all" required />
            </div>

            <div className="relative group">
              <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                onChange={handlePasswordChange}
                placeholder="Secure Password" 
                className="w-full bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-primary/50 rounded-2xl py-3.5 pl-11 pr-12 outline-none text-slate-900 dark:text-white transition-all" 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary">
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
            {passwordError && <p className="text-[11px] text-red-500 font-bold uppercase tracking-wider ml-2">{passwordError}</p>}

            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] mt-4 uppercase tracking-widest text-sm">
              Start Free Today
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
              <span className="mx-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Or</span>
              <div className="flex-grow border-t border-slate-200 dark:border-white/5"></div>
            </div>

            <button type="button" onClick={handleGoogleLogin} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <FcGoogle size={20} /> Continue with Google
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 dark:text-slate-400 text-sm">
            Already have an account? <Link to="/login" className="text-primary font-black hover:underline underline-offset-4 ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;