import { 
    toggleVisibleCardState,
    IToggleVisibility,
    IState,
    checkAllCardsVisibleState,
    calculateScore,
    getWinningPlayer
} from './';


describe('toggleVisibleCardState', () => {
    it('should change the score of the player', () => {
 
        const toggleCardVisibility: IToggleVisibility = {
            player: "player-2",
            visible: true
        };
        const currentState: IState[] = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: false
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: false, 
                visible: false
            } 
        ]
 
        const expectedResult = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: false
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: false, 
                visible: true
            }    
        ];
        expect(toggleVisibleCardState(currentState,toggleCardVisibility)).toEqual(expectedResult)
    });

});

describe('checkAllCardsVisibleState', () => {
    it('should return true if all cards are true', () => {
        const currentState: IState[] = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: true
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: false, 
                visible: true
            } 
        ]
        expect(checkAllCardsVisibleState(currentState)).toEqual(true)
    });

    it('should return false if at least one cards are false', () => {
        const currentState: IState[] = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: true
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: false, 
                visible: false
            } 
        ]
        expect(checkAllCardsVisibleState(currentState)).toEqual(false)
    });
})
describe('getWinningPlayer', () => {
    it('should get one single winning player', () => {
        const activeCards: IState[] = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: true
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: false, 
                visible: false
            } 
        ]
        expect(getWinningPlayer(activeCards)).toEqual(["player-1"])
    })
    it('should get multiple winning players', () => {
        const activeCards: IState[] = [
            {
                player: "player-1",
                card: {
                    gameKey: '123',
                    name: 'OB1'
                },
                winningCard: true,
                visible: true
            },
            {
                player: "player-2",
                card: {
                    gameKey: '123',
                    name: 'Darth Vador'
                },
                winningCard: true, 
                visible: false
            } 
        ]
        expect(getWinningPlayer(activeCards)).toEqual(['player-1', 'player-2'])
    })
});
describe('calculateScore', () => {
    it('should start to keep score of game', () => {

        const winners: string[] = ['player-1', 'player-2'];
        const numberOfPlayers = 3;
        
        const state:any = [];
        const expected = [
            {
                player: 'player-1',
                score: 1
            },
            {
                player: 'player-2',
                score: 1
            },
            {
                player: 'player-3',
                score: 0
            }
        ]
        expect(calculateScore(state, winners, numberOfPlayers)).toEqual(expected)
    });
    it('should keep score of', () => {

        interface IScore {
            player: string
            score: number
        }

        const winnerPlayer: string[] = ['player-1'];
        const numberOfPlayers: number = 3;
        const state: IScore[] = [
            {
                player: 'player-1',
                score: 0
            },
            {
                player: 'player-2',
                score: 2
            },
            {
                player: 'player-3',
                score: 3
            }
        ];
        const expected = [
            {
                player: 'player-1',
                score: 1
            },
            {
                player: 'player-2',
                score: 2
            },
            {
                player: 'player-3',
                score: 3
            }
        ]
        expect(calculateScore(state, winnerPlayer, numberOfPlayers)).toEqual(expected)
    });
})