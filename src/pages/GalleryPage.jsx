import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, MapPin, Flame, Camera } from 'lucide-react';
import API from '../api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Default fallback areas if not specified in backend
  const areaBadges = [
    'Main Dining Hall',
    'Live Charcoal BBQ Lawn',
    'Royal Banquet Hall',
    'Rooftop Terrace Vibe',
    'Executive VIP Suite',
    'Desi Karahi Kitchen'
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await API.get('/api/gallery');
        setImages(res.data);
      } catch (err) {
        console.error('Failed to fetch gallery images:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Auto-Slider for Big Featured Image
  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [images]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen overflow-x-hidden font-sans relative pt-28 pb-20 selection:bg-rose-500 selection:text-white">

      {/* CONTINUOUS DYNAMIC AMBIENT LIGHTING (ORBS) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, -60, 0], 
            y: [0, -80, 60, 0], 
            scale: [1, 1.3, 0.9, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 -left-20 w-[35rem] h-[35rem] bg-rose-600/20 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -90, 70, 0], 
            y: [0, 90, -70, 0], 
            scale: [1, 1.2, 1.1, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 -right-20 w-[40rem] h-[40rem] bg-amber-600/20 rounded-full blur-[160px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">

        {/* CINEMATIC PAGE HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-xl"
          >
            <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-rose-400 to-pink-400">
              Visual Ambience & Experiences
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 drop-shadow-2xl"
          >
            PIND HOTEL GALLERY
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed"
          >
            Explore our rich heritage, royal dining halls, sizzling live cooking setups, and memorable moments.
          </motion.p>
        </div>

        {/* FULL-WIDTH FEATURED AUTO-LOOP SHOWCASE SLIDER */}
        {!loading && images.length > 0 && (
          <div className="mb-20 px-0 sm:px-[60px] md:px-[100px] lg:px-[130px] relative">
            <div className="relative h-[420px] sm:h-[520px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-rose-500/10 group">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[currentIndex].imageUrl})` }}
                />
              </AnimatePresence>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Image Location Overlay Info */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-10">
                <motion.div 
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 max-w-lg"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 backdrop-blur-md text-amber-300 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{images[currentIndex].area || areaBadges[currentIndex % areaBadges.length]}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                    {images[currentIndex].title || 'PIND Hotel Experience'}
                  </h2>
                </motion.div>

                <button 
                  onClick={() => setSelectedImage(images[currentIndex])}
                  className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl text-xs font-black text-white flex items-center gap-2 transition"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span>View Fullscreen</span>
                </button>
              </div>

              {/* Slider Controls */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-black transition duration-300 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 border border-white/20 text-white opacity-0 group-hover:opacity-100 hover:bg-amber-500 hover:text-black transition duration-300 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* 3D MASONRY GALLERY GRID */}
        {loading ? (
          <div className="text-center py-20 text-amber-400 font-bold text-lg animate-pulse flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6 animate-spin" />
            <span>Loading visual experience...</span>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/50 rounded-3xl border border-white/10 text-slate-400 max-w-md mx-auto backdrop-blur-xl">
            No images uploaded yet. Add photos from Admin Panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((img, idx) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedImage(img)}
                className="group relative h-80 rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/60 shadow-2xl cursor-pointer bg-slate-900/80 backdrop-blur-md transition-all duration-300"
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-115 transition duration-700" 
                />
                
                {/* Location Badge Always Visible */}
                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-amber-300 font-extrabold text-[11px] px-3.5 py-1.5 rounded-full border border-amber-400/30 flex items-center gap-1.5 z-10 shadow-lg">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>{img.area || areaBadges[idx % areaBadges.length]}</span>
                </span>

                {/* Hover Dark Reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6 space-y-2">
                  <h3 className="text-xl font-black text-white group-hover:text-amber-400 transition">{img.title}</h3>
                  <p className="text-slate-300 text-xs flex items-center gap-1">
                    <Maximize2 className="w-3.5 h-3.5 text-rose-400" /> Click to view full image
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* LIGHTBOX FULLSCREEN MODAL */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="max-w-5xl w-full relative bg-slate-900/90 border border-white/20 rounded-3xl overflow-hidden p-3 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/70 hover:bg-rose-500 text-white border border-white/20 transition shadow-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative max-h-[75vh] overflow-hidden rounded-2xl">
                  <img 
                    src={selectedImage.imageUrl} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-contain max-h-[75vh] mx-auto" 
                  />
                </div>

                <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {selectedImage.area || 'PIND Hotel Special Area'}
                    </span>
                    <h3 className="text-2xl font-black text-white">{selectedImage.title}</h3>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default Gallery;