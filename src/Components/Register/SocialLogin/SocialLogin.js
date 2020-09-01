import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { MyContext } from '../../../context/MyProvider';
import Api from '../../../Api/index';
import './SocialLogin.css';

const SocialLogin = (props) => {

    const { logUserIntoContext } = React.useContext(MyContext);
    const { state:  { spotify_round_two_extended }} = React.useContext(MyContext);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    const postProfile = (user) => {
                
        console.log(email)
        
        console.log(user)
        Api.socialSignUp(user)
        .then((data) => {
                 console.log(data)
                Api.setSessionToken(data.data.accessToken)
                Api.setPoints({
                                             'spotify_round_one':0,
                                             'spotify_round_two':0,
                                             'instagram_round_one':0,
                                             'instagram_round_two':0,
                                             'instagram_round_three':0,
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
                                              'user': data.data.id
                                         }).then((resp)=>{
                                            console.log(resp)
                                            Api.getPoints(data.data.id)
                                            .then((resp2)=>{
                                                let user = {...data.data, ...resp2['data']};
                                                logUserIntoContext(user);
                                                window.location.reload(true);
                                             //   setLoading(false);
                                                
                                                console.log('data you pass to the context', user);
                                            })   
                                        }) 
             },(err)=>{

             })
            };



    const responseFacebook =  (response) => {
        console.log(response);
        let user = {
                
            'name' : response.name.toLowerCase(),
            "email": response.email,
            "id": response.id,
            "picture": response.picture.data.url,
            "roles": ["user"]
                    
             
             }
        postProfile(user);
        setLoading(true);
      }
    
      const responseGoogle =  (response) => {
        console.log(response);  
        console.log((response.profileObj.imageUrl));
        let user = {                
            'name' : response.profileObj.name.toLowerCase(),
            "email": response.profileObj.email,
            "id": response.profileObj.googleId,
            "picture": response.profileObj.imageUrl,
            "roles": ["user"]             
             }

        postProfile(user);
        setLoading(true);
      }

      const responseGoogleFail = (response) => {
          console.log(response);
      }

    
    return (
        <MyContext.Consumer>
        {(context) => (
     <div>         
           <FacebookLogin           
            appId="354742908880457" //APP ID 
            fields="name,email,picture"
            callback={responseFacebook}            
            />
            
             {loading
            ?
            <h2>Loading...</h2>
            :
            <p></p>
        }            
            <GoogleLogin           
            clientId="45195171194-l7tf2i1lct6tpe7fjcurgor52ct4k7gh.apps.googleusercontent.com" //CLIENTID 
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
            cookiePolicy= 'single_host_origin'
        />
      <br></br>
      <br></br>
        
    </div>
          )}
          </MyContext.Consumer>
  );
};

export default SocialLogin;