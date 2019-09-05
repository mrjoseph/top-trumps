import { 
    toggleVisibleCardState,
    IToggleVisibility,
    IState,
    checkAllCardsVisibleState,
    calculateScore,
    getWinningPlayer,
    randomize,
    calculateWinner,
    createGenericGameKey
} from './';


describe('randomize', () => {
    it('should select x number of people cards at random', () => {
        const currentState: object[] = [{
            count: 87,
            next: "https://swapi.co/api/people/?page=2",
            previous: null,
            results : [{
                birth_year: "19BBY",
                created: "2014-12-10T15:20:09.791000Z",
                edited: "2014-12-20T21:17:50.315000Z",
                eye_color: "brown",
                films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
                gender: "female",
                hair_color: "brown",
                height: "150",
                homeworld: "https://swapi.co/api/planets/2/",
                mass: "49",
                name: "Leia Organa",
                skin_color: "light",
                species: ["https://swapi.co/api/species/1/"],
                starships: [],
                url: "https://swapi.co/api/people/5/",
                vehicles: ["https://swapi.co/api/vehicles/30/"]
            },
            {
                birth_year: "19BBY",
                created: "2014-12-10T15:20:09.791000Z",
                edited: "2014-12-20T21:17:50.315000Z",
                eye_color: "brown",
                films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
                gender: "female",
                hair_color: "brown",
                height: "150",
                homeworld: "https://swapi.co/api/planets/2/",
                mass: "46",
                name: "C-3PO",
                skin_color: "light",
                species: ["https://swapi.co/api/species/1/"],
                starships: [],
                url: "https://swapi.co/api/people/5/",
                vehicles: ["https://swapi.co/api/vehicles/30/"]
            },
            {
                birth_year: "19BBY",
                created: "2014-12-10T15:20:09.791000Z",
                edited: "2014-12-20T21:17:50.315000Z",
                eye_color: "brown",
                films: ["https://swapi.co/api/films/2/", "https://swapi.co/api/films/6/", "https://swapi.co/api/films/3/", "https://swapi.co/api/films/1/", "https://swapi.co/api/films/7/"],
                gender: "female",
                hair_color: "brown",
                height: "150",
                homeworld: "https://swapi.co/api/planets/2/",
                mass: "77",
                name: "Wedge Antilles",
                skin_color: "light",
                species: ["https://swapi.co/api/species/1/"],
                starships: [],
                url: "https://swapi.co/api/people/5/",
                vehicles: ["https://swapi.co/api/vehicles/30/"]
            }
        ]
        }]
        const numberOfPlayers = 2;
        expect(randomize(numberOfPlayers, currentState)).toHaveLength(2);
    });
});
describe('calculateWinner', () => {
    it('should calculate the winner', () => {
        const currentState: object[] = [{
                gameKey: '49',
                mass: "49",
            },
            {
                gameKey: '46',
                mass: "46",
            }
        ]

        expect(calculateWinner(currentState)).toEqual('49');
    });

    it('should return 0 as a score if value is unknown', () => {
        const currentState: object[] = [{
                gameKey: 'unknown',
                mass: "unknown",
            },
            {
                gameKey: 'unknown',
                mass: "unknown",
            }
        ]

        expect(calculateWinner(currentState)).toEqual('0');
    });
});
describe('createGenericGameKey', () => {
    it('should generate a generic key for crew to hold the winning value', () => {
        const currentState: object[] = [{
            crew: "5",
        },
        {
            crew: "6",
        }
    ]
    const expected: object[] = [{
            gameKey: '5',
            crew: "5",
        },
        {
            gameKey: '6',
            crew: "6",
        }
    ]
    expect(createGenericGameKey(currentState)).toEqual(expected);
    })
    it('should generate a generic key for mass to hold the winning value', () => {
        const currentState: object[] = [{
            mass: "49",
        },
        {
            mass: "46",
        }
    ]
    const expected: object[] = [{
            gameKey: '49',
            mass: "49",
        },
        {
            gameKey: '46',
            mass: "46",
        }
    ]
    expect(createGenericGameKey(currentState)).toEqual(expected);
    })

    it('should not generate a generic key', () => {
        const currentState: object[] = [{},{}]
    const expected: object[] = [{},{}]
    expect(createGenericGameKey(currentState)).toEqual(expected);
    })
});
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

    it('should return false if all cards are false', () => {
        const currentState: IState[] = []
        expect(checkAllCardsVisibleState(currentState)).toEqual(false)
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