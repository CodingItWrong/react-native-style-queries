const screenWidthMin = require('./screenWidthMin');

describe('screenWidthMin', () => {
  describe('the second element of the returned array, the conditional styles', () => {
    it('is equal to the passed-in styles', () => {
      const styles = {color: 'green'};
      const [, conditionalStyles] = screenWidthMin(null, styles);
      expect(conditionalStyles).toEqual(styles);
    });
  });
});
