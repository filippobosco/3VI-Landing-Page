'use client';

import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  KeyIcon,
  CogIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const BenefitsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const benefits = [
    {
      icon: BuildingOfficeIcon,
      title: 'Showroom',
      description: 'Vieni a vedere e provare i climatizzatori in funzione. Tocca con mano silenziosità ed efficienza prima di decidere.',
      color: 'blue'
    },
    {
      icon: UserGroupIcon,
      title: 'Solo Tecnici Certificati',
      description: 'Installatori qualificati e formati.',
      color: 'indigo'
    },
    {
      icon: DocumentTextIcon,
      title: 'Burocrazia? Ci Pensiamo Noi',
      description: 'Dalla pratica ENEA alle detrazioni fiscali, gestiamo tutto noi. Tu pensi solo a goderti il comfort.',
      color: 'blue'
    },
    {
      icon: KeyIcon,
      title: 'Davvero Chiavi in Mano',
      description: 'Predisposizioni elettriche, opere murarie, tubazioni: il nostro preventivo include tutto. Niente sorprese.',
      color: 'indigo'
    },
    {
      icon: CogIcon,
      title: 'Manutenzione Programmata',
      description: 'Piano di manutenzione personalizzato per mantenere l\'efficienza e allungare la vita del tuo impianto.',
      color: 'blue'
    },
    {
      icon: MapPinIcon,
      title: 'Sempre Vicini a Te',
      description: 'Con sede a Milano, siamo sempre raggiungibili per assistenza rapida e interventi urgenti.',
      color: 'indigo'
    }
  ];

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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-[#05668D]/10',
        border: 'border-[#05668D]/20',
        icon: 'text-[#05668D]',
        hover: 'hover:bg-[#05668D]/20'
      },
      indigo: {
        bg: 'bg-[#0466C8]/10',
        border: 'border-[#0466C8]/20',
        icon: 'text-[#0466C8]',
        hover: 'hover:bg-[#0466C8]/20'
      },
      green: {
        bg: 'bg-[#008000]/10',
        border: 'border-[#008000]/20',
        icon: 'text-[#008000]',
        hover: 'hover:bg-[#008000]/20'
      },
      purple: {
        bg: 'bg-[#05668D]/10',
        border: 'border-[#05668D]/20',
        icon: 'text-[#05668D]',
        hover: 'hover:bg-[#05668D]/20'
      },
      orange: {
        bg: 'bg-[#0466C8]/10',
        border: 'border-[#0466C8]/20',
        icon: 'text-[#0466C8]',
        hover: 'hover:bg-[#0466C8]/20'
      },
      red: {
        bg: 'bg-[#008000]/10',
        border: 'border-[#008000]/20',
        icon: 'text-[#008000]',
        hover: 'hover:bg-[#008000]/20'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perché i clienti Scelgono{' '}
              <span className="text-blue-600">3VI</span>
            </h2>
          </motion.div>

          {/* Benefits Grid - Desktop */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const colors = getColorClasses(benefit.color);
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className={`${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-xl p-8 transition-all duration-300 cursor-pointer`}
                >
                  {/* Icon */}
                  <div className={`${colors.icon} mb-6`}>
                    <benefit.icon className="w-12 h-12" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Benefits Carousel - Mobile */}
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
              aria-label="Beneficio precedente"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < benefits.length - 1 ? prev + 1 : prev
                )
              }
              disabled={currentIndex === benefits.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all ${
                currentIndex === benefits.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100 hover:scale-110'
              }`}
              aria-label="Beneficio successivo"
            >
              <ChevronRightIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <div className="overflow-hidden px-10">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{ left: -((benefits.length - 1) * 100), right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -10000) {
                    setCurrentIndex((prev) =>
                      prev < benefits.length - 1 ? prev + 1 : prev
                    );
                  } else if (swipe > 10000) {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
                  }
                }}
                animate={{ x: `${-currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {benefits.map((benefit, index) => {
                  const colors = getColorClasses(benefit.color);
                  return (
                    <motion.div
                      key={index}
                      className="min-w-full px-2 flex"
                    >
                      <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 w-full flex flex-col min-h-[280px]`}>
                        {/* Icon */}
                        <div className={`${colors.icon} mb-6`}>
                          <benefit.icon className="w-12 h-12" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {benefit.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed flex-grow">
                          {benefit.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#05668D]'
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Vai al beneficio ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-white border-2 border-blue-200 rounded-xl p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vuoi Scoprire Tutti i Nostri Vantaggi?
              </h3>
              <p className="text-gray-600 mb-6">
                Prenota una consulenza gratuita e scopri come possiamo aiutarti a trovare la soluzione perfetta
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const formSection = document.getElementById('contact-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Richiedi Consulenza Gratuita
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
