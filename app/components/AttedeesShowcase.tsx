"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserCheck, UserX, HelpCircle, Heart, Lock, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Attendee {
  name: string;
  attendance: string;
  guests: number;
  message?: string;
}

export default function AttendeesShowcase() {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGuestList, setShowGuestList] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORDS = ["admin123", "bukola2026"];
  const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
  const SHEET_ID = "1214079262";
  const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;

  async function fetchGuestData() {
    // Same function as in AttendeesShowcase
    const CORS_PROXY = "https://api.allorigins.win/raw?url=";
    const encodedUrl = encodeURIComponent(SHEET_CSV_URL);
    const proxyUrl = `${CORS_PROXY}${encodedUrl}`;
    
    const response = await fetch(proxyUrl);
    const csvText = await response.text();
    
    const rows = csvText.split('\n').map(row => 
      row.split(',').map(cell => cell.replace(/^"|"$/g, ''))
    );
    
    const [headers, ...dataRows] = rows;
    
    return dataRows
      .filter(row => row[1])
      .map(row => {
        let attendanceStatus = "cant-go";
        if (row[3]?.includes("Yes, I'll be there")) attendanceStatus = "going";
        else if (row[3]?.includes("Maybe")) attendanceStatus = "maybe";
        
        return {
          name: row[1] || "Anonymous",
          email: row[2],
          attendance: attendanceStatus,
          message: row[4] || "",
          guests: parseInt(row[5]) || 1,
        };
      });
  }

// ADD THIS useEffect RIGHT HERE
useEffect(() => {
    async function loadGuests() {
      console.log("🔄 Loading guests...");
      setLoading(true);
      const data = await fetchGuestData();
      console.log("📊 Fetched data:", data);
      console.log("📊 Number of attendees:", data.length);
      setAttendees(data);
      setLoading(false);
    }
    
    loadGuests();
    
    const interval = setInterval(loadGuests, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (ADMIN_PASSWORDS.includes(password)) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  // Calculate stats
  const stats = {
    attending: attendees.filter(a => a.attendance === "going").length,
    totalGuests: attendees
      .filter(a => a.attendance === "going")
      .reduce((sum, a) => sum + a.guests, 0),
    maybe: attendees.filter(a => a.attendance === "maybe").length,
    notAttending: attendees.filter(a => a.attendance === "cant-go").length,
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (attendance: string) => {
    if (attendance === "going") return "from-green-400 to-emerald-500";
    if (attendance === "maybe") return "from-amber-400 to-yellow-500";
    return "from-gray-400 to-gray-500";
  };

  const attendingGuests = attendees.filter(a => a.attendance === "going");
  const displayLimit = 12;
  const hasMore = attendingGuests.length > displayLimit;

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-emerald-50/30 via-amber-50/20 to-rose-50/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50/30 via-amber-50/20 to-rose-50/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 right-20 w-64 h-64 bg-forest-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-20 w-72 h-72 bg-golden-yellow/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
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
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest-green/10 to-golden-yellow/10 rounded-full mb-4"
          >
            <Users className="w-8 h-8 text-forest-green" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-playfair text-forest-green mb-3 tracking-tight">
            Join the Celebration
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto mb-4 rounded-full"></div>
          <p className="text-gray-600 text-lg">
            See who's celebrating with us!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <UserCheck className="w-5 h-5 text-green-600" />
              <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Attending</p>
            </div>
            <p className="text-4xl font-bold text-green-600">{stats.attending}</p>
            <p className="text-xs text-green-600/70 mt-1">{stats.totalGuests} guests total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Maybe</p>
            </div>
            <p className="text-4xl font-bold text-amber-600">{stats.maybe}</p>
            <p className="text-xs text-amber-600/70 mt-1">Confirming soon</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <UserX className="w-5 h-5 text-gray-600" />
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Unable</p>
            </div>
            <p className="text-4xl font-bold text-gray-600">{stats.notAttending}</p>
            <p className="text-xs text-gray-600/70 mt-1">Can't make it</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-200 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-rose-600 fill-current" />
              <p className="text-sm font-semibold text-rose-700 uppercase tracking-wide">Total</p>
            </div>
            <p className="text-4xl font-bold text-rose-600">{attendees.length}</p>
            <p className="text-xs text-rose-600/70 mt-1">RSVPs received</p>
          </motion.div>
        </div>

        {/* Attendee Avatars Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border-2 border-white/80"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-playfair text-forest-green">
              Celebrating With Us ✨
            </h3>
            <button
              onClick={() => setShowGuestList(true)}
              className="px-6 py-2 bg-forest-green hover:bg-forest-green/90 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
            >
              View All
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {attendingGuests.slice(0, displayLimit).map((attendee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.15, y: -8 }}
                className="group relative"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.attendance)} flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all`}>
                  {getInitials(attendee.name)}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
                    <p className="font-semibold">{attendee.name}</p>
                    <p className="text-gray-300 text-[10px]">{attendee.guests} guest{attendee.guests > 1 ? 's' : ''}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            ))}

            {hasMore && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + displayLimit * 0.05 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-bold text-sm shadow-lg cursor-pointer"
                onClick={() => setShowGuestList(true)}
              >
                +{attendingGuests.length - displayLimit}
              </motion.div>
            )}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center text-gray-500 text-sm"
          >
            {stats.totalGuests} wonderful {stats.totalGuests === 1 ? 'guest' : 'guests'} joining the celebration! 🎉
          </motion.p>
        </motion.div>
      </div>

      {/* Guest List Modal */}
      <AnimatePresence>
        {showGuestList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowGuestList(false);
              setIsAuthenticated(false);
              setPassword("");
              setError("");
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-playfair text-forest-green">Guest List</h3>
                <button
                  onClick={() => {
                    setShowGuestList(false);
                    setIsAuthenticated(false);
                    setPassword("");
                    setError("");
                  }}
                  className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                {!isAuthenticated ? (
                  /* Login Form */
                  <div className="max-w-md mx-auto">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="flex justify-center mb-6"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-forest-green to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <Lock className="w-10 h-10 text-white" />
                      </div>
                    </motion.div>

                    <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                      Restricted Access
                    </h4>
                    <p className="text-gray-600 text-center mb-6">
                      Only RSVP'd guests can view event activity & see who's going
                    </p>

                    <div className="space-y-4">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                        placeholder="Enter password"
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-forest-green focus:outline-none focus:ring-4 focus:ring-forest-green/20 transition-all text-lg"
                      />
                      
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 text-sm flex items-center gap-2"
                        >
                          <span>⚠️</span> {error}
                        </motion.p>
                      )}

                      <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
                      >
                        View Guest List
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Guest List */
                  <div>
                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 border-b border-gray-200">
                      <button className="px-6 py-3 font-semibold text-forest-green border-b-2 border-forest-green">
                        Going ({stats.attending})
                      </button>
                      <button className="px-6 py-3 font-semibold text-gray-500 hover:text-gray-700 transition-colors">
                        Maybe ({stats.maybe})
                      </button>
                    </div>

                    {/* Guest Cards */}
                    <div className="space-y-3">
                      {attendingGuests.map((attendee, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-all"
                        >
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.attendance)} flex items-center justify-center text-white font-bold shadow-md`}>
                            {getInitials(attendee.name)}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{attendee.name}</p>
                            <p className="text-sm text-gray-600">
                              {attendee.guests} {attendee.guests === 1 ? 'guest' : 'guests'}
                            </p>
                          </div>
                          {attendee.message && (
                            <div className="text-xs text-gray-500 italic max-w-xs">
                              "{attendee.message}"
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}