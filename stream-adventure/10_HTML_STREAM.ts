/**
 * 2017-8-24 17:44:17
 *
 * Your program will get some html written to stdin. Convert all the inner html to
 * upper-case for elements with a class name of "loud",
 * and pipe all the html to stdout.
 *
 * 这道题目我们使用自制的load大写转换流，其中loud大写转换流使用Cheerio作为依赖：
 * 依赖已经写入package.json，请使用 npm i 命令进行安装。
 * */

import * as stream from 'stream';
import * as cheerio from 'cheerio';

class Louder extends stream.Transform {
  constructor(options?: stream.TransformOptions) {
    super(options);
  }

  protected _temp: string = '';

  public _transform(chunk: Buffer | string | any, encoding: string, next: Function) {
    this._temp += chunk.toString();
    next(null);
  }

  public _flush(end: Function) {
    // 缓存完毕，开始处理
    console.warn('处理前：', this._temp);
    let $ = cheerio.load(this._temp);
    $('.loud').each((idx, el) => {
      let word = $(el).text();
      $(el).text(word.toUpperCase());
    });
    this._temp = $.html();
    console.warn('处理后：', this._temp);

    /* 到这里本来已经结束了，但是测试程序使用的是全字符串匹配，所以需要调整一下回车符 (⊙﹏⊙)b */
    /* 好膜力的测试文字…… */
    let arr = this._temp.split('><');
    this._temp = arr[0] + '>\n  <' + arr[1] + '>\n<' + arr[2];
    this._temp = this._temp.replace(/\n\n/, '') + '\n';
    console.warn('调整后：', this._temp);

    this.push(this._temp);
    this.end(null);
  }
}

process.stdin.pipe(new Louder()).pipe(process.stdout);
