import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-red-400 hover:text-red-300 transition-colors">
            DesignStudio
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-red-400 transition-colors duration-200"
            >
              Contatti
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-red-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-800/95 mt-2 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-gray-700/50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contatti
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}