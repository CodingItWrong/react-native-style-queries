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
});
