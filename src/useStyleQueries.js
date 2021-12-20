// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const transformedEntries = entries.map(([key, value]) => {
    let updatedValue;
    if (Array.isArray(value)) {
      if (value.length == 0) {
        updatedValue = {};
      } else {
        updatedValue = value[0];
      }
    } else {
      updatedValue = value;
    }
    return [key, updatedValue];
  });
  return Object.fromEntries(transformedEntries);
}

module.exports = useStyleQueries;
