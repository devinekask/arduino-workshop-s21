const five = require('johnny-five');
const board = new five.Board({
  repl: false
});
board.on("ready", () => init());

let led, potentiometer;
const $button = document.querySelector('#button');

const init = () => {
  led = new five.Led(9);
  potentiometer = new five.Sensor("A3");

  potentiometer.on("change", () => {
    console.log(potentiometer.value);
    $button.style.transform = `scale(${potentiometer.value / 100})`;
  });

  $button.addEventListener('click', () => {
    led.toggle();
  });
};