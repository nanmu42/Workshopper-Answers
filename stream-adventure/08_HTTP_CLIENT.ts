/**
 * 2017-8-24 16:55:30
 *
 * Send an HTTP POST request to http://localhost:8099 and pipe process.stdin into
 * it. Pipe the response stream to process.stdout.
 *
 * 依然采用原生模块进行开发
 * */

import * as http from 'http';

let portNum = 8099;
let options: http.ClientRequestArgs = {
  port: portNum,
  method: 'POST'
};

// 回调函数作为response的【一次】侦听者，参数为回复的消息：http.IncomingMessage
let req = http.request(options, (res => {
  res.pipe(process.stdout);
}));

process.stdin.pipe(req);


