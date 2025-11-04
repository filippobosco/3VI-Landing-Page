'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Andrea Perna',
      location: 'Milano',
      rating: 5,
      text: 'Installazione trial split in appartamento di nuova costruzione. Tutti gli interlocutori della società sono stati precisi, puntuali e trasparenti. Prezzi competitivi rispetto ad altri player del settore.'
    },
    {
      name: 'Mario',
      location: 'Milano',
      rating: 5,
      text: 'Ho sostituito il vecchio condizionatore con un modello recente della Daikin. Sono stati molto seri e professionali sia nel preventivo che nell\'effettuare tutti i lavori. Anche nel post-vendita si sono dimostrati affidabili. Sicuramente consigliati.'
    },
    {
      name: 'Silvia Pellizzola',
      location: 'Milano',
      rating: 5,
      text: 'Precisi e puntuali dalla fase dell\'offerta a quella dell\'installazione. Si sono occupati della pratica ENEA per il recupero del 50% con cortesia e celerità. Sono certa che manterranno lo stesso servizio anche nel post-vendita. Bravi!'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Cosa Dicono i Nostri Clienti
              </h2>
            </div>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-lg">
              {/* Testimonial Content */}
              <div className="text-center mb-8">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-3xl mx-auto"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-8">
                    &ldquo;{testimonials[currentIndex].text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Testimonial precedente"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-blue-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Vai al testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Testimonial successivo"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Review Summary */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4.7/5</div>
                  <div className="text-sm text-gray-600">su Google Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">clienti soddisfatti</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">137</div>
                  <div className="text-sm text-gray-600">recensioni verificate</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
