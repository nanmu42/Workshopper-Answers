/**
 * 2017-9-5 13:07:44
 *
 * Override a specified method of an object with new functionality while still maintaining all of the old behaviour.
 *
 * Create a spy that keeps track of how many times a function is called.
 * */

function Spy(target: any, method: string) {
  // 建立间谍
  let spy = {
    count: 0,
  };
  // 存下原始函数
  let origin = target[method];
  target[method] = function (...args: any[]) {
    ++spy.count;
    return origin.call(target, ...args);
  };
  // 返回到间谍的引用
  return spy;
}

module.exports = Spy;
