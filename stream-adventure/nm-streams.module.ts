/**
 * 2017-8-23 16:41:29
 *
 * 在 stream-adventure 中有公用意义的stream集合
 * */

import * as stream from 'stream';
import { TransformOptions } from 'stream'; // 这个导入并不会体现在js中，没有赘余

/* Transform Streams */
/**
 * 将输入的字符串转换为大写后输出
 * */
export class UpperCaser extends stream.Transform {
  constructor(options?: TransformOptions) {
    super(options);
  }

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    // 给回调函数的第二个参数会转发到this.push()中：
    next(null, chunk.toString().toUpperCase());
    /*
    * 相当于：
    * this.push(chunk.toString().toUpperCase());
    * next(null);
    * */
  }
}

/**
 * 将输入的字符串转换为小写后输出
 * */
export class LowerCaser extends stream.Transform {
  constructor(options?: TransformOptions) {
    super(options);
  }

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    next(null, chunk.toString().toLowerCase());
  }
}

/**
 * 以指定符号（单个字符）为输出单位缓冲字符串，输出时包含指定符号
 * */
export class Split extends stream.Transform {
  constructor(protected _symbol: string, protected _outputTail: boolean = false, options?: TransformOptions) {
    super(options);
  }

  // 用于暂存
  protected _temp: string = '';

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    this._temp += chunk.toString();
    let lastIndex = this._temp.lastIndexOf(this._symbol);
    if (lastIndex === -1) {
      next(null);
    } else {
      this.push(this._temp.slice(0, lastIndex + 1));
      this._temp = this._temp.slice(lastIndex + 1);
      next(null);
    }
  }

  public _flush(end: Function) {
    if (this._temp.length > 0) {
      if (this._outputTail) {
        this.push(this._temp);
        console.warn('输出尾部：', this._temp);
      } else {
        console.warn('部分数据因为缺少输出单位而没有输出：', this._temp);
      }
    }
    end(null);
  }
}

/**
 * 输入多行字符串，输出时奇数行小写，偶数行大写
 * */
export class OddLowerEvenUpper extends stream.Transform {
  constructor(options?: TransformOptions) {
    super(options);
  }

  protected lineNum: number = 1;

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    let input: Array<String> = chunk.toString().split(/[\n\r]/);
    for (let i = 0, len = input.length; i < len; i++) {
      let line = input[ i ];
      if (!line && i === len - 1) {
        break;
      }
      if (this.lineNum++ % 2) {
        // 奇数
        this.push(line.toLowerCase() + '\n');
      } else {
        // 偶数
        this.push(line.toUpperCase() + '\n');
      }
    }
    next(null);
  }
}

/**
 * 以console.warn()输出流经管道的内容
 * */
export class Print extends stream.Transform {
  constructor(protected _tag: string = 'Print: ', options?: TransformOptions) {
    super(options);
  }

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    console.warn(this._tag, chunk.toString());
    next(null, chunk);
  }
}

/**
 * 聚合所有输入（直到end标识）后输出
 * @param [_reverse] 是否倒序输出，默认为正序
 * */
export class Concat extends stream.Transform {
  constructor(protected _reverse: boolean = false, options?: TransformOptions) {
    super(options);
  }

  // 暂存所有数据直到end标识
  protected _temp: string = '';

  // 接收所有数据
  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    this._temp += chunk.toString();
    next(null);
  }

  // end标识出现，输出所有数据
  public _flush(end: Function) {
    if (this._reverse) {
      // 倒序输出
      this.push(this._temp.split('').reverse().join(''));
      end(null);
    } else {
      this.push(this._temp);
      end(null);
    }
  }
}

/**
 * 将输入流和输出流合成为一个双工流
 * @param readable 可读流
 * @param writable 可写流
 * */
export class Duplexer extends stream.Duplex {
  constructor(protected _readableStream: stream.Readable,
              protected _writableStream: stream.Writable,
              options?: TransformOptions) {
    super(options);

    // 可读流
    this._readableStream.on('data', (chunk) => {
      if (!this.push(chunk)) {
        this._readableStream.pause();
      }
    });
    this._readableStream.on('end', () => {
      this.push(null);
    });

    // 可写流 node v8.0.0之前
    if (+process.version[ 1 ] < 8) {
      this.on('finish', () => {
        process.nextTick(() => {
          this._writableStream.end();
        })
      });
    }

    // 抛出底层的错误
    this._readableStream.on('error', (err) => {
      this.emit('error', err);
    });
    this._writableStream.on('error', (err) => {
      this.emit('error', err);
    });
  }


  // 需要读取时
  public _read() {
    this._readableStream.isPaused() && this._readableStream.resume();
  }

  // 需要写入时
  public _write(chunk: Buffer | string | any, encoding: string, next: Function) {
    if (!this._writableStream.write(chunk, encoding)) {
      this._writableStream.once('drain', () => {
        next(null)
      });
    } else {
      process.nextTick(() => {
        next(null)
      });
    }
  }

  /* Added in: v8.0.0，node版本不够时侦听finish事件代替，
  * 但是实现方式相应地没有下面这么稳妥。*/
  public _final(end: Function) {
    process.nextTick(() => {
      this._writableStream.end();
      this._writableStream.once('finish', () => {
        end(null);
      });
    })
  }
}

/**
 * 将几个转换流（双工流）按给定次序pipe到一起，返回这个新流
 * @param streams 要合并的双工流，按先后次序排列
 * @param [options] 双工流选项
 * */
export function combine(streams: Array<stream.Transform | stream.Duplex>, options?: stream.DuplexOptions) {

  function onError(this: stream.Transform, err: Error) {
    this.emit('error', err);
  }

  if (Object.prototype.toString.call(streams) !== '[object Array]') {
    throw new TypeError('Input is expected to be an Array.');
  }
  if (streams.length === 0) {
    throw new TypeError('Array should contain 1 Transform/Duplex at least.');
  }
  if (streams.length === 1) {
    return streams[ 0 ];
  }
  let len = streams.length;
  let first = streams[ 0 ];
  let last = streams[ len - 1 ];
  let pipeLine = new Duplexer(last, first, options);

  for (let i = 0; i + 1 <= len - 1; i++) {
    let now = streams[ i ];
    let next = streams[ i + 1 ];

    now.pipe(next);

    // 处理从第二个到倒数第二个的错误
    if (i !== 0) {
      now.on('error', (err) => {
        onError.call(now, err);
      });
    }
  }

  return pipeLine;
}

/**
 * 装饰一个流，在其之前或之后添加内容，可替代正向的Concat
 * @param [_before] 之前内容，默认为空
 * @param [_after] 之后内容，默认为空
 * */
export class Decorator extends stream.Transform {
  constructor(protected _before: string = '', protected _after: string = '', options?: TransformOptions) {
    super(options);
  }

  // 暂存所有数据直到end标识
  protected _temp: string = '';

  // 接收所有数据
  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    this._temp += chunk.toString();
    next(null);
  }

  // end标识出现，输出所有数据
  public _flush(end: Function) {
   this.push(this._before + this._temp + this._after);
   end(null);
  }
}
