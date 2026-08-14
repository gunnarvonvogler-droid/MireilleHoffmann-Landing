import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { TALLER_WEBHOOK_URL } from '../lib/taller';

type Estado = 'idle' | 'enviando' | 'listo' | 'ya-anotado' | 'error';

interface TallerSignupProps {
  /** 'oscuro' = sobre la franja bg-primary de la home. 'claro' = dentro de una tarjeta. */
  variante: 'oscuro' | 'claro';
  ctaLabel?: string;
}

interface Respuesta {
  ok?: boolean;
  estado?: string;
  fecha?: string;
  email?: string;
}

/**
 * Inscripción al taller sin salir del sitio.
 *
 * A diferencia de `sendLeadToFunnel`, acá NO se usa keepalive/sendBeacon: aquel
 * dispara y navega en el mismo tick, así que la petición tiene que sobrevivir al
 * cambio de pantalla. Este se queda en la página esperando la respuesta para poder
 * decir "listo" o "ya estabas anotada", así que un fetch normal es lo correcto.
 */
export default function TallerSignup({ variante, ctaLabel = 'Reservar mi lugar' }: TallerSignupProps) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [fecha, setFecha] = useState('');
  const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});

  const oscuro = variante === 'oscuro';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (estado === 'enviando') return;

    const err: { nombre?: string; email?: string } = {};
    if (!nombre.trim()) err.nombre = 'Necesitamos tu nombre';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) err.email = 'Escribí un correo válido';
    setErrores(err);
    if (Object.keys(err).length > 0) return;

    setEstado('enviando');
    try {
      const res = await fetch(TALLER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre.trim(), email: email.trim(), origen: 'sitio' }),
      });
      const data: Respuesta = await res.json();
      if (data.estado === 'listo' || data.estado === 'ya-anotado') {
        setFecha(data.fecha || '');
        setEstado(data.estado);
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  if (estado === 'listo' || estado === 'ya-anotado') {
    return (
      <div
        className={`w-full max-w-xl rounded-2xl px-6 py-8 flex flex-col items-center text-center gap-3 ${
          oscuro ? 'bg-white/5 border border-white/15' : 'bg-surface-container border border-outline-variant/30'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            oscuro ? 'bg-secondary/20 text-secondary' : 'bg-secondary/10 text-secondary'
          }`}
        >
          <CheckCircle size={26} className="stroke-[2px]" />
        </div>
        <p className={`font-display text-xl font-bold ${oscuro ? 'text-white' : 'text-primary'}`}>
          {estado === 'listo' ? '¡Listo, tenés tu lugar!' : 'Ya tenías tu lugar'}
        </p>
        <p className={`font-serif text-sm leading-relaxed ${oscuro ? 'text-white/75' : 'text-on-surface-variant'}`}>
          {estado === 'listo'
            ? `Te acabamos de mandar el correo con el enlace del Meet. Nos vemos el ${fecha} a las 19:00, hora de El Salvador.`
            : `Ya estabas anotada/o para el ${fecha} a las 19:00. Buscá en tu correo la confirmación con el enlace.`}{' '}
          Si no lo ves en unos minutos, revisá la carpeta de spam.
        </p>
      </div>
    );
  }

  const claseInput = oscuro
    ? 'w-full bg-white/10 border rounded-xl px-4 py-3 font-serif text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-secondary transition-colors'
    : 'w-full bg-surface border rounded-xl px-4 py-3 font-serif text-sm focus:outline-none focus:border-secondary transition-colors';
  const bordeNormal = oscuro ? 'border-white/25' : 'border-outline-variant';
  const claseLabel = `font-sans text-[11px] uppercase tracking-wider font-bold ${
    oscuro ? 'text-white/70' : 'text-on-surface-variant'
  }`;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col gap-4 text-left">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-1.5 flex-1">
          <label className={claseLabel} htmlFor="taller-nombre">
            Tu nombre *
          </label>
          <input
            id="taller-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={`${claseInput} ${errores.nombre ? 'border-red-400 focus:border-red-400' : bordeNormal}`}
            placeholder="Tu nombre"
          />
          {errores.nombre && (
            <span className="text-[10px] text-red-400 font-sans flex items-center gap-1">
              <AlertCircle size={10} /> {errores.nombre}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label className={claseLabel} htmlFor="taller-email">
            Tu correo *
          </label>
          <input
            id="taller-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${claseInput} ${errores.email ? 'border-red-400 focus:border-red-400' : bordeNormal}`}
            placeholder="tu@correo.com"
          />
          {errores.email && (
            <span className="text-[10px] text-red-400 font-sans flex items-center gap-1">
              <AlertCircle size={10} /> {errores.email}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="w-full bg-secondary hover:bg-secondary/90 disabled:opacity-70 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md"
      >
        <span>{estado === 'enviando' ? 'Guardando tu lugar…' : ctaLabel}</span>
        {estado === 'enviando' ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
      </button>

      {estado === 'error' && (
        <p className="font-serif text-sm text-red-400 text-center leading-relaxed">
          No pudimos guardar tu lugar. Probá de nuevo en un momento, o escribinos por WhatsApp al +503 6680 1471 y te
          anotamos a mano.
        </p>
      )}

      <p
        className={`font-serif text-[11px] leading-relaxed text-center ${
          oscuro ? 'text-white/50' : 'text-on-surface-variant'
        }`}
      >
        Te llega la confirmación con el enlace del Meet a tu correo. Al enviar aceptás nuestra{' '}
        <a href="#privacidad" className="underline underline-offset-2 hover:text-secondary transition-colors">
          política de privacidad
        </a>
        .
      </p>
    </form>
  );
}
