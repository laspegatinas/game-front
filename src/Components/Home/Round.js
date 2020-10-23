import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import texts from '../../texts.json';
// import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import ronda3 from '../../Pictures/ronda3.png';
import ronda2 from '../../Pictures/ronda2.png';
import homebtn from '../../Pictures/home45.png';
import home1 from '../../Pictures/home1.png';
import regButton from '../../Pictures/regButton (2).png';
import regButton3 from '../../Pictures/regButton3 (1).png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';
import Spotify from '../Utils/Spotify';
import { PopUp, PopUp3, PopUpStar,PopUp2 } from '../Rounds/PopUp';
import star from '../../Pictures/Star.png'




const Round = (props) => {
    const { game } =props.location.state;
    const { title } = props.location.state;
    const { language } = props.location.state;
    const [pop, setPop]= useState(false)
    const [comp, setComp]=useState(false)
//   const  popStart = () => {
//       return(
//         <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpYoutube}
//         popButton={'button1'} popText={texts[language].roundOneBtn} />
//       )
//     } 
console.log(game)
    return(
<div>
{game === 'spotify' &&
    <div>          
    <h1>{title}</h1>            
        <svg   width="200" height="160" style={{ position: "relative", top: '9rem' }}><line x1="0" y1="0" x2="200" y2="160" stroke="#6965B4" stroke-width="10%" /></svg>
        <svg  width="30" height="250" style={{ position: "relative", top: '20rem' }}><line x1="15" y1="0" x2="15" y2="270" stroke="#6965B4" stroke-width="10%" /></svg>
        <svg  width="240" height="30" style={{ position: "relative", top: '27rem' }}><line x1="0" y1="0" x2="240" y2="0" stroke="#6965B4" stroke-width="10%" /></svg>
    
        <Link to="/">
            <img src={home1} 
            type="button"></img>
        </Link>
    
    
    </div>}
    {game === 'youtube' &&
    <div> 
                
    <h1>{title}</h1>            
        <svg   width="200" height="160" style={{ position: "relative", top: '9rem' }}><line x1="0" y1="0" x2="200" y2="160" stroke="#6965B4" stroke-width="10%" /></svg>
        <svg  width="30" height="250" style={{ position: "relative", top: '20rem' }}><line x1="15" y1="0" x2="15" y2="270" stroke="#6965B4" stroke-width="10%" /></svg>
        <svg  width="240" height="30" style={{ position: "relative", top: '27rem' }}><line x1="0" y1="0" x2="240" y2="0" stroke="#6965B4" stroke-width="10%" /></svg>
        <Link to="/">
           <img src={home1} 
            type="button"></img>
        </Link>

        
     <Link to="/youtuberoundone">                           
        <img src={ronda2} 
        type="button"
        ></img>
        </Link>
    </div>}
</div>
    )
}


export default Round;