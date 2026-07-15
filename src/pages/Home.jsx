import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Image as ImageIcon, Flame, Sparkles, Star, ArrowRight, Award, ShieldCheck } from 'lucide-react';
import API from '../api';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
    title: 'SIZZLING LIVE KARAHI',
    tagline: 'Smokey Desi Spices & Fresh Mutton Cooked Live',
    accent: 'from-amber-400 via-rose-500 to-red-600'
  },
  {
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80',
    title: 'ROYAL BANQUET FEASTS',
    tagline: 'Luxurious Dining Experience for Unforgettable Events',
    accent: 'from-pink-500 via-purple-500 to-indigo-600'
  },
  {
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
    title: 'CHARCOAL GRILLED BBQ',
    tagline: 'Tender Seekh Kebabs & Juicy Tikka Skewers',
    accent: 'from-red-500 via-orange-500 to-amber-500'
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredMenu, setFeaturedMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto Slider Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Menu Items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/api/menu');
        setFeaturedMenu(res.data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen overflow-x-hidden font-sans relative selection:bg-rose-500 selection:text-white pt-20" >

      {/* CONTINUOUS DYNAMIC AMBIENT LIGHTING (ORBS) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 80, -40, 0], 
            y: [0, -60, 40, 0], 
            scale: [1, 1.3, 0.9, 1] 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[35rem] h-[35rem] bg-rose-600/30 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -90, 50, 0], 
            y: [0, 70, -50, 0], 
            scale: [1, 1.2, 1.1, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -right-32 w-[40rem] h-[40rem] bg-amber-600/25 rounded-full blur-[160px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 60, -60, 0], 
            y: [0, -50, 50, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 left-1/3 w-[30rem] h-[30rem] bg-purple-600/25 rounded-full blur-[130px]"
        />
      </div>

      {/* FULLSCREEN CINEMATIC HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden z-10 px-4">

        {/* FULL BLEED BACKGROUND CAROUSEL WITH DYNAMIC SLIDE EFFECTS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* CINEMATIC GRADIENT OVERLAYS FOR MAXIMUM CONTRAST & MOOD */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10]/90 via-transparent to-[#0b0c10]/90" />

        {/* HERO CONTENT - DIRECTLY OVERLAYED ON CINEMATIC BACKGROUND */}
        <div className="relative z-20 text-center max-w-5xl mx-auto space-y-8 px-4">
          
          {/* Animated Sizzling Live Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md shadow-2xl"
          >
            <motion.span 
              animate={{ scale: [1, 1.4, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Flame className="w-5 h-5 text-rose-500 fill-rose-500" />
            </motion.span>
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-pink-400">
              {heroSlides[currentSlide].tagline}
            </span>
          </motion.div>

          {/* Dynamic Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1 
              key={currentSlide}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
            >
              {heroSlides[currentSlide].title.split(' ')[0]} <br />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${heroSlides[currentSlide].accent}`}>
                {heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
          </AnimatePresence>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 text-lg sm:text-2xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            Taste the sizzle of authentic Pakistani barbecue, rich handi curries, and royal hospitality.
          </motion.p>

          {/* Interactive Bouncy Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-5 pt-4"
          >
            <Link to="/menu">
              <motion.button 
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.92 }}
                className="relative group overflow-hidden rounded-2xl p-[2px] focus:outline-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 rounded-2xl animate-gradient-x" />
                <span className="relative px-8 py-4 bg-slate-950 rounded-2xl flex items-center gap-3 font-extrabold text-white text-base transition group-hover:bg-transparent">
                  <Utensils className="w-5 h-5 text-amber-400 group-hover:text-white transition" />
                  <span>Explore Menu</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </span>
              </motion.button>
            </Link>

            <Link to="/gallery">
              <motion.button 
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.92 }}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xl rounded-2xl text-white font-extrabold text-base flex items-center gap-3 shadow-2xl transition"
              >
                <ImageIcon className="w-5 h-5 text-rose-400" />
                <span>Gallery & Vibe</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center gap-3 pt-8">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? 'w-10 bg-gradient-to-r from-rose-500 to-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* CONTINUOUS MOTION STRIP (NON-STOP MARQUEE) */}
      <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-rose-700 py-3 overflow-hidden rotate-[-1deg] scale-105 shadow-2xl z-20 relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-12 text-black font-black uppercase text-sm tracking-widest items-center"
        >
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="flex items-center gap-2"><Flame className="w-4 h-4" /> Fresh Mutton Karahi</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Star className="w-4 h-4 fill-black" /> Charcoal BBQ Skewers</span>
              <span>•</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> Luxury Event Banquet</span>
              <span>•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* CONTINUOUS FLOATING FEATURE CARDS */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-amber-400 font-extrabold text-xs uppercase tracking-widest bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/30"
          >
            Why Choose Pind Hotel
          </motion.span>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl font-black mt-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400"
          >
            AN UNFORGETTABLE FEAST
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Flame className="w-8 h-8 text-rose-500" />,
              title: 'Live Coal Karahi & BBQ',
              desc: 'Prepared right before your eyes with authentic spices and fresh meats.',
              gradient: 'from-rose-500/20 to-orange-500/5',
              borderColor: 'group-hover:border-rose-500/50'
            },
            {
              icon: <Award className="w-8 h-8 text-amber-400" />,
              title: 'Royal Banquet Halls',
              desc: 'Air-conditioned hall setups customized for weddings, corporate meets, and parties.',
              gradient: 'from-amber-500/20 to-yellow-500/5',
              borderColor: 'group-hover:border-amber-400/50'
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
              title: '100% Pure & Hygienic',
              desc: 'Pure desi ghee, fresh ingredients, and strict cleanliness standards.',
              gradient: 'from-emerald-500/20 to-teal-500/5',
              borderColor: 'group-hover:border-emerald-400/50'
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              animate={{ 
                y: [0, idx % 2 === 0 ? -8 : 8, 0] 
              }}
              transition={{
                y: { duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }
              }}
              whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
              className={`group p-8 rounded-3xl bg-gradient-to-b ${card.gradient} bg-slate-900/80 border border-white/10 ${card.borderColor} backdrop-blur-xl shadow-2xl transition duration-500 relative cursor-pointer overflow-hidden`}
            >
              <div className="p-4 rounded-2xl bg-white/5 w-fit mb-6 border border-white/10 group-hover:scale-110 transition duration-300">
                {card.icon}
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3 group-hover:text-amber-400 transition">{card.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DISH SHOWCASE WITH HIGH-CONTRAST CARDS & CONTINUOUS SHAKE ON TOUCH */}
      <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <span className="text-rose-500 font-extrabold text-xs uppercase tracking-widest bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/30">
              Chef Specialities
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white mt-4">TRENDING DISHES</h2>
          </div>
          <Link to="/menu">
            <motion.div 
              whileHover={{ x: 8 }}
              className="text-amber-400 font-extrabold text-base flex items-center gap-2 mt-4 md:mt-0 cursor-pointer"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 font-bold text-xl animate-pulse">Loading culinary masterpieces...</div>
        ) : featuredMenu.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-white/10 text-slate-400">
            No dishes listed yet. Add items via Admin Panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMenu.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.95, rotate: [0, -2, 2, 0] }}
                className="group bg-slate-900/90 border border-white/10 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 relative cursor-pointer"
              >
                <div>
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-115 transition duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-amber-400 font-black text-xs px-3.5 py-1.5 rounded-full border border-amber-400/30">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-extrabold text-xl text-white group-hover:text-amber-400 transition">{item.name}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                  <span className="text-emerald-400 font-black text-2xl">Rs. {item.price}</span>
                  <Link to="/menu">

                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default Home;