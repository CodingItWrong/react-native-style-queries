const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const {width} = useWindowDimensions();
  const predicateArgument = {screenWidth: width};

  return mapPropertyValues(styleConfig, styleObjectOrArray => {
    if (Array.isArray(styleObjectOrArray)) {
      return flattenStyleArray({styleArray: styleObjectOrArray, predicateArgument});
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

function flattenStyleArray({styleArray, predicateArgument}) {
  const reducerInitialValue = {};
  const flattenedStyleObject = styleArray.reduce(
    (previousValue, currentValue) => {
      let stylesToMerge = null;
      if (Array.isArray(currentValue)) {
        const [predicate, conditionalStyleObject] = currentValue;
        if (predicate(predicateArgument)) {
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
