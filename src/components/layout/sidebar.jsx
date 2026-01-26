import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Ensure you have run: npm install lucide-react
import { 
  Home, 
  NotepadText, 
  Info, 
  CircleUserRound, 
  HelpCircle, 
  Settings,
  X,
  Menu
} from 'lucide-react';

function Sidebar({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Detects active route for styling

  // Menu Data - Emojis replaced with Lucide Components
  const menuItems = [
    { id: 1, label: 'Home', icon: Home, path: '/home' },
    { id: 2, label: 'Notes Hub', icon: NotepadText, path: '/notes' },
    { id: 4, label: 'Contact', icon: CircleUserRound, path: '/contact' },
    { id: 3, label: 'About', icon: Info, path: '/about' },
    { id: 5, label: 'Help', icon: HelpCircle, path: '/help' },
    { id: 6, label: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Logic: Toggles sidebar visibility
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Logic: Handles navigation and resets Notes view if necessary (Backend logic preserved)
  const handleNavigation = (path) => {

    if (path === '/notes' && setView) {
      setView('list');
    }
    setIsOpen(false); // Close sidebar after clicking an item
  };

  return (
    <>
      {/* 1. SIDEBAR PANEL */}
      <div className={`fixed top-16 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden shadow-2xl border-r border-gray-800 flex flex-col`}>
        <nav className="p-4 flex-grow">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/50' 
                        : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
                    <span className={`font-bold tracking-tight whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* 2. DYNAMIC FLOATING TOGGLE BUTTON 
          - Slides from Top-40 to Bottom-10 when opened
                */}
      <button
        onClick={handleToggleSidebar}
        className={`fixed left-6 p-4 rounded-full z-50 shadow transition-all duration-500 ease-in-out flex items-center justify-center active:scale-95
          ${isOpen 
            ? 'bottom-10 bg-gray-800 text-blue-400 border border-blue-500/20' 
            : 'top-40 bg-blue-600 text-white'
          }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* 3. BACKGROUND OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 top-16 cursor-pointer"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;