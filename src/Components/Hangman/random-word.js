//import words from 'an-array-of-english-words';
import { HelpJuanWords } from '../../../Utils/HelpJuanWords';

export default (language) => {
  const words = HelpJuanWords[language].words
  const wordIndex = Math.floor(Math.random() * words.length);

  return words[wordIndex];
}
