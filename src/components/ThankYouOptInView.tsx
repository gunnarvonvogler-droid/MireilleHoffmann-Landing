import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Download } from 'lucide-react';
import { Audience } from '../types';

interface ThankYouOptInViewProps {
  audience: Audience;
}

interface AudienceCopy {
  pdfFile: string;
  pdfLabel: string;
}

const COPY: Record<Audience, AudienceCopy> = {
  cantantes: {
    pdfFile: '/lead-magnets/Rutina_Antes_de_Cantar.pdf',
    pdfLabel: 'Los 3 minutos antes de cantar',
  },
  oradores: {
    pdfFile: '/lead-magnets/Rutina_Anti_Fatiga_Vocal_Oradores.pdf',
    pdfLabel: 'Cómo terminar el día sin quedarte sin voz',
  },
};

export default function ThankYouOptInView({ audience }: ThankYouOptInViewProps) {
  const copy = COPY[audience];
  const [name, setName] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('lastOptInName') || '');
  }, []);

  return (
    <div className="w-full bg-surface pt-28 pb-20 md:pb-32 px-6 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-surface-container-lowest border border-surface-variant p-8 md:p-14 rounded-2xl vocal-shadow text-center flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-8">
            <CheckCircle size={36} className="stroke-[2px]" />
          </div>

          <h1 className="font-display text-3xl font-bold text-primary mb-4 leading-tight">
            {name ? `Gracias, ${name} 🎶` : 'Gracias 🎶'}
          </h1>

          <p className="font-serif text-on-surface-variant text-base leading-relaxed mb-8 max-w-md">
            Tu guía <strong className="text-primary font-bold">"{copy.pdfLabel}"</strong> ya está lista. Descárgala ahora mismo.
          </p>

          <a
            href={copy.pdfFile}
            download
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md mb-6"
          >
            <Download size={14} />
            <span>Descargar mi guía en PDF</span>
          </a>

          {/* Announcement only — no download button, delivered day by day over email */}
          <p className="font-serif text-sm text-on-surface-variant leading-relaxed max-w-md">
            Además, en los próximos días te voy a acompañar con mi{' '}
            <strong className="text-primary font-semibold">Guía completa de 7 días: Fundamentos de la Técnica Vocal</strong>{' '}
            — directo a tu correo, un ejercicio nuevo cada día. Al final de la semana tengo algo especial para vos.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
