const buildQuery = require('./buildQuery');

const colorScheme = buildQuery(
  requiredScheme =>
    ({colorScheme}) =>
      colorScheme === requiredScheme
);

module.exports = {colorScheme};
