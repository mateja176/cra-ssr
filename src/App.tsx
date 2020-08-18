import React from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const LazyHello = Loadable({
  loader: () => import(/* webpackChunkName: "Hello" */ './Hello'),
  loading: () => <div>Loading Hello...</div>,
  modules: ['./Hello'],
  webpack: () => [require.resolveWeak('./Hello')],
});

const LazyLaunches = Loadable({
  loader: () => import(/* webpackChunkName: "SpaceX" */ './SpaceX'),
  loading: () => <div>Loading SpaceX...</div>,
  modules: ['./SpaceX'],
  webpack: () => [require.resolveWeak('./SpaceX')],
});

const Routes = () => (
  <Switch>
    <Route exact path={'/'} render={() => 'SSR'} />
    <Route path={'/hello/:name'} component={LazyHello} />
    <Route path={'/launches'} component={LazyLaunches} />
    <Route render={() => 'Not found'} />
  </Switch>
);

function App() {
  if (typeof window === 'undefined') {
    return <Routes />;
  } else {
    return (
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    );
  }
}

export default App;
