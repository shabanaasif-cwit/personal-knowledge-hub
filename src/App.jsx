//import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from "./components/layout/header.jsx"
import Sidebar from "./components/layout/sidebar.jsx"
import Home from "./pages/home.jsx"
import Dashboard from "./pages/dashboard.jsx"
import Contact from './pages/contact.jsx' 
import About from './pages/about.jsx'
import Help from './pages/help.jsx'
import Settings from './pages/setting.jsx'
import Welcome from './pages/welcome.jsx'
import OrganizeNotes from "./modules/organize-notes/organizeNotes";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* 1. Fixed Header: Make sure your Header component has a z-index */}
      <Header />

      <div className="flex flex-1 pt-16 md:pt-20"> 
        {/* 2. Added Sidebar back: Using a wrapper to ensure it stays on the left */}
        <Sidebar />

        {/* 3. Content Shift: Added md:ml-64 (or whatever your sidebar width is) 
           so the main content doesn't sit underneath the sidebar on desktop */}
        <main className="flex-1 p-4 w-full transition-all duration-300 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Welcome />} />

            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />
            
            <Route path="/organize-notes" element={<OrganizeNotes />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
