import React from 'react';
import { Context } from "../../../Context/Provider";

import { GAME_WON } from './game-states';

import './RestartButton.css';

const RestartButton = ({ onClick, gameState }) => {
  const context = React.useContext(Context);
  const {
    state: { language },
  } = context;
  return (
    <div className="App-Restart">
      <button onClick={onClick}>
        {gameState === GAME_WON ? context.state.texts[language].juan.start : context.state.texts[language].juan.start}
      </button>
    </div>
  );  
}

export default RestartButton;
