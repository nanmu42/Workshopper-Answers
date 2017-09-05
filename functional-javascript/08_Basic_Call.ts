/**
 * 2017-9-5 11:54:48
 *
 * Write a function duckCount that returns the number of arguments passed to it which have a property 'quack' defined directly on them. Do not match values inherited from prototypes.
 *
 * Example:
 *
 * var notDuck = Object.create({quack: true})
 * var duck = {quack: true}
 * duckCount(duck, notDuck) // 1
 * */

interface duck {
  quack: any,
}

function duckCount(...args: (duck | any)[]) {
  return Array.prototype.reduce.call(args, (count: number, input: (duck | any), index: number) => {
    // 有的输入值很有意思，甚至有时还会有自己实现hasOwnProperty方法的对象。
    console.warn(index, input, Object.getPrototypeOf(input));
    if (Object.prototype.hasOwnProperty.call(input, 'quack')) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);
}

module.exports = duckCount;
