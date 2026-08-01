import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ApplyNowView from './components/ApplyNowView';
import ContactView from './components/ContactView';
import OptInView from './components/OptInView';
import ThankYouOptInView from './components/ThankYouOptInView';
import { ScreenType } from './types';
import { ArrowUp, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [screen, setScreen] = useState<ScreenType>('home');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state with URL hash for a premium SPA experience
  useEffect(() => {
    const handleHashChange = () => {
      // Meta y otros redirectores pueden pegar parámetros al fragmento
      // (#guia-cantantes?fbclid=…). Nos quedamos solo con la ruta.
      const hash = '#' + window.location.hash.replace(/^#/, '').split(/[?&]/)[0];
      const hashToScreen: Record<string, ScreenType> = {
        '#apply': 'apply',
        '#contact': 'contact',
        '#guia-cantantes': 'optin-cantantes',
        '#guia-oradores': 'optin-oradores',
        '#gracias-cantantes': 'gracias-cantantes',
        '#gracias-oradores': 'gracias-oradores',
      };
      setScreen(hashToScreen[hash] || 'home');
    };

    handleHashChange(); // Run on initial load
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleScreenChange = (newScreen: ScreenType) => {
    setScreen(newScreen);
    // Update hash gracefully
    const screenToHash: Partial<Record<ScreenType, string>> = {
      apply: '#apply',
      contact: '#contact',
      'optin-cantantes': '#guia-cantantes',
      'optin-oradores': '#guia-oradores',
      'gracias-cantantes': '#gracias-cantantes',
      'gracias-oradores': '#gracias-oradores',
    };
    if (newScreen === 'home') {
      window.history.pushState(null, '', ' ');
    } else {
      window.location.hash = screenToHash[newScreen] || newScreen;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface relative selection:bg-secondary/20 selection:text-secondary overflow-x-hidden">
      {/* Premium subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-200px] left-1/4 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[120px]"></div>
        <div className="absolute top-[-100px] right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"></div>
      </div>

      {/* Persistent Navigation Header */}
      <Header currentScreen={screen} setScreen={handleScreenChange} />

      {/* Main Screen Transition Canvas */}
      <main className="flex-grow z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full flex flex-col items-center"
          >
            {screen === 'home' && (
              <HomeView setScreen={handleScreenChange} onSelectPlan={handleSelectPlan} />
            )}
            {screen === 'apply' && (
              <ApplyNowView selectedPlan={selectedPlan} />
            )}
            {screen === 'contact' && (
              <ContactView />
            )}
            {screen === 'optin-cantantes' && (
              <OptInView audience="cantantes" setScreen={handleScreenChange} />
            )}
            {screen === 'optin-oradores' && (
              <OptInView audience="oradores" setScreen={handleScreenChange} />
            )}
            {screen === 'gracias-cantantes' && (
              <ThankYouOptInView audience="cantantes" />
            )}
            {screen === 'gracias-oradores' && (
              <ThankYouOptInView audience="oradores" />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sticky Widgets & Actions */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Contact/WhatsApp floating button (only on home screen) */}
        {screen === 'home' && (
          <motion.a
            href="https://wa.me/50366801471?text=Hola%20Mireille,%20estoy%20viendo%20tu%20landing%20page%20y%20me%20gustaría%20conversar."
            target="_blank"
            rel="noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-colors cursor-pointer group"
            title="Chat en WhatsApp"
          >
            <MessageCircle size={20} className="fill-white stroke-none group-hover:scale-110 transition-transform" />
          </motion.a>
        )}

        {/* Back to Top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-primary text-white border border-outline-variant/10 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
