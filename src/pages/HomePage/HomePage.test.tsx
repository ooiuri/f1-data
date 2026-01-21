import { screen, fireEvent, waitFor } from '@testing-library/react';
import nock from 'nock';
import HomePage from './HomePage';
import { renderWithProviders } from '../../tests/test-utils';

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

describe('HomePage Integration', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('Should fetch and show seasons', async () => {
    const scope = mockSeasons();

    renderWithProviders(<HomePage />);

    const selectLabel = screen.getByLabelText(/Season/i);
    fireEvent.mouseDown(selectLabel);

    const option2023 = await screen.findByText('2023', {}, { timeout: 3000 });
    expect(option2023).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });

    expect(scope.isDone()).toBe(true);
  });
});
