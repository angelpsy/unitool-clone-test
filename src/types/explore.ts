// Unified image format for the app
export interface ExploreImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  width: number;
  height: number;
  author?: string;
  description?: string;
}

// Unsplash API response format
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  width: number;
  height: number;
  user: {
    name: string;
    username: string;
  };
  description: string | null;
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
}

// Lorem Picsum API response format
export interface LoremPicsumImage {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

// Image service interface
export interface ImageService {
  fetchImages(page: number, perPage: number, options?: Record<string, unknown>): Promise<{ images: unknown[]; hasMore: boolean }>;
  getApiName(): string;
}

// Image mapper interface
export interface ImageMapper<T = unknown> {
  mapToExploreImage(apiImage: T): ExploreImage;
  mapArrayToExploreImages(apiImages: T[]): ExploreImage[];
}

// Infinite scroll hook params
export interface UseInfiniteImagesParams {
  service: ImageService;
  mapper: ImageMapper;
  perPage?: number;
  enabled?: boolean;
  options?: Record<string, unknown>;
}

// Infinite scroll hook return
export interface UseInfiniteImagesReturn {
  images: ExploreImage[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => void;
  refetch: () => void;
}
