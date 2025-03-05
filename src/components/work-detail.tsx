import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

// Import works data
const works = [
  {
    id: 1,
    title: 'Logo per Bistrot Vegano',
    images: [
      'https://images.unsplash.com/photo-1621112904887-419379ce6824',
      'https://images.unsplash.com/photo-1635405074683-96d6921a2a68',
      'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb'
    ],
    description: 'Logo minimalista per un bistrot vegano che unisce eleganza e naturalezza. Realizzato con una palette di colori organici e forme essenziali.'
  },
  {
    id: 2,
    title: 'Immagini prova 2',
    images: [
      '/immagini/pisellona.jpg',
      '/immagini/occhio.jpg'
    ],
    description: 'Descrizione di prova 2'
  }
];

export function WorkDetail() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const work = works.find(w => w.id === Number(id));
  
  if (!work) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Progetto non trovato</h1>
          <Link to="/works" className="text-[#E74C3C] hover:underline">
            Torna alla lista dei lavori
          </Link>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? work.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === work.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-white"
    >
      <div className="container mx-auto px-4">
        <Link to="/works" className="inline-flex items-center text-[#E74C3C] hover:underline mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Torna ai lavori
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={work.images[currentImageIndex]}
              alt={`${work.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {work.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{work.title}</h1>
            <p className="text-gray-600 mb-8">{work.description}</p>
            <Link to="/contact" className="mt-auto">
              <Button className="w-full bg-[#E74C3C] hover:bg-[#D44235] text-white">
                Richiedi un progetto simile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}