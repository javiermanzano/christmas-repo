const MORNING = 'morning';
const AFTERNOON = 'afternoon';
const NIGHT = 'night';

const greetings = {
  morning: 'Buenos días',
  afternoon: 'Buenas tardes',
  night: 'Buenos días',
};

const keyWords = {
  palindromeResp: '¡Bonita Palabra!',
  stop: 'Stop!',
  bye: 'Adios',
};


class Ohce {
  constructor() {
    this.name = '';
  }

  static getDaytime({ time }) {
    const hour = time.getHours();
    if (hour >= 6 && hour < 12) {
      return MORNING;
    }
    if (hour >= 12 && hour < 20) {
      return AFTERNOON;
    }
    return NIGHT;
  }

  static talk({ word }) {
    let output = '';
    output = [word.split('').reverse().join('')];
    if (word === output[0]) {
      output.push(keyWords.palindromeResp);
    }
    return output;
  }

  init({ time, input }) {
    this.name = input;
    return [`${greetings[Ohce.getDaytime({ time })]} ${this.name}`];
  }
}


module.exports = {
  greetings,
  keyWords,
  Ohce,
};
