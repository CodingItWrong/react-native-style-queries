// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const transformedEntries = entries.map(([styleName, styleObjectOrArray]) => {
    let flattenedStyleObject;
    if (Array.isArray(styleObjectOrArray)) {
      const styleArray = styleObjectOrArray;
      const reducerInitialValue = {};
      flattenedStyleObject = styleArray.reduce(
        (previousValue, currentValue) => {
          let stylesToMerge = null;
          if (Array.isArray(currentValue)) {
            const [predicate, conditionalStyleObject] = currentValue;
            if (predicate()) {
              stylesToMerge = conditionalStyleObject;
            }
          } else {
            stylesToMerge = currentValue;
          }

          if (stylesToMerge) {
            return {...previousValue, ...stylesToMerge};
          } else {
            return previousValue;
          }
        },
        reducerInitialValue
      );
    } else {
      const styleObject = styleObjectOrArray;
      flattenedStyleObject = styleObject;
    }
    return [styleName, flattenedStyleObject];
  });
  return Object.fromEntries(transformedEntries);
}

module.exports = useStyleQueries;
