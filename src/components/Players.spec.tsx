import React from 'react';
import ActivePlayers, { IActivePlayer } from './Players';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../redux/store';

describe('ActivePlayers', () => {
    it('renders correctly', () => {
        const props:IActivePlayer = {
            numberOfPlayers: 0,
            starwars: []
        }
        const tree = renderer.create(
            <Router>
            <Provider store={store}>
                <ActivePlayers  {...props}/>
            </Provider>
            </Router>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});