const screenWidthMin = require('./screenWidthMin');

describe('screenWidthMin', () => {
  describe('the first element of the returned array, the predicate', () => {
    const minimumWidth = 375;

    describe('when screen width is less than the minimum', () => {
      it('returns false', () => {
        const screenWidth = minimumWidth - 1;
        const [predicate] = screenWidthMin(minimumWidth, {});
        const returnValue = predicate({screenWidth});
        expect(returnValue).toEqual(false);
      });
    });

    describe('when screen width is greater than the minimum', () => {
      it('returns true', () => {
        const screenWidth = minimumWidth + 1;
        const [predicate] = screenWidthMin(minimumWidth, {});
        const returnValue = predicate({screenWidth});
        expect(returnValue).toEqual(true);
      });
    });
  });

  describe('the second element of the returned array, the conditional styles', () => {
    it('is equal to the passed-in styles', () => {
      const styles = {color: 'green'};
      const [, conditionalStyles] = screenWidthMin(null, styles);
      expect(conditionalStyles).toEqual(styles);
    });
  });
});
