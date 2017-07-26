/**
 * Created by nanmu on 2017/7/17.
 * HTTP 客户端 (第 7 个习题，共 13 个)
 *
 * 编写一个程序来发起一个 HTTP GET 请求，所请求的 URL
 * 为命令行参数的第一个。然后将每一个 "data"
 * 事件所得的数据，以字符串形式在终端（标准输出 stdout）的新的一行打印出来。
 *
 *
 * 注：这里同时解决了第8题，因此在第8题中，我会使用不同的解法
 *
 */

const http = require('http');

let requestUrl = process.argv[2];
let error;
let rawData = '';

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

  // 转为字符串
  res.setEncoding('utf8');

  res.on('data', chunk => {
    rawData += chunk;
    console.log(chunk);
  });

  res.on('end', () => {
    console.warn(`请求已经全文加载：
    ${rawData}
    ${res.headers}`);
  });

  res.on('error', err => {
    console.log(err);
  })

});
