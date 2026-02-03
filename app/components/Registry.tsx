"use client";
import { motion } from "framer-motion";
import { Gift, ShoppingBag, Heart, ExternalLink, QrCode, Smartphone } from "lucide-react";

export default function Registry() {
  const registries = [
    {
      name: "Amazon Baby Registry",
      icon: ShoppingBag,
      description: "Our curated list of baby essentials",
      url:"https://www.amazon.com/baby-reg/felicia-jolayemi-may-2026-midlothian/MUCCR7SKK6LN?ref_=cm_sw_r_apin_dp_2FGHHPZJ90R576ZH7TJM&language=en-US",
      // url: "https://www.amazon.com/baby-reg/adebukola-ayenijolayemi-march-2026-alcobendas/BZWNJQ47Q0EO?ref_=cm_sw_r_cp_ud_dp_26P4C1180FP6GRBXYVER",
      color: "from-orange-500 to-amber-500",
      hoverColor: "hover:from-orange-600 hover:to-amber-600",
    },
    // {
    //   name: "Target Registry",
    //   icon: Gift,
    //   description: "Additional items we love",
    //   url: "https://www.target.com/gift-registry/your-link",
    //   color: "from-red-500 to-rose-500",
    //   hoverColor: "hover:from-red-600 hover:to-rose-600",
    // },
    // {
    //   name: "Baby Fund Contribution",
    //   icon: Heart,
    //   description: "For diapers, wipes, and future needs",
    //   url: "https://venmo.com/AdebukTheeMom",
    //   isVenmo: true,
    //   venmoHandle: "@AdebukTheeMom",
    //   color: "from-sage-green to-forest-green",
    //   hoverColor: "hover:from-forest-green hover:to-sage-green",
    // },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-sage-green/10 via-sky-blue/10 to-lavender/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair text-forest-green mb-4 tracking-tight">
            Gift Registry
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-rose-pink via-golden-yellow via-sage-green to-lavender mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-3">
            Help us welcome our little blessing with love
          </p>
          <p className="text-sm text-gray-500 italic">
            Your presence is the greatest gift! Gifts are optional but deeply appreciated. 💝
          </p>
        </motion.div>

        <div className="flex flex-col justify-center items-center gap-6">
          {registries.map((registry, index) => {
            const Icon = registry.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
           <div className="flex justify-center items-center w-full p-6">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="group"
      >
        <div className="glass rounded-2xl p-8 shadow-soft border border-gray-100/50 hover:border-gray-200/50 hover:shadow-elegant transition-all duration-300 h-full flex flex-col">
          
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            className={`bg-gradient-to-br ${registry.color} ${registry.hoverColor} w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Content */}
          <h3 className="text-xl font-playfair text-forest-green mb-3">
            {registry.name}
          </h3>
          <p className="text-gray-600 mb-6 flex-grow leading-relaxed text-sm">
            {registry.description}
          </p>

          {/* Button */}
          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            href={registry.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full bg-gradient-to-r ${registry.color} ${registry.hoverColor} text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2`}
          >
            <span>Shop Registry</span>
            <motion.div whileHover={{ x: 2, y: -2 }}>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          </motion.a>
        </div>
      </motion.div>
    </div>
              </motion.div>
            );
          })}
        </div>

        {/* QR Code section - enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 text-center"
        >
          <motion.div
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="inline-block glass rounded-3xl p-12 shadow-elegant border border-gray-100/50 max-w-md"
          >
            {/* Header with icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-br from-forest-green/10 to-sage-green/5 p-3 rounded-xl"
              >
                <QrCode className="w-6 h-6 text-forest-green" />
              </motion.div>
              <div>
                <h3 className="text-xl font-playfair text-forest-green mb-1">
                  Quick Access
                </h3>
                <p className="text-sm text-gray-500">
                  Scan with your phone
                </p>
              </div>
            </motion.div>

            {/* QR Code container with elegant styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="relative mb-6"
            >
              <div className="relative w-56 h-56 mx-auto">
                {/* Decorative corner accents */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-golden-yellow rounded-tl-lg"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-golden-yellow rounded-tr-lg"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-golden-yellow rounded-bl-lg"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-golden-yellow rounded-br-lg"></div>
                
                {/* QR Code placeholder with gradient background */}
                <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl flex flex-col items-center justify-center border-2 border-gray-200 shadow-inner relative overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #1a4d2e 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                  
                  {/* QR Code icon or image placeholder */}
                  <div className="relative z-10 flex flex-col items-center">
                  
                    {/* Replace this with your actual QR code image */}
                    <img src="/frame.png" alt="Registry QR Code" className="w-full h-full object-contain rounded-xl" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-600"
            >
              <Smartphone className="w-4 h-4 text-sage-green" />
              <span>Scan to access registry on mobile</span>
            </motion.div>

            {/* Decorative bottom accent */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-golden-yellow to-transparent mt-6"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
