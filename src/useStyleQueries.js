// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const entries = Object.entries(styleConfig);
  const transformedEntries = entries.map(([styleName, styleObjectOrArray]) => {
    let flattenedStyleObject;
    if (Array.isArray(styleObjectOrArray)) {
      flattenedStyleObject = flattenStyleArray(styleObjectOrArray);
    } else {
      flattenedStyleObject = styleObjectOrArray;
    }
    return [styleName, flattenedStyleObject];
  });
  return Object.fromEntries(transformedEntries);
}

function flattenStyleArray(styleArray) {
  const reducerInitialValue = {};
  const flattenedStyleObject = styleArray.reduce(
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
  return flattenedStyleObject;
}

module.exports = useStyleQueries;
