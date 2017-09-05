/**
 * 2017-9-5 14:27:46
 *
 * Modify the boilerplate below such that it uses a trampoline to continuously call itself synchronously.
 *
 * You can assume that the operation passed to repeat does not take arguments
 * (or they are already bound to the function) and the return value is not important.
 *
 * 参考资料：http://raganwald.com/2013/03/28/trampolines-in-javascript.html
 * */

function repeat3(operation: Function, num: number): any {
  // 用蹦床改进repeat
  if (num <= 0) return;
  operation();
  return function () {
    repeat3(operation, --num);
  }
}

/**
 * 蹦床函数，把堆栈换为循环
 * */
export function trampoline(fn: Function): Function {
  return function (...args: any[]) {
    let result = fn.apply(null, ...args);
    // 如果返回的是一个函数，那么说明运算还没有结束
    while(result instanceof Function) {
      result = result();
    }
    return result;
  }
}

module.exports = function (operation: Function, num: number) {
  return trampoline(repeat3(operation, num));
};
