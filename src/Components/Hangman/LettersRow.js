import React from 'react';
import './LettersRow.css';

const LettersRow = ({ children }) => {
  return (
    <div className="LettersRow">
      {children}
    </div>
  );
}

export default LettersRow;
