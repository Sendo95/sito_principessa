import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type Work = {
    id: number;
    title: string;
    thumbnail?: string;
    images?: string[];
    description?: string; 
  };
  
  const works: Work[] = [
    {
      id: 1,
      title: 'Case',
      thumbnail: './immagini/case/ville/villa1.jpg'
    },
    {
      id: 2,
      title: 'Immagini prova 1',
      thumbnail: './immagini/prova1/occhi/occhio.jpg'
    }
  ];

export function WorksPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display text-center">
          I Nostri Lavori
        </h1>
        <p className="text-xl text-gray-400 mb-12 text-center max-w-2xl mx-auto">
          Una selezione dei nostri migliori progetti di design, 
          che mostrano la nostra passione per la creatività e l'attenzione ai dettagli.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => (
            <Link to={`/works/${work.id}`} key={work.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative group cursor-pointer"
              >
                <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6">
                    <h3 className="text-xl font-semibold mb-2">{work.title}</h3>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}