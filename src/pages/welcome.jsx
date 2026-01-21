import React from 'react';
import Button from '../components/common/button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Hero Card */}
      <div className="w-full max-w-4xl bg-white p-12 rounded-[40px] shadow-2xl border border-gray-100 text-center animate-in fade-in zoom-in duration-700">
        
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-lg shadow-blue-200">
          <span className="text-4xl text-white">🚀</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
          Welcome to Your <br />
          <span className="text-blue-600">Personal Knowledge Hub</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate space to organize your digital life. Securely store notes, 
          track external documentation links, and manage your files—all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="primary" 
            size="lg"
            className="w-full sm:w-auto px-12 py-4 text-lg font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
          >
            Go to My Notes
          </Button>
          <Button 
            onClick={() => navigate('/help')} 
            variant="secondary" 
            size="lg"
            className="w-full sm:w-auto px-12 py-4 text-lg font-bold rounded-2xl border-2 hover:bg-gray-50 transition-all"
          >
            Learn More
          </Button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-gray-100">
          <div className="text-left p-4">
            <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
              <span className="text-blue-600">📝</span> Notes
            </h3>
            <p className="text-sm text-gray-500 font-medium">Capture ideas and code snippets instantly.</p>
          </div>
          <div className="text-left p-4">
            <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
              <span className="text-blue-600">🔗</span> Links
            </h3>
            <p className="text-sm text-gray-500 font-medium">Keep your GitHub and documentation organized.</p>
          </div>
          <div className="text-left p-4">
            <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
              <span className="text-blue-600">📁</span> Files
            </h3>
            <p className="text-sm text-gray-500 font-medium">Securely attach documents to any entry.</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
       All rights reserved © 2024 Personal Knowledge Hub
      </footer>
    </div>
  );
};

export default Welcome;