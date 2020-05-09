import React, { FC, lazy, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import './styles.scss';

const HomePage = lazy(() => import('../../pages/HomePage'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

const App: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <main className="main-content">
          <Switch>
            <Route path="/" exact strict component={HomePage} />
            <Route path="/search" exact strict component={SearchPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Suspense>
  </BrowserRouter>
);

export default hot(App);
