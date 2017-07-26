/**
 * Created by nanmu on 2017/7/26.
 * 玩转异步 (第 9 个习题，共 13 个)
 *
 * 这次的问题和之前的问题（HTTP 收集器）很像，也是需要使用到 http.get()
 * 方法。然而，这一次，将有三个 URL 作为前三个命令行参数提供给你。
 *
 * 你需要收集每一个 URL 所返回的完整内容，然后将它们在终端（标准输出
 * stdout）打印出来。这次你不需要打印出这些内容的长度，仅仅是内容本身即可（字
 * 符串形式）；每个 URL 对应的内容为一行。重点是你必须按照这些 URL
 * 在参数列表中的顺序将相应的内容排列打印出来才算完成。
 *
 * */

const http = require('http');
const after = require('./9.module'); // 实现一个计数回调

// 将服务器地址取进来，这里并不一定是三个地址，更多地址一样可行
const reqAddress = process.argv.slice(2);
let reqAmount = reqAddress.length; // 地址数目
let rawDataArr = []; // 用于存放服务器返回内容的数组

console.warn('服务器地址：', reqAddress);

// 每个end事件都会来触发一次计数器
let tick = after(reqAmount, (err, data) => {
  if (err) {
    console.warn('错误：', err);
  }

  // 输出各个服务器返回的内容
  console.log(rawDataArr.join('\n'));

});

reqAddress.forEach((address, index) => {

  rawDataArr[index] = '';

  http.get(address, res => {

    let error;
    const { statusCode } = res;

    if (statusCode !== 200) {
      error = new Error('服务器访问失败，状态码：', statusCode);
    }

    if (error) {
      tick(error);
      res.resume();
      return -1;
    }

    res.setEncoding('utf8');

    res.on('data', chunk => {
      rawDataArr[index] += chunk;
    });

    res.on('end', () => {
      console.warn(`服务器${index}的内容已经完成加载：
      ${rawDataArr[index]}`);
      // 触发计数器
      tick();
    });

    res.on('error', err => {
      tick(err);
    })

  })
});


