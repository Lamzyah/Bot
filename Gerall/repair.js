function repairTemplateString(expression) {
  let openBraces = expression.split('{').length - 1;
  let closeBraces = expression.split('}').length - 1;
  let diff = openBraces - closeBraces;
  if (diff > 0) {
    expression += '}'.repeat(diff);
  } else if (diff < 0) {
    expression = expression.slice(0, diff);
  }
  return expression;
}

module.exports = {
  repairTemplateString
};