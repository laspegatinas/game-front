import React, {useContext, useState} from 'react';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';
import Rounds from '../Rounds/Rounds';
import { MyContext } from '../../context/MyProvider';
import PopUp from '../Rounds/PopUp';


// all the links to the first games are in Rounds.js now
// the links to the second Rounds in Register.js



      const Home = ({ language }) => {

    //   const { state:  { spotify_round_two_extended, youtube_round_two, user }} = React.useContext(MyContext);
    //    const { state } = React.useContext(MyContext);
    //    const { addPointsExtended, addPoints, resetState, updateVoucherHistory  } = React.useContext(MyContext);
  
  
    // const clicked = async () => {
        
    //       //  addPointsExtended(20, 'instagram', 'three', ['966913838']) 
    //        //  addPoints(60, 'youtube', 'two')
    //         // console.log(user)     
    //        console.log(state)    
    //      //  console.log(localStorage.yt_points_1)       
                    
    //      // resetState()   
    // }

   

    return(

    <div className="container">
        <div className="main">
            <p className="playWith">{texts[language].playwithTitle}</p>        
            <img src={logo} alt="la pegatina logo" className="laPegatina" />          
            <div className="home-play-buttons">
                {/* <PopUp/> */}
                <Rounds
                    language={language} spotifyButton={'btn-game'} tokenButton={'btn-game'} youtubeButton={'btn-game'}
                    instagramButton={'btn-game'} homeButton={'hideGame'}
                />
                
                {/* <button onClick={clicked}>CLIIIIIIIIIICK</button> */}
            </div>
        </div>
    </div>
)};

export default Home;
