const buildQuery = predicateBuilder => (argument, conditionalStyles) => {
  const predicate = predicateBuilder(argument);
  return [predicate, conditionalStyles];
};

const screenWidthMax = buildQuery(
  maximumWidth =>
    ({screenWidth}) =>
      screenWidth <= maximumWidth
);

const screenWidthMin = buildQuery(
  minimumWidth =>
    ({screenWidth}) =>
      screenWidth >= minimumWidth
);

module.exports = {screenWidthMax, screenWidthMin};
