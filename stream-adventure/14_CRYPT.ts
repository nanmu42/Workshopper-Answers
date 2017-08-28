/**
 * 2017-8-28 18:47:27
 *
 * Your program will be given a passphrase on `process.argv[2]` and 'aes256'
 * encrypted data will be written to stdin.
 *
 * Simply decrypt the data and stream the result to process.stdout.
 *
 * You can use the `crypto.createDecipher()` api from node core to solve this
 * challenge.
 * */

import { createDecipher } from 'crypto';
import { Print } from './nm-streams.module';

let passPhrase = process.argv[ 2 ];
console.warn('passPhrase: ', passPhrase);

let decipher = createDecipher('aes256', passPhrase);

process.stdin
  .pipe(new Print('input: '))
  .pipe(decipher)
  .pipe(new Print('output: '))
  .pipe(process.stdout);
