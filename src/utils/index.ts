import { IGameScoreState } from '../redux/types/types'

export interface IToggleVisibility {
    player: string
    visible: Boolean
}

export interface IState {
    player: string
    card: {
        gameKey: string
        name: string
    }
    visible: Boolean
    winningCard: Boolean
}

export const randomize = (numberOfPlayers: number, arr:any[]): any[] => {
    const { results } = arr[arr.length -1];
    const shuffled = results.sort(function(){return .5 - Math.random()});
    const result = createGenericGameKey(shuffled.slice(0,numberOfPlayers));
    return result;
}

export const calculateWinner = (arr: any[]): string => {
    return arr.map(({ gameKey }) => {
        return (gameKey !== 'unknown') ? parseInt(gameKey.replace(',','')) : 0;
    }).sort((a, b) => b - a)[0].toString();

};

const createGenericGameKey = (cards:any[]): any[] => {
    return cards.map((card) => {
        if(card.mass || card.crew){
            return { ...card, gameKey: card.mass || card.crew}
        }
        return card
    })
}

export const toggleVisibleCardState = (state: IState[] ,arrayOfCards: IToggleVisibility): any[] => {
    const { player: currentPlayer } = arrayOfCards;
    return state.map((item) => {
        const { player } = item;
        if(currentPlayer === player){
            return {
                ...item,
                visible: true,
            }
        }
        return item
    })
}

export const checkAllCardsVisibleState = (state: IState[]): Boolean | null => {
    if(!state.length) return false
    return state.every(({ visible }) => {
        if (visible === true) {
            return true
        }
        return false
    });
}

export const calculateScore = (state:IGameScoreState[], winningPlayers: string[], numberOfPlayers: number): any[] => {
    interface newScoreState {
        score: number
        player: string
    }
    const arr:newScoreState[] = [];
   if(!state.length) {
        for(let i:number = 0; i < numberOfPlayers; i++) {
            arr.push({
                player:`player-${i+1}`,
                score: 0
            })
        }

   }
 const newState = [...state, ...arr];
 
    const result = newState.map(({ score, player }) => {
        if(winningPlayers.indexOf(player) > -1) {
            console.log(score + 1)
            return {
                player: player,
                score: score + 1
            }
        }
        return { score, player }
    })
    
    return result;
}

export const getWinningPlayer = (state: IState[]): any => {
    return state.filter(item => item.winningCard === true)
    .map(item => item.player)  
}