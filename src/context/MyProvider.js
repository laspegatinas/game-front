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
                                        "Al Carrer!": "",
                                        "Un secreto a voces": "",
                                        "Ahora o nunca": "",
                                        "La Gran Pegatina Live 2016": "",
                                        "Revulsiu": "",
                                        "Eureka!": "",
                                        "Xapomelön": "",
                                        "Via Mandarina": "",
                                    },
        instagram_round_one: '',
        instagram_round_two: '',
        youtube_round_one: '',
        youtube_round_two: '',
        total_app_points: '',
        activePanel: 'signup',
        language: 'spanish',
        authed: true,
        
    })



    useEffect(() => {
        let session = localStorage.getItem('session')
        if (session){
            const sessionJson = JSON.parse(session)
            setState(sessionJson)
            Api.setSessionToken(sessionJson.accessToken)
        }
    },[])

    const changeState = (newState) => {
        console.log('NUEVO STATE',newState)
        setState(newState)
        localStorage.setItem('session',JSON.stringify(newState))
        console.log(localStorage.getItem('session'))
        console.log('STATE', state)
    }

    const updateSpotifyPoints = (newState) => {
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

        changeState({
            ...state,
            spotify_round_two: total,
        });

        console.log(state.spotify_round_two)

    }

    

    const updateTotalPoints = (newState) => {
        const keysArray = [
            'spotify_round_one',
            'spotify_round_two',
            'instagram_round_one',
            'instagram_round_two',
            'youtube_round_one',
            'youtube_round_two',
        ];

        let total = 0;

        keysArray.forEach((key) => {
            total += parseInt(newState[key]);
        });

        changeState({
            ...state,
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
                console.log('ADD PONITS')
                console.log(newPoints)
                console.log(gameName)
                console.log(roundIn)
                console.log(`${gameName}_round_${roundIn}`)
                console.log(state[`${gameName}_round_${roundIn}`])
                let newState = {}
                if ((newPoints >= parseInt(state[`${gameName}_round_${roundIn}`])) || (state[`${gameName}_round_${roundIn}`] == undefined)) {
                    let index = `${gameName}_round_${roundIn}`;
                    console.log('roundIn',index)
                    newState =  {
                        ...state,
                        [index]: newPoints,
                    } ;
                    changeState(newState);
                
                    console.log(state)
                    updateTotalPoints(newState)
                    console.log(newState)
                    console.log(newPoints)
                    Api.setPoints({
                        'spotify_round_one': newState.spotify_round_one,
                        'spotify_round_two': newState.spotify_round_two,
                        'instagram_round_one': newState.instagram_round_one,
                        'instagram_round_two': newState.instagram_round_two,
                        'youtube_round_one': newState.youtube_round_one,
                        'youtube_round_two': newState.youtube_round_two,
                        'total_app_points': newState.total_app_points,
                        'user': newState.user
                    }).then((resp)=>{
                        console.log(resp)
                    })
                } 
            },

            addPointsExtended: (newPoints, gameName, roundIn, album) => {

                if ((newPoints >= parseInt(state[`${gameName}_round_${roundIn}_extended`][album])) 
                || (state[`${gameName}_round_${roundIn}_extended`][album] == undefined)) {
                    let newIndex = `${gameName}_round_${roundIn}_extended`;
                    let oldIndex = state.spotify_round_two_extended;
                    let newState = {}
                    newState =  {
                        ...state, 
                        [newIndex]: {...oldIndex,[album]: newPoints},
                    } ;
                    changeState(newState);
                    console.log(newState[newIndex]);
                   
                    updateTotalPoints(newState);
                    updateSpotifyPoints(newState[newIndex]);
                    console.log(newState)
                    console.log(newPoints)
                    console.log(JSON.stringify(state.spotify_round_two_extended));
                    console.log(JSON.stringify(newState.spotify_round_two_extended));
                    
                    Api.setPoints({
                        
                        'spotify_round_two_extended': JSON.stringify(newState.spotify_round_two_extended),
                        
                        'user':newState.user
                    }).then((resp)=>{
                        console.log(resp)
                    })
                }
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
                spotify_round_two_extended: {alCarrer: "",  
                                            unSecretoAVoces: "",
                                            ahoraONunca: "",
                                            laPegatinaLive2016: "",
                                            revulsiu: "",
                                            eureka: "",
                                            xapomelon: "",
                                            viaMandarina: ""},
                instagram_round_one: '',
                instagram_round_two: '',
                youtube_round_one: '',
                youtube_round_two: '',
                total_app_points: '',
                // activePanel: 'login',
                language: 'spanish',
                authed: false,
            }),

            addPicture: (newPicture) => changeState({

                ...state,
                picture : newPicture

            }),

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
                youtube_round_one: data.youtube_round_one,
                youtube_round_two: data.youtube_round_two,
                updateTotalPoints: data.total_app_points,
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
