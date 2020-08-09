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

    const { logUserIntoContext, addPoints, state } = React.useContext(MyContext);
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
                 
                Api.setSessionToken(resp.data.accessToken)
                closeModal()
                Api.getPoints(resp.data.id).then((resp2)=>{
                    let user = {...resp['data'], ...resp2['data'],...{spotify_round_two_extended: {"Al Carrer!": 20,
                    "Un secreto a voces": 30,  "Ahora o nunca": 40,
                    "La Gran Pegatina Live 2016": 30,
                    "Revulsiu": 50,
                    "Eureka!": 20,
                    "Xapomelön": 59,
                    "Via Mandarina": 22,}}}
                    logUserIntoContext(user);
                })   
             },(err)=>{

             })
            };
    

    return (
        <div>
            {/* <MyContext.Consumer>
                {(context) => ( */}
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
            {/* )}
            </MyContext.Consumer> */}
        </div>
    );
};

export default Login;
