/**
 * 2017-8-15 17:03:40
 *
 * Take data from `process.stdin` and pipe it to `process.stdout`.
 * With `.pipe()`. `process.stdin.pipe()` to be exact.
 * Don't overthink this.
 *
 * 在命令行中运行 node stream-adventure/03_INPUT_OUTPUT.js 可看效果
 * */

process.stdin.pipe(process.stdout);
