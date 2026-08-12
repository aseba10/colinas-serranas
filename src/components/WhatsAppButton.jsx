import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { getOrCreateWhatsAppRefCode } from '@/lib/attribution';

// Lee una cookie por nombre (sin dependencias externas)
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

function WhatsAppButton({ text = 'Consultar por WhatsApp', className = '', message = '' }) {
  const phoneNumber = '5492494467441';
  const defaultMessage = 'Hola, me interesa reservar una cabaña en Colinas Serranas. ¿Podrían brindarme más información?';

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

  const baseMessage = message || defaultMessage;
  const finalMessage = refCode ? `${baseMessage} (ref: ${refCode})` : baseMessage;
  const encodedMessage = encodeURIComponent(finalMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    // event_id compartido entre el pixel del browser (vía GTM) y Meta CAPI
    // (server-side) para que Meta deduplique el mismo clic en vez de
    // contarlo dos veces. Se genera de nuevo en CADA clic (a diferencia del
    // ref_code, que se cachea una vez por sesión) porque cada clic es un
    // evento de "Contact" real que Meta debe recibir por separado.
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
    // lado del browser, pasando el mismo event_id para que el tag de Meta
    // en GTM lo use como eventID (dedup con el envío server-side de abajo).
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click_meta',
      meta_event_id: eventId,
    });

    // Envío server-side a Meta CAPI, en cada clic real (no cacheado, a
    // diferencia del ref_code). Fire-and-forget con keepalive para que no
    // se corte si el navegador ya está navegando hacia wa.me.
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
    <Button
      asChild
      variant="outline"
      className={`bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary active:scale-[0.98] transition-all duration-200 ${className}`}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}>
        <MessageCircle className="w-4 h-4 mr-2" />
        {text}
      </a>
    </Button>
  );
}

export default WhatsAppButton;
