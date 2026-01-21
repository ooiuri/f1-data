import { Box, Typography } from '@mui/material';
import { useWikiImageSuspense } from '../../queries/wiki.query';

const WikipediaImageLoader = ({ articleUrl }: { articleUrl: string }) => {
  const { data: imageUrl } = useWikiImageSuspense(articleUrl);

  if (!imageUrl) {
    return (
      <Box
        sx={{
          height: 200,
          width: 200,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="caption" textAlign="center">
          Unable to find image.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '1 / 1',
        minHeight: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 1,
        bgcolor: 'grey.100',
      }}
    >
      <Box
        component="img"
        src={imageUrl}
        alt="Wikipedia Image of Driver"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
};

export default WikipediaImageLoader;
