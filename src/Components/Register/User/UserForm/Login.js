/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-fragments */
import React, { Fragment, useState } from 'react';
import Api from '../../../../Api';
import { MyContext } from '../../../../context/MyProvider';
// import '../UserProfile/Userprofile.css';
import texts from '../../../../texts.json';

const lang3 = 'spanish';

const Login = (props) => {

    const { logUserIntoContext } = React.useContext(MyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const closeModal = () => {
        const closeModalButton = document.querySelector('.modalClosingButton');
        closeModalButton.click();
    }

    const logUser = (e) => {
        e.preventDefault();
        Api.logIn({
                 
            "pre_username": username, 
            'username' : username.toLowerCase(),
            "password": password,
                               
             }).then((resp) => {
                 console.log(resp.data)
                Api.setSessionToken(resp.data.accessToken)
                closeModal();
                Api.getPoints(resp.data.id).then((resp2)=>{
                    console.log(resp2.data);
                    if (resp2.data.spotify_round_two_extended &&
                         resp2.data.youtube_round_two_extended &&  resp2.data.instagram_round_three_extended
                         && resp2.data.instagram_round_three === 0 || resp2.data.instagram_round_three )
                       {                       
                       // console.log('hey');
                        let user = {...resp['data'], ...resp2['data'], usedVouchers: [], };
                        logUserIntoContext(user);
                    }   else {
                     //   console.log('ho');
                        let user = {...resp['data'], ...resp2['data'], usedVouchers: [], 
                        instagram_round_three_extended: 
                        JSON.stringify({
                            '966913838': 0,
                            '9115805': 0,
                            '4459158': 0,
                            '13259158': 0,
                            '2889579314': 0,
                            '194454090': 0,
                            '2078886031': 0,
                            '3398157': 0,
                            '1607991476': 0,                           
                        }),
                        youtube_round_two_extended:                         
                        JSON.stringify({ 
                            'QDHlpJogBwc' : 0,
                            'wFC_Ot6m_Qk' : 0   
                        }),                          
                        spotify_round_two_extended:                       
                        JSON.stringify({
                            "Al Carrer!": 0,
                            "Un secreto a voces": 0,
                            "Ahora o nunca": 0,
                            "La Gran Pegatina Live 2016": 0,
                            "Revulsiu": 0,
                            "Eureka!": 0,
                            "Xapomelön": 0,
                            "Via Mandarina": 0,
                        })                    
                      };
                      logUserIntoContext(user);
                    };                                                              
                    
                })   
             },(err)=>{

             })
            };
    

    return (
        <div>
            <Fragment>
                <div id="login-tab-content" className="active tabs-content">
                    <form className="login-form" onSubmit={logUser}>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            placeholder={localStorage.language ? texts[localStorage.language].username : texts[lang3].username}
                            type="text"
                            className="input"
                            id="user_login"
                        />
                        <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder={localStorage.language ? texts[localStorage.language].password : texts[lang3].password}
                            type="password"
                            className="input"
                            id="user_pass"
                        />
                      
                        <button className="form-btn" type="submit">{localStorage.language ? texts[localStorage.language].login : texts[lang3].login}</button>
                    </form>
                </div>
            </Fragment>
        </div>
    );
};

export default Login;
