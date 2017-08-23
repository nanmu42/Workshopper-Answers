/**
 * 2017-8-23 15:23:18
 *
 * Convert data from `process.stdin` to upper-case data on `process.stdout`
 * using the `through2` module.
 *
 * 这里我们不使用 through2 模块，使用原生Stream模块来解决问题。
 * */

/* 从 nm-streams.module 中引入大写Transform流 */
import { UpperCaser } from './nm-streams.module';

process.stdin.pipe(new UpperCaser()).pipe(process.stdout);
