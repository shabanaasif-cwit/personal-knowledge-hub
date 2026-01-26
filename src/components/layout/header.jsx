import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react'; // Added Menu and X icons

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Notes', path: '/notes' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  // Helper function to handle navigation and close menu
  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white shadow-md h-20 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-4 cursor-pointer" 
          onClick={() => navigate('/home')}
        >
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-100">
            <BookOpen size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            Knowledge <span className="text-blue-600">Hub</span>
          </span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                isActive(link.path)
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-white text-slate-600 border-transparent hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2 text-white hover:bg-blue-600 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
        {isOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border-b shadow-xl md:hidden animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`w-full text-left px-6 py-4 rounded-xl text-base font-bold transition-all border-2 ${
                    isActive(link.path)
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md' // ACTIVE: Blue BG, White Text
                      : 'bg-white text-blue-600 border-transparent hover:bg-blue-50' // INACTIVE: White BG, Blue Text
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        )}
    </nav>
  );
}

export default Header;
