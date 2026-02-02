"use client";
import { motion } from "framer-motion";
import { 
  Lock, 
  Users, 
  UserCheck, 
  HelpCircle,
  Download,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";

interface RSVPEntry {
  timestamp: string;
  name: string;
  email: string;
  attendance: string;
  guests: number;
  message: string;
}

export default function AdminDashboardPreview({ 
  isAuthenticated, 
  onAuthenticate 
}: { 
  isAuthenticated: boolean;
  onAuthenticate: () => void;
}) {
  const [rsvpData, setRsvpData] = useState<RSVPEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Google Sheets data
  useEffect(() => {
    fetchRSVPData();
  }, []);
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

  useEffect(() => {
    fetchRSVPData();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchRSVPData, 30000);
    return () => clearInterval(interval);
  }, []);
  // Calculate statistics
  const stats = {
    total: rsvpData.length,
    attending: rsvpData.filter(r => r.attendance.includes("Yes")).length,
    maybe: rsvpData.filter(r => r.attendance.includes("Maybe")).length,
    totalGuests: rsvpData
      .filter(r => r.attendance.includes("Yes"))
      .reduce((sum, r) => sum + r.guests, 0),
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["Timestamp", "Name", "Email", "Attendance", "Guests", "Message"];
    const csvContent = [
      headers.join(","),
      ...rsvpData.map(entry => [
        entry.timestamp,
        entry.name,
        entry.email,
        entry.attendance,
        entry.guests,
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

  if (loading) {
    return (
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-forest-green/20 sticky top-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-80 flex-shrink-0">
      <div className={`bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-forest-green/20 sticky top-8 transition-all duration-500 ${
        !isAuthenticated ? 'blur-md' : 'blur-0'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-forest-green" />
          <h3 className="text-2xl font-playfair text-forest-green">Admin Dashboard</h3>
        </div>

        {/* Stats Overview */}
        <div className="space-y-3 mb-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <UserCheck className="w-4 h-4 text-green-600" />
              <p className="text-xs font-semibold text-green-700 uppercase">Attending</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.attending}</p>
            <p className="text-xs text-green-600/70">{stats.totalGuests} guests total</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <p className="text-xs font-semibold text-amber-700 uppercase">Maybe</p>
            </div>
            <p className="text-3xl font-bold text-amber-600">{stats.maybe}</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 border-2 border-gray-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-gray-600" />
              <p className="text-xs font-semibold text-gray-700 uppercase">Total RSVPs</p>
            </div>
            <p className="text-3xl font-bold text-gray-600">{stats.total}</p>
          </motion.div>
        </div>

        {/* Recent RSVPs Preview */}
        {isAuthenticated && (
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Recent RSVPs</h4>
            {rsvpData.slice(0, 3).map((entry, index) => (
              <div key={index} className="bg-white/50 rounded-lg p-3 border border-gray-200">
                <p className="font-semibold text-sm text-gray-800">{entry.name}</p>
                <p className="text-xs text-gray-600">{entry.guests} guest{entry.guests > 1 ? 's' : ''}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={exportToCSV}
                className="w-full bg-gradient-to-r from-forest-green to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-forest-green/90 hover:to-emerald-600/90 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
              <p className="text-xs text-center text-gray-500">
                View full dashboard for more details
              </p>
            </>
          ) : (
            <button
              onClick={onAuthenticate}
              className="w-full bg-gradient-to-r from-forest-green to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-forest-green/90 hover:to-emerald-600/90 transition-all flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Dashboard
            </button>
          )}
        </div>

        {/* Locked Overlay */}
        {!isAuthenticated && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl text-center"
            >
              <Lock className="w-12 h-12 text-forest-green mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700">Dashboard Locked</p>
              <p className="text-xs text-gray-500 mt-1">Login to view details</p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}