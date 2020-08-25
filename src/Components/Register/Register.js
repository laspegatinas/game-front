/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../context/MyProvider';
import '../Home/Home.css';
import './Register.css';
import Spotify from '../Utils/Spotify';
//import videoDataObject from '../Youtube/VideoDataObject';
import Concerts from '../Youtube/Concerts/Concerts';
import texts from '../../texts.json';
import ronda2 from '../../Pictures/ronda2.png';
//import InstagramRoundTwo from '../Instagram/InstagramRoundTwo/MemoryGame/InstagramRoundTwo';
import MembersAccounts from '../Instagram/InstagramRoundThree/MembersAccounts';
//import Rounds from '../Rounds/Rounds';



class Register extends Component {

    state = {

        link: 'hide',
        loading: true,
        albums: [],
        selectedAlbum: '',
        videoData: [],
        // videoId: '',
        questions: [],
        setSelectedMemberId: '',
        selectedConcert: localStorage.ConcertId || '',
        picData: [],
        choseConcert: false
    };


    async getSpotifyAlbums() {
        const unSecretoAVoces = await Spotify.getAlbumsImages('0KHcK2Qehfh1imPj5NJXZz');

        // Ahora o nunca
        const ahoraONunca = await Spotify.getAlbumsImages('1gVTdZJaemKysGPHgMQfvD');

        // La Gran Pegatina Live 2016
        const laPegatinaLive2016 = await Spotify.getAlbumsImages('3yAo1PKKqDKK3JzaZNAIVU');

        // Revulsiu
        const revulsiu = await Spotify.getAlbumsImages('1QhYAMuClrXwodJbdWr9kb');

        // Eureka!
        const eureka = await Spotify.getAlbumsImages('6wTQ7zBcv3hwG3jSvBb6nI');

        // Xapomelon
        const xapomelon = await Spotify.getAlbumsImages('5YGUW9OJPCoT3bUySE50X7');

        // Via Mandarina
        const viaMandarina = await Spotify.getAlbumsImages('17xrJ6CwY9OEtof17QV9OB');

        // Al carrer
        const alCarrer = await Spotify.getAlbumsImages('4GDvxuvYI9ZrnBOiE8of32');

        const albums = [
            unSecretoAVoces,
            ahoraONunca,
            laPegatinaLive2016,
            revulsiu,
            eureka,
            xapomelon,
            viaMandarina,
            alCarrer,
        ]

        console.log(albums)

        this.setState({
            albums,
        });

    }


    showLink = (context, newPoints, gameName, roundIn) => {
        context.addPoints(newPoints, gameName, roundIn);
        this.setState({
            link: 'screen',
        });
    }


    setSelectedAlbumId = (id) => {
        localStorage.setItem('AlbumId', id);
    }

    componentDidMount() {
        const { currentGame } = this.props;
        console.log('Register.js', currentGame)
        if (currentGame === 'spotify') {
            this.getSpotifyAlbums();
        }
    }

    render() {
        const { currentGame, score, language } = this.props;

        const { link, albums } = this.state;

        if (currentGame === 'spotify') {

            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div >
                            <div className={link}>
                                <div className="screenDiv">
                                    <div className="screenDiv__firstDiv">
                                        <h1 className="round2Title">{texts[language].roundTwoText}</h1>
                                        <h2>{texts[language].spotifyRoundTwoQuestion}</h2>
                                        <h2>{texts[language].chooseAlbumText}</h2>
                                    </div>
                                    <div className="allAlbumsDiv">
                                        {albums.map((albumObject) => (
<<<<<<< HEAD


                                            <Link to={{ pathname: '/spotifyRoundTwo' }}>
                                                <button
                                                    type="button"
                                                    className="buttonAlbum"
                                                    onClick={(event) => {

                                                        this.showLink(context, score, 'spotify', 'one');
                                                        this.setSelectedAlbumId(event.target.alt)
                                                        this.setState({
                                                            selectedAlbum: event.target.alt
                                                        })
                                                    }
                                                    }>
                                                    {/* { <button className="albumPoints">{context.state.spotify_round_two_extended[albumObject.name] + '/200'}</button>} */}
                                                    <br />
                                                    <img
                                                        src={albumObject.images[0].url}
                                                        alt={albumObject.name}
                                                        className="blackBorder album"
                                                    />
                                                </button>
                                            </Link>
=======
                                             
                                                    
                                <Link to={{ pathname: '/spotifyRoundTwo' }}> 
                                     <button
                                                type="button"
                                                className="buttonAlbum"
                                                onClick={  (event) => {
                                                                     
                                                                        this.showLink(context,score, 'spotify', 'one');
                                                                        this.setSelectedAlbumId(event.target.alt)                                                                   
                                                                        this.setState({ 
                                                                         selectedAlbum: event.target.alt                                                                   
                                                                        })
                                                                    }      
                                                                    }>
                                              {/* { <button className="albumPoints">{context.state.spotify_round_two_extended && context.state.spotify_round_two_extended[albumObject.name] + '/200'}</button>} */}
                                               <br/>
                                                <img
                                                    src={albumObject.images[0].url}
                                                    alt={albumObject.name}
                                                    className="blackBorder album"
                                                />
                                            </button>
                                        </Link> 
>>>>>>> fe1a2090f57b5a8178096f958d7c07a15f668b8a
                                        ))}
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD

                            <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'spotify', 'one')}>
                                {this.props.buttonText}
                            </button>

=======
                            <img type="button"
                                className={'btnRonda2'} src={ronda2}
                                onClick={() => this.showLink(context, score, 'spotify', 'one')}
                            />
                            
