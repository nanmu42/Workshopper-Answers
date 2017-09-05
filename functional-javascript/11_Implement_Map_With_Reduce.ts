/**
 * 2017-9-5 12:47:35
 *
 * Use Array#reduce to implement a simple version of Array#map.
 * No need to implement the optional `thisArg` argument of `Array.prototype.map`, bonus points if you do!
 * */

module.exports = function arrayMap(arr: any[], fn: (current: any, index: number, array: any[]) => any): any[] {
  return map.call(arr, fn);
};

/**
 *  实现this指向的map函数
 * */
function map(this: any[], fn: (current: any, index: number, array: any[]) => any): any[] {
  return Array.prototype.reduce.call(this, (pre: any[], cur: any, index: number) => {
    pre.push(fn(cur, index, this));
    return pre;
  }, [])
}
