/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import homebtn from '../../Pictures/home1.png';
import ronda1 from '../../Pictures/ronda1.png';
import ronda2 from '../../Pictures/ronda2.png';
import ronda3 from '../../Pictures/ronda3.png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';
import Spotify from '../Utils/Spotify';
import PopUp from '../Rounds/PopUp';


class Rounds extends React.Component {

    state = {

        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
        accessToken: '',
        pop: false

    }


    getToken = () => {

        this.setState({

            accessToken: Spotify.getaccessToken()
        })

    }

    startSpotify = () => {

        const spotStart = true;
        const start = 'screen';

        localStorage.setItem('savedState', JSON.stringify(this.context));


        this.setState({
            spotify: spotStart,
            page: start,
            button: 'hideGame',
        });
    }

    startYoutube = () => {

        const youStart = true;
        const start = 'screen';

        this.setState({
            youtube: youStart,
            page: start,
            button: 'hideGame',
        });
    }

    startInsta = () => {

        const instaStart = true;
        const start = 'screen';

        this.setState({
            instagram: instaStart,
            page: start,
            button: 'hideGame',
        });
    }

    popStart = () => {

        this.setState({

            pop: true

        })
    }



    render() {


        const { page, instagram, youtube, spotify, button, pop } = this.state;

        const { language, score } = this.props;

        const loginComp = (context) => {

            const { state: { username, email } } = context;

            if (username || email) {

                return (
                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Spotify}
                        score={score} currentGame="spotify" language={language} />
                );
            }

            return <UserForm nextButton={'button1'} language={language} score={score} gameIn="spotify" />;
        };

        const loginComp2 = (context) => {

            const { state: { username, email } } = context;

            if (username || email) {

                return (

                    <Register buttonStyle={'button1'} buttonText={texts[language].startRound2Instagram}
                        score={score} currentGame="instagram" language={language} />
                );
            }

            return <UserForm nextButton={'button1'} language={language} score={score} gameIn="spotify" />;
        };

        return (
            <MyContext.Consumer>
                {(context) => (
                    <>
                        <div>
                       
                            
                            {/* displaying the appropriate introduction, depending on chosen game */}
                            <div className={page} >
                                    <div className={pop ? 'hideGame' : "title"}>
                                       <div style={{position:'absolute',top:'2vh',left:'0vw',width:'100%'}}>
                                       <h1 >{spotify ? texts[language].spotifyPlayWithButton : youtube ? texts[language].youtubePlayWithButton : instagram ? texts[language].instagramPlayWithButton : null}</h1>
                                        {spotify ?
                                            (
                                                <h4>{texts[language].youtubeInstructionsR1}</h4>
                                            )
                                            : instagram ?
                                                (
                                                    <h4>{texts[language].youtubeInstructionsR1}</h4>
                                                )
                                                : youtube ?
                                                    (
                                                        <div>
                                                            <h4>{texts[language].youtubeInstructionsR1}</h4>
                                                            <h5>{texts[language].youtubeAddition}</h5>
                                                        </div>
                                                    )
                                                    : null
                                        }
                                       </div>
                                    </div>
                                
                                {/* displaying the appropriate button depending on user choise
                    {context.state.spotify_round_one ? context.state.spotify_round_one : texts[language].roundOneText} */}

                                {/* button invokes a method that first shows popup and then with set timeout got to spotifyroundone 
                    clicked ? <SpotifyRoundone/>
                    <button className="button1" type="button">
                        {context.state.spotify_round_one || texts[language].roundOneText}</button>
                    
                    */}

                                <div className={youtube || instagram ? 'hideGame' : 'title'}>
                                    <div className={pop ? 'hideGame' : ''}>'total pts: ' {context.state.spotify_round_one || ''}</div>
                                    <DelayLink delay={5000} clickAction={this.popStart} to="spotifyroundone" >
                                        <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpSpotify}
                                            popButton={'button1'} popText={texts[language].roundOneBtn} />
                                    </DelayLink>
                                </div>
                                <div className={youtube || instagram || pop ? 'hideGame' : 'title'}>
                                    {context.state.spotify_round_two || ''}
                                    {loginComp(context)}</div>
                                <Link className={youtube || instagram || pop ? 'hideGame' : 'title'} to="/"><img  className={'btnRonda2'} src={ronda3} /></Link>


                                <div className={spotify || instagram ? 'hideGame' : 'title'}>
                                    <div className={pop ? 'hideGame' : ''}> {context.state.youtube_round_one || ''}</div>
                                    <DelayLink delay={5000} clickAction={this.popStart} to="youtuberoundone" >
                                        <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpYoutube}
                                            popButton={'button1'} popText={texts[language].roundOneBtn} />
                                    </DelayLink>
                                </div>

                                {/* Esto son botones ronda 2 y 3 de youtube */}
                                <Link className={spotify || instagram || pop ? 'hideGame' : 'title'} to="/"><img className={'btnRonda2'} src={ronda2} /></Link>
                                <Link className={spotify || instagram || pop ? 'hideGame' : 'title'} to="/"><img className={'btnRonda3'} src={ronda3} /></Link>

                                <div className={spotify || youtube ? 'hideGame' : 'title'}>
                                    <div className={pop ? 'hideGame' : ''}> {context.state.instagram_round_one || ''}</div>
                                    <DelayLink delay={5000} clickAction={this.popStart} to="instagramroundone" >
                                        <PopUp language={language} popButton={'button1'} todo={texts[language].popUp} instruct={texts[language].popUpInstagram}
                                            popText={texts[language].roundOneBtn} />
                                    </DelayLink>
                                </div>
                                {/* <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link> */}
                                <div className={spotify || youtube || pop ? 'hideGame' : 'title'} >{context.state.instagram_round_two || ''}{loginComp2(context)}</div>
                                {/* Esto es Instagram ronda 3 */}
                                <Link className={spotify || youtube || pop ? 'hideGame' : 'title'} to="/"><img  className={'btnRonda3'} src={ronda3} /></Link>
                            </div>


                            <div className="home-play-buttons">


                                <div>
                                    {this.state.accessToken ?
                                        <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                                            <i class="fab fa-spotify"></i>
                                            {texts[language].keySpotifyBtnSecondClick}
                                        </button>
                                        :
                                        <button className={this.props.tokenButton} onClick={this.getToken}>
                                            <i class="fab fa-spotify"></i>
                                            {texts[language].key}
                                        </button>
                                    }
                                </div>

                                <button type="button" className={this.props.youtubeButton} onClick={this.startYoutube}>
                                    <i class="fab fa-youtube"></i>
                                    {texts[language].youtubePlayWithButton}
                                </button>
                                <button type="button" className={this.props.instagramButton} onClick={this.startInsta}>
                                    <i class="fab fa-instagram"></i>
                                    {texts[language].instagramPlayWithButton}
                                </button>
                                <Link className={this.props.homeButton} to="/"><img className={"home-btn-image"} src={homebtn} />
                                    {texts[language].home}</Link>
                            </div>


                        </div>
                    </>
                )}
            </MyContext.Consumer>
        );
    }
}

Rounds.contextType = MyContext;

export default Rounds;
