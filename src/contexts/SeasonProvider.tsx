import { useState, type ReactNode } from 'react';
import SeasonContext from './SeasonContext';
import type ISeasonProviderProps from './ISeasonProviderProps';
import type Season from '../models/Season';

interface SeasonProviderProps {
  children: ReactNode;
}

const SeasonProvider: React.FC<SeasonProviderProps> = ({ children }) => {
  const [currentSeason, setCurrentSeason] = useState<string>('');
  const [seasons, setSeasons] = useState<Season[]>([]);

  const handleSetCurrentSeason = (season: string): void => {
    setCurrentSeason(season);
  };

  const handleSetSeasons = (seasons: Season[]): void => {
    setSeasons(seasons);
  };

  const propsProvider: ISeasonProviderProps = {
    currentSeason,
    setCurrentSeason: handleSetCurrentSeason,
    seasons,
    setSeasons: handleSetSeasons,
  };
  return (
    <SeasonContext.Provider value={propsProvider}>
      {children}
    </SeasonContext.Provider>
  );
};

export default SeasonProvider;
