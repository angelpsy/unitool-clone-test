import type { ImageMapper, ExploreImage, UnsplashImage } from '@/types/explore';

export class UnsplashMapper implements ImageMapper<UnsplashImage> {
  mapToExploreImage(apiImage: UnsplashImage): ExploreImage {
    return {
      id: apiImage.id,
      url: apiImage.urls.regular,
      thumbnailUrl: apiImage.urls.small,
      alt: apiImage.alt_description || 'Image',
      width: apiImage.width,
      height: apiImage.height,
      author: apiImage.user.name,
      description: apiImage.description || undefined,
    };
  }

  mapArrayToExploreImages(apiImages: UnsplashImage[]): ExploreImage[] {
    return apiImages.map(image => this.mapToExploreImage(image));
  }
}
