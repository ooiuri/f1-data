import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router';
import Root from './root';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import HomePage from '../pages/HomePage';
import IntroPage from '../pages/IntroPage/IntroPage';
import RacesPage from '../pages/RacesPage/RacesPage';
import DriversPage from '../pages/DriversPage/DriversPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route element={<HomePage />}>
          <Route path="/" index element={<IntroPage />} />
        </Route>
        <Route element={<HomePage />}>
          <Route path="/races" element={<RacesPage />} />
          <Route path="/drivers" element={<DriversPage />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
