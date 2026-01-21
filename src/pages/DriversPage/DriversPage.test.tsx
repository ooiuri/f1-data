import { screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router';
import nock from 'nock';
import { renderWithProviders } from '../../tests/test-utils';
import HomePageWrapper from '../HomePage';
import DriversPage from './DriversPage';

const mockSeasons = () => {
  return nock('https://api.jolpi.ca')
    .get('/ergast/f1/seasons/')
    .query(true)
    .reply(200, {
      MRData: {
        SeasonTable: {
          Seasons: [
            { season: '2023', url: '...' },
            { season: '2024', url: '...' },
          ],
        },
      },
    });
};

const mockDriversSeason = (season: string) => {
  return nock('https://api.jolpi.ca')
    .get(`/ergast/f1/${season}/drivers/`)
    .query(true)
    .reply(200, {
      MRData: {
        DriverTable: {
          season,
          Drivers: [
            {
              driverId: 'max_verstappen',
              permanentNumber: '1',
              code: 'VER',
              url: 'https://en.wikipedia.org/wiki/Max_Verstappen',
              givenName: 'Max',
              familyName: 'Verstappen',
              dateOfBirth: '1997-09-30',
              nationality: 'Dutch',
            },
            {
              driverId: 'lewis_hamilton',
              permanentNumber: '44',
              code: 'HAM',
              url: 'https://en.wikipedia.org/wiki/Lewis_Hamilton',
              givenName: 'Lewis',
              familyName: 'Hamilton',
              dateOfBirth: '1985-01-07',
              nationality: 'British',
            },
            {
              driverId: 'albon',
              code: 'ALB',
              givenName: 'Alex',
              familyName: 'Albon',
              url: 'https://en.wikipedia.org/wiki/Alexander_Albon',
            },
          ],
        },
      },
    });
};

const mockWikiSuccess = (title: string) => {
  return nock('https://en.wikipedia.org')
    .get('/w/api.php')
    .query((q) => q.titles === title)
    .reply(200, {
      query: {
        pages: {
          '123': { thumbnail: { source: `https://img.com/${title}.jpg` } },
        },
      },
    });
};

const mockWikiNoImage = (title: string) => {
  return nock('https://en.wikipedia.org')
    .get('/w/api.php')
    .query((q) => q.titles === title)
    .reply(200, {
      batchcomplete: '',
      query: {
        pages: { '66003714': { pageid: 66003714, title: title } },
      },
    });
};

describe('DriversPage Integration', () => {
  const mockSeason = '2024';
  beforeEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  it('Should show select a season when no currentSeason', () => {
    renderWithProviders(<DriversPage />);
    expect(screen.getByText(/Please, select a season/i)).toBeInTheDocument();
  });

  it('Should render DriverCards', async () => {
    mockSeasons();
    mockDriversSeason(mockSeason);

    renderWithProviders(
      <Routes>
        <Route element={<HomePageWrapper />}>
          <Route path="/drivers" element={<DriversPage />} />
        </Route>
      </Routes>,
      `/drivers?season=${mockSeason}`
    );

    expect(
      await screen.findByText(`Drivers of ${mockSeason}`)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Max Verstappen/i)).toBeInTheDocument();
      expect(screen.getByText(/Lewis Hamilton/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/#1 - VER/i)).toBeInTheDocument();
    expect(screen.getByText(/Dutch/i)).toBeInTheDocument();
  });

  it('Should Load Drivers Image', async () => {
    mockSeasons();
    mockDriversSeason(mockSeason);
    mockWikiSuccess('Max_Verstappen');
    mockWikiNoImage('Lewis_Hamilton');
    mockWikiNoImage('Alexander_Albon');

    renderWithProviders(
      <Routes>
        <Route element={<HomePageWrapper />}>
          <Route path="/drivers" element={<DriversPage />} />
        </Route>
      </Routes>,
      `/drivers?season=${mockSeason}`
    );

    expect(await screen.findByText(/Max Verstappen/i)).toBeInTheDocument();

    const img = await screen.findByAltText(/Wikipedia Image of Driver/i);
    expect(img).toHaveAttribute('src', 'https://img.com/Max_Verstappen.jpg');
  });

  it('Should handle when no image is found', async () => {
    mockSeasons();
    mockDriversSeason(mockSeason);
    mockWikiNoImage('Max_Verstappen');
    mockWikiNoImage('Lewis_Hamilton');
    mockWikiNoImage('Alexander_Albon');

    renderWithProviders(
      <Routes>
        <Route element={<HomePageWrapper />}>
          <Route path="/drivers" element={<DriversPage />} />
        </Route>
      </Routes>,
      `/drivers?season=${mockSeason}`
    );

    const noImageMessages = await screen.findAllByText(/Unable to find image/i);
    expect(noImageMessages.length).toBeGreaterThan(0);
  });

  it('Should handle 500 from Wikipedia', async () => {
    mockSeasons();
    mockDriversSeason(mockSeason);
    nock('https://en.wikipedia.org').get(/.*/).reply(500);

    renderWithProviders(
      <Routes>
        <Route element={<HomePageWrapper />}>
          <Route path="/drivers" element={<DriversPage />} />
        </Route>
      </Routes>,
      `/drivers?season=${mockSeason}`
    );

    expect(await screen.findByText(/Alex Albon/i)).toBeInTheDocument();

    const errorPlaceholders =
      await screen.findAllByText(/Unable to find image/i);
    expect(errorPlaceholders[0]).toBeInTheDocument();
  });
});
