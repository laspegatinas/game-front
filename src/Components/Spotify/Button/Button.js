/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import './Button.css';


const Button = ({ printedSong, currentSong, onClick, action, songName }) => {

    const [hasBeenClicked, makeButtonClicked] = useState(false);
    const [spotifyScore, setSpotifyScore] = useState(0)

    const isCorrect = printedSong === currentSong;

  
   

    const onClickHandler = () => {

        makeButtonClicked(true);

       // onClick();
    };

    let colorClass = 'colorClass';


    if (isCorrect === true) {
        colorClass = 'green';
       // setSpotifyScore(spotifyScore + 10);
    }

    if (isCorrect === false && hasBeenClicked === true) {
        colorClass = 'red';
    }

    if (isCorrect === false && hasBeenClicked === false) {
        colorClass = 'gray';
    }

    return (
        
            // CONFETTI logic to show the confetti component, we only show the confetti component if (and only if) the confetti variable is true
            // CONFETTI check the confetti package and the demo related on their webpage to understand and play around with the props I used
        <div>   
         
                
            
                <button
                    type="button"
                    id={songName}
                    onClick={action}
                    className={`myButton button ${colorClass}`}
                >
                    {printedSong}
                </button>
        </div>
    );
};


export default Button;
