import React, { Component, PropTypes } from 'react';

import AttemptsLeft from './AttemptsLeft';
import Letter from './Letter';
import Word from './Word';
import RestartButton from './RestartButton';
import VirtualKeyboard from './VirtualKeyboard';
import hangmanAttempts from './HangmanAttempts';
import texts from '../../texts.json';
import { GAME_WON, GAME_OVER } from './game-states';
import confetti from '../Utils/confetti';
import GameEnded from '../GameEnded/GameEnded'


import './GameContainer.scss';

const GameContainer = ({ timerOn, letters, pastGuesses, gameState, guesses,
 hits, onRestartClick, onLetterClick, language }) => {
  
  const _renderInputPanel = () => {
    const hasAttemptsLeft = guesses > 0;
    const gameWon = gameState === GAME_WON;
    const content = hasAttemptsLeft && timerOn > 0
        ?  (
            <div className="Game-VirtualKeyboard">
              <VirtualKeyboard
                excluded={pastGuesses}
                onClick={onLetterClick}
              />
            </div>
          )
        : _renderGameFinished('GAME OVER', 'Game-GameOver');

    return (
      <div className="Game-InputPanel">
        {_renderWord()}
        <div className="Game-AttemptsLeft">
          <AttemptsLeft attempts={guesses}
          language={language}
           />
        </div>
        {content}
      </div>
    );
  }

      const endIt = () =>{ 
        if(GAME_OVER){ 
            confetti.start();
            setTimeout(() => {
              confetti.stop();
            }, 2000);
            return 
        }
        return endIt()
      }


  const _renderGameFinished = (message, cssClass) => {
    
    return (
      <div className={cssClass}>
        {timerOn===false && hits !== 0 &&
        endIt()
      }
        <RestartButton
          onClick={onRestartClick}
          gameState={gameState}
          language={language}
        />
      </div>
    )
  }

  const _renderWord = () => {
    return (
      <div className="Game-Word">
        <Word>
          {letters.map((letter, i) => {
            const letterValue = (
              letter.guessed
            ) ? letter.value : '_';

            return (
              <Letter
                key={`word-letter-${i}`}
                value={letterValue}
              />
            );
          })}
        </Word>
      </div>
    );
  }

  return (
    <div className="Game-content">
      <div className="Game-SideBySide">
        {_renderInputPanel()}
        <div className="Game-Hangman">
          {hangmanAttempts(guesses)}
        </div>
      </div>
    </div>
  );
}

export default GameContainer;
