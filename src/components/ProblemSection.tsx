'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const ProblemSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const painPoints = [
    {
      icon: XCircleIcon,
      title: 'Potenza Sbagliata',
      description: 'Un impianto troppo potente consuma inutilmente, uno troppo debole lavora sempre al massimo usurandosi rapidamente',
      color: 'text-red-500'
    },
    {
      icon: XCircleIcon,
      title: 'Posizionamento Errato',
      description: 'Split posizionati male creano zone fredde/calde, correnti fastidiose e rumore nelle camere da letto',
      color: 'text-red-500'
    },
    {
      icon: XCircleIcon,
      title: 'Marca Inadeguata',
      description: 'Non tutti i brand sono uguali: alcuni eccellono nel residenziale, altri nel commerciale. Sbagliare significa problemi futuri',
      color: 'text-red-500'
    },
    {
      icon: XCircleIcon,
      title: 'Installazione Improvvisata',
      description: 'Il 60% dei problemi deriva da installazioni non professionali: perdite di gas, condense mal gestite, collegamenti elettrici pericolosi',
      color: 'text-red-500'
    }
  ];

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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Scegliere il Climatizzatore Sbagliato Può{' '}
              <span className="text-red-600">Costarti Caro</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ogni anno migliaia di famiglie sprecano denaro in impianti sovradimensionati, 
              sottodimensionati o semplicemente inadatti ai loro spazi. Il risultato? Bollette salate, 
              comfort insufficiente e manutenzioni continue.
            </p>
          </motion.div>

          {/* Pain Points Grid - Desktop */}
          <div className="hidden md:grid grid-cols-2 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#05668D]"
              >
                <div className="flex items-start gap-4">
                  <div className={`${point.color} flex-shrink-0 mt-1`}>
                    <point.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {point.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pain Points Carousel - Mobile */}
          <div className="md:hidden relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100 hover:scale-110'
              }`}
              aria-label="Card precedente"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < painPoints.length - 1 ? prev + 1 : prev
                )
              }
              disabled={currentIndex === painPoints.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all ${
                currentIndex === painPoints.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100 hover:scale-110'
              }`}
              aria-label="Card successiva"
            >
              <ChevronRightIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <div className="overflow-hidden px-10">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{ left: -((painPoints.length - 1) * 100), right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -10000) {
                    // Swipe left
                    setCurrentIndex((prev) =>
                      prev < painPoints.length - 1 ? prev + 1 : prev
                    );
                  } else if (swipe > 10000) {
                    // Swipe right
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
                  }
                }}
                animate={{ x: `${-currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    className="min-w-full px-2 flex"
                  >
                    <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-[#05668D] w-full flex flex-col min-h-[280px]">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`${point.color} flex-shrink-0 mt-1`}>
                          <point.icon className="w-8 h-8" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {point.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {point.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {painPoints.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#05668D]'
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Vai alla card ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="bg-[#05668D]/10 border border-[#05668D]/20 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg text-[#05668D] font-medium">
                💡 <strong>La buona notizia?</strong> Tutti questi errori si possono evitare con la consulenza giusta!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
