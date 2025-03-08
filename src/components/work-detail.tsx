import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const works = [
  {
    id: 1,
    images: [
      'https://images.unsplash.com/photo-1621112904887-419379ce6824',
      'https://images.unsplash.com/photo-1635405074683-96d6921a2a68',
      'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb'
    ]
  },
  {
    id: 2,
    images: [
      '/immagini/prova1/scimmia/pisellona.jpg',
      '/immagini/prova1/occhi/occhio.jpg',
      '/immagini/prova1/occhi/destro.jpg',
      '/immagini/prova1/occhi/sinistro.jpg'
    ]
  }
];

export function WorkDetail() {
  const { id } = useParams();
  const work = works.find(w => w.id === Number(id));

  // Stato per sapere quale gruppo (cartella) e quale indice di immagine è aperto in modale
  const [modalGroup, setModalGroup] = useState<ImageGroup | null>(null);
  const [modalIndex, setModalIndex] = useState(0);

  // Se il lavoro non viene trovato, mostra un messaggio di errore.
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

  /**
   * Raggruppa le immagini in base alla "cartella finale" del percorso:
   * Esempio: "/immagini/prova1/occhi/occhio.jpg" => cartella finale: "occhi".
   * Per immagini esterne (Unsplash) consideriamo ogni URL come un gruppo singolo.
   */
  const groupedImages = work.images.reduce((acc: { [key: string]: string[] }, imagePath) => {
    if (imagePath.startsWith('http')) {
      // Immagine esterna
      acc[imagePath] = [imagePath];
    } else {
      const parts = imagePath.split('/');
      parts.pop(); // rimuove il nome file
      const lastFolder = parts[parts.length - 1] || 'unknown';
      if (!acc[lastFolder]) {
        acc[lastFolder] = [];
      }
      acc[lastFolder].push(imagePath);
    }
    return acc;
  }, {});

  // Converte l'oggetto in un array di gruppi { key, images }.
  const imageGroups = Object.entries(groupedImages).map(([key, images]) => ({
    key,
    images
  }));

  // Stato per l'indice di ogni gruppo nella griglia (mostra la prima immagine o quella selezionata).
  const [groupIndices, setGroupIndices] = useState(() => {
    const init: { [key: string]: number } = {};
    imageGroups.forEach((g) => {
      init[g.key] = 0;
    });
    return init;
  });

  // Funzioni per scorrere le immagini in griglia (frecce piccole).
  interface GroupIndices {
    [key: string]: number;
  }

  const handleGridPrev = (groupKey: string, length: number) => {
    setGroupIndices((prev: GroupIndices) => ({
      ...prev,
      [groupKey]: prev[groupKey] === 0 ? length - 1 : prev[groupKey] - 1
    }));
  };

  const handleGridNext = (groupKey: string, length: number) => {
    setGroupIndices((prev: GroupIndices) => ({
      ...prev,
      [groupKey]: prev[groupKey] === length - 1 ? 0 : prev[groupKey] + 1
    }));
  };

  // Apertura modale: passo il gruppo e l'indice corrente di quel gruppo.
  interface ImageGroup {
    key: string;
    images: string[];
  }

  const openModal = (group: ImageGroup, index: number) => {
    setModalGroup(group);
    setModalIndex(index);
  };

  // Chiusura modale.
  const closeModal = () => {
    setModalGroup(null);
    setModalIndex(0);
  };

  // Scorrimento delle immagini all'interno della modale.
  const handleModalPrev = () => {
    if (!modalGroup) return;
    setModalIndex((prev) =>
      prev === 0 ? modalGroup.images.length - 1 : prev - 1
    );
  };

  const handleModalNext = () => {
    if (!modalGroup) return;
    setModalIndex((prev) =>
      prev === modalGroup.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 bg-dark"
    >
      <div className="container mx-auto px-4">
        <Link to="/works" className="inline-flex items-center text-[#E74C3C] hover:underline mb-8">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Torna ai lavori
        </Link>

        {/* Griglia immagini */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageGroups.map((group) => {
              const currentIndex = groupIndices[group.key];
              const currentImage = group.images[currentIndex];

              return (
                <div key={group.key} className="relative">
                  {/* Miniatura visibile */}
                  <div
                    className="aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openModal(group, currentIndex)}
                  >
                    <img
                      src={currentImage}
                      alt={`Immagine ${group.key}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Frecce per scorrere in griglia (se più immagini nel gruppo) */}
                  {group.images.length > 1 && (
                    <>
                      <button
                        onClick={() => handleGridPrev(group.key, group.images.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleGridNext(group.key, group.images.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-1"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modale con AnimatePresence */}
      <AnimatePresence>
        {modalGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative flex flex-col items-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Immagine ingrandita */}
                <img
                  src={modalGroup.images[modalIndex]}
                  alt={`Immagine ingrandita ${modalIndex + 1}`}
                  className="max-w-full max-h-screen rounded-lg"
                />

                {/* Frecce per scorrere nella modale (se più immagini) */}
                {modalGroup.images.length > 1 && (
                  <>
                    <button
                      onClick={handleModalPrev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleModalNext}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Pulsante di chiusura modale */}
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Bottone per contatti */}
              <Link 
                to="/contact"
                state={{ 
                  projectReference: `Progetto #${id} - ${modalGroup?.key || 'Generico'}` 
                }}
                onClick={closeModal}
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 transition-colors"
              >
                Richiedi un progetto simile
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
