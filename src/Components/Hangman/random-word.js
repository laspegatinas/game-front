//import words from 'an-array-of-english-words';
// import { HelpJuanWords } from './HelpJuanWords';

export default (language) => {
  // const words = HelpJuanWords[language].words
  const words = ['hola', 'chau','mari','chichi']

  const wordIndex = Math.floor(Math.random() * words.length);

  return words[wordIndex];
}
