
let name;
const MORNING = 'morning';
const AFTERNOON = 'afternoon';
const NIGHT = 'night';

const getDaytime = ({ time }) => {
  const hour = time.getHours();
  if (hour >= 6 && hour < 12) {
    return MORNING;
  }
  if (hour >= 12 && hour < 20) {
    return AFTERNOON;
  }
  return NIGHT;
};

const greetings = {
  morning: 'Buenos días',
  afternoon: 'Buenas tardes',
  night: 'Buenos días',
};


module.exports = {
  greetings,
  init: ({ time, input }) => {
    name = input;
    return [`${greetings[getDaytime({ time })]} ${name}`];
  },
};
