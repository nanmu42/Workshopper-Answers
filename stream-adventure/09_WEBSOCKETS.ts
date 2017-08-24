/**
 * 2017-8-24 17:19:16
 *
 * In this adventure, write some browser code that uses the websocket-stream module
 * to print the string "hello\n".
 *
 * Your solution file will be compiled with browserify and the verify script will
 * prompt you to open `http://localhost:8099` in a browser to verify your solution.
 *
 * 这道题目有点特殊，要求我们写浏览器端的Javascript，那我们就用浏览器端的WebSocket API进行原生开发。
 * 参考资料：https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * */

const socket = new WebSocket('ws://localhost:8099');

// 建立连接
socket.addEventListener('open', (event) => {
  socket.send('hello\n');

  // 关闭连接
  socket.close();
});
