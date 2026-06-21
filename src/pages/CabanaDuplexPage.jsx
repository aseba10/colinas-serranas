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
import ReservationButton from '@/components/ReservationButton.jsx';
import {
  Home, UtensilsCrossed, Wifi, Wind, Tv, Bed, Coffee,
  Sparkles, ParkingCircle, Users, Baby, Check
} from 'lucide-react';

function CabanaDuplexPage() {
  const amenities = [
    { icon: Home, label: 'Dos niveles amplios' },
    { icon: UtensilsCrossed, label: 'Cocina totalmente equipada' },
    { icon: Wifi, label: 'WiFi de alta velocidad' },
    { icon: Wind, label: 'Aire acondicionado frío/calor' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Bed, label: 'Ropa de cama y toallas' },
    { icon: Coffee, label: 'Desayuno incluido' },
    { icon: Sparkles, label: 'Limpieza diaria' },
    { icon: ParkingCircle, label: 'Estacionamiento privado' },
    { icon: Users, label: 'Capacidad 2-5 personas + cuna' },
  ];

  const testimonials = [
    {
      name: 'Lucía Torres',
      rating: 5,
      text: 'Perfecta para ir con niños. La cabaña duplex es muy espaciosa y los chicos se divirtieron muchísimo en el parque. Tiene todo lo necesario.',
      date: 'Marzo 2026',
    },
    {
      name: 'Ana Martínez',
      rating: 5,
      text: 'Excelente para familias. La distribución en dos niveles es muy práctica. La cocina está super equipada y el desayuno delicioso.',
      date: 'Enero 2026',
    },
    {
      name: 'Martín López',
      rating: 5,
      text: 'Fuimos con nuestros dos hijos y fue genial. Mucho espacio, muy limpia y cómoda. El parque infantil es hermoso.',
      date: 'Febrero 2026',
    },
  ];

  const faqs = [
    {
      question: '¿Cómo está distribuida la cabaña duplex?',
      answer: 'La planta alta cuenta con la habitación principal con cama matrimonial. La planta baja tiene cocina completa, comedor, y baño con bañera. En el comedor hay una cama de una plaza con otra que sale debajo para un tercer y cuarto pasajero. En caso de sumarse un quinto pasajero es posible agregar una cama adicional en la habitación. Es una distribución muy práctica para familias.',
    },
    {
      question: '¿Cuántas personas pueden alojarse?',
      answer: 'La cabaña duplex tiene capacidad para 2 a 5 personas más cuna. Cuenta con una cama matrimonial en la habitación principal y podemos agregar cuna sin cargo adicional.',
    },
    {
      question: '¿Es segura para niños pequeños?',
      answer: 'Sí, la cabaña es segura para niños. La escalera interna tiene barandas y el complejo cuenta con espacios verdes cerrados. Además, el parque infantil está diseñado para diferentes edades.',
    },
    {
      question: '¿Qué incluye el desayuno?',
      answer: 'El desayuno incluye café, té, leche, jugos, tostadas, medialunas, mermeladas, manteca, queso, jamón y frutas de estación. Te lo llevamos directamente a tu cabaña a partir de las 8.15 hs.',
    },
    {
      question: '¿Hay espacio para cocinar?',
      answer: 'Sí, la cocina de la cabaña duplex es muy amplia y está totalmente equipada: heladera, microondas, horno, utensilios, vajilla y todo lo necesario para preparar comidas completas.',
    },
  ];

  const galleryImages = [
      {
        src: '/images/Cabanas_Duplex/exterior.png',
        alt: 'Hidromasaje'
      },
      {
        src: '/images/Cabanas_Duplex/comedor2.png',
        alt: 'Dormitorio'
      },
      {
        src: '/images/Cabanas_Duplex/comedor.png',
        alt: 'Comedor'
      },
      {
        src: '/images/Cabanas_Duplex/baño.png',
        alt: 'Cocina'
      },
      {
        src: '/images/Cabanas_Duplex/cocina.png',
        alt: 'Exterior de cabaña'
      },
      {
        src: '/images/Cabanas_Duplex/dormitorio.png',
        alt: 'Exterior de cabaña'
      }
    ];
  const highlights = [
    'Dos niveles amplios y luminosos',
    'Ideal para familias con niños',
    'Cocina totalmente equipada',
    'Baño con bañera',
    'Desayuno incluido',
    'Limpieza diaria',
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    "name": "Cabaña Duplex - Colinas Serranas",
    "description": "Cabaña duplex en dos niveles, ideal para familias. Capacidad 2-5 personas más cuna, cocina equipada, desayuno incluido.",
    "image": "https://colinas-serranas.vercel.app/images/Cabanas_Duplex/dormitorio.png",
    "occupancy": {
      "@type": "QuantitativeValue",
      "minValue": 2,
      "maxValue": 5
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Dos niveles" },
      { "@type": "LocationFeatureSpecification", "name": "Cocina equipada" },
      { "@type": "LocationFeatureSpecification", "name": "WiFi gratuito" },
      { "@type": "LocationFeatureSpecification", "name": "Aire acondicionado" },
      { "@type": "LocationFeatureSpecification", "name": "Desayuno incluido" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cabaña Duplex para Familias en Tandil - Colinas Serranas</title>
        <meta name="description" content="Cabaña duplex en dos niveles en Tandil. Ideal para familias. Capacidad 2-5 personas más cuna, cocina equipada, desayuno incluido. Espaciosa y cómoda." />
        <meta name="keywords" content="cabaña duplex tandil, cabaña familiar tandil, alojamiento familias tandil, cabaña con niños tandil" />
        <link rel="canonical" href="https://colinasserranas.com/cabana_duplex_tandil" />
        
        <meta property="og:title" content="Cabaña Duplex para Familias en Tandil - Colinas Serranas" />
        <meta property="og:description" content="Cabaña duplex en dos niveles. Ideal para familias. Desayuno incluido, espaciosa y cómoda." />
        <meta property="og:image" content="/images/Cabanas_Duplex/dormitorio.png" />
        <meta property="og:url" content="https://colinasserranas.com/cabana_duplex_tandil" />
        
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
              src="/images/Cabanas_Duplex/dormitorio.png"
              alt="Cabaña duplex para familias en Tandil"
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
              <h1 className="mb-6">Cabañas Duplex</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Espaciosas cabañas en dos niveles, perfectas para familias
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ReservationButton size="lg" className="text-lg px-8" text="Reservar ahora" />
                <WhatsAppButton
                  text="Consultar disponibilidad"
                  className="text-lg px-8"
                  message="Hola, me interesa reservar una Cabaña Duplex en Colinas Serranas. ¿Podrían brindarme información sobre disponibilidad y tarifas?"
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
                <h2 className="mb-6">Sobre la cabaña duplex</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Nuestras cabañas duplex están diseñadas especialmente para familias que buscan 
                  espacio, comodidad y funcionalidad. Con dos niveles bien distribuidos, ofrecen 
                  amplitud y privacidad para todos los integrantes de la familia.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  La planta alta cuenta con la habitación principal con cama matrimonial, mientras 
                  que la planta baja ofrece una cocina totalmente equipada, comedor amplio, sala 
                  de estar y baño con bañera. Podemos agregar camas extras o cuna segun tus necesidades, 
                  sin cargo adicional.
                </p>
                <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
                  <h3 className="font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Baby className="w-5 h-5 text-secondary" />
                    Lo más destacado
                  </h3>
                  <ul className="space-y-2">
                    {highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2 text-foreground">
                        <Check className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
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
                      <span className="font-semibold text-card-foreground">2-5 personas + cuna</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Niveles</span>
                      <span className="font-semibold text-card-foreground">2 plantas</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Habitaciones</span>
                      <span className="font-semibold text-card-foreground">1 principal + extras</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-muted-foreground">Baños</span>
                      <span className="font-semibold text-card-foreground">1 con bañera</span>
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
                    <ReservationButton size="lg" className="w-full" text="Reservar ahora" />
                    <WhatsAppButton
                      text="Consultar por WhatsApp"
                      className="w-full"
                      message="Hola, me interesa la Cabaña Duplex. ¿Podrían brindarme más información?"
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
                Todo lo que necesitas para una estadía familiar perfecta
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
                Conoce cada detalle de nuestras cabañas duplex
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
              <h2 className="mb-4">Comparación con cabaña premium</h2>
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
                Lo que dicen las familias que ya disfrutaron nuestras cabañas duplex
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
                Resolvemos tus dudas sobre las cabañas duplex
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
                    <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-secondary">
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

        <section className="section-spacing bg-secondary text-secondary-foreground">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Home className="w-16 h-16 mx-auto mb-6" />
              <h2 className="mb-4">Reserva tu cabaña duplex</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                Vive unas vacaciones familiares inolvidables en las sierras de Tandil
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ReservationButton size="lg" className="text-lg px-8" text="Reservar ahora" />
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground/10 active:scale-[0.98] transition-all duration-200 text-lg px-8"
                >
                  <a
                    href={`https://wa.me/5492494467441?text=${encodeURIComponent('Hola, me interesa reservar una Cabaña Duplex.')}`}
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

export default CabanaDuplexPage;