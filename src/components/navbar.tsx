import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black backdrop-blur-lg border-b border-gray-800 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent hover:from-red-300 hover:to-orange-200 transition-all"
          >
            DesignStudio
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/contact" 
              className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent hover:from-red-300 hover:to-orange-200 transition-all"
            >
              Contatti
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-red-400 p-1 rounded-lg hover:bg-gray-900 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-black mt-2 rounded-lg border border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                to="/contact"
                className="block text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent hover:from-red-300 hover:to-orange-200 transition-all px-4 py-3"
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
