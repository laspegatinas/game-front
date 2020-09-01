/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import '../Youtube.css';
// import { Link } from 'react-router-dom';
import Register from '../../Register/Register';
import '../Youtube.css';
import texts from '../../../texts.json';
import YTGame from '../YTGame/YTGame';
import { MyContext } from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Navbar from '../../Navbar/Navbar';
import Rounds from '../../Rounds/Rounds';
import videoDataObject from '../VideoDataObject';
import Shuffle from '../../Utils/Shuffle';

class YoutubeRoundOne extends Component {

    state= {
        gameStatus: 'playing',
        data: {},
        randomVideoId: '',
        fourNonShuffledSongsTitles: [],
        questions: [],
        currentTitle: '',
       
    }

    componentDidMount = () => {
        const json = JSON.stringify(videoDataObject);
        const newdata = JSON.parse(json);

        this.setState({
            data: newdata,
        });

        // this is the question

        const arrayPlaylist = [];
        newdata.map((element) => {
        // here be the if statement
            arrayPlaylist.push(element.videoId);
            return arrayPlaylist;
            
        });

        console.log(arrayPlaylist);

        // create the random from one videoid, in Round 2 not random but chosen, push all the concerts in array, but take only ID of chosen one
         const randomVideoId = arrayPlaylist[Math.floor(Math.random() * arrayPlaylist.length)];
        // const randomVideoId = this.props.videoId;
        this.setState({
            randomVideoId,
            questions: newdata[arrayPlaylist.indexOf(randomVideoId)].questions,
            currentTitle: newdata[arrayPlaylist.indexOf(randomVideoId)].title,
            // currentSongTitle:
        });


        // create the array with the title of the songs for the button shuffle(tu put in other buttons)
        const arraySongTitles = [];
        newdata.map((element) => {
            arraySongTitles.push(element.title);
            return arraySongTitles;
        });
        // removed from the array the title of the song that is playing so it wont dublicate in the buttons
        arraySongTitles.splice(arrayPlaylist.indexOf(randomVideoId), 1);

        // shuffle function that reorganize the order of the song title
        const suffledArraySongTitles = Shuffle(arraySongTitles);
        const fourNonShuffledSongsTitles = suffledArraySongTitles.slice(0, 3); // actually 3

        // fourNonShuffledSongsTitles.push(currentSongName); // now 4

        //  const fourShuffledSongsTitles = Shuffle(fourNonShuffledSongsTitles)
        // console.log(fourShuffledSongsTitles)
        // return fourNonShuffledSongsTitles;
        this.setState({
            fourNonShuffledSongsTitles,
        });
    }

    stopPlaying = () => {
        this.setState({ gameStatus: 'gameOver1' });
    }

    restartYoutube = () => {
        this.setState({
            gameStatus: 'playing',
        });
    }

    render() {

        const { gameStatus } = this.state;

        const { language } = this.props;



        if (gameStatus === 'playing') {
            return (
                <div>
                    <YTGame object={videoDataObject} videoId={this.state.randomVideoId} data={this.state.data} currentTitle={this.state.currentTitle}
                    fourNonShuffledSongsTitles={this.state.fourNonShuffledSongsTitles} questionNumber={4}  language={language} stopPlaying={this.stopPlaying} 
                    questions={this.state.questions}/>
                </div>
            );
        }

        if (gameStatus === 'gameOver1') {
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <Navbar addedClass="fixTop" />
                          
                            <div className="youtube-game-over">
                                <h3>{`Has hecho ${localStorage.yt_points_1} puntos`}</h3>
                                <div className="btnContainer">
                                <Rounds backToHome={'hideGame'} connection={'hideGame'} allRounds={'allRoundsYoutube'} language={language} spotifyButton={'btn-game'} homeButton={'btn-game'} tokenButton={'btn-game'} youtubeButton={'hideGame'}
                                    instagramButton={'btn-game'}/>                                
                                 <button className='btn-game' onClick={this.restartYoutube}>{texts[language].playAgain}</button> 
                                 </div>
                                {context.state.username
                                    ? <Register language={language} buttonStyle={'suma-puntos-button'} buttonText={texts[language].keepPointsPlayMoreText} currentGame="youtube" roundIn= 'one'/>
                                    /* <Link to="youtuberoundtwo"><button className = 'navbar-btn' type="button" onClick={() => context.addPoints(this.counter)}>Juega una segunda ronda</button></Link> */
                                    : <UserForm nextButton={'navbar-btn'} language={language} />}
                            </div>
                           
                            <div className="social-media-follow-buttons">
                                <SocialMedia
                                    language={language}
                                />
                            </div>
                        </div>
                    )}
                </MyContext.Consumer>
            );
        }
        return null;
    }
}

export default YoutubeRoundOne;
