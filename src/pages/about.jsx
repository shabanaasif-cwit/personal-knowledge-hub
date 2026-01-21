import Button from "../components/common/button";

const About = () => {
  // Requirement: Defining project values for dynamic rendering
  const projectGoals = [
    { id: 1, title: "File-Based Storage", description: "Persisting data in a user-maintained notepad file." },
    { id: 2, title: "Clean Architecture", description: "Modular components following professional industry standards." },
    { id: 3, title: "No Backend Needed", description: "Simulating real-world persistence purely on the frontend." }
  ];

  return (
    /* CENTRALIZATION PROPERTIES: 
       min-h-screen, flex, and items-center justify-center ensure the content 
       is perfectly centered as per your previous design request.
    */
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-3xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
        
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
            About the Knowledge Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            A specialized tool for managing personal entries, notes, and references 
            using a unique file-based storage approach.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Requirement: Mapping through data using arrow functions */}
          {projectGoals.map((goal) => (
            <div key={goal.id} className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">{goal.title}</h3>
              <p className="text-sm text-blue-700 leading-relaxed">{goal.description}</p>
            </div>
          ))}
        </section>

        <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-inner">
          <h2 className="text-xl font-bold mb-3">Our Core Philosophy</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            We believe in data ownership. By using a single source of truth—your notepad file—you 
            maintain complete control over your knowledge without relying on external APIs or 
            complex database infrastructures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Reuse of your custom Button component */}
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/contact'}>
              Contact the Hub
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/home'}>
              Back to Home
            </Button>
          </div>
        </div>

        <footer className="mt-10 text-center text-gray-400 text-xs uppercase tracking-widest">
          Build with React Functional Components & Tailwind CSS
        </footer>
      </div>
    </div>
  );
};

export default About;