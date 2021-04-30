import moment from 'moment-timezone';

const degree = 6;
const hr = document.querySelector('.hr');
const mn = document.querySelector('.mn');
const sc = document.querySelector('.sc');
const toggle = document.querySelector('.toggle');
const countries = document.querySelectorAll('.country');

const secondInterval = 1000;

const toggleMode = () => {
  const body = document.querySelector('body');
  if (!body) {
    return;
  }
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
  }
  return;
};

toggle?.addEventListener('click', toggleMode);

const updateClock = (time: moment.Moment) => {
  if (!hr || !mn || !sc) {
    return;
  }
  const hours = time.hours() * 30;
  const mins = time.minutes() * degree;
  const secs = time.seconds() * degree;
  hr.setAttribute('style', `transform: rotateZ(${hours + mins / 12}deg)`);
  mn.setAttribute('style', `transform: rotateZ(${mins}deg)`);
  sc.setAttribute('style', `transform: rotateZ(${secs}deg)`);
};

const zoneParis = 'Europe/Paris';

const initClock = () => {
  let defaultZone = moment.tz.guess();
  updateClock(moment().tz(defaultZone));

  const setZone = (zone: string) => {
    defaultZone = zone;
  };

  const id = setInterval(() => {
    if (!hr || !mn || !sc) {
      clearInterval(id);
      return;
    }
    const time = moment().tz(defaultZone);
    updateClock(time);
  }, secondInterval);

  countries.forEach((c) => {
    c.addEventListener('click', () => {
      setZone(c.getAttribute('data-zone') || zoneParis);
      countries.forEach((c) => {
        c.classList.remove('current');
      });
      c.classList.add('current');
    });
  });
};

initClock();
