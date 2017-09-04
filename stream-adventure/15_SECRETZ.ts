/**
 * 2017-8-31 17:09:05
 *
 * An encrypted, gzipped tar file will be piped in on process.stdin. To beat this
 * challenge, for each file in the tar input, print a hex-encoded md5 hash of the
 * file contents followed by a single space followed by the filename, then a
 * newline.
 *
 * You will receive the cipher name as process.argv[2] and the cipher passphrase as
 * process.argv[3]. You can pass these arguments directly through to
 * `crypto.createDecipher()`.
 *
 * The built-in zlib library you get when you `require('zlib')` has a
 * `zlib.createGunzip()` that returns a stream for gunzipping.
 * */

import { createDecipher, createHash } from 'crypto';
import { createGunzip } from 'zlib';
import { extract } from 'tar-stream';
import { Decorator } from './nm-streams.module';

let cipherName = process.argv[ 2 ];
let passPhrase = process.argv[ 3 ];

process.stdin
  .pipe(createDecipher(cipherName, passPhrase))
  .pipe(createGunzip())
  .pipe(specialExtract());


function specialExtract() {
  let ext = extract();
  ext.on('entry', (header, reading, next) => {
    // 只对文件进行操作
    if (header.type !== 'file') {
      next();
      return -1;
    }

    reading
      .pipe(createHash('md5', { encoding: 'hex' }))
      .pipe(new Decorator('', ' ' + header.name + '\n'))
      .pipe(process.stdout);

    reading.on('end', () => {
      next();
    });
  });
  return ext;
}
