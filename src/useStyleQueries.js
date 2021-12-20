// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const transformedEntries = entries.map(([key, value]) => {
    let updatedValue;
    if (Array.isArray(value)) {
      updatedValue = {};
    } else {
      updatedValue = value;
    }
    return [key, updatedValue];
  });
  const result = Object.fromEntries(transformedEntries);
  return result;
}

module.exports = useStyleQueries;
