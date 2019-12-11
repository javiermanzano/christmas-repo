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
      expect(Array.isArray(result.output)).to.equal(true);
    });

    it(`Must say ${greetings.morning}`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result.output[0]).to.equal(`${greetings.morning} ${input}`);
    });

    it(`Must say ${greetings.afternoon}`, () => {
      const time = new Date('2019-12-10T18:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result.output[0]).to.equal(`${greetings.afternoon} ${input}`);
    });

    it(`Must say ${greetings.night}`, () => {
      const time = new Date('2019-12-10T21:30:00.000Z');
      const input = 'Tomás';
      const result = ohce.init({ time, input });
      expect(result.output[0]).to.equal(`${greetings.night} ${input}`);
    });
  });

  describe('Concurrency does not affect to Ohce instances', () => {
    it(`Must say ${greetings.morning} Tomás & ${greetings.morning} Torralvo`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input1 = 'Tomás';
      let result = ohce.init({ time, input: input1 });
      expect(result.output[0]).to.equal(`${greetings.morning} ${input1}`);
      const secondOhce = new Ohce();
      const input2 = 'Torralvo';
      result = secondOhce.init({ time, input: input2 });
      expect(result.output[0]).to.equal(`${greetings.morning} ${input2}`);
    });
  });

  describe('Return the correct word', () => {
    const w1 = 'Minessota';
    const w2 = 'echo';
    const palindrome = 'oso';

    beforeEach(() => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input1 = 'Tomás';
      ohce.init({ time, input: input1 });
    });

    it(`Return a word reversed - ${w1}`, () => {
      const result = ohce.talk({ word: w1 });
      expect(result.output[0]).to.equal(w1.split('').reverse().join(''));
    });

    it('Return a word reversed - echo', () => {
      const result = ohce.talk({ word: w2 });
      expect(result.output[0]).to.equal(w2.split('').reverse().join(''));
    });

    it(`If is a Palindrome ${keyWords.palindromeResp} is included at the end`, () => {
      const result = ohce.talk({ word: palindrome });
      expect(result.output[0]).to.equal('oso');
      expect(result.output[1]).to.equal(keyWords.palindromeResp);
    });
  });

  describe('Say goodbay correctly', () => {
    it(`Return ${keyWords.bye} when user insert ${keyWords.stop}`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input1 = 'Tomás';
      ohce.init({ time, input: input1 });
      const result = ohce.talk({ word: keyWords.stop });
      expect(result.output[0]).to.equal(`${keyWords.bye} ${input1}`);
    });
  });

  describe('Launch an error if ohce does not init before', () => {
    it(`Say ${keyWords.noNameError} if ohce does not init before`, () => {
      try {
        ohce.talk({ word: keyWords.stop });
      } catch (e) {
        expect(e).to.be.an('error');
        expect(e.message).to.be.equal(keyWords.noNameError);
      }
    });
  });
});
