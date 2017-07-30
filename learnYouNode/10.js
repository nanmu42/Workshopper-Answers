/**
 * Created by nanmu on 2017/7/30.
 *
 * 授时服务器 (第 10 个习题，共 13 个)
 * 编写一个 TCP 时间服务器
 *
 * 你的服务器应当监听一个端口，以获取一些 TCP
 * 连接，这个端口会经由第一个命令行参数传递给你的程序。针对每一个 TCP
 * 连接，你都必须写入当前的日期和24小时制的时间，如下格式：
 *
 * "YYYY-MM-DD hh:mm"
 *
 * 然后紧接着是一个换行符。
 *
 * 月份、日、小时和分钟必须用零填充成为固定的两位数：
 *
 * "2013-07-06 17:42"
 *
 *  提示：如果你想手动测试下面功能，这样做：
 *  1. node 10.js 8085
 *  2. telnet localhost 8085
 *  3. bingo!
 *
 *  Windows上启用telnet可用命令（管理员运行）：
 *  dism /online /Enable-Feature /FeatureName:TelnetClient
 *
 * */

const net = require('net');

let port = process.argv[ 2 ];
let server = net.createServer((c) => {
  // 每次连接，这里的回调都会运行一次

  console.warn(`接收到来自${c.remoteAddress}，端口号为${c.remotePort}的连接`);
  c.on('end', () => {
    console.warn(`断开了来自${c.remoteAddress}，端口号为${c.remotePort}的连接`);
  });

  let now = formatDateTime(new Date());
  console.warn(`对来自${c.remoteAddress}，端口号为${c.remotePort}的连接进行授时：${now}`);
  c.end(now + '\n'); /* 是的，返回的数据需要一个换行符，见预期结果的第二行 */

});

server.on('error', (e) => {
  console.warn('服务遇到了错误：');
  console.log(e);
});

try {
  server.listen(port, () => {
    console.warn(`TCP授时服务器已建立，监听本地端口${port}`);
  });
} catch (e) {
  console.log(e);
}

/**
 * 返回指定时间对象的YYYY-MM-DD hh:mm形式
 * @param date {Date} 时间对象
 * @return {String} 时间对象的YYYY-MM-DD hh:mm形式
 * */
function formatDateTime(date) {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw new TypeError('输入值需要是一个Date对象');
  }

  return `${date.getFullYear()}-${fillNum(date.getMonth() + 1)}-${fillNum(date.getDate())} ${fillNum(date.getHours())}:${fillNum(date.getMinutes())}`;
}

/**
 * 为字符串形式的数字补足前导0到指定位数，如果位数足够或超出num，则原样返回num
 * @param num {Number|String} 需要进行补足的数字
 * @param [length] {Number} 需要补足到的指定位数，默认为2
 * */
function fillNum(num, length) {
  if (length === undefined) {
    length = 2;
  }

  if (typeof length !== 'number') {
    throw new TypeError('可选参数参数length在填入时需要为数字');
  }

  let str = '';
  try {
    str = String(num);
  } catch (e) {
    console.warn('输入参数num无法转换为string形式');
    throw e;
  }

  if (str.length >= length) {
    return num;
  } else {
    return ('0'.repeat(length) + str).slice(-length);
  }

}
