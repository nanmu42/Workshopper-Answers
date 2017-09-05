/**
 * 2017-9-5 16:47:06
 *
 * In this challenge, we're going to implement a 'curry' function for an arbitrary number of arguments.
 * */

/* 默默地抄了一波答案... */

function curryN(fn: Function, n: number = fn.length) {
  return function curriedN(this:any, arg: any) {
    if (n <= 1) return fn(arg);
    return curryN(fn.bind(this, arg), n - 1)
  }
}

module.exports = curryN;
