const useStyleQueries = require('./useStyleQueries');
const {useWindowDimensions} = require('react-native');

jest.mock('react-native', () => ({
  useWindowDimensions: jest.fn(),
}));

describe('useStyleQueries', () => {
  const styleConfig = {
    text: [
      {
        fontFamily: 'Arial',
        fontSize: 12,
      },
      [
        ({screenWidth}) => screenWidth >= 375,
        {
          fontSize: 18,
          color: 'red',
        },
      ],
    ],
  };

  it('uses the base styles when no conditions match', () => {
    useWindowDimensions.mockReturnValue({width: 320});
    const result = useStyleQueries(styleConfig);
    expect(result).toEqual({
      text: {
        fontFamily: 'Arial',
        fontSize: 12,
      },
    });
  });

  it('merges conditional styles on top of the base styles', () => {
    useWindowDimensions.mockReturnValue({width: 375});
    const result = useStyleQueries(styleConfig);
    expect(result).toEqual({
      text: {
        fontFamily: 'Arial',
        fontSize: 18,
        color: 'red',
      },
    });
  });
});
