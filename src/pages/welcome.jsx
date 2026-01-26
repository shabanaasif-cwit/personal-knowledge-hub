import React from 'react';
//import Button from '../components/common/button';
//import { useNavigate } from 'react-router-dom';

import Button from '../components/common/button';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT: Bringing in the modern icon set
import { NotepadText, FileText, Link, FolderClosed } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Hero Card: The main container with entrance animations */}
      <div className="w-full max-w-4xl bg-white p-12 rounded-[40px] shadow border border-gray-100 text-center animate-in fade-in zoom-in duration-700">
        
        {/* ICON REPLACEMENT: Replacing the emoji with the professional NotepadText icon */}
        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl shadow-lg shadow-blue-200">
          <NotepadText size={40} color="white" strokeWidth={2} />
        </div>

        <h1 className="text-5xl md:text-4xl font-black text-black mb-6 tracking-tight">
          Welcome to Your <br />
          <span className="text-blue-600">Personal Knowledge Hub</span>
        </h1>

        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          The ultimate space to organize your digital life. Securely store notes, 
          track external documentation links, and manage your files—all in one place.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/notes')} 
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

        {/* Feature Highlights: Now using Lucide components instead of emojis for a unified look */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-10 border-t border-gray-100">
          {/* Notes Feature */}
            <div
              onClick={() => navigate('/notes')}
              className="text-left p-4 hover:bg-blue-50/50 rounded-2xl transition-colors cursor-pointer">
              <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
                <FileText className="text-blue-600" size={20} />
                Notes
              </h3>
              <p className="text-sm text-gray-500 font-medium">
                Capture ideas and code snippets instantly.
              </p>
            </div>
          {/* Links Feature */}
          <div className="text-left p-4 hover:bg-blue-50/50 rounded-2xl transition-colors">
            <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
              <Link className="text-blue-600" size={20} /> Links
            </h3>
            <p className="text-sm text-gray-500 font-medium">Keep your GitHub and documentation organized.</p>
          </div>

          {/* Files Feature */}
          <div className="text-left p-4 hover:bg-blue-50/50 rounded-2xl transition-colors">
            <h3 className="text-black font-black text-lg mb-2 flex items-center gap-2">
              <FolderClosed className="text-blue-600" size={20} /> Files
            </h3>
            <p className="text-sm text-gray-500 font-medium">Securely attach documents to any entry.</p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-gray-400 text-xs font-bold uppercase tracking-[0.3em]">
       All rights reserved © 2026 Personal Knowledge Hub
      </footer>
    </div>
  );
};

export default Welcome;