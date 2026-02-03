"use client";
import { Heart, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-green text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-playfair mb-4 text-golden-yellow">
              Passport to Baby
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Celebrating Adebukola Ayeni Jolayemi
            </p>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <p className="mb-3 text-gray-200 italic leading-relaxed text-sm">
              "Children are a heritage from the Lord, offspring a reward from him."
            </p>
            <p className="text-xs text-gray-400">— Psalm 127:3</p>
          </div>

          {/* Column 3 */}
          <div className="text-center md:text-right">
            <h4 className="text-base font-semibold mb-4 text-golden-yellow">
              Contact
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@example.com"
                className="flex items-center justify-center md:justify-end gap-2 text-gray-200 hover:text-golden-yellow transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>ayenigloria@yahoo.com</span>
              </a>
              <a
                href="tel:+14695568054"
                className="flex items-center justify-center md:justify-end gap-2 text-gray-200 hover:text-golden-yellow transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>+1 469 556 8054</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 flex items-center gap-2">
              Made with{" "}
              <Heart className="w-4 h-4 text-golden-yellow fill-current" /> for
              our little blessing
            </p>
            <p className="text-sm text-gray-400">
              © 2026 Baby Shower. Designed by Olufunbi Ibrahim
            </p>
            <p className="text-sm text-gray-400">
              <a href="mailto:olufunbiibrahim@gmail.com" className="text-golden-yellow hover:text-white transition-colors">Email: olufunbiibrahim@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
