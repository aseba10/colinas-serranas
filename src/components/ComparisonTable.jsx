import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function ComparisonTable() {
  const comparisons = [
    { feature: 'Capacidad', premium: '2-4 personas', duplex: '2-5 personas + cuna' },
    { feature: 'Jacuzzi doble', premium: true, duplex: false },
    { feature: 'Privacidad', premium: 'Máxima', duplex: 'Alta' },
    { feature: 'Espacio interior', premium: 'Compacto', duplex: 'Amplio' },
    { feature: 'Ideal para parejas', premium: true, duplex: true },
    { feature: 'Ideal para familias', premium: true, duplex: true },
    { feature: 'Opción cama/cuna extra', premium: true, duplex: true },
    { feature: 'Distribución', premium: '1 nivel', duplex: '2 niveles' },
  ];

  return (
    <Card className="overflow-hidden bg-card border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-4 font-semibold text-card-foreground">Característica</th>
                <th className="text-center p-4 font-semibold text-primary">Cabañas Premium</th>
                <th className="text-center p-4 font-semibold text-secondary">Cabañas Dúplex</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, index) => (
                <tr
                  key={index}
                  className={`border-t border-border ${
                    index % 2 === 0 ? 'bg-card' : 'bg-muted/30'
                  }`}
                >
                  <td className="p-4 font-medium text-card-foreground">{item.feature}</td>
                  <td className="p-4 text-center">
                    {typeof item.premium === 'boolean' ? (
                      item.premium ? (
                        <Check className="w-5 h-5 text-primary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-card-foreground">{item.premium}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof item.duplex === 'boolean' ? (
                      item.duplex ? (
                        <Check className="w-5 h-5 text-secondary mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-card-foreground">{item.duplex}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default ComparisonTable;