import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cabinType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
  setFormData(prev => ({ ...prev, cabinType: value }));
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) {
    toast.error('Por favor completa todos los campos obligatorios');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    toast.error('Por favor ingresa un email válido');
    return;
  }


  try {
    const response = await fetch(
      'https://formspree.io/f/mgobrrvp',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error('Error al enviar');
    }

    // Registrar conversión en Google Ads
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'value': 1.0,
        'currency': 'ARS',
        'transaction_id': Date.now()
      });
    }

    toast.success(
      'Mensaje enviado correctamente. Te contactaremos pronto.'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      cabinType: '',
      message: '',
    });

  } catch (error) {
    toast.error(
      'No se pudo enviar el mensaje. Intenta nuevamente.'
    );
  } finally {
    setIsSubmitting(false);
  }
};
    

    

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Envíanos un mensaje</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-card-foreground">Nombre completo *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 bg-background text-foreground border-input placeholder:text-muted-foreground"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-card-foreground">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 bg-background text-foreground border-input placeholder:text-muted-foreground"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-card-foreground">Teléfono</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 bg-background text-foreground border-input placeholder:text-muted-foreground"
              placeholder="+54 9 2494 467441"
            />
          </div>

          <div>
            <Label htmlFor="cabinType" className="text-card-foreground">Tipo de cabaña</Label>
            <Select value={formData.cabinType} onValueChange={handleSelectChange}>
              <SelectTrigger className="mt-1 bg-background text-foreground border-input">
                <SelectValue placeholder="Selecciona una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="premium">Cabaña Premium</SelectItem>
                <SelectItem value="duplex">Cabaña Dúplex</SelectItem>
                <SelectItem value="any">Cualquiera disponible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-card-foreground">Mensaje *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 bg-background text-foreground border-input placeholder:text-muted-foreground"
              placeholder="Cuéntanos sobre tu estadía ideal..."
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
          >
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                Enviar mensaje
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;