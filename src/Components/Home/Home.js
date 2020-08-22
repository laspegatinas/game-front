import React, {useContext, useState} from 'react';
import '../../App.css';
import './Home.css';
import logo from '../../Pictures/logo_la_pegatina_2018.png';
import texts from '../../texts.json';
import Rounds from '../Rounds/Rounds';
import Api from '../../Api/index';
//import { MyContext } from '../../context/MyProvider';
//import PopUp from '../Rounds/PopUp';


// all the links to the first games are in Rounds.js now
// the links to the second Rounds in Register.js



      const Home = ({ language }) => {

    //  const { state:  { spotify_round_two_extended, youtube_round_two, user }} = React.useContext(MyContext);
    
    //   const { state } = React.useContext(MyContext);
    //   const { addPointsExtended, addPoints, resetState, updateVoucherHistory  } = React.useContext(MyContext);
    //  // const { usedVouchers } = React.useContext(MyContext); ,5f401d0f39c180001777b4be ...resp.data['5f401d1639c180001777b4bf'], ...resp.data['5f401d2739c180001777b4c0']];
    const [vouchersEx, setVouchersEx] = useState([]);
    const [loaded, setLoaded] = useState(false);
     

    const clicked = async () => {
        
            //  addPointsExtended(55, 'spotify', 'two', localStorage.AlbumId) 
             //addPoints(60, 'youtube', 'two')
            // console.log(user)
           await   Api.getProducts().then( async (resp) => {
                  
                console.log(resp.data);
                let myVouchers = [...vouchersEx];
                myVouchers.push(resp.data['5f401d0f39c180001777b4be']);
                myVouchers.push(resp.data['5f401d1639c180001777b4bf']);
                myVouchers.push(resp.data['5f401d2739c180001777b4c0'])
                setVouchersEx(myVouchers);
                setLoaded(true);
            
                   
                                             
            });
               

           // console.log(state)           
               // console.log(state)       
         //  resetState()   
    }

   

    return(

    <div className="container">
        <div className="main">
            <p className="playWith">{texts[language].playwithTitle}</p>
            {loaded &&
            <div>
                {vouchersEx.map((voucher)=> 
            <h2>{voucher.reference}</h2>
            )}
            </div>
             
            }
            
            <img src={logo} alt="la pegatina logo" className="laPegatina" />          
            <div className="home-play-buttons">
                <Rounds
                    language={language} spotifyButton={'btn-game'} tokenButton={'btn-game'} youtubeButton={'btn-game'}
                    instagramButton={'btn-game'} homeButton={'hideGame'}
                />
                
                <button onClick={clicked}>CLIIIIIIIIIICK</button>
            </div>
        </div>
    </div>
)};

export default Home;
