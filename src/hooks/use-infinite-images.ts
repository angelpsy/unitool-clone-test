import { useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseInfiniteImagesParams, UseInfiniteImagesReturn, ExploreImage } from '@/types/explore';

interface ImagePageData {
  images: ExploreImage[];
  hasMore: boolean;
  page: number;
}

export const useInfiniteImages = ({
  service,
  mapper,
  perPage = 12,
  enabled = true,
  options,
}: UseInfiniteImagesParams): UseInfiniteImagesReturn => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch: refetchQuery,
  } = useInfiniteQuery<ImagePageData>({
    queryKey: ['images', service.getApiName(), perPage, options],
    queryFn: async ({ pageParam = 1 }): Promise<ImagePageData> => {
      const result = await service.fetchImages(pageParam as number, perPage, options);
      const mappedImages = mapper.mapArrayToExploreImages(result.images);
      
      return {
        images: mappedImages,
        hasMore: result.hasMore,
        page: pageParam as number,
      };
    },
    getNextPageParam: (lastPage: ImagePageData) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const images = data?.pages.flatMap(page => page.images) ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [hasNextPage, isLoading, fetchNextPage]);

  const refetch = useCallback(() => {
    refetchQuery();
  }, [refetchQuery]);

  return {
    images,
    isLoading,
    isError,
    error: error as Error | null,
    hasMore: Boolean(hasNextPage),
    loadMore,
    refetch,
  };
};
