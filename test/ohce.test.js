/* global describe, it, beforeEach  */
require('chai').should();
const { expect } = require('chai');
const { Ohce, greetings, keyWords } = require('../src/lib/ohce');


describe('ohce tests', () => {
  let ohce;

  beforeEach(() => {
    ohce = new Ohce();
  });


  describe('Get correct greeting depending on the current time', () => {
    it('The response must be an array', () => {
      const time = new Date('2019-12-10T18:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(Array.isArray(result)).to.equal(true);
    });

    it(`Must say ${greetings.morning}`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result[0]).to.equal(`${greetings.morning} ${input}`);
    });

    it(`Must say ${greetings.afternoon}`, () => {
      const time = new Date('2019-12-10T18:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result[0]).to.equal(`${greetings.afternoon} ${input}`);
    });

    it(`Must say ${greetings.night}`, () => {
      const time = new Date('2019-12-10T21:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result[0]).to.equal(`${greetings.night} ${input}`);
    });
  });

  describe('Concurrency does not affect to Ohce instances', () => {
    it(`Must say ${greetings.morning} Tomás & ${greetings.morning} Torralvo`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input1 = 'Tomás';
      let result = ohce.init({ time, input: input1 });
      expect(result[0]).to.equal(`${greetings.morning} ${input1}`);
      const secondOhce = new Ohce();
      const input2 = 'Torralvo';
      result = secondOhce.init({ time, input: input2 });
      expect(result[0]).to.equal(`${greetings.morning} ${input2}`);
    });
  });

  describe('Return the correct word', () => {
    const w1 = 'Minessota';
    const w2 = 'echo';
    const palindrome = 'oso';

    it(`Return a word reversed - ${w1}`, () => {
      const result = Ohce.talk({ word: w1 });
      expect(result[0]).to.equal(w1.split('').reverse().join(''));
    });

    it('Return a word reversed - echo', () => {
      const result = Ohce.talk({ word: w2 });
      expect(result[0]).to.equal(w2.split('').reverse().join(''));
    });

    it(`If is a Palindrome ${keyWords.palindromeResp} is included at the end`, () => {
      const result = Ohce.talk({ word: palindrome });
      expect(result[0]).to.equal('oso');
      expect(result[1]).to.equal(keyWords.palindromeResp);
    });
  });
});
