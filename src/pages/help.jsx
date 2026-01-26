import Button from '../components/common/button';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, 
  ArrowLeft, 
  MessageSquare, 
  FileText, 
  Paperclip, 
  Link, 
  Database 
} from 'lucide-react';

const Help = () => {
  const navigate = useNavigate();

  const helpSections = [
    {
      title: "Managing Entries",
      content: "Create new entries by clicking '+ Create New Entry'. You can store titles, descriptions, and even attach external documentation links.",
      icon: <FileText className="text-blue-500" size={18} />
    },
    {
      title: "Documents & Files",
      content: "When you upload a file, it is converted to a Base64 string. This allows your PDF or image to be stored directly inside your local JSON notepad file.",
      icon: <Paperclip className="text-amber-500" size={18} />
    },
    {
      title: "External Links",
      content: "Paste URLs from GitHub, documentation sites, or videos. These appear as clickable buttons in your viewer for quick access.",
      icon: <Link className="text-purple-500" size={18} />
    },
    {
      title: "Data Persistence",
      content: "Everything is synced to your local notepad. To keep your data safe, ensure you do not clear your browser's local storage or delete the JSON source.",
      icon: <Database className="text-emerald-500" size={18} />
    }
  ];

  return (
    /* pt-28 (112px) provides a safe 32px gap below your 80px fixed header */
    <div className="flex-1 flex items-start justify-center bg-[#f8fafc] p-10 min-h-screen pt-28 pb-12">
      <div className="w-full max-w-2xl bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
        
        {/* HEADER ICON */}
        <header className="text-center mb-10">
          <div className="inline-flex p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 mb-6 transition-transform hover:scale-105">
            <HelpCircle size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">
            How can we <span className="text-blue-600">help?</span>
          </h1>
          <p className="text-slate-500 font-medium">Master your Knowledge Hub experience</p>
        </header>

        {/* HELP SECTIONS */}
        <div className="space-y-8">
          {helpSections.map((section, index) => (
            <section key={index} className="border-b border-slate-50 pb-6 last:border-0 group">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-white transition-all shadow-sm border border-transparent group-hover:border-slate-100">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed ml-14">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* BUTTON ACTIONS */}
        <div className="mt-10 pt-8 border-t border-slate-50 flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/notes')} 
            variant="primary" 
            className="px-8 py-3.5 font-black flex items-center justify-center gap-2 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> Back to Hub
          </Button>
          
          <Button 
            onClick={() => navigate('/contact')} 
            variant="secondary" 
            className="px-8 py-3.5 font-black border-2 border-slate-100 flex items-center justify-center gap-2 rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
          >
            <MessageSquare size={18} /> Contact Support
          </Button>
        </div>

        <footer className="mt-10 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-black">
            Knowledge Hub v1.0 • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Help;