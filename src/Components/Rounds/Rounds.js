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
import homebtn from '../../Pictures/home45.png';
import home1 from '../../Pictures/home1.png';
import regButton from '../../Pictures/regButton (2).png';
import regButton3 from '../../Pictures/regButton3 (1).png';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';
import Spotify from '../Utils/Spotify';
import { PopUp } from '../Rounds/PopUp';
import { PopUp2 } from '../Rounds/PopUp'
import star from '../../Pictures/Star.png'
import YoutubeRoundTwo from '../Youtube/YoutubeRoundTwo/YoutubeRoundTwo';


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

    startMemo = () => {	
        const instaStart = true;	
        const start = 'screen';	
        this.setState({	
            instagram: instaStart,	
            page: start,	
            button: 'hideGame',	
        });	
    }

    render() {


        const { page, instagram, youtube, spotify, pop } = this.state;
        const { language, score, connection, allRounds, backToHome } = this.props;

        // const loginComp = (context) => {
        //     const { state: { username, email } } = context;
        //     if (username || email) {
        //         return (
        //             <Register buttonStyle={'hideGame'} imageStyle={'btnRonda2'} buttonSrc={ronda2}
        //             score={score} currentGame="spotify" language={language} />
        //         );
        //     };
        //     return <UserForm nextButton={'btnRonda2'} regButton={regButton} language={language} score={score} gameIn="spotify" />;
        // };
        const loginCompR2 = (context) => {
            const { state: { username, email } } = context;
            if (username || email) {
                return (
                    <DelayLink delay={5000} buttonStyle={'hideGame'}
                    clickAction={this.popStart} to="youtuberoundtwo" >
                    <PopUp2 language={language} todo={texts[language].popUp} instruct={texts[language].popUpSpotify}
                        popButton={'button2'} popText={texts[language].roundOneBtn} />
                </DelayLink>
                )
            };
            return <UserForm nextButton={'btnRonda2'} regButton={regButton} language={language} score={score} gameIn="youtube" />;
        };

        // const loginComp2 = (context) => {
        //     const { state: { username, email } } = context;
        //     if (username || email) {
        //         return (
        //             <Register buttonStyle={'hideGame'} imageStyle={'btnRonda2'} buttonSrc={ronda2}
        //             score={score} currentGame="instagram" language={language} />
        //         );
        //     };
        //     return <UserForm nextButton={'btnRonda2'}  regButton={regButton} language={language} score={score} gameIn="instagram" />;
        // };

        // const loginComp3 = (context) => {
        //     const { state: { username, email } } = context;
        //     if (username || email) {
        //         return (
        //             <Register imageStyle={'btnRonda2'} buttonSrc={ronda2} buttonStyle={'hideGame'}
        //             score={score} currentGame="youtube" language={language} />
        //         );
        //     };
        //     return <UserForm nextButton={'btnRonda2'} regButton={regButton} language={language} score={score} gameIn="youtube" />;
        // };

        // const loginComp4 = (context) => {
        //     const { state: { username, email } } = context;
        //     if (username || email) {
        //         return (
        //             <Link to="/memo" language={language} score={score}><img src={star} type="button" />
        //             </Link>
        //         );
        //     };
        //     return <UserForm nextButton={'btnRonda3'} regButton={regButton3} language={language} score={score} gameIn="youtube" />;
        // };

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
                                        {/* <img className={pop ? 'hideGame' : connection} src={star} style={{ position: "relative", top: '25rem', left: '-4rem' }} /> */}

                                        

                                    <Link className={pop ? 'hideGame' : 'title'} to="/"><img src={home1} onClick={this.backToHome} className={backToHome}
                                        type="button"></img></Link>
                                     {/* Round1 */}
                                    <div className={youtube || instagram ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        <DelayLink delay={5000} clickAction={this.popStart} to="spotifyroundone" >
                                            <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpSpotify}
                                                popButton={'button1'} popText={texts[language].roundOneBtn} />
                                        </DelayLink>
                                    </div>

                                    <div className={spotify || instagram ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        <DelayLink delay={5000} clickAction={this.popStart} to="youtuberoundone" >
                                            <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpYoutube}
                                                popButton={'button1'} popText={texts[language].roundOneBtn} />
                                        </DelayLink>
                                    </div>
                                    {/* Round2 */}
                                    <div className={spotify || instagram ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {loginCompR2(context)}
                                    </div>

                                    {/* <div className={youtube || instagram ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        {/* button invokes a method that first shows popup and then with set timeout got to round one of the game*/}
                                        {/* <DelayLink delay={5000} clickAction={this.popStart} to="spotifyRoundTwo" >
                                            <PopUp language={language} todo={texts[language].popUp} instruct={texts[language].popUpSpotify}
                                                popButton={'button1'} popText={texts[language].roundOneBtn} />
                                        </DelayLink>

                                    </div>  */}
                                    {/* <div className={youtube || instagram || pop ? 'hideGame' : 'title'}>
                                        {/* {context.state.spotify_round_two || ''}          */}
                                        {/* {loginComp(context)} */}
                                    {/* </div>
                                    <Link className={youtube || instagram || pop ? 'hideGame' : 'title'} to="/"><img className="btnRonda3" src={regButton3} type="button" /></Link> */} 



                                    {/* <div className={spotify || instagram || pop ? 'hideGame' : 'title'} >{loginComp3(context)}</div>
                                    <Link className={spotify || instagram || pop ? 'hideGame' : 'title'} to="/"><img className="btnRonda3" src={regButton3} type="button" /></Link>
                                    <div className={spotify || youtube || pop ? 'hideGame' : 'title'} >{loginComp4(context)}</div> */}
                                    {/* memo */}
                                    <div className={spotify ? 'hideGame' : 'title'}>
                                        <div className={pop ? 'hideGame' : ''}></div>
                                        <DelayLink delay={5000} clickAction={this.popStart} to="/memo" >
                                            <PopUp language={language} popButton={'button1'} todo={texts[language].popUp} instruct={texts[language].popUpInstagram}
                                                popText={texts[language].roundOneBtn} src={star}
                                                 />
                                        </DelayLink>
                                    </div>

                                    {/* <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link> */}
                                    {/* <div className={spotify || youtube || pop ? 'hideGame' : 'title'} >{loginComp2(context)}</div> */}
                                    {/* <Link className={spotify || youtube || pop ? 'hideGame' : 'title'} to="instagramroundthree"><button className="button1" type="button">{texts[language].startRound3Instagram}</button></Link> */}
                                    {/* <div className={spotify || youtube || pop ? 'hideGame' : 'title'} >{loginComp4(context)}</div> */}
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
