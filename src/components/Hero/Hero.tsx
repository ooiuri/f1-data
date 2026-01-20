import * as S from './styles';

export default function Hero() {
  return (
    <S.Container id="hero">
      <S.HeroTitle variant="h1" fontWeight={'bold'} color='red' className='hover-underline'>
        F
        <S.HeroSpan>
            ormula{' '}Ap
        </S.HeroSpan>
          1
      </S.HeroTitle>
    </S.Container>
  );
}
