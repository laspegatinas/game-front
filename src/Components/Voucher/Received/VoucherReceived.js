import React, {useState, useEffect} from 'react';
import './VoucherReceived.css';
import { Link } from 'react-router-dom';



    const VoucherReceived = () => {

     
         
    return(
 
    <React.Fragment> 
        
           <div className="downloadedVoucher">
               <h3 className="congrats"> Felicitaciones! Seguí jugando para acumular más puntos y canjearlos por más premios!</h3>
               <div className="goNextButtons">
                <Link to="/"><button> SEGUIR JUGANDO</button></Link>          
                <Link to="vouchers"><button> SEGUIR Canjeando</button></Link>          
                <Link to ="/user"><button>Ver historial</button></Link>  
               </div>        
            </div>       
          
            
    </React.Fragment> 
                  
)};

export default VoucherReceived;
