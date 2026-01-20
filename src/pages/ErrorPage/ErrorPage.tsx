import { Button, Typography } from '@mui/material';
import * as S from './styles';
import { NavLink, useRouteError } from 'react-router';
import Hero from '../../components/Hero/Hero';

const ErrorPage = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <S.Container>
      <Hero />
      <Typography variant="h6" component="div">
        Oops! Sorry, something Happened. :/
      </Typography>
      <Button variant="outlined" LinkComponent={NavLink}>
        <S.CustomNavLink to={'/'}>Go back to Home</S.CustomNavLink>
      </Button>
    </S.Container>
  );
};

export default ErrorPage;
