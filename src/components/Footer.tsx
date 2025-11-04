'use client';

import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
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
        duration: 0.6
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Contact Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Preferisci Parlare Direttamente con un{' '}
              <span className="text-blue-400">Esperto</span>?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
              Chiamaci per una consulenza telefonica immediata o compila il form sopra per essere ricontattato
            </p>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Phone */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Chiamaci Subito</h3>
                  <p className="text-blue-400 font-bold text-xl mb-2">02 90721585</p>
                  <p className="text-gray-400 text-sm">Dal Lunedì al Venerdì</p>
                  <p className="text-gray-400 text-sm">14:30-18:30</p>
                </div>
              </motion.div>

              {/* WhatsApp */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Scrivici su WhatsApp</h3>
                  <p className="text-green-400 font-bold text-xl mb-2">352 0099268</p>
                  <p className="text-gray-400 text-sm">Rispondiamo in tempo reale</p>
                  <p className="text-gray-400 text-sm">durante l&apos;orario lavorativo</p>
                </div>
              </motion.div>

              {/* Showroom Rozzano */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Showroom Rozzano</h3>
                  <p className="text-gray-300 text-sm mb-1">Via Bruno Buozzi 40/A</p>
                  <p className="text-gray-400 text-sm">Rozzano (MI)</p>
                </div>
              </motion.div>

              {/* Showroom Porta Genova */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                    <MapPinIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Showroom Porta Genova</h3>
                  <p className="text-gray-300 text-sm mb-1">Corso Cristoforo Colombo</p>
                  <p className="text-gray-400 text-sm">Milano</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Company Info */}
          <motion.div variants={itemVariants} className="text-center border-t border-gray-700 pt-8">
            <p className="text-lg font-semibold text-blue-400 mb-2">
              3VI S.r.l.
            </p>
            <p className="text-gray-400">
              Dal 2011 il tuo partner di fiducia per il comfort climatico a Milano
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 3VI S.r.l. Tutti i diritti riservati.</p>
            <div className="flex gap-6 mt-2 md:mt-0">
              <a href="https://3vi.net/informativa-privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="https://3vi.net/cookie-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
