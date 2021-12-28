const buildQuery = predicateBuilder => (argument, conditionalStyles) => {
  const predicate = predicateBuilder(argument);
  return [predicate, conditionalStyles];
};

const screenHeightMax = buildQuery(
  maximumHeight =>
    ({screenHeight}) =>
      screenHeight <= maximumHeight
);

const screenHeightMin = buildQuery(
  minimumHeight =>
    ({screenHeight}) =>
      screenHeight >= minimumHeight
);

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

module.exports = {
  screenHeightMax,
  screenHeightMin,
  screenWidthMax,
  screenWidthMin,
};
