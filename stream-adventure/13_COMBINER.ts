/**
 * 2017-8-28 15:04:15
 *
 * Write a module that returns a readable/writable stream using the
 * `stream-combiner` module. You can use this code to start with:
 *
 * var combine = require('stream-combiner')
 *
 * module.exports = function () {
 *        return combine(
 *            // read newline-separated json,
 *            // group books into genres,
 *            // then gzip the output
 *        )
 *    }
 *
 * Your stream will be written a newline-separated JSON list of science fiction
 * genres and books. All the books after a `"type":"genre"` row belong in that
 * genre until the next `"type":"genre"` comes along in the output.
 *
 * {"type":"genre","name":"cyberpunk"}
 * {"type":"book","name":"Neuromancer"}
 * {"type":"book","name":"Snow Crash"}
 * {"type":"genre","name":"space opera"}
 * {"type":"book","name":"A Deepness in the Sky"}
 * {"type":"book","name":"Void"}
 *
 * Your program should generate a newline-separated list of JSON lines of genres,
 * each with a `"books"` array containing all the books in that genre. The input
 * above would yield the output:
 *
 * {"name":"cyberpunk","books":["Neuromancer","Snow Crash"]}
 * {"name":"space opera","books":["A Deepness in the Sky","Void"]}
 *
 * Your stream should take this list of JSON lines and gzip it with
 * `zlib.createGzip()`.
 * */

import { Transform, TransformOptions } from 'stream';
import { createGzip } from 'zlib';
import { combine, Split } from './nm-streams.module';

/* 输入数据 */
interface Book {
  type: string,
  name: string
}

/* 书籍类 */
class BookList {
  constructor(public name: string, public books: Array<string> = []) {

  }

  public addBook(bookName: string) {
    this.books.push(bookName);
  }

  public valueOf() {
    return {
      name: this.name,
      books: this.books,
    };
  }

  public toString() {
    return JSON.stringify(this.valueOf());
  }
}

/* 将书籍进行分类的转换流 */
class ClassifyBooksTransform extends Transform {
  constructor(options?: TransformOptions) {
    super(options);
  }

  protected currentBookList: BookList | null = null;

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    let array = chunk.toString().split('\n');
    for (let row of array) {
      if (!row) {
        continue;
      }

      let item: Book = JSON.parse(row);

      if (item.type === 'genre') {
        this.currentBookList && this.push(this.currentBookList.toString() + '\n');
        this.currentBookList = new BookList(item.name);
      } else {
        if (!this.currentBookList) {
          throw new Error();
        }
        this.currentBookList.addBook(item.name);
      }
    }

    next(null);
  }

  public _flush(end: Function) {
    if (!this.currentBookList) {
      throw new Error();
    }
    this.push(this.currentBookList.toString() + '\n');
    end(null);
  }

}

module.exports = function () {
  return combine([new Split('\n'), new ClassifyBooksTransform(), createGzip()]);
};
