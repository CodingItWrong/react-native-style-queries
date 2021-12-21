// const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  return mapPropertyValues(styleConfig, styleObjectOrArray => {
    if (Array.isArray(styleObjectOrArray)) {
      return flattenStyleArray(styleObjectOrArray);
    } else {
      return styleObjectOrArray;
    }
  });
}

function mapPropertyValues(object, mapFunction) {
  const entries = Object.entries(object);
  const transformedEntries = entries.map(([key, value]) => [
    key,
    mapFunction(value),
  ]);
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
