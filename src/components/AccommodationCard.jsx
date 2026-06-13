import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function AccommodationCard({ image, title, capacity, features, link, highlight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden h-full flex flex-col bg-card border-border hover:shadow-xl transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          {highlight && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-medium">
              {highlight}
            </div>
          )}
        </div>
        <CardContent className="pt-6 flex-grow">
          <h3 className="text-2xl font-semibold mb-3 text-card-foreground">{title}</h3>
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <Users className="w-5 h-5" />
            <span className="text-sm">{capacity}</span>
          </div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-card-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200">
            <Link to={link}>
              Ver detalles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default AccommodationCard;