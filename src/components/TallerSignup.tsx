import React, { useEffect, useState } from 'react';
import { AlertCircle, ArrowRight, CalendarPlus, CheckCircle, Loader2, Video } from 'lucide-react';
import {
  TALLER_WEBHOOK_URL,
  TallerRespuesta,
  googleCalendarUrl,
  icsTaller,
} from '../lib/taller';
import { OptInRecordado } from '../lib/optinMemoria';

type Estado = 'idle' | 'enviando' | 'listo' | 'ya-anotado' | 'error';

interface TallerSignupProps {
  /** 'oscuro' = sobre la franja bg-primary de la home. 'claro' = dentro de una tarjeta. */
  variante: 'oscuro' | 'claro';
  ctaLabel?: string;
  /**
   * Datos que la persona acaba de dejar en el opt-in. Si llegan, se le ofrece un solo
   * clic en vez del formulario. La franja de la home NO los pasa nunca: ahí llega gente
   * que no dejó nada, y ese formulario se queda como está (decisión de Gunnar, 13/08).
   */
  prefill?: OptInRecordado | null;
}

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function TallerSignup({ variante, ctaLabel = 'Reservar mi lugar', prefill = null }: TallerSignupProps) {
  // `unClic` se DERIVA de prefill, no se congela en un useState. El primer render de
  // la thank-you page todavía no leyó el navegador, así que prefill llega en null y un
  // instante después con los datos; un estado inicializado con ese null se quedaba en
  // "formulario" para siempre y la inscripción de un clic no aparecía nunca.
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(prefill?.nombre ?? '');
  const [email, setEmail] = useState(prefill?.email ?? '');
  const unClic = prefill !== null && !editando;

  // Cuando los datos llegan tarde, se cargan en los campos — así el formulario que
  // aparece detrás de "No soy yo" ya viene lleno y solo hay que corregir lo que cambia.
  // Depende de los valores y no del objeto, para no pisar lo que la persona esté escribiendo.
  useEffect(() => {
    if (!prefill) return;
    setNombre(prefill.nombre);
    setEmail(prefill.email);
  }, [prefill?.nombre, prefill?.email]);
  const [estado, setEstado] = useState<Estado>('idle');
  const [sesion, setSesion] = useState<TallerRespuesta>({});
  const [errores, setErrores] = useState<{ nombre?: string; email?: string }>({});

  const oscuro = variante === 'oscuro';

  /**
   * A diferencia de `sendLeadToFunnel`, acá NO se usa keepalive/sendBeacon: aquel
   * dispara y navega en el mismo tick, así que la petición tiene que sobrevivir al
   * cambio de pantalla. Este se queda en la página esperando la respuesta para poder
   * decir "listo" o "ya estabas anotada", así que un fetch normal es lo correcto.
   */
  const inscribir = async (n: string, e: string) => {
    if (estado === 'enviando') return;
    setEstado('enviando');
    try {
      const res = await fetch(TALLER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: n, email: e, origen: 'sitio' }),
      });
      const data: TallerRespuesta = await res.json();
      if (data.estado === 'listo' || data.estado === 'ya-anotado') {
        setSesion(data);
        setEstado(data.estado);
      } else {
        setEstado('error');
      }
    } catch {
      setEstado('error');
    }
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const err: { nombre?: string; email?: string } = {};
    if (!nombre.trim()) err.nombre = 'Necesitamos tu nombre';
    if (!EMAIL_OK.test(email.trim())) err.email = 'Escribí un correo válido';
    setErrores(err);
    if (Object.keys(err).length > 0) return;
    void inscribir(nombre.trim(), email.trim());
  };

  /** Vuelve al formulario con los datos cargados, para corregirlos. */
  const editarDatos = () => {
    setEditando(true);
    setEstado('idle');
    setErrores({});
  };

  // ─── Confirmación ────────────────────────────────────────────────────────────
  if (estado === 'listo' || estado === 'ya-anotado') {
    const gcal = googleCalendarUrl(sesion.inicio, sesion.meet);
    const ics = icsTaller(sesion.inicio, sesion.meet);
    const fecha = sesion.fecha || '';

    const descargarIcs = () => {
      if (!ics) return;
      // Blob + enlace sintético en vez de un `href` fijo: el archivo se arma en el
      // momento y la URL se libera enseguida, sin dejarla viva toda la sesión.
      const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'taller-mireille-hoffmann.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    };

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
            ? `Te acabamos de mandar el correo con el enlace del Meet${fecha ? `. Nos vemos el ${fecha}` : ''} a las 19:00, hora de El Salvador.`
            : `Ya estabas anotada/o${fecha ? ` para el ${fecha}` : ''} a las 19:00. Buscá en tu correo la confirmación con el enlace.`}{' '}
          Si no lo ves en unos minutos, revisá la carpeta de spam.
        </p>

        {/* El correo se pierde entre otros cincuenta; el evento en el calendario no.
            Solo se dibuja si n8n mandó la fecha — sin ella no hay nada que agendar. */}
        {(gcal || ics) && (
          <div className="w-full flex flex-col items-center gap-3 mt-4">
            <p
              className={`font-sans text-[10px] font-bold uppercase tracking-[0.2em] ${
                oscuro ? 'text-white/50' : 'text-on-surface-variant'
              }`}
            >
              Que no se te pase
            </p>
            {gcal && (
              <a
                href={gcal}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white font-sans text-xs uppercase tracking-widest font-bold py-3.5 px-7 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md"
              >
                <CalendarPlus size={14} />
                <span>Agregarlo a mi calendario</span>
              </a>
            )}
            {ics && (
              <button
                type="button"
                onClick={descargarIcs}
                className={`font-sans text-[11px] underline underline-offset-2 transition-colors cursor-pointer ${
                  oscuro ? 'text-white/60 hover:text-secondary' : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                Uso Apple Calendar u Outlook
              </button>
            )}
            {sesion.meet && (
              <a
                href={sesion.meet}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-serif text-xs flex items-center gap-1.5 transition-colors ${
                  oscuro ? 'text-white/50 hover:text-secondary' : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                <Video size={12} /> El enlace del taller, por si lo querés guardar aparte
              </a>
            )}
          </div>
        )}
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
  const claseBoton =
    'w-full bg-secondary hover:bg-secondary/90 disabled:opacity-70 text-white font-sans text-xs uppercase tracking-widest font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md';
  const claseNota = `font-serif text-[11px] leading-relaxed text-center ${
    oscuro ? 'text-white/50' : 'text-on-surface-variant'
  }`;

  const politica = (
    <p className={claseNota}>
      Te llega la confirmación con el enlace del Meet a tu correo. Al enviar aceptás nuestra{' '}
      <a href="#privacidad" className="underline underline-offset-2 hover:text-secondary transition-colors">
        política de privacidad
      </a>
      .
    </p>
  );

  const mensajeError = estado === 'error' && (
    <p className="font-serif text-sm text-red-400 text-center leading-relaxed">
      No pudimos guardar tu lugar. Probá de nuevo en un momento, o escribinos por WhatsApp al +503 6680 1471 y te
      anotamos a mano.
    </p>
  );

  // ─── Un solo clic ────────────────────────────────────────────────────────────
  if (unClic) {
    return (
      <div className="w-full max-w-xl flex flex-col gap-4">
        <button
          type="button"
          onClick={() => void inscribir(nombre.trim(), email.trim())}
          disabled={estado === 'enviando'}
          className={claseBoton}
        >
          <span>{estado === 'enviando' ? 'Guardando tu lugar…' : ctaLabel}</span>
          {estado === 'enviando' ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
        </button>

        {/* Quién queda anotado, a la vista. Es la salvaguarda del caso raro: alguien que
            abre esta página en un teléfono donde otra persona dejó sus datos. */}
        <p className={claseNota}>
          Te anotamos como <strong className={oscuro ? 'text-white/80' : 'text-primary'}>{nombre}</strong> ({email}).{' '}
          <button
            type="button"
            onClick={editarDatos}
            className="underline underline-offset-2 hover:text-secondary transition-colors cursor-pointer"
          >
            No soy yo
          </button>
        </p>

        {mensajeError}
        {politica}
      </div>
    );
  }

  // ─── Formulario completo ─────────────────────────────────────────────────────
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

      <button type="submit" disabled={estado === 'enviando'} className={claseBoton}>
        <span>{estado === 'enviando' ? 'Guardando tu lugar…' : ctaLabel}</span>
        {estado === 'enviando' ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
      </button>

      {mensajeError}
      {politica}
    </form>
  );
}
