"use client";
import { motion } from "framer-motion";
import { Download, Share2, Heart, Lock, Users, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function InvitationCard() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin passwords - in production, use environment variables and proper authentication
  const ADMIN_PASSWORDS = ["admin123", "bukola2026"];

  const handleAdminLogin = () => {
    if (ADMIN_PASSWORDS.includes(password)) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleDownload = async () => {
    try {
      // Fetch the actual invitation image
      const response = await fetch('/Adebukola-Ayeni-Jolayemi.png');
      const blob = await response.blob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Baby-Shower-Invitation-Adebukola-Ayeni-Jolayemi.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err);
      alert('Download failed. Please try again.');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Baby Shower Invitation - Adebukola Ayeni Jolayemi",
          text: "Join us for a special baby shower celebration on March 28th, 2026!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Mock RSVP data - replace with actual data from your database
  const rsvpData = {
    attending: [
      { name: "John Doe", email: "john@example.com", guests: 2 },
      { name: "Jane Smith", email: "jane@example.com", guests: 1 },
    ],
    notAttending: [
      { name: "Bob Wilson", email: "bob@example.com", reason: "Prior commitment" },
    ],
    maybe: [
      { name: "Alice Johnson", email: "alice@example.com", note: "Checking schedule" },
    ],
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-rose-pink/10 via-lavender/10 to-sky-blue/10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-playfair text-forest-green tracking-tight">
              Digital Invitation
            </h2>
            {/* Admin access button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdminPanel(!showAdminPanel)}
              className="p-2 rounded-full bg-forest-green/10 hover:bg-forest-green/20 transition-colors"
              title="Admin RSVP View"
            >
              <Lock className="w-5 h-5 text-forest-green" />
            </motion.button>
          </div>
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-medium">Save or share this beautiful invitation</p>
        </motion.div>

        {/* Admin Panel */}
        {showAdminPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 bg-white rounded-2xl shadow-lg border-2 border-forest-green/20 overflow-hidden"
          >
            {!isAuthenticated ? (
              <div className="p-8">
                <h3 className="text-2xl font-playfair text-forest-green mb-4 text-center">
                  Admin Access
                </h3>
                <div className="max-w-md mx-auto">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-forest-green focus:outline-none mb-3"
                  />
                  {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                  <button
                    onClick={handleAdminLogin}
                    className="w-full bg-forest-green text-white py-3 rounded-lg font-semibold hover:bg-forest-green/90 transition-colors"
                  >
                    Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-playfair text-forest-green flex items-center gap-2">
                    <Users className="w-6 h-6" />
                    RSVP Overview
                  </h3>
                  <button
                    onClick={() => {
                      setIsAuthenticated(false);
                      setPassword("");
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Logout
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Attending */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">
                        Attending ({rsvpData.attending.length})
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {rsvpData.attending.map((guest, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 text-sm">
                          <p className="font-semibold text-gray-800">{guest.name}</p>
                          <p className="text-gray-600 text-xs">{guest.email}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Guests: {guest.guests}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Maybe */}
                  <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
                    <div className="flex items-center gap-2 mb-4">
                      <HelpCircle className="w-5 h-5 text-amber-600" />
                      <h4 className="font-semibold text-amber-800">
                        Maybe ({rsvpData.maybe.length})
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {rsvpData.maybe.map((guest, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 text-sm">
                          <p className="font-semibold text-gray-800">{guest.name}</p>
                          <p className="text-gray-600 text-xs">{guest.email}</p>
                          <p className="text-gray-500 text-xs mt-1 italic">
                            {guest.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Not Attending */}
                  <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                    <div className="flex items-center gap-2 mb-4">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <h4 className="font-semibold text-red-800">
                        Not Attending ({rsvpData.notAttending.length})
                      </h4>
                    </div>
                    <div className="space-y-3">
                      {rsvpData.notAttending.map((guest, i) => (
                        <div key={i} className="bg-white rounded-lg p-3 text-sm">
                          <p className="font-semibold text-gray-800">{guest.name}</p>
                          <p className="text-gray-600 text-xs">{guest.email}</p>
                          {guest.reason && (
                            <p className="text-gray-500 text-xs mt-1 italic">
                              {guest.reason}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-2xl font-bold text-forest-green">
                        {rsvpData.attending.reduce((sum, g) => sum + g.guests, 0) + rsvpData.attending.length}
                      </p>
                      <p className="text-sm text-gray-600">Total Guests</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-amber-600">
                        {rsvpData.maybe.length}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">
                        {rsvpData.notAttending.length}
                      </p>
                      <p className="text-sm text-gray-600">Declined</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Colorful Invitation Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="relative bg-gradient-to-br from-white via-rose-pink/5 to-lavender/5 rounded-3xl shadow-elegant overflow-hidden border-2 border-rose-pink/20 mx-auto max-w-2xl group"
        >
          {/* Colorful animated top accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-2 bg-gradient-to-r from-rose-pink via-golden-yellow via-sage-green to-lavender"
          />

          {/* Card content */}
          <div className="p-10 md:p-16">
            <div className="space-y-8">
              {/* Header section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-5"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-3 mb-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-5 h-5 text-rose-pink fill-current" />
                  </motion.div>
                  <p className="text-sm uppercase tracking-[0.15em] text-gray-600 font-semibold">
                    A Surprise is Blooming
                  </p>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Heart className="w-5 h-5 text-lavender fill-current" />
                  </motion.div>
                </motion.div>
                
                <h3 className="text-5xl md:text-6xl font-playfair bg-gradient-to-r from-forest-green via-rose-pink to-lavender bg-clip-text text-transparent leading-tight">
                  Baby Shower
                </h3>
                
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="h-0.5 bg-gradient-to-r from-transparent via-golden-yellow to-transparent mx-auto"
                />
              </motion.div>

              {/* RSVP reminder - colorful */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-golden-yellow/20 via-rose-pink/20 to-lavender/20 rounded-xl p-6 border-2 border-golden-yellow/30"
              >
                <p className="text-center text-base text-forest-green font-semibold">
                  RSVP by March 1st, 2026
                </p>
              </motion.div>

              {/* Bible verse - colorful accent */}
              <div className="bg-gradient-to-br from-sage-green/10 to-sky-blue/10 rounded-xl p-6 border border-sage-green/30">
                <p className="text-center text-sm text-gray-700 italic leading-relaxed">
                  "Children are a heritage from the Lord." — Psalm 127:3
                </p>
              </div>
            </div>
          </div>

          {/* Colorful animated bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-2 bg-gradient-to-r from-lavender via-sage-green via-golden-yellow to-rose-pink"
          />
        </motion.div>

        {/* Modern action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownload}
            className="group flex items-center gap-2 bg-gradient-to-r from-forest-green to-forest-green/90 hover:from-forest-green/90 hover:to-forest-green text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Download className="w-4 h-4" />
            </motion.div>
            <span>Download Invitation</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="group flex items-center gap-2 bg-white hover:bg-gray-50 text-forest-green px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 font-semibold"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.div>
            <span>Share</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}