import React, { useState, useEffect } from 'react';
import API from '../api';

const AdminPanel = () => {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('pind_admin_auth') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard States
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'gallery'
  const [menuItems, setMenuItems] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Menu Form State
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Desi',
    imageType: 'file',
    imageUrl: '',
  });
  const [menuFile, setMenuFile] = useState(null);

  // Gallery Form State
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    imageType: 'file',
    imageUrl: '',
  });
  const [galleryFile, setGalleryFile] = useState(null);

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginEmail === 'malaikaa7474@gmail.com' && loginPassword === 'pind_hotel51214') {
      localStorage.setItem('pind_admin_auth', 'true');
      setIsLoggedIn(true);
    } else {
      setLoginError('Invalid Email or Password! Access Denied.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('pind_admin_auth');
    setIsLoggedIn(false);
  };

  // Fetch Existing Data
  const fetchData = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const [menuRes, galleryRes] = await Promise.all([
        API.get('/api/menu'),
        API.get('/api/gallery')
      ]);
      setMenuItems(menuRes.data);
      setGalleryImages(galleryRes.data);
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to load database items' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);

  // Handle Add Menu Item
  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    const formData = new FormData();
    formData.append('name', menuForm.name);
    formData.append('description', menuForm.description);
    formData.append('price', menuForm.price);
    formData.append('category', menuForm.category);

    if (menuForm.imageType === 'file' && menuFile) {
      formData.append('imageFile', menuFile);
    } else {
      formData.append('image', menuForm.imageUrl);
    }

    try {
      await API.post('/api/menu', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg({ type: 'success', text: 'Menu Item Added Successfully!' });
      setMenuForm({ name: '', description: '', price: '', category: 'Desi', imageType: 'file', imageUrl: '' });
      setMenuFile(null);
      fetchData();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to add menu item' });
    }
  };

  // Handle Delete Menu Item
  const handleDeleteMenu = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    try {
      await API.delete(`/api/menu/${id}`);
      setMsg({ type: 'success', text: 'Item deleted successfully' });
      fetchData();
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete item' });
    }
  };

  // Handle Add Gallery Photo
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    const formData = new FormData();
    formData.append('title', galleryForm.title || 'PIND Hotel Special');

    if (galleryForm.imageType === 'file' && galleryFile) {
      formData.append('imageFile', galleryFile);
    } else {
      formData.append('imageUrl', galleryForm.imageUrl);
    }

    try {
      await API.post('/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMsg({ type: 'success', text: 'Gallery Photo Uploaded Successfully!' });
      setGalleryForm({ title: '', imageType: 'file', imageUrl: '' });
      setGalleryFile(null);
      fetchData();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Failed to upload photo' });
    }
  };

  // Handle Delete Gallery Photo
  const handleDeleteGallery = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await API.delete(`/api/gallery/${id}`);
      setMsg({ type: 'success', text: 'Photo deleted successfully' });
      fetchData();
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to delete photo' });
    }
  };

  // IF NOT LOGGED IN: SHOW LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-[85vh] bg-neutral-950 flex items-center justify-center px-4 ">
        <div className="max-w-md w-full bg-neutral-900 border border-amber-800/50 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-amber-400">PIND Admin Login</h2>
            <p className="text-neutral-400 text-sm mt-2">Enter credentials to access hotel dashboard</p>
          </div>

          {loginError && (
            <div className="bg-rose-950/80 border border-rose-600 text-rose-200 text-xs p-3 rounded-lg mb-6 font-semibold">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="malaikaa7474@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-neutral-950 font-bold py-3 rounded-lg shadow-lg transition duration-200"
            >
              🔒 Access Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD VIEW
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 py-10 px-4 sm:px-8 pt-30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-amber-800/40 pb-5 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-amber-400">PIND Hotel Admin Dashboard</h1>
            <p className="text-neutral-400 text-sm mt-1">Logged in as: <span className="text-amber-200 font-medium">malaikaa7474@gmail.com</span></p>
          </div>

          {/* Controls & Logout */}
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                activeTab === 'menu' ? 'bg-amber-500 text-neutral-950 shadow-lg' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              🍽️ Menu
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                activeTab === 'gallery' ? 'bg-amber-500 text-neutral-950 shadow-lg' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              🖼️ Gallery
            </button>
            <button
              onClick={handleLogout}
              className="bg-rose-900/60 hover:bg-rose-800 border border-rose-700 text-rose-200 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Message Banner */}
        {msg.text && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-semibold flex justify-between items-center ${
            msg.type === 'success' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600' : 'bg-rose-900/80 text-rose-200 border border-rose-600'
          }`}>
            <span>{msg.text}</span>
            <button onClick={() => setMsg({ type: '', text: '' })} className="font-bold">✕</button>
          </div>
        )}

        {/* TAB 1: MENU MANAGEMENT */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <div className="bg-neutral-800/80 border border-neutral-700 p-6 rounded-xl h-fit shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 mb-4">Add New Menu Dish</h2>
              <form onSubmit={handleMenuSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Dish Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Special Mutton Karahi"
                    value={menuForm.name}
                    onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                  <select
                    value={menuForm.category}
                    onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Desi">Desi</option>
                    <option value="Fast Food">Fast Food</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Shakes">Shakes</option>
                    <option value="Cold Drinks">Cold Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 1850"
                    value={menuForm.price}
                    onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Description</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Short description of ingredients/flavor..."
                    value={menuForm.description}
                    onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>

                {/* Upload Method Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Image Source</label>
                  <div className="flex space-x-4 mb-2 text-xs">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="menuImageType"
                        checked={menuForm.imageType === 'file'}
                        onChange={() => setMenuForm({ ...menuForm, imageType: 'file' })}
                        className="mr-1.5 accent-amber-500"
                      />
                      Upload from Gallery
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="menuImageType"
                        checked={menuForm.imageType === 'url'}
                        onChange={() => setMenuForm({ ...menuForm, imageType: 'url' })}
                        className="mr-1.5 accent-amber-500"
                      />
                      Paste Image URL
                    </label>
                  </div>

                  {menuForm.imageType === 'file' ? (
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setMenuFile(e.target.files[0])}
                      className="w-full text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                    />
                  ) : (
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/photo.jpg"
                      value={menuForm.imageUrl}
                      onChange={(e) => setMenuForm({ ...menuForm, imageUrl: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 rounded-lg shadow transition mt-4"
                >
                  ➕ Add Item To Menu
                </button>
              </form>
            </div>

            {/* List Table */}
            <div className="lg:col-span-2 bg-neutral-800/80 border border-neutral-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 mb-4">Database Menu Items ({menuItems.length})</h2>
              {loading ? (
                <p className="text-neutral-400 text-sm">Loading items...</p>
              ) : menuItems.length === 0 ? (
                <p className="text-neutral-400 text-sm">No menu items found in Database.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead className="bg-neutral-900 text-amber-400 uppercase font-semibold">
                      <tr>
                        <th className="p-3">Image</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-700">
                      {menuItems.map((item) => (
                        <tr key={item._id} className="hover:bg-neutral-750">
                          <td className="p-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-neutral-700" />
                          </td>
                          <td className="p-3 font-semibold text-neutral-100">{item.name}</td>
                          <td className="p-3"><span className="bg-amber-900/60 text-amber-300 px-2 py-1 rounded text-[10px]">{item.category}</span></td>
                          <td className="p-3 font-medium text-emerald-400">Rs. {item.price}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteMenu(item._id)}
                              className="bg-rose-600/80 hover:bg-rose-700 text-white px-3 py-1.5 rounded font-semibold transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form */}
            <div className="bg-neutral-800/80 border border-neutral-700 p-6 rounded-xl h-fit shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 mb-4">Upload Gallery Photo</h2>
              <form onSubmit={handleGallerySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Photo Title / Tagline</label>
                  <input
                    type="text"
                    placeholder="e.g. Royal BBQ Setup"
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Upload Method Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-2">Image Source</label>
                  <div className="flex space-x-4 mb-2 text-xs">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="galleryImageType"
                        checked={galleryForm.imageType === 'file'}
                        onChange={() => setGalleryForm({ ...galleryForm, imageType: 'file' })}
                        className="mr-1.5 accent-amber-500"
                      />
                      Upload from Gallery
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="galleryImageType"
                        checked={galleryForm.imageType === 'url'}
                        onChange={() => setGalleryForm({ ...galleryForm, imageType: 'url' })}
                        className="mr-1.5 accent-amber-500"
                      />
                      Paste Image URL
                    </label>
                  </div>

                  {galleryForm.imageType === 'file' ? (
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setGalleryFile(e.target.files[0])}
                      className="w-full text-xs text-neutral-300 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 cursor-pointer"
                    />
                  ) : (
                    <input
                      type="url"
                      required
                      placeholder="https://example.com/photo.jpg"
                      value={galleryForm.imageUrl}
                      onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 rounded-lg shadow transition mt-4"
                >
                  📤 Upload To Gallery
                </button>
              </form>
            </div>

            {/* List Grid */}
            <div className="lg:col-span-2 bg-neutral-800/80 border border-neutral-700 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold text-amber-300 mb-4">Uploaded Gallery Photos ({galleryImages.length})</h2>
              {loading ? (
                <p className="text-neutral-400 text-sm">Loading gallery...</p>
              ) : galleryImages.length === 0 ? (
                <p className="text-neutral-400 text-sm">No photos uploaded yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {galleryImages.map((img) => (
                    <div key={img._id} className="relative group rounded-xl overflow-hidden border border-neutral-700">
                      <img src={img.imageUrl} alt={img.title} className="w-full h-36 object-cover" />
                      <div className="absolute inset-0 bg-neutral-950/70 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-3">
                        <p className="text-xs text-amber-200 font-semibold truncate">{img.title}</p>
                        <button
                          onClick={() => handleDeleteGallery(img._id)}
                          className="bg-rose-600 text-white text-xs py-1 px-2 rounded font-semibold self-end hover:bg-rose-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;