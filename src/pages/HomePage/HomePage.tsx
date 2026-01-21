import { useContext, useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import {
  CircularProgress,
  FormControl,
  InputAdornment,
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
import InfoCard from '../../components/InfoCard/InfoCard';

const MENU_MAX_HEIGHT = 250;

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentSeason, setCurrentSeason } = useContext(SeasonContext);

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

  const allSeasons = useMemo(() => {
    if (!seasonsData) return [];
    return seasonsData.pages.flatMap((page) => page?.data ?? []);
  }, [seasonsData]);

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight >= 
      listboxNode.scrollHeight - 5
    ) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const handleChangeSeason = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSearchParams({ season: value });
    setCurrentSeason(value);
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
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: MENU_MAX_HEIGHT,
                  width: 250,
                },
                onScroll: handleScroll,
              },
            }}
            endAdornment={
              isFetching || isFetchingNextPage ? (
                <InputAdornment position="end" sx={{ marginRight: '2rem' }}>
                  <CircularProgress color="inherit" size={20} />
                </InputAdornment>
              ) : null
            }
          >
            {allSeasons.map((seasonItem) => (
              <MenuItem value={seasonItem.season}>{seasonItem.season}</MenuItem>
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
