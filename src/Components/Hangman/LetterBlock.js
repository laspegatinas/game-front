import React from 'react';
import './LetterBlock.css';

const LetterBlock = ({ value, onClick }) => {
  return (
    <div onClick={onClick} className="LetterBlock">
      <span>
        {value}
      </span>
    </div>
  );
}

export default LetterBlock;
