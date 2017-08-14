/**
 * Created by nanmu on 2017/8/14
 *
 *
 * 编写一个 HTTP 服务器，它只接受 POST 形式的请求，并且将 POST
 * 请求主体（body）所带的字符转换成大写形式，然后返回给客户端。
 *
 * 你的服务器需要监听由第一个命令行参数所指定的端口。
 * */

const http = require('http');
const upperCaser = require('./12.module'); // 实现一个大写转换器

// 端口地址
let [ , , port ] = process.argv;

// 服务器逻辑
let server = http.createServer((req, res) => {
  console.warn(`${(new Date()).toLocaleString()}：连接建立，来源：${req.socket.remoteAddress}:${req.socket.remotePort}`);

  // 只接受POST方式的连接
  if (req.method !== 'POST') {
    res.writeHead(405, 'Method Not Allowed');
    res.end();
    return -1;
  }

  res.writeHead(200, { 'content-type': 'text/plain' });
  req.pipe(upperCaser()).pipe(res); // 大小写转换

  // 数据完成传送
  res.on('finish', () => {
    console.warn((new Date()).toLocaleString() + '：数据已经全部发送')
  })

});

// 监听端口
try {
  server.listen(port, () => {
    let info = server.address();
    console.warn(`服务器监听于：${info.address}:${info.port}`);
  });
} catch (e) {
  console.log(e);
}
