import { useState } from 'react';
import Button from '../components/common/button';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    userName: 'Shabana Asif'
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete all entries in your Knowledge Hub JSON notepad.")) {
      localStorage.clear(); // Or your specific key
      alert("Hub Data Cleared.");
      window.location.reload();
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        
        <header className="mb-10 border-b pb-4">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Hub Settings</h1>
          <p className="text-gray-500 font-medium">Configure your workspace and data storage</p>
        </header>

        <div className="space-y-8">
          {/* Profile Section */}
          <section>
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Profile</h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold">
                SA
              </div>
              <div>
                <p className="text-black font-bold">{settings.userName}</p>
                <p className="text-xs text-gray-500">Hub Administrator</p>
              </div>
            </div>
          </section>

          {/* Preferences Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-black text-blue-600 uppercase tracking-widest mb-4">Preferences</h2>
            
            <div className="flex items-center justify-between p-2">
              <span className="text-black font-bold">Push Notifications</span>
              <input 
                type="checkbox" 
                checked={settings.notifications} 
                onChange={() => handleToggle('notifications')}
                className="w-5 h-5 accent-blue-600"
              />
            </div>

            <div className="flex items-center justify-between p-2">
              <span className="text-black font-bold">Automatic Syncing</span>
              <input 
                type="checkbox" 
                checked={settings.autoSync} 
                onChange={() => handleToggle('autoSync')}
                className="w-5 h-5 accent-blue-600"
              />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="pt-6 border-t border-red-50">
            <h2 className="text-sm font-black text-red-600 uppercase tracking-widest mb-4">Danger Zone</h2>
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-red-800 font-bold">Reset Hub Notepad</p>
                <p className="text-xs text-red-600">Delete all notes, documents, and external links.</p>
              </div>
              <Button variant="danger" onClick={handleClearData}>
                Delete All Data
              </Button>
            </div>
          </section>
        </div>

        <footer className="mt-10 pt-6 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Hub Storage Engine v2.4 • Secured via Local Storage
        </footer>
      </div>
    </div>
  );
};

export default Settings;