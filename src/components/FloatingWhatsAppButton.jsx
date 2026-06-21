import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function FloatingWhatsAppButton() {
  const phoneNumber = '5492494467441';
  const message = encodeURIComponent('Hola, me interesa reservar una cabaña en Colinas Serranas. ¿Podrían brindarme más información?');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

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