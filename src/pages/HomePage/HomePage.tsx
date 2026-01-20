import { useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import Hero from '../../components/Hero/Hero';

import * as S from './styles';
import { useSeasonsInfinityQuery } from '../../queries/seasons.query';
import MenuComponent from '../../components/Menu/Menu';
import { Outlet, useSearchParams } from 'react-router';
import SeasonContext from '../../contexts/SeasonContext';
import Season from '../../models/Season';
import InfoCard from '../../components/InfoCard/InfoCard';

const MENU_MAX_HEIGHT = 250;

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentSeason, setCurrentSeason, setSeasons, seasons } =
    useContext(SeasonContext);
  const handleChangeSeason = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSearchParams({ season: value });
    setCurrentSeason(value);
  };

  useEffect(() => {
    const seasonParam = searchParams.get('season');
    if (seasonParam && seasonParam !== currentSeason) {
      setCurrentSeason(seasonParam);
    }
  });

  const {
    data: seasonsData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSeasonsInfinityQuery();

  useEffect(() => {
    if (!seasonsData) return;
    const flatMap = seasonsData.pages
    .flatMap((item) => item?.data)
    .filter((season): season is Season => season !== undefined);
    if (flatMap.length) {
      setSeasons(flatMap);
    }
  }, [seasonsData]);

  function loadMoreItems(event: any) {
    if (
      event.target.scrollTop ===
      event.target.scrollHeight - MENU_MAX_HEIGHT
    ) {
      if (!isFetching && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    }
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: MENU_MAX_HEIGHT,
        width: 250,
      },
      onScroll: loadMoreItems,
    },
  };

  return (
    <Grid container spacing={2} gap={2}>
      <Hero />
      <S.Container>
        {error && (
          <InfoCard title="Unable to retrieve data, try again later." />
        )}
        <FormControl sx={{ minWidth: '15rem' }}>
          <InputLabel id="season-select-label">Season</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={currentSeason}
            label="season"
            onChange={handleChangeSeason}
            MenuProps={MenuProps}
          >
            {!!seasons &&
              seasons.map((seasonItem) => (
                <MenuItem value={seasonItem.season}>
                  {seasonItem.season}
                </MenuItem>
              ))}
            {isFetchingNextPage && <MenuItem disabled>Loading...</MenuItem>}
          </Select>
        </FormControl>
      </S.Container>
      <MenuComponent currentSeason={currentSeason} />
      <S.Container>
        <Outlet />
      </S.Container>
    </Grid>
  );
}
