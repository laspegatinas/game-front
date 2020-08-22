import React, {useState, useEffect} from 'react';
import './VoucherReceived.css';
import { Link } from 'react-router-dom';
import ReactToPdf from 'react-to-pdf';



    const VoucherReceived = ({code}) => {

        const ref = React.createRef();
 
         
    return(
 
    <React.Fragment> 

            <div className="voucherWrapper">
           <div  className="downloadedVoucher">    
                <div className="pdf" ref={ref}>        
                    <h3 className="congrats"> Felicitaciones! Seguí jugando para acumular más puntos y canjearlos por más premios!</h3>
                    <h3  className="yourCode">Tú código para canjear: {localStorage.code}</h3>   
                </div>  
                <div className="goNextButtons">
                <Link to="/"><button>Seguir jugando</button></Link>          
                <Link to="vouchers"><button>Seguir Canjeando</button></Link>          
                <Link to ="/user"><button>Ver historial</button></Link>  
                <ReactToPdf targetRef={ref} filename="voucher.pdf">
                    {({toPdf}) => (
                    <button onClick={toPdf}>Generate pdf</button>
                    )}
                </ReactToPdf>
                </div>        
            </div> 
            </div>                 
    </React.Fragment> 
                  
)};

export default VoucherReceived;
