'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, ClockIcon, WrenchScrewdriverIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const SolutionSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const phases = [
    {
      number: '01',
      title: 'Analisi Approfondita',
      icon: CheckCircleIcon,
      description: 'Durante il sopralluogo gratuito, i nostri tecnici certificati valutano tutti gli aspetti tecnici:',
      points: [
        'Metratura e altezza di ogni ambiente',
        'Esposizione solare e isolamento termico',
        'Utilizzo degli spazi e abitudini familiari',
        'Predisposizioni esistenti e vincoli strutturali'
      ],
      color: 'green'
    },
    {
      number: '02',
      title: 'Proposta Personalizzata',
      icon: ClockIcon,
      description: 'Ricevi entro 48 ore un preventivo dettagliato e completo che include:',
      points: [
        'Soluzioni calibrate sul tuo budget',
        'Confronto trasparente tra marche diverse',
        'Calcolo preciso del risparmio energetico',
        'Piano di installazione senza sorprese'
      ],
      color: 'green'
    },
    {
      number: '03',
      title: 'Installazione Certificata',
      icon: WrenchScrewdriverIcon,
      description: 'I nostri installatori qualificati garantiscono:',
      points: [
        'Montaggio a regola d\'arte nei tempi prestabiliti',
        'Gestione completa pratiche e detrazioni',
        'Collaudo accurato di ogni componente',
        'Certificazione dell\'impianto e garanzia estesa'
      ],
      color: 'green'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-[#05668D]/10',
        border: 'border-[#05668D]/20',
        text: 'text-[#05668D]',
        icon: 'text-[#05668D]'
      },
      indigo: {
        bg: 'bg-[#0466C8]/10',
        border: 'border-[#0466C8]/20',
        text: 'text-[#0466C8]',
        icon: 'text-[#0466C8]'
      },
      green: {
        bg: 'bg-[#008000]/10',
        border: 'border-[#008000]/20',
        text: 'text-[#008000]',
        icon: 'text-[#008000]'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-white">
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
              La Consulenza Professionale che{' '}
              <span className="text-[#008000]">Elimina Ogni Rischio</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Il nostro metodo collaudato in 3 fasi ti garantisce la soluzione perfetta al primo colpo
            </p>
          </motion.div>

          {/* Timeline - Desktop */}
          <div className="hidden lg:block relative">
            {/* Timeline Line Segments - Between boxes only */}
            {/* Line between first and second box */}
            <div className="absolute top-1/2 left-[calc(33.333%-1rem)] right-[calc(66.667%+1rem)] h-0.5 bg-[#05668D]/20 transform -translate-y-1/2 z-0"></div>
            {/* Line between second and third box */}
            <div className="absolute top-1/2 left-[calc(66.667%-1rem)] right-[calc(33.333%+1rem)] h-0.5 bg-[#05668D]/20 transform -translate-y-1/2 z-0"></div>

            {/* Phases Grid */}
            <div className="grid grid-cols-3 gap-8">
              {phases.map((phase, index) => {
                const colors = getColorClasses(phase.color);
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Phase Card */}
                    <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                      {/* Phase Number */}
                      <div className={`${colors.text} text-4xl font-bold mb-4`}>
                        {phase.number}
                      </div>

                      {/* Icon */}
                      <div className={`${colors.icon} mb-4`}>
                        <phase.icon className="w-12 h-12" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {phase.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {phase.description}
                      </p>

                      {/* Points */}
                      <ul className="space-y-2 flex-grow">
                        {phase.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircleIcon className={`w-4 h-4 ${colors.icon} flex-shrink-0 mt-0.5`} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline Dot */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ${colors.bg} ${colors.border} border-2 transform -translate-x-1/2 z-10`}></div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Carousel - Mobile/Tablet */}
          <div className="lg:hidden relative">
            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))}
              disabled={currentIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100 hover:scale-110'
              }`}
              aria-label="Fase precedente"
            >
              <ChevronLeftIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < phases.length - 1 ? prev + 1 : prev
                )
              }
              disabled={currentIndex === phases.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg transition-all ${
                currentIndex === phases.length - 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'opacity-90 hover:opacity-100 hover:scale-110'
              }`}
              aria-label="Fase successiva"
            >
              <ChevronRightIcon className="w-6 h-6 text-[#05668D]" />
            </button>

            <div className="overflow-hidden px-10">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{ left: -((phases.length - 1) * 100), right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;

                  if (swipe < -10000) {
                    setCurrentIndex((prev) =>
                      prev < phases.length - 1 ? prev + 1 : prev
                    );
                  } else if (swipe > 10000) {
                    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
                  }
                }}
                animate={{ x: `${-currentIndex * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {phases.map((phase, index) => {
                  const colors = getColorClasses(phase.color);
                  return (
                    <motion.div
                      key={index}
                      className="min-w-full px-2 flex"
                    >
                      <div className={`${colors.bg} ${colors.border} border-2 rounded-xl p-8 w-full flex flex-col min-h-[480px]`}>
                        {/* Phase Number */}
                        <div className={`${colors.text} text-4xl font-bold mb-4`}>
                          {phase.number}
                        </div>

                        {/* Icon */}
                        <div className={`${colors.icon} mb-4`}>
                          <phase.icon className="w-12 h-12" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          {phase.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {phase.description}
                        </p>

                        {/* Points */}
                        <ul className="space-y-2 flex-grow">
                          {phase.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircleIcon className={`w-4 h-4 ${colors.icon} flex-shrink-0 mt-0.5`} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {phases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#05668D]'
                      : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Vai alla fase ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Pronto a Iniziare il Tuo Percorso?
              </h3>
              <p className="text-gray-600 mb-6">
                La prima fase è completamente gratuita e senza impegno
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const formSection = document.getElementById('contact-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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

export default SolutionSection;
