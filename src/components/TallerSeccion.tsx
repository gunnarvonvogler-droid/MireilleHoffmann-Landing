import React from 'react';
import { CalendarDays, Clock, Video } from 'lucide-react';
import TallerSignup from './TallerSignup';

interface TallerSeccionProps {
  /**
   * `true` cuando es la página propia del taller (#taller-gratis), el link que se
   * reparte en redes y mensajes desde el 24/09. Ocupa la pantalla entera y el título
   * pasa a ser el h1; en la home es una franja más, con su h2.
   */
  pagina?: boolean;
}

/**
 * Taller semanal gratuito: la franja oscura de la home y, la misma, la página
 * `#taller-gratis`. Un solo componente para que las dos digan siempre lo mismo.
 * La inscripción va por el webhook del sitio (`Taller - Inscripción Pública (Sitio)`).
 */
export default function TallerSeccion({ pagina = false }: TallerSeccionProps) {
  const Titulo = pagina ? 'h1' : 'h2';
  return (
    <section
      id={pagina ? undefined : 'taller'}
      className={`bg-primary text-white w-full ${
        pagina ? 'min-h-[calc(100vh-5rem)] py-16 md:py-24 flex items-center' : 'py-20 md:py-28'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center">
        <span className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          Gratis · Todos los miércoles
        </span>

        <Titulo className="font-display text-4xl md:text-5xl font-bold mb-6">
          Taller de técnica vocal en vivo
        </Titulo>

        <p className="font-serif text-lg text-white/80 max-w-2xl leading-relaxed mb-10">
          Ejercicios prácticos conmigo, en directo. No es una charla para escuchar: trabajas tu propia voz y sientes la diferencia en el momento. Al final dejo tiempo para tus preguntas.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-10 mb-10 font-sans text-[11px] uppercase tracking-widest font-bold text-white/70">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="text-secondary" />
            Miércoles 19:00 (El Salvador)
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} className="text-secondary" />
            45 minutos
          </span>
          <span className="flex items-center gap-2">
            <Video size={14} className="text-secondary" />
            Por Google Meet
          </span>
        </div>

        <TallerSignup variante="oscuro" ctaLabel={pagina ? 'Quiero mi lugar' : undefined} />
      </div>
    </section>
  );
}
