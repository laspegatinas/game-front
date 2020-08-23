import React, { useState, useEffect } from 'react';
import VoucherHeader from '../Header/VoucherHeader';
import { Link } from 'react-router-dom';
import VoucherCards from '../VoucherCards/VoucherCards';
import { MyContext } from '../../../context/MyProvider';
import Api from '../../../Api/index';
import './Voucher.css';


const Voucher = () => {

        const [vouchers, setVouchers] = useState([]);
        const [chosenVoucher, setChosenVoucher] = useState();
        const [loaded, setLoaded] = useState(false);
        const [choseVoucher, setToChosen] = useState(false);
        const { updateVoucherHistory } = React.useContext(MyContext);
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
                  
                console.log(resp.data);
                let myVouchers = [...vouchers];
                myVouchers.push(resp.data['5f401d0f39c180001777b4be']);
                myVouchers.push(resp.data['5f401d1639c180001777b4bf']);
                myVouchers.push(resp.data['5f401d2739c180001777b4c0'])
                setVouchers(myVouchers);               
                    setLoaded(true);                                                                  
            });
          }; 


        const selectVoucher = (event) => {        
            const voucherIndex = event.target.id;
            const selectedVoucher = vouchers[voucherIndex];
            // let myVoucher = [...chosenVoucher];
            //  myVoucher.push(selectedVoucher);
             setChosenVoucher(selectedVoucher);
            // console.log(myVoucher);  
             setToChosen(true);   
             let d = new Date();
             let m = d.getMonth() + 1;
             let day = d.getDate();
             let y = d.getFullYear();
             console.log(`${m}/${day}/${y}`)    
        }; 

       const pushToVoucherHistory = async  () => {         
            let d = new Date();
            let m = d.getMonth() + 1;
            let day = d.getDate();
            let y = d.getFullYear();           
        await    Api.buyProduct({
                'reference' : chosenVoucher.reference,
                'qty': 1,
                'user': user,
            }).then( (resp) =>{
            console.log(resp.data.voucher.code);
            localStorage.setItem('code', resp.data.voucher.code);
            updateVoucherHistory(`Name ${chosenVoucher.reference} date: ${`${m}/${day}/${y}`} code :${resp.data.voucher.code}`);
        })                                            
         }

     
         
    return(
 
    <React.Fragment> 
        
            <div className="wrapper">
                <VoucherHeader />
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

            : <p></p>
             
            }
            </div>
            <button onClick={getMyProducts}>Mostrar Poductos disponibles</button>
        
                       {choseVoucher &&           
                <div >                      
                    {/* {chosenVoucher.map((voucher, index) =>  */}
                    <section className="popUpWindow" >
                        <h2 >{chosenVoucher.reference}</h2>
                        <p>{chosenVoucher.description}</p>
                        <img width='80vh' height="80vh" src={chosenVoucher.image}></img> 
                        <Link  to="/voucherreceived"><button onClick={pushToVoucherHistory}>Canjear</button></Link>
                        {/* <button onClick={pushToVoucherHistory}>select Voucher</button>                                            */}
                        <button onClick={() => setToChosen(false)}>Cancel</button>
                    </section>)
                    {/* }                   */}
                </div> 
                }  
                {/* {choseVoucher &&           
                <div >                      
                    {chosenVoucher.map((voucher, index) => 
                    <section className="popUpWindow" >
                        <h2 key={index} >{voucher.title} ({voucher.quantity})  {voucher.points} puntos</h2>
                        <p>{voucher.text}</p>
                        <img src={voucher.image}></img>                        
                        <Link code={voucher.code} to="/voucherreceived"><button onClick={pushToVoucherHistory}>{voucher.button}</button></Link>
                        <button onClick={() => setToChosen(false)}>Cancel</button>
                    </section>)
                    }                  
                </div> 
                }   */}
             
            </div>
        </React.Fragment>

    )
};

export default Voucher;
