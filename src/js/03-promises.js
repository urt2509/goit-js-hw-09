import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerForm);

/**
 * Function handles creating promices
 * @param {event} submit
 *  */
function handlerForm(evt) {
  evt.preventDefault();

  let { delay, step, amount } = evt.currentTarget.elements;

  delay = Number(delay.value);
  step = Number(step.value);
  amount = Number(amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
  form.reset();
}

/**
 * Function creates promices
 * @param {Number} position
 * @param {Number} delay
 * @returns promise result
 */
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promiseParam = { position, delay };

      shouldResolve ? resolve(promiseParam) : reject(promiseParam);
    }, delay);
  });
}
