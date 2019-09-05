import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
interface IGameScoreResults {
    score: number
    player: string
}

interface IGameProps {
    history: History
}
interface History {
    push (value: string): void
}

const Results = (props:IGameProps): JSX.Element | null => {
    console.log();
    const gameReducer = useSelector((state:any) => state.gameReducer)
    const { gameScore } = gameReducer;
    if(gameScore.length) {
           return (
            <div>
                {gameScore.map(({ score, player}: IGameScoreResults) => {
                    return (
                        <div key={player}>
                            <span>{player}: score {score}</span>
                        </div>
                    )
                })}
                <div><Link to="/">Home</Link></div>
            </div>
        ) 
    }
    props.history.push("/")
    return null

}

export default Results;