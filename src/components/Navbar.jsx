import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, UtensilsCrossed, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Scroll detection for Navbar transparency shift
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0b0c10]/90 backdrop-blur-2xl border-b border-white/10 py-3 shadow-2xl shadow-rose-500/5' 
          : 'bg-gradient-to-b from-[#0b0c10]/90 via-[#0b0c10]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* CINEMATIC LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="p-2.5 rounded-2xl bg-gradient-to-br from-rose-500 to-amber-500 shadow-lg shadow-rose-500/30 border border-white/20"
          >
            <Flame className="w-6 h-6 text-black fill-black" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white group-hover:text-amber-400 transition">
              PIND HOTEL
            </span>
            <span className="text-[10px] font-extrabold tracking-widest text-rose-500 uppercase -mt-1 flex items-center gap-1">
              <span>ROYAL BANQUET</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </span>
          </div>
        </Link>

        {/* FLOATING DESKTOP NAVIGATION PILL */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-1.5 rounded-full shadow-2xl">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-6 py-2 text-sm font-extrabold transition-all duration-200 rounded-full ${
                  isActive ? 'text-black font-black' : 'text-slate-300 hover:text-amber-400'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-rose-500 to-amber-400 rounded-full -z-10 shadow-lg shadow-rose-500/25"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* ACTION BUTTON */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/menu">
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.92 }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 flex items-center gap-2 hover:brightness-110 transition border border-amber-400/30"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Order Now</span>
            </motion.button>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-2xl bg-white/10 border border-white/20 text-white hover:text-amber-400 transition backdrop-blur-lg"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU SLIDE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0b0c10]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3 flex flex-col">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-black px-5 py-3 rounded-2xl transition ${
                      isActive 
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-black shadow-lg' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-amber-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link to="/menu" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full mt-3 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-black font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2">
                  <UtensilsCrossed className="w-5 h-5" />
                  <span>Order Now</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;