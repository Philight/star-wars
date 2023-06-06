import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';

import LandingLayout from '@layouts/LandingLayout';
import AvatarsLayout from '@layouts/AvatarsLayout';
import DetailLayout from '@layouts/DetailLayout';

import DataProvider from '@contexts/DataProvider';

const LandingPage = lazy(() => import('@pages/LandingPage'));
const AvatarsPage = lazy(() => import('@pages/AvatarsPage'));
const DetailPage = lazy(() => import('@pages/DetailPage'));

import Loader from '@components/graphic/Loader';
import ScrollToTop from '@components/util/ScrollToTop';
import PACKAGE_JSON from '@/../package.json';

const SuspenseWrapper = () => (
  <Suspense fallback={<Loader />}>
    <Outlet />
  </Suspense>
);

const App = () => {
  return (
    <BrowserRouter basename={PACKAGE_JSON.BASENAME}>
      <ScrollToTop>
        <DataProvider>
          <Routes>
            <Route element={<SuspenseWrapper />}>
              <Route path='/' element={<LandingLayout Page={LandingPage} />} />
              <Route path='/avatars' element={<AvatarsLayout Page={AvatarsPage} />} />
              <Route path='/detail/character/:id' element={<DetailLayout Page={DetailPage} />} />
            </Route>
          </Routes>
        </DataProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
