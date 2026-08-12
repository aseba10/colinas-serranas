import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { getOrCreateWhatsAppRefCode } from '@/lib/attribution';

// Lee una cookie por nombre (sin dependencias externas)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function FloatingWhatsAppButton() {
  const phoneNumber = '5492494467441';
  const baseMessage = 'Hola, me interesa reservar una cabaña en Colinas Serranas. ¿Podrían brindarme más información?';

  const [refCode, setRefCode] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getOrCreateWhatsAppRefCode().then((code) => {
      if (!cancelled && code) {
        setRefCode(code);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const finalMessage = refCode ? `${baseMessage} (ref: ${refCode})` : baseMessage;
  const message = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const handleWhatsAppClick = () => {
    // event_id compartido entre el pixel del browser (vía GTM) y Meta CAPI
    // (server-side) para deduplicar. Se genera en cada clic, igual que en
    // WhatsAppButton.jsx (no se cachea, a diferencia del ref_code).
    const eventId = (crypto.randomUUID && crypto.randomUUID()) || `${Date.now()}-${Math.random()}`;
    const fbc = getCookie('_fbc');
    const fbp = getCookie('_fbp');
    const eventSourceUrl = window.location.href;

    // Registrar conversión en Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'value': 1.0,
        'currency': 'ARS',
        'transaction_id': Date.now()
      });
    }

    // Avisar a GTM para que dispare el evento de Meta Pixel (Contact) del
    // lado del browser, con el mismo event_id para deduplicar con el envío
    // server-side de abajo.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click_meta',
      meta_event_id: eventId,
    });

    // Envío server-side a Meta CAPI, en cada clic real.
    fetch('/api/whatsapp-contact-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: eventId,
        fbc,
        fbp,
        event_source_url: eventSourceUrl,
      }),
      keepalive: true,
    }).catch((err) => {
      console.warn('No se pudo enviar el evento Contact a Meta CAPI:', err);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        asChild
        size="lg"
        className="rounded-full w-14 h-14 shadow-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </Button>
    </motion.div>
  );
}

export default FloatingWhatsAppButton;
