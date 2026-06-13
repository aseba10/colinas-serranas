import React from 'react';
import { Star, Award, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

function TrustBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-muted rounded-2xl p-6 md:p-8"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-foreground">4.8/5</p>
              <p className="text-sm text-muted-foreground">Tripadvisor</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">Travelers' Choice</p>
              <p className="text-xs text-muted-foreground">2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-secondary" />
            <div className="text-left">
              <p className="font-bold text-sm text-foreground">700+ opiniones</p>
              <p className="text-xs text-muted-foreground">Huéspedes verificados</p>
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          className="bg-background text-foreground hover:bg-muted/80 border-border transition-all duration-200"
          asChild
        >
          <a
            href="https://www.tripadvisor.com/Hotel_Review-g312761-d2177274-Reviews-Cabanas_Colinas_Serranas-Tandil_Province_of_Buenos_Aires_Central_Argentina.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver opiniones
          </a>
        </Button>
      </div>
    </motion.div>
  );
}

export default TrustBar;