const inquirer = require('inquirer');
const { Ohce } = require('./lib/ohce');

const answer = (r) => r.reduce((acc, curr, i) => {
  acc += `${i > 0 ? '\n> ' : '> '}${curr}`;
  return acc;
}, '');

const print = (responses) => console.log(answer(responses.output));


const input = process.argv[2];

const ohce = new Ohce();
const initResp = ohce.init({
  time: new Date(),
  input,
});

print(initResp);

const questions = [
  {
    type: 'input',
    name: 'ohce',
  },
];

const ohceLoop = (question) => inquirer
  .prompt(question)
  .then((answers) => {
    const response = ohce.talk({ word: answers.ohce });
    print(response);
    if (!response.stop) {
      return ohceLoop(questions);
    }
    return false;
  });

ohceLoop(questions);
