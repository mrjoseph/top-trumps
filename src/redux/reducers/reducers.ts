import { 
    GameState,
    Starwars,
    ActiveCards,
    FlipCards,
    IGameScore 
} from '../types/types';

import { 
    FETCH_REQUEST,
    FETCH_ERROR,
    FETCH_SUCCESS,
    CLEAR_GAME,
    ACTIVE_CARDS,
    FLIP_CARDS,
    GAME_SCORE 
} from '../actions/actions';

import { toggleVisibleCardState, calculateScore } from '../../utils';
interface FetchRequestAction {
    type: 'FETCH_REQUEST'
    payload: number
}

interface FetchSuccessAction {
    type: 'FETCH_SUCCESS'
    payload: Starwars
}

interface FetchErrorAction {
    type: 'FETCH_ERROR'
    payload: Object
}

interface ClearGameAction {
    type: 'CLEAR_GAME'
}

interface ActiveCardAction {
    type: 'ACTIVE_CARDS'
    payload: ActiveCards
}

interface FlipCardsAction {
    type: 'FLIP_CARDS'
    payload: FlipCards
}

interface GameScoreAction {
    type: 'GAME_SCORE'
    payload: IGameScore
}

export type GameActionTypes = 
FetchRequestAction | 
FetchSuccessAction | 
FetchErrorAction | 
ClearGameAction | 
FlipCardsAction |
GameScoreAction |
ActiveCardAction;

export const initialState: GameState = {
    starwars: [],
    isFetching: true,
    isFetched: false,
    isErrored: false,
    error: {},
    activePlayers: [],
    activeCards: [],
    cardState: [],
    gameScore: []
  }

export const gameReducer = (state = initialState, action: GameActionTypes):
    GameState => {
        switch(action.type) {
            case FETCH_REQUEST:
                return {
                    ...state,
                    isFetching: true,
                    isFetched: false,
                    isErrored: false,
   
                }
            case FETCH_SUCCESS:
                return {
                    ...state,
                    starwars: [...state.starwars, action.payload],
                    isFetching: false,
                    isFetched: true,               
                }
            case FETCH_ERROR:           
                return {
                    ...state,
                    isFetching: false,
                    isErrored: true,
                    error: {
                        message: action.payload
                    }
                }  
            case ACTIVE_CARDS:
                return {
                    ...state,
                    activeCards: action.payload
                    
                }
            case FLIP_CARDS:
                return {
                    ...state,
                    activeCards: toggleVisibleCardState(state.activeCards,action.payload)
                }
            case GAME_SCORE: 
            const { winningPlayers, numberOfPlayers } = action.payload;         
                return {
                    ...state,
                    gameScore: calculateScore(state.gameScore, winningPlayers, numberOfPlayers)
                }
            case CLEAR_GAME:              
                return {
                    ...state,
                    starwars: [], 
                    activeCards: [],
                    gameScore: []
                }               
            default:
                return state
                
        }
        
}