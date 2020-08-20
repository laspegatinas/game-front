import React, {useState, useEffect} from 'react';
import './VoucherReceived.css';
import { Link } from 'react-router-dom';



    const VoucherReceived = () => {

     
         
    return(
 
    <React.Fragment> 
        
           <div className="downloadedVoucher">
               <h3>Felicitaciones! Seguí jugando para acumular más puntos y canjearlos por más premios!</h3>
               <Link to="/">SEGUIR JUGANDO</Link>          
               <Link to="vouchers">SEGUIR CANJEANDO</Link>          
               <button>VER MI HISTORIAL</button>          
               </div>       
          
            
    </React.Fragment> 
                  
)};

export default VoucherReceived;
