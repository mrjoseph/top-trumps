import React, { useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { randomize, calculateWinner , checkAllCardsVisibleState} from '../utils';
import { Cards, CardsContainer, CardTitle, CardDetails } from './game.styles';
import { ActiveCards } from '../redux/types/types';

interface IActivePlayer {
    numberOfPlayers: number
    starwars:any[]
}
interface Itheme {
    background: string
    color: string
}


const ActivePlayers = ({ numberOfPlayers, starwars }: IActivePlayer ): JSX.Element | null => {  
    const dispatch = useDispatch();
    const gameReducer = useSelector((state:any) => state.gameReducer)
    const { activeCards } = gameReducer;
    let theme: Itheme;

    useEffect(() => {
        const selected = randomize(numberOfPlayers, starwars);
        const winner = calculateWinner(selected)
        const cards = selected.map(({ gameKey, name}, i) => 
        ({
            player:`player-${i+1}`,
            card: {
                gameKey,
                name
            },
            winningCard: (gameKey.replace(',','') === winner) ? true : false,
            visible: false
        }));

        dispatch({ 
            type: 'ACTIVE_CARDS',
            payload: cards
        })
    },[dispatch, numberOfPlayers, starwars]);

    const allCardsVisible = checkAllCardsVisibleState(activeCards);
    
    const onClick = (event: MouseEvent<HTMLButtonElement>, player: string, winningCard: Boolean):void => {
        event.preventDefault(); 
        
        dispatch({ 
            type: 'FLIP_CARDS',
            payload: { player }
        })
    }
    
    return (
        <CardsContainer>
        {activeCards.map(({ player, card: { gameKey, name}, winningCard, visible }: ActiveCards ) => {
            theme = { 
                background: (winningCard && allCardsVisible) ? 'green' : '#fff',
                color: (winningCard && allCardsVisible) ? '#fff': '#000'
            };
            return (
                <Cards key={player}>
                <CardTitle> {player.replace('-', ' ')} </CardTitle>
                <CardDetails theme={theme}>
                    {visible && <> 
                        <div> {name} </div>
                        <div> {gameKey} </div>
                    </>}
                    {!visible && <button onClick={(event) => onClick(event, player, winningCard)}>turn card over</button>}
                    
                </CardDetails>
                </Cards>
            )
        })}</CardsContainer>
    );
};

export default ActivePlayers;