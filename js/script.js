import { createBarDiagram, createTextScaleYDiagram, createTextColorDiagram, createStats, createText } from './diagram.js';
import { letters, words, sentences, readingTime } from './data.js';

let textInput = document.querySelector('#text-input');

const getData = (input) => {
  let dataLetters = letters(input);
  let dataLettersCount = Object.values(dataLetters).reduce((last, value) => last + value);
  let dataWords = words(input);
  let dataWordsCount = Object.values(dataWords).reduce((last, value) => last + value);
  let dataUniqueWordsCount = Object.keys(dataWords).length;
  let dataSentences = sentences(input);
  let dataSentencesCount = dataSentences.length;
  let dataReadingTime = readingTime(dataWordsCount);

  return {
    letters: dataLetters,
    lettersCount: dataLettersCount,
    words: dataWords,
    wordsCount: dataWordsCount,
    uniqueWordsCount: dataUniqueWordsCount,
    sentences: dataSentences,
    sentencesCount: dataSentencesCount,
    readingTime: dataReadingTime
  }
}

const letterStats = (input) => {
  let data = getData(input);
  createBarDiagram(data);
  createTextScaleYDiagram(input, data);
  createTextColorDiagram(input, data);
  createStats(data);
  createText(data);
}

const triggerStats = () => {
  letterStats(textInput.value);
}

textInput.addEventListener('input', triggerStats);