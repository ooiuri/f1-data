import { useState, useEffect } from 'react';

// TODO: Google Example of how to GET Wikipedia Image, needs to turn into React Query + Hooks

interface IWikipediaImageLoader {
  articleUrl: string;
}

const WikipediaImageLoader = ({ articleUrl }: IWikipediaImageLoader) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchWikiImage = async () => {
    try {
      // 1. Extract the article title from the URL (simple example)
      const parts = articleUrl.split('/');
      const articleTitle = parts[parts.length - 1];

      // 2. Construct the Wikipedia API URL to get page images
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=200&origin=*&titles=${articleTitle}`;

      // 3. Fetch data from the API
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // 4. Parse the response to find the image URL
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const thumbUrl = pages[pageId].thumbnail?.source;

      if (thumbUrl) {
        setImageUrl(thumbUrl);
      } 
    } catch (err) {
      console.error(err);
      setError(err as string)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (articleUrl) {
      fetchWikiImage();
    }
  }, [articleUrl]); // Rerun when the URL changes

  if (loading) return <div>Loading image...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="From Wikipedia article"
        //   width={200}
          width={200}
        />
      ) : (
        <div>Image not available</div>
      )}
    </div>
  );
};

export default WikipediaImageLoader;
