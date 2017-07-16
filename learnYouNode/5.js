/**
 * Created by nanmu on 2017/7/16.
 *
 * LS 过滤器 (第 5 个习题，共 13 个)
 *
 * 编写一个程序来打印出指定目录下的文件列表，并且以特定的文件名扩展名来过滤这
 * 个列表。这次会有两个参数提供给你，第一个是所给的文件目录路径（如：path/to/
 * dir），第二个参数则是需要过滤出来的文件的扩展名。
 *
 * 举个例子：如果第二个参数是 txt，那么你需要过滤出那些扩展名为 .txt的文件。
 *
 * 注意，第二个参数将不会带有开头的 .。
 *
 * 你需要在终端中打印出这个被过滤出来的列表，每一行一个文件。另外，你必须使用
 * 异步的 I/O 操作。
 */

const fs = require('fs');
const path = require('path');

// 存放读取并且过滤后的文件列表
let fileList = [];
let dirPath = process.argv[2];
let ext = process.argv[3];

if (!dirPath || !ext) {
  console.error('输入的路径或扩展名有误：', dirPath, ext);
  return;
}

fs.readdir(dirPath, 'utf8', (err, fileArray) => {

  if (err) {
    console.error(err);
    return;
  }

  console.warn('读取到的文件列表：', fileArray);

  fileList = fileArray.filter((file) => {
    return path.extname(file) === '.' + ext;
  });

  console.log(fileList.join('\n'));
});