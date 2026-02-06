"use client";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Info,
  Navigation,
  ShieldAlert,
  Coffee,
  Gift,
  Camera,
} from "lucide-react";

export default function EventDetails() {
  // Event location details
  const eventLocation = {
    address:
      "Traphene Hickman Public Library, 450 Pioneer Trail, Cedar Hill, TX 75104",
    // Cedar Hill, TX coordinates (Traphene Hickman Public Library)
    lat: 32.5882,
    lng: -96.9561,
    // Google Maps embed URL for Traphene Hickman Public Library
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3355.4!2d-96.9561!3d32.5882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d1f5f5f5f5f%3A0x1234567890abcdef!2sTraphene%20Hickman%20Public%20Library!5e0!3m2!1sen!2sus!4v1706454123456!5m2!1sen!2sus",
  };

  const eventDetails = [
    {
      icon: Calendar,
      label: "Date",
      value: "Saturday, March 14th, 2026",
      bgClass: "from-forest-green/10 to-emerald-100/40",
      borderClass: "hover:border-forest-green/40",
      iconBgClass: "from-white to-forest-green/20",
      iconColor: "text-forest-green",
    },
    {
      icon: Clock,
      label: "Time",
      value: "4 PM – 8 PM",
      extra: "CTGMT (Central Time GMT)",
      bgClass: "from-golden-yellow/10 to-amber-100/40",
      borderClass: "hover:border-golden-yellow/40",
      iconBgClass: "from-white to-golden-yellow/20",
      iconColor: "text-golden-yellow",
    },
    {
      icon: MapPin,
      label: "Location",
      value:
        "Traphene Hickman Public Library, 450 Pioneer Trail, Cedar Hill, TX 75104",
      bgClass: "from-sage-green/10 to-green-100/40",
      borderClass: "hover:border-sage-green/40",
      iconBgClass: "from-white to-sage-green/20",
      iconColor: "text-sage-green",
    },
  ];

  const additionalInfo = [
    {
      icon: Info,
      label: "Dress Code",
      value: "Semi-Formal",
      description: "Garden party attire encouraged",
      bgClass: "from-rose-pink/20 to-lavender/20",
      borderClass: "hover:border-rose-pink/40",
      iconBgClass: "from-white to-rose-pink/20",
      iconColor: "text-rose-pink",
    },
    {
      icon: Navigation,
      label: "Parking",
      value: "Available on-site",
      description: "Free parking for all guests",
      bgClass: "from-sky-blue/20 to-sage-green/20",
      borderClass: "hover:border-sky-blue/40",
      iconBgClass: "from-white to-sky-blue/20",
      iconColor: "text-sky-blue",
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-emerald-50/50 via-amber-50/30 to-green-50/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-forest-green/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-golden-yellow/8 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-forest-green/10 to-golden-yellow/10 rounded-full mb-6"
          >
            <Calendar className="w-8 h-8 text-forest-green" />
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-playfair text-forest-green mb-4 tracking-tight">
            Event Details
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Mark your calendars for this special celebration
          </p>
        </motion.div>

        {/* Main Event Details Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {eventDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className={`group bg-gradient-to-br ${detail.bgClass} backdrop-blur-sm rounded-3xl p-8 border-2 border-white/60 ${detail.borderClass} transition-all duration-300 shadow-lg hover:shadow-2xl`}
              >
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`inline-flex bg-gradient-to-br ${detail.iconBgClass} p-4 rounded-2xl shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${detail.iconColor}`} />
                  </motion.div>

                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-gray-500 mb-3 font-bold">
                      {detail.label}
                    </p>
                    <p className="text-2xl font-playfair text-forest-green leading-tight mb-2">
                      {detail.value}
                    </p>
                    {detail.extra && (
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {detail.extra}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Google Maps Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-golden-yellow/20">
            <div className="bg-gradient-to-r from-forest-green to-emerald-600 p-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-white" />
                <div>
                  <p className="text-white/80 text-sm">
                    {eventLocation.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="relative w-full h-[400px] md:h-[500px]">
              <iframe
                src={eventLocation.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
                className="grayscale-0 hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Get Directions Button */}
            <div className="p-6 bg-gradient-to-br from-amber-50 to-emerald-50">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${eventLocation.lat},${eventLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Navigation className="w-5 h-5" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-playfair text-forest-green mb-8 text-center">
            Good to Know
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className={`group bg-gradient-to-br ${info.bgClass} rounded-2xl p-8 border-2 border-transparent ${info.borderClass} transition-all duration-300 hover:shadow-elegant`}
                >
                  <div className="flex items-start gap-5">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`bg-gradient-to-br ${info.iconBgClass} p-4 rounded-xl transition-all duration-300 shadow-sm`}
                    >
                      <Icon className={`w-6 h-6 ${info.iconColor}`} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2 font-bold">
                        {info.label}
                      </p>
                      <p className="text-xl font-playfair text-forest-green mb-1">
                        {info.value}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Important Notes - Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-rose-pink/10 via-golden-yellow/10 to-lavender/10 rounded-3xl p-10 md:p-12 border-2 border-rose-pink/30 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-golden-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-pink/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-playfair text-forest-green mb-3">
                Important Notes
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto rounded-full"></div>
            </div>

            <ul className="space-y-4 text-gray-700 max-w-2xl mx-auto">
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ShieldAlert className="w-7 h-7 text-rose-pink flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest-green mb-1">
                    Surprise Shower!
                  </p>
                  <p className="leading-relaxed text-gray-600">
                    This is a surprise for Adebukola - please keep it secret
                    until the big day!
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Coffee className="w-7 h-7 text-amber-500 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest-green mb-1">
                    Refreshments Provided
                  </p>
                  <p className="leading-relaxed text-gray-600">
                    Light refreshments, snacks, and beverages will be served
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Gift className="w-7 h-7 text-rose-pink flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest-green mb-1">
                    Gifts Welcome
                  </p>
                  <p className="leading-relaxed text-gray-600">
                    Gifts are optional but deeply appreciated. Check the
                    registry for ideas!
                  </p>
                </div>
              </motion.li>

              <motion.li
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Camera className="w-7 h-7 text-lavender flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest-green mb-1">
                    Photo Opportunities
                  </p>
                  <p className="leading-relaxed text-gray-600">
                    We'll have a photo booth and beautiful backdrops - come
                    camera ready!
                  </p>
                </div>
              </motion.li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
