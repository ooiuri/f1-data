import Season from '../models/Season';

export default interface ISeasonProviderProps {
  currentSeason: string;
  setCurrentSeason: (season: string) => void;
  seasons: Season[];
  setSeasons: (seasons: Season[]) => void;
}
