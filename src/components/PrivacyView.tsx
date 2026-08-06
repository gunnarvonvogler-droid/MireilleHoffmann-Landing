import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

const CONTACT_EMAIL = 'hoffmannmireille88@gmail.com';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-xl font-bold text-primary mb-3 leading-tight">{title}</h2>
      <div className="font-serif text-base text-on-surface-variant leading-relaxed flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyView() {
  // Se llega acá desde el pie de página o desde el enlace bajo el formulario,
  // los dos abajo de todo: sin esto la página nueva se abre a media altura.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="w-full bg-surface pt-28 pb-20 md:pb-32 px-6">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest border border-surface-variant p-8 md:p-14 rounded-2xl vocal-shadow"
        >
          <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-8">
            <ShieldCheck size={36} className="stroke-[2px]" />
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2 leading-tight">
            Política de privacidad
          </h1>
          <p className="font-sans text-[11px] uppercase tracking-wider font-bold text-on-surface-variant mb-8">
            Última actualización: 6 de agosto de 2026
          </p>

          <p className="font-serif text-base text-on-surface-variant leading-relaxed mb-2">
            Esta página explica qué datos te pedimos, para qué los usamos y cómo pedir que los borremos.
            Está en lenguaje simple a propósito.
          </p>

          <div className="mt-8 pt-8 border-t border-surface-variant">
            <Section title="Quiénes somos">
              <p>
                Mireille Hoffmann Vocal Studio. Para cualquier cosa relacionada con tus datos, escribinos a{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary font-semibold underline underline-offset-2 hover:text-secondary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>

            <Section title="Qué datos recogemos">
              <p>Solo los que nos das vos en un formulario de este sitio:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Nombre y correo electrónico, cuando descargás una guía gratuita.</li>
                <li>
                  WhatsApp, <strong className="text-primary font-semibold">si querés dejarlo — es opcional</strong>.
                </li>
                <li>
                  En los formularios de postulación y de contacto, además lo que escribas sobre tu voz o tu
                  situación.
                </li>
              </ul>
              <p>No pedimos datos de pago en este sitio.</p>
            </Section>

            <Section title="Para qué los usamos">
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Enviarte la guía que pediste.</li>
                <li>Mandarte por correo ejercicios y contenido sobre técnica vocal.</li>
                <li>Escribirte por WhatsApp si dejaste tu número.</li>
                <li>Coordinar una llamada o una clase, si la agendás.</li>
              </ul>
              <p className="text-primary font-semibold">
                No vendemos ni compartimos tus datos con nadie para que te haga publicidad.
              </p>
            </Section>

            <Section title="Por dónde pasan">
              <p>Para que todo esto funcione, tus datos pasan por servicios de terceros:</p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>
                  <strong className="text-primary font-semibold">Vercel</strong> — el alojamiento de este sitio.
                </li>
                <li>
                  <strong className="text-primary font-semibold">n8n y NocoDB</strong>, en un servidor propio — donde
                  se guardan tus datos de contacto.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Resend</strong> — el servicio que envía los correos.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Cal.com</strong> — para agendar llamadas.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Google Calendar</strong> — si te anotás a un taller.
                </li>
                <li>
                  <strong className="text-primary font-semibold">Meta (Facebook e Instagram)</strong> — este sitio
                  tiene el píxel de Meta, que mide qué anuncios funcionan y usa cookies. Meta puede recoger datos de
                  navegación aunque no llenes ningún formulario.
                </li>
              </ul>
            </Section>

            <Section title="Cuánto tiempo los guardamos">
              <p>Mientras sigas en la lista. Si pedís que los borremos, los borramos.</p>
            </Section>

            <Section title="Tus derechos">
              <p>
                Podés pedirnos en cualquier momento que te digamos qué datos tenemos tuyos, que los corrijamos o que
                los borremos. Escribí a{' '}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-primary font-semibold underline underline-offset-2 hover:text-secondary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>{' '}
                y lo resolvemos. También podés darte de baja de los correos con el enlace que viene al pie de cada
                uno.
              </p>
            </Section>

            <Section title="Menores">
              <p>Este sitio no está dirigido a menores de 13 años.</p>
            </Section>

            <Section title="Cambios">
              <p>Si actualizamos esta política, cambiamos la fecha de arriba.</p>
            </Section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
