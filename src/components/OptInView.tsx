import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Audience, ScreenType } from '../types';

interface OptInViewProps {
  audience: Audience;
  setScreen: (screen: ScreenType) => void;
}

interface AudienceCopy {
  eyebrow: string;
  headline: string;
  subheadline: string;
  leadMagnetTitle: string;
  steps: string[];
  ctaLabel: string;
  thanksScreen: ScreenType;
}

const COPY: Record<Audience, AudienceCopy> = {
  cantantes: {
    eyebrow: 'Para cantantes',
    headline: 'Cómo dejar tu voz lista en 3 minutos antes de subir al escenario',
    subheadline:
      'Una boda, un evento en la iglesia, un karaoke serio — donde sea que te toque cantar hoy. Descarga la rutina que uso con mis alumnos.',
    leadMagnetTitle: 'Los 3 minutos antes de cantar',
    steps: ['Despertar el apoyo', 'Limpiar el ataque', 'Encontrar el brillo'],
    ctaLabel: 'Quiero mi guía gratis',
    thanksScreen: 'gracias-cantantes',
  },
  oradores: {
    eyebrow: 'Para oradores, docentes y conferencistas',
    headline: 'Cómo terminar el día sin quedarte sin voz, en 3 pasos simples',
    subheadline:
      'Clases, charlas, presentaciones largas — cualquiera que hable muchas horas seguidas conoce ese cansancio. Esta rutina protege tu voz durante todo el día.',
    leadMagnetTitle: 'Cómo terminar el día sin quedarte sin voz',
    steps: ['Apoyo eficiente', 'Cero fugas de aire', 'Proyección sin forzar'],
    ctaLabel: 'Quiero mi guía gratis',
    thanksScreen: 'gracias-oradores',
  },
};

export default function OptInView({ audience, setScreen }: OptInViewProps) {
  const copy = COPY[audience];
  const [formData, setFormData] = useState({ nombre: '', whatsapp: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'Tu nombre es requerido';
    if (!formData.whatsapp.trim() && !formData.email.trim()) {
      newErrors.contacto = 'Déjanos tu WhatsApp o tu correo — al menos uno de los dos';
    }
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const current = JSON.parse(localStorage.getItem('optins') || '[]');
    current.push({
      ...formData,
      audience,
      id: Date.now(),
      date: new Date().toISOString(),
    });
    localStorage.setItem('optins', JSON.stringify(current));
    localStorage.setItem('lastOptInName', formData.nombre);

    setScreen(copy.thanksScreen);
  };

  return (
    <div className="w-full bg-surface pt-28 pb-20 md:pb-32 px-6 min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            {copy.eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-primary leading-tight mb-6"
          >
            {copy.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto"
          >
            {copy.subheadline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-lowest border border-surface-variant rounded-2xl vocal-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12"
        >
          {/* Left: what they get */}
          <div className="md:col-span-5 bg-primary text-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-5">
                <Sparkles size={18} />
              </div>
              <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-2 block">
                Guía gratuita
              </span>
              <h3 className="font-display text-xl font-bold mb-4 text-white leading-tight">
                {copy.leadMagnetTitle}
              </h3>
              <ul className="space-y-3 text-sm font-serif text-primary-fixed-dim">
                {copy.steps.map((step, i) => (
                  <li key={step} className="flex gap-3 items-start">
                    <span className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0 mt-0.5 font-sans text-[11px] font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-serif text-xs text-primary-fixed-dim mt-8 pt-6 border-t border-white/10">
              Por Mireille Hoffmann, certificada en Chant Voix & Corps (París), con más de 20 años de trayectoria escénica en Francia y Bolivia.
            </p>
          </div>

          {/* Right: minimal form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 p-8 md:p-10 flex flex-col justify-center gap-5">
            <div className="flex flex-col gap-1.5 items-start">
              <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                Nombre *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors ${
                  errors.nombre ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                }`}
                placeholder="Tu nombre"
              />
              {errors.nombre && (
                <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                  <AlertCircle size={10} /> {errors.nombre}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5 items-start">
              <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                WhatsApp
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors ${
                  errors.contacto ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                }`}
                placeholder="+503 7000 0000"
              />
            </div>

            <div className="flex flex-col gap-1.5 items-start">
              <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                Correo electrónico
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors ${
                  errors.contacto || errors.email ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                }`}
                placeholder="tu@correo.com"
              />
              {errors.email && (
                <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                  <AlertCircle size={10} /> {errors.email}
                </span>
              )}
              {errors.contacto && (
                <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                  <AlertCircle size={10} /> {errors.contacto}
                </span>
              )}
              <span className="text-[11px] text-on-surface-variant font-serif mt-0.5">
                Déjanos al menos uno de los dos — ahí te enviamos la guía y tu acompañamiento de 7 días.
              </span>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-secondary hover:bg-secondary/90 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md"
            >
              <span>{copy.ctaLabel}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
