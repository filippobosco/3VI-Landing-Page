'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const CTASection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    citta: '',
    tipoImmobile: '',
    situazioneAttuale: '',
    numeroStanze: '',
    note: ''
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Chiamata all'API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Gestione errori
        console.error('Errore invio form:', data);
        setError('Si è verificato un errore. Riprova o contattaci direttamente al 333 847 9696.');
        setIsSubmitting(false);
        return;
      }

      // Successo - redirect alla thank you page
      router.push('/thank-you');

    } catch (error) {
      console.error('Errore di rete:', error);
      setError('Impossibile inviare la richiesta. Controlla la tua connessione internet.');
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="contact-form" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Richiedi la Tua{' '}
              <span className="text-[#0466C8]">Consulenza Gratuita</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compila il form e ti contatteremo entro 24 ore per fissare il sopralluogo gratuito.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Compila il Form - Ti Contattiamo in 24 Ore
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Mario"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="cognome" className="block text-sm font-medium text-gray-700 mb-2">
                        Cognome *
                      </label>
                      <input
                        type="text"
                        id="cognome"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleInputChange}
                        placeholder="Rossi"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="mario.rossi@email.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="333 1234567"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Location and Property */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="citta" className="block text-sm font-medium text-gray-700 mb-2">
                        Città/Zona
                      </label>
                      <select
                        id="citta"
                        name="citta"
                        value={formData.citta}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200 text-gray-900"
                      >
                        <option value="">Seleziona zona</option>
                        <option value="Milano Centro">Milano Centro</option>
                        <option value="Milano Provincia">Milano Provincia</option>
                        <option value="Pavia Centro">Pavia Centro</option>
                        <option value="Pavia Provincia">Pavia Provincia</option>
                        <option value="Lodi Centro">Lodi Centro</option>
                        <option value="Lodi Provincia">Lodi Provincia</option>
                        <option value="Monza e Brianza Centro">Monza e Brianza Centro</option>
                        <option value="Monza e Brianza Provincia">Monza e Brianza Provincia</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="tipoImmobile" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo Immobile
                      </label>
                      <div className="space-y-2">
                        {['Casa', 'Ufficio', 'Negozio'].map((tipo) => (
                          <label key={tipo} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="tipoImmobile"
                              value={tipo}
                              checked={formData.tipoImmobile === tipo}
                              onChange={handleInputChange}
                              className="text-[#05668D] focus:ring-[#05668D]"
                            />
                            <span className="text-gray-700">{tipo}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <label htmlFor="numeroStanze" className="block text-sm font-medium text-gray-700 mb-2">
                      Numero di Stanze
                    </label>
                    <select
                      id="numeroStanze"
                      name="numeroStanze"
                      value={formData.numeroStanze}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#05668D] focus:border-transparent transition-all duration-200 text-gray-900"
                    >
                      <option value="">Seleziona</option>
                      <option value="Monolocale">Monolocale</option>
                      <option value="Bilocale">Bilocale</option>
                      <option value="Trilocale">Trilocale</option>
                      <option value="Quadrilocale">Quadrilocale</option>
                      <option value="5+ locali">5+ locali</option>
                    </select>
                  </div>

                  {/* Impianto Predisposto */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      L&apos;impianto è predisposto?
                    </label>
                    <div className="space-y-2">
                      {['Sì', 'No'].map((risposta) => (
                        <label key={risposta} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="situazioneAttuale"
                            value={risposta}
                            checked={formData.situazioneAttuale === risposta}
                            onChange={handleInputChange}
                            className="text-[#05668D] focus:ring-[#05668D]"
                          />
                          <span className="text-gray-700">{risposta}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                      Note
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Descrivi brevemente le tue esigenze..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Privacy */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                      className="mt-1 text-[#05668D] focus:ring-[#05668D]"
                      required
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Ho letto e accetto l&apos;<a href="https://3vi.net/informativa-privacy/" target="_blank" rel="noopener noreferrer" className="text-[#05668D] underline hover:text-[#0466C8]">informativa privacy</a> e autorizzo il trattamento dei miei dati personali
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={!privacyAccepted || isSubmitting}
                    whileHover={{ scale: privacyAccepted ? 1.02 : 1 }}
                    whileTap={{ scale: privacyAccepted ? 0.98 : 1 }}
                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
                      privacyAccepted && !isSubmitting
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Invio in corso...' : 'Richiedi Consulenza Gratuita →'}
                  </motion.button>
                </form>

                {/* Form Footer */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <ShieldCheckIcon className="w-4 h-4" />
                  <span>I tuoi dati sono protetti e mai condivisi con terze parti</span>
                </div>
              </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
