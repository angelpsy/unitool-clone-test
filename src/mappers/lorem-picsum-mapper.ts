import type { ImageMapper, ExploreImage, LoremPicsumImage } from '@/types/explore';

export class LoremPicsumMapper implements ImageMapper<LoremPicsumImage> {
  mapToExploreImage(apiImage: LoremPicsumImage): ExploreImage {
    return {
      id: apiImage.id,
      url: apiImage.download_url,
      thumbnailUrl: `https://picsum.photos/id/${apiImage.id}/400/300`,
      alt: `Photo by ${apiImage.author}`,
      width: apiImage.width,
      height: apiImage.height,
      author: apiImage.author,
      description: undefined,
    };
  }

  mapArrayToExploreImages(apiImages: LoremPicsumImage[]): ExploreImage[] {
    return apiImages.map(image => this.mapToExploreImage(image));
  }
}
