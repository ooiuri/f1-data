import { createContext } from 'react';
import type ISeasonProviderProps from './ISeasonProviderProps';

const SeasonContext = createContext<ISeasonProviderProps>({
  currentSeason: '',
  setCurrentSeason: () => undefined,
  seasons: [],
  setSeasons: () => undefined,
});

export default SeasonContext;
