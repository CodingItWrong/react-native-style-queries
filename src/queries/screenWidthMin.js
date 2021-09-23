const screenWidthMin = (minWidth, styles) => [
  ({screenWidth}) => screenWidth >= minWidth,
  styles,
];

module.exports = screenWidthMin;
