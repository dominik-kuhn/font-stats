import {mapRange, text} from './base.js';

export const createBarDiagram = (data) => {
  data = data.letters;
  let output = document.querySelector("#bar-diagramm");
  output.innerHTML = '';
  let svgNS = "http://www.w3.org/2000/svg";
  let svg = document.createElementNS(svgNS, "svg");
  let barWidth = 6;
  let maxBarHeight = 90;
  let barColor = '#000000';
  let barTextPadding = 10;
  let barMargin = 30;
  let dataMax = Math.max(...Object.values(data));
  let entriesCount = Object.keys(data).length;

  let barX = barMargin / 2;
  let barY = maxBarHeight;
  let textY = maxBarHeight + barTextPadding / 2;
  
  svg.setAttributeNS(null, 'width', (entriesCount * barWidth + entriesCount * barMargin));

  for (let [letter, count] of Object.entries(data)) {
    let barGroup = document.createElementNS(svgNS, "g");
    barGroup.setAttributeNS(null, 'class', 'bar');
    
    let barHeight = mapRange(count, 0, dataMax, 0, maxBarHeight);
    let bar = document.createElementNS(svgNS, "rect");
    bar.setAttributeNS(null, 'id', `bar-${letter}`);
    bar.setAttributeNS(null, 'x', barX);
    bar.setAttributeNS(null, 'y', `${barY - barHeight}%`);
    bar.setAttributeNS(null, 'rx', barWidth / 2);
    bar.setAttributeNS(null, 'yx', barWidth / 2);
    bar.setAttributeNS(null, 'width', barWidth);
    bar.setAttributeNS(null, 'height', `${barHeight}%`);
    bar.setAttributeNS(null, 'fill', barColor);

    let barLabel = document.createElementNS(svgNS, "text");
    barLabel.setAttributeNS(null, 'id', `label-${letter}`);
    barLabel.setAttributeNS(null, 'x', barX + barWidth / 2);
    barLabel.setAttributeNS(null, 'y', `${textY}%`);
    barLabel.setAttributeNS(null, 'dominant-baseline', 'middle');
    barLabel.setAttributeNS(null, 'text-anchor', 'middle');
    barLabel.textContent = letter;
    
    barX += barWidth + barMargin;

    barGroup.appendChild(bar);
    barGroup.appendChild(barLabel);
    svg.appendChild(barGroup);
  }
  output.appendChild(svg);
}

export const createTextScaleYDiagram = (input, data) => {
  data = data.letters;
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxHeight = 3;
  let minHeight = 0.5;
  let output = document.querySelector('#textscaley-diagramm');
  output.innerHTML = '';
  
  let spanWord = document.createElement('span');
  spanWord.classList.add('diagram-word');
  for (let c of input) {
    if(c == ' ') {
      output.appendChild(spanWord);
      output.appendChild(document.createTextNode(' '));
      spanWord = document.createElement('span');
      spanWord.classList.add('diagram-word');
    } else if (c.match(/\r|\n/)) {
      output.appendChild(spanWord);
      output.appendChild(document.createElement('br'));
      spanWord = document.createElement('span');
      spanWord.classList.add('diagram-word');
    } else {
      let spanLetter = document.createElement('span');
      spanLetter.innerHTML = c;
      c = c.toLowerCase();
      spanLetter.style.transform = `scaleY(${mapRange(data[c], min, max, minHeight, maxHeight)})`;
      spanWord.appendChild(spanLetter);
    }
  }
  output.appendChild(spanWord);
}

export const createTextColorDiagram = (input, data) => {
  data = data.letters;
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxLightness = 1;
  let minLightness = 0.2;
  let output = document.querySelector('#textcolor-diagramm');
  output.innerHTML = '';

  let spanWord = document.createElement('span');
  spanWord.classList.add('diagram-word');
  for (let c of input) {
    if(c == ' ') {
      output.appendChild(spanWord);
      output.appendChild(document.createTextNode(' '));
      spanWord = document.createElement('span');
      spanWord.classList.add('diagram-word');
    } else if (c.match(/\r|\n/)) {
      output.appendChild(spanWord);
      output.appendChild(document.createElement('br'));
      spanWord = document.createElement('span');
      spanWord.classList.add('diagram-word');
    } else {
      let spanLetter = document.createElement('span');
      spanLetter.innerHTML = c;
      c = c.toLowerCase();
      spanLetter.style.color = `rgba(0, 0, 0, ${(data[c] ? mapRange(data[c], min, max, minLightness, maxLightness) : minLightness)})`;
      spanWord.appendChild(spanLetter);
    }
  }
  output.appendChild(spanWord);
}

export const createStats = (data) => {
  let output = document.querySelector("#basic-stats");
  output.innerHTML = '';
  output.innerHTML += `${data.sentencesCount} ${data.sentencesCount === 1 ? 'Satz' : 'Sätze'}`;
  output.appendChild(document.createElement('br'));
  output.innerHTML += `${data.wordsCount} ${data.wordsCount === 1 ? 'Wort' : 'Wörter'}`;
  output.appendChild(document.createElement('br'));
  output.innerHTML += `${data.lettersCount} ${data.lettersCount === 1 ? 'Buchstabe' : 'Buchstaben'}`;
  output.appendChild(document.createElement('br'));
  output.innerHTML += `${data.readingTime.h ? data.readingTime.h + 'h ' : ''}${data.readingTime.m}m ${data.readingTime.s}s Lesezeit`;
}

export const createTopWords = (data) => {
  let output = document.querySelector("#top-words");
  output.innerHTML = '';
  
  for(let [i, [word, count]] of Object.entries(data.topWords)) {
    i = parseInt(i);
    let topWordGroup = document.createElement('div');
    let topWord = document.createElement('div');
    if(i === 0) {
      topWord.classList.add('top-1');
    } else {
      topWord.classList.add('top-other');
    }
    topWord.innerHTML = `${i + 1}. ${word}`;
    let topCount = document.createElement('span');
    topCount.classList.add('top-count');
    topCount.innerHTML = `${count}x`;
    topWord.appendChild(document.createTextNode(' '));
    topWord.appendChild(topCount);
    topWordGroup.appendChild(topWord);
    output.appendChild(topWordGroup);
  }
}

export const createText = (data) => {
  let output = document.querySelector("#stats-in-text");
  output.innerHTML = '';

  output.innerHTML += text('counts', {
    lettersCount: data.lettersCount, 
    wordsCount: data.wordsCount, 
    uniqueWordsCount: data.uniqueWordsCount, 
    sentencesCount: data.sentencesCount
  });
  output.innerHTML += text('average', {
    averageWordLength: data.averageWordLength,
    averageSentenceLength: data.averageSentenceLength,
    averageWordsPerSentence: data.averageWordsPerSentence
  });
  output.innerHTML += text('readingTime', {time: `${data.readingTime.h ? data.readingTime.h + 'h ' : ''}${data.readingTime.m}m ${data.readingTime.s}s`});
  output.innerHTML += text('topWordsIntroduction');
  for(let [word, count] of data.topWords) {
    output.innerHTML += text('topWords', {
      word: word,
      count: count
    });
  }
  for (let [letter, count] of Object.entries(data.letters)) {
    if(count === 0)
      continue;

    if(letter.match(/[0-9]/))
      output.innerHTML += text('numbers', {letter: letter, count: count});
    else
      output.innerHTML += text('letters', {letter: letter, count: count});
  }
}
