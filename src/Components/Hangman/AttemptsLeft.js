import React from 'react';
// import { Context } from "../../../Context/Provider";

import './AttemptsLeft.css';


const AttemptsLeft = ({ attempts }) => {
  // const context = React.useContext(Context);
  // const {
  //   state: { language },
  // } = context;
  return (
    <div className="AttemptsLeft">
      <span> atempts: <span className="AttemptsLeft-Number">
          {attempts}
        </span>
      </span>
    </div>
  );
}

export default AttemptsLeft;
