import { Box, Card, CardContent, Typography } from '@mui/material';

interface IInfoCard {
  title: string;
  description?: string;
}

const InfoCard = ({ title, description }: IInfoCard) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" component="div" textAlign="center">
            {title}
          </Typography>
          {description && (
            <Typography
              gutterBottom
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                textAlign: 'center',
              }}
            >
              {description}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default InfoCard;
