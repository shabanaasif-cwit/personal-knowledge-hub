import Button from '../components/common/button';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();

  const helpSections = [
    {
      title: "📝 Managing Entries",
      content: "Create new entries by clicking '+ CreateNew Note'. You can store titles, descriptions, and even attach external documentation links."
    },
    {
      title: "📎 Documents & Files",
      content: "When you upload a file, it is converted to a Base64 string. This allows your PDF or image to be stored directly inside your local JSON notepad file."
    },
    {
      title: "🔗 External Links",
      content: "Paste URLs from GitHub, documentation sites, or videos. These appear as clickable buttons in your viewer for quick access."
    },
    {
      title: "💾 Data Persistence",
      content: "Everything is synced to your local notepad. To keep your data safe, ensure you do not clear your browser's local storage or delete the JSON source."
    }
  ];

  return (
    /* flex-1 ensures it fills the available space next to the Sidebar */
    <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">How can we help?</h1>
          <p className="text-gray-500">Master your Knowledge Hub experience</p>
        </header>

        <div className="space-y-8">
          {helpSections.map((section, index) => (
            <section key={index} className="border-b border-gray-100 pb-6 last:border-0">
              <h2 className="text-xl font-bold text-black mb-2">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="primary" 
            size="lg" 
            className="px-8 font-bold"
          >
            Back to Hub
          </Button>
          <Button 
            onClick={() => navigate('/contact')} 
            variant="secondary" 
            size="lg" 
            className="px-8 font-bold border-2"
          >
            Contact Support
          </Button>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
            Knowledge Hub v1.0 • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Help;