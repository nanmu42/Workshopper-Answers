/**
 * Created by nanmu on 2017/7/16.
 * 第一个异步 I/O！ (第 4 个习题，共 13 个)
 *
 * 编写一个程序，执行一个异步的对文件系统的操作：读取一个文件，并且在终端（标
 * 准输出 stdout）打印出这个文件中的内容的行数。类似于执行 cat file | wc -l
 * 这个命令。
 *
 * 所要读取的文件的完整路径会在命令行第一个参数提供。
 */

const fs = require('fs');

let re = /\n/g;  // 匹配换行符
let returnCount = 0;  // 换行符数量

try {
  // 第三个参数为文件路径，观察发现，文件的内容应该是动态生成的
  // 只要把 'utf8' 作为 readFileSync 的第二个参数传入
  // 就可以不用 .toString() 来得到一个字符串
  fs.readFile(process.argv[ 2 ], 'utf8', cb);
} catch (e) {
  console.error('读取文件过程中出现了错误：', e);
  console.warn('输入的参数为', process.argv); // 不要用console.log()，第一个console.log的输出会被当成答案
  return;
}

// 只需要将原来的统计逻辑包装在回调函数里就好
// 注意：数据会作为第二参数传递给你的回调函数，第一个参数是错误信息
function cb(err, str) {

  if (err) {
    console.error(err);
    return;
  }

  console.warn('文件内容：', str);
  while (re.exec(str)) {
    returnCount += 1;
  }
// 换行符的数目正好等于行数
  console.log(returnCount);
}
