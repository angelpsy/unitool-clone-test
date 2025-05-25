import type { ImageService, LoremPicsumImage } from '@/types/explore';

export class LoremPicsumService implements ImageService {
  private readonly baseUrl = 'https://picsum.photos';

  async fetchImages(
    page: number, 
    perPage: number = 12, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options?: Record<string, unknown>
  ): Promise<{ images: LoremPicsumImage[]; hasMore: boolean }> {
    try {
      const startId = (page - 1) * perPage + 1;
      const images = Array.from({ length: perPage }, (_, index) => {
        const id = startId + index;
        return {
          id: id.toString(),
          author: `Photographer ${id}`,
          width: 800 + Math.floor(Math.random() * 400),
          height: 600 + Math.floor(Math.random() * 400),
          url: `${this.baseUrl}/id/${id}/info`,
          download_url: `${this.baseUrl}/id/${id}/800/600`,
        };
      });

      return {
        images,
        hasMore: page < 10,
      };
    } catch (error) {
      console.error('LoremPicsumService fetch error:', error);
      throw error;
    }
  }

  getApiName(): string {
    return 'lorem-picsum';
  }
}
