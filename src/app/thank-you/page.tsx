'use client';

import { motion } from 'framer-motion';
import { CheckCircleIcon, PhoneIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ThankYouPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { duration: 0.5, type: "spring", stiffness: 200 }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8 overflow-hidden relative">
      {/* Background Pattern - Same as Hero */}
      <div className="absolute inset-0 overflow-hidden">
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
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/30 to-transparent" />
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-200/25 to-transparent" />
        <div className="absolute top-20 right-20 w-2 h-16 bg-blue-200/20 rounded-full" />
        <div className="absolute bottom-32 left-20 w-16 h-2 bg-indigo-200/15 rounded-full" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative z-10"
      >
        {/* Success Icon */}
        <motion.div
          variants={scaleIn}
          className="flex justify-center mb-6"
        >
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircleIcon className="w-16 h-16 text-[#008000]" />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={fadeInUp}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4"
        >
          Richiesta Inviata con Successo!
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeInUp}
          className="text-xl text-gray-700 text-center mb-8"
        >
          Grazie per aver scelto 3VI
        </motion.p>

        {/* Success Message */}
        <motion.div
          variants={fadeInUp}
          className="bg-blue-50 border-l-4 border-[#05668D] p-6 rounded-r-lg mb-8"
        >
          <p className="text-gray-800 text-lg leading-relaxed">
            <strong className="text-[#05668D]">Ti contatteremo entro 24 ore</strong> per fissare il sopralluogo gratuito e fornirti una consulenza personalizzata per la climatizzazione della tua casa o ufficio.
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={fadeInUp}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Cosa succede ora?
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#05668D] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verifica della richiesta</h3>
                <p className="text-gray-600">Il nostro team esaminerà le tue esigenze per prepararsi al meglio.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#05668D] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contatto telefonico</h3>
                <p className="text-gray-600">Ti chiameremo entro 24 ore per fissare l&apos;appuntamento per il sopralluogo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#05668D] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sopralluogo gratuito</h3>
                <p className="text-gray-600">Un nostro esperto verrà sul posto per valutare la situazione e proporti la soluzione migliore.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-[#05668D] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Preventivo dettagliato</h3>
                <p className="text-gray-600">Riceverai un preventivo chiaro e completo entro 48 ore dal sopralluogo.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          variants={fadeInUp}
          className="bg-gradient-to-r from-[#05668D] to-[#0466C8] rounded-xl p-6 text-white mb-8"
        >
          <h3 className="text-xl font-semibold mb-3 text-center">
            Hai bisogno di contattarci subito?
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="tel:+393338479696"
              className="flex items-center gap-2 bg-white text-[#05668D] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full md:w-auto justify-center"
            >
              <PhoneIcon className="w-5 h-5" />
              <span>333 847 9696</span>
            </a>
            <a
              href="https://wa.me/393338479696"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#20BD5A] transition-colors w-full md:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* Back to Home Button */}
        <motion.div
          variants={fadeInUp}
          className="flex justify-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 text-[#05668D] font-semibold hover:text-[#0466C8] transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Torna alla Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
