import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { UnsplashSearchOptions } from '@/services/unsplash-service';

interface UnsplashFiltersProps {
  searchQuery: string;
  searchOptions: UnsplashSearchOptions;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onOrientationChange: (orientation: UnsplashSearchOptions['orientation']) => void;
  onColorChange: (color: UnsplashSearchOptions['color']) => void;
}

export function UnsplashFilters({
  searchQuery,
  searchOptions,
  onSearchQueryChange,
  onSearchSubmit,
  onOrientationChange,
  onColorChange,
}: UnsplashFiltersProps) {
  const t = useTranslations('explore');

  return (
    <div className="mb-6 space-y-4 rounded-lg border p-4">
      <form onSubmit={onSearchSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">{t('search_button')}</Button>
      </form>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Label className="text-sm font-medium">{t('orientation')}</Label>
          <div className="flex gap-2 flex-wrap">
            {(['landscape', 'portrait', 'squarish'] as const).map((orientation) => (
              <Button
                key={orientation}
                type="button"
                variant={searchOptions.orientation === orientation ? 'default' : 'outline'}
                size="sm"
                onClick={() => onOrientationChange(orientation)}
              >
                {t(`orientation_${orientation}`)}
              </Button>
            ))}
            <Button
              type="button"
              variant={!searchOptions.orientation ? 'default' : 'outline'}
              size="sm"
              onClick={() => onOrientationChange(undefined)}
            >
              {t('orientation_all')}
            </Button>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">{t('color')}</Label>
          <div className="flex flex-wrap gap-2">
            {(['black_and_white', 'red', 'blue', 'green', 'yellow', 'orange'] as const).map((color) => (
              <Button
                key={color}
                type="button"
                variant={searchOptions.color === color ? 'default' : 'outline'}
                size="sm"
                onClick={() => onColorChange(color)}
              >
                {t(`color_${color}`)}
              </Button>
            ))}
            <Button
              type="button"
              variant={!searchOptions.color ? 'default' : 'outline'}
              size="sm"
              onClick={() => onColorChange(undefined)}
            >
              {t('color_all')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
