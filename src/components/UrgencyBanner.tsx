'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface UrgencyBannerProps {
  onClose: () => void;
}

const UrgencyBanner = ({ onClose }: UrgencyBannerProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 relative z-50"
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl"
            >
              ⚡
            </motion.div>
            <div className="text-sm md:text-base font-medium">
              <strong>Offerta Limitata Dicembre:</strong> Prenota la consulenza entro il 31/12 e ricevi la{' '}
              <strong>prima manutenzione gratuita</strong> (valore 89€)
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const formSection = document.getElementById('contact-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors duration-200 text-sm"
            >
              Richiedi Consulenza Gratuita
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
              aria-label="Chiudi banner"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UrgencyBanner;
