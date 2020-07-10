let textInput = document.querySelector('#text-input');
const ABC = createABC();
textInput.addEventListener('input', triggerStats);

function triggerStats() {
  letterStats(textInput.value);
}

function letterStats(input) {
  let object = {};
  ABC.forEach(c => {
    object[c] = 0;
  })
  for (let c of input) {
    c = c.toLowerCase();
    if (!c.match(/[a-z]/i))
      continue;
    object[c]++;
  }
  createDiagram(object);
  createTextScaleY(input, object);
  createTextColor(input, object);
}

function createABC() {
  let a = [], i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
  for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
  }
  return a;
}

function createDiagram(data) {

  let canvas = document.querySelector("#canvas-diagramm");

  let canvasWidth = canvas.clientWidth;
  let canvasHeight = canvas.clientHeight;

  createHiDPICanvas(canvasWidth, canvasHeight, canvas);

  let cv = canvas.getContext("2d");
  //Options Grid
  let graphGridSize = 20;
  let graphGridX = (canvasHeight / graphGridSize).toFixed();
  //Draw Grid

  for (let i = 0; i < graphGridX; i++) {
    cv.moveTo(canvasWidth, graphGridSize * i);
    cv.lineTo(0, graphGridSize * i);
  }
  cv.strokeStyle = "#dbdbdb";
  cv.stroke();

  let graphMax = Math.max(...Object.values(data));
  let graphPadding = 10;
  let graphFaktor = (canvasHeight - (2 * graphPadding)) / graphMax;
  let graphWidth = (canvasWidth - graphPadding) / Object.entries(data).length;
  let graphTextcolor = '#000000';
  let i = 0;

  for (let [letter, count] of Object.entries(data)) {
    // console.log(`${letter} ${count}`)
    tmpTop = (canvasHeight - (graphFaktor * count)).toFixed() - graphPadding;
    tmpHeight = ((count * graphFaktor)).toFixed();
    cv.fillStyle = '#000';
    cv.fillRect(graphWidth + ((i - 1) * graphWidth) + graphPadding, tmpTop, graphWidth - graphPadding, tmpHeight);
    cv.fillStyle = graphTextcolor;
    cv.fillText(letter, graphWidth + ((i - 1) * graphWidth) + graphPadding + 2, canvasHeight - 2, graphWidth);
    i++;
  }

}

let PIXEL_RATIO = (() => {
  let ctx = document.createElement("canvas").getContext("2d"),
    dpr = window.devicePixelRatio || 1,
    bsr = ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio || 1;

  return dpr / bsr;
})();


function createHiDPICanvas(w, h, canvas) {
  ratio = PIXEL_RATIO;
  canvas.width = w * ratio;
  canvas.height = h * ratio;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
}

function createTextScaleY(input, data) {
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxHeight = 3;
  let minHeight = 0.5;
  let textOutput = document.querySelector("#ps-diagramm");
  textOutput.innerHTML = "";

  for (let c of input) {
    let span = document.createElement('span');
    span.innerHTML = c;
    c = c.toLowerCase();
    span.style.transform = "scaleY(" + mapRange(data[c], min, max, minHeight, maxHeight) + ")";
    textOutput.appendChild(span);
  }
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function createTextColor(input, data) {
  let max = Math.max(...Object.values(data));
  let min = 0;
  let maxLightness = 50;
  let minLightness = 99;
  let textOutput = document.querySelector("#pc-diagramm");
  textOutput.innerHTML = "";

  for (let c of input) {
    let span = document.createElement('span');
    span.innerHTML = c;
    c = c.toLowerCase();
    span.style.color = "hsl(0, 100%, " + mapRange(data[c], min, max, minLightness, maxLightness) + "%)";
    textOutput.appendChild(span);
  }
}