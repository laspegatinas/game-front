import React, {useState, useEffect} from 'react';
import './PopUp.css';
//import texts from '../../texts.json';
import ronda1 from '../../Pictures/ronda1.png';


const PopUp = ({popButton, popText, todo, instruct, src, id, videoId, className }) => {

    const [timeLeft, setTimeLeft] = useState(5);
    const [popUpClass, setPopUp] = useState('none')

    const closeModal = () => {

        setTimeLeft(5)   
        setPopUp('popUp') 
        
    }

    useEffect(() => {
        if(timeLeft===0){
          // console.log("TIME LEFT IS 0");
           setTimeLeft(null)
        }     
        if (!timeLeft) return;      
        const intervalId = setInterval(() => {   
          setTimeLeft(timeLeft - 1);
        }, 1000);     
        return () => clearInterval(intervalId);     
      }, [timeLeft]);

    return (  

    <div >
        
        {/* <button className={ popUpClass == 'popUp' ? 'none' : popButton}       
            onClick={() => closeModal()}
        ></button> */}
          <img
                className={popUpClass == 'popUp' ? 'none' : 'btnRonda1'}
                src={ronda1}
                type="button"
                onClick={() => closeModal()}
            />
            {/* <img   src={src}
                   id={id}
                   videoId={videoId}
                   className={className}>
            </img> */}
            {/* {popText} */}
      


        <div className={popUpClass}>
            <div >
                <h2 className={'popHead'}> {todo} <br/> {instruct}</h2>
                <p className={'timer2'}>{timeLeft}</p>
            </div>                
                                
        </div>
        
        
    </div>

     )
    };

export default PopUp;