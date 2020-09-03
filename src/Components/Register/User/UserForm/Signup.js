import React, { useState } from 'react';
import Api from '../../../../Api';
import texts from '../../../../texts.json';
import Login from './Login';
import { MyContext } from '../../../../context/MyProvider';
import { red } from 'color-name';
import SocialLogin from '../../SocialLogin/SocialLogin';

const lang2 = 'spanish';

const SignUp = ({ language }) => {

   

    const { logUserIntoContext } = React.useContext(MyContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [posted, setPosted] = useState(false);
    // State where we are going to keep the error and messages on the register page that we receive from the backend
    const [messages, setMessages] = useState([]);

    const closeModal = () => {
        const closeModalButton = document.querySelector('.modalClosingButton');
        closeModalButton.click();
    }

    const formValidates = () => {
        let validates = true
        let tmpMessages = []
        if(username == ''){
            tmpMessages.push({
                color:'white',
                message:'El nombre de usuario no puede estar vacio'
            })
            validates = false;
        }

        if(email == ''){
            tmpMessages.push({
                color:'white',
                message:'El correo electronico no puede estar vacio'
            })
            validates = false;
        }

        if(password == ''){
            tmpMessages.push({
                color:'white',
                message:'La contrasena no puede estar vacia.'
            })
            validates = false;
        }

        if (password !== repeatedPassword){
            tmpMessages.push({
                color:'white',
                message:'Las contrasenas no coinciden.'
            })
            validates = false;
        }
        
        setMessages(tmpMessages)
        return validates
    }

    const postProfile = (e) => {
        e.preventDefault();
   //test password: no error --> fetch
        if (formValidates())
        Api.signUp({
                         
            "pre_username": username,         
            'username' : username.toLowerCase(),
            "email": email,
            "password": password,
            "roles": ["user"]
                               
        })
            .then(async (res) => {
              //  console.log(res.status)
                if (res) {
                    setPosted(!posted);
                }
                if (res.status === 200){                  
                await  Api.logIn({
                 
                    "pre_username": username, 
                    'username' : username.toLowerCase(),
                    "password": password,
                                       
                     }).then((resp) => {
                       //  console.log(resp)
                    Api.setSessionToken(resp.data.accessToken)
                    Api.setPoints({
                        'spotify_round_one':0,
                        'spotify_round_two':0,
                        'instagram_round_one':0,
                        'instagram_round_two':0,
                        'instagram_round_three': 0,
                        'spotify_round_two_extended': JSON.stringify({
                            "Al Carrer!": 0,
                            "Un secreto a voces": 0,
                            "Ahora o nunca": 0,
                            "La Gran Pegatina Live 2016": 0,
                            "Revulsiu": 0,
                            "Eureka!": 0,
                            "Xapomelön": 0,
                            "Via Mandarina": 0,
                        }),
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
                        youtube_round_two_extended: JSON.stringify({ 
                           'QDHlpJogBwc' : 0,
                           'wFC_Ot6m_Qk' : 0

                        }),
                        'youtube_round_one':0,
                        'youtube_round_two':0,
                        'total_app_points': 0,
                        'user': resp.data.id
                    }).then((respo)=>{
                       // console.log(respo)
                        Api.getPoints(resp.data.id).then((resp2)=>{
                           // console.log(resp2)
                            let user = {...resp['data'], ...resp2['data']};
                            logUserIntoContext(user);
                           // closeModal();
                                window.location.reload(true);
                            //console.log('data you pass to the context', user);
                        })   
                    })
                   
                });
                }
                return res;
            })
            .then((dataJSON) => {
               // console.log(dataJSON)
                let ret = [dataJSON]

                setMessages(ret);
               // console.log(messages)
            });
    };

    return (
        <div id="signup-tab-content" className="active tabs-content">
            <form className="signup-form" onSubmit={postProfile}>
                <br />
                <SocialLogin />
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    name="username"
                    placeholder={localStorage.language ? texts[localStorage.language].username : texts[lang2].username}
                    type="text"
                    className="input"
                    id="user_name"
                />
                <br />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="mail"
                    placeholder={localStorage.language ? texts[localStorage.language].mail : texts[lang2].mail}
                    type="email"
                    className="input"
                    id="user_email"
                />
                <br />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    
                    placeholder={localStorage.language ? texts[localStorage.language].password : texts[lang2].password}
                    type="password"
                    className="input"
                    id="user_pass"
                />
                <input
                    value={repeatedPassword}
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    name="repeatedPassword"
                    
                    placeholder={localStorage.language ? texts[localStorage.language].repeatPassword : texts[lang2].repeatPassword}
                    type="password"
                    className="input"
                    id="user_repeated_pass"
                />
                <br />
                <button className="form-btn" type="submit">                  
                     {localStorage.language ? texts[localStorage.language].register : texts[lang2].register} 
                </button>
            </form>
            <ul>
            {messages.map((value, index) => {
                return <li key={index}>{value['message']}</li>
            })}
            </ul>
            
        </div>
    );
};

export default SignUp;
