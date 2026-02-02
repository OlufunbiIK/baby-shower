"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Lock, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Attendee {
  name: string;
  attendance: string;
  guests: number;
  message?: string;
}

export default function GuestShowcase() {
  type GuestTab = "all" | "going" | "maybe" | "cant-go";

const [activeTab, setActiveTab] = useState<GuestTab>("all");

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



 async function fetchGuestData(): Promise<Attendee[]> {
  try {
    // Try multiple CORS proxies in order
    const CORS_PROXIES = [
      "",  // Try direct first (if sheet is public)
      "https://corsproxy.io/?",
      "https://api.codetabs.com/v1/proxy?quest=",
      "https://api.allorigins.win/raw?url=",
    ];
    
    let csvText = "";
    let fetchSuccess = false;
    
    for (const proxy of CORS_PROXIES) {
      try {
        const url = proxy ? `${proxy}${encodeURIComponent(SHEET_CSV_URL)}` : SHEET_CSV_URL;
        console.log(`Attempting fetch with ${proxy || 'direct connection'}:`, url);
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'text/csv,text/plain,*/*',
          },
          cache: 'no-store'
        });
        
        if (response.ok) {
          csvText = await response.text();
          console.log("✅ Fetch successful with", proxy || "direct connection");
          console.log("Raw CSV preview:", csvText.slice(0, 200));
          fetchSuccess = true;
          break;
        }
      } catch (proxyError) {
        console.log(`Failed with ${proxy || 'direct'}, trying next...`);
        continue;
      }
    }
    
    if (!fetchSuccess) {
      console.error("All fetch methods failed");
      return [];
    }

    // Split CSV rows safely
    function parseCSV(text: string): string[][] {
      const rows: string[][] = [];
      let currentRow: string[] = [];
      let currentCell = "";
      let insideQuotes = false;
    
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
    
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
          currentRow.push(currentCell.trim());
          currentCell = "";
        } else if (char === "\n" && !insideQuotes) {
          currentRow.push(currentCell.trim());
          rows.push(currentRow.map(c => c.replace(/^"|"$/g, "")));
          currentRow = [];
          currentCell = "";
        } else {
          currentCell += char;
        }
      }
    
      return rows.filter(r => r.length > 1);
    }
    const rows = parseCSV(csvText);
    

    const [headers, ...dataRows] = rows;

    // Map header → index (lowercased for safety)
    const headerIndex: Record<string, number> = {};
    headers.forEach((header, index) => {
      headerIndex[header.toLowerCase()] = index;
    });

    console.log("Header index map:", headerIndex);
    console.log("First data row:", dataRows[0]);

    return dataRows
      .filter(row => row[headerIndex["name"]])
      .map(row => {
        const attendanceText = row[headerIndex["attendance"]] || "";


        let attendance: "going" | "maybe" | "cant-go" = "cant-go";

        if (/yes|going|there/i.test(attendanceText)) {
          attendance = "going";
        } else if (/maybe/i.test(attendanceText)) {
          attendance = "maybe";
        }

        return {
          name: row[headerIndex["name"]] || "Anonymous",
          attendance,
          guests: parseInt(row[headerIndex["number of guests"]]) || 1,
          message: row[headerIndex["message"]] || "",
        };
      });
  } catch (error) {
    console.error("Error fetching guest data:", error);
    return [];
  }
}

      
      // ADD THIS useEffect RIGHT HERE:
      useEffect(() => {
        async function loadGuests() {
          console.log("🔄 Loading guests from:", SHEET_CSV_URL);
          setLoading(true);
          
          const data = await fetchGuestData();
          console.log("📊 Fetched data:", data);
          console.log("📊 Number of attendees:", data.length);
          
          setAttendees(data);
          setLoading(false);
        }
        
        loadGuests();
        
        // Auto-refresh every 30 seconds
        const interval = setInterval(loadGuests, 200000);
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

  const stats = {
    going: attendees.filter(a => a.attendance === "going").length,
    maybe: attendees.filter(a => a.attendance === "maybe").length,
    cantGo: attendees.filter(a => a.attendance === "cant-go").length,
    total: attendees.length,
  };
  const filteredGuests = attendees.filter(attendee => {
    if (activeTab === "all") return true;
    return attendee.attendance === activeTab;
  });
  

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const guestGradients = [
    "from-rose-400 to-pink-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-sky-400 to-blue-500",
    "from-violet-400 to-purple-500",
    "from-fuchsia-400 to-pink-600",
    "from-lime-400 to-green-500",
    "from-cyan-400 to-sky-500",
  ];
  

  const getAvatarColor = (attendance: string) => {
    if (attendance === "going") return "from-green-400 to-emerald-500";
    if (attendance === "maybe") return "from-amber-400 to-yellow-500";
    return "from-gray-400 to-gray-500";
  };

  const getGuestGradient = (index: number) =>
    guestGradients[index % guestGradients.length];
  

  const attendingGuests = attendees;

  
  const displayLimit = 8;
  const hasMore = attendingGuests.length > displayLimit;

  if (loading) {
    return (
      <div className="w-full lg:w-130 flex-shrink-0">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-white/80">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Guest Showcase Card */}
      <div className="w-full lg:w-130 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-sm p-8 shadow-xl border-2 border-white/80 sticky top-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-forest-green" />
            <h3 className="text-2xl font-playfair text-forest-green">Celebrating With Us</h3>
          </div>

          <div className="text-center mb-6">
            <p className="text-4xl font-bold text-forest-green mb-1">{stats.going}</p>
            <p className="text-sm text-gray-600">people attending</p>
            <p className="text-xs text-gray-500 mt-1">{stats.total} guests total</p>
          </div>

          {/* Avatar Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {attendingGuests.slice(0, displayLimit).map((attendee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="group relative"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getGuestGradient(index)} flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg transition-all`}>
                  {getInitials(attendee.name)}
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-xl">
                    <p className="font-semibold">{attendee.name}</p>
                    <p className="text-gray-300 text-[10px]">{attendee.guests} guest{attendee.guests > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {hasMore && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: displayLimit * 0.05 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-700 font-bold text-xs shadow-md"
              >
                +{attendingGuests.length - displayLimit}
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setShowGuestList(true)}
            className="w-full bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-semibold py-3 transition-all shadow-md hover:shadow-lg"
          >
            View Full Guest List
          </button>

          <p className="text-center text-gray-500 text-xs mt-4">
            ✨ {stats.going} guests joining the celebration!
          </p>
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
  <button
    onClick={() => setActiveTab("all")}
    className={`px-6 py-3 font-semibold transition-colors ${
      activeTab === "all"
        ? "text-forest-green border-b-2 border-forest-green"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    All ({stats.total})
  </button>

  <button
    onClick={() => setActiveTab("going")}
    className={`px-6 py-3 font-semibold transition-colors ${
      activeTab === "going"
        ? "text-forest-green border-b-2 border-forest-green"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    Going ({stats.going})
  </button>

  <button
    onClick={() => setActiveTab("maybe")}
    className={`px-6 py-3 font-semibold transition-colors ${
      activeTab === "maybe"
        ? "text-amber-600 border-b-2 border-amber-500"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    Maybe ({stats.maybe})
  </button>

  <button
    onClick={() => setActiveTab("cant-go")}
    className={`px-6 py-3 font-semibold transition-colors ${
      activeTab === "cant-go"
        ? "text-gray-700 border-b-2 border-gray-400"
        : "text-gray-500 hover:text-gray-700"
    }`}
  >
    Can't Make It ({stats.cantGo})
  </button>
</div>


                    {/* Guest Cards */}
                    <div className="space-y-3">
                    {filteredGuests.map((attendee, index) => (
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
    </>
  );
}