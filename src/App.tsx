import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const LazyHello = Loadable({
  loader: () => import(/* webpackChunkName: "Hello" */ './Hello'),
  loading: () => <div>Loading...</div>,
});

const Routes = () => (
  <Switch>
    <Route exact path={'/'} render={() => 'SSR'} />
    <Route path={'/hello/:name'} component={LazyHello} />
    <Route render={() => 'Not found'} />
  </Switch>
);

function App() {
  return typeof window === 'undefined' ? (
    <Routes />
  ) : (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
