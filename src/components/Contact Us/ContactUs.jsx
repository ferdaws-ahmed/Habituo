import React from "react";
import { TbMail, TbPhone, TbMapPin, TbSend, TbMessage2Share } from "react-icons/tb";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert("Thank you for reaching out! Habituo team will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-base-100 dark:bg-slate-900 transition-colors duration-500 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Have questions about Habituo? We're here to help you build your consistency and answer any queries you might have.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div className="bg-primary/5 dark:bg-slate-800 p-8 rounded-[2rem] border border-primary/10">
              <h2 className="text-2xl font-bold mb-6 dark:text-white flex items-center gap-2">
                <TbMessage2Share className="text-primary" /> Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm">
                    <TbMail className="text-2xl text-primary" />
                  </div>
                  <div>
                    <p className="font-bold dark:text-gray-200">Email Us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">support@habituo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm">
                    <TbPhone className="text-2xl text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold dark:text-gray-200">Call Us</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">+880 1234-567890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-sm">
                    <TbMapPin className="text-2xl text-accent" />
                  </div>
                  <div>
                    <p className="font-bold dark:text-gray-200">Our Studio</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Motivational Quote for User */}
            <div className="p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative">
               <div className="relative z-10">
                  <p className="italic text-lg opacity-80">"Consistency is the bridge between goals and accomplishment."</p>
                  <p className="mt-4 font-bold text-primary">— Habituo Team</p>
               </div>
               <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2rem] shadow-xl border border-base-200 dark:border-slate-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text dark:text-gray-300 font-semibold">Your Name</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="input input-bordered w-full bg-base-200 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary" 
                    required 
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text dark:text-gray-300 font-semibold">Email Address</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="input input-bordered w-full bg-base-200 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary" 
                    required 
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text dark:text-gray-300 font-semibold">Subject</span>
                </label>
                <input 
                  type="text" 
                  placeholder="How can we help?" 
                  className="input input-bordered w-full bg-base-200 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary" 
                  required 
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text dark:text-gray-300 font-semibold">Message</span>
                </label>
                <textarea 
                  className="textarea textarea-bordered h-32 bg-base-200 dark:bg-slate-900 border-none focus:ring-2 focus:ring-primary" 
                  placeholder="Tell us more about your goal..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block rounded-xl text-lg flex items-center gap-2">
                <TbSend className="text-xl" /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;