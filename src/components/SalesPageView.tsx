import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Gift, ShieldCheck, X } from 'lucide-react';

// Pagina de venta de "Tu agudo en 21 dias" ($37). Decidido el 2026-09-12 (opcion A):
// la venta vive en la web, en la misma marca que la guia gratis, y solo el pago sale
// a Hotmart. El texto es el aprobado por Mimi el 10/09, tal cual, con el masculino
// generico del material publicado. Fuente: "Pagina de Venta - Tu Agudo en 21 Dias" en el vault.
const CHECKOUT_URL = 'https://pay.hotmart.com/L107563626F';

const PREGUNTAS = [
  '¿Cómo hago para cantar los agudos?',
  'Me arde la garganta al intentar alcanzar notas altas, ¿qué puedo hacer?',
  '¿Cómo puedo sonar con más potencia sin lastimarme?',
  '¿Cómo hago para usar el diafragma?',
  'Me quedo sin aire al cantar.',
];

const SEMANAS = [
  {
    nombre: 'Semana 1 · Sentir',
    texto: 'Descubrir dónde está la fuerza que estás poniendo. No podés soltar algo que no sabés que estás agarrando.',
  },
  {
    nombre: 'Semana 2 · Liberar',
    texto: 'Sacarle la presión de encima. El mismo agudo, la mitad del esfuerzo.',
  },
  {
    nombre: 'Semana 3 · Ajustar',
    texto: 'Activar los músculos específicos para el apoyo muscular.',
  },
];

const INCLUYE: { titulo: string; texto: string }[] = [
  {
    titulo: 'El programa de 21 días',
    texto: '32 páginas, 2 o 3 ejercicios por día con el porqué de cada uno y espacio para anotar lo que sentiste. No es una lista de tips: es un orden.',
  },
  {
    titulo: 'El cuaderno de práctica',
    texto: '12 páginas para imprimir y escribir encima: los esquemas del cuerpo, tu diario de los 21 días, la hoja de observaciones y el sitio donde armás tu propia rutina.',
  },
  {
    titulo: 'Mi voz haciendo los ejercicios',
    texto: 'Nueve audios míos, en los días donde más ayuda escuchar cómo suena bien hecho, para que no tengas que adivinarlo leyendo.',
  },
  {
    titulo: 'Tres correcciones de tu voz, hechas por mí',
    texto: 'Me mandás un audio por WhatsApp y te contesto yo, con tu voz puesta. Sin agendar nada y sin esperar a ningún día de la semana. Es lo único acá que un PDF no te puede dar.',
  },
  {
    titulo: 'Tu rutina de mantenimiento de 10 minutos',
    texto: 'Armada por vos, para el Día 22 en adelante.',
  },
  {
    titulo: 'Invitación al taller en vivo de los miércoles',
    texto: 'Mientras dure tu programa, si te gusta practicar acompañado. No es obligatorio, y no perdés ninguna corrección si no vas.',
  },
  {
    titulo: 'Acceso para siempre',
    texto: 'Se descarga y es tuyo.',
  },
];

function BotonCompra({ label = 'Empezar mis 21 días — $37', claro = false }: { label?: string; claro?: boolean }) {
  const handleClick = () => {
    window.fbq?.('track', 'InitiateCheckout', { value: 37, currency: 'USD', content_name: 'Tu agudo en 21 días' });
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={CHECKOUT_URL}
        onClick={handleClick}
        className={`w-full sm:w-auto font-sans text-xs uppercase tracking-widest font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md ${
          claro ? 'bg-white text-primary hover:bg-surface' : 'bg-secondary hover:bg-secondary/90 text-white'
        }`}
      >
        <span>{label}</span>
        <ArrowRight size={14} />
      </a>
      <p className={`font-serif text-xs flex items-center gap-1.5 ${claro ? 'text-white/70' : 'text-on-surface-variant'}`}>
        <ShieldCheck size={13} /> Pago seguro con Hotmart · 7 días de garantía
      </p>
    </div>
  );
}

export default function SalesPageView() {
  useEffect(() => {
    window.fbq?.('track', 'ViewContent', { value: 37, currency: 'USD', content_name: 'Tu agudo en 21 días' });
  }, []);

  return (
    <div className="w-full bg-surface">
      {/* Titular y bajada */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full border border-secondary text-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
            >
              Programa de 21 días · Para cantantes
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-[1.05] mb-6"
            >
              Un agudo no tiene que doler. Y no se arregla cantando más fuerte.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-lg text-on-surface-variant leading-relaxed mb-10 max-w-xl mx-auto md:mx-0"
            >
              Tres semanas, quince minutos por día, y tu propia voz corregida por mí. El método completo para llegar arriba sin apretar la garganta.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="md:items-start flex md:block justify-center">
              <div className="md:inline-block">
                <BotonCompra />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-5"
          >
            <img
              src="/programa/mimi-retrato.jpg"
              alt="Mireille Hoffmann, cantante y vocal coach"
              className="w-full max-w-sm mx-auto rounded-2xl vocal-shadow object-cover aspect-[4/5]"
            />
          </motion.div>
        </div>
      </section>

      {/* Bloque 1 — El dolor, en sus palabras */}
      <section className="py-16 md:py-24 px-6 bg-surface-container-low">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif text-lg text-on-surface-variant mb-6">
            Estas son las cinco cosas que más me preguntan mis alumnos, textual:
          </p>
          <ul className="space-y-3 mb-8">
            {PREGUNTAS.map((p) => (
              <li
                key={p}
                className="font-display text-xl md:text-2xl text-primary italic bg-surface-container-lowest border border-surface-variant rounded-xl px-5 py-3"
              >
                «{p}»
              </li>
            ))}
          </ul>
          <p className="font-serif text-lg text-primary font-semibold mb-4">
            Las cinco son la misma pregunta. Y ninguna se contesta con "practicá más".
          </p>
          <p className="font-serif text-lg text-on-surface-variant leading-relaxed">
            Si cada vez que buscás una nota alta sentís que algo se aprieta, que raspa, que tenés que empujar desde la garganta y que después lo pagás,{' '}
            <strong className="text-primary">no es porque tu voz sea limitada</strong>. Es porque estás empujando desde un lugar que no está hecho para empujar.
          </p>
        </div>
      </section>

      {/* Bloque 2 — Qué es esto */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-5">Qué es esto</h2>
            <p className="font-serif text-lg text-on-surface-variant leading-relaxed">
              <strong className="text-primary">Tu agudo en 21 días</strong> es un programa de tres semanas, no una colección de tips. Tiene un orden, y el orden es lo que lo hace funcionar. Es el mismo que uso con cada alumno que entra a mi estudio:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {SEMANAS.map((s) => (
              <div key={s.nombre} className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-7 vocal-shadow">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-secondary mb-3">{s.nombre}</p>
                <p className="font-serif text-base text-on-surface-variant leading-relaxed">{s.texto}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto space-y-4 font-serif text-lg text-on-surface-variant leading-relaxed">
            <p>
              Veintiún días. Diez o quince minutos por día. El programa son 32 páginas, 2 o 3 ejercicios por día con el porqué de cada uno, y viene con un cuaderno aparte de 12 para imprimir y escribir encima.
            </p>
            <p>Y nada de esto te pide cantar más fuerte. Todo te pide lo contrario: hacer menos, mejor repartido.</p>
          </div>
        </div>
      </section>

      {/* Bloque 3 — Lo que lo hace distinto de un curso grabado */}
      <section className="py-16 md:py-24 px-6 bg-primary text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">Lo que lo hace distinto de un curso grabado</h2>
          <div className="space-y-5 font-serif text-lg leading-relaxed text-white/85">
            <p>Esta es la parte que ningún PDF puede darte, y es la razón por la que esto no es solo un PDF.</p>
            <p>
              <strong className="text-white">Tres veces durante el programa me mandás un audio tuyo, y yo lo escucho.</strong> Tu voz, y yo. No un formulario ni una respuesta automática.
            </p>
            <p>
              <strong className="text-white">Y te contesto a vos, en privado, por WhatsApp.</strong> Qué escucho en tu voz, qué corregiría, y con qué ejercicio del programa. No tenés que reservarte una hora ni coincidir con nadie: mandás tu audio cuando te toque, y te respondo yo.
            </p>
            <p>
              Además, todos los miércoles doy un taller en vivo y gratuito, y estás invitado mientras dure tu programa. <strong className="text-white">No hace falta que vengas</strong> —tus tres correcciones te llegan igual—, pero si venís, escuchar cómo corrijo la voz de otra persona enseña muchísimo: casi siempre le pasa lo mismo que a vos.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque 4 — Qué te llevás */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-10 text-center">Qué te llevás</h2>
          <ul className="space-y-4 mb-12">
            {INCLUYE.map((item) => (
              <li key={item.titulo} className="flex gap-4 items-start bg-surface-container-lowest border border-surface-variant rounded-xl p-5">
                <span className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={15} className="stroke-[2.5px]" />
                </span>
                <p className="font-serif text-base text-on-surface-variant leading-relaxed">
                  <strong className="text-primary">{item.titulo}</strong> — {item.texto}
                </p>
              </li>
            ))}
          </ul>

          <div className="bg-surface-container-high border border-outline-variant/40 rounded-2xl p-7 md:p-9">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                <Gift size={17} />
              </span>
              <h3 className="font-display text-2xl font-bold text-primary leading-tight">
                Y te regalo la base, para que no tengas que salir a buscarla
              </h3>
            </div>
            <div className="space-y-4 font-serif text-base text-on-surface-variant leading-relaxed">
              <p>
                <strong className="text-primary">La Guía de 7 días — Fundamentos de la Técnica Vocal, 10 páginas, va incluida sin costo.</strong>
              </p>
              <p>
                Te digo por qué, porque no es un gesto simpático. El programa de 21 días se apoya en tres fundamentos —el flujo de aire, el apoyo del transverso y el twang— y te manda a ellos seis veces. Si no los tenés puestos, los agudos se te van a resistir igual y vas a pensar que el método no sirve. Así que en vez de mandarte a conseguirla por tu cuenta, te la doy adentro.
              </p>
              <p>Y si ya la hiciste porque te llegó por correo, mejor todavía: arrancás con el terreno preparado.</p>
              <p>
                Lo único que ponés vos: una pajita, un vaso de agua, una banda elástica, tu teléfono para grabarte, y una canción tuya con un agudo que hoy no te sale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 5 — Para quién sí y para quién no */}
      <section className="py-16 md:py-24 px-6 bg-surface-container-low">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-7 md:p-8">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-secondary mb-4 flex items-center gap-2">
              <Check size={14} className="stroke-[2.5px]" /> Es para vos si
            </p>
            <p className="font-serif text-base text-on-surface-variant leading-relaxed">
              Cantás — en tu casa, en la iglesia, en un bar, en una banda — y los agudos te cuestan, te arden, o te dejan la garganta raspada al día siguiente.
            </p>
          </div>
          <div className="bg-surface-container-lowest border border-surface-variant rounded-2xl p-7 md:p-8">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-4 flex items-center gap-2">
              <X size={14} className="stroke-[2.5px]" /> No es para vos si
            </p>
            <div className="space-y-4 font-serif text-base text-on-surface-variant leading-relaxed">
              <p>
                Buscás un curso completo de canto desde cero. Esto resuelve un problema y lo resuelve bien; no te enseña a cantar de arriba a abajo. Y no reemplaza la supervisión de un profesor: hay cosas que un PDF no puede darte, como escucharte y verte en vivo, o mostrarte los ejercicios para que los repitas.
              </p>
              <p>
                Querés resultados sin practicar. Son quince minutos por día durante tres semanas. Es poco, pero hay que hacerlo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloque 6 — Quién soy */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">Quién soy</h2>
          <div className="space-y-4 font-serif text-lg text-on-surface-variant leading-relaxed">
            <p>
              Soy Mireille Hoffmann. Como cantante, llevo más de veinte años en escenarios de Francia y Latinoamérica. Paralelamente, soy vocal coach certificada en <em>Chant Voix &amp; Corps</em>, en París.
            </p>
            <p>
              Trabajo con cantantes y con gente que usa la voz para vivir. Lo que vas a encontrar acá no lo saqué de un libro: es lo que hago todas las semanas con mis alumnos, ordenado para que puedas hacerlo solo.
            </p>
          </div>
        </div>
      </section>

      {/* Bloque 7 — El precio */}
      <section className="py-16 md:py-24 px-6 bg-surface-container-high">
        <div className="max-w-xl mx-auto bg-surface-container-lowest border border-surface-variant rounded-2xl vocal-shadow p-8 md:p-12 text-center">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-secondary mb-3">El precio</p>
          <p className="font-display text-6xl font-bold text-primary mb-2">$37</p>
          <p className="font-serif text-base text-on-surface-variant mb-6">pago único</p>
          <p className="font-serif text-base text-on-surface-variant leading-relaxed mb-6">
            Un curso de canto en español no baja de $55, y los que tienen acompañamiento personal andan entre $65 y $244. Este cuesta menos porque hace una sola cosa — pero la hace entera, y con mi corrección adentro.
          </p>
          <p className="font-serif text-base text-on-surface-variant leading-relaxed mb-8">
            <strong className="text-primary">Y no arriesgás nada.</strong> Si lo hacés durante siete días y sentís que no es para vos, me escribís y te devuelvo el dinero. Sin explicaciones y sin mala cara.
          </p>
          <BotonCompra />
        </div>
      </section>

      {/* Bloque 8 — Cierre */}
      <section className="py-16 md:py-24 px-6 bg-primary text-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-serif text-lg leading-relaxed text-white/85 mb-4">
            Al terminar el Día 21 vas a escuchar dos grabaciones tuyas: la del primer día y la del último. Esa es la única prueba que vale, y es tuya.
          </p>
          <p className="font-display text-2xl md:text-3xl font-bold text-white leading-snug mb-10">
            Y si el esfuerzo bajó aunque sea un punto, eso se acumula. Dentro de seis meses sos otro cantante.
          </p>
          <BotonCompra claro />
        </div>
      </section>
    </div>
  );
}
