import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton.jsx';
function Footer() {
  return <footer className="bg-muted text-muted-foreground">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo-colinas.png"
                alt="Colinas Serranas"
                className="h-10 w-auto"
              />
              <span className="text-lg font-bold text-foreground">
                Colinas Serranas
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu refugio en las sierras de Tandil. Cabañas totalmente equipadas con desayuno incluido.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors duration-200">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/cabana_premium_tandil" className="hover:text-primary transition-colors duration-200">
                  Cabañas Premium
                </Link>
              </li>
              <li>
                <Link to="/cabana_duplex_tandil" className="hover:text-primary transition-colors duration-200">
                  Cabañas Dúplex
                </Link>
              </li>
              <li>
                <Link to="/#contacto" className="hover:text-primary transition-colors duration-200">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Tandil, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:+5492494467441" className="hover:text-primary transition-colors duration-200">
                  +54 9 2494 467441
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:info@colinasserranas.com" className="hover:text-primary transition-colors duration-200">
                  info@colinasserranas.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="https://instagram.com/colinasserranas" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
                  @colinasserranas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Reservas</h3>
            <div className="space-y-3">
              <WhatsAppButton className="w-full" />
              <p className="text-xs">
                Horario de atención: Lunes a Domingo, 8:00 - 23:00 hs
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 Colinas Serranas. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidad" className="hover:text-primary transition-colors duration-200">
              Política de privacidad
            </Link>
            <Link to="/terminos" className="hover:text-primary transition-colors duration-200">
              Términos de servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>;
}
export default Footer;