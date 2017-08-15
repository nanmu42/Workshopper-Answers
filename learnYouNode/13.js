/**
 * Created by nanmu on 2017/8/15
 *
 * HTTP JSON API 服务器 (第 13 个习题，共 13 个)
 *
 * 编写一个 HTTP 服务器，每当接收到一个路径为 '/api/parsetime' 的 GET
 * 请求的时候，响应一些 JSON 数据。我们期望请求会包含一个查询参数（query
 * string），key 是 "iso"，值是 ISO 格式的时间。
 *
 * 如:
 *
 * /api/parsetime?iso=2013-08-10T12:10:15.474Z
 *
 * 所响应的 JSON 应该只包含三个属性：'hour'，'minute' 和 'second'。例如：
 *
 * {
 *   "hour": 14,
 *   "minute": 23,
 *   "second": 15
 * }
 *
 * 然后增再加一个接口，路径为
 * '/api/unixtime'，它可以接收相同的查询参数（query
 * string），但是它的返回会包含一个属性：'unixtime'，相应值是一个 UNIX
 * 时间戳。例如:
 *
 * { "unixtime": 1376136615474 }
 *
 * 你的服务器需要监听第一个命令行参数所指定的端口。
 * */

const http = require('http');
const url = require('url');

let [ , , port ] = process.argv;

/* 创建服务器以及服务器逻辑 */
let server = http.createServer();

server.on('request', (req, res) => {
  console.warn(`${(new Date()).toLocaleString()} 连接建立，地址：${req.socket.remoteAddress}，端口号：${req.socket.remotePort}，请求地址：${req.url}`);

  // 只接受GET方式的连接
  if (req.method !== 'GET') {
    res.writeHead(405);
    res.end();
    return -1;
  }

  // 路由
  let incoming = url.parse(req.url, true);
  let isoTime = incoming.query['iso'];
  switch (true) {
    case incoming.pathname === '/api/parsetime':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(parseTime(isoTime));
      break;
    case incoming.pathname === '/api/unixtime':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(unixTime(isoTime));
      break;
    default:
      res.writeHead(404);
      res.end();
      break;
  }

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

/* 服务逻辑 */
/**
 * 根据ISO格式时间得到题目要求的时分秒对象（字符串化）
 * @param dateString [String] ISO格式时间
 * */
function parseTime(dateString) {
  let time = new Date(dateString);
  let obj = {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds(),
  };

  return JSON.stringify(obj);
}

/**
 * 根据ISO格式时间得到题目要求的unixtime对象（字符串化）
 * @param dateString [String] ISO格式时间
 * */
function unixTime(dateString) {
  let time = new Date(dateString);
  let obj = {
    unixtime: time.valueOf(),
  };

  return JSON.stringify(obj);
}

