import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Search, UtensilsCrossed, Sparkles, ShoppingBag, Star, Zap } from 'lucide-react';
import API from '../api';

const categories = ['All', 'Desi', 'Fast Food', 'Chinese', 'Beverages', 'Shakes', 'Cold Drinks', 'Desserts'];

const Menu = () => {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await API.get('/api/menu');
        setItems(res.data);
      } catch (err) {
        console.error('Failed to load menu items:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // Filter Logic (Search + Category)
  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen overflow-x-hidden font-sans relative pt-28 pb-20 selection:bg-rose-500 selection:text-white">

      {/* CONTINUOUS DYNAMIC AMBIENT LIGHTING (ORBS) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 90, -50, 0], 
            y: [0, -70, 50, 0], 
            scale: [1, 1.3, 0.9, 1] 
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 left-10 w-[32rem] h-[32rem] bg-rose-600/20 rounded-full blur-[140px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 60, 0], 
            y: [0, 80, -60, 0], 
            scale: [1, 1.2, 1.1, 1] 
          }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -right-20 w-[38rem] h-[38rem] bg-amber-600/20 rounded-full blur-[160px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* CINEMATIC PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-pink-400">
              Authentic Royal Recipes
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-2xl"
          >
            OUR DELICIOUS MENU
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed"
          >
            Savor our freshly made Karahis, sizzled charcoal skewers, refreshing shakes, and mouth-watering desserts.
          </motion.p>
        </div>

        {/* SEARCH BAR & CATEGORY FILTER STRIP */}
        <div className="space-y-8 mb-16">
          
          {/* Interactive Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search your favorite dish..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-white/10 focus:border-amber-400/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition shadow-2xl"
            />
          </motion.div>

          {/* Floating Category Chips */}
          <div className="flex items-center justify-center flex-wrap gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className={`relative px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 ${
                    isActive
                      ? 'text-black shadow-lg shadow-amber-400/20'
                      : 'bg-slate-900/80 text-slate-300 hover:text-amber-400 border border-white/10 backdrop-blur-lg'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-gradient-to-r from-rose-500 via-amber-400 to-amber-500 rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* MENU ITEMS GRID WITH CINEMATIC CARDS */}
        {loading ? (
          <div className="text-center py-24 text-amber-400 font-bold text-lg animate-pulse flex items-center justify-center gap-3">
            <Flame className="w-6 h-6 animate-bounce" />
            <span>Loading delicacies from database...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-900/60 rounded-3xl border border-white/10 text-slate-400 max-w-md mx-auto backdrop-blur-xl shadow-2xl"
          >
            No items found for <span className="text-amber-400 font-bold">"{searchQuery || activeCategory}"</span>.
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div 
                  layout
                  key={item._id} 
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  className="group bg-slate-900/90 border border-white/10 hover:border-amber-400/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 cursor-pointer relative"
                >
                  <div>
                    {/* Dish Image Frame */}
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-115 transition duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                      
                      <span className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-amber-400 font-black text-xs px-3.5 py-1.5 rounded-full border border-amber-400/30 shadow-lg">
                        {item.category}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 space-y-2">
                      <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition">{item.name}</h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                    <div>
                      <span className="text-[10px] uppercase text-slate-500 font-bold tracking-widest block">Price</span>
                      <span className="text-2xl font-black text-emerald-400">Rs. {item.price}</span>
                    </div>

                    
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Menu;