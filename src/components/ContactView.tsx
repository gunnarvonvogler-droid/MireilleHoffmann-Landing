import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageCircle, Send, CheckCircle2, AlertCircle, Instagram, Link2, Phone } from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = 'Por favor escribe un mensaje';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Persist contact message to localStorage
      const currentMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      currentMessages.push({
        ...formData,
        id: Date.now(),
        date: new Date().toISOString(),
      });
      localStorage.setItem('contact_messages', JSON.stringify(currentMessages));

      setSubmitted(true);
      setFormData({ nombre: '', email: '', mensaje: '' });
    }
  };

  return (
    <div className="w-full bg-surface pt-28 pb-20 md:pb-32 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Contacto Directo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-primary mb-6 uppercase tracking-tight"
          >
            Comienza tu Transformación Vocal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-base text-on-surface-variant leading-relaxed"
          >
            Para consultas directas, coordinar eventos, talleres corporativos o resolver dudas técnicas, escríbeme directamente o hablemos por WhatsApp.
          </motion.p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch max-w-4xl mx-auto">
          {/* WhatsApp / Quick Contact Card */}
          <div className="lg:col-span-5 bg-surface-container-low border border-surface-variant rounded-2xl p-8 md:p-10 vocal-shadow flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-8">
                <MessageCircle size={24} className="stroke-[2px]" />
              </div>
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Chatea conmigo
              </h3>
              <p className="font-serif text-sm text-on-surface-variant leading-relaxed mb-6">
                ¿Prefieres una conversación fluida e inmediata? Escríbeme directamente por WhatsApp para coordinar más rápido.
              </p>
              
              <div className="space-y-4 border-t border-surface-variant pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Phone size={14} />
                  </div>
                  <span className="font-sans text-sm font-bold text-primary">+503 6680 1471</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                    <Mail size={14} />
                  </div>
                  <span className="font-sans text-sm font-bold text-primary">hoffmannmireille88@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="https://wa.me/50366801471?text=Hola%20Mireille,%20me%20gustaría%20saber%20más%20sobre%20tus%20sesiones%20vocales."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-secondary hover:bg-secondary/90 text-white font-sans text-xs font-bold uppercase tracking-widest py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <span>Enviar Mensaje</span>
                <MessageCircle size={14} className="fill-white stroke-none group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Email Form Card */}
          <div className="lg:col-span-7 bg-surface-container-lowest border border-surface-variant rounded-2xl p-8 md:p-10 vocal-shadow flex flex-col justify-between text-left">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 h-full flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <h3 className="font-display text-2xl font-bold text-primary">
                      Escríbeme
                    </h3>
                    
                    <div className="flex flex-col gap-1.5">
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

                    <div className="flex flex-col gap-1.5">
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

                    <div className="flex flex-col gap-1.5">
                      <label className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant">
                        Mensaje *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        className={`w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors resize-none ${
                          errors.mensaje ? 'border-red-400 focus:border-red-400' : 'border-outline-variant'
                        }`}
                        placeholder="Escribe tu mensaje o dudas técnicas..."
                      />
                      {errors.mensaje && (
                        <span className="text-[10px] text-red-500 font-sans flex items-center gap-1 mt-1">
                          <AlertCircle size={10} /> {errors.mensaje}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-primary hover:bg-primary/95 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <span>Enviar Mensaje</span>
                    <Send size={12} />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-center items-center text-center py-12"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={32} className="stroke-[2px]" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-primary mb-3">
                    ¡Mensaje Enviado!
                  </h4>
                  <p className="font-serif text-on-surface-variant text-sm leading-relaxed mb-8 max-w-sm">
                    Tu consulta ha sido enviada con éxito. Mireille te responderá personalmente por correo o WhatsApp lo antes posible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 border border-outline-variant hover:bg-surface-container text-on-surface-variant font-sans text-xs uppercase tracking-widest font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Studio Info Footnotes */}
        <div className="mt-16 text-center border-t border-surface-variant/40 pt-8 flex flex-col sm:flex-row items-center justify-center gap-8">
          <a
            href="https://www.instagram.com/mireille_hoffmann?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors"
          >
            <Instagram size={16} />
            <span>@mireille_hoffmann</span>
          </a>
          <a
            href="https://linktr.ee/meihoff?utm_source=linktree_profile_share&ltsid=e5157d2c-1d33-4078-8292-19cbd2a5997d"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 font-sans text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors"
          >
            <Link2 size={16} />
            <span>Linktree (@meihoff)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
