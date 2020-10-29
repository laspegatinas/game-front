import { GAME_STARTED } from './game-states';

export default {
  newGame: (gameWord) => {
    return {
      word: gameWord,
      letters: gameWord.split('').map(letter => ({
        value: letter,
        guessed: false,
      })),
      guesses: 5,
      gameState: GAME_STARTED,
      pastGuesses: [],
    };
  }
}
