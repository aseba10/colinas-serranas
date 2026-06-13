import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function TestimonialCard({ name, rating, text, date }) {
  return (
    <Card className="break-inside-avoid mb-6 bg-card border-border hover:shadow-lg transition-all duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? 'fill-accent text-accent'
                  : 'fill-muted text-muted'
              }`}
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-card-foreground mb-4">
          "{text}"
        </p>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-sm text-card-foreground">{name}</p>
          {date && (
            <p className="text-xs text-muted-foreground">{date}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;