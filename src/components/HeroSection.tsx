'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const trustElements = [
    "Sopralluogo gratuito senza impegno",
    "Preventivo chiavi in mano in 48 ore",
    "Gestione pratiche ENEA per detrazioni 50-65%",
    "Possibilità di pagamenti rateizzati"
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 pt-0 pb-16 overflow-hidden">
      {/* Clean Professional Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static Technical Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Static Circuit Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/25 to-transparent" />
        
        {/* Static Flow Indicators */}
        <div className="absolute top-20 right-20 w-2 h-16 bg-blue-200/20 rounded-full" />
        <div className="absolute bottom-32 left-20 w-16 h-2 bg-indigo-200/15 rounded-full" />
        
        {/* Static Temperature Zones */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50/15 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-gradient-to-r from-indigo-50/10 to-transparent" />
        
        {/* Static HVAC Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.08'%3E%3Crect x='20' y='20' width='40' height='40' rx='4'/%3E%3Ccircle cx='40' cy='40' r='8'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        />
        
        {/* Static Air Flow Indicators */}
        <div className="absolute top-1/2 right-10 w-8 h-8 border border-blue-200/15 rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-6 h-6 border border-indigo-200/10 rounded-full" />
      </div>
      
      <div className="container mx-auto px-0 relative z-10 -mt-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Company Logo */}
          <motion.div
            variants={fadeInUp}
            className="-mb-8"
          >
            <Image
              src="/logo bianco.svg"
              alt="3VI Climatizzazione"
              width={600}
              height={300}
              className="h-60 w-auto mx-auto drop-shadow-lg"
              priority
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Risparmia fino al{' '}
            <span className="text-[#05668D]">30%</span> sulla Bolletta con il{' '}
            <span className="text-[#05668D]">Climatizzatore Giusto</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-700 mb-8 font-medium"
          >
            Consulenza gratuita e sopralluogo professionale per trovare la soluzione di climatizzazione perfetta per la tua casa o ufficio
          </motion.p>

          {/* Hero Paragraph */}
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Da oltre 15 anni, 3VI è il punto di riferimento per la climatizzazione.
            Come rivenditori ufficiali dei migliori marchi, ti garantiamo non solo i migliori prodotti sul mercato,
            ma soprattutto la consulenza esperta che ti farà risparmiare tempo e denaro, evitando errori costosi nella scelta del tuo impianto.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            variants={fadeInUp}
            className="mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const formSection = document.getElementById('contact-form');
                formSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Richiedi Consulenza Gratuita
              <ArrowRightIcon className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Trust Elements */}
          <motion.div
            variants={fadeInUp}
            className="space-y-4"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
              {trustElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                  className="flex items-center gap-2 text-gray-700 font-medium max-w-[200px]"
                >
                  <CheckCircleIcon className="w-5 h-5 text-[#008000] flex-shrink-0" />
                  <span className="text-sm md:text-base leading-tight">{element}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
