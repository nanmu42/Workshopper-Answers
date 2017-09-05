/**
 * 2017-9-5 12:41:00
 *
 * Use Function#bind to implement a logging function that allows you to namespace messages.
 *
 * Your implementation should take a namespace string,
 * and return a function that prints messages to the console with the namespace prepended.
 *
 * Make sure all arguments passed to the returned logging function are printed.
 * */

module.exports = function (namespace: string) {
  return console.log.bind(null, namespace);
};
