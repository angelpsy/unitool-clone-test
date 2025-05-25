
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  loadMore: () => void;
  rootMargin?: string;
  threshold?: number;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  loadMore,
  rootMargin = '100px',
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const { ref, inView } = useInView({
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, loadMore]);

  return { ref, inView };
};
