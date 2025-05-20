function hideErrors(fn) {
  return function () {
    try {
      return fn.apply(this, arguments);
    } catch (e) {
      return;
    }
  };
}

function hideLogs(fn) {
  return function () {
    // Save the original console.log function
    let originalLog = console.log;
    // Replace the console.log function with an empty function
    console.log = function () { };
    // Call the original function
    let result = fn.apply(this, arguments);
    // Restore the original console.log function
    console.log = originalLog;
    // Return the result of the original function
    return result;
  };
}

module.exports = {
  hideErrors,
  hideLogs
};