import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

function WhatsAppButton({ text = 'Consultar por WhatsApp', className = '', message = '' }) {
  const phoneNumber = '5492494467441';
  const defaultMessage = 'Hola, me interesa reservar una cabaña en Colinas Serranas. ¿Podrían brindarme más información?';
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleWhatsAppClick = () => {
    // Registrar conversión en Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'value': 1.0,
        'currency': 'ARS',
        'transaction_id': Date.now()
      });
    }
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