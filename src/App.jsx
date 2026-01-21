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
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            {/* 1. STARTUP FIX: This shows the Home page as soon as the site loads */}
            <Route path="/" element={<Welcome />} />
            
            {/* Existing Routes */}
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Settings />} />

            {/* 2. CATCH-ALL: Redirects any broken links back to Home */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/organize-notes" element={<OrganizeNotes />} />

          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App