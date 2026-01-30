"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Heart, Sparkles, Baby, Users, Mail, Phone, MessageCircle, UtensilsCrossed } from "lucide-react";

type RSVPFormData = {
  name: string;
  email: string;
  phone?: string;
  attendance: string;
  guests?: string;
  dietary?: string;
  message?: string;
};


export default function RSVPForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
    watch,
  } =  useForm<RSVPFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const attendance = watch("attendance");

  // Google Form configuration
  // Replace these with your actual Google Form field entry IDs
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLScDaeo4T0Kf7pk0fjsa5WE-e_msGVd33_xql5QvPrliiHAgvw/formResponse";
  const GOOGLE_FORM_FIELDS = {
    name: "entry.1279092776",
    email: "entry.349267748",
    phone: "entry.877378443",
    attendance: "entry.145703893",
    guests: "entry.1545021241",
    dietary: "entry.132236337",
    message: "entry.2115061428"
  };

  const onSubmit = async (data: RSVPFormData) => {
    // ⛔ HARD STOP: prevent auto-submit before step 3
    if (currentStep !== 3) return;
  
    setIsLoading(true);
  
    try {
      const formData = new FormData();
      formData.append(GOOGLE_FORM_FIELDS.name, data.name);
      formData.append(GOOGLE_FORM_FIELDS.email, data.email);
      formData.append(GOOGLE_FORM_FIELDS.phone, data.phone || "");
      formData.append(GOOGLE_FORM_FIELDS.attendance, data.attendance);
      formData.append(GOOGLE_FORM_FIELDS.guests, data.guests || "1");
      formData.append(GOOGLE_FORM_FIELDS.dietary, data.dietary || "");
      formData.append(GOOGLE_FORM_FIELDS.message, data.message || "");
  
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
  
      setIsSubmitted(true);
      reset();
      setCurrentStep(1);
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your RSVP.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-amber-50/50 via-emerald-50/30 to-rose-50/40 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-20 w-96 h-96 bg-forest-green rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.04, 0.06, 0.04]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-golden-yellow rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
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
            className="inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-golden-yellow" />
            <Baby className="w-8 h-8 text-forest-green" />
            <Sparkles className="w-6 h-6 text-golden-yellow" />
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-playfair text-forest-green mb-4 tracking-tight">
            Will You Join Us?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-pink via-golden-yellow to-lavender mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-xl leading-relaxed max-w-xl mx-auto">
            We would be honored by your presence! Please RSVP by{" "}
            <span className="font-bold text-forest-green">March 1st, 2026</span>
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-3xl p-12 md:p-16 text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative inline-block mb-8"
              >
                <CheckCircle className="w-24 h-24 text-green-500" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-4 border-green-400"
                />
              </motion.div>
              
              <h3 className="text-4xl md:text-5xl font-playfair text-green-700 mb-4">
                Thank You!
              </h3>
              <p className="text-gray-700 text-xl leading-relaxed mb-4">
                Your RSVP has been received successfully! 
              </p>
              <p className="text-gray-600 text-lg">
                We can't wait to celebrate with you! 🎉✨
              </p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex justify-center gap-2"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 0, -10] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.1 
                    }}
                  >
                    <Heart className="w-5 h-5 text-rose-pink fill-current" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              {/* Step indicator */}
              <div className="flex justify-center mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: step * 0.1 }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        currentStep >= step
                          ? "bg-gradient-to-br from-forest-green to-emerald-600 text-white shadow-lg"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step}
                    </motion.div>
                    {step < 3 && (
                      <div className={`w-16 h-1 transition-all ${
                        currentStep > step ? "bg-forest-green" : "bg-gray-200"
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <motion.form
  layout
  onSubmit={handleSubmit(onSubmit)}
  onKeyDown={(e) => {
    if (
      e.key === "Enter" &&
      currentStep !== 3 &&
      e.target instanceof HTMLElement &&
      e.target.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();

    }
    
  }}
  
  className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-white/60"
>

                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Info */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-playfair text-forest-green mb-6 text-center">
                        Let's start with the basics
                      </h3>

                      {/* Name */}
                      <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Heart className="w-4 h-4 text-rose-pink" />
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          {...register("name", { required: "Please enter your name" })}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-forest-green focus:ring-4 focus:ring-forest-green/20 focus:outline-none transition-all bg-white/50 text-lg"
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            ⚠️ {errors.name.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Mail className="w-4 h-4 text-golden-yellow" />
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          {...register("email", {
                            required: "Please enter your email",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Please enter a valid email address",
                            },
                          })}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-golden-yellow focus:ring-4 focus:ring-golden-yellow/20 focus:outline-none transition-all bg-white/50 text-lg"
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            ⚠️ {errors.email.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Phone className="w-4 h-4 text-lavender" />
                          Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          {...register("phone")}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-lavender focus:ring-4 focus:ring-lavender/20 focus:outline-none transition-all bg-white/50 text-lg"
                          placeholder="+234 XXX XXX XXXX"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Attendance & Guests */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-playfair text-forest-green mb-6 text-center">
                        Can you make it?
                      </h3>

                      {/* Attendance - Beautiful Radio Buttons */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                          <Sparkles className="w-4 h-4 text-golden-yellow" />
                          Will you attend? <span className="text-red-400">*</span>
                        </label>
                        <div className="space-y-3">
                        {[
  { value: "🎉 Yes, I'll be there!", label: "Yes, I'll be there!", emoji: "🎉", color: "from-green-500 to-emerald-500" },
  { value: "🤔 Maybe - I'll confirm soon", label: "Maybe - I'll confirm soon", emoji: "🤔", color: "from-amber-500 to-yellow-500" },
  { value: "😢 Sorry, can't make it", label: "Sorry, can't make it", emoji: "😢", color: "from-gray-400 to-gray-500" },
].map((option) => (
                            <motion.label
                              key={option.value}
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                                attendance === option.value
                                  ? `border-forest-green bg-gradient-to-r ${option.color} bg-opacity-10 shadow-lg`
                                  : "border-gray-200 bg-white/50 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="radio"
                                value={option.value}
                                {...register("attendance", { required: "Please select an option" })}
                                className="w-5 h-5 text-forest-green focus:ring-forest-green"
                              />
                              <span className="text-2xl">{option.emoji}</span>
                              <span className={`font-semibold flex-1 ${
                                attendance === option.value ? "text-forest-green" : "text-gray-700"
                              }`}>
                                {option.label}
                              </span>
                            </motion.label>
                          ))}
                        </div>
                        {errors.attendance && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm mt-2 flex items-center gap-1"
                          >
                            ⚠️ {errors.attendance.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Number of guests - Interactive Counter */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <Users className="w-4 h-4 text-sage-green" />
                          Number of Guests (Including you)
                        </label>
                        <div className="flex items-center gap-4 bg-white/50 rounded-2xl p-4 border-2 border-gray-200">
                          <span className="text-gray-600 flex-1">How many people will attend?</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            defaultValue="1"
                            {...register("guests")}
                            className="w-20 px-4 py-3 text-center text-xl font-bold rounded-xl border-2 border-forest-green/20 focus:border-forest-green focus:outline-none bg-white"
                          />
                        </div>
                      </div>

                      {/* Dietary restrictions */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <UtensilsCrossed className="w-4 h-4 text-rose-pink" />
                          Dietary Restrictions (Optional)
                        </label>
                        <textarea
                          {...register("dietary")}
                         rows={3}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-rose-pink focus:ring-4 focus:ring-rose-pink/20 focus:outline-none transition-all resize-none bg-white/50"
                          placeholder="Any allergies or dietary preferences we should know about?"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Message */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-playfair text-forest-green mb-6 text-center">
                        Share your wishes
                      </h3>

                      {/* Message */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                          <MessageCircle className="w-4 h-4 text-lavender" />
                          Message for the Mom-to-be (Optional)
                        </label>
                        <textarea
                          {...register("message")}
                        rows={6}
                          className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-lavender focus:ring-4 focus:ring-lavender/20 focus:outline-none transition-all resize-none bg-white/50 text-lg"
                          placeholder="Share your congratulations, advice, or well wishes for the new arrival... ✨"
                        />
                      </div>

                      <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-2xl p-6 border-2 border-golden-yellow/30">
                        <p className="text-center text-gray-700 leading-relaxed">
                          <span className="text-2xl mb-2 block">💝</span>
                          Your kind words will be treasured and shared with Adebukola!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition-all"
                    >
                      ← Previous
                    </motion.button>
                  )}
                  
                  {currentStep < 3 ? (
                    <motion.button
  type="button"
  layout
  onClick={async () => {
    if (currentStep === 1) {
      const isValid = await trigger(["name", "email"]);
      if (isValid) nextStep();
    } else if (currentStep === 2) {
      const isValid = await trigger(["attendance"]);
      if (isValid) nextStep();
    }
  }}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="flex-1 bg-gradient-to-r from-forest-green to-emerald-600 hover:from-forest-green/90 hover:to-emerald-600/90 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
>
  Next →
</motion.button>


                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                      className="flex-1 bg-gradient-to-r from-forest-green via-emerald-600 to-teal-600 hover:from-forest-green/90 hover:via-emerald-600/90 hover:to-teal-600/90 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-3 border-white border-t-transparent"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Submit RSVP</span>
                          <Sparkles className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Embedded Google Form Option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Prefer to use Google Forms directly?
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScDaeo4T0Kf7pk0fjsa5WE-e_msGVd33_xql5QvPrliiHAgvw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-forest-green hover:text-forest-green/80 font-semibold transition-colors underline"
          >
            Open in Google Forms →
          </a>
        </motion.div>
      </div>
    </section>
  );
}