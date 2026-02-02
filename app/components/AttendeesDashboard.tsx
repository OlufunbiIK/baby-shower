"use client";
import { motion } from "framer-motion";
import { 
  Lock, 
  Users, 
  UserCheck, 
  UserX, 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle,
  Download,
  Search,
  X,
  Calendar,
  UtensilsCrossed
} from "lucide-react";
import { useState, useEffect } from "react";

interface RSVPEntry {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  attendance: string;
  guests: number;
  dietary: string;
  message: string;
}

export default function AttendeesDashboard({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rsvpData, setRsvpData] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Admin passwords
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

  // Fetch Google Sheets data
  useEffect(() => {
    if (isAuthenticated) {
      fetchRSVPData();
    }
  }, [isAuthenticated]);
  const SPREADSHEET_ID = "15ewgjkz5cgGBJhSxiOjQ98mtPtv7VkkrXBufcj1Z9no";
  const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=1214079262`;
  
  const fetchRSVPData = async () => {
    setLoading(true);
    
    try {
      const CORS_PROXY = "https://api.allorigins.win/raw?url=";
      const encodedUrl = encodeURIComponent(SHEET_CSV_URL);
      const proxyUrl = `${CORS_PROXY}${encodedUrl}`;
      
      console.log("🔄 Fetching RSVP data...");
      const response = await fetch(proxyUrl);
      const csvText = await response.text();
      
      const rows = csvText.split('\n').map(row => 
        row.split(',').map(cell => cell.replace(/^"|"$/g, ''))
      );
      
      const [headers, ...dataRows] = rows;
      
      const processedData = dataRows
        .filter(row => row[1]) // Filter out empty rows
        .map(row => ({
          timestamp: row[0] || "",
          name: row[1] || "Anonymous",
          email: row[2] || "",
          attendance: row[3] || "",
          guests: parseInt(row[5]) || 1,
          message: row[4] || ""
        }));
      
      console.log("✅ Loaded RSVPs:", processedData.length);
      setRsvpData(processedData);
    } catch (error) {
      console.error("❌ Error fetching RSVP data:", error);
      // Fallback to empty array on error
      setRsvpData([]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const stats = {
    total: rsvpData.length,
    attending: rsvpData.filter(r => r.attendance.includes("Yes")).length,
    maybe: rsvpData.filter(r => r.attendance.includes("Maybe")).length,
    notAttending: rsvpData.filter(r => r.attendance.includes("Sorry")).length,
    totalGuests: rsvpData
      .filter(r => r.attendance.includes("Yes"))
      .reduce((sum, r) => sum + r.guests, 0),
  };

  // Filter and search
  const filteredData = rsvpData
    .filter(entry => {
      if (filterStatus === "all") return true;
      if (filterStatus === "attending") return entry.attendance.includes("Yes");
      if (filterStatus === "maybe") return entry.attendance.includes("Maybe");
      if (filterStatus === "not-attending") return entry.attendance.includes("Sorry");
      return true;
    })
    .filter(entry => 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Timestamp", "Name", "Email", "Phone", "Attendance", "Guests", "Dietary", "Message"];
    const csvContent = [
      headers.join(","),
      ...rsvpData.map(entry => [
        entry.timestamp,
        entry.name,
        entry.email,
        entry.phone,
        entry.attendance,
        entry.guests,
        `"${entry.dietary}"`,
        `"${entry.message}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `baby-shower-rsvps-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (attendance: string) => {
    if (attendance.includes("Yes")) return "green";
    if (attendance.includes("Maybe")) return "amber";
    return "gray";
  };

  const getStatusIcon = (attendance: string) => {
    if (attendance.includes("Yes")) return <UserCheck className="w-5 h-5" />;
    if (attendance.includes("Maybe")) return <HelpCircle className="w-5 h-5" />;
    return <UserX className="w-5 h-5" />;
  };

  if (!isAuthenticated) {
    return (
        <section className={`py-24 px-4 transition-all duration-500 ${
            isAuthenticated ? 'opacity-100' : 'opacity-20 blur-lg pointer-events-none'
          }`}>
                    <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-forest-green/20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-forest-green to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                <Lock className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h2 className="text-3xl font-playfair text-forest-green mb-2 text-center">
              Admin Access
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Enter password to view RSVP dashboard
            </p>

            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                placeholder="Enter admin password"
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdminLogin}
                className="w-full bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-semibold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-rose-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair text-forest-green mb-2">
              RSVP Dashboard
            </h1>
            <p className="text-gray-600">
              Manage and view all event responses
            </p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
          >
            Logout
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-md"
          >
            <Users className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            <p className="text-sm text-gray-600">Total RSVPs</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md"
          >
            <UserCheck className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-3xl font-bold text-green-600">{stats.attending}</p>
            <p className="text-sm text-green-700">Attending</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-md"
          >
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <p className="text-3xl font-bold text-green-600">{stats.totalGuests}</p>
            <p className="text-sm text-green-700">Total Guests</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200 shadow-md"
          >
            <HelpCircle className="w-6 h-6 text-amber-600 mb-2" />
            <p className="text-3xl font-bold text-amber-600">{stats.maybe}</p>
            <p className="text-sm text-amber-700">Maybe</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 border-2 border-gray-200 shadow-md"
          >
            <UserX className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-3xl font-bold text-gray-600">{stats.notAttending}</p>
            <p className="text-sm text-gray-700">Can't Attend</p>
          </motion.div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-forest-green focus:outline-none transition-all"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {[
                { value: "all", label: "All" },
                { value: "attending", label: "Attending" },
                { value: "maybe", label: "Maybe" },
                { value: "not-attending", label: "Not Attending" }
              ].map(filter => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                    filterStatus === filter.value
                      ? "bg-forest-green text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}

              {/* Export Button */}
              <button
                onClick={exportToCSV}
                className="px-4 py-3 bg-golden-yellow hover:bg-golden-yellow/90 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* RSVP Cards */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-forest-green border-t-transparent mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading RSVPs...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md border-2 border-gray-100">
            <p className="text-gray-600 text-lg">No RSVPs found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredData.map((entry, index) => {
              const statusColor = getStatusColor(entry.attendance);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-white rounded-2xl p-6 shadow-md border-2 border-${statusColor}-200 hover:shadow-lg transition-all`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Avatar */}
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${statusColor}-400 to-${statusColor}-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg`}>
                      {entry.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">{entry.name}</h3>
                        <div className={`flex items-center gap-2 px-4 py-2 bg-${statusColor}-50 text-${statusColor}-700 rounded-full text-sm font-semibold`}>
                          {getStatusIcon(entry.attendance)}
                          <span>{entry.attendance.replace(/[🎉🤔😢]/g, '').trim()}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{entry.email}</span>
                        </div>
                        {entry.phone && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{entry.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{entry.guests} guest{entry.guests > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(entry.timestamp).toLocaleString()}</span>
                        </div>
                      </div>

                      {entry.dietary && (
                        <div className="flex items-start gap-2 text-sm bg-amber-50 rounded-lg p-3 border border-amber-200">
                          <UtensilsCrossed className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-amber-800">Dietary:</p>
                            <p className="text-amber-700">{entry.dietary}</p>
                          </div>
                        </div>
                      )}

                      {entry.message && (
                        <div className="flex items-start gap-2 text-sm bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <MessageCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-blue-800">Message:</p>
                            <p className="text-blue-700 italic">{entry.message}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}