import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, FileText, Send, Calendar, ArrowRight, Instagram, Link2, Mail, Check } from 'lucide-react';
import { sendLeadToFunnel } from '../lib/funnelWebhook';

interface ApplyNowViewProps {
  selectedPlan: string;
}

export default function ApplyNowView({ selectedPlan }: ApplyNowViewProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    rangoVocal: 'no-se',
    experiencia: 'principiante',
    meta: '',
    planSeleccionado: selectedPlan || 'Paquete 3 Meses ($250/10 sesiones)',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!formData.whatsapp.trim()) newErrors.whatsapp = 'El número de WhatsApp es requerido';
    if (!formData.meta.trim()) newErrors.meta = 'Por favor dinos cuál es tu meta principal';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save application to localStorage for persistence
      const currentApplications = JSON.parse(localStorage.getItem('applications') || '[]');
      currentApplications.push({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('applications', JSON.stringify(currentApplications));

      sendLeadToFunnel({
        form_type: 'apply',
        source: 'apply',
        nombre: formData.nombre,
        telefono: formData.whatsapp,
        email: formData.email,
        detalle: `Plan: ${formData.planSeleccionado} | Rango vocal: ${formData.rangoVocal} | Experiencia: ${formData.experiencia} | Meta: ${formData.meta}`,
      });

      window.fbq?.('track', 'CompleteRegistration');

      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-surface pt-28 pb-20 md:pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Block */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Admisión Exclusiva
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-primary mb-6 uppercase tracking-tight"
          >
            Tu camino a la maestría comienza aquí
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-base text-on-surface-variant leading-relaxed"
          >
            Para asegurar un alto rendimiento y atención verdaderamente personalizada, el ingreso al programa de entrenamiento es por selección. Completa el breve cuestionario a continuación y agendaremos tu entrevista calificatoria de 15 minutos.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form and Info Section */}
          <div className="lg:col-span-12">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-surface-container-lowest border border-surface-variant rounded-2xl vocal-shadow overflow-hidden grid grid-cols-1 md:grid-cols-12"
                >
                  {/* Left panel - quick links */}
                  <div className="md:col-span-5 bg-primary text-white p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-bold mb-4 block">
                        Instrucciones
                      </span>
                      <h3 className="font-display text-2xl font-bold mb-6 text-white leading-tight">
                        Cuestionario de Postulación
                      </h3>
                      
                      <div className="space-y-6 text-sm font-serif">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0 mt-0.5">
                            <span className="text-[11px] font-sans font-bold">1</span>
                          </div>
                          <p className="text-primary-fixed-dim">
                            Completa los detalles de tu voz, metas y experiencia vocal.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0 mt-0.5">
                            <span className="text-[11px] font-sans font-bold">2</span>
                          </div>
                          <p className="text-primary-fixed-dim">
                            Mireille revisará personalmente tu perfil técnico.
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 bg-secondary/20 rounded-full flex items-center justify-center text-secondary shrink-0 mt-0.5">
                            <span className="text-[11px] font-sans font-bold">3</span>
                          </div>
                          <p className="text-primary-fixed-dim">
                            Te contactaremos en 24h para programar tu sesión gratuita de 15 min.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-sans text-secondary font-bold tracking-widest uppercase">
                        <FileText size={14} />
                        <span>Tiempo estimado: 5 minutos</span>
                      </div>
                      <a
                        href="https://forms.gle/rDJEutrADTURUQpj7"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md group"
                      >
                        Ir al Formulario Externo
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>

                  {/* Right panel - actual interactive form */}
                  <form onSubmit={handleSubmit} className="md:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-display text-xl font-bold text-primary">
                          Formulario de contacto
                        </h4>
                        <p className="font-serif text-sm text-on-surface-variant mt-1.5 pb-4 border-b border-surface-variant">
                          Si necesitas cualquier tipo de información escríbenos.
                        </p>
                      </div>

                      {/* Name input */}
                      <div className="flex flex-col gap-1.5 items-start">
                        <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                          Nombre Completo *
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

                      {/* Email and WhatsApp in Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                            Correo Electrónico *
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors ${
                              errors.email ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                            }`}
                            placeholder="tu@correo.com"
                          />
                          {errors.email && (
                            <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                              <AlertCircle size={10} /> {errors.email}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5 items-start">
                          <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                            WhatsApp *
                          </label>
                          <input
                            type="tel"
                            value={formData.whatsapp}
                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                            className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors ${
                              errors.whatsapp ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                            }`}
                            placeholder="+503 7000 0000"
                          />
                          {errors.whatsapp && (
                            <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                              <AlertCircle size={10} /> {errors.whatsapp}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Vocal selection options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                            Rango o Registro Vocal
                          </label>
                          <select
                            value={formData.rangoVocal}
                            onChange={(e) => setFormData({ ...formData, rangoVocal: e.target.value })}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                          >
                            <option value="no-se">No lo sé aún / Por definir</option>
                            <option value="soprano-tenor">Soprano / Tenor</option>
                            <option value="mezzosoprano-baritono">Mezzosoprano / Barítono</option>
                            <option value="contralto-bajo">Contralto / Bajo</option>
                          </select>
                        </div>

                        <div className="flex flex-col gap-1.5 items-start">
                          <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                            Nivel de Experiencia
                          </label>
                          <select
                            value={formData.experiencia}
                            onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                            className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                          >
                            <option value="principiante">Principiante (Canto en ducha/amateur)</option>
                            <option value="intermedio">Intermedio (Conozco bases técnicas)</option>
                            <option value="avanzado">Profesional / Cantante Activo</option>
                          </select>
                        </div>
                      </div>

                      {/* Selected plan selection override */}
                      <div className="flex flex-col gap-1.5 items-start">
                        <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                          Programa de Interés
                        </label>
                        <select
                          value={formData.planSeleccionado}
                          onChange={(e) => setFormData({ ...formData, planSeleccionado: e.target.value })}
                          className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors cursor-pointer"
                        >
                          <option value="Paquete 3 Meses ($250/10 sesiones)">Paquete 3 Meses ($250 / 10 sesiones)</option>
                          <option value="Sesión Individual ($30/hora)">Sesión Individual ($30 / hora)</option>
                        </select>
                      </div>

                      {/* Goals input */}
                      <div className="flex flex-col gap-1.5 items-start">
                        <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                          ¿Cuál es tu principal meta con tu voz? *
                        </label>
                        <textarea
                          rows={3}
                          value={formData.meta}
                          onChange={(e) => setFormData({ ...formData, meta: e.target.value })}
                          className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors resize-none ${
                            errors.meta ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                          }`}
                          placeholder="Ej: Quiero ampliar mi rango vocal, cantar sin fatiga y tener mayor proyección."
                        />
                        {errors.meta && (
                          <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                            <AlertCircle size={10} /> {errors.meta}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-8 bg-primary hover:bg-primary/95 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <span>Enviar Mi Aplicación Directa</span>
                      <Send size={12} />
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-surface-container-lowest border border-surface-variant p-8 md:p-16 rounded-2xl vocal-shadow text-center flex flex-col items-center max-w-2xl mx-auto"
                >
                  <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-8">
                    <CheckCircle size={36} className="stroke-[2px]" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-primary mb-4 uppercase tracking-tight">
                    ¡Aplicación Recibida con éxito!
                  </h3>
                  <p className="font-serif text-on-surface-variant text-base leading-relaxed mb-8">
                    Gracias <strong className="text-primary font-bold">{formData.nombre}</strong> por postularte al Vocal Studio de Mireille Hoffmann. Hemos registrado tus detalles técnicos y de contacto. Mireille revisará tu caso personalmente y nos pondremos en contacto contigo vía WhatsApp al <strong className="text-primary font-bold">{formData.whatsapp}</strong> dentro de las próximas 24 horas hábiles.
                  </p>

                  <div className="w-full bg-surface-container-low border border-surface-variant rounded-xl p-6 mb-10 text-left">
                    <h5 className="font-sans text-[10px] uppercase tracking-widest font-bold text-secondary mb-3">
                      Resumen de Admisión:
                    </h5>
                    <div className="grid grid-cols-2 gap-y-2 text-sm font-serif">
                      <span className="text-on-surface-variant">Programa:</span>
                      <span className="font-bold text-primary text-right">{formData.planSeleccionado}</span>

                      <span className="text-on-surface-variant">Registro Vocal:</span>
                      <span className="font-bold text-primary text-right uppercase">{formData.rangoVocal}</span>

                      <span className="text-on-surface-variant">Experiencia:</span>
                      <span className="font-bold text-primary text-right capitalize">{formData.experiencia}</span>
                    </div>
                  </div>

                  <div className="w-full bg-surface-container-low border border-surface-variant rounded-xl p-6 mb-10 text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar size={16} className="text-secondary" />
                      <h5 className="font-sans text-[10px] uppercase tracking-widest font-bold text-secondary">
                        Taller Grupal Gratuito
                      </h5>
                    </div>
                    <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-4">
                      Mientras revisamos tu aplicación, te invitamos a nuestro taller grupal gratuito de técnica vocal — todos los <strong className="text-primary font-bold">miércoles a las 7:00 pm (hora El Salvador)</strong>, 45 minutos por Google Meet.
                    </p>
                    <a
                      href="https://meet.google.com/wjt-cguv-niu"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-secondary hover:bg-secondary/90 text-white font-sans text-xs uppercase tracking-widest font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 shadow-md"
                    >
                      Unirme al taller
                      <ArrowRight size={14} />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="flex-1 py-4 border border-outline-variant hover:bg-surface-container text-on-surface-variant font-sans text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                    >
                      Enviar otra postulación
                    </button>
                    <a
                      href="https://wa.me/50366801471?text=Hola%20Mireille,%20he%20completado%20mi%20formulario%20de%20postulación%20en%20el%20sitio%20web"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-4 bg-secondary hover:bg-secondary/90 text-white font-sans text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>Hablar por WhatsApp</span>
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer info blocks */}
        <div className="mt-20 pt-12 border-t border-surface-variant grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <Instagram size={18} />
            </div>
            <div className="text-left">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-1">
                Instagram
              </span>
              <a
                href="https://www.instagram.com/mireille_hoffmann?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="font-serif text-sm font-semibold text-primary hover:text-secondary hover:underline transition-colors"
              >
                @mireille_hoffmann
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <Link2 size={18} />
            </div>
            <div className="text-left">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-1">
                Linktree
              </span>
              <a
                href="https://linktr.ee/meihoff?utm_source=linktree_profile_share&ltsid=e5157d2c-1d33-4078-8292-19cbd2a5997d"
                target="_blank"
                rel="noreferrer"
                className="font-serif text-sm font-semibold text-primary hover:text-secondary hover:underline transition-colors"
              >
                @meihoff
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <Mail size={18} />
            </div>
            <div className="text-left">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-on-surface-variant block mb-1">
                Email directo
              </span>
              <a
                href="mailto:hoffmannmireille88@gmail.com"
                className="font-serif text-sm font-semibold text-primary hover:text-secondary hover:underline transition-colors"
              >
                hoffmannmireille88@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
