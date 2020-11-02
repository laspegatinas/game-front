import React from 'react';
import texts from '../../texts.json';

import { GAME_WON } from './game-states';

import './RestartButton.css';

const RestartButton = ({ onClick, gameState, language }) => {

  return (
    <div className="App-Restart">
      <button onClick={onClick}>
      {texts[language].startHangman}
      </button>
    </div>
  );  
}

export default RestartButton;
