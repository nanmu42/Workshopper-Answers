/**
 * Created by nanmu on 2017/7/26.
 *
 * 实现一个“大写转换流”
 * */

const { Transform } = require('stream');

// 实例化，否则单个transform用完会关闭，再次调用会有 write after end 错误
module.exports = function () {
  return new Transform({
    transform(chunk, encoding, callback) {
      this.push(chunk.toString().toUpperCase());
      callback();
    }
  });
};
