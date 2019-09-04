import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Router, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";

import store from './redux/store';
import './App.css';
import Game from './components/Game';
import Results from './components/Results'

const history = createBrowserHistory()

const NotFound = (): JSX.Element => <div>no game found</div>
const Home = (): JSX.Element => 
  <div>
      <div><Link to="/people">Play as people</Link></div>
      <div><Link to="/starships">Play as starships</Link></div>
  </div>

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Starwars Top Trumps</h1>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/people" component={Game} />
          <Route exact path="/starships" component={Game} />
          <Route exact path="/results" component={Results} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
      </div>
  </Provider>
  );
}
export default App;
