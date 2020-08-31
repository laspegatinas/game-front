/* eslint-disable max-len */
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import Shuffle from '../../Utils/Shuffle';
import ButtonIgRoundOne from './ButtonIgRoundOne';
import texts from '../../../texts.json';
import SocialMedia from '../../SocialMedia/SocialMedia';
import Loading from '../../Utils/Loading/Loading';
import Register from '../../Register/Register';
import MyProvider, {  MyContext } from '../../../context/MyProvider';
import UserForm from '../../Register/User/UserForm/UserForm';
import Navbar from '../../Navbar/Navbar';
import Rounds from '../../Rounds/Rounds';
import '../Instagram.css';


class InstagramRoundOne extends Component {

    NUMBER_OF_ATTEMPTS = 4

    OFICIAL_NUMBER_OF_ATTEMPTS = this.NUMBER_OF_ATTEMPTS - 1

    state = {
        randomImageSrc: '',
        randomImageTags: '',
        tagsOptions: [],
        data: [],
        gameStatus: 'loading',
        userClicked: false,
        giveMeConfetti: false,
        trys: 0
    }

    attempts= 0;

    trys=0;

    counter= 0;

    apiCleanedResult = {}

    apiResultLength = 0

    // profileId='32402644';
    // Rut's ID

    profileId = '10934686';
    // LaPegatina ID

    numberOfPosts = '275';

    restartInstagram = () => {
       window.location.reload(true)
    }

    componentDidMount() {
        console.log(this.context)
        fetch(`https://www.instagram.com/graphql/query/?query_hash=e769aa130647d2354c40ea6a439bfc08&variables=
        {"id":"${this.profileId}","first":${this.numberOfPosts}}`)
            .then((res) => res.json())
            .then((data) => this.setState({ data: data.data.user.edge_owner_to_timeline_media.edges }))
            .then(() => this.cleanApiResponse())
            .then(() => this.setRandomImageAndTags());
    }

    // Cleans the object retrieved from the api and leaves an array of objects that just have the image
    // source for the picture and the image location
    cleanApiResponse = () => {

        const { data } = this.state;

        const images = data.filter((img) => img.node.edge_media_to_tagged_user.edges.length !== 0
            && img.node.edge_media_to_tagged_user.edges.length < 5);

        const result = images.map((image) => ({
            src: image.node.thumbnail_resources[4].src,
            tags: image.node.edge_media_to_tagged_user.edges.map((edge) => edge.node.user.username),
        }));

        this.apiCleanedResult = result;

        this.apiResultLength = result.length;
    }

    // Takes off the first element of the array resulting in cleanApiResponse (called result) and takes the next 3 elements
    setRandomImageAndTags = () => {

        Shuffle(this.apiCleanedResult);

        const firstElement = this.apiCleanedResult.shift();

        const imagesObjArr = this.apiCleanedResult.slice(0, 3);

        const threeTagsArr = imagesObjArr.map((imageObj) => imageObj.tags);

        threeTagsArr.push(firstElement.tags);
        // Cuando hacemos el push, el mismo array, con el mismo nombre, pasa de tener 3 elementos a tener 4.
        // Si igualamos esta array a una constante, no estaríamos guardando la array de 4 elementos resultante
        // sino que guardaríamos el resultado del push, que sería soplo el número 4, tantos como elementos tiene dentro la array

        const threeRandomPlusCorrectTagsArr = Shuffle(threeTagsArr);

        this.setState({
            randomImageSrc: firstElement.src,
            randomImageTags: firstElement.tags.map((tag) => tag),
            tagsOptions: threeRandomPlusCorrectTagsArr,
            gameStatus: 'playing',
            userClicked: false,
            giveMeConfetti: false,
        });

        this.attempts += 1;

        // if(this.attempts === this.apiResultLength) {
        if (this.attempts === this.NUMBER_OF_ATTEMPTS) {
            //alert('guardar datos round 1')
//            console.log('context State',state)
          
            this.setState({
                gameStatus: 'gameOver',
            });
        }
    }

    addOneToCounter = () => {
        this.counter += 1;

      
    }

    addClick = () => {

        
            this.trys += 1;
        
    }

    userHasClicked = () => {
        this.setState({
            userClicked: true,
        });
    }

    showConfetti = () => {
        this.setState({
            giveMeConfetti: true,
        });
    }

    formatOptions = (arrayOfTaggedPeople) => arrayOfTaggedPeople.map((person) => `@${person}`).join(', ')


    render() {

        const { language } = this.props;

        const { giveMeConfetti, randomImageSrc, tagsOptions, userClicked, gameStatus, randomImageTags, trys, data } = this.state;

        if (gameStatus === 'loading') {
            return (
                <div className="loading">
                    <Loading />
                </div>
            );
        }

        if (gameStatus === 'playing') {
            return (
            <div>{data 
                
                ?
                <div className="instagram-game">
                <div className="imageAndLocationsContainer">
                    <div className="imageDisplayedContainer">
                        <h1>{texts[language].instagramRoundOneQuestion}</h1>
                        <div className="imageDisplayed">
                            <img src={randomImageSrc} alt="radom capture from the user's instagram feed" />
                        </div>
                    </div>

                    <div className="instagram-location-buttons">
                        {tagsOptions.map((option, index) => (
                            <div key={index} className="instagram-option-button">
                                {
                                    // CONFETTI logic to show the confetti component, we only show the confetti component if (and only if) the confetti variable is true
                                    // CONFETTI check the confetti package and the demo related on their webpage to understand and play around with the props I used
                                    giveMeConfetti
                                && (
                                    <Confetti
                                        width={window.innerWidth}
                                        height={window.innerHeight}
                                        recycle={false}
                                        gravity={0.6}
                                    />
                                )
                                }
                                <ButtonIgRoundOne
                                    value={this.formatOptions(option)}
                                    currentTags={this.formatOptions(randomImageTags)}
                                    addToCounter={this.addOneToCounter}
                                    key={index}
                                    setRandomImageAndTags={this.setRandomImageAndTags}
                                    userClicked={userClicked}
                                    userHasClicked={this.userHasClicked}
                                    showConfetti={this.showConfetti}
                                    addClick={this.addClick}
                                />
                            </div>
                        ))}
                    </div>
                    <p className="score">
                        {texts[language].correctAnswers}
                        {`${this.attempts} / ${this.OFICIAL_NUMBER_OF_ATTEMPTS}`}
                    </p>
                </div>
            </div>
            :
                <div className="loading">
                <Loading />
                </div>
            
            }</div>

                
             
            
            );
        }

        if (gameStatus === 'gameOver') {
            
            return (
                <MyContext.Consumer>
                    {(context) => (
                        <div>
                            <Navbar addedClass="fixTop" />
                           
                            <div className="instagram-game-over">
                                <h1>{`Has hecho ${this.counter * 10} puntos`}</h1>
                                <div className="allBtns">
                                <Rounds  language={language} spotifyButton={'btn-game'} tokenButton={'btn-game'} homeButton={'btn-game'} youtubeButton={'btn-game'}
                                  connection={'hideGame'} allRounds={'allRoundsInstagram'} backToHome={'hideGame'} instagramButton={'hideGame'}/>                                
                                <button className='btn-game afterRound' onClick={this.restartInstagram}>{texts[language].playAgain}</button> 
                                </div>
                                {context.state.username || context.state.email
                                    ? <Register score={this.counter * 10} buttonText={texts[language].keepPointsPlayMoreText}
                                     buttonStyle={'suma-puntos-button'} currentGame="instagram" language={language} />
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


export default InstagramRoundOne;
