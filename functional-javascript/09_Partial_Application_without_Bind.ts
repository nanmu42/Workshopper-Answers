/**
 * 2017-9-5 12:32:40
 *
 * Use partial application to create a function that fixes the first argument to console.log.
 * i.e. Implement a logging function that prepends a namespace string to its output.
 *
 * Your implementation should take a namespace String and return a function that
 * prints messages to the console with the namespace prepended.
 *
 * You should use Function#apply to implement the partial application.
 *
 * Make sure all arguments passed to the returned logging function are printed.
 * */

function logger(namespace: string) {
  // ES6 以后直接使用剩余操作符
  return function (...args: any[]) {
    console.log.call(null, namespace, ...args);
  }
}

module.exports = logger;
