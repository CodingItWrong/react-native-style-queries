const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const {height, width} = useWindowDimensions();
  const predicateArgument = {screenHeight: height, screenWidth: width};

  return mapPropertyValues(styleConfig, styleObjectOrArray => {
    if (Array.isArray(styleObjectOrArray)) {
      return flattenStyleArray({
        styleArray: styleObjectOrArray,
        predicateArgument,
      });
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
  const styleObjectArray = styleArray.map(element => {
    if (Array.isArray(element)) {
      const [predicate, conditionalStyleObject] = element;
      if (predicate(predicateArgument)) {
        return conditionalStyleObject;
      } else {
        return null;
      }
    } else {
      return element;
    }
  });
  return Object.assign({}, ...styleObjectArray);
}

module.exports = useStyleQueries;
