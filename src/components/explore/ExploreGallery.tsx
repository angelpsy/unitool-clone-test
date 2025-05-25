import { useState } from 'react';
import Masonry from 'react-masonry-css';
import { useTranslations } from 'next-intl';
import { ExploreImageCard } from './ExploreImageCard';
import { ExploreImageModal } from './ExploreImageModal';
import { Skeleton } from '@/components/ui/Skeleton';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import type { ExploreImage } from '@/types/explore';

interface ExploreGalleryProps {
  images: ExploreImage[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export const ExploreGallery = ({ images, isLoading, hasMore, loadMore }: ExploreGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<ExploreImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('explore');

  const { ref } = useInfiniteScroll({
    hasMore,
    isLoading,
    loadMore,
  });

  const handleImageClick = (image: ExploreImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image) => (
          <div key={image.id} className="mb-4">
            <ExploreImageCard
              image={image}
              onClick={handleImageClick}
            />
          </div>
        ))}
        
        {isLoading && Array.from({ length: 8 }).map((_, index) => (
          <div key={`skeleton-${index}`} className="mb-4">
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        ))}
      </Masonry>

      {hasMore && (
        <div ref={ref} className="mt-8 flex justify-center">
          {isLoading && (
            <div className="text-center text-muted-foreground">
              {t('loading')}
            </div>
          )}
        </div>
      )}

      <ExploreImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
