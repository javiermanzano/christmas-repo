/* global describe, it */
require('chai').should();
const { expect } = require('chai');
const { init, greetings } = require('../src/lib/ohce');


describe('ohce tests', () => {
  describe('Get correct greeting depending on the current time', () => {
    it('The response must be an array', () => {
      const time = new Date('2019-12-10T18:30:00.000Z');
      const input = 'Tomás';
      const result = init({ time, input });
      expect(Array.isArray(result)).to.equal(true);
    });

    it(`Must say ${greetings.morning}`, () => {
      const time = new Date('2019-12-10T10:30:00.000Z');
      const input = 'Tomás';
      const result = init({ time, input });
      expect(result[0]).to.equal(`${greetings.morning} ${input}`);
    });

    it(`Must say ${greetings.afternoon}`, () => {
      const time = new Date('2019-12-10T18:30:00.000Z');
      const input = 'Tomás';
      const result = init({ time, input });
      expect(result[0]).to.equal(`${greetings.afternoon} ${input}`);
    });

    it(`Must say ${greetings.night}`, () => {
      const time = new Date('2019-12-10T21:30:00.000Z');
      const input = 'Tomás';
      const result = init({ time, input });
      expect(result[0]).to.equal(`${greetings.night} ${input}`);
    });
  });
});
