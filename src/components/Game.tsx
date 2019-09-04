import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SelectOption from './SelectOption';
import { Link } from 'react-router-dom';
import {checkAllCardsVisibleState ,getWinningPlayer} from '../utils';
import { Controls, PlayButton } from './game.styles';
import ActivePlayers from './Players';

interface IGame {
    pageNumber: number 
    numberOfPlayers: number
    activePlayers: any[]
    count: number
}

const INITIAL_STATE: IGame = {
    pageNumber: 1,
    numberOfPlayers: 2,
    activePlayers: [],
    count: 0
};

interface iGame {
    location: Location
}

interface Location {
    pathname: string
}

const Game = (props:iGame): JSX.Element => {
    const { location:{ pathname} } = props;
    const gameType = pathname.replace('/','');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'CLEAR_GAME' })
    },[dispatch]);

    const [state, setState] = useState<IGame>(INITIAL_STATE);
    const gameReducer = useSelector((state:any) => state.gameReducer)
    
    const pages = (gameType: string): number => {
        const pageNumber = (gameType === 'starships') ? 4 : 9;
       if(state.pageNumber >= pageNumber) return 1
        return state.pageNumber +1
    }

    const handleClick = (): void => {
        dispatch({ type: 'FETCH_REQUEST', 
        payload: {
            pageNumber: state.pageNumber,
            numberOfPlayers,
            gameType: gameType
        }
     })
        setState({
            ...state,  
            pageNumber: pages(gameType),
        })  

    }
    const handeChange = (players: number): void => {
        dispatch({ type: 'CLEAR_GAME' })
        setState({
            ...state, 
            numberOfPlayers:players
        })  
    }
    const { numberOfPlayers } = state;
    const { starwars, isFetched, error: {message}, activeCards, gameScore } = gameReducer;  
    
    console.log('gameScore', gameScore);
    useEffect(() => {
        const allCardsVisible = checkAllCardsVisibleState(activeCards);
        if(allCardsVisible) {
            console.log('dispatch')
            dispatch({ 
                type: 'GAME_SCORE',
                payload: { 
                    winningPlayers: getWinningPlayer(activeCards),
                    numberOfPlayers
                }
            }) 
        }
    },[dispatch, numberOfPlayers, activeCards]);
    
    return (
        <div>
            <Controls>
                <SelectOption handleChange={handeChange} count={state.numberOfPlayers} />
                <PlayButton onClick={handleClick}>PLAY</PlayButton>
            </Controls>
            
            { isFetched && starwars.length ?
            <ActivePlayers numberOfPlayers={numberOfPlayers} starwars={starwars} />: <div> Ready... </div> }
            {message && <p>Someting went wrong...</p>}
            <div><Link to="/">Home</Link></div>
            <div><Link to="/results">Results</Link></div>
        </div>
    )
};

export default Game;