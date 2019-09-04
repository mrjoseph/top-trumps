import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
interface IGameScoreResults {
    score: number
    player: string
}
const Results = (): JSX.Element => {
    const gameReducer = useSelector((state:any) => state.gameReducer)
    const { gameScore } = gameReducer;
    console.log(gameScore)
    return (
        <div>
            {gameScore.map(({ score, player}: IGameScoreResults) => {
                return (
                    <div>
                        <span>{player}: score {score}</span>
                    </div>
                )
            })}
            <div><Link to="/">Home</Link></div>
        </div>
    )
}

export default Results;