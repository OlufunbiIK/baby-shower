"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowDown,
  Baby,
  Heart,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-28 pb-16">
      {/* Vibrant colorful background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-amber-50 to-green-50"></div> */}
      <div className="absolute"></div>

      {/* Colorful overlay patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(26,77,46,0.08)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,200,66,0.12)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(135,197,164,0.08)_0%,transparent_40%)]"></div>

      {/* Decorative colored shapes */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-forest-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-golden-yellow/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-forest-green/3 to-golden-yellow/5 rounded-full blur-3xl"></div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts with better animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [100, -120],
              x: [0, Math.sin(i) * 60],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              left: `${15 + i * 18}%`,
              top: `${30 + (i % 2) * 20}%`,
            }}
          >
            <Heart className="w-4 h-4 text-golden-yellow/50 fill-current" />
          </motion.div>
        ))}

        {/* Elegant sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
            className="absolute"
            style={{
              right: `${10 + i * 15}%`,
              top: `${15 + i * 12}%`,
            }}
          >
            <Sparkles className="w-5 h-5 text-golden-yellow/60" />
          </motion.div>
        ))}

        {/* Colorful circles */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-12 w-40 h-40 border-2 border-forest-green/15 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-12 w-32 h-32 border-2 border-golden-yellow/20 rounded-full"
        />

        {/* Additional decorative circles */}
        <motion.div
          animate={{ rotate: 180, scale: [1, 1.1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 left-1/4 w-24 h-24 border border-forest-green/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -180, scale: [1, 1.15, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/4 w-28 h-28 border border-golden-yellow/15 rounded-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Main content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            {/* Refined Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-forest-green/8 to-golden-yellow/8 border border-forest-green/15 rounded-full px-5 py-2.5 shadow-sm"
            >
              <Baby className="w-4 h-4 text-forest-green" />
              <span className="text-xs uppercase tracking-widest text-forest-green font-medium">
                Baby Shower
              </span>
            </motion.div>

            {/* Beautiful main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="space-y-4"
            >
              <h1 className="font-playfair font-semibold text-forest-green block mt-2">
                Shhhh 🤫 Don't Tell Anyone Yet!
              </h1>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair text-forest-green leading-[1.1] tracking-tight">
                A Little One
                <br />
                <span className="relative inline-block">
                  <span className="text-golden-yellow">is on the Way</span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-golden-yellow/40 via-golden-yellow/60 to-transparent"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Elegant subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl font-light"
            >
              Join us in celebrating{" "}
              <span className="font-playfair font-semibold text-forest-green block mt-2">
                Adebukola Ayeni Jolayemi
              </span>
            </motion.p>

            {/* Refined info cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-6"
            >
              {[
                {
                  icon: Calendar,
                  label: "Date",
                  value: "Saturday, March 14th, 2026",
                  color: "from-forest-green/10 to-emerald-100/40",
                },
                {
                  icon: Clock,
                  label: "Time",
                  value: "3:30 PM – 7:00 PM",
                  note: "To help us enjoy every moment, we’ll be keeping to time",
                  color: "from-golden-yellow/10 to-amber-100/40",
                },
                {
                  icon: MapPin,
                  label: "Venue",
                  value:
                    "Traphene Hickman Public Library 450 Pioneer Trail Cedar Hill Tx 75104",
                  color: "from-forest-green/10 to-green-100/40",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={` bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-md hover:shadow-xl transition-all`}
                >
                  <item.icon className="w-5 h-5 text-forest-green mb-3" />
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-1.5 font-medium">
                    {item.label}
                  </p>
                  <p className="text-base font-semibold text-forest-green">
                    {item.value}
                  </p>
                  {item.note && (
                    <p className="text-xs text-gray-500 mt-1 font-light">
                      {item.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Invitation Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:ml-8"
          >
            <motion.div
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              className="relative rounded-[32px] overflow-hidden shadow-2xl"
            >
              <img
                src="/Adebukola-Ayeni-Jolayemi.png"
                alt="Baby Shower Invitation for Adebukola Ayeni Jolayemi"
                className="w-full h-auto object-cover"
              />

              {/* Optional: Decorative border overlay */}
              <div className="absolute inset-0 rounded-[32px] border-2 border-golden-yellow/20 pointer-events-none"></div>

              {/* Optional: Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-forest-green via-golden-yellow to-forest-green"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* Refined scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium"
          >
            Scroll to explore
          </motion.p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-5 h-5 text-golden-yellow/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
