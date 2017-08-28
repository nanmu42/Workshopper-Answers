/**
 * 2017-8-25 18:23:34
 *
 * In this example, you will be given a readable stream, `counter`, as the first
 * argument to your exported function:
 *
 * module.exports = function (counter) {
 *    // return a duplex stream to count countries on the writable side
 *    // and pass through `counter` on the readable side
 * };
 *
 * Return a duplex stream with the `counter` as the readable side. You will be
 * written objects with a 2-character `country` field as input, such as these:
 *
 * {"short":"OH","name":"Ohio","country":"US"}
 * {"name":"West Lothian","country":"GB","region":"Scotland"}
 * {"short":"NSW","name":"New South Wales","country":"AU"}
 *
 * Create an object to track the number of occurrences of each unique country code.
 *
 * For example:
 *
 * {"US": 2, "GB": 3, "CN": 1}
 *
 * Once the input ends, call `counter.setCounts()` with your counts object.
 *
 * */

import { Duplexer } from './nm-streams.module';
import { Writable, WritableOptions } from 'stream';

class input extends Writable {
  constructor(protected _finalCallback?: Function,
              protected _cbContent?: any,
              options?: WritableOptions) {
    super(options);

    if (+process.version[ 1 ] < 8) {
      this.on('finish', () => {
        console.warn('count from finish event:', this._counts);
        if (this._finalCallback) {
          this._cbContent ? this._finalCallback.call(this._cbContent, this._counts) : this._finalCallback(this._counts);
        }
      });
    }
  }

  protected _counts: any = {};

  public _write(chunk: Buffer | string | any, encoding: string, next: Function) {
    console.warn('input: ', chunk);
    this._counts[ chunk[ 'country' ] ] = (this._counts[ chunk[ 'country' ] ] || 0) + 1;
    next(null);
  }

  public _final(end: Function) {
    console.warn('count from final:', this._counts);
    if (this._finalCallback) {
      this._cbContent ? this._finalCallback.call(this._cbContent, this._counts) : this._finalCallback(this._counts);
    }
    end();
  }
}

module.exports = function (counter: any) {
  return new Duplexer(counter, new input(counter.setCounts, counter, { objectMode: true }), { writableObjectMode: true });
};
