import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const [btnStart, daysTimer, hoursTimer, minutesTimer, secondsTimer] =
  document.querySelectorAll(
    '[data-start], [data-days], [data-hours], [data-minutes], [data-seconds]'
  );

let startTime = null;
let futureTime = null;
let intervalTime = null;
let intervalId = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = Date.now();

    if (!(selectedDates[0] > startTime)) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      futureTime = selectedDates[0];
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', onClick);
    }
  },
};

const flatpickrInput = flatpickr(input, options);

/**
 * Function gets id of interval and makes button Start abled
 * @param {event}
 */
function onClick(evt) {
  btnStart.removeAttribute('disabled');
  intervalId = setInterval(updateIntervalTime, 1000);
}

/**
 * Function changes countdown timer and clear time interval
 */
function updateIntervalTime() {
  const currentTime = Date.now();
  intervalTime = futureTime - currentTime;

  const { days, hours, minutes, seconds } = convertMs(intervalTime);

  daysTimer.textContent = addLeadingZero(days);
  hoursTimer.textContent = addLeadingZero(hours);
  minutesTimer.textContent = addLeadingZero(minutes);
  secondsTimer.textContent = addLeadingZero(seconds);

  timer.style.backgroundColor = getRandomHexColor();

  if (intervalTime < 1000) {
    clearInterval(intervalId);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

/**
 *
 * @param {number} date
 * @returns string
 */
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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
