const useStyleQueries = require('./useStyleQueries');
// const {useWindowDimensions} = require('react-native');

// jest.mock('react-native', () => ({
//   useWindowDimensions: jest.fn(),
// }));

describe('useStyleQueries', () => {
  describe('when no styles are passed', () => {
    it('returns an empty style object', () => {
      const styles = useStyleQueries({});
      expect(styles).toEqual({});
    });
  });

  describe('when a single style object is passed for a style name', () => {
    it('returns the passed-in style object unchanged', () => {
      const plainStyles = {
        myComponentA: {fontSize: 16},
        myComponentB: {fontSize: 22},
      };
      const result = useStyleQueries(plainStyles);
      expect(result).toEqual(plainStyles);
    });
  });

  describe('when an empty array is passed for a style name', () => {
    it('returns an empty style object', () => {
      const input = {
        myComponentA: [],
      };
      const result = useStyleQueries(input);
      expect(result).toEqual({
        myComponentA: {},
      });
    });
  });

  describe('when a style array has just one object', () => {
    it('returns that style object directly', () => {
      const input = {
        myComponent: [{fontSize: 16}],
      };
      const result = useStyleQueries(input);
      expect(result).toEqual({
        myComponent: {fontSize: 16},
      });
    });
  });
});
