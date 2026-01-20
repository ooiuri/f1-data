import { useInfiniteQuery } from '@tanstack/react-query';
import { getSeasons } from '../services/formulaData';

export const useSeasonsInfinityQuery = () => {
  return useInfiniteQuery({
    queryKey: ['seasons'],
    queryFn: async ({ pageParam }) =>
      getSeasons({ pageParam } as any).then((res) => res.data),
    initialPageParam: 7,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;
      if (lastPage.offset / lastPage.limit < 1) return null;
      return lastPage.offset / lastPage.limit - 1;
    },
    staleTime: Infinity,
  });
};