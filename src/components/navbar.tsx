import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-[#ff6b6b] text-xl font-bold hover:text-[#ff5252]"
          >
            DesignStudio
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link 
              to="/contact" 
              className="text-white hover:text-[#ff6b6b]"
            >
              Contatti
            </Link>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-accent p-1 rounded-lg hover:bg-dark-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-dark-100 mt-2 rounded-lg border border-dark-200">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Link
                to="/contact"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-dark-200 rounded-lg transition-colors"
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
