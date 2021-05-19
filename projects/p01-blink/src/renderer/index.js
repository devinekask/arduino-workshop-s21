const five = require('johnny-five');
const board = new five.Board({
  repl: false
});
board.on("ready", () => init());

let led;
const $button = document.querySelector('#button');

const init = () => {
  led = new five.Led(9);

  $button.addEventListener('click', () => {
    led.toggle();
  });
};