import { Mail, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}
const imageModules = import.meta.glob('../../immagini/**/*.{jpg,jpeg,png}', { eager: true });
console.log('imageModules:', imageModules);

// Estrai i nomi delle cartelle
const folderSet = new Set<string>();
Object.keys(imageModules).forEach((key) => {
  const parts = key.split('/');
  if (parts[3] !== 'logo_sito') {
    folderSet.add(parts[3]);
  }
});
const dynamicProjectFolders = Array.from(folderSet);

export function ContactSection() {
  const location = useLocation();
  // projectReference viene preso da un'altra pagina e non viene modificato
  const [projectReference] = useState(location.state?.projectReference || '');
  // Stato per il progetto simile selezionato dal menu a tendina
  const [similarProject, setSimilarProject] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    if (!email.trim()) {
      newErrors.email = 'L’email è obbligatoria';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }
    if (!message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }
    if (!similarProject) {
      newErrors.similarProject = 'Seleziona un progetto simile';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const body = {
        name,
        email,
        message,
        project_reference: projectReference,
        similar_project: similarProject,
      };

      const response = await fetch('http://localhost:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Errore durante l’invio del messaggio');
      }

      // Reset dei campi
      setName('');
      setEmail('');
      setMessage('');
      setSimilarProject('');
      setErrors({});
      setSuccess(true);
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center bg-dark text-white">
      <div className="container h-full w-full px-4 py-16 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-dark-100 rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-semibold mb-6 text-center">Contattaci</h3>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-center">
              <Mail className="text-[#ff6b6b] mr-3" />
              <a href="mailto:mirco@mazzolena.com" className="text-gray-300 hover:text-[#ff6b6b] transition-colors">
                mirco@mazzolena.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="text-[#ff6b6b] mr-3" />
              <a href="tel:+393287147717" className="text-gray-300 hover:text-[#ff6b6b] transition-colors">
                328 714 7717
              </a>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-2">Orari di Ricevimento</h4>
              <p className="text-gray-300">
                Lunedì - Venerdì: 9:00 - 18:00<br />
                Sabato - Domenica: Su appuntamento
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              {/* Campo Nome */}
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Nome Cognome" 
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-dark-200 text-white" 
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Campo Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Indirizzo Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="nome@esempio.com" 
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-dark-200 text-white" 
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Dropdown per Progetto Simile (popolato dinamicamente) */}
              <div>
                <label className="block text-sm font-medium mb-2">Progetto Simile</label>
                <select 
                  value={similarProject} 
                  onChange={(e) => setSimilarProject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-dark-200 text-white"
                >
                  <option value="">-- Seleziona un progetto --</option>
                  {dynamicProjectFolders.map((project) => (
                    <option key={project} value={project}>{project}</option>
                  ))}
                  <option value="Altro">Altro</option>
                </select>
                {errors.similarProject && <p className="text-red-400 text-sm mt-1">{errors.similarProject}</p>}
              </div>

              {/* Campo Messaggio */}
              <div>
                <label className="block text-sm font-medium mb-2">Il Tuo Messaggio</label>
                <textarea 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  rows={5} 
                  placeholder="Descrivi il tuo progetto: il tipo di design desiderato, colori preferiti, obiettivi e qualsiasi altra informazione utile..." 
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-dark-200 text-white"
                ></textarea>
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>
            <div className="text-center">
              <Button 
                type="submit" 
                className="bg-[#ff6b6b] text-white px-8 py-3 rounded-full hover:bg-[#ff5252] transition-colors"
              >
                <Send className="mr-2 h-5 w-5" />
                Invia Richiesta
              </Button>
            </div>
          </form>
          
          {success && (
            <p className="text-center text-green-500 mt-4">
              Messaggio inviato con successo!
            </p>
          )}
          
          <p className="text-center text-gray-400 mt-6">
            Rispondiamo a tutti i messaggi per email entro 24 ore.
          </p>
        </div>
      </div>
    </section>
  );
}
