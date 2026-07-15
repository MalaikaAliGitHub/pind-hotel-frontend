import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import GalleryPage from './pages/GalleryPage';
import AdminPanel from './pages/AdminPanel';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Sub-component to handle conditional layout (Contact & Footer)
const Layout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#0b0c10] font-sans text-neutral-100 flex flex-col selection:bg-rose-500 selection:text-white">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Show Contact and Footer on all pages EXCEPT Admin */}
      {!isAdminPage && (
        <>
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;