import { Link, useLocation, } from 'react-router-dom';
import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import TrustBar from '@/components/TrustBar.jsx';
import FeatureIcon from '@/components/FeatureIcon.jsx';
import AccommodationCard from '@/components/AccommodationCard.jsx';
import AttractionCard from '@/components/AttractionCard.jsx';
import TestimonialCard from '@/components/TestimonialCard.jsx';
import ComparisonTable from '@/components/ComparisonTable.jsx';
import GalleryGrid from '@/components/GalleryGrid.jsx';
import ContactForm from '@/components/ContactForm.jsx';
import WhatsAppButton from '@/components/WhatsAppButton.jsx';

// Explicitly importing all requested lucide-react icons to prevent 'is not defined' errors
import { Coffee, Waves, Droplets, TreePine, PawPrint, UtensilsCrossed, Sparkles, Users, Award, Leaf, Wifi, Wind, Tv, Bed, ParkingCircle, Flame, Baby, Home, Heart, Mountain, MapPin, Phone, Mail, Instagram, Star, Utensils, Shirt, Car, Map as MapIcon, ChevronDown, Menu, X, ChevronRight, ChevronLeft, ExternalLink, Send } from 'lucide-react';
function HomePage() {
  const features = [{
    icon: Coffee,
    label: 'Desayuno incluido'
  }, {
    icon: Droplets,
    label: 'Jacuzzi'
  }, {
    icon: Waves,
    label: 'Piscina'
  }, {
    icon: TreePine,
    label: 'Parque infantil'
  }, {
    icon: PawPrint,
    label: 'Pet friendly'
  }, {
    icon: UtensilsCrossed,
    label: 'Cocina completa'
  }, {
    icon: Sparkles,
    label: 'Limpieza diaria'
  }, {
    icon: Users,
    label: 'Atención personalizada'
  }, {
    icon: Award,
    label: 'Excelente reputación'
  }, {
    icon: Leaf,
    label: 'Espacios verdes'
  }];
  const services = [{
    icon: Coffee,
    label: 'Desayuno'
  }, {
    icon: Sparkles,
    label: 'Limpieza diaria'
  }, {
    icon: Wifi,
    label: 'WiFi'
  }, {
    icon: Wind,
    label: 'Aire acondicionado'
  }, {
    icon: Tv,
    label: 'Smart TV'
  }, {
    icon: UtensilsCrossed,
    label: 'Cocina equipada'
  }, {
    icon: Bed,
    label: 'Ropa blanca'
  }, {
    icon: ParkingCircle,
    label: 'Estacionamiento'
  }, {
    icon: Waves,
    label: 'Piscina'
  }, {
    icon: Flame,
    label: 'Parrillas'
  }, {
    icon: Users,
    label: 'Servicio personalizado'
  }, {
    icon: PawPrint,
    label: 'Mascotas bienvenidas'
  }];
  const attractions = [{
    image: 'https://horizons-cdn.hostinger.com/90ce6bf4-f4fc-481d-b43f-8478ba6718cc/8567ff103dfcde01d6d5f1feeccfa595.jpg',
    title: 'Lago del Fuerte',
    description: 'Espejo de agua ideal para paseos, deportes náuticos y picnics familiares.'
  }, {
    image: 'images/paseos/picada.webp',
    title: 'Gastronomía regional',
    description: 'Descubre los sabores locales: quesos, embutidos, dulces artesanales y más.'
  }, {
    image: 'images/paseos/calvario.webp',
    title: 'Monte Calvario',
    description: 'Sendero con estaciones del vía crucis y vistas espectaculares de las sierras.'
  }, {
    image: 'images/paseos/centinela.webp',
    title: 'Vista Panorámica',
    description: 'Impresionantes vistas aéreas de la ciudad, sus iglesias y lagos.'
  }, {
    image: 'images/paseos/parque.webp',
    title: 'Parque Independencia',
    description: 'Paseo donde visitar el Castillo morisco y disfrutar de las vistas'
  }, {
    image: 'images/paseos/movediza.webp',
    title: 'Piedra Movediza',
    description: 'Descubre los sabores locales: quesos, embutidos, dulces artesanales y más.'
  }];
  const testimonials = [{
    name: 'María González',
    rating: 5,
    text: 'Excelente lugar para descansar. Las cabañas son muy limpias y cómodas. El desayuno delicioso y la atención impecable. Volveremos sin dudas.',
    date: 'Mayo 2026'
  }, {
    name: 'Carlos Fernández',
    rating: 5,
    text: 'Pasamos un fin de semana increíble. El jacuzzi de la cabaña premium es un lujo. Muy tranquilo y rodeado de naturaleza.',
    date: 'Abril 2026'
  }, {
    name: 'Lucía Torres',
    rating: 5,
    text: 'Ideal para ir con niños. El parque de juegos es hermoso y los chicos se divirtieron muchísimo. Las cabañas tienen todo lo necesario.',
    date: 'Marzo 2026'
  }, {
    name: 'Roberto Sánchez',
    rating: 5,
    text: 'Fuimos con nuestra mascota y nos sentimos muy bienvenidos. El complejo es pet friendly de verdad. Muy recomendable.',
    date: 'Febrero 2026'
  }, {
    name: 'Ana Martínez',
    rating: 5,
    text: 'La cabaña duplex es perfecta para familias. Muy espaciosa y bien equipada. La piscina es un plus en verano.',
    date: 'Enero 2026'
  }, {
    name: 'Diego Ramírez',
    rating: 5,
    text: 'Escapada romántica perfecta. La privacidad de las cabañas premium es ideal para parejas. Excelente relación precio-calidad.',
    date: 'Diciembre 2025'
  }];
  const faqs = [{
    question: '¿Se aceptan mascotas?',
    answer: 'Sí, somos un complejo pet friendly. Aceptamos mascotas de todos los tamaños. Solo te pedimos que nos avises al momento de la reserva y que mantengas a tu mascota bajo control en las áreas comunes.'
  }, {
    question: '¿El desayuno está incluido?',
    answer: 'Sí, todas nuestras cabañas incluyen desayuno diario. Te lo llevamos directamente a tu cabaña en el horario que prefieras.'
  }, {
    question: '¿Las cabañas tienen cocina completa?',
    answer: 'Sí, todas nuestras cabañas cuentan con cocina totalmente equipada: heladera, microondas, horno, utensilios, vajilla y todo lo necesario para cocinar.'
  }, {
    question: '¿La piscina está disponible todo el año?',
    answer: 'La piscina es al aire libre y está disponible durante la temporada de verano (diciembre a marzo). Fuera de temporada, permanece cerrada.'
  }, {
    question: '¿Cuál es la diferencia entre las cabañas Premium y Duplex?',
    answer: 'Las Premium son ideales para parejas, tienen jacuzzi doble y máxima privacidad. Las Duplex son más amplias, en dos niveles, perfectas para familias de hasta 5 personas más cuna.'
  }, {
    question: '¿Hay estacionamiento?',
    answer: 'Sí, cada cabaña tiene su espacio de estacionamiento privado dentro del complejo.'
  }, {
    question: '¿Se puede agregar cama o cuna extra?',
    answer: 'Las cabañas Duplex son para cuatro personas pero es posible agregar una cama en la habitación para un quinto pasajero. En el caso de las Premium como cuenta con ambientes mas pequeños ano es posible agregar una plaza mas, y en caso de sumar una cuna debe hacerse en el comedor.'
  }, {
    question: '¿Tienen aire acondicionado?',
    answer: 'Sí, todas las cabañas cuentan con aire acondicionado frío/calor para tu comodidad durante todo el año.'
  }];
  const galleryCategories = [{
    name: 'premium',
    label: 'Cabañas Premium',
    images: [{
      src: 'images/Cabañas_Premium/hidro1.png',
      alt: 'Hidromasaje para dos personas'
    }, {
      src: 'images/Cabañas_Premium/dormitorio.png',
      alt: 'Dormitorio principal cabaña premium'
    }, {
      src: 'images/Cabañas_Premium/cocina.png',
      alt: 'Cocina equipada cabaña premium'
    }, {
      src: 'images/Cabañas_Premium/comedor.png',
      alt: 'Cabaña hasta para cuatro personas'
    }, {
      src: 'images/Cabañas_Premium/baño.png',
      alt: 'Baño cabaña premium'
    }, {
      src: 'images/Cabañas_Premium/exterior.png',
      alt: 'Exterior cabaña premium'
    }]
  }, {
    name: 'duplex',
    label: 'Cabañas Duplex',
    images: [{
      src: 'images/Cabañas_Duplex/dormitorio.png',
      alt: 'Dormitorio cabaña duplex'
    }, {
      src: 'images/Cabañas_Duplex/comedor2.png',
      alt: 'Sala de estar cabaña duplex'
    }, {
      src: 'images/Cabañas_Duplex/cocina.png',
      alt: 'Cocina cabaña duplex'
    }, {
      src: 'images/Cabañas_Duplex/comedor.png',
      alt: 'Cabaña hasta para cinco personas'
    }, {
      src: 'images/Cabañas_Duplex/baño.png',
      alt: 'Baño cabaña duplex'
    }, {
      src: 'images/Cabañas_Duplex/exterior.png',
      alt: 'Exterior cabaña duplex'
    }]
  }, {
    name: 'pool',
    label: 'Piscina',
    images: [{
      src: 'images/Piscina/Captura de pantalla de 2026-06-12 21-56-25.png',
      alt: 'Piscina al aire libre rodeada de naturaleza'
    }, {
      src: 'images/Piscina/Captura de pantalla de 2026-06-12 21-56-38.png',
      alt: 'Área de piscina con reposeras'
    }, {
      src: 'images/Piscina/Captura de pantalla de 2026-06-12 22-01-56.png',
      alt: 'Área de piscina con reposeras'
    }, {
      src: 'images/Piscina/Captura de pantalla de 2026-06-12 22-03-05.png',
      alt: 'Área de piscina con reposeras'
    }]
  }, {
    name: 'park',
    label: 'Parque y juegos',
    images: [{
      src: 'images/Parque y juegos/niños7.png',
      alt: 'Parque infantil con juegos'
    }, {
      src: 'images/Parque y juegos/niños6.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños3.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños4.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños5.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños1.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños2.png',
      alt: 'Zona de juegos para niños'
    }, {
      src: 'images/Parque y juegos/niños8.png',
      alt: 'Zona de juegos para niños'
    }]
  }, {
    name: 'nature',
    label: 'Entorno serrano',
    images: [{
      src: 'images/Parque y juegos/entorno1.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno2.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno3.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno4.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno5.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno6.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno7.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno8.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno9.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno10.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno11.png',
      alt: 'Vista de las sierras de Tandil'
    },{
      src: 'images/Parque y juegos/entorno12.png',
      alt: 'Vista de las sierras de Tandil'
    },]
  }, {
    name: 'pets',
    label: 'Mascotas',
    images: [{
      src: 'images/Mascotas/Captura de pantalla de 2026-06-12 21-57-35.png',
      alt: 'Mascota disfrutando del entorno natural'
    }, {
      src: 'images/Mascotas/Captura de pantalla de 2026-06-12 22-05-00.png',
      alt: 'Espacio pet friendly'
    },{
      src: 'images/Mascotas/Captura de pantalla de 2026-06-13 18-10-55.png',
      alt: 'Espacio pet friendly'
    }]
  }];
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "LodgingBusiness",
      "name": "Colinas Serranas",
      "image": "https://images.unsplash.com/photo-1698998786030-1487f00a945b",
      "description": "Cabañas totalmente equipadas en las sierras de Tandil con desayuno incluido, jacuzzi, piscina y espacios verdes.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tandil",
        "addressRegion": "Buenos Aires",
        "addressCountry": "AR"
      },
      "telephone": "+5492494467441",
      "email": "info@colinasserranas.com",
      "priceRange": "$$",
      "amenityFeature": [{
        "@type": "LocationFeatureSpecification",
        "name": "Desayuno incluido"
      }, {
        "@type": "LocationFeatureSpecification",
        "name": "Jacuzzi"
      }, {
        "@type": "LocationFeatureSpecification",
        "name": "Piscina"
      }, {
        "@type": "LocationFeatureSpecification",
        "name": "WiFi gratuito"
      }, {
        "@type": "LocationFeatureSpecification",
        "name": "Pet friendly"
      }],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "700",
        "bestRating": "5",
        "worstRating": "1"
      }
    }]
  };
  return <>
      <Helmet>
        <title>Colinas Serranas - Cabañas en Tandil con Desayuno y Jacuzzi</title>
        <meta name="description" content="Cabañas totalmente equipadas en las sierras de Tandil. Desayuno incluido, jacuzzi, piscina, pet friendly. Escapada perfecta para parejas y familias." />
        <meta name="keywords" content="cabañas tandil, alojamiento tandil, cabañas con jacuzzi, escapada romántica tandil, cabañas pet friendly, vacaciones en tandil" />
        <link rel="canonical" href="https://colinasserranas.com/" />
        
        <meta property="og:title" content="Colinas Serranas - Cabañas en Tandil con Desayuno y Jacuzzi" />
        <meta property="og:description" content="Tu refugio en las sierras de Tandil. Cabañas totalmente equipadas con desayuno incluido, jacuzzi, piscina y espacios verdes." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1698998786030-1487f00a945b" />
        <meta property="og:url" content="https://colinasserranas.com/" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <Header />
      <FloatingWhatsAppButton />

      <main>
        <section className="relative min-h-[100dvh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img src="images/otras/portada.webp" alt="Cabaña en las sierras de Tandil rodeada de naturaleza" className="w-full h-full object-cover" />
            <div className="absolute inset-0 hero-overlay" />
          </div>
          
          <div className="relative z-10 section-container text-center text-white">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
              <h1 className="mb-6">Tu descanso en las sierras de Tandil</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Cabañas totalmente equipadas con desayuno incluido, jacuzzi, piscina y espacios verdes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 text-lg px-8">
                  <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                    Reservar ahora
                  </a>
                </Button>
                <WhatsAppButton text="Consultar por WhatsApp" className="text-lg px-8" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <TrustBar />
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">¿Por qué elegir Colinas Serranas?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Combinamos tranquilidad, confort y servicios de calidad para tu estadía perfecta
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {features.map((feature, index) => <FeatureIcon key={index} icon={feature.icon} label={feature.label} />)}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Sobre Colinas Serranas</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Nuestro complejo de cabañas está ubicado en un entorno natural privilegiado, 
                rodeado de las sierras de Tandil. Ofrecemos un refugio tranquilo donde podrás 
                desconectar de la rutina y disfrutar de la naturaleza, sin renunciar a las 
                comodidades modernas. Cada detalle está pensado para que tu estadía sea inolvidable.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Nuestras cabañas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todas incluyen: 1 habitacion, cocina completa, Smart TV, aire acondicionado, 
                vajilla, ropa blanca, limpieza diaria, desayuno, WiFi y estacionamiento
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <img src="images/otras/hidro.webp" alt="Interior de cabaña premium con jacuzzi doble" loading="lazy" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="mb-4 text-primary">Cabañas Premium</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Capacidad: 2 a 4 personas
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Habitación principal con cama matrimonial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Jacuzzi doble en suite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Cocina totalmente equipada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Opción de cama extra o cuna</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Máxima privacidad</span>
                  </li>
                </ul>
                <p className="text-accent font-semibold mb-6">
                  Ideal para escapadas románticas y parejas que buscan intimidad
                </p>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200">
                  <a href="/cabana_premium_tandil">Ver más detalles</a>
                </Button>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-2 lg:order-1">
                <h2 className="mb-4 text-secondary">Cabañas Duplex</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Capacidad: 2 a 5 personas + cuna
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Planta alta: habitación principal con cama matrimonial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Planta baja: cocina, comedor y baño con bañera</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Espaciosa y luminosa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary mt-1">•</span>
                    <span>Opción de cama extra o cuna</span>
                  </li>
                </ul>
                <p className="text-accent font-semibold mb-6">
                  Perfecta para familias que buscan espacio y comodidad
                </p>
                <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-[0.98] transition-all duration-200">
                  <a href="/cabana_duplex_tandil">Ver más detalles</a>
                </Button>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-1 lg:order-2">
                <img src="images/otras/duplex.webp" alt="Exterior de cabaña duplex en dos niveles" loading="lazy" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Comparación de cabañas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Encuentra la cabaña perfecta para tu estadía
              </p>
            </motion.div>
            <ComparisonTable />
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Servicios incluidos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Todo lo que necesitas para una estadía perfecta
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service, index) => <FeatureIcon key={index} icon={service.icon} label={service.label} />)}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <img src="images/otras/hamacas.webp" alt="Parque infantil con juegos para niños" loading="lazy" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="mb-4">Diversión para los más chicos</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nuestro parque infantil cuenta con cama elástica, tirolesa, arenero, hamacas, 
                  cancha de futbol y amplios espacios verdes para que los niños disfruten al aire libre 
                  en un entorno seguro y natural.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-2 lg:order-1">
                <h2 className="mb-4 text-secondary">Vacaciones con tu mascota</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Somos un complejo 100% pet friendly. Tus mascotas son bienvenidas y podrán disfrutar 
                  de nuestros amplios espacios verdes y el entorno natural que rodea las cabañas.
                </p>
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="order-1 lg:order-2">
                <img src="images/otras/mascotas.webp" alt="Mascota disfrutando del entorno natural" loading="lazy" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <img src="images/otras/pileta.webp" alt="Piscina al aire libre rodeada de naturaleza" loading="lazy" className="w-full h-96 object-cover rounded-2xl shadow-lg" />
              </motion.div>
              <motion.div initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <h2 className="mb-4">Piscina al aire libre</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Durante la temporada de verano, disfruta de nuestra piscina al aire libre rodeada 
                  de naturaleza. El lugar perfecto para refrescarte y relajarte bajo el sol serrano.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Descubre Tandil</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explora los atractivos turísticos de la ciudad serrana
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attractions.map((attraction, index) => <AttractionCard key={index} image={attraction.image} title={attraction.title} description={attraction.description} index={index} />)}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Galería de fotos</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conoce nuestras instalaciones y entorno
              </p>
            </motion.div>
            <GalleryGrid categories={galleryCategories} />
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Lo que dicen nuestros huéspedes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Opiniones reales de quienes ya disfrutaron Colinas Serranas
              </p>
            </motion.div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
              {testimonials.map((testimonial, index) => <TestimonialCard key={index} name={testimonial.name} rating={testimonial.rating} text={testimonial.text} date={testimonial.date} />)}
            </div>
          </div>
        </section>

        <section className="section-spacing bg-muted/30">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Preguntas frecuentes</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Resolvemos tus dudas sobre tu estadía
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-card border border-border rounded-xl px-6">
                    <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>)}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contacto" className="section-spacing bg-background">
          <div className="section-container">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="text-center mb-12">
              <h2 className="mb-4">Contacto</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Estamos aquí para ayudarte a planificar tu estadía perfecta
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <ContactForm />
              </div>
              <div className="space-y-6">
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold mb-4 text-card-foreground">Información de contacto</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-card-foreground">Ubicación</p>
                        <p className="text-sm text-muted-foreground">Tandil, Buenos Aires, Argentina</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-card-foreground">Teléfono</p>
                        <a href="tel:+5492494467441" className="text-sm text-muted-foreground hover:text-primary">
                          +54 9 2494 467441
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-card-foreground">Email</p>
                        <a href="mailto:info@colinasserranas.com" className="text-sm text-muted-foreground hover:text-primary">
                          colinasserranas@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Instagram className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-card-foreground">Instagram</p>
                        <a href="https://instagram.com/colinasserranas" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
                          @colinasserranas
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-semibold mb-4 text-card-foreground">Horarios de atención</h3>
                  <p className="text-sm text-muted-foreground">
                    Lunes a Domingo: 8:00 - 23:00 hs
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200">
                    <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                      Reservar ahora
                    </a>
                  </Button>
                  <WhatsAppButton text="Consultar por WhatsApp" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-primary text-primary-foreground">
          <div className="section-container text-center">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <img
                src="/images/logo-colinas.png"
                alt="Colinas Serranas"
                className="h-20 mx-auto mb-6"
              />
              <h2 className="mb-4">¿Listo para tu próxima escapada a Tandil?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
                Reserva tu cabaña hoy y descubre la tranquilidad de las sierras con todas las comodidades
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-background text-foreground hover:bg-background/90 active:scale-[0.98] transition-all duration-200 text-lg px-8">
                  <a href="https://wubook.net/nneb/bk?f=today&n=1&ep=45e55843&board=bb&o=1.0.0.0" target="_blank" rel="noopener noreferrer">
                    Reservar ahora
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10 active:scale-[0.98] transition-all duration-200 text-lg px-8">
                  <a href={`https://wa.me/5492494467441?text=${encodeURIComponent('Hola, me interesa reservar una cabaña en Colinas Serranas.')}`} target="_blank" rel="noopener noreferrer">
                    Consultar por WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>;
}
export default HomePage;