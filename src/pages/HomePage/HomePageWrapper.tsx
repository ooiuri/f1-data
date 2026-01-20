import SeasonProvider from '../../contexts/SeasonProvider';
import HomePage from './HomePage';

const HomePageWrapper: React.FC = () => {
  return (
    <SeasonProvider>
      <HomePage/>
    </SeasonProvider>
  );
};

export default HomePageWrapper;
