/**
 * Created by nanmu on 2017/7/26.
 *
 * 自己实现一套after，类似于：
 * @link https://github.com/Raynos/after/blob/master/index.js
 * */

module.exports = after;

/**
 * 在调用tick函数 count次后触发回调函数cb
 * @param count {Number} 直到函数执行时的调用次数
 * @param cb {Function} 回调函数，接收参数{err, data}
 * @param [err_cb] {Function} 接收第二次及以后错误的回调函数
 * @return tick [Function|Any] 用于调用的函数（接收参数{err, data}），或者cb的返回值（count===0时）
 * */

function after(count, cb, err_cb) {

  if (!(isFinite(count) && count | 0 === count && count >= 0)) {
    throw new Error('Param count needs to be a int above zero.');
  }

  if (typeof cb !== 'function') {
    throw new Error('cb needs to be a function.');
  }

  err_cb = err_cb || relax;

  // 暴露两个属性给外界
  proxy.count = count;
  proxy.hasError = false;

  return (count === 0) ? cb() : proxy;

  function proxy(err, result) {
    if (proxy.count < 0) {
      throw new Error('Callback of after has been called once.');
    }

    --proxy.count;

    if (err) {
      // 立即捕获这个错误
      cb(err);
      // 之后如果还有错误，使用err_cb进行捕获
      cb = err_cb;
      // 不再触发最后的回调cb
      proxy.hasError = true;
    } else if (proxy.count === 0 && !proxy.hasError) {
      cb(null, result);
    }

  }

  function relax() {

  }

}
