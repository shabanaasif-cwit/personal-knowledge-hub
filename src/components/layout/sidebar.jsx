import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ setView }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Used to detect the active route

  const menuItems = [
    { id: 1, label: 'Home', icon: '🏠', path: '/home' },
    { id: 2, label: 'Notes Hub', icon: '📝', path: '/dashboard' },
    { id: 3, label: 'About', icon: 'ℹ️', path: '/about' }, // Updated Path
    { id: 4, label: 'Contact', icon: '📞', path: '/contact' }, // Updated Path
    { id: 5, label: 'Help', icon: '❓', path: '/help' }, // Updated Path
    { id: 6, label: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  // Toggle sidebar visibility
  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Logic to handle navigation and state reset
  const handleNavigation = (path) => {
    // If the user clicks "Notes Hub", reset the Dashboard view to the list
    if (path === '/dashboard' && setView) {
      setView('list');
    }
    setIsOpen(false); // Close sidebar after clicking
  };

  return (
    <>
      {/* Sidebar - Transition based on isOpen */}
      <div className={`fixed top-16 left-0 h-screen bg-gray-900 text-white transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden shadow-2xl`}>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    location.pathname === item.path 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                      : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`font-bold tracking-tight transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Floating Toggle Button */}
      <button
        onClick={handleToggleSidebar}
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full z-50 shadow-2xl hover:bg-blue-700 transition-transform active:scale-95"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <span className="text-xl font-bold">✕</span>
        ) : (
          <span className="text-xl">☰</span>
        )}
      </button>

      {/* Background Overlay for Mobile */}
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