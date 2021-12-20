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

  describe('when a style array has two style objects', () => {
    it('returns the style objects merged, with later objects taking precedence', () => {
      const input = {
        myComponent: [
          {
            color: 'blue',
            fontSize: 16,
          },
          {fontSize: 22},
        ],
      };
      const result = useStyleQueries(input);
      expect(result).toEqual({
        myComponent: {color: 'blue', fontSize: 22},
      });
    });
  });

  describe('when a style array has three style objects', () => {
    it('returns all style objects merged, with later objects taking precedence', () => {
      const input = {
        myComponent: [
          {
            color: 'blue',
            fontFamily: 'Arial',
            fontSize: 16,
          },
          {fontSize: 22},
          {fontFamily: 'Times New Roman'},
        ],
      };
      const result = useStyleQueries(input);
      expect(result).toEqual({
        myComponent: {
          color: 'blue',
          fontFamily: 'Times New Roman',
          fontSize: 22,
        },
      });
    });
  });

  describe('when a style array has one condition', () => {
    describe('when the condition is false', () => {
      it('returns an empty style object', () => {
        const input = {
          myComponent: [[() => false, {color: 'red'}]],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {},
        });
      });
    });

    describe('when the condition is true', () => {
      it("returns the query's style object", () => {
        const input = {
          myComponent: [[() => true, {color: 'red'}]],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'red'},
        });
      });
    });
  });

  describe('when a style array has an object followed by a condition', () => {
    describe('when the condition is false', () => {
      it('returns the style object', () => {
        const input = {
          myComponent: [{color: 'green'}, [() => false, {color: 'red'}]],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'green'},
        });
      });
    });

    describe('when the condition is true', () => {
      it('merges the conditional styles into the object', () => {
        const input = {
          myComponent: [{color: 'red'}, [() => true, {color: 'green'}]],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'green'},
        });
      });
    });
  });

  test.todo('arguments to conditional function, starting with window width');
});
