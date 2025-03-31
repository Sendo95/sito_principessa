import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#1e1e1e]">
      <div className="absolute inset-0 bg-gradient-radial from-dark-100 to-dark opacity-80"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-white mb-12"
          >
            Francesca Rossi
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mx-auto md:w-3/4 lg:w-2/3 xl:w-2/3"
          >
            <p className="text-gray-400 text-center text-lg leading-relaxed">
              Ciao, sono Francesca Rossi, Graphic designer appassionata di illustrazioni vettoriali, loghi 
              e design creativo. Amo trasformare idee in progetti visivi unici, dove colori, forme e precisione 
              si incontrano per creare qualcosa di speciale. Qui trovi una selezione dei miei lavori: 
              esplora, lasciati ispirare e contattami per collaborare!
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12"
          >
            <Link to="/works">
              <Button className="bg-[#ff6b6b] text-white px-8 py-3 rounded-full hover:bg-[#ff5252] transition-colors">
                Scopri i nostri lavori
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}