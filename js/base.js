import { default as texts } from './database.js';

export const mapRange = (value, low1, high1, low2, high2) => {
  if (low1 === high1)
    return 0;
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export const abc = (() => {
  let a = [], i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
})();

export const numbers = (() => {
  let a = [], i = '0'.charCodeAt(0), j = '9'.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
})();

export const characters = (() => {
  return [...abc, ...'ßáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ', ...numbers];
})();

export const text = (textName, placeholder = {}) => {
  let max = texts[textName].length - 1;
  let min = 0;
  let i = Math.floor(Math.random() * (max - min + 1) + min)
  return texts[textName][i].replace(/%\w+%/g, (all) => {
    all = all.substring(1, all.length - 1);
    return String(placeholder[all]) || all;
  }) + ' ';
}