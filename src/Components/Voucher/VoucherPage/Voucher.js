import React, { useState, useEffect } from 'react';
import Vouchers from '../Vouchers.json';
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
        //         setTimeout(() => {
        //             setLoaded(true);   
        //         }, 2000);
                                                      
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

       const pushToVoucherHistory =  () => {         
            // let d = new Date();
            // let m = d.getMonth() + 1;
            // let day = d.getDate();
            // let y = d.getFullYear();           
            // localStorage.setItem('code', chosenVoucher[0].code);  
            // updateVoucherHistory(`Name: ${chosenVoucher[0].title} date: ${`${m}/${day}/${y}`} code :${chosenVoucher[0].code}`);
       //   console.log(chosenVoucher['_id'])
            Api.buyProduct({
                'reference' : chosenVoucher.reference,
                 'qty': 1,
                 'user': user,
            }).then((resp) =>{
            console.log(resp)
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

            : <p>loading</p>
             
            }
            </div>
            <button onClick={getMyProducts}>get Vouchers</button>
                {/* <div>
                    {
                    vouchers.map((vouch, index) => 
                <VoucherCards       key={index} 
                                    id={index} 
                                    imageClass={'voucherImage'}
                                    image={vouch.image} 
                                    title={vouch.title} 
                                    text={vouch.text}                                        
                                    action={selectVoucher} 
                                    buttonPrint={vouch.button}/>)               
                    }           
                </div>   */}
                       {choseVoucher &&           
                <div >                      
                    {/* {chosenVoucher.map((voucher, index) =>  */}
                    <section className="popUpWindow" >
                        <h2 >{chosenVoucher.reference}</h2>
                        <p>{chosenVoucher.description}</p>
                        <img width='80vh' height="80vh" src={chosenVoucher.image}></img> 
                        <button onClick={pushToVoucherHistory}>select Voucher</button>                                           
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
