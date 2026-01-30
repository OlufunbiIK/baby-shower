"use client";
import { motion } from "framer-motion";
import { Heart, Lock, Sparkles } from "lucide-react";

export default function PrivacyNotice() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-pink/5 via-lavender/5 to-sky-blue/5">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="bg-gradient-to-br from-white via-rose-pink/5 to-lavender/5 rounded-3xl p-10 md:p-12 shadow-elegant border-2 border-rose-pink/20 relative overflow-hidden"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-pink via-golden-yellow via-sage-green to-lavender"></div>
          
          <div className="flex items-start gap-5 mb-8">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-forest-green/15 to-sage-green/10 p-3 rounded-xl border border-forest-green/20"
            >
              <Lock className="w-6 h-6 text-forest-green" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-forest-green mb-1 tracking-tight">
                PLEASE READ
              </h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider">Important Information</p>
            </div>
          </div>
          
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg"
            >
              Hey Family 🤍 With hearts full of gratitude, we're excited to share our baby shower invitation with you. This sweet baby is truly a gift from God, and we're so thankful for your love and prayers. ❤️
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-semibold text-forest-green text-base md:text-lg bg-forest-green/5 rounded-xl p-4 border-l-4 border-forest-green"
            >
              Kindly keep all shower details and photos private until we officially share. Thank you for respecting our wishes and helping us keep this moment special ❤️
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-lg"
            >
              We can't wait to celebrate together! ✨
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6 border-t border-gray-200/50 flex items-center gap-3"
            >
              <Sparkles className="w-4 h-4 text-golden-yellow flex-shrink-0" />
              <p className="text-sm italic text-gray-600">
                "Children are a heritage from the Lord." — Psalm 127:3
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
