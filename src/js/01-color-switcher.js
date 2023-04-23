const container = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let colorBtn = null;
btnStop.disabled = true;

btnStart.addEventListener('click', onStart);
btnStop.addEventListener('click', onStop);

/**
 * Function starts changing body background color
 * and changes statuses of buttons start and stop
 * @param {event} 'click'
 */
function onStart(evt) {
  colorBtn = setInterval(() => {
    container.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.disabled = true;
  btnStop.removeAttribute('disabled');
}

/**
 *Function stops changing body background color
 * and changes statuses of buttons start and stop
 * @param {event} 'click'
 */
function onStop(evt) {
  clearInterval(colorBtn);
  btnStop.disabled = true;
  btnStart.removeAttribute('disabled');
}

/**
 * Function changes color randomly
 * @returns (void)
 */
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
