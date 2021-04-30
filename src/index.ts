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

const updateClock = (day: Date) => {
  if (!hr || !mn || !sc) {
    return;
  }
  const hours = day.getHours() * 30;
  const mins = day.getMinutes() * degree;
  const secs = day.getSeconds() * degree;
  hr.setAttribute('style', `transform: rotateZ(${hours + mins / 12}deg)`);
  mn.setAttribute('style', `transform: rotateZ(${mins}deg)`);
  sc.setAttribute('style', `transform: rotateZ(${secs}deg)`);
};

const id = setInterval(() => {
  if (!hr || !mn || !sc) {
    clearInterval(id);
    return;
  }
  const day = new Date();
  updateClock(day);
}, secondInterval);


const fetchFromWorldTimeApi = async (zone: string): Promise<string> => {
  const resp = await fetch(`http://worldtimeapi.org/api/timezone/${zone}`);
  const json = await resp.json();
  return json.datetime;
};

const changeTimezone = async (zone: string) => {
  const dt = await fetchFromWorldTimeApi(zone);
  console.log('dt:', dt)
  return;
};


countries.forEach((c) => {
  const zone = c.getAttribute('data-zone');
  if (!zone) {
    return;
  }
  c.addEventListener('click', () => {
    changeTimezone(zone);
  });
});






updateClock(new Date());