const screenWidthMax = (maximumWidth, conditionalStyles) => {
  const predicate = ({screenWidth}) => screenWidth <= maximumWidth;
  return [predicate, conditionalStyles];
};

const screenWidthMin = (minimumWidth, conditionalStyles) => {
  const predicate = ({screenWidth}) => screenWidth >= minimumWidth;
  return [predicate, conditionalStyles];
};

module.exports = {screenWidthMax, screenWidthMin};
