import React from 'react';
import './MemoryGame.css';
import Table from './Table';
import Header from './Header';
import construirBaraja from './utils/construirBaraja';
import { MyContext } from '../../../../context/MyProvider';
import Navbar from '../../../Navbar/Navbar';
import Rounds from '../../../Rounds/Rounds';
import Register from '../../../Register/Register';
import SocialMedia from '../../../SocialMedia/SocialMedia';
import UserForm from '../../../Register/User/UserForm/UserForm';
import { Link } from 'react-router-dom';
import texts from '../../../../texts.json';

//import InstructionGames from '../SharedButtons/InstructionGames';
//import CloseButton from '../SharedButtons/CloseButton';

//import useWindowDimensions from './windowHandler'
// TESTING TO AVOID DOING ALL THE GAME UNTIL HAVING FINISHED :
//- change state.winner to "true"
//- delete the function set to calculte the result in Header.js

const initialState = () => {
  const deck = construirBaraja();
  return {
    deck,
    selectedCouple: [],
    itsComparing: false,
    tryes: 0,
    winner: true,
    points: 30
  };
}


class InstagramRoundTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState()
    console.log(construirBaraja)
  }

  // score = this.state.tryes ? (Math.round(10 / this.state.tryes * 100)).toString() : '0';
//console.log(score)

  // logScore = () => console.log(typeof this.state.points);

  render() {
    const { language } = this.props;
    const { tryes, points } = this.state;
    return(
      <MyContext.Consumer>
      {(context) => (
        this.state.winner 
        ?
        <div>
            <Navbar addedClass="fixTop" />
          
            <div className="instagram-game-over youtube-game-over">
                <h3>{`Has hecho ${ points } puntos`}</h3>
                    <Rounds language={language} spotifyButton={'btn-game'} homeButton={'btn-game'} tokenButton={'btn-game'} youtubeButton={'btn-game'}
                    instagramButton={'hideGame'}/> 
                    {/* <button onClick={this.logScore}>logScore</button> */}
                    {/*score={ Math.round(10 / tryes * 100)} ${ Math.round(10 / tryes * 100) }*/}               
                {/* <button className='btn-game' onClick={this.restartYoutube}>{texts[language].playAgain}</button>  */}
                {context.state.username
                    ? 
                    // <Register language={language} buttonText={texts[language].keepPointsPlayMoreText}
                    // buttonStyle={'suma-puntos-button'} score="" currentGame={"instagram2"} />
                    <Link to="/members" language={language} score={points}><button>
                      Got to next game
                      </button>
                    </Link>
                    
                    : <UserForm nextButton={'navbar-btn'} language={'spanish'} />}
            </div>
          
            <div className="social-media-follow-buttons">
                <SocialMedia
                    language={'spanish'}
                />
            </div>
        </div>
        :
            
          <div className="memory-body">
            {/* <InstructionGames  instructionText="Encuentra las parejas de cartas iguales.En cuanto menos intentos lo logres, más puntos acumularás" /> */}
            {/* <CloseButton /> */}
            <Header
            tryes={this.state.tryes}
            gameFinished={this.state.winner}
            resetGame={() => this.resetGame()}
            />
            <Table
            deck={this.state.deck}
            selectedCouple={this.state.selectedCouple}
            selectCard={(card) => this.selectCard(card)}
            />
          </div>
            )}
       </MyContext.Consumer>
    )
  }
//method to select card
  selectCard(card){
    if (
      this.state.itsComparing ||
      this.state.selectedCouple.indexOf(card) > -1 ||
      card.wasGuessed
    ) {
      return;
    }

    const selectedCouple = [...this.state.selectedCouple, card];
    this.setState({
      selectedCouple
    });
    if (selectedCouple.length === 2) {
      this.compareCouple(selectedCouple)
    }
  }

  //method to compare the couple selected
  compareCouple(selectedCouple) {
    this.setState({itsComparing: true});
    setTimeout(() =>{
      const [firstCard, secondCard] = selectedCouple;
      let deck = this.state.deck;

      if(firstCard.icon === secondCard.icon) {
        deck = deck.map((card) => {
          if(card.icon !== firstCard.icon) {
            return card;
          }

          return {...card, wasGuessed: true}
        })
      }
      this.verifyIfWinner(deck);
      this.setState({
        selectedCouple :[],
        deck,
        itsComparing: false,
        tryes: this.state.tryes + 1
      })
    }, 1000)
  }

//method to verify if there is a winner
  verifyIfWinner(deck) {
    if (deck.filter((card) => !card.wasGuessed).length === 0) {
    this.setState({
        winner: true,
        points: (Math.round(10 /this.state.tryes * 100)).toString(),
      });
      }
  }

  //method to reset the game
  resetGame() {
    this.setState(
      initialState()
    );
  }
}

export default InstagramRoundTwo;
