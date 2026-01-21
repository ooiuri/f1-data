import { Typography } from '@mui/material';
import * as S from './styles';
import CreditsCard from '../../components/CreditsCard/CreditsCard';

const IntroPage = () => {
  return (
    <S.Container data-testid="intro-container">
      <S.TitleContainer>
        <Typography variant="h6" component="div">
          Welcome to Formula Ap1
        </Typography>
        <Typography variant="body1" component="div">
          Select a Season and Navigate to Races and Drivers to see Formula 1
          historical data.
        </Typography>
      </S.TitleContainer>
      <CreditsCard />
    </S.Container>
  );
};

export default IntroPage;
