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
      } else if (styleArray.length > 1) {
        flattenedStyleObject = styleArray.reduce(
          (previousValue, currentValue) => {
            return {...previousValue, ...currentValue};
          }
        );
      } else {
        flattenedStyleObject = styleArray[0];
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
