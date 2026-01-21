import { useSuspenseQuery } from '@tanstack/react-query';
import { getWikiImage } from '../services/wiki.service';

export const useWikiImageSuspense = (articleUrl: string) => {
  return useSuspenseQuery({
    queryKey: ['wikiImage', articleUrl],
    queryFn: async () => {
      if (!articleUrl) return null;

      const response = await getWikiImage(articleUrl);
      return response.data ?? null;
    },
    staleTime: 1000 * 60 * 60,
    retry: false
  });
};
