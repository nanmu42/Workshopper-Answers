/**
 * Created by nanmu on 2017/7/16.
 * 婴儿学步 (第 2 个习题，共 13 个)
 *
 * 编写一个简单的程序，使其能接收一个或者多个命令行参数，并且在终端（标准输出
 * stdout）中打印出这些参数的总和。
 */

let array = process.argv;

let ans = array.reduce((acc, cur) => {
  if (isFinite(cur)) {
    return +cur + acc;
  } else {
    return acc;
  }
}, 0);

console.log(ans);
