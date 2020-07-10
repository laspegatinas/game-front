/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import texts from '../../texts.json';
import './Rounds.css';
import '../../App.css';
import '../Home/Home.css';
import spotifyLogo from '../../Pictures/spotify-32.jpg';
import instagramLogo from '../../Pictures/instagram-6-32.jpg';
import youtubeLogo from '../../Pictures/play-4-32.jpg';
import { MyContext } from '../../context/MyProvider';
import UserForm from '../Register/User/UserForm/UserForm';
import Register from '../Register/Register';

class Rounds extends React.Component {

    state = {
        
        page: 'hideGame',
        button: 'btn-game',
        spotify: false,
        youtube: false,
        instagram: false,
    }

     

    startSpotify = () => {

        const spotStart = true;
        const start = 'screen';

        localStorage.setItem('savedState', JSON.stringify(this.context));

        // localStorage.setItem('spotifyRound', true);

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


    render() {

        const { page, instagram, youtube, spotify, button } = this.state;

        const { language, score } = this.props;

        const loginComp = (context) => {

            const { state: { username } } = context;
    
            if (username) {
               
                return (
                    <Register score={score} currentGame="spotify" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        const loginComp2 = (context) => {

            const { state: { username } } = context;
    
            if (username) {
               
                return (
                    // change style with props
                    <Register score={score} currentGame="instagram" language={language} />
                );
            }
    
            return <UserForm language={language} score={score} gameIn="spotify" />;
        };

        return (
            <MyContext.Consumer>
            {(context) => (
                <>
            <div>
                <div className={page}>
                    <div className="title">
                       <h1 >{texts[language].roundOneText}</h1>
                    {spotify ?
                        (
                            <h4>{texts[language].spotifyRoundOneQuestion}</h4>
                        )
                        : instagram ?
                        (
                            <h4>{texts[language].instagramRoundOneQuestion}</h4>
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
                        {/*insert register component*/ }
                    </div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="spotifyroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <div className={youtube || instagram ? 'hideGame' : 'title'} >{loginComp(context)}</div>
                    <Link className={youtube || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Spotify}</button></Link>
                    
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="youtuberoundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound2Youtube}</button></Link>
                    <Link className={spotify || instagram ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Youtube}</button></Link>

                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="instagramroundone"><button className="button1" type="button">{texts[language].startRound1}</button></Link>
                    <div className={spotify || youtube ? 'hideGame' : 'title'} >{loginComp2(context)}</div>
                    <Link className={spotify || youtube ? 'hideGame' : 'title'} to="/"><button className="button1" type="button">{texts[language].startRound3Instagram}</button></Link>
                </div>
                {/* e.g. spotify true? --> spotify option in home tauschen */}
                <div className="home-play-buttons">
                    <button type="button" className={this.props.spotifyButton} onClick={this.startSpotify}>
                        <img className="home-btn-image" src={spotifyLogo} alt="music" />
                        {texts[language].spotifyPlayWithButton}
                    </button>
                    <button type="button" className={this.props.youtubeButton} onClick={this.startYoutube}>
                        <img className="home-btn-image" src={youtubeLogo} alt="music" />
                        {texts[language].youtubePlayWithButton}
                    </button>
                    <button type="button" className={this.props.instagramButton} onClick={this.startInsta}>
                        <img className="home-btn-image" src={instagramLogo} alt="music" />
                        {texts[language].instagramPlayWithButton}
                    </button>
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
