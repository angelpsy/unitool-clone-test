import type { ImageService, UnsplashResponse, UnsplashImage } from '@/types/explore';

export interface UnsplashSearchOptions {
  query?: string;
  orientation?: 'landscape' | 'portrait' | 'squarish';
  color?: 'black_and_white' | 'black' | 'white' | 'yellow' | 'orange' | 'red' | 'purple' | 'magenta' | 'green' | 'teal' | 'blue';
  orderBy?: 'relevant' | 'latest';
}

export class UnsplashService implements ImageService {
  private readonly baseUrl = 'https://api.unsplash.com';
  private readonly accessKey: string;
  private readonly defaultQueries = [
    'nature', 'landscape', 'architecture', 'people', 'animals', 
    'technology', 'food', 'travel', 'art', 'abstract'
  ];

  constructor() {
    this.accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '';
    
    if (!this.accessKey) {
      console.warn('NEXT_PUBLIC_UNSPLASH_ACCESS_KEY is not set. Unsplash service will not work properly.');
    }
  }

  async fetchImages(
    page: number, 
    perPage: number = 12, 
    options: UnsplashSearchOptions = {}
  ): Promise<{ images: UnsplashImage[]; hasMore: boolean }> {
    if (!this.accessKey) {
      throw new Error('Unsplash API key is not configured');
    }

    const {
      query = this.getRandomQuery(),
      orientation = 'all',
      color,
      orderBy = 'relevant'
    } = options;

    try {
      const searchParams = new URLSearchParams({
        query,
        page: page.toString(),
        per_page: perPage.toString(),
        order_by: orderBy,
      });

      if (orientation !== 'all') {
        searchParams.append('orientation', orientation);
      }

      if (color) {
        searchParams.append('color', color);
      }

      const response = await fetch(
        `${this.baseUrl}/search/photos?${searchParams.toString()}`,
        {
          headers: {
            'Authorization': `Client-ID ${this.accessKey}`,
            'Accept-Version': 'v1',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Unsplash API error response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid Unsplash API key. Please check your NEXT_PUBLIC_UNSPLASH_ACCESS_KEY.');
        } else if (response.status === 403) {
          throw new Error('Unsplash API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
        }
      }

      const data: UnsplashResponse = await response.json();
      
      return {
        images: data.results,
        hasMore: page < data.total_pages && data.results.length > 0,
      };
    } catch (error) {
      console.error('UnsplashService fetch error:', error);
      throw error;
    }
  }

  async searchImages(
    query: string,
    page: number = 1,
    perPage: number = 12,
    options: Omit<UnsplashSearchOptions, 'query'> = {}
  ): Promise<{ images: UnsplashImage[]; hasMore: boolean }> {
    return this.fetchImages(page, perPage, { ...options, query });
  }

  async getFeaturedImages(
    page: number = 1,
    perPage: number = 12
  ): Promise<{ images: UnsplashImage[]; hasMore: boolean }> {
    if (!this.accessKey) {
      throw new Error('Unsplash API key is not configured');
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/photos?page=${page}&per_page=${perPage}&order_by=popular`,
        {
          headers: {
            'Authorization': `Client-ID ${this.accessKey}`,
            'Accept-Version': 'v1',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status} ${response.statusText}`);
      }

      const images: UnsplashImage[] = await response.json();
      
      return {
        images,
        hasMore: images.length === perPage,
      };
    } catch (error) {
      console.error('UnsplashService getFeaturedImages error:', error);
      throw error;
    }
  }

  private getRandomQuery(): string {
    return this.defaultQueries[Math.floor(Math.random() * this.defaultQueries.length)];
  }

  getApiName(): string {
    return 'unsplash';
  }
}
