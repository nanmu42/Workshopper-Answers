/**
 * 2017-8-23 16:41:29
 *
 * 在 stream-adventure 中有公用意义的stream集合
 * */

import * as stream from 'stream';

/* Transform Streams */
/**
 * 将输入的字符串转换为大写后输出
 * */
export class UpperCaser extends stream.Transform {
  constructor(options?: any) {
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
  constructor(options?: any) {
    super(options);
  }

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    next(null, chunk.toString().toLowerCase());
  }
}

/**
 * 以指定符号为输出单位缓冲字符串，输出时包含指定符号
 * */
export class Split extends stream.Transform {
  constructor(protected _symbol: string, options?: any) {
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
      console.warn('部分数据因为缺少输出单位而没有输出：', this._temp);
    }
    end(null);
  }
}

/**
 * 输入多行字符串，输出时奇数行小写，偶数行大写
 * */
export class OddLowerEvenUpper extends stream.Transform {
  constructor(options?: any) {
    super(options);
  }

  protected lineNum: number = 1;

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    let input: Array<String> = chunk.toString().split(/[\n\r]/);
    for (let i = 0, len = input.length; i < len; i++) {
      let line = input[i];
      if (!line && i === len - 1) {
        continue;
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
  constructor(options?: any) {
    super(options);
  }

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    console.warn('Print: ', chunk.toString());
    next(null, chunk);
  }
}
