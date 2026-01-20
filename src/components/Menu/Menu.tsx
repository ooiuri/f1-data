import { Link, matchPath, useLocation } from 'react-router';
import * as S from './styles';
import { Tab, Tabs } from '@mui/material';

interface MenuComponentProps {
  currentSeason: string | null;
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const MenuComponent = ({ currentSeason = '' }: MenuComponentProps) => {
  const routeMatch = useRouteMatch(['/', '/races', '/drivers']);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <S.Container>
      <Tabs value={currentTab}>
        <Tab
          label="Home"
          value={`/`}
          to={`/`}
          component={Link}
        />
        <Tab
          label="Races"
          value={`/races`}
          to={`/races?season=${currentSeason}`}
          component={Link}
        />
        <Tab
          label="Drivers"
          value={`/drivers`}
          to={`/drivers?season=${currentSeason}`}
          component={Link}
        />
      </Tabs>
    </S.Container>
  );
};

export default MenuComponent;
