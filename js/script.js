import { createBarDiagram, createTextScaleYDiagram, createTextColorDiagram, createStats, createText, createTopWords } from './diagram.js';
import { letters, words, sentences, readingTime } from './data.js';

let textInput = document.querySelector('#text-input');

const getData = (input) => {
  let dataLetters = letters(input);
  let dataLettersCount = Object.values(dataLetters).reduce((last, value) => last + value);
  let dataWords = words(input);
  let dataWordsCount = Object.values(dataWords).reduce((last, value) => last + value);
  let dataUniqueWordsCount = Object.keys(dataWords).length;
  let dataTopWords = Object.entries(dataWords).sort((a, b) => b[1] - a[1]).slice(0,5);
  let dataAverageWordLength = Math.round(Object.keys(dataWords).reduce((a, b) => a + b).length / dataWordsCount || 0);
  let dataSentences = sentences(input);
  let dataSentencesCount = dataSentences.length;
  let dataAverageSentenceLength = Math.round(dataSentences.reduce((a, b) => a + b).length / dataSentencesCount || 0);
  let dataAverageWordsPerSentence = Math.round(dataWordsCount / dataSentencesCount);
  let dataReadingTime = readingTime(dataWordsCount);

  return {
    letters: dataLetters,
    lettersCount: dataLettersCount,
    words: dataWords,
    wordsCount: dataWordsCount,
    uniqueWordsCount: dataUniqueWordsCount,
    topWords: dataTopWords,
    averageWordLength: dataAverageWordLength,
    sentences: dataSentences,
    sentencesCount: dataSentencesCount,
    averageSentenceLength: dataAverageSentenceLength,
    averageWordsPerSentence: dataAverageWordsPerSentence,
    readingTime: dataReadingTime
  }
}

const letterStats = (input) => {
  input = input.trim();
  let data = getData(input);
  createBarDiagram(data);
  createTextScaleYDiagram(input, data);
  createTextColorDiagram(input, data);
  createStats(data);
  createText(data);
  createTopWords(data);
}

const triggerStats = () => {
  let statistics = document.querySelector('.statistics');
  let welcome = document.querySelector('.welcome');
  if(textInput.value && textInput.value.trim()) {
    letterStats(textInput.value);
    statistics.style.display = 'block';
    welcome.classList.add('welcome--hidden');
  } else {
    statistics.style.display = 'none';
    welcome.classList.remove('welcome--hidden');
  }
}

textInput.addEventListener('input', triggerStats);