import { Box, Card, CardContent, Typography } from '@mui/material';
import type Driver from '../../models/Driver';
import WikipediaImageLoader from '../WikiImage/WikiImage';

interface IDriverCard {
  driver: Driver;
}

const DriverCard = ({ driver }: IDriverCard) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            #{driver.permanentNumber} - {driver.code}
          </Typography>
          <Typography variant="h6" component="div">
            {driver.givenName} + {driver.familyName}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            {driver.dateOfBirthFormatted} - {driver.nationality}
          </Typography>
          <WikipediaImageLoader articleUrl={driver.url} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DriverCard;
