import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, BookOpen, Zap, CheckCircle2, 
  ArrowRight, Tags, Settings2, ClipboardList, 
  FileText, Lightbulb 
} from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const [notes] = useState([
    { id: 1, title: 'React Fundamentals', category: 'Learning', date: 'Jan 20', icon: <FileText className="text-blue-500" size={18} /> },
    { id: 2, title: 'Tailwind CSS Guide', category: 'Design', date: 'Jan 19', icon: <Zap className="text-amber-500" size={18} /> },
    { id: 3, title: 'JavaScript Tips', category: 'Tips', date: 'Jan 18', icon: <Lightbulb className="text-purple-500" size={18} /> },
  ]);

  const [tasks] = useState([
    { id: 1, title: 'Complete React Project', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Learn Tailwind CSS', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Build Knowledge Hub', status: 'In Progress', priority: 'High' },
  ]);

  return (
    <div className="w-full p-6 md:p-10 bg-[#f8fafc] min-h-screen font-sans text-slate-900">
      
      {/* CENTRALIZED HERO SECTION */}
      <section className="mb-12 text-center max-w-2xl mx-auto">
        <div className="inline-flex p-2.5 bg-blue-600 text-white rounded-xl shadow-md mb-4">
          <GraduationCap size={24} />
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mb-2 cursor-pointer">
          Welcome to Your <span className="text-blue-600" onClick={() => navigate('/home')}>Knowledge Hub</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium">
          Organize, manage, and expand your digital brain in one workspace.
        </p>
      </section>

      {/* STATS CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto">
        {[
          { label: 'Total Notes', val: notes.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Tasks', val: 2, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Finished', val: 1, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 transition-colors hover:border-blue-200">
            <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <h3 className="text-lg font-bold text-slate-800 leading-tight">{stat.val}</h3>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
        {/* RECENT NOTES */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50/30">
              <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active Tasks</h2>
              {/* Updated Button: Added bg-blue-600, px-3, py-1, and rounded-md */}
              <button 
                onClick={() => navigate('/notes')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-tighter px-3 py-1.5 rounded-2xl flex items-center gap-1 transition-all shadow-sm active:scale-95"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
          <div className="divide-y divide-slate-100">
            {notes.map(note => (
              <div key={note.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-slate-50 rounded-md group-hover:bg-white transition-all">
                    {note.icon}
                  </div>
                  <h3 className="font-semibold text-slate-700 text-sm">{note.title}</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{note.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVE TASKS */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"> 
            <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50/30">
              <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Active Tasks</h2>
              {/* Updated Button: Added bg-blue-600, px-3, py-1, and rounded-md */}
              <button 
                onClick={() => navigate('/notes')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-tighter px-3 py-1.5 rounded-2xl flex items-center gap-1 transition-all shadow-sm active:scale-95"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
          <div className="p-2 space-y-1">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-all">
                <div className="w-3.5 h-3.5 border-2 border-slate-300 rounded cursor-pointer hover:border-blue-500 transition-colors"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-700 text-sm">{task.title}</h3>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* MODULES GRID */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Modules</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard 
            icon={<BookOpen size={18}/>} 
            title="Organize Notes" 
            iconBg="bg-blue-50 text-blue-600" 
            //naviagte on notes page which is named Notes.jsx
            onClick={() => navigate('/notes')} 
          />
          <FeatureCard icon={<ClipboardList size={18}/>} title="Tasks" iconBg="bg-emerald-50 text-emerald-600" />
          <FeatureCard icon={<Tags size={18}/>} title="Tags" iconBg="bg-purple-50 text-purple-600" />
          <FeatureCard icon={<Settings2 size={18}/>} title="Settings" iconBg="bg-slate-50 text-slate-600" onClick={() => navigate('/settings')}/>
        </div>
      </section>

      {/* COMPACT FOOTER CTA */}
      <section className="max-w-5xl mx-auto bg-blue-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-blue-100 relative overflow-hidden">
        <div className="text-center md:text-left relative z-10">
          <h2 className="text-xl font-bold mb-1">Ready to level up?</h2>
          <p className="text-blue-100 text-xs opacity-80">Access your notes and start organizing today.</p>
        </div>
        <button 
          onClick={() => navigate('/notes')} // Updated to navigate to notes
          className="relative z-10 bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-all shadow-md flex items-center gap-2 whitespace-nowrap active:scale-95"
        >
          Get Started Now <ArrowRight size={16} />
        </button>
        {/* Subtle decorative circle */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-blue-500 rounded-full opacity-50 blur-2xl"></div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, iconBg, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
    >
      <div className={`p-2 rounded-lg transition-colors group-hover:bg-opacity-80 ${iconBg}`}>{icon}</div>
      <h3 className="font-bold text-slate-800 text-xs tracking-tight">{title}</h3>
    </div>
  );
}

export default Home;
