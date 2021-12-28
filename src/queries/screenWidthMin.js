const screenWidthMin = (minimumWidth, conditionalStyles) => {
  const predicate = ({screenWidth}) => screenWidth >= minimumWidth;
  return [predicate, conditionalStyles];
};

module.exports = {screenWidthMin};
