import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DesignStudio</h3>
            <p className="text-gray-400">
              Design unici fatti a mano per il tuo brand
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contatti</h3>
            <div className="space-y-2">
              <a 
                href="mailto:mirco@mazzolena.com" 
                className="flex items-center text-gray-400 hover:text-white"
              >
                <Mail className="h-5 w-5 mr-2" />
                mirco@mazzolena.com
              </a>
              <a 
                href="tel:+393287147717" 
                className="flex items-center text-gray-400 hover:text-white"
              >
                <Phone className="h-5 w-5 mr-2" />
                328 714 7717
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Menu</h3>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-gray-400 hover:text-white">Contatti</Link>
            </nav>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Mirco Mazzolena. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}