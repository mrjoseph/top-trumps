import ActivePlayers from "../../components/Players";

export const FETCH_DATA_ACTION = 'FETCH_DATA_ACTION';

export interface Starwars {
  name: string
  birth_year: string 
  eye_color: string 
  gender: string 
  hair_color: string 
  height: string
  mass: string 
  skin_color: string
  homeworld: string
  films: string[]
  species: string[]
  starships: string[]
  vehicles: string[] 
  url: string
  created: string
  edited: string
}
export interface GameState {
  starwars: Starwars[]
  isFetching: Boolean
  isFetched: Boolean
  isErrored: Boolean
  error: Object
  activePlayers: any[]
  activeCards: any
  cardState: any
  gameScore: IGameScoreState[]
}

export interface IGameScore {
  winningPlayers: string[]
  numberOfPlayers: number
}
export interface IGameScoreState {
  score: number
  player: string
}

export interface ActivePlayers {
  player: string
  winner: true
}

export interface State {
  starwars: Starwars[]
}

export interface ActiveCards {
  player: string
  card: Card
  visible: Boolean
  winningCard: Boolean
}

export interface FlipCards {
  player: string
  visible: Boolean
}

export interface Card {
  gameKey: string
  name: string
}
