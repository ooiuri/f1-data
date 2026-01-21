import { Box, Card, CardContent, Skeleton, Typography } from '@mui/material';
import type Driver from '../../models/Driver';
import WikipediaImageLoader from '../WikiImage/WikiImage';
import { Suspense } from 'react';

interface IDriverCard {
  driver: Driver;
}

const DriverCard = ({ driver }: IDriverCard) => {
  return (
    <Box sx={{ minWidth: 200 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            #{driver.permanentNumber} - {driver.code}
          </Typography>
          <Typography variant="h6" component="div">
            {driver.givenName} {driver.familyName}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            {driver.dateOfBirthFormatted} - {driver.nationality}
          </Typography>
          <Suspense
            fallback={
              <Skeleton variant="rectangular" width={200} height={200} />
            }
          >
            <WikipediaImageLoader articleUrl={driver.url} />
          </Suspense>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DriverCard;
