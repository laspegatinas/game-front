import React from 'react';
import LettersRow from './LettersRow';
import LetterBlock from './LetterBlock';
import './VirtualKeyboard.css';

const VirtualKeyboard = ({ onClick, excluded = [] }) => {
  const _renderRow = (letters) => {
    const children = letters
      .filter(letter => excluded.indexOf(letter) === -1)
      .map(letter => (
        <LetterBlock
          value={letter}
          onClick={onClick.bind(null, letter)}
          key={`LetterBlock-${letter}`}
        />
      ));

    return (
      <LettersRow>
        {children}
      </LettersRow>
    );
  }

  return (
    <div className="VirtualKeyboard">
      <div key="First" className="VirtualKeyboard-FirstRow">
        {_renderRow(VirtualKeyboard.FIRST_ROW)}
      </div>
      <div key="Second" className="VirtualKeyboard-SecondRow">
        {_renderRow(VirtualKeyboard.SECOND_ROW)}
      </div>
      <div key="Third" className="VirtualKeyboard-ThirdRow">
        {_renderRow(VirtualKeyboard.THIRD_ROW)}
      </div>
    </div>
  );
}

VirtualKeyboard.FIRST_ROW = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
VirtualKeyboard.SECOND_ROW = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
VirtualKeyboard.THIRD_ROW = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

export default VirtualKeyboard;
