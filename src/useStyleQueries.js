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
          if (Array.isArray(currentValue)) {
            const [predicate, conditionalStyleObject] = currentValue;
            if (predicate()) {
              return {...previousValue, ...conditionalStyleObject};
            } else {
              return previousValue;
            }
          } else {
            return {...previousValue, ...currentValue};
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
