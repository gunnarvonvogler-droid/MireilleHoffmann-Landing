import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Star, ChevronDown, Award, Sparkles, Brain, ArrowUpRight, HelpCircle, Music } from 'lucide-react';
import { ScreenType } from '../types';

interface HomeViewProps {
  setScreen: (screen: ScreenType) => void;
  onSelectPlan: (planName: string) => void;
}

export default function HomeView({ setScreen, onSelectPlan }: HomeViewProps) {
  // Accordion active states
  const [activeModule, setActiveModule] = useState<string | null>('01');
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setActiveModule(activeModule === id ? null : id);
  };

  const togglePolicy = (id: string) => {
    setActivePolicy(activePolicy === id ? null : id);
  };

  const handleSelectPlan = (planName: string) => {
    onSelectPlan(planName);
    setScreen('apply');
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 overflow-hidden bg-surface w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              Ciencia + Arte + Cuerpo
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-primary text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight leading-[1.05] mb-6"
            >
              Aprende a Dominar tu Voz
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-secondary font-display text-lg sm:text-xl md:text-2xl font-semibold uppercase tracking-wide leading-relaxed mb-6"
            >
              Transforma tu voz en 3 meses: el camino hacia la maestría vocal
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-on-surface-variant font-serif text-base sm:text-lg max-w-2xl leading-relaxed mb-10"
            >
              A través de mis formaciones en las artes escénicas, el yoga y mi especialización en la técnica vocal, descubre como liberar tu potencial vocal con el equilibrio perfecto entre técnica rigurosa y bienestar integral.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => {
                  document.getElementById('metodologia')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-primary text-primary px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-surface-container transition-all text-center cursor-pointer"
              >
                Explorar Metodología
              </button>
              <button
                onClick={() => setScreen('apply')}
                style={{ width: '357.046875px' }}
                className="bg-secondary text-white px-8 py-4 rounded-xl font-sans text-xs font-bold uppercase tracking-widest hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl text-center cursor-pointer"
              >
                Agenda tu entrevista calificadora de 15 minutos
              </button>
            </motion.div>
          </div>

          {/* Hero Portrait */}
          <div className="lg:col-span-5 hidden lg:flex items-center justify-center relative">
            <div className="relative w-full aspect-[4/5] max-w-md">
              <div className="absolute -inset-4 bg-secondary/5 rounded-xl blur-2xl"></div>
              <div className="absolute inset-0 border border-outline-variant/20 rounded-xl transform translate-x-3 translate-y-3"></div>
              <div
                className="relative w-full h-full bg-cover bg-center rounded-xl vocal-shadow grayscale hover:grayscale-0 transition-all duration-700 border border-surface-variant"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBMubPc7jM_f632jKvDW_fw6__sxjvI4lS2b73eLZpSA0jhJ33mgFWia-6YfrzJM2l_POydMl8m1C62Emenoz3JLYojmSwkGGnX5ENrpTk9joKAPs8Cs-KiubwDFyw-OWLthxBDRr_WgFPr8-Tz9TIwY3k9LfGSi0mscVx7PyzD8xn7o2pQjcURX_f4guyiNOJxfBLkOE2cGB2edzB_ik_Q9bYdvlMRECVW19uIWcPfztkkifipDr6rpNROTRK8IPMsxs8FeHh69owdmQ")`,
                }}
                referrerPolicy="no-referrer"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="filosofia-bio" className="py-20 md:py-32 bg-surface-container-low w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Bio Portrait left */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] w-full rounded-xl vocal-shadow overflow-hidden border border-surface-variant">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYjt7VSErXYEE0UtwgVP0An7-n5kc-Rg9pp2L0SbuSWZSRm6KeTpp77z1UFr_-bkopGi7dl6K4fBCvtbNyjhwmIKK40tCW50FlLk9BwIzecuvBLGUj9xAw9PtfJsFNPcXGrykTzwDihhPEKOuQxIe1CChKOt28ZgKJrClt5OUh8GJsqcSBRhIoxHop-qwMMBG4hYnlGGNls9AIw9vtgdnzmOV4AepuWiVRtPG6tTHWcQqVGb2hyp9Wl7OgkhV9txptjnYQLHf-JAwglg"
                  alt="Mireille Hoffmann during a session"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 right-4 lg:-right-6 bg-white p-6 md:p-8 rounded-xl vocal-shadow max-w-[260px] border-b-4 border-secondary border-t border-l border-r border-outline-variant/10">
                <p className="font-display text-primary text-5xl md:text-6xl font-bold leading-none mb-1">20+</p>
                <p className="font-sans text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest font-bold leading-relaxed">
                  Años de Trayectoria en Francia y Bolivia
                </p>
              </div>
            </div>

            {/* Bio content right */}
            <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                Mireille Hoffmann
              </h2>
              <div className="w-16 h-1 bg-secondary mb-8"></div>
              
              <p className="font-serif text-lg text-on-surface-variant leading-relaxed mb-8">
                Con más de 20 años de experiencia escénica y una certificación internacional en <strong className="text-primary font-semibold">"Chant Voix & Corps"</strong>, Mireille propone un enfoque multidisciplinario que trasciende lo convencional. Su formación integra las artes escénicas con la disciplina del yoga, creando un puente único entre la fisiología del sonido y la conciencia corporal.
              </p>

              {/* Bio Pillars */}
              <div className="space-y-6 w-full">
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/5 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Award size={20} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-primary mb-1">
                      Certificada Chant Voix & Corps en Paris/Francia
                    </h4>
                    <p className="font-serif text-sm text-on-surface-variant">
                      Pedagogía de la voz integrando cuerpo, movimiento y bienestar.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/5 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Brain size={20} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-primary mb-1">
                      Instructor Certificado de Yoga
                    </h4>
                    <p className="font-serif text-sm text-on-surface-variant">
                      Alineación del cuerpo, control de la respiración y reducción del estrés.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/5 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Sparkles size={20} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-primary mb-1">
                      Enfoque en neurofisiología del aprendizaje sensorimotor
                    </h4>
                    <p className="font-serif text-sm text-on-surface-variant">
                      Cómo reacciona el cerebro para fijar hábitos vocales estables y sin esfuerzo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-primary/5 flex items-center justify-center text-secondary group-hover:bg-secondary/10 transition-colors">
                    <Music size={20} className="stroke-[2px]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-primary mb-1">
                      Metodología inspirada en la CVT de Elena Hurstel
                    </h4>
                    <p className="font-serif text-sm text-on-surface-variant">
                      Complete Vocal Technique orientada a una pedagogía sana, precisa y moderna.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Método 3C Section */}
      <section id="metodologia" className="py-20 md:py-32 bg-surface w-full border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              El Método 3C
            </h2>
            <p className="font-serif text-lg text-on-surface-variant italic">
              Un bucle sensorimotor diseñado para la excelencia vocal a través de tres pilares fundamentales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Pilar 1: Conciencia */}
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-surface-variant vocal-shadow hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-start text-left">
              <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-colors duration-500 text-secondary">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Conciencia
              </h3>
              <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                Experimentación: El primer paso es identificar las sensaciones internas y reconocer el mecanismo fisiológico en acción.
              </p>
              <div className="text-secondary font-sans text-[10px] tracking-[0.2em] uppercase font-bold border-t border-outline-variant/10 pt-4 w-full">
                Etapa: Experimentación
              </div>
            </div>

            {/* Pilar 2: Constancia */}
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-surface-variant vocal-shadow hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-start text-left">
              <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500 text-primary">
                <span className="material-symbols-outlined text-3xl">repeat</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Constancia
              </h3>
              <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                Instalación: A través de la repetición consciente, las nuevas vías neuronales se fortalecen creando una base técnica sólida.
              </p>
              <div className="text-primary font-sans text-[10px] tracking-[0.2em] uppercase font-bold border-t border-outline-variant/10 pt-4 w-full">
                Etapa: Instalación
              </div>
            </div>

            {/* Pilar 3: Confianza */}
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-surface-variant vocal-shadow hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-start text-left">
              <div className="w-14 h-14 bg-surface-container-low rounded-xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-white transition-colors duration-500 text-secondary">
                <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Confianza
              </h3>
              <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow">
                Automatización: La técnica se vuelve instintiva, permitiendo que la expresión artística fluya sin restricciones técnicas.
              </p>
              <div className="text-secondary font-sans text-[10px] tracking-[0.2em] uppercase font-bold border-t border-outline-variant/10 pt-4 w-full">
                Etapa: Automatización
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structure Section */}
      <section id="curso" className="py-20 md:py-32 bg-surface-container-high w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Estructura del Programa
              </h2>
              <p className="font-serif text-lg text-on-surface-variant mb-10 leading-relaxed">
                Un viaje interactivo de 3 meses dividido en módulos especializados que se adaptan a tus necesidades y metas del momento
              </p>

              {/* Accordion List */}
              <div className="space-y-4">
                {/* Module 1 Accordion */}
                <div className="bg-surface-container-lowest rounded-xl border border-surface-variant vocal-shadow overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleModule('01')}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full border border-secondary/20 flex items-center justify-center font-sans font-bold text-secondary text-sm">
                        01
                      </div>
                      <span className="font-display text-lg md:text-xl font-bold text-primary">
                        Fundamentos de la Voz
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        activeModule === '01' ? 'rotate-45' : ''
                      }`}
                    >
                      {activeModule === '01' ? 'close' : 'add'}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeModule === '01'
                        ? 'max-h-96 opacity-100 border-t border-outline-variant/10 px-6 py-6'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="font-serif text-on-surface-variant leading-relaxed mb-6">
                      Dominio de los pilares físicos : Flujo de aire, apoyo muscular, Twang y relajación maxilar.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-surface-container border border-surface-variant px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface font-sans">
                        SOVT Training
                      </span>
                      <span className="bg-surface-container border border-surface-variant px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface font-sans">
                        Yoga Postural
                      </span>
                      <span className="bg-surface-container border border-surface-variant px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-on-surface font-sans">
                        Biofeedback
                      </span>
                    </div>
                  </div>
                </div>

                {/* Module 2 Accordion */}
                <div className="bg-surface-container-lowest rounded-xl border border-surface-variant vocal-shadow overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleModule('02')}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full border border-secondary/20 flex items-center justify-center font-sans font-bold text-secondary text-sm">
                        02
                      </div>
                      <span className="font-display text-lg md:text-xl font-bold text-primary">
                        Las 4 configuraciones de la laringe
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        activeModule === '02' ? 'rotate-45' : ''
                      }`}
                    >
                      {activeModule === '02' ? 'close' : 'add'}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeModule === '02'
                        ? 'max-h-96 opacity-100 border-t border-outline-variant/10 px-6 py-6'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="font-serif text-on-surface-variant leading-relaxed mb-4">
                      Exploración técnica profunda de los modos de emisión vocal según el sistema CVT:
                    </p>
                    <ul className="grid grid-cols-2 gap-3 text-sm font-semibold font-serif text-primary">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Neutral
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Overdrive
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Edge
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> Curbing
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Module 3 Accordion */}
                <div className="bg-surface-container-lowest rounded-xl border border-surface-variant vocal-shadow overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleModule('03')}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 shrink-0 rounded-full border border-secondary/20 flex items-center justify-center font-sans font-bold text-secondary text-sm">
                        03
                      </div>
                      <span className="font-display text-lg md:text-xl font-bold text-primary">
                        Colores del Sonido
                      </span>
                    </div>
                    <span
                      className={`material-symbols-outlined text-primary transition-transform duration-300 ${
                        activeModule === '03' ? 'rotate-45' : ''
                      }`}
                    >
                      {activeModule === '03' ? 'close' : 'add'}
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      activeModule === '03'
                        ? 'max-h-96 opacity-100 border-t border-outline-variant/10 px-6 py-6'
                        : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                  >
                    <p className="font-serif text-on-surface-variant leading-relaxed mb-4">
                      Gestión de espacios de resonancia para seguir esculpiendo la identidad vocal. Ajustes de faringe, boca y nasalidad
                    </p>
                    <div className="p-4 bg-surface-container-low border-l-4 border-secondary rounded-r-xl">
                      <p className="text-sm italic text-primary leading-relaxed font-serif">
                        "La voz es el único instrumento donde el músico y el instrumento son uno solo."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Anatomical illustration */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-secondary/15 animate-[spin_40s_linear_infinite]"></div>
                <div className="absolute inset-8 rounded-full border border-primary/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQlyvvjSoRmEb9xkElXlIhTjwfg4d-n_rIOvzkfJo8l6HecOiDeJBCia0Ai88lttY5vTOTiOZGKtr6L9XToz6FCFW67WbicB4BMoSNPzvsejYFzyNiBgyoy-9jYKkvtXTCbo3mg3SAxy2RlLKhVBY7HJwdmNwGPeJ0bJ3mU0F0PvSiXL__yDMruhkGUJzpye8KWZYMQBmJU9aFF5uKGDb4b__BInSWWd0zSarTOvUczUu99ZVvF8gPB1Ix0iOH2DYlaa1Y344X7pE"
                    alt="Anatomical vocal illustration"
                    className="w-72 h-72 rounded-full object-cover vocal-shadow ring-[12px] ring-white"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Small indicator dots */}
                <div className="absolute top-1/4 right-2 w-4 h-4 bg-secondary rounded-full animate-pulse shadow-lg shadow-secondary/30"></div>
                <div className="absolute bottom-1/3 left-6 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/30" style={{ animationDelay: '1.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-20 md:py-32 bg-surface-container-low w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Lo que dicen mis alumnas y alumnos
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-secondary stroke-none" />
              ))}
            </div>
            <p className="font-serif text-lg text-on-surface-variant max-w-2xl mx-auto italic">
              Calificación de 5/5, basada en experiencias reales de quienes ya trabajaron su voz conmigo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'Yuri Frank',
                quote:
                  'Es una excelente profesional en técnica vocal. Su enseñanza va mucho más allá de aprender a cantar: se enfoca en el verdadero cuidado de la voz, con un seguimiento personalizado semana a semana.',
              },
              {
                name: 'E., alumna en La Paz',
                quote:
                  'Aprendí muchísimo sobre la metodología CVT y mejoré mi técnica. Te impulsa a dar el 110% y a explorar lo que inicialmente desconoces — el resultado es un crecimiento personal y artístico real.',
              },
              {
                name: 'Andrea',
                quote:
                  'Desde el inicio sus ejercicios y explicaciones fueron didácticos, se entendían súper bien y me ayudaron a mejorar muchísimo con el canto. Es súper paciente y siempre está de buen humor.',
              },
              {
                name: 'Kaydian',
                quote:
                  'Aprendí tanto que le guardo un enorme respeto hasta el día de hoy. Cada clase fue un mundo de conocimientos sobre el canto y la magia que rodea al intérprete en los escenarios.',
              },
              {
                name: 'VANE',
                quote:
                  'Mireille es una profesional muy dedicada al momento de enseñar, explica con mucha pasión y mi técnica ha mejorado un montón desde que tomé sus talleres.',
              },
              {
                name: 'Xiomara',
                quote:
                  '¡La recomiendo sin dudarlo! Gracias a sus consejos, experiencia y profesionalismo, aprenderás a desarrollar tu técnica vocal.',
              },
              {
                name: 'Dennis',
                quote:
                  'Su metodología es muy efectiva, las clases son agradables y dinámicas, logré buenos resultados en el tiempo que tomé las clases. Una persona muy amable, profesional y paciente.',
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-surface-container-lowest p-8 rounded-xl border border-surface-variant vocal-shadow flex flex-col items-start text-left"
              >
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-secondary stroke-none" />
                  ))}
                </div>
                <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-6 flex-grow">
                  "{t.quote}"
                </p>
                <p className="font-sans text-xs font-bold uppercase tracking-widest text-primary border-t border-outline-variant/10 pt-4 w-full">
                  {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing/Modalities Section */}
      <section id="precios" className="py-20 md:py-32 bg-surface w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Modalidades de Entrenamiento
            </h2>
            <p className="font-serif text-lg text-on-surface-variant max-w-2xl mx-auto italic">
              Sesiones presenciales en San Salvador o virtuales vía Zoom o Google Meet, diseñadas para tu evolución constante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Modalidad 1: Individual */}
            <div className="bg-surface-container-lowest p-8 lg:p-12 rounded-xl border border-surface-variant vocal-shadow flex flex-col items-center text-center group hover:border-secondary/30 transition-all duration-300">
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-on-surface-variant uppercase mb-6">
                Enfoque Puntual
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-primary mb-8">
                Sesión Individual
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-primary font-serif">$30</span>
                <span className="text-on-surface-variant font-serif text-sm">/ hora</span>
              </div>

              <ul className="space-y-4 mb-10 text-left w-full border-t border-surface-variant pt-8">
                <li className="flex items-center gap-3 text-sm text-on-surface font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Check size={12} className="stroke-[3px]" />
                  </div>
                  <span>Diagnóstico vocal inmediato</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Check size={12} className="stroke-[3px]" />
                  </div>
                  <span>Resolución de dudas técnicas</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-on-surface font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Check size={12} className="stroke-[3px]" />
                  </div>
                  <span>Plan de práctica semanal</span>
                </li>
              </ul>

              <button
                onClick={() => handleSelectPlan('Sesión Individual ($30/hora)')}
                className="w-full py-4 border-2 border-primary text-primary font-sans text-xs font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest cursor-pointer"
              >
                Seleccionar Plan
              </button>
            </div>

            {/* Modalidad 2: Paquete 3 meses (RECOMENDADO) */}
            <div className="bg-primary p-8 lg:p-12 rounded-xl vocal-shadow flex flex-col items-center text-center text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 bg-secondary text-white px-6 py-2 rounded-bl-xl font-sans text-[9px] font-bold tracking-widest uppercase">
                RECOMENDADO
              </div>
              <span className="font-sans text-[10px] tracking-[0.2em] font-bold text-primary-fixed-dim mb-6 uppercase">
                Inmersión Total
              </span>
              <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
                Paquete 3 Meses
              </h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-white font-serif">$250</span>
                <span className="text-primary-fixed-dim font-serif text-sm">/ 10 sesiones</span>
              </div>

              <ul className="space-y-4 mb-10 text-left w-full border-t border-white/10 pt-8">
                <li className="flex items-center gap-3 text-sm text-primary-fixed font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                    <Star size={10} className="fill-white stroke-none" />
                  </div>
                  <span>Seguimiento personalizado 360°</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-fixed font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                    <Star size={10} className="fill-white stroke-none" />
                  </div>
                  <span>Soporte vía WhatsApp</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-fixed font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                    <Star size={10} className="fill-white stroke-none" />
                  </div>
                  <span>Material exclusivo y guías</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-fixed font-serif">
                  <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white shrink-0">
                    <Star size={10} className="fill-white stroke-none" />
                  </div>
                  <span>Flexibilidad San Salvador / Zoom</span>
                </li>
              </ul>

              <button
                onClick={() => handleSelectPlan('Paquete 3 Meses ($250/10 sesiones)')}
                className="w-full py-4 bg-secondary text-white font-sans text-xs font-bold rounded-xl hover:bg-secondary/90 transition-all shadow-lg uppercase tracking-widest cursor-pointer"
              >
                Comenzar Maestría
              </button>
              <p className="mt-6 text-[10px] text-primary-fixed-dim italic">
                * Opción a domicilio por $20 adicionales por sesión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Accordion Section */}
      <section id="politicas" className="py-20 md:py-32 bg-surface-container-low w-full border-t border-b border-outline-variant/10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-12 text-center font-bold">
            Políticas del Estudio
          </h2>

          <div className="space-y-4">
            {/* Política 1 */}
            <div className="border-b border-surface-variant">
              <button
                onClick={() => togglePolicy('puntualidad')}
                className="w-full py-5 flex justify-between items-center text-left group cursor-pointer focus:outline-none"
              >
                <span className="font-serif font-bold text-primary text-lg group-hover:text-secondary transition-colors duration-200">
                  Puntualidad
                </span>
                <ChevronDown
                  size={20}
                  className={`text-secondary transition-transform duration-300 ${
                    activePolicy === 'puntualidad' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activePolicy === 'puntualidad' ? 'max-h-40 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-on-surface-variant text-base leading-relaxed font-serif">
                  Respetamos el tiempo de cada estudiante. Las sesiones inician y terminan exactamente a la hora acordada para garantizar el flujo de la agenda.
                </p>
              </div>
            </div>

            {/* Política 2 */}
            <div className="border-b border-surface-variant">
              <button
                onClick={() => togglePolicy('cancelaciones')}
                className="w-full py-5 flex justify-between items-center text-left group cursor-pointer focus:outline-none"
              >
                <span className="font-serif font-bold text-primary text-lg group-hover:text-secondary transition-colors duration-200">
                  Cancelaciones
                </span>
                <ChevronDown
                  size={20}
                  className={`text-secondary transition-transform duration-300 ${
                    activePolicy === 'cancelaciones' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  activePolicy === 'cancelaciones' ? 'max-h-40 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-on-surface-variant text-base leading-relaxed font-serif">
                  Se requiere un aviso de al menos 24 horas para reprogramar una sesión. De lo contrario, la sesión se considerará realizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA Section */}
      <footer className="bg-primary text-white py-20 w-full relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-16 pb-16 border-b border-white/10">
            <div className="max-w-md text-left">
              <h2 className="font-display text-3xl font-bold mb-6 text-white">
                Mireille Hoffmann
              </h2>
              <p className="text-primary-fixed-dim text-base leading-relaxed font-serif mb-8">
                Elevando voces a través de la ciencia y la conciencia corporal para una expresión artística sin límites.
              </p>
              <div className="flex flex-col gap-2 font-sans text-sm text-secondary font-bold tracking-wider">
                <span>Tel / WhatsApp:</span>
                <a href="https://wa.me/50366801471" target="_blank" className="text-xl hover:underline">
                  +503 6680 1471
                </a>
              </div>
            </div>

            <div className="text-left lg:text-right flex flex-col items-start lg:items-end">
              <h4 className="font-sans text-xs mb-4 uppercase tracking-[0.2em] text-secondary font-bold">
                ¿Listo para empezar?
              </h4>
              <button
                onClick={() => setScreen('apply')}
                className="bg-secondary text-white px-8 py-4.5 rounded-xl font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-xl group cursor-pointer"
              >
                Agenda tu Entrevista Calificatoria
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                  chat_bubble
                </span>
              </button>
              <p className="mt-4 text-primary-fixed-dim text-xs italic">
                Máximo 10 alumnas y alumnos nuevos por mes, para garantizar atención 1:1 real.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap gap-6 md:gap-8 justify-center text-xs font-sans text-primary-fixed-dim tracking-wider uppercase font-semibold">
              <a href="#" className="hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                Contact Support
              </a>
            </div>
            <div className="text-primary-fixed-dim text-xs opacity-60 font-sans">
              © 2026 Mireille Hoffmann Vocal Studio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
