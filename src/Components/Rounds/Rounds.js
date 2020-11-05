/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import DelayLink from 'react-delay-link';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import ronda3 from '../../Pictures/ronda3.png';
import ronda2 from '../../Pictures/ronda2.png';
import ronda1 from '../../Pictures/ronda1.png';
import homebtn from '../../Pictures/home45.png';
import home1 from '../../Pictures/home1.png';
import regButton from '../../Pictures/regButton (2).png';
import regButton3 from '../../Pictures/regButton3 (1).png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Spotify from '../Utils/Spotify';
import  PopUp from '../Rounds/PopUp';
import star from '../../Pictures/Star.png';
import starRg from '../../Pictures/StarRg.png';


class Rounds extends React.Component {

    state = {

        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
        accessToken: '',
        pop: false,
        albums:[]

    }
    

    // getToken = () => {
    //     this.setState({
    //         accessToken: Spotify.getaccessToken()
    //     })
    // }

    backToHome = () => {

        window.location.reload(true);
    }

    startSpotify = async () => {
        const spotStart = true;
        const start = 'screen';
        localStorage.setItem('savedState', JSON.stringify(this.context));


        await this.setState({
            accessToken: Spotify.getaccessToken(),
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


    popStart = () => {
        this.setState({
            pop: true
        })
    }


    render() {


        const { page, instagram, youtube, spotify, pop } = this.state;
        const { language, score, connection, allRounds, backToHome } = this.props;
        // Rounds2
        const loginCompR2Y = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to="youtuberoundtwo" >
                    <PopUp  language={language} src={ronda2}
                    btnRonda1={pop?'hideGame':'btnRonda2'} todo={texts[language].popUp} instruct={texts[language].youtubeInstructionsR2}
                        popButton={'button2'} popText={texts[language].youtubeInstructionsR2} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'btnRonda2'} regButton={regButton} language={language} score={score} gameIn="youtube" />;
        };
        const loginCompR2S = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} 
                    //reusing the componenent,sending the name of the album to each round
                    to={{ pathname: '/spotifyroundtwo',selectedAlbum: 'Un secreto a voces' }}
                    >
                    <PopUp  language={language} src={ronda2}
                    btnRonda1={pop?'hideGame':'btnRonda2'} todo={texts[language].popUp} instruct={texts[language].album +': Un secreto a voces'+' '+texts[language].spotifyRoundTwoQuestion}
                        popButton={'button2'} popText={texts[language].youtubeInstructionsR2} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'btnRonda2'} regButton={regButton} language={language} score={score} gameIn="youtube" />;
        };
        // Rounds3
        const loginCompR3Y = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to="youtuberoundthree" >
                    <PopUp src={ronda3} btnRonda1={pop?'hideGame':'btnRonda3'}
                     language={language} todo={texts[language].popUp} instruct={texts[language].youtubeInstructionsR2}
                        popButton={'button3'} popText={texts[language].roundOneBtn} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'btnRonda3'} regButton={regButton3} language={language} score={score} gameIn="youtube" />;
        };
        const loginCompR3S = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to={{ pathname: '/spotifyroundthree',selectedAlbum: 'Ahora o nunca'  }}
                    
                    >
                    <PopUp src={ronda3} btnRonda1={pop?'hideGame':'btnRonda3'}
                     language={language} todo={texts[language].popUp} instruct={texts[language].album +':Ahora o nunca'+' '+texts[language].spotifyRoundTwoQuestion}
                        popButton={'button3'} popText={texts[language].roundOneBtn} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'btnRonda3'} regButton={regButton3} language={language} score={score} gameIn="youtube" />;
        };
        // bonus
        const loginCompStarY = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to="memo" >
                    <PopUp language={language} src={star} btnRonda1={pop?'hideGame':'star'}
                     todo={texts[language].popUp} instruct={texts[language].memoInstructions}
                        popButton={'star'} popText={texts[language].roundOneBtn} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'star'} regButton={starRg} language={language} score={score} gameIn="youtube" />;
        };
        const loginCompStarS = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to="hangman" >
                    <PopUp language={language} src={star} btnRonda1={pop?'hideGame':'star'}
                     todo={texts[language].popUp} instruct={texts[language].hangmanInstruct}
                        popButton={'star'} popText={texts[language].roundOneBtn} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={pop?'hideGame':'star'} regButton={starRg} language={language} score={score} gameIn="youtube" />;
        };


        return (
            <MyContext.Consumer>
                {(context) => (
                    <>
                        <div>
                            {/* displaying the appropriate introduction, depending on chosen game */}
                            <div className={page}>
                                <div className={pop ? 'hideGame' : "title"}>
                                    <div style={{ position: 'absolute', top: '2vh', left: '0vw', width: '100%' }}>
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
                                                        <h4>{texts[language].youtubeInstructionsR1}</h4>
                                                    )
                                                    : null
                                        }
                                    </div>
                                </div>

                                <div className={allRounds}>

                                    
                                        <svg className={pop ? 'hideGame' : connection}  width="200" height="160" style={{ position: "relative", top: '9rem' }}><line x1="0" y1="0" x2="200" y2="160" stroke="#6965B4" stroke-width="10%" /></svg>
                                        <svg className={pop ? 'hideGame' : connection} width="30" height="250" style={{ position: "relative", top: '20rem' }}><line x1="15" y1="0" x2="15" y2="270" stroke="#6965B4" stroke-width="10%" /></svg>
                                        <svg className={pop ? 'hideGame' : connection} width="240" height="30" style={{ position: "relative", top: '27rem' }}><line x1="0" y1="0" x2="240" y2="0" stroke="#6965B4" stroke-width="10%" /></svg>
                                       
                                        
                                        {/* Home btn */}
                                    <Link className={pop ? 'hideGame' : 'title'} to="/"><img src={home1} onClick={this.backToHome} className={backToHome}
                                        type="button"></img></Link>

                                     {/* Rounds1 */}
                                    <div className={youtube ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        <DelayLink delay={5000} clickAction={this.popStart} to="spotifyroundone" >
                                            <PopUp src={ronda1} btnRonda1={pop?'hideGame':'btnRonda1'}
                                            language={language} todo={texts[language].popUp} instruct={texts[language].popUpSpotify}
                                                popButton={'button1'} popText={texts[language].roundOneBtn} />
                                        </DelayLink>
                                    </div>

                                    <div className={spotify  ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        <DelayLink delay={5000} clickAction={this.popStart} to="youtuberoundone" >
                                            <PopUp src={ronda1} btnRonda1={pop?'hideGame':'btnRonda1'}
                                            language={language} todo={texts[language].popUp} instruct={texts[language].popUpYoutube}
                                                popButton={'button1'} popText={texts[language].roundOneBtn} />
                                        </DelayLink>
                                    </div>

                                    {/* Rounds2 */}
                                    <div className={spotify ? 'hideGame' : 'title'}>
                                    <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompR2Y(context)}
                                    </div>
                                    <div className={youtube ? 'hideGame' : 'title'}>
                                    <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompR2S(context)}
                                    </div>
                                     {/* Round3 */}
                                     <div className={spotify  ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompR3Y(context)}
                                    </div>
                                    <div className={youtube  ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompR3S(context)}
                                    </div>
                                    
                                    {/* RoundStar */}
                                    <div className={spotify ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompStarY(context)}
                                    </div>
                                    <div className={youtube ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompStarS(context)}
                                    </div>
                                </div>

                            </div>

                            <div className="home-play-buttons">
                                <div>
                                    {this.state.accessToken
                                        ?
                                        <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                                            <i class="fab fa-spotify"></i>
                                            {texts[language].key}
                                        </button>
                                        :
                                        <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                                            <i class="fab fa-spotify"></i>
                                            {texts[language].keySpotifyBtnSecondClick}
                                        </button>}
                                </div>
                                <button type="button" className={this.props.youtubeButton} onClick={this.startYoutube}>
                                    <i class="fab fa-youtube"></i>
                                    {texts[language].youtubePlayWithButton}
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
