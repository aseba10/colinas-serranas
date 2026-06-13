import React from 'react';
import { motion } from 'framer-motion';

function FeatureIcon({ icon: Icon, label, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-3 p-4"
    >
      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="font-semibold text-base text-foreground">{label}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}

export default FeatureIcon;