import {mapRange, text} from './base.js';

export const createBarDiagram = (data) => {
  data = data.letters;
  let svg = document.querySelector("#bar-diagramm");
  let svgNS = "http://www.w3.org/2000/svg";
  let barHeight = 35;
  let maxBarWidth = 100;
  let barColor = '#000000';
  let barTextPadding = 10;
  let barMargin = 15;
  let dataMax = Math.max(...Object.values(data));
  let entriesCount = Object.keys(data).length;
  let barX = 0;
  let barY = barMargin / 2;

  svg.innerHTML = '';
  svg.setAttributeNS(null, 'height', (entriesCount * barHeight + entriesCount * barMargin));

  for (let [letter, count] of Object.entries(data)) {
    let barGroup = document.createElementNS(svgNS, "g");
    barGroup.setAttributeNS(null, 'class', 'bar');
    
    let barWidth = mapRange(count, 0, dataMax, 0, maxBarWidth);
    let bar = document.createElementNS(svgNS, "rect");
    bar.setAttributeNS(null, 'id', `bar-${letter}`);
    bar.setAttributeNS(null, 'x', barX);
    bar.setAttributeNS(null, 'y', barY);
    bar.setAttributeNS(null, 'width', barWidth + '%');
    bar.setAttributeNS(null, 'height', barHeight);
    bar.setAttributeNS(null, 'fill', barColor);

    let barLabel = document.createElementNS(svgNS, "text");
    barLabel.setAttributeNS(null, 'id', `label-${letter}`);
    barLabel.setAttributeNS(null, 'x', barX + barTextPadding);
    barLabel.setAttributeNS(null, 'y', barY + barHeight / 2);
    barLabel.setAttributeNS(null, 'dominant-baseline', 'middle');
    barLabel.textContent = letter;
    
    barY += barHeight + barMargin;

    barGroup.appendChild(bar);
    barGroup.appendChild(barLabel);
    svg.appendChild(barGroup);
  }
}

export const createTextScaleYDiagram = (input, data) => {
  data = data.letters;
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxHeight = 3;
  let minHeight = 0.5;
  let textOutput = document.querySelector("#textscaley-diagramm");
  textOutput.innerHTML = "";

  for (let c of input) {
    let span = document.createElement('span');
    span.innerHTML = c;
    c = c.toLowerCase();
    span.style.transform = "scaleY(" + mapRange(data[c], min, max, minHeight, maxHeight) + ")";
    textOutput.appendChild(span);
  }
}

export const createTextColorDiagram = (input, data) => {
  data = data.letters;
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxLightness = 1;
  let minLightness = 0.1;
  let textOutput = document.querySelector("#textcolor-diagramm");
  textOutput.innerHTML = "";

  for (let c of input) {
    let span = null;
    if(c == ' ') {
      span = document.createTextNode(' ');
    } else if (c.match(/\r|\n/)) {
      span = document.createElement('br')
    } else {
      span = document.createElement('span');
      span.innerHTML = c;
      c = c.toLowerCase();
      span.style.color = "rgba(0, 0, 0, " + (data[c] ? mapRange(data[c], min, max, minLightness, maxLightness) : minLightness) + ")";
    }
    textOutput.appendChild(span);
  }
}

export const createStats = (data) => {
  let textOutput = document.querySelector("#basic-stats");
  textOutput.innerHTML = `${data.lettersCount} ${data.lettersCount === 1 ? 'Buchstabe' : 'Buchstaben'}<br />${data.wordsCount} ${data.wordsCount === 1 ? 'Wort' : 'Wörter'}<br />${data.sentencesCount} ${data.sentencesCount === 1 ? 'Satz' : 'Sätze'}`;
}

export const createText = (data) => {
  let textOutput = document.querySelector("#statsInText");
  textOutput.innerHTML = '';
  for (let [letter, count] of Object.entries(data.letters)) {
    if(letter.match(/[0-9]/))
      textOutput.innerHTML += text('numbers', {letter: letter, count: count});
    else
      textOutput.innerHTML += text('letters', {letter: letter, count: count});
  }
  textOutput.innerHTML += text('readingTime', {time: `${data.readingTime.h}h ${data.readingTime.m}m ${data.readingTime.s}s`});
}