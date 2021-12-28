const useStyleQueries = require('./useStyleQueries');

const MOCK_SCREEN_WIDTH = 375;

jest.mock('react-native', () => ({
  useWindowDimensions: () => ({
    width: MOCK_SCREEN_WIDTH,
  }),
}));

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
    describe('attributes passed into the predicate function', () => {
      test('screen width', () => {
        const predicate = args =>
          expect(args.screenWidth).toEqual(MOCK_SCREEN_WIDTH);
        const input = {
          myComponent: [[predicate, {}]],
        };
        useStyleQueries(input);
      });
    });

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

  describe('when a style array has two conditions', () => {
    describe('when neither condition is true', () => {
      it('returns an empty style object', () => {
        const input = {
          myComponent: [
            [() => false, {color: 'darkRed'}],
            [() => false, {color: 'red'}],
          ],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {},
        });
      });
    });

    describe('when only the first condition is true', () => {
      it("returns the first condition's style", () => {
        const input = {
          myComponent: [
            [() => true, {color: 'green'}],
            [() => false, {color: 'red'}],
          ],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'green'},
        });
      });
    });

    describe('when only the second condition is true', () => {
      it("returns the second condition's style", () => {
        const input = {
          myComponent: [
            [() => false, {color: 'red'}],
            [() => true, {color: 'green'}],
          ],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'green'},
        });
      });
    });

    describe('when both conditions are true', () => {
      it("merges the conditions' styles", () => {
        const input = {
          myComponent: [
            [() => true, {color: 'green', fontSize: 16}],
            [() => true, {fontSize: 22}],
          ],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {color: 'green', fontSize: 22},
        });
      });
    });

    describe('when a style array has a mix of objects and conditions', () => {
      it('merges all objects and true conditions', () => {
        const input = {
          myComponent: [
            [() => true, {color: 'yellow', fontFamily: 'Arial', fontSize: 16}],
            {fontSize: 22},
            [() => false, {color: 'red'}],
            [() => true, {fontFamily: 'Times New Roman'}],
            {color: 'green'},
            [() => false, {fontFamily: 'Papyrus'}],
          ],
        };
        const result = useStyleQueries(input);
        expect(result).toEqual({
          myComponent: {
            color: 'green',
            fontFamily: 'Times New Roman',
            fontSize: 22,
          },
        });
      });
    });
  });

  test.todo('arguments to conditional function, starting with window width');
});
