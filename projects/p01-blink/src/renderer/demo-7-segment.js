// 7 segment display - only one digit usable here
// https://www.instructables.com/Using-a-4-digit-7-segment-display-with-arduino/

const five = require('johnny-five');
const board = new five.Board({
  repl: false
});

board.on("ready", () => {

  const digitPins = [
    new five.Pin(2),
    new five.Pin(3),
    new five.Pin(4),
    new five.Pin(5)
  ];
  const segmentPins = [
    new five.Pin(6),
    new five.Pin(7),
    new five.Pin(8),
    new five.Pin(9),
    new five.Pin(10),
    new five.Pin(14),
    new five.Pin(15),
    new five.Pin(16)
  ];

  const init = async () => {
    clearLEDs();
    pickDigit(0);

    for (let i = 9; i > -1; i--) {
      console.log(i);
      displayNr(i);
      await delay(1000);
    }
  };

  const delay = ms => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  const clearLEDs = () => {
    segmentPins.forEach(pin => {
      pin.low();
    });
    pickDigit(0);
    displayNr(7);
  };

  const displayNr = (nr) => {
    const nrs = {};
    nrs[0] = [0, 1, 2, 3, 4, 5];
    nrs[1] = [1, 2];
    nrs[2] = [0, 1, 6, 4, 3];
    nrs[3] = [0, 1, 6, 2, 3];
    nrs[4] = [5, 6, 1, 2];
    nrs[5] = [0,  5, 6, 2, 3];
    nrs[6] = [0, 5, 6, 2, 3, 4];
    nrs[7] = [0, 1, 2];
    nrs[8] = [0, 1, 2, 3, 4, 5, 6];
    nrs[9] = [0, 1, 6, 5, 2, 3];

    segmentPins.forEach((pin, index) => {
      if (nrs[nr].includes(index)) {
        pin.high();
      } else {
        pin.low();
      }
    });
  };

  const pickDigit = (nr) => {
    digitPins.forEach((pin, index) => {
      if (index === nr) {
        pin.low();
      } else {
        pin.high();
      }
    });
  };

  init();
});