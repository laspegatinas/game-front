/* eslint-disable max-len */
/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import '../Youtube.css';
// import { Link } from 'react-router-dom';
import Register from '../../Register/Register';
import texts from '../../../texts.json';
import YTGame from '../YTGame/YTGame';
import { MyContext } from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Navbar from '../../Navbar/Navbar';
import Rounds from '../../Rounds/Rounds';
import videoDataObject2 from '../VideoDataObject2';
import GameEnded from '../../GameEnded/GameEnded';
import Shuffle from '../../Utils/Shuffle';

class YoutubeRoundThree extends Component {

    state= {
        gameStatus: 'playing',
        data: {},
        randomVideoId: '',
        fourNonShuffledSongsTitles: [],
        questions: [],
        currentTitle: '',
        
    }

    componentDidMount = () => {
        const json = JSON.stringify(videoDataObject2);
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

        //console.log(arrayPlaylist);

        // create the random from one videoid, in Round 2 not random but chosen, push all the concerts in array, but take only ID of chosen one
         const randomVideoId = "wFC_Ot6m_Qk";
         console.log(localStorage.ConcertId)
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
        this.setState({ gameStatus: 'gameOver' });
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
                    <YTGame object={videoDataObject2} language={language} stopPlaying={this.stopPlaying} questionNumber={9}  videoId={this.state.randomVideoId} data={this.state.data}
                     currentTitle={this.state.currentTitle}
                    fourNonShuffledSongsTitles={this.state.fourNonShuffledSongsTitles}  language={language} stopPlaying={this.stopPlaying} 
                    questions={this.state.questions}/>
                </div>
            );
        }

        if (gameStatus === 'gameOver') {
            return (
                <div>
                     <GameEnded currentGame="youtube" points={localStorage.yt_points_1} language={language}/>
                </div>
            )
        }
        return null;
    }
}

export default YoutubeRoundThree;
