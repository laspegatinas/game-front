/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import './Button.css';
import Confetti from 'react-confetti';

const Button = ({ printedSong, currentSong, onClick, action }) => {

    const [hasBeenClicked, makeButtonClicked] = useState(false);

    const isCorrect = printedSong === currentSong;

  
   

    const onClickHandler = () => {

        makeButtonClicked(true);

       // onClick();
    };

    let colorClass = 'colorClass';


    if (isCorrect === true) {
        colorClass = 'green';
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
            {isCorrect &&
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                gravity={0.6}
            />
        } 
                
            
                <button
                    type="button"
                    onClick={action}
                    className={`myButton button ${colorClass}`}
                >
                    {printedSong}
                </button>
        </div>
    );
};


export default Button;
