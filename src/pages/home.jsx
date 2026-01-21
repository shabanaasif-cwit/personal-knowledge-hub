import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'React Fundamentals', category: 'Learning', date: '2024-01-20', icon: '⚛️' },
    { id: 2, title: 'Tailwind CSS Guide', category: 'Design', date: '2024-01-19', icon: '🎨' },
    { id: 3, title: 'JavaScript Tips', category: 'Tips', date: '2024-01-18', icon: '💡' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete React Project', status: 'In Progress', priority: 'High' },
    { id: 2, title: 'Learn Tailwind CSS', status: 'Completed', priority: 'Medium' },
    { id: 3, title: 'Build Knowledge Hub', status: 'In Progress', priority: 'High' },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="w-full p-4 md:p-6 bg-gray-100 min-h-screen">
      
      {/* Welcome Section - Centered */}
      <section className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome to Personal Knowledge Hub 🎓
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Organize, manage, and expand your knowledge with ease. Keep all your notes, tasks, and ideas in one place.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        
        {/* Total Notes Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Notes</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">{notes.length}</h3>
              <p className="text-gray-500 text-xs mt-1">Knowledge pieces stored</p>
            </div>
            <div className="text-5xl opacity-20">📝</div>
          </div>
        </div>

        {/* Active Tasks Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Tasks</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {tasks.filter(t => t.status === 'In Progress').length}
              </h3>
              <p className="text-gray-500 text-xs mt-1">Tasks in progress</p>
            </div>
            <div className="text-5xl opacity-20">⚡</div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Completed</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-2">
                {tasks.filter(t => t.status === 'Completed').length}
              </h3>
              <p className="text-gray-500 text-xs mt-1">Tasks finished</p>
            </div>
            <div className="text-5xl opacity-20">✓</div>
          </div>
        </div>

      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Notes Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Notes</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All →</a>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y">
              {notes.map(note => (
                <div key={note.id} className="p-4 hover:bg-gray-50 transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="text-2xl mt-1">{note.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{note.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{note.category}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Active Tasks Section */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Active Tasks</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm">View All →</a>
          </div>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <input type="checkbox" className="w-5 h-5 mt-1 cursor-pointer" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 rounded bg-gray-100 ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Features Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="font-semibold text-gray-900">Organize Notes</h3>
            <p className="text-sm text-gray-600 mt-1">Categorize and store your knowledge</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-4xl mb-2">✅</div>
            <h3 className="font-semibold text-gray-900">Track Tasks</h3>
            <p className="text-sm text-gray-600 mt-1">Manage your to-do list efficiently</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-4xl mb-2">🏷️</div>
            <h3 className="font-semibold text-gray-900">Tag & Search</h3>
            <p className="text-sm text-gray-600 mt-1">Find information quickly</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-4xl mb-2">⚙️</div>
            <h3 className="font-semibold text-gray-900">Customize</h3>
            <p className="text-sm text-gray-600 mt-1">Personalize your experience</p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to Organize Your Knowledge?</h2>
        <p className="mb-6 text-blue-100">Start creating notes and managing tasks today!</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition" href="/dashboard" alt="Get Started">
          Get Started →
        </button>

      </section>

    </div>
  );
}

export default Home;