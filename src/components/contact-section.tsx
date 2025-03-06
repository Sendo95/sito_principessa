import { Mail, Phone, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function validateEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

export function ContactSection() {
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [projectReference] = useState(location.state?.projectReference || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const body = {
        name,
        email,
        message,
        project_reference: projectReference
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

      const data = await response.json();
      console.log('Messaggio inviato con successo:', data);

      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-gray-800">
            Contattaci
          </h2>
          
          <div className="bg-white rounded-xl shadow-xl p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                  Informazioni di Contatto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-indigo-500 mr-3" />
                    <a
                      href="mailto:mirco@mazzolena.com"
                      className="text-gray-600 hover:text-indigo-500 transition-colors"
                    >
                      mirco@mazzolena.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-indigo-500 mr-3" />
                    <a
                      href="tel:+393287147717"
                      className="text-gray-600 hover:text-indigo-500 transition-colors"
                    >
                      328 714 7717
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                  Orari di Ricevimento
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Lunedì - Venerdì: 9:00 - 18:00<br />
                  Sabato - Domenica: Su appuntamento
                </p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {projectReference && (
                <input 
                  type="hidden" 
                  name="project_reference" 
                  value={projectReference} 
                />
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome Cognome"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Indirizzo Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nome@esempio.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Il Tuo Messaggio
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Descrivi il tuo progetto, le tue esigenze o qualsiasi informazione rilevante..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-6 italic">
                  Ti risponderemo entro 24 ore dal ricevimento del messaggio
                </p>
                
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 px-10 py-4 text-lg font-medium rounded-lg transition"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Invia Richiesta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
