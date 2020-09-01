import React from 'react';
import Header from './Header.css'
import texts from '../../../texts.json';



const VoucherHeader = ({language}) => {


  return (

    <div>
      {/* <h1 className='headersTxt'>CANJEÁ TUS PUNTOS</h1> */}
      <h1 className='headersTxt'>{texts[language].cashIn}</h1>   
      <p className='headersTxt'>{texts[language].cashGetPrice}</p>
    </div>
  )
};

export default VoucherHeader;
