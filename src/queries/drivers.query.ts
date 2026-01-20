import { useQueries } from '@tanstack/react-query';
import { getDrivers } from '../services/formulaData';

export const getDriversQuery = (season: string, enabled: boolean) => ({
  queryKey: ['drivers', season],
  queryFn: async () => getDrivers({ season }).then((res) => res.data),
  staleTime: 20000,
  enabled,
});

export const useGetDriversQueries = (season: string, enabled: boolean) => {
  return useQueries({
    queries: [getDriversQuery(season, enabled)],
  });
};
