// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const result = Object.fromEntries(entries);
  return result;
}

module.exports = useStyleQueries;
