import Image from 'next/image';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import type { ExploreImage } from '@/types/explore';

interface ExploreImageModalProps {
  image: ExploreImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExploreImageModal = ({ image, isOpen, onClose }: ExploreImageModalProps) => {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] p-0 md:max-w-[80vw]">
        <DialogHeader className="sr-only">
          <DialogTitle>{image.alt}</DialogTitle>
          <DialogDescription>
            {image.description || `Image by ${image.author}`}
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Image */}
          <div className="relative max-h-[80vh] overflow-hidden">
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto w-full object-contain"
              sizes="90vw"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>

          {/* Image info */}
          {(image.author || image.description) && (
            <div className="border-t bg-background/95 p-4">
              {image.author && (
                <p className="text-sm font-medium">Photo by {image.author}</p>
              )}
              {image.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {image.description}
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
