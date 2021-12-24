const screenWidthMin = (minimumWidth, conditionalStyles) => [
  ({screenWidth}) => screenWidth >= minimumWidth,
  conditionalStyles,
];

module.exports = screenWidthMin;
