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


  describe('Checking the right behaviour of core service', () => {
    beforeEach(() => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input1 = 'Tomás';
      ohce.init({ time, input: input1 });
    });

    describe('Return the correct word', () => {
      const w1 = 'Minessota';
      const w2 = 'echo';
      const palindrome1 = 'Never odd or even';
      const palindrome2 = 'Eva, can I stab bats in a cave?';

      it(`Return a word reversed - ${w1}`, () => {
        const result = ohce.talk({ word: w1 });
        expect(result.output[0]).to.equal(w1.split('').reverse().join(''));
      });

      it('Return a word reversed - echo', () => {
        const result = ohce.talk({ word: w2 });
        expect(result.output[0]).to.equal(w2.split('').reverse().join(''));
      });

      it(`If is a Palindrome ${keyWords.palindromeResp} is included at the end`, () => {
        const result = ohce.talk({ word: palindrome1 });
        expect(result.output[0]).to.equal(palindrome1.split('').reverse().join(''));
        expect(result.output[1]).to.equal(keyWords.palindromeResp);
      });

      it(`If is a Palindrome ${keyWords.palindromeResp} is included at the end`, () => {
        const result = ohce.talk({ word: palindrome2 });
        expect(result.output[0]).to.equal(palindrome2.split('').reverse().join(''));
        expect(result.output[1]).to.equal(keyWords.palindromeResp);
      });
    });

    describe('isPalindrome static service works fine', () => {
      const palin1 = 'Oso';
      const palin2 = "Madam, in Eden I'm Adam";
      const noPalin = 'Manzano';

      it(`${palin1} must return true`, () => {
        expect(Ohce.isPalindrome({ str: palin1 })).to.be.equal(true);
      });
      it(`${palin2} must return true`, () => {
        expect(Ohce.isPalindrome({ str: palin2 })).to.be.equal(true);
      });
      it(`${noPalin} must return false`, () => {
        expect(Ohce.isPalindrome({ str: noPalin })).to.be.equal(false);
      });
    });

    describe('Avoid corner cases detecting palindrome', () => {
      const w1 = '';
      const w2 = 'pp';
      const w3 = '     ';
      const palindrome = 'A man, a plan, a canal: Panama!';

      it(`${w1} must not be a palindrome`, () => {
        const result = ohce.talk({ word: w1 });
        expect(result.output).to.have.length(1);
      });

      it(`${w2} must not be a palindrome`, () => {
        const result = ohce.talk({ word: w2 });
        expect(result.output).to.have.length(1);
      });

      it(`${w3} must not be a palindrome`, () => {
        const result = ohce.talk({ word: w3 });
        expect(result.output).to.have.length(1);
      });

      it(`${palindrome} must be a palindrome`, () => {
        const result = ohce.talk({ word: palindrome });
        expect(result.output).to.have.length(2);
        expect(result.output[1]).to.be.equal(keyWords.palindromeResp);
      });
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
