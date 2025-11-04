'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDownIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'La consulenza è veramente gratuita?',
      answer: 'Assolutamente sì. Il sopralluogo e il preventivo sono completamente gratuiti e senza alcun obbligo di acquisto. È il nostro modo di dimostrarti la professionalità prima ancora di diventare cliente.'
    },
    {
      question: 'Quanto tempo richiede il sopralluogo?',
      answer: 'In media 30-45 minuti, durante i quali il tecnico analizza gli spazi, risponde alle tue domande e ti spiega le diverse opzioni possibili. Nessuna fretta, nessuna pressione.'
    },
    {
      question: 'Posso ottenere le detrazioni fiscali?',
      answer: 'Certamente! Ti spieghiamo se hai diritto al bonus 50% (ristrutturazione) o 65% (efficientamento) e gestiamo noi tutta la documentazione ENEA necessaria.'
    },
    {
      question: 'E se non ho la predisposizione?',
      answer: 'Nessun problema! Realizziamo impianti completi partendo da zero, incluse canalizzazioni, collegamenti elettrici e opere murarie. Il preventivo include sempre tutto.'
    },
    {
      question: 'Fate manutenzione su tutte le marche?',
      answer: 'Sì, effettuiamo manutenzione ordinaria su climatizzatori di ogni marca.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <QuestionMarkCircleIcon className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Domande Frequenti sulla Consulenza
              </h2>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
