//import words from 'an-array-of-english-words';
// import { HelpJuanWords } from './HelpJuanWords';

export default (language) => {
  // const words = HelpJuanWords[language].words
  const words = [
    'adrià⎵salas',
    'rubén⎵sierra',
    'ovidi⎵díaz',
    'ferran⎵ibañez',
    'axel⎵magnani',
    'romain⎵renard',
    'sergi⎵lópez',
    'miki⎵florensa'
]

  const wordIndex = Math.floor(Math.random() * words.length);

  return words[wordIndex];
}
