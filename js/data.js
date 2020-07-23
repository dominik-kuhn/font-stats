import { characters } from './base.js';

export const letters = (input) => {
  let data = {};
  characters.forEach((c) => {
    data[c] = 0;
  })
  for (let c of input) {
    c = c.toLowerCase();
    if (characters.includes(c))
      data[c]++;
  }
  return data;
}

export const words = (input) => {
  let data = {};
  let words = input
              .trim()
              .replace(/\s+/gi, ' ')
              .replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
              .split(' ')
              .filter((n) => {
                return n.length === 1 ? characters.includes(n.toLowerCase()) : n != '';
              });
  words.forEach((w) => {
    w = w.trim();
    if(data[w])
      data[w] += 1;
    else
    data[w] = 1;
  })
  return data;
}

export const sentences = (input) => {
  return input.split(/[.?!]\s/);
}

export const readingTime = (wordsCount) => {
  let seconds = 0, minutes = 0, hours = 0;
  seconds = Math.floor(wordsCount * 60 / 275);
  if (seconds > 59) {
    minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    if (minutes > 59) {
      hours = Math.floor(minutes / 60);
      minutes = minutes - hours * 60;
    }
  }
  return {
    h: hours,
    m: minutes,
    s: seconds
  }
}