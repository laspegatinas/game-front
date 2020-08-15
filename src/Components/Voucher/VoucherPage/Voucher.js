import React, {useState, useEffect} from 'react';
import VoucherCard from '../VoucherCard/VoucherCard';
import Vouchers from '../Vouchers.json';
import VoucherHeader from '../Header/VoucherHeader';
import VoucherPopUp from '../VoucherPopUp/VoucherPopUp';


    const Voucher = () => {

        const [vouchers, setVouchers] = useState([]);
        const [chosenVoucher, setChosenVoucher] = useState([]);
        const [choseVoucher, setToChosen] = useState(false);

            
        useEffect( () => {
            setVouchers(Vouchers['vouchers']);
          }, []); 

        const selectVoucher = (event) => {
            event.preventDefault();
            const voucherIndex = event.target.id;
            const selectedVoucher = vouchers[voucherIndex];
            let myVoucher = [...chosenVoucher];
             myVoucher.push(selectedVoucher);
             setChosenVoucher(myVoucher);
             console.log(myVoucher);
             setToChosen(true);
           
        };  
       
        //different hidden fields with all existing vouchers, only selected gets shown
    return(
 
    <React.Fragment> 
        <VoucherHeader/>
            <div>          
                {
                vouchers.map((vouch, index) => 
                <VoucherPopUp  key={index} id={index} image={vouch.image} title={vouch.title} text={vouch.text}                                        
                                action={selectVoucher}/>)               
                }           
            </div>                   
                <div>                      
                    {chosenVoucher.map((voucher, index) => 
                    <section>
                        <h2 key={index} >{voucher.title} {voucher.text} </h2>
                        <img src={voucher.image}></img>
                    </section>)
                    }                  
                </div>        
    </React.Fragment> 
                  
)};

export default Voucher;
