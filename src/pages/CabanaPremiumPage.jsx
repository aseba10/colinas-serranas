import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import FeatureIcon from '@/components/FeatureIcon.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import GalleryGrid from '@/components/GalleryGrid.jsx';
import ComparisonTable from '@/components/ComparisonTable.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';
import {
  Droplets, UtensilsCrossed, Wifi, Wind, Tv, Bed, Coffee,
  Sparkles, ParkingCircle, Users, Heart, Check
} from 'lucide-react';

function CabanaPremiumPage() {
  const amenities = [
    { icon: Droplets, label: 'Jacuzzi doble' },
    { icon: UtensilsCrossed, label: 'Cocina totalmente equipada' },
    { icon: Wifi, label: 'WiFi de alta velocidad' },
    { icon: Wind, label: 'Aire acondicionado frío/calor' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Bed, label: 'Ropa de cama y toallas' },
    { icon: Coffee, label: 'Desayuno incluido' },
    { icon: Sparkles, label: 'Limpieza diaria' },
    { icon: ParkingCircle, label: 'Estacionamiento privado' },
    { icon: Users, label: 'Capacidad 2-4 personas' },
  ];

  const testimonials = [
    {
      name: 'Carlos Fernández',
      rating: 5,
      text: 'El jacuzzi de la cabaña premium es increíble. Pasamos un fin de semana romántico perfecto. La privacidad y el confort son excepcionales.',
      date: 'Abril 2026',
    },
    {
      name: 'Diego Ramírez',
      rating: 5,
      text: 'Ideal para parejas. La cabaña tiene todo lo necesario y el jacuzzi es un lujo. Muy recomendable para una escapada romántica.',
      date: 'Diciembre 2025',
    },
    {
      name: 'Sofía Morales',
      rating: 5,
      text: 'Hermosa cabaña, muy limpia y cómoda. El desayuno delicioso y la atención impecable. Volveremos sin dudas.',
      date: 'Marzo 2026',
    },
  ];

  const faqs = [
    {
      question: '¿El jacuzzi es privado?',
      answer: 'Sí, el jacuzzi doble está ubicado dentro de la cabaña. Es completamente privado para tu uso exclusivo.',
    },
    {
      question: '¿Cuántas personas pueden alojarse?',
      answer: 'La cabaña premium tiene capacidad para 2 a 4 personas. Cuenta con una cama matrimonial en la habitación principal y en el comedor hay una cama con otra que sale debajo para un tercer y cuarto pasajero. Podemos agregar una cuna sin cargo adicional (esta se pone en el comedor ya que en la habitación queda muy justa).',
    },
    {
      question: '¿Qué incluye el desayuno?',
      answer: 'El desayuno incluye café, té, leche, jugos, tostadas, medialunas, mermeladas, manteca y frutas de estación. Te lo llevamos directamente a tu cabaña a partir de las 8.15 hs.',
    },
    {
      question: '¿La cabaña tiene cocina?',
      answer: 'Sí, todas nuestras cabañas premium cuentan con cocina totalmente equipada: heladera, microondas, horno, utensilios, vajilla y todo lo necesario para cocinar.',
    },
    {
      question: '¿Hay estacionamiento?',
      answer: 'Sí, cada cabaña premium tiene su espacio de estacionamiento privado dentro del complejo.',
    },
  ];

  const galleryImages = [
    {
      src: '/images/Cabanas_Premium/hidro1.png',
      alt: 'Hidromasaje'
    },
    {
      src: '/images/Cabanas_Premium/dormitorio.png',
      alt: 'Dormitorio'
    },
    {
      src: '/images/Cabanas_Premium/comedor.png',
      alt: 'Comedor'
    },
    {
      src: '/images/Cabanas_Premium/cocina.png',
      alt: 'Cocina'
    },
    {
      src: '/images/Cabanas_Premium/exterior.png',
      alt: 'Exterior de cabaña'
    }
  ];
  const highlights = [
    'Jacuzzi doble privado',
    'Máxima privacidad y tranquilidad',
    'Ideal para escapadas románticas',
    'Cocina totalmente equipada',
    'Desayuno incluido',
    'Limpieza diaria',
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "name": "Cabaña Premium - Colinas Serranas",
    "description": "Cabaña premium con jacuzzi doble privado, ideal para parejas. Capacidad 2-4 personas, cocina equipada, desayuno incluido.",
    "image": "https://colinas-serranas.vercel.app/images/Cabanas_Premium/portada.png",
    "occupancy": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 4
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Jacuzzi doble" },
      { "@type": "LocationFeatureSpecification", "name": "Cocina equipada" },
      { "@type": "LocationFeatureSpecification", "name": "WiFi gratuito" },
      { "@type": "LocationFeatureSpecification", "name": "Aire acondicionado" },
      { "@type": "LocationFeatureSpecification", "name": "Desayuno incluido" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cabaña Premium con Jacuzzi en Tandil - Colinas Serranas</title>
        <meta name="description" content="Cabaña premium con jacuzzi doble privado en Tandil. Ideal para parejas. Capacidad 2-4 personas, cocina equipada, desayuno incluido. Escapada romántica perfecta." />
        <meta name="keywords" content="cabaña premium tandil, cabaña con jacuzzi tandil, escapada romántica tandil, alojamiento parejas tandil" />
        <link rel="canonical" href="https://colinasserranas.com/cabana_premium_tandil" />
        
        <meta property="og:title" content="Cabaña Premium con Jacuzzi en Tandil - Colinas Serranas" />
        <meta property="og:description" content="Cabaña premium con jacuzzi doble privado. Ideal para parejas. Desayuno incluido, máxima privacidad." />
        <meta property="og:image" content="/images/Cabanas_Premium/portada.png" />
        <meta property="og:url" content="https://colinasserranas.com/cabana_premium_tandil" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <main>
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="/images/Cabanas_Premium/portada.png"
              alt="Cabaña premium con jacuzzi en Tandil"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 hero-overlay" />
          </div>
          
          <div className="relative z-10 section-container text-center text-white pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6">Cabañas Premium</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Escapada romántica con jacuzzi doble privado
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-lg px-8"
                >
                  <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                    Reservar ahora
                  </a>
                </Button>
                <WhatsAppButton
                  text="Consultar disponibilidad"
                  className="text-lg px-8"
                  message="Hola, me interesa reservar una Cabaña Premium en Colinas Serranas. ¿Podrían brindarme información sobre disponibilidad y tarifas?"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6">Sobre la cabaña premium</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Nuestras cabañas premium están diseñadas especialmente para parejas que buscan 
                  una escapada romántica con máxima privacidad y confort. El jacuzzi doble privado 
                  es el protagonista de estas cabañas, ideal para relajarse después de 
                  un día explorando las sierras de Tandil.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Cada cabaña cuenta con una habitación principal con cama matrimonial, cocina 
                  totalmente equipada, Smart TV, aire acondicionado y todos los servicios necesarios 
                  para una estadía perfecta. El desayuno está incluido y te lo llevamos directamente 
                  a tu cabaña.
                </p>
                <div className="bg-accent/10 rounded-xl p-6 border border-accent/20">
                  <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Lo más destacado
                  </h3>
                  <ul className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-foreground">
                        <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-card rounded-2xl p-8 border border-border shadow-lg sticky top-24">
                  <h3 className="text-2xl font-semibold mb-6 text-card-foreground">Detalles de la cabaña</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Capacidad</span>
                      <span className="font-semibold text-card-foreground">2-4 personas</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Habitaciones</span>
                      <span className="font-semibold text-card-foreground">1 principal</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Baños</span>
                      <span className="font-semibold text-card-foreground">1 con jacuzzi</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Cocina</span>
                      <span className="font-semibold text-card-foreground">Totalmente equipada</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Desayuno</span>
                      <span className="font-semibold text-accent">Incluido</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
                    >
                      <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                        Reservar ahora
                      </a>
                    </Button>
                    <WhatsAppButton
                      text="Consultar por WhatsApp"
                      className="w-full"
                      message="Hola, me interesa la Cabaña Premium. ¿Podrían brindarme más información?"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Amenities incluidos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todo lo que necesitas para una estadía perfecta
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {amenities.map((amenity, index) => (
                <FeatureIcon
                  key={index}
                  icon={amenity.icon}
                  label={amenity.label}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Galería de fotos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conoce cada detalle de nuestras cabañas premium
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Comparación con cabaña dúplex</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Encuentra la cabaña perfecta para tu estadía
              </p>
            </motion.div>
            <ComparisonTable />
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Opiniones de huéspedes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Lo que dicen quienes ya disfrutaron nuestras cabañas premium
              </p>
            </motion.div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  rating={testimonial.rating}
                  text={testimonial.text}
                  date={testimonial.date}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="mb-4">Preguntas frecuentes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resolvemos tus dudas sobre las cabañas premium
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-secondary text-primary-foreground">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Droplets className="w-16 h-16 mx-auto mb-6" />
              <h2 className="mb-4">Reserva tu cabaña premium</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                Vive una experiencia romántica única con jacuzzi privado en las sierras de Tandil
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 active:scale-[0.98] transition-all duration-200 text-lg px-8"
                >
                  <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                    Reservar ahora
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 active:scale-[0.98] transition-all duration-200 text-lg px-8"
                >
                  <a
                    href={`https://wa.me/5492494467441?text=${encodeURIComponent('Hola, me interesa reservar una Cabaña Premium.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar por WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default CabanaPremiumPage;