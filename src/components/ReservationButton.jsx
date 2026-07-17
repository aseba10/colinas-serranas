import React from 'react';
import { Button } from '@/components/ui/button';
import { appendAttributionParams } from '@/lib/attribution';

function ReservationButton({ text = 'Reservar ahora', className = '', size = 'default' }) {
  const baseReservationUrl = 'https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0';

  const handleReservationClick = () => {
    // Registrar conversión en Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'value': 1.0,
        'currency': 'ARS',
        'transaction_id': Date.now()
      });
    }
  };

  // Se agregan los parámetros de campaña (gclid, fbclid, UTMs) guardados al
  // entrar al sitio, para que el motor de reservas los reciba aunque el
  // usuario haya navegado por varias páginas antes de llegar acá.
  const reservationUrl = appendAttributionParams(baseReservationUrl);

  return (
    <Button
      asChild
      size={size}
      className={`bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 ${className}`}
    >
      <a 
        href={reservationUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleReservationClick}
      >
        {text}
      </a>
    </Button>
  );
}

export default ReservationButton;