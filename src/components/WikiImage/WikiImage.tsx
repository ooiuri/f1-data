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
          alignItems: 'center'
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
      component="img"
      src={imageUrl}
      sx={{ width: 200, height: 'auto', borderRadius: 1 }}
      alt='Wikipedia Image of Driver'
    />
  );
};

export default WikipediaImageLoader;
