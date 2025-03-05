import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-display">
            Trasformiamo idee in identità visive
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Illustrazioni, loghi e design su misura
          </p>
          <Link to="/works">
            <Button className="text-lg px-8 py-6 bg-[#E74C3C] hover:bg-[#D44235] text-white">
              Scopri i nostri lavori
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-24 p-8 bg-gray-50 rounded-lg"
          >
            <h2 className="text-2xl font-display font-semibold mb-4">Chi siamo</h2>
            <p className="text-gray-600">
              Francesca Rossi, designer freelance con una passione per le illustrazioni vintage 
              e il branding moderno. Ogni progetto è un'opportunità per creare qualcosa di 
              unico e memorabile.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}