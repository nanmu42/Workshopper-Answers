/**
 * 2017-8-25 12:06:20
 *
 * Write a program that exports a function that spawns a process from a `cmd`
 * string and an `args` array and returns a single duplex stream joining together
 * the stdin and stdout of the spawned process:
 *
 * var spawn = require('child_process').spawn;
 *
 * module.exports = function (cmd, args) {
 *    // spawn the process and return a single stream
 *    // joining together the stdin and stdout here
 * };
 * */

import { spawn } from 'child_process';
import { Duplexer } from './nm-streams.module';

module.exports = function (cmd: string, args: string[]) {
  console.warn('cmd: ', cmd, 'args: ', args);
  let child = spawn(cmd, args);
  return new Duplexer(child.stdout, child.stdin);
};


