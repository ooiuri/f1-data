import { Typography, styled } from '@mui/material';

export const Container = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: radial-gradient(ellipse 80% 50% at 50% -20%, hsl(7, 100%, 16%), transparent);
  background-repeat: no-repeat;
  transition: all 0.2 ease;

  padding-top: 5rem;
`;

export const HeroTitle = styled(Typography)`
  font-style: italic;
  display: inline-block;
`;

export const HeroSpan = styled('span')`
    color: white;
`;