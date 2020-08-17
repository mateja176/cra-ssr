import { createBrowserHistory, createMemoryHistory } from 'history';
import React from 'react';
import Loadable from 'react-loadable';
import { Route, Router, Switch } from 'react-router-dom';
import './App.css';

const LazyHello = Loadable({
  loader: () => import(/* webpackChunkName: "myNamedChunk" */ './Hello'),
  loading: () => <div>Loading...</div>,
});

const history =
  typeof window === 'undefined'
    ? createMemoryHistory()
    : createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={'/'} render={() => 'SSR'} />
        <Route path={'/hello/:name'} component={LazyHello} />
        <Route render={() => 'Not found'} />
      </Switch>
    </Router>
  );
}

export default App;
