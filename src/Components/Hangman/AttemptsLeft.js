import React from 'react';
import texts from '../../texts.json';

import './AttemptsLeft.css';


const AttemptsLeft = ({ attempts,language }) => {

  return (
    <div className="AttemptsLeft">
      <span>{texts[language].guessesHangman}: <span className="AttemptsLeft-Number">
          {attempts}
        </span>
      </span>
    </div>
  );
}

export default AttemptsLeft;