                            {/* <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'spotify', 'one')}>
                                {this.props.buttonText}
                            </button> */}
                          
>>>>>>> fe1a2090f57b5a8178096f958d7c07a15f668b8a
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'youtube') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <div className={link}>
                                <div className="youtube-game-over">
                                    <h1 className={this.state.choseConcert ? 'hide' : "header"}>{texts[language].roundTwoText}</h1>
                                    {/* <h2 className="header">{texts[language].roundTwoYoutube}</h2>
                                    <h2 className="round-first-question">{texts[language].youtubeInstructionsR2}</h2> */}
                                    <h2 className={this.state.choseConcert ? 'hide' : "round-second-question"}>{texts[language].chooseConcertText}</h2>
                                    <button className={'concertButton'} onClick={() => this.setState({ choseConcert: true })}>
                                        <Concerts language={language} />
                                    </button>
                                </div>
                            </div>
                            <img type="button"
                                className={'btnRonda2'} src={ronda2}
                                onClick={() => this.showLink(context, localStorage.yt_points_1, 'youtube', 'one')}
                            />
                            {/* <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, localStorage.yt_points_1, 'youtube', 'one')}>
                                {this.props.buttonText}
                            </button> */}
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

        if (currentGame === 'instagram') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div className="instagram-round">
                            <div className={link}>
                            </div>
                            <div>
<<<<<<< HEAD
                                <Link to="instagramroundtwo"><button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'instagram', 'one')}>
                                    {this.props.buttonText}
                                </button></Link>
=======
                            <Link to="instagramroundtwo">
                            <img type="button"
                                className={'btnRonda2'} src={ronda2}
                                onClick={() => this.showLink(context, score, 'instagram', 'one')}
                            />
                                 {/* <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'instagram', 'one')}>
                                {this.props.buttonText}
                                </button> */}
                            </Link> 
>>>>>>> fe1a2090f57b5a8178096f958d7c07a15f668b8a
                            </div>

                        </div>
                    )}
                </MyContext.Consumer>
            );
        }

<<<<<<< HEAD
        if (currentGame === 'instagram2') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div className="instagram-round">
                            <div className={link}>
                                <h1 className="header">{texts[language].roundThreeText}</h1>
                                <div>
                                    <MembersAccounts
                                        setSelectedMemberId={this.setSelectedMemberId}
                                        language={language}
                                        score={score}
                                    />
                                </div>
                            </div>
                            <div>
                                <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'instagram', 'two')}>
                                    {this.props.buttonText}
                                </button>
                            </div>

                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
=======
        // if (currentGame === 'instagram2') {
        //     return (
        //         <MyContext.Consumer>
        //             {(context) => (
        //                 <div className="instagram-round">
        //                     <div className={link}>
        //                         <h1 className="header">{texts[language].roundThreeText}</h1>
        //                      <div>
        //                             <MembersAccounts
        //                                 setSelectedMemberId={this.setSelectedMemberId}
        //                                 language={language}
        //                                 score={score}
        //                             />
        //                         </div>                               
        //                     </div>
        //                     <div>
        //                         <button className={this.props.buttonStyle} type="button" onClick={() => this.showLink(context, score, 'instagram', 'two')}>
        //                         {this.props.buttonText}
        //                         </button>
        //                     </div>

        //                 </div>
        //             )}
        //         </MyContext.Consumer>
        //     );
        // }
>>>>>>> fe1a2090f57b5a8178096f958d7c07a15f668b8a

        return null;
    }
}

export default Register;
