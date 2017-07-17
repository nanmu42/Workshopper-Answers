/**
 * Created by nanmu on 2017/7/17.
 * 模块 @ 使其模块化 (第 6 个习题，共 13 个)
 */

const path = require('path');
const fs = require('fs');

module.exports = function (dirPath, ext, callback) {
  fs.readdir(dirPath, 'urf8', (err, data) => {
    if (err) {
      return callback(err);
    }

    let resArray = data.filter(value => {
      return path.extname(value) === '.' + ext;
    });

    // 正常输出时，err值为null
    callback(null, resArray);

  })
};
