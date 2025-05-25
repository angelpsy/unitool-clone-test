import Image from 'next/image';
import type { ExploreImage } from '@/types/explore';

interface ExploreImageCardProps {
  image: ExploreImage;
  onClick: (image: ExploreImage) => void;
}

export const ExploreImageCard = ({ image, onClick }: ExploreImageCardProps) => {
  const handleClick = () => {
    onClick(image);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(image);
    }
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-lg bg-muted transition-all hover:shadow-lg"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View image: ${image.alt}`}
    >
      <div className="relative overflow-hidden">
        <Image
          src={image.thumbnailUrl || image.url}
          alt={image.alt}
          width={400}
          height={300}
          className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        
        {/* Overlay with image info */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        
        {image.author && (
          <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {image.author}
          </div>
        )}
      </div>
    </div>
  );
};
