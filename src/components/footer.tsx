import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-dark-100 text-gray-300 py-12 border-t border-dark-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">DesignStudio</h3>
            <p className="text-gray-400">
              Design unici fatti a mano per il tuo brand
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contatti</h3>
            <div className="space-y-4">
              <a 
                href="mailto:mirco@mazzolena.com" 
                className="flex items-center text-gray-400 hover:text-accent transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                mirco@mazzolena.com
              </a>
              <a 
                href="tel:+393287147717" 
                className="flex items-center text-gray-400 hover:text-accent transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                328 714 7717
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Menu</h3>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-gray-400 hover:text-accent transition-colors">
                Contatti
              </Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-dark-200 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Mirco Mazzolena. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}