// --------------------------------------
// Constants
// --------------------------------------

const SOLVED = 'SolveCryptex';

// --------------------------------------
// Stage variables
// --------------------------------------

let stg;
let sw;
let sh;

let vw;
let vh;

// --------------------------------------
// DOM variables
// --------------------------------------

let container = document.getElementById('container');
let stage = document.getElementById('stage');
let codeElement = document.getElementById('code');
let charElements = codeElement.getElementsByClassName('char');
let obj = document.getElementById('object');
let ringElements = obj.getElementsByClassName('ring');
let ring = document.getElementById('ring1');

// --------------------------------------
// Cryptex rings variables
// --------------------------------------

let numRings = 7;
let ringWidth = 36;
let ringSpacing = 60;

let strings = [];
let numbers = {};
let chars = [];
let codeChars = [];
let codeTexts = [];
let codeArray = [];
let rings = [];
let buttons = [];

let hint = '       ';
let solution = '8675309';
let success = false;

// --------------------------------------
// Keyboard input tracking variables
// --------------------------------------

let numChars = numRings;

let code;

let key;
let charSelected = 36;
let ringSelected = 0;
let ringLastSelected = 0;
let inputMode = 'enter';

// --------------------------------------
// Drag variables
// --------------------------------------

let cylinders = [];
let currentCylinder;
let mouseY = 0;
let initMouseY;
let ringSelectedInitRotation;
let previousMouseY;
let isMouseDown = false;
let dragRing = false;

// --------------------------------------
// Cryptex hint messages
// --------------------------------------

let hintMessages;

// --------------------------------------
// Initialize Cryptex
// --------------------------------------

cryptex();

function cryptex() {
  window.onload = initialize;
}

function initialize() {
  stg = window;
  sw = stg.innerWidth;
  sh = stg.innerHeight;

  // remove ring from object
  ring.remove();

  initializeRings();

  formatCode();

  trackKeyboardInput();
  displayRingSelected();
  addMouseEventListeners();
  // displayHints();
}

// --------------------------------------
// Draw Cryptex rings
// --------------------------------------

function initializeRings() {
  // Characters: A-Z, 0-9
  strings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // Numbers dictionary
  numbers = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
  };

  drawCodeRings();
}

function drawCodeRings() {
  for (let i = 0; i < numRings; i++) {
    // Create arrays for each ring
    codeChars[i] = [];
    codeTexts[i] = [];
    codeArray[i] = {};

    rings[i] = drawRing(i);
    rings[i].name = 'ring' + String(i + 1);
    rings[i].rotationX = 0;
    obj.appendChild(rings[i]);
  }
}

function drawRing(ringIndex) {
  let ring = document.createElement('div');

  ring.id = 'ring' + (ringIndex + 1);
  ring.className = 'ring backfaces';
  ring.addEventListener('click', objectPressHandler);

  for (let i = 0; i < strings.length; i++) {
    let plane = document.createElement('div');

    // set text for each plane
    let char = strings[i];
    plane.innerText = char;
    plane.setAttribute('unselectable', 'on');

    // set class for each plane
    plane.className = 'plane ';
    if (isNaN(char)) {
      plane.className += char.toLowerCase();
    } else {
      let num = Number(char);
      plane.className += lookupNumber(num);
    }

    // set selected class for first item
    if (i == 0) {
      addClassName(plane, 'selected');
    }

    // add plane to chars array
    chars[i] = plane;

    // an array to be able to access children by index
    codeChars[ringIndex][i] = plane;
    codeTexts[ringIndex][i] = char;

    ring.appendChild(plane);
  }

  return ring;
}

function lookupNumber(num) {
  return numbers[num];
}

// --------------------------------------
// Display Code
// --------------------------------------

function formatCode() {
  codeElement.innerText = '';
  for (let i = 0; i < hint.length; i++) {
    let codeChar = document.createElement('span');
    codeChar.className = 'char';
    if (i == 0) {
      codeChar.className += ' selected';
    }
    codeChar.setAttribute('data-index', i);
    codeChar.innerText = '_';
    codeElement.appendChild(codeChar);
  }
}

// --------------------------------------
// Keyboard input functions
// --------------------------------------

function trackKeyboardInput() {
  initCodeArray();
  displayCodeArray();
  showCodeCharSelected();
  addKeyPressListeners();
}

function initCodeArray() {
  for (let i = 0; i < hint.length; i++) {
    if (hint.charAt(i) == ' ') {
      codeArray[i].index = 36;
      codeArray[i].char = ' ';
    } else {
      for (let j = 0; j < strings.length; j++) {
        if (hint.charAt(i) == strings[j]) {
          codeArray[i].index = j;
        }
      }
      codeArray[i].char = hint.charAt(i);
    }
  }
}

function displayCodeArray() {
  for (let i = 0; i < codeArray.length; i++) {
    // replace spaces with underscores
    if (codeArray[i].char == ' ') {
      charElements[i].innerText = '_';
    }
    // otherwise display each character
    // else code = codeArray[i].char;
    else charElements[i].innerText = codeArray[i].char;
  }
  // test whether the code has been solved
  code = codeElement.innerText;
  testCode();
}

function addKeyPressListeners() {
  document.addEventListener('keydown', onKeyPress);
}

function onKeyPress(e) {
  key = e.keyCode;

  // Capital letters A - Z are character codes 65 - 90
  if (key >= 65 && key <= 90) {
    let i = key - 65;

    inputMode = 'enter';
    charSelected = i;
    replaceCodeChar(e);
  }

  // Numbers 0 - 9 are character codes 48 - 57
  else if (key >= 48 && key <= 57) {
    let j = key - 48 + 26;

    inputMode = 'enter';
    charSelected = j;
    replaceCodeChar(e);
  }

  // All other key presses are caught here
  else {
    switch (e.keyCode) {
      case 8:
        inputMode = 'delete';
        charSelected = 0;
        replaceCodeChar(e);
        break;
      case 37:
        inputMode = 'select';
        selectPreviousRing();
        break;
      case 39:
        inputMode = 'select';
        selectNextRing();
        break;
      case 38:
        inputMode = 'enter';
        ringUp();
        break;
      case 40:
        inputMode = 'enter';
        ringDown();
        break;
      default:
      // console.log("Not a valid keyboard input");
    }
  }

  // traceKeyPresses(e);
}

function replaceCodeChar(e) {
  // if first character of code is empty,
  // don't play sound on backspace
  // if (inputMode == "delete" && ringSelected == 0 && codeArray[0].index == 36) {}
  // else playSound(_typewriter);

  // Store selected character into code array
  let char = String.fromCharCode(e.keyCode);
  codeArray[ringSelected].index = charSelected;

  // Replace selected character with space
  if (inputMode == 'delete') {
    codeArray[ringSelected].char = '_';
  }
  // Otherwise replace with selected character
  else codeArray[ringSelected].char = char;

  displayRingCharSelected();
  displayCodeArray();
  selectRing();
  showCodeCharSelected();
}

function updateCodeChar() {
  let char = strings[charSelected];

  // update if the selected character has changed
  if (charSelected != codeArray[ringSelected].index) {
    codeArray[ringSelected].index = charSelected;
    codeArray[ringSelected].char = char;

    displayCodeArray();
    resetChars(ringSelected);
    displayCharSelected();
    updateRingRotation(ringSelected);
    showCodeCharSelected();

    // playSound(_click, .1);
  }
}

function traceKeyPresses(e) {
  console.log('------------ Key Press ------------');
  console.log('Keycode: ' + e.keyCode);
  console.log('Character: ' + e.key);
  console.log('Character (Caps): ' + String.fromCharCode(e.keyCode));
}

function showCodeCharSelected() {
  if (!success) {
    displaySelectCharElements();
  }
}

function displaySelectCharElements() {
  for (let i = 0; i < charElements.length; i++) {
    if (i == ringSelected) {
      addClassName(charElements[i], 'selected');
    } else {
      removeClassName(charElements[i], 'selected');
    }
  }
}

// --------------------------------------
// Test for Cryptex solution
// --------------------------------------

function testCode() {
  if (code == solution) {
    success = true;
    successfullyDecoded();
  }
}

function successfullyDecoded() {
  // removeChild(hintMessages);
  document.removeEventListener('keydown', onKeyPress);
  highlightAllRings();
  displaySuccessMessage();
}

function displaySuccessMessage() {
  addClassName(codeElement, 'solved');
  codeElement.innerHTML = 'Congratulations, you have solved the code!';
}

// --------------------------------------
// Ring functions
// --------------------------------------

function rotateRing() {
  let targetRotation = (codeArray[ringSelected].index * 360) / strings.length;
  rotateElement(ringElements[ringSelected], targetRotation);
}

function updateRingRotation(ringNum) {
  let targetRotation = (codeArray[ringNum].index * 360) / strings.length;
  rings[ringNum].rotationX = targetRotation;
  rotateElement(ringElements[ringSelected], targetRotation);
}

// https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
function rotateElement(element, nR) {
  let rot = rot || 0; // if rot undefined or 0, make 0, else rot
  let aR = rot % 360;
  if (aR < 0) {
    aR += 360;
  }
  if (aR < 180 && nR > aR + 180) {
    rot -= 360;
  }
  if (aR >= 180 && nR <= aR - 180) {
    rot += 360;
  }
  rot += nR - aR;
  element.style.transform = 'rotateX( ' + rot + 'deg )';
}

function selectRing() {
  // select ring after replacing character
  if (inputMode == 'enter') {
    selectNextRing();
  } else if (inputMode == 'delete') {
    selectPreviousRing();
  }
}

function selectPreviousRing() {
  if (ringSelected > 0) {
    if (inputMode == 'select') {
      // playSound(_click, .1);
    }
    ringLastSelected = ringSelected;
    ringSelected--;
    displayRingCharSelected();
    showCodeCharSelected();
  }
}

function selectNextRing() {
  if (ringSelected < numRings - 1) {
    if (inputMode == 'select') {
      // playSound(_click, .1);
    }
    ringLastSelected = ringSelected;
    ringSelected++;
    displayRingCharSelected();
    showCodeCharSelected();
  }
}

function ringUp() {
  let ringRotation = rings[ringSelected].rotationX - 10;
  ringRotation %= 360;
  rings[ringSelected].rotationX = stepRotation(ringRotation);

  updateCodeChar();
}

function ringDown() {
  let ringRotation = rings[ringSelected].rotationX + 10;
  ringRotation %= 360;
  rings[ringSelected].rotationX = stepRotation(ringRotation);

  updateCodeChar();
}

function pressRingSelected() {
  updateCodeChar();
  deselectRingLastSelected();
  displaySelectRingElement();
  showCodeCharSelected();
  displayRingCharSelected();
}

function displayRingSelected() {
  resetRingLastSelected();
  displaySelectRingElement();
}

function displayRingCharSelected() {
  deselectRingLastSelected();
  displaySelectRingElement();
  rotateRing();
  resetChars(ringSelected);
  displayCharSelected();
}

function displayCharSelected() {
  if (codeArray[ringSelected].index != 36) {
    let index = codeArray[ringSelected].index;
    let char = codeChars[ringSelected][index];
    let txt = codeTexts[ringSelected][index];
    let ring = ringElements[ringSelected];
    displaySelectedRingCharacter(ringSelected, index);
  }
}

function displaySelectRingElement() {
  for (let i = 0; i < ringElements.length; i++) {
    if (i == ringSelected) {
      addClassName(ringElements[i], 'select');
    } else {
      removeClassName(ringElements[i], 'select');
    }
  }
}

function displaySelectedRingCharacter(ringNum, index) {
  for (let i = 0; i < codeChars[ringNum].length; i++) {
    if (i == index) {
      addClassName(codeChars[ringNum][i], 'selected');
    } else {
      removeClassName(codeChars[ringNum][i], 'selected');
    }
  }
}

function deselectRingLastSelected() {
  removeClassName(ringElements[ringLastSelected], 'select');
  ringLastSelected = ringSelected;
}

function resetRingLastSelected() {
  removeClassName(ringElements[ringSelected], 'select');
  resetChars(ringLastSelected);
  ringLastSelected = ringSelected;
}

function resetChars(ringNum) {
  for (let i = 0; i < strings.length; i++) {
    let char = codeChars[ringNum][i];
    let txt = codeTexts[ringNum][i];
  }
}

function resetAllRings() {
  for (let i = 0; i < numRings; i++) {
    removeClassName(ringElements[i], 'select');
  }
}

function highlightAllRings() {
  for (let i = 0; i < numRings; i++) {
    addClassName(ringElements[i], 'select');
  }
}

// --------------------------------------
// Mouse functions
// --------------------------------------

function addMouseEventListeners() {
  window.addEventListener('mousemove', stage_mouseMoveHandler);
  window.addEventListener('mousedown', stage_mouseDownHandler);
  window.addEventListener('mouseup', stage_mouseUpHandler);
  mouseWheelEvents();
}

function removeMouseEventListeners() {
  window.removeEventListener('mousemove', stage_mouseMoveHandler);
  window.removeEventListener('mousedown', stage_mouseDownHandler);
  window.removeEventListener('mouseup', stage_mouseUpHandler);
}

function stage_mouseMoveHandler(event) {
  mouseY = event ? event.pageY : window.event.clientY;
  if (dragRing) {
    dragRings();
  }
}

function stage_mouseDownHandler(event) {
  isMouseDown = true;
  initMouseY = mouseY;
  ringSelectedInitRotation = rings[ringSelected].rotationX;
}

function stage_mouseUpHandler(event) {
  isMouseDown = false;
  dragRing = false;
}

function objectPressHandler(event) {
  let thisRing = event.currentTarget;
  let num = Number(thisRing.name.substr(4));

  if (event.target.classList.contains('plane')) {
    let thisChar = event.target;
    let char = thisChar.innerText;
    charSelected = strings.indexOf(char);
  }

  dragRing = true;
  // playSound(_stone, .3);

  ringLastSelected = ringSelected;
  ringSelected = num - 1;

  pressRingSelected();
}

function mouseWheelEvents() {
  // Throttle wheel events
  let timeout = 200;
  let mouseWheelEvent = false;
  window.addEventListener('mousewheel', event => {
    if (!mouseWheelEvent) {
      setTimeout(() => {
        mouseWheelEvent = false;
        wheelEventHandler(event.wheelDelta);
      }, timeout);
      mouseWheelEvent = true;
    }
  });
}

function wheelEventHandler(delta) {
  if (delta < 0) {
    ringDown();
  }
  if (delta > 0) {
    ringUp();
  }
}

function dragRings() {
  let currentMouseY = mouseY;

  if (isMouseDown && dragRing) {
    let differenceY = currentMouseY - initMouseY;
    let ringSelectedRotation = ringSelectedInitRotation - differenceY * 0.6;

    // step rotation
    rings[ringSelected].rotationX = stepRotation(ringSelectedRotation);

    updateCodeChar();
  }

  previousMouseY = currentMouseY;
}

function stepRotation(objRotation) {
  // modulo operator to keep rotation in the -360 to 360 degree range
  objRotation %= 360;

  // ensure rotation is always expressed as uint: 0 to 360 degrees
  if (objRotation < 0) {
    objRotation = 360 + Math.round(objRotation);
  }

  let numRingChars = strings.length;
  let degreesPerChar = 360 / numRingChars;
  let charIndex = Math.round(objRotation / degreesPerChar);
  let targetRotation = degreesPerChar * charIndex;

  // keep charSelected within the range of available characters
  if (charIndex < numRingChars) charSelected = charIndex;
  else charSelected = 0;

  return targetRotation;
}

// --------------------------------------
// Hints
// --------------------------------------

// private function displayHints():void {
//   hintMessages = new CryptexHints();
//   hintMessages.x = (sw - hintMessages.width) / 2 + 25;
//   hintMessages.y = sh / 2 - 125;
//   addChild(hintMessages);
// }

// --------------------------------------
// Class Functions
// --------------------------------------

// Class functions from Webkit
// https://webkit.org/blog-files/3d-transforms/morphing-cubes.html

function hasClassName(inElement, inClassName) {
  let regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)');
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName) {
  if (!hasClassName(inElement, inClassName))
    inElement.className = [inElement.className, inClassName].join(' ');
}

function removeClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    let regExp = new RegExp('(?:^|\\s+)' + inClassName + '(?:\\s+|$)', 'g');
    let curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, ' ');
  }
}

function toggleClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName))
    removeClassName(inElement, inClassName);
  else addClassName(inElement, inClassName);
}
