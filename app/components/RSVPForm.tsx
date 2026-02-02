"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Baby, Heart, Mail, MessageCircle, Lock, Users } from "lucide-react";

type AttendanceStatus = "going" | "maybe" | "cant-go" | null;

interface QuickRSVPData {
  status: AttendanceStatus;
  name?: string;
  email?: string;
  message?: string;
}

export default function RSVPForm({ 
  isAdminAuthenticated,
  setIsAdminAuthenticated 
}: { 
  isAdminAuthenticated: boolean;
  setIsAdminAuthenticated: (val: boolean) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>(null);
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form fields (only shown after button click)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [plusOne, setPlusOne] = useState("");
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  // Google Form configuration
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLScDaeo4T0Kf7pk0fjsa5WE-e_msGVd33_xql5QvPrliiHAgvw/formResponse";
  const GOOGLE_FORM_FIELDS = {
    name: "entry.1279092776",
    email: "entry.349267748",
    attendance: "entry.145703893",
    message: "entry.2115061428",
    guests: "entry.1545021241"  // For plus one
  };

  // Add this function in GuestShowcase.tsx

// const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
// const SHEET_NAME = "Form Responses 1"; // Adjust if your sheet has a different name
// const API_KEY = "YOUR_GOOGLE_API_KEY"; // You'll need to create this

// const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1214079262`;



  const handleStatusClick = (status: AttendanceStatus) => {
    setSelectedStatus(status);
    setShowDetailsForm(true);
  };

  const validateForm = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = "Please enter your name";
    }
    
    if (!email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append(GOOGLE_FORM_FIELDS.name, name);
      formData.append(GOOGLE_FORM_FIELDS.email, email);
      formData.append(GOOGLE_FORM_FIELDS.attendance, 
        selectedStatus === "going" ? "🎉 Yes, I'll be there!" :
        selectedStatus === "maybe" ? "🤔 Maybe - I'll confirm soon" :
        "😢 Sorry, can't make it"
      );
      formData.append(GOOGLE_FORM_FIELDS.message, message || "");
      
      // Calculate total guests (1 for main person + plus one if provided)
      const totalGuests = selectedStatus === "going" && plusOne ? "2" : "1";
      formData.append(GOOGLE_FORM_FIELDS.guests, totalGuests);

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setIsSubmitted(true);
      
      // Reset form
      setTimeout(() => {
        setSelectedStatus(null);
        setShowDetailsForm(false);
        setName("");
        setEmail("");
        setMessage("");
        setPlusOne("");
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your RSVP.");
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <div className="flex-1 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <Sparkles className="w-6 h-6 text-golden-yellow" />
          <Baby className="w-8 h-8 text-forest-green" />
          <Sparkles className="w-6 h-6 text-golden-yellow" />
        </motion.div>
        
        <h2 className="text-5xl md:text-6xl font-playfair text-forest-green mb-4 tracking-tight">
          Will You Join Us?
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-600 text-xl leading-relaxed max-w-xl mx-auto">
          We would be honored by your presence! Please RSVP by{" "}
          <span className="font-bold text-forest-green">March 1st, 2026</span>
        </p>
      </motion.div>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-3xl p-12 md:p-16 text-center shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-6"
                >
                  ✨
                </motion.div>
                
                <h3 className="text-4xl md:text-5xl font-playfair text-green-700 mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-700 text-xl leading-relaxed mb-4">
                  Your RSVP has been received successfully! 
                </p>
                <p className="text-gray-600 text-lg">
                  We can't wait to celebrate with you! 🎉✨
                </p>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 flex justify-center gap-2"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [-10, 0, -10] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: i * 0.1 
                      }}
                    >
                      <Heart className="w-5 h-5 text-rose-pink fill-current" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
              >
                {!showDetailsForm ? (
                  /* Three Button Selection */
                  <div className="space-y-4 max-w-md mx-auto">
                    <motion.button
                      type="button"
                      onClick={() => handleStatusClick("going")}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 border-2 border-green-200 hover:border-green-400 rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl group"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-5xl group-hover:scale-110 transition-transform">❤️</span>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-green-700 group-hover:text-green-800">Going</p>
                          <p className="text-sm text-gray-600">See you there!</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => handleStatusClick("maybe")}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl group"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-5xl group-hover:scale-110 transition-transform">💛</span>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-amber-700 group-hover:text-amber-800">Maybe</p>
                          <p className="text-sm text-gray-600">I'll let you know</p>
                        </div>
                      </div>
                    </motion.button>

                    <motion.button
                      type="button"
                      onClick={() => handleStatusClick("cant-go")}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 border-2 border-gray-200 hover:border-gray-400 rounded-2xl p-6 transition-all shadow-lg hover:shadow-xl group"
                    >
                      <div className="flex items-center justify-center gap-4">
                        <span className="text-5xl group-hover:scale-110 transition-transform">💔</span>
                        <div className="text-left">
                          <p className="text-2xl font-bold text-gray-700 group-hover:text-gray-800">Can't Go</p>
                          <p className="text-sm text-gray-600">Sorry, can't make it</p>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                ) : (
                  /* Simple Details Form */
                  <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onSubmit={handleSubmit}
                    className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/60 max-w-2xl mx-auto"
                  >
                    <div className="text-center mb-8">
                      <span className="text-6xl mb-4 inline-block">
                        {selectedStatus === "going" ? "❤️" : selectedStatus === "maybe" ? "💛" : "💔"}
                      </span>
                      <h3 className="text-3xl font-playfair text-forest-green">
                        {selectedStatus === "going" ? "Wonderful! We're excited!" : 
                         selectedStatus === "maybe" ? "No worries, let us know!" :
                         "We'll miss you!"}
                      </h3>
                      <p className="text-gray-600 mt-2">Just need a couple details</p>
                    </div>

                    <div className="space-y-5">
                      {/* Name */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Heart className="w-4 h-4 text-rose-pink" />
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-forest-green focus:ring-4 focus:ring-forest-green/20 focus:outline-none transition-all bg-white/50 text-lg"
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-2">⚠️ {errors.name}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <Mail className="w-4 h-4 text-golden-yellow" />
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-golden-yellow focus:ring-4 focus:ring-golden-yellow/20 focus:outline-none transition-all bg-white/50 text-lg"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-2">⚠️ {errors.email}</p>
                        )}
                      </div>

                      {/* Plus One - Only for "going" status */}
                      {selectedStatus === "going" && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                            <Users className="w-4 h-4 text-sage-green" />
                            Bringing a Plus One? (Optional)
                          </label>
                          <input
                            type="text"
                            value={plusOne}
                            onChange={(e) => setPlusOne(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-sage-green focus:ring-4 focus:ring-sage-green/20 focus:outline-none transition-all bg-white/50 text-lg"
                            placeholder="Enter their name"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Let us know if you're bringing someone special!
                          </p>
                        </div>
                      )}

                      {/* Optional Message */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                          <MessageCircle className="w-4 h-4 text-lavender" />
                          Message (Optional)
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={3}
                          className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-lavender focus:ring-4 focus:ring-lavender/20 focus:outline-none transition-all resize-none bg-white/50"
                          placeholder="Share your wishes or let us know anything special..."
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8">
                      <button
                        type="button"
                        onClick={() => {
                          setShowDetailsForm(false);
                          setSelectedStatus(null);
                          setErrors({});
                        }}
                        className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                      >
                        ← Back
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit RSVP</span>
                            <Sparkles className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Google Forms Link */}
                {!showDetailsForm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-gray-500 text-sm mb-3">
                      Prefer to use Google Forms directly?
                    </p>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScDaeo4T0Kf7pk0fjsa5WE-e_msGVd33_xql5QvPrliiHAgvw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-forest-green hover:text-forest-green/80 font-semibold transition-colors underline"
                    >
                      Open in Google Forms →
                    </a>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }