import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

function AttractionCard({ image, title, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full bg-card border-border hover:shadow-lg transition-all duration-300 group">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
            animate={index === 0 ? { scale: [1, 1.15, 1] } : {}}
            transition={index === 0 ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
            whileHover={index !== 0 ? { scale: 1.05 } : {}}
          />
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold mb-2 text-card-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default AttractionCard;