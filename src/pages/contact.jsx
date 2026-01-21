import { useState } from 'react';
import Button from '../components/common/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulating a sync delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Syncing with Hub successful!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 text-center">
        <header className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Get in Touch</h1>
          <p className="text-gray-500">Update your personal knowledge hub</p>
        </header>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              /* text-black: forces typed text to be black */
              /* placeholder-gray-400: keeps the placeholder muted */
              className="w-full p-4 bg-white text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="Shabana Asif"
              required
            />
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-white text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-gray-400"
              placeholder="shabanaasif.cwit@gmail.com"
              required
            />
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 bg-white text-black border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none placeholder-gray-400"
              placeholder="Enter your notes or message here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="primary" 
            size="lg"
            className="w-full py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Syncing...' : 'Sync with Hub'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;