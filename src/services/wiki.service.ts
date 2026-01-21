import Response from '../models/Response';
import apiWiki from './apiWiki';
export const getWikiImage = async (
  articleUrl: string
): Promise<Response<string | null>> => {
  if (!articleUrl) return new Response(200, null);

  try {
    const articleTitle = articleUrl.split('/').pop();

    const result = await apiWiki.get('api.php', {
      params: {
        action: 'query',
        prop: 'pageimages',
        pithumbsize: 200,
        titles: articleTitle,
      },
    });

    const pages = result?.data?.query?.pages;
    if (!pages) return new Response(result.status, null);

    const pageId = Object.keys(pages)[0];

    const imageUrl = pages[pageId]?.thumbnail?.source || null;

    return new Response(result.status, imageUrl);
  } catch (error) {
    return new Response(500, null);
  }
};
