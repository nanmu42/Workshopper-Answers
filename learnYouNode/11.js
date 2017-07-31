/**
 * Created by nanmu on 2017/7/30.
 * HTTP 文件服务器 (第 11 个习题，共 13 个)
 *
 * 编写一个 HTTP 文件 服务器，它用于将每次所请求的文件返回给客户端。
 *
 * 你的服务器需要监听所提供给你的第一个命令行参数所制定的端口。
 *
 * 同时，第二个会提供给你的程序的参数则是所需要响应的文本文件的位置。在这一题
 * 中，你必须使用 fs.createReadStream() 方法以 stream 的形式作出请求相应。
 *
 * */

const http = require('http');
const fs = require('fs');

// 提取端口号和文件地址
let [ , , port, fileLoc ] = process.argv;
console.warn(`初始化：端口号：${port}，文件地址：${fileLoc}`);

// 配置http服务器逻辑
let server = http.createServer((req, res) => {

  // 记录这次连接
  console.warn(`接收到来自${req.socket.remoteAddress}，端口为${req.socket.remotePort}的连接`);
  console.warn(req.headers);

  res.writeHead(200, { 'content-type': 'text/plain' });

  // 创建读取文件流
  let readStream = fs.createReadStream(fileLoc);
  readStream.on('open', (fd) => {
    console.warn('文件开始读取，指针：' + fd + '，路径：' + readStream.path);
  });
  readStream.on('close', () => {
    console.warn('文件读取结束，文件大小：' + readStream.bytesRead);
  });

  readStream.pipe(res);

  // 数据完成传送
  res.on('finish', () => {
    console.warn('数据已经全部发送：' + (new Date()).toLocaleString())
  })

});

server.on('close', () => {
  console.warn('服务器关闭：' + (new Date()).toLocaleString());
});

// 监听端口
try {
  server.listen(port);
} catch (e) {
  console.log(e);
}
