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

      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center bg-white text-black">
      <div className="container h-full w-full px-4 py-16 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-semibold mb-6">Informazioni di Contatto</h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <Mail className="text-[#ff6b6b] mr-3" />
                <a href="mailto:mirco@mazzolena.com" className="text-black-300 hover:text-[#ff6b6b] transition-colors">mirco@mazzolena.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="text-[#ff6b6b] mr-3" />
                <a href="tel:+393287147717" className="text-black-300 hover:text-[#ff6b6b] transition-colors">328 714 7717</a>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Orari di Ricevimento</h4>
                <p className="text-black-300">
                  Lunedì - Venerdì: 9:00 - 18:00<br />
                  Sabato - Domenica: Su appuntamento
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl font-semibold mb-6">Contattaci</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {projectReference && (
                <input type="hidden" name="project_reference" value={projectReference} />
              )}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Cognome" className="w-full px-4 py-3 border border-black-600 rounded-lg bg-white text-black" />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Indirizzo Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nome@esempio.com" className="w-full px-4 py-3 border border-black-600 rounded-lg bg-white text-black" />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Il Tuo Messaggio</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} placeholder="Descrivi il tuo progetto..." className="w-full px-4 py-3 border border-black-600 rounded-lg bg-white text-black"></textarea>
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" className="bg-[#ff6b6b] text-white px-8 py-3 rounded-full hover:bg-[#ff5252] transition-colors">
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
