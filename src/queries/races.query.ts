import { useQueries } from '@tanstack/react-query';
import {
  // getDriversStanding,
  getRaces,
} from '../services/formula.service';

export const getRaceQuery = (season: string, enabled: boolean) => ({
  queryKey: ['races', season],
  queryFn: async () => getRaces({ season }).then((res) => res.data),
  staleTime: 20000,
  enabled,
});

// export const getDriverStandingQuery = (season: string, enabled: boolean) => ({
//   queryKey: ['driverStandings', season],
//   queryFn: async () => getDriversStanding({ season }).then((res) => res.data),
//   staleTime: 20000,
//   enabled,
// });

export const useGetRacesQueries = (season: string, enabled: boolean) => {
  return useQueries({
    queries: [
      getRaceQuery(season, enabled),
      // getDriverStandingQuery(season, enabled),
    ],
  });
};
