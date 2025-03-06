import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-[#5755] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-[#ff6b6b] font-bold text-lg mb-4">DesignStudio</h3>
            <p className="text-gray-400 text-sm">
              Design unici fatti a mano per il tuo brand
            </p>
          </div>

          {/* Contacts Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-4">Contatti</h3>
            <div className="space-y-3">
              <a
                href="mailto:mirco@mazzolena.com"
                className="flex items-center justify-center md:justify-start text-gray-400 hover:text-[#ff6b6b] transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                mirco@mazzolena.com
              </a>
              <a
                href="tel:+393287147717"
                className="flex items-center justify-center md:justify-start text-gray-400 hover:text-[#ff6b6b] transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                328 714 7717
              </a>
            </div>
          </div>

          {/* Menu Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-4">Menu</h3>
            <nav className="space-y-3">
              <Link
                to="/contact"
                className="text-gray-400 hover:text-[#ff6b6b] transition-colors block"
              >
                Contatti
              </Link>
            </nav>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Mirco Mazzolena. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}