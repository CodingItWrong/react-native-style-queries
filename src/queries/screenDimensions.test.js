const {screenWidthMax, screenWidthMin} = require('./screenDimensions');

describe('screenDimensions', () => {
  describe('screenWidthMax', () => {
    describe('the first element of the returned array, the predicate', () => {
      const maximumWidth = 375;

      describe('when screen width is less than the maximum', () => {
        it('returns true', () => {
          const screenWidth = maximumWidth - 1;
          const [predicate] = screenWidthMax(maximumWidth, {});
          const returnValue = predicate({screenWidth});
          expect(returnValue).toEqual(true);
        });
      });

      describe('when screen width is equal to the maximum', () => {
        it('returns true', () => {
          const screenWidth = maximumWidth;
          const [predicate] = screenWidthMax(maximumWidth, {});
          const returnValue = predicate({screenWidth});
          expect(returnValue).toEqual(true);
        });
      });

      describe('when screen width is greater than the maximum', () => {
        it('returns false', () => {
          const screenWidth = maximumWidth + 1;
          const [predicate] = screenWidthMax(maximumWidth, {});
          const returnValue = predicate({screenWidth});
          expect(returnValue).toEqual(false);
        });
      });
    });

    describe('the second element of the returned array, the conditional styles', () => {
      it('is equal to the passed-in styles', () => {
        const styles = {color: 'green'};
        const [, conditionalStyles] = screenWidthMax(null, styles);
        expect(conditionalStyles).toEqual(styles);
      });
    });
  });

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

      describe('when screen width is equal to the minimum', () => {
        it('returns true', () => {
          const screenWidth = minimumWidth;
          const [predicate] = screenWidthMin(minimumWidth, {});
          const returnValue = predicate({screenWidth});
          expect(returnValue).toEqual(true);
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
});
