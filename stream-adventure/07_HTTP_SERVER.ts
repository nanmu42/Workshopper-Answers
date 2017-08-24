/**
 * 2017-8-24 10:52:27
 *
 * In this challenge, write an http server that uses a through stream to write back
 * the request stream as upper-cased response data for POST requests.
 *
 * Your http server should listen on the port given at process.argv[2] and convert
 * the POST request written to it to upper-case using the same approach as the
 * TRANSFORM example.
 * */

import * as http from 'http';
import { UpperCaser } from './nm-streams.module';

const portNum = process.argv[2];

let server = http.createServer((req, res) => {
  console.warn(`${(new Date()).toLocaleString()}：连接建立，来源：${req.socket.remoteAddress}，端口：${req.socket.remotePort}`);

  // 只接受POST方式的连接
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end();
    return -1;
  }

  res.writeHead(200, { 'content-type': 'text/plain' });
  req.pipe(new UpperCaser()).pipe(res);

  res.on('finish', () => {
    console.warn((new Date()).toLocaleString() + '：数据已经全部发送');
  })
});

server.listen(portNum, () => {
  let info = server.address();
  console.warn(`服务器监听于：${info.address}，端口：${info.port}`);
});
