import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ ADDED

  return (
    <>
      <div className="bg-black text-white shadow w-full sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-3 sm:p-4 md:p-5 px-4 sm:px-6 md:px-8">

          {/* Title */}
          <h1
            onClick={() => navigate("/home")}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold truncate cursor-pointer"
          >
            📚 Personal Knowledge Hub
          </h1>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1.5 ml-4"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="w-5 h-0.5 bg-white"></span>
            <span className="w-5 h-0.5 bg-white"></span>
            <span className="w-5 h-0.5 bg-white"></span>
            <span className="w-5 h-0.5 bg-white"></span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-4 lg:space-x-8 font-medium text-sm md:text-base">
              <li>
                <button onClick={() => navigate("/home")} className="hover:text-gray-300 transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300 transition">
                  Notes
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className="hover:text-gray-300 transition">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-gray-300 transition">
                  About
                </button>
              </li>
            </ul>
          </nav>

        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900">
            <ul className="flex flex-col space-y-2 p-4 font-medium">
              <li>
                <button onClick={() => navigate("/home")} className="hover:text-gray-300 transition block py-2">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/dashboard")} className="hover:text-gray-300 transition block py-2">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/contact")} className="hover:text-gray-300 transition block py-2">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/about")} className="hover:text-gray-300 transition block py-2">
                  About
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
