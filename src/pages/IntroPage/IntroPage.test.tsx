import { render, screen } from '@testing-library/react';
import IntroPage from './IntroPage'; 

describe('IntroPage Component', () => {
  it('deve renderizar o container e exibir o título de boas-vindas', () => {
    render(<IntroPage />);
    const container = screen.getByTestId('intro-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent('Welcome to Formula Ap1');
  });
});