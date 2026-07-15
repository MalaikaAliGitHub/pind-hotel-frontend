import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, MapPin, Clock, Send, Sparkles, Utensils } from 'lucide-react';

const Contact = () => {
  const whatsappNumber = '923224720525'; 
  const phoneNumber = '03224720525';

  return (
    <section className="relative bg-[#0b0c10] text-white py-20 overflow-hidden font-sans border-t border-white/10" id="contact">
      
      {/* Background Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-rose-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/15 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-16">
        
        {/* Section Title & Prominent Call to Action */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-xl">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              Get In Touch With PIND Hotel
            </span>
          </div>

          {/* MAIN PROMINENT HEADING */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-amber-500 drop-shadow-2xl leading-tight"
          >
            FOR ORDER PLEASE CONTACT US OR VISIT US
          </motion.h2>

          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Reserve your table for special occasions, order live charcoal BBQ, or drop by our main Kala Shah Kaku branch!
          </p>
        </div>

        {/* Action Buttons Grid (WhatsApp & Phone) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* WhatsApp Direct Chat Card */}
          <motion.a 
            href={`https://wa.me/${whatsappNumber}?text=Hello%20PIND%20Hotel,%20I%20want%20to%20order%20food/reserve%20a%20table.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 p-6 sm:p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between gap-4 shadow-2xl group transition"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition duration-300">
                <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-extrabold uppercase tracking-widest block">Instant Order & Reservation</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">WhatsApp Order</h3>
                <p className="text-sm text-slate-300 font-bold mt-1">{phoneNumber}</p>
              </div>
            </div>
            <span className="hidden sm:inline-block bg-emerald-500 text-black text-xs font-black px-5 py-3 rounded-2xl group-hover:scale-105 transition shadow-lg">
              Order Now
            </span>
          </motion.a>

          {/* Direct Phone Call Card */}
          <motion.a 
            href={`tel:${phoneNumber}`}
            whileHover={{ scale: 1.03, y: -5 }}
            whileTap={{ scale: 0.97 }}
            className="bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 p-6 sm:p-8 rounded-3xl backdrop-blur-xl flex items-center justify-between gap-4 shadow-2xl group transition"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition duration-300">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest block">Direct Phone Call</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">Call Us Directly</h3>
                <p className="text-sm text-slate-300 font-bold mt-1">{phoneNumber}</p>
              </div>
            </div>
            <span className="hidden sm:inline-block bg-amber-500 text-black text-xs font-black px-5 py-3 rounded-2xl group-hover:scale-105 transition shadow-lg">
              Call Now
            </span>
          </motion.a>

        </div>

        {/* MAP & CONTACT FORM CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Main Kala Shah Kaku Branch Map Card */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-rose-400 font-bold uppercase tracking-widest block">Visit Us On GT Road</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Kala Shah Kaku Main Branch</h3>
              </div>
              <MapPin className="w-7 h-7 text-amber-400 animate-bounce" />
            </div>

            {/* Embedded Real Google Map for Kala Shah Kaku */}
            <div className="h-72 w-full rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
              <iframe 
                title="PIND Hotel Kala Shah Kaku Location"
                src="https://maps.google.com/maps?q=Kala%20Shah%20Kaku%20GT%20Road%20Pind%20Hotel&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                className="w-full h-full border-0 filter opacity-90 contrast-125 invert-[0.9] hue-rotate-180"
                allowFullScreen="" 
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Timing: 12:00 PM - 02:00 AM Daily</span>
              </div>
              <span className="text-amber-400 font-extrabold">Open Now</span>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Utensils className="w-5 h-5 text-rose-400" />
                <h3 className="text-2xl font-black text-white">Online Order / Booking Query</h3>
              </div>
              <p className="text-xs text-slate-400 mb-6">Leave a message for party bookings, bulk orders, or table reservations.</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your order query has been received."); }} className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold mb-1 block">Your Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ali Khan"
                  className="w-full bg-slate-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold mb-1 block">Phone / WhatsApp Number</label>
                <input 
                  type="text" 
                  required 
                  placeholder="0322 4720525"
                  className="w-full bg-slate-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold mb-1 block">Order Details or Special Request</label>
                <textarea 
                  rows="3" 
                  required 
                  placeholder="I want to order 2 Mutton Karahi and book a table..."
                  className="w-full bg-slate-950/80 border border-white/10 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition resize-none"
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 via-amber-400 to-amber-500 text-black font-black py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:brightness-110 transition text-sm uppercase tracking-wider"
              >
                <Send className="w-4 h-4" />
                <span>Send Order Query</span>
              </motion.button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;