import React from 'react';
import Game from './Game';
import renderer from 'react-test-renderer';
import { Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';

describe('Game', () => {
    it('renders correctly', () => {
        interface IGame {
            location: Location
        }
        interface Location {
            pathname: string
        }

        const props:IGame = {
            location: {
                pathname: 'people/'
            }
        }
        const tree = renderer.create(
            <Router>
            <Provider store={store}>
                <Game {...props}/>
            </Provider>
            </Router>).toJSON();
        expect(tree).toMatchSnapshot();
      });
});