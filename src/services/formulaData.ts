import Race from '../models/Race';
import Response from '../models/Response';
import Season from '../models/Season';
import apiClient from './api';
import type {
  getDriversParam,
  getDriversStandingParam,
  getRacesParam,
  getSeasonsParam,
} from '../interfaces/formulaData.params';
import Driver from '../models/Driver';
import DriverStanding from '../models/DriverStanding';

export interface SeasonRes {
  limit: number;
  offset: number;
  total: number;
  data: Season[];
}

export const getSeasons = async ({
  pageParam,
}: getSeasonsParam): Promise<Response<SeasonRes>> => {
  try {
    const entryLimit = 10;
    const offset = entryLimit * Number(pageParam);
    if (offset < 0) throw Error('Invalid param');
    const result = await apiClient({
      method: 'get',
      url: `/seasons/`,
      params: {
        limit: entryLimit,
        offset: offset,
      },
    });
    const data = result?.data?.MRData?.SeasonTable?.Seasons.map((item: any) =>
      Season.fromJson(item)
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = {
      limit: result.data.MRData.limit,
      offset: result.data.MRData.offset,
      total: result.data.MRData.total,
      data: data.reverse(),
    };

    return new Response(result.status, res);
  } catch (error) {
    console.error(error);
    throw Response.fromException(error);
  }
};

export const getRaces = async ({
  season,
}: getRacesParam): Promise<Response<Race[]>> => {
  try {
    const result = await apiClient({
      method: 'get',
      url: `/${season}/races/`,
    });
    const data = result?.data?.MRData?.RaceTable?.Races.map((item: any) =>
      Race.fromJson(item)
    );

    return new Response(result.status, data);
  } catch (error) {
    console.error(error);
    throw Response.fromException(error);
  }
};

export const getDrivers = async ({
  season,
}: getDriversParam): Promise<Response<Driver[]>> => {
  try {
    const result = await apiClient({
      method: 'get',
      url: `/${season}/drivers/`,
    });
    const data = result?.data?.MRData?.DriverTable?.Drivers.map((item: any) =>
      Driver.fromJson(item)
    );

    return new Response(result.status, data);
  } catch (error) {
    console.error(error);
    throw Response.fromException(error);
  }
};

export const getDriversStanding = async ({
  season,
}: getDriversStandingParam): Promise<Response<DriverStanding[]>> => {
  try {
    const result = await apiClient({
      method: 'get',
      url: `/${season}/driverstandings/`,
    });
    console.log('res: ', result)
    const data =
      result?.data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings?.map(
        (item: any) => DriverStanding.fromJson(item)
      );
    return new Response(result.status, data);
  } catch (error) {
    console.error(error);
    throw Response.fromException(error);
  }
};
