// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const transformedEntries = entries.map(([styleName, styleObjectOrArray]) => {
    let flattenedStyleObject;
    if (Array.isArray(styleObjectOrArray)) {
      const styleArray = styleObjectOrArray;
      // TODO: set up linter to disallow double-equals
      if (styleArray.length === 0) {
        flattenedStyleObject = {};
      } else {
        flattenedStyleObject = styleArray.reduce(
          (previousValue, currentValue) => {
            return {...previousValue, ...currentValue};
          }
        );
      }
    } else {
      const styleObject = styleObjectOrArray;
      flattenedStyleObject = styleObject;
    }
    return [styleName, flattenedStyleObject];
  });
  return Object.fromEntries(transformedEntries);
}

module.exports = useStyleQueries;
