/**
 * 2017-9-5 19:32:11
 *
 * Write a function that allows you to use Array.prototype.slice without using slice.call or slice.apply to invoke it.
 * */

module.exports = Function.prototype.call.bind(Array.prototype.slice);

// Explained:
// The value of `this` in Function.call is the function
// that will be executed.
// 比如：
// function a() { return 1; }
// a.call(b, c);
// 这时call函数的this为函数a，用bind可以绑定call的this到函数Array.prototype.slice
//
// Bind returns a new function with the value of `this` fixed
// to whatever was passed as its first argument.
//
// Every function 'inherits' from Function.prototype,
// thus every function, including call, apply and bind
// have the methods call apply and bind.
//
// Function.prototype.call === Function.call
