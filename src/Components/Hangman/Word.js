import React from 'react';
import './Word.css';

const Word = ({ children }) => {
  return (
    <div className="Word">
      {children}
    </div>
  );
}

export default Word;
