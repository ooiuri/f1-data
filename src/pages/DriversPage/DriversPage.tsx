import { Box, Skeleton } from '@mui/material';
import { Suspense, useContext } from 'react';
import SeasonContext from '../../contexts/SeasonContext';
import InfoCard from '../../components/InfoCard/InfoCard';
import { useGetDriversQueries } from '../../queries/drivers.query';
import DriverCard from '../../components/DriverCard/DriverCard';
import Masonry from '@mui/lab/Masonry';

const DriversPage = () => {
  const { currentSeason } = useContext(SeasonContext);

  const [drivers] = useGetDriversQueries(currentSeason, !!currentSeason);
  return (
    <Box sx={{ minWidth: 275, width: '100%' }}>
      {!currentSeason ? (
        <InfoCard title="Please, select a season" />
      ) : drivers.isPending || !drivers.data ? (
        <>
          <InfoCard title="Loading drivers data" />
          <Skeleton width={150} height={150}></Skeleton>
        </>
      ) : (
        <>
          <InfoCard title={'Drivers of ' + currentSeason} />
          <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
            {drivers.data.map((driver) => (
              <Suspense key={driver.code} fallback={<Skeleton width={150} height={150} />}>
                <DriverCard driver={driver} key={driver.code} />
              </Suspense>
            ))}
          </Masonry>
        </>
      )}
    </Box>
  );
};

export default DriversPage;
