"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RSVPForm from "./components/RSVPForm";
import Registry from "./components/Registry";
import Footer from "./components/Footer";
import EventDetails from "./components/EventDetails";
import Hero from "./components/Hero";
import InvitationCard from "./components/InvitationCard";
import PrivacyNotice from "./components/PrivacyNotice";
import FloralBackground from "./components/FloralBackground";
import AttendeesDashboard from "./components/AttendeesDashboard";
import GuestShowcase from "./components/GuestShowcase";

export default function Home() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <main className="min-h-screen relative">
      {/* Floral background for entire page */}
      <FloralBackground />

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Hero />
        <PrivacyNotice />
        <InvitationCard />
        <EventDetails />

        {/* RSVP Section with Guest Showcase Side-by-Side */}
        <section className="py-24 px-4 bg-linear-to-br from-amber-50/50 via-emerald-50/30 to-rose-50/40 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.03, 0.05, 0.03],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 right-20 w-96 h-96 bg-forest-green rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.04, 0.06, 0.04],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute bottom-20 left-20 w-80 h-80 bg-golden-yellow rounded-full blur-3xl"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-20 items-center max-w-6xl mx-auto relative z-10">
            {/* RSVP Form - Left Side */}
            <RSVPForm
              isAdminAuthenticated={isAdminAuthenticated}
              setIsAdminAuthenticated={setIsAdminAuthenticated}
            />

            {/* Guest Showcase - Right Side */}
            <GuestShowcase />
          </div>
        </section>

        {/* Admin Dashboard Preview (optional - can be removed if not needed) */}
        {/* <section className="py-12">
          <div className="max-w-6xl mx-auto px-4">
            <AdminDashboardPreview 
              isAuthenticated={isAdminAuthenticated}
              onAuthenticate={() => {
                const password = prompt("Enter admin password:");
                const ADMIN_PASSWORDS = ["admin123", "bukola2026"];
                if (password && ADMIN_PASSWORDS.includes(password)) {
                  setIsAdminAuthenticated(true);
                } else {
                  alert("Incorrect password");
                }
              }}
            />
          </div>
        </section> */}

        {/* Full Dashboard (only shown when authenticated) */}
        {isAdminAuthenticated && <AttendeesDashboard />}

        <Registry />
        <Footer />
      </div>
    </main>
  );
}
