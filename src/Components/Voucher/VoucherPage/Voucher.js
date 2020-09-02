import React, { useState, useEffect } from 'react';
import VoucherHeader from '../Header/VoucherHeader';
import { Link } from 'react-router-dom';
import VoucherCards from '../VoucherCards/VoucherCards';
import { MyContext } from '../../../context/MyProvider';
import Api from '../../../Api/index';
import './Voucher.css';
import texts from '../../../texts.json';


const Voucher = ({language}) => {

        const [vouchers, setVouchers] = useState([]);
        const [chosenVoucher, setChosenVoucher] = useState();
        const [loaded, setLoaded] = useState(false);
        const [choseVoucher, setToChosen] = useState(false);
        const { state: { user}} = React.useContext(MyContext);
         
        // useEffect(async () => {
        //     await   Api.getProducts().then( async (resp) => {
                  
        //         console.log(resp.data);
        //         let myVouchers = [...vouchers];
        //         myVouchers.push(resp.data['5f401d0f39c180001777b4be']);
        //         myVouchers.push(resp.data['5f401d1639c180001777b4bf']);
        //         myVouchers.push(resp.data['5f401d2739c180001777b4c0'])
        //         setVouchers(myVouchers);
        //       
        //             setLoaded(true);   
        //        
                                                      
        //     });
            
        //    // setVouchers(Vouchers['vouchers']);
        //   }, []); 
     

        const getMyProducts = async () => {
            await   Api.getProducts().then((resp) => {                
                let response = resp.data;
                let allVouchers = Object.values(response);
                setVouchers(allVouchers);               
                    setLoaded(true);                                                                  
            });
          }; 

        const selectVoucher = (event) => {        
            const voucherIndex = event.target.id;
            const selectedVoucher = vouchers[voucherIndex];
            setChosenVoucher(selectedVoucher);  
            setToChosen(true);    
        }; 

       const chooseProduct = async  () => {         
            // let d = new Date();
            // let m = d.getMonth() + 1;
            // let day = d.getDate();
            // let y = d.getFullYear();           
            await   Api.buyProduct({
                    'reference' : chosenVoucher.reference,
                    'qty': 1,
                    'user': user,
                }).then( (resp) =>{
                    console.log(resp)
                localStorage.setItem('code', resp.data.voucher.code); 
                ;
            });
         //updateVoucherHistory(`fecha: ${`${m}/${day}/${y}`}`)                                           
         };
         
    return(
 
    <React.Fragment> 
        
            <div className="wrapper">
                <VoucherHeader language={language} />
                <div>
                {loaded ?
            <div>
                    {vouchers.map((voucher, index)=> 
                    
                <VoucherCards 
                                key={index}
                                id={index}
                                title={voucher.reference}
                                text= {voucher.description}
                                image= {voucher.image}
                                action={selectVoucher}                               
                                />
                )}
            </div>
            : <button onClick={getMyProducts}>{texts[language].availableProducts}</button>
            // <button onClick={getMyProducts}>Mostrar Poductos disponibles</button>            
            }
            </div>       
                       {choseVoucher &&           
                <div >                      
                    <section className="popUpWindow" >
                        <h2 >{chosenVoucher.reference}</h2>                       
                        <h4>{texts[language].cost} {chosenVoucher.price} {texts[language].left} {chosenVoucher.qty}</h4>
                        <img width='75vh' height="75vh" src={chosenVoucher.image}></img> 
                        <h4>{`${texts[language].chooseProduct} ${chosenVoucher.price} ${texts[language].ofYourPoints}`}</h4>                     
                        <Link language={language} to="/voucherreceived"><button onClick={chooseProduct}>{texts[language].redeem}</button></Link>
                        <button onClick={() => setToChosen(false)}>{texts[language].cancel}</button>
                    </section>
                </div> 
                }         
            </div>
        </React.Fragment>

    )
};

export default Voucher;
