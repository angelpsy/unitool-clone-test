'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { ExploreGallery } from './ExploreGallery';
import { ServiceSelector, ServiceType } from './ServiceSelector';
import { UnsplashFilters } from './UnsplashFilters';
import { useInfiniteImages } from '@/hooks/use-infinite-images';
import { LoremPicsumService } from '@/services/lorem-picsum-service';
import { LoremPicsumMapper } from '@/mappers/lorem-picsum-mapper';
import { UnsplashService, UnsplashSearchOptions } from '@/services/unsplash-service';
import { UnsplashMapper } from '@/mappers/unsplash-mapper';
import { Skeleton } from '@/components/ui/Skeleton';

const loremPicsumService = new LoremPicsumService();
const loremPicsumMapper = new LoremPicsumMapper();
const unsplashService = new UnsplashService();
const unsplashMapper = new UnsplashMapper();

export function ExploreView() {
  const t = useTranslations('explore');
  const [selectedService, setSelectedService] = useState<ServiceType>('lorem-picsum');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOptions, setSearchOptions] = useState<UnsplashSearchOptions>({});

  const { service, mapper } = selectedService === 'unsplash' 
    ? { service: unsplashService, mapper: unsplashMapper }
    : { service: loremPicsumService, mapper: loremPicsumMapper };

  const serviceOptions = selectedService === 'unsplash' 
    ? { ...searchOptions, ...(searchQuery && { query: searchQuery }) }
    : undefined;

  const {
    images,
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
    refetch,
  } = useInfiniteImages({
    service,
    mapper,
    perPage: 12,
    enabled: true,
    options: serviceOptions,
  });

  const handleServiceChange = useCallback((newService: ServiceType) => {
    setSelectedService(newService);
    setSearchQuery('');
    setSearchOptions({});
  }, []);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  }, [refetch]);

  const handleOrientationChange = useCallback((orientation: UnsplashSearchOptions['orientation']) => {
    setSearchOptions(prev => ({ ...prev, orientation }));
  }, []);

  const handleColorChange = useCallback((color: UnsplashSearchOptions['color']) => {
    setSearchOptions(prev => ({ ...prev, color }));
  }, []);

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">{t('error_title')}</h1>
          <p className="mb-4 text-muted-foreground">
            {error?.message || t('error_description')}
          </p>
          <button
            onClick={refetch}
            className="rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            {t('try_again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <ServiceSelector 
        selectedService={selectedService}
        onServiceChange={handleServiceChange}
      />

      {selectedService === 'unsplash' && (
        <UnsplashFilters
          searchQuery={searchQuery}
          searchOptions={searchOptions}
          onSearchQueryChange={setSearchQuery}
          onSearchSubmit={handleSearchSubmit}
          onOrientationChange={handleOrientationChange}
          onColorChange={handleColorChange}
        />
      )}

      {isLoading && images.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="grid gap-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <ExploreGallery
          images={images}
          isLoading={isLoading}
          hasMore={hasMore}
          loadMore={loadMore}
        />
      )}
    </div>
  );
}
