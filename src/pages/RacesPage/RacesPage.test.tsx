import { screen, waitFor } from '@testing-library/react';
import nock from 'nock';
import { renderWithProviders } from '../../tests/test-utils';
import RacesPage from './RacesPage';
import HomePageWrapper from '../HomePage';
import { Route, Routes } from 'react-router';

const mockSeasons = () => {
  return nock('https://api.jolpi.ca/')
    .get('/ergast/f1/seasons/')
    .query(true)
    .reply(200, {
      MRData: {
        limit: '30',
        offset: '0',
        total: '77',
        SeasonTable: {
          Seasons: [
            { season: '2023', url: 'http://example.com' },
            { season: '2024', url: 'http://example.com' },
          ],
        },
      },
    });
};

const mockRacesSeason = (season: string) => {
  return nock('https://api.jolpi.ca/')
    .get(`/ergast/f1/${season}/races/`)
    .query(true)
    .reply(200, {
      MRData: {
        RaceTable: {
          season: season,
          Races: [
            {
              round: '1',
              raceName: 'Bahrain Grand Prix',
              date: '2024-03-02',
              Circuit: { circuitName: 'Bahrain International Circuit' },
            },
            {
              round: '2',
              raceName: 'Saudi Arabian Grand Prix',
              date: '2024-03-09',
              Circuit: { circuitName: 'Jeddah Corniche Circuit' },
            },
          ],
        },
      },
    });
};

describe('RacesPage Integration', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  it('Should show "Please, select a season" when no currentSeason', () => {
    renderWithProviders(<RacesPage />);

    expect(screen.getByText(/Please, select a season/i)).toBeInTheDocument();
  });

  it('Should correctly load races', async () => {
    const mockSeason = '2024';
    mockSeasons();
    mockRacesSeason(mockSeason);

    renderWithProviders(
      <Routes>
        <Route element={<HomePageWrapper />}>
          <Route path="/races" element={<RacesPage />} />
        </Route>
      </Routes>,
      `/races?season=${mockSeason}`
    );

    expect(screen.getByText(`Races of ${mockSeason}`)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('Bahrain Grand Prix')).toBeInTheDocument();
        expect(
          screen.getByText('Saudi Arabian Grand Prix')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
