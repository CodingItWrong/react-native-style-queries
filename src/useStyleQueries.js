const {useWindowDimensions} = require('react-native');

function useStyleQueries(styleConfig) {
  const {width} = useWindowDimensions();
  const predicateArgument = ({screenWidth: width});

  const styleEntries = Object.entries(styleConfig);

  const styleEntriesToApply = styleEntries.map(([key, styleClauses]) => {
    // TODO: determine if any entry can be a "defaults" object
    const styleObject = styleClauses.reduce((acc, clause) => {
      const [predicate, conditionalStyleObject] = clause;

      const doesClauseMatch = predicate(predicateArgument);
      if (doesClauseMatch) {
        return {...acc, ...conditionalStyleObject};
      } else {
        return acc;
      }
    });

    return [key, styleObject];
  });

  return Object.fromEntries(styleEntriesToApply);
}

module.exports = useStyleQueries;
