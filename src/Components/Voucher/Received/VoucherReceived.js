import React, {useState, useEffect} from 'react';
import './VoucherReceived.css';
import { Link } from 'react-router-dom';
import ReactToPdf from 'react-to-pdf';
import texts from '../../../texts.json';



    const VoucherReceived = ({code, language}) => {

        const ref = React.createRef();
 
         
    return(
 
    <React.Fragment> 

        <div className="voucherWrapper">
           <div  className="downloadedVoucher">    
                <div className="pdf" ref={ref}>        
                 <h3 className="congrats">{texts[language].congrats}</h3>
                    <h3  className="yourCode">{texts[language].yourCode} {localStorage.code}</h3>   
                </div>  
                <div className="goNextButtons">
                <Link to="/"><button>{texts[language].continuePlay}</button></Link>          
                <Link to="vouchers"><button>{texts[language].continueRedeem}</button></Link>          
                <Link to ="/user"><button>{texts[language].history}</button></Link>  
                <ReactToPdf targetRef={ref} filename="voucher_pegatina.pdf">
                    {({toPdf}) => (
                    <button onClick={toPdf}>{texts[language].download}</button>
                    )}
                </ReactToPdf>
                </div>        
            </div> 
        </div>                 
    </React.Fragment> 
                  
)};

export default VoucherReceived;
