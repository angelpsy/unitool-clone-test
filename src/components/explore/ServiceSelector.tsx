import { Button } from '@/components/ui/Button';

export type ServiceType = 'lorem-picsum' | 'unsplash';

interface ServiceSelectorProps {
  selectedService: ServiceType;
  onServiceChange: (service: ServiceType) => void;
}

export function ServiceSelector({ selectedService, onServiceChange }: ServiceSelectorProps) {
  return (
    <div className="mb-6 flex gap-2">
      <Button
        variant={selectedService === 'lorem-picsum' ? 'default' : 'outline'}
        onClick={() => onServiceChange('lorem-picsum')}
      >
        Lorem Picsum
      </Button>
      <Button
        variant={selectedService === 'unsplash' ? 'default' : 'outline'}
        onClick={() => onServiceChange('unsplash')}
      >
        Unsplash
      </Button>
    </div>
  );
}
