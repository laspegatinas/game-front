import React, { useCallback, useContext, useState } from "react";
import Chrono from "./Chrono";
import texts from '../../texts.json';
import { MyContext } from "../../context/MyProvider";
import gameFactory from "./game-state-factory";
import { GAME_WON, GAME_STARTED, GAME_OVER } from "./game-states";
import GameContainer from "./GameContainer";
import confetti from '../Utils/confetti';
import randomWord from './random-word';
import { Link } from 'react-router-dom';
import SocialMedia from '../SocialMedia/SocialMedia';
import Navbar from '../Navbar/Navbar';



import "./HelpJuan.scss";

const HelpJuan = ({language}) => {
  const context = useContext(MyContext);
  console.log(context)
//   addScore = (context, newPoints, gameName, roundIn) => {
//     context.addPoints(newPoints, gameName, roundIn);
   
// }

  console.log(language)
  const [points,setPoints] = useState(0)
  const [state, setState] = useState(gameFactory.newGame(language));
  const [timerOn, setTimerOn] = useState(false);
  const [hits, setHits] = useState(0);
  const [showModal, setShowModal] = useState(false);  

  const onLetterClick = useCallback((letter, e) => {
    e.preventDefault();

    const firstIndex = state.word.indexOf(letter);
    if (firstIndex !== -1) {
      const letters = state.letters.map((letterObject) => {
        if (letterObject.value === letter) {
          return Object.assign({}, letterObject, {
            guessed: true,
          });
        }

        return letterObject;
      });

      // Check if the game has been won
      const gameWon = letters.reduce((winState, currentObject) => {
        return winState && currentObject.guessed;
      }, true);

      setState((prevState) => {
        return {
          ...prevState,
          letters,
          pastGuesses: [letter].concat(prevState.pastGuesses),
          gameState: gameWon ? GAME_WON : GAME_STARTED,
        };
      });
    } else {
      setState((prevState) => {
        // Update number of attempts left
        const guessesLeft = prevState.guesses - 1;
        let stateUpdate = {
          guesses: guessesLeft,
        };

        // Kill the game if needed
        if (guessesLeft === 0) {
          onRestartClick(e)
        }

        // Update the letters already tried
        stateUpdate.pastGuesses = [letter].concat(prevState.pastGuesses);

        return { ...prevState, ...stateUpdate };
      });
    }
  });
   
  React.useEffect(() => {
    console.log(state);
    if (state.gameState === GAME_WON) {      
      const gameWord = randomWord(language);  
      setHits(hits + 1);
      setPoints(points + 10)
      setState(gameFactory.newGame(gameWord));
    } else {
      if (!state.guesses) {
        setTimerOn(false);
        // endIt()

      }
    }
  }, [state]);
  console.log(points)

  const onRestartClick = (e) => {
    e.preventDefault();
    const gameWord = randomWord(language);  
    setState(gameFactory.newGame(gameWord));
    setTimerOn(true);
    setHits(0);
  };
const endIt = () =>{ 
        if(GAME_OVER){ 
            confetti.start();
            setTimeout(() => {
              confetti.stop();
            }, 2000);
            return  (      
            <div>
            <Navbar addedClass="fixTop" />
          
            <div className="instagram-game-over youtube-game-over">
                <h3>{`Has hecho ${ points } puntos`}</h3>

                  <Link to="/" language={language} score={points}><button onClick={() => context.addPoints(points, 'instagram', 'one')} className="suma-puntos-button">
                      {texts[language].keepPointsPlayMoreText}
                      </button>
                  </Link>
                           {/* <Link to="/" language={language} ><button  className="suma-puntos-button">
                      {texts[language].keepPointsPlayMoreText}
                      </button>
                    </Link> */}
            </div>
          
            <div className="social-media-follow-buttons">
                <SocialMedia
                    language={'spanish'}
                />
            </div>
        </div>
            )
        }
        return endIt()
      }

  return (
    timerOn===false && hits !== 0 ?
     endIt()
     :(
    <div className="HelpJuan">
 
      <div className="row timeAndActualNumber">
        <div className="col-12 col-md-6 justifyCenter">
          <p className="chronoText">
            {timerOn === false ? (
              "00:00:00"
            ) : (
              <Chrono 
              setTimerOn={setTimerOn}
              language={language}
               />
            )}
          </p>
        </div>
        <div className="col-12 col-md-6 justifyCenter">
          <p>
          {texts[language].hitsHangman}: &nbsp;&nbsp;&nbsp;{" "}
            <span style={{ fontWeight: "bold", fontSize: "x-large" }}>
              {hits}
            </span>
          </p>
        </div>
      </div>
      <GameContainer
        timerOn={timerOn}
        onLetterClick={onLetterClick}
        onRestartClick={onRestartClick}
        {...state}
        hits={hits}
        language={language}
      />
    </div>
     )
     
  );
};

export default HelpJuan;
