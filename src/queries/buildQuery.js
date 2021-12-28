const buildQuery = predicateBuilder => (argument, conditionalStyles) => {
  const predicate = predicateBuilder(argument);
  return [predicate, conditionalStyles];
};

module.exports = buildQuery;
