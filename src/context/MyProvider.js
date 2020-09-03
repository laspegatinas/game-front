/* eslint-disable react/no-unused-state */
import React, {useState, useEffect, Component } from 'react';
import Api from '../Api'
export const MyContext = React.createContext();

export default (props) => {
//class MyProvider extends Component {

    const [state,setState] = useState({
        accessToken: '',
        username: '',
        name: '',
        picture: '',
        user:'',
        email: '',
        phone: '',
        city: '',
        state: '',
        spotify_round_one: '',
        spotify_round_two: '',
        spotify_round_two_extended: {
                                        "Al Carrer!": '',
                                        "Un secreto a voces": '',
                                        "Ahora o nunca": "",
                                        "La Gran Pegatina Live 2016": '',
                                        "Revulsiu": '',
                                        "Eureka!": '',
                                        "Xapomelön": '',
                                        "Via Mandarina": '',
                                    },
        instagram_round_one: '',
        instagram_round_two: '',
        instagram_round_three: '',
        instagram_round_three_extended: 
                                        {
                                            '966913838': 0,
                                            '9115805': 0,
                                            '4459158': 0,
                                            '13259158': 0,
                                            '2889579314': 0,
                                            '194454090': 0,
                                            '2078886031': 0,
                                            '3398157': 0,
                                            '1607991476': 0,
                                            
                                        },
        youtube_round_one: '',
        youtube_round_two: '',
        youtube_round_two_extended: { 
                                            'QDHlpJogBwc' : '',
                                            'wFC_Ot6m_Qk' : ''

                                         },
        total_app_points: '',
        usedVouchers: [],
        activePanel: 'signup',
        language: 'spanish',
        authed: true,
        
    });

    useEffect(() => {
        let session = localStorage.getItem('session')
        if (session){
            const sessionJson = JSON.parse(session)
            setState(sessionJson)
            Api.setSessionToken(sessionJson.accessToken)
        }
    },[])

    const changeState = (newState) => {
      //  console.log('NUEVO STATE',newState)
        setState(newState)
        localStorage.setItem('session',JSON.stringify(newState))
       // console.log(localStorage.getItem('session'))
      //  console.log('STATE', state)
    }

    const updateSpotifyPoints = (newState, completeState) => {
        const keysArray = [
        "Al Carrer!",
        "Un secreto a voces",
        "Ahora o nunca",
        "La Gran Pegatina Live 2016",
        "Revulsiu",
        "Eureka!",
        "Xapomelön",
        "Via Mandarina",
        ];
        
        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(newState[key]);
        });

        let updatedState = {
            ...completeState,
            spotify_round_two: total,
        }

        changeState(updatedState);
        updateTotalPoints(updatedState);

       // console.log(state.spotify_round_two)
    }
    const updateYoutubePoints = (newState, completeState) => {
        const keysArray = [

            'QDHlpJogBwc',
            'wFC_Ot6m_Qk'
        ];
        
        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(newState[key]);
        });

        let updatedState = {
            ...completeState,
            youtube_round_two: total,

        }

        changeState(updatedState);
        updateTotalPoints(updatedState);
        
    }
    const updateInstagramPoints = (newState, completeState) => {
        const keysArray = [
            '966913838',
            '9115805',
            '4459158',
            '13259158',
            '2889579314',
            '194454090',
            '2078886031',
            '3398157',
            '1607991476'
        ];
        
        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(newState[key]);
        });

        let updatedState = {

            ...completeState,
            instagram_round_three: total,
        }

        changeState(updatedState);
        updateTotalPoints(updatedState);
        //console.log(state.instagram_round_two)
    }

    const updateTotalPoints = (newState) => {
        const keysArray = [
            'spotify_round_one',
            'spotify_round_two',
            'instagram_round_one',
            'instagram_round_two',
            'instagram_round_three',
            'youtube_round_one',
            'youtube_round_two',
        ];

        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(newState[key]);
        });

        changeState({
            ...newState,
            total_app_points: total,
        });
    };

    const { points: activePanel } = state;
    // We rename points so we can after do 'points: state.points + points' without problems
    
    const { children } = props;

    return (
        <MyContext.Provider value={{
            state: state,

            addPoints: (newPoints, gameName, roundIn) => {
                // console.log('ADD PONITS')
                // console.log(newPoints)
                // console.log(gameName)
                // console.log(roundIn)
                // console.log(`${gameName}_round_${roundIn}`)
                // console.log(state[`${gameName}_round_${roundIn}`])
                let newState = {}
                if ((newPoints >= parseInt(state[`${gameName}_round_${roundIn}`])) || (state[`${gameName}_round_${roundIn}`] == undefined)) {
                    let index = `${gameName}_round_${roundIn}`;
                    console.log('roundIn',index)
                    newState =  {
                        ...state,
                        [index]: newPoints,
                    } ;
                    changeState(newState);
                
                   // console.log(state)
                    updateTotalPoints(newState)
                    // console.log(newState)
                    // console.log(newPoints)
                    Api.setPoints({
                        'spotify_round_two_extended': JSON.stringify(newState.spotify_round_two_extended),
                        'instagram_round_three_extended': JSON.stringify(newState.instagram_round_three_extended),
                        'youtube_round_two_extended': JSON.stringify(newState.youtube_round_two_extended),
                        'instagram_round_three': newState.instagram_round_three,
                        'spotify_round_one': newState.spotify_round_one,
                        'spotify_round_two': newState.spotify_round_two,
                        'instagram_round_one': newState.instagram_round_one,
                        'instagram_round_two': newState.instagram_round_two,
                        'instagram_round_three': newState.instagram_round_three,
                        'youtube_round_one': newState.youtube_round_one,
                        'youtube_round_two': newState.youtube_round_two,
                        'total_app_points': newState.total_app_points,                       
                        'user': newState.user
                    }).then((resp)=>{
                       // console.log(resp)
                        Api.getPoints(newState.user)
                        .then((resp2)=> console.log(resp2));
                    });
                };
            },

            addPointsExtended: (newPoints, gameName, roundIn, album) => {

                if ((newPoints >= parseInt(state[`${gameName}_round_${roundIn}_extended`][album])) 
                || (state[`${gameName}_round_${roundIn}_extended`][album] == undefined)) {
                    let newIndex = `${gameName}_round_${roundIn}_extended`;
                    let oldIndex = state[`${gameName}_round_${roundIn}_extended`];
                    let newState = {};
                    newState =  {
                        ...state, 
                        [newIndex]: {...oldIndex,[album]: newPoints},
                    };
                    changeState(newState);
                    //console.log(newState);
                   // console.log(newState[newIndex]);
                   
                    
                    //updates the point of chosen round to the sum of the various round variations
                    if (gameName === 'spotify' && roundIn === 'two'){
                    updateSpotifyPoints(newState[newIndex], newState);
                     };
                    if (gameName === 'instagram' && roundIn === 'three'){
                    updateInstagramPoints(newState[newIndex], newState);
                     };
                    if (gameName === 'youtube' && roundIn === 'two'){
                    updateYoutubePoints(newState[newIndex], newState);
                     };
                    
                //     console.log(newState)
                //     console.log(newPoints)                                      
                    Api.setPoints({                       
                        'spotify_round_two_extended': JSON.stringify(newState.spotify_round_two_extended),
                        'instagram_round_three_extended': JSON.stringify(newState.instagram_round_three_extended),
                        'youtube_round_two_extended': JSON.stringify(newState.youtube_round_two_extended),
                        'instagram_round_three': newState.instagram_round_three,
                        'spotify_round_one': newState.spotify_round_one,
                        'spotify_round_two': newState.spotify_round_two,
                        'instagram_round_one': newState.instagram_round_one,
                        'instagram_round_two': newState.instagram_round_two,
                        'instagram_round_three': newState.instagram_round_three,
                        'youtube_round_one': newState.youtube_round_one,
                        'youtube_round_two': newState.youtube_round_two,
                        'total_app_points': newState.total_app_points,                                             
                        'user': newState.user
                    }).then((resp)=>{
                        console.log(resp);
                        Api.getPoints(newState.user)
                        .then((resp2)=> console.log(resp2));
                    });
                 };
            },

            clearUser: () => changeState({
                accessToken:'',
                username: '',
                name: '',
                user:'',
                picture: '',
                email: '',
                phone: '',
                city: '',
                state: '',
                spotify_round_one: '',
                spotify_round_two: '',
                spotify_round_two_extended: {
                                        "Al Carrer!": '',
                                        "Un secreto a voces": '',
                                        "Ahora o nunca": '',
                                        "La Gran Pegatina Live 2016": '',
                                        "Revulsiu": '',
                                        "Eureka!": '',
                                        "Xapomelön": '',
                                        "Via Mandarina": '',
                                    },
                instagram_round_one: '',
                instagram_round_two: '',
                instagram_round_three: '',
                instagram_round_three_extended: {
                                                    '966913838': 0,
                                                    '9115805': 0,
                                                    '4459158': 0,
                                                    '13259158': 0,
                                                    '2889579314': 0,
                                                    '194454090': 0,
                                                    '2078886031': 0,
                                                    '3398157': 0,
                                                    '1607991476': 0,
                                                    
                                                },
                youtube_round_one: '',
                youtube_round_two: '',
                youtube_round_two_extended: { 
                                                    'QDHlpJogBwc' : '',
                                                    'wFC_Ot6m_Qk' : ''

                                                },
                total_app_points: '',
                // activePanel: 'login',
                language: 'spanish',
                authed: false,
            }),

            updateVoucherHistory : (newHistory) => {
                
                let newState = {};
                let history = state.usedVouchers;                                   
                        newState = {
                            ...state,
                            usedVouchers:  history ? history.concat(newHistory) : newHistory
                            };
                changeState(newState)               
            },


            resetState : () => {
                let newState ={}
               newState = {
                ...state,
                instagram_round_three_extended: 
                {
                    '966913838': 0,
                    '9115805': 0,
                    '4459158': 0,
                    '13259158': 0,
                    '2889579314': 0,
                    '194454090': 0,
                    '2078886031': 0,
                    '3398157': 0,
                    '1607991476': 0,
                    
                },

                youtube_round_two_extended: { 
                    'QDHlpJogBwc' : '',
                    'wFC_Ot6m_Qk' : ''

                 },
                spotify_round_two_extended: {
                    "Al Carrer!": 0,
                    "Un secreto a voces": 0,
                    "Ahora o nunca": 0,
                    "La Gran Pegatina Live 2016": 0,
                    "Revulsiu": 0,
                    "Eureka!": 0,
                    "Xapomelön": 0,
                    "Via Mandarina": 0,
                }};
                changeState(newState);

                Api.setPoints({
                        
                    'spotify_round_two_extended': JSON.stringify(newState.spotify_round_two_extended),                   
                    'youtube_round_two_extended': JSON.stringify(newState.youtube_round_two_extended),                   
                    'instagram_round_three_extended': JSON.stringify(newState.instagram_round_three_extended),                   
                    'user':newState.user
                }).then((resp)=>{
                    console.log(resp)
                })
            },
 
            logUserIntoContext: (data) => changeState({
                accessToken: data.accessToken,
                username: data.username,
                name: data.name,
                user:data.id,
                picture: data.picture,
                email: data.email,
                phone: data.phone,
                city: data.city,
                state: data.state,
                spotify_round_one: data.spotify_round_one,
                spotify_round_two: data.spotify_round_two,
                spotify_round_two_extended: JSON.parse(data.spotify_round_two_extended),
                instagram_round_one: data.instagram_round_one,
                instagram_round_two: data.instagram_round_two,
                instagram_round_three: data.instagram_round_three,
                instagram_round_three_extended: JSON.parse(data.instagram_round_three_extended),
                youtube_round_one: data.youtube_round_one,
                youtube_round_two: data.youtube_round_two,
                youtube_round_two_extended: JSON.parse(data.youtube_round_two_extended),
                total_app_points: data.total_app_points,
                usedVouchers: data.usedVouchers,
                activePanel: 'login',
                language: 'spanish',
                authed: true,
            }),

            replaceState: (newState) => changeState(newState),

            // login sign up switch
            activePanel,
            actions: {
                handlePanelSwitch: (newPanel) => {
                    changeState({
                        ...state,
                        activePanel: newPanel,
                    });
                },
            },
        }}
        >
            {children}
        </MyContext.Provider>
    );
}
