/**
 * Created by nanmu on 2017/7/17.
 *
 *  使其模块化 (第 6 个习题，共 13 个)
 *
 * 这个问题和前面一个一样，但是这次会介绍模块的概念。你将需要创建两个文件来解
 * 决这个问题。
 *
 * 编写一个程序来打印出所给文件目录的所含文件的列表，并且以特定的文件名后缀来
 * 过滤这个列表。这次将会提供两个参数，第一个参数是要列举的目录，第二个参数是
 * 要过滤的文件扩展名。你需要在终端中打印出过滤出来的文件列表（一个文件一行）
 * 。此外，你必须使用异步 I/O。
 *
 * 你得编写一个模块
 * 文件去做大部分的事情。这个模块必须导出（export）一个函数，这个函数将接收三
 * 个参数：目录名、文件扩展名、回调函数，并按此顺序传递。文件扩展名必须和传递
 * 给你的程序的扩展名字符串一模一样。也就是说，请不要把它转成正则表达式或者加
 * 上 "."前缀或者做其他的处理，而是直接传到你的模块中去，在模块中，你可以做一
 * 些处理来使你的过滤器能正常工作。
 *
 * 这个回调函数必须以 Node 编程中惯用的约定形式（err,
 * data）去调用。这个约定指明了，除非发生了错误，否则所传进去给回调函数的第一
 * 个参数将会是null，第二个参数才会是你的数据。
 */

const lister = require('./6.module');

let dirPath = process.argv[2];
let ext = process.argv[3];

lister(dirPath, ext, (err, list) => {

  if (err) {
    console.log(err);
  }

  console.log(list.join('\n'));
});
