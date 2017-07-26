/**
 * Created by nanmu on 2017/7/25.
 *
 * HTTP 收集器 (第 8 个习题，共 13 个)
 *
 * 编写一个程序，发起一个 HTTP GET 请求，请求的 URL
 * 为所提供给你的命令行参数的第一个。收集所有服务器所返回的数据（不仅仅包括
 * "data" 事件）然后在终端（标准输出 stdout）用两行打印出来。
 *
 * 你所打印的内容，第一行应该是一个整数，用来表示你所收到的字符串内容长度，第
 * 二行则是服务器返回给你的完整的字符串结果。
 *
 * 注：题目附带的提示中的第一种解法已经在第7题中实现，这里采用第二种解法，使用
 * 第三方库，bl
 *
 * */

const http = require('http');
const bl = require('bl');

let requestUrl = process.argv[ 2 ];
let error;
let concated;

if (!requestUrl || typeof requestUrl !== 'string') {
  console.warn(new Error('缺少访问地址或访问地址类型错误，无法发起访问：', requestUrl));
  return;
}

// 如果你正好奇，learnyounode会在本地启动一个服务以应答这次请求
console.warn('请求的服务器地址：', requestUrl);

http.get(requestUrl, res => {
  const { statusCode } = res;

  if (statusCode !== 200) {
    error = new Error('服务器访问失败，状态：' + statusCode);
  }

  if (error) {
    console.warn(error);
    // 防止内存泄漏
    res.resume();
    return -1;
  }

  res.pipe(bl(function (err, data) {
    if (err) {
      res.resume();
      return console.console(err);
    }

    concated = data.toString();
    console.log(concated.length);
    console.log(concated);

  }));

  res.on('error', (err) => {
    console.log(err);
  })

});
