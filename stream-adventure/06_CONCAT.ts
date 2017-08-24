/**
 * 2017-8-24 10:18:08
 *
 * You will be given text on process.stdin. Buffer the text and reverse it using
 * the `concat-stream` module before writing it to stdout.
 *
 * 老样子，原生库已经足够好用，就没有必要引入第三方依赖了。
 * */
import { Concat } from './nm-streams.module';

process.stdin
  .pipe(new Concat(true))
  .pipe(process.stdout);
