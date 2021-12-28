const {colorScheme} = require('./colorScheme');

describe('colorScheme', () => {
  describe('the first element of the returned array, the predicate', () => {
    describe('when color scheme matches', () => {
      it('returns true', () => {
        const [predicate] = colorScheme('dark', {});
        const returnValue = predicate({colorScheme: 'dark'});
        expect(returnValue).toEqual(true);
      });
    });

    describe('when color scheme does not match', () => {
      it('returns false', () => {
        const [predicate] = colorScheme('dark', {});
        const returnValue = predicate({colorScheme: 'light'});
        expect(returnValue).toEqual(false);
      });
    });
  });
});
