/* eslint-disable max-len */
import React, { useEffect, useContext } from 'react';
import './GameEnded.css';
import texts from '../../texts.json';
import { MyContext } from '../../context/MyProvider';
import { Link } from 'react-router-dom';



const GameEnded = ({ score, currentGame, language, points }) => {

    const { addPointsExtended } = useContext(MyContext);

   

    const addPointsToAlbum = () => {
        
        addPointsExtended(score || points, currentGame, 'two', localStorage.AlbumId)
    }
    const addPointsToConcert = () => {
        
        addPointsExtended(score || points, currentGame, 'two', localStorage.ConcertId)
    }
    const addPointsToMember = () => {
        
        addPointsExtended(score || points, currentGame, 'three', localStorage.memberId)
    }

    return (
        <div>
            <MyContext.Consumer>
                {(context) => {
                    if (currentGame === 'spotify') {
                        return (
                            <div className="game-ended-container">
                                <h1>{texts[language].score.replace('%points', score)}</h1>
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToAlbum}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }

                    if (currentGame === 'youtube') {
                        return (
                            <div className="game-ended-container">
                                 <h1>{texts[language].score.replace('%points', points)}</h1> 
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToConcert}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }

                    if (currentGame === 'instagram') {
                        return (

                            <div className="game-ended-container">
                                <h1>{texts[language].score.replace('%points', points)}</h1>
                                <h3>{texts[language].gameEnded}</h3>
                                <Link to="/"><button type="button" className="suma-puntos-button" onClick={addPointsToMember}>{texts[language].keepPointsPlayMoreText}</button></Link>
                            </div>
                        );
                    }
                    return null;
                }}
            </MyContext.Consumer>
            {/* <div className="social-media-follow-buttons">
                <SocialMedia
                    language={language}
                />
            </div> */}
        </div>

    )
};


export default GameEnded;
