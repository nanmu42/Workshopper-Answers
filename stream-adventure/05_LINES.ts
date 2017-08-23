/**
 * 2017-8-23 17:36:12
 *
 * Instead of transforming every line as in the previous "TRANSFORM" example,
 * for this challenge, convert even-numbered lines to upper-case and odd-numbered
 * lines to lower-case. Consider the first line to be odd-numbered. For example
 * given this input:
 *
 * One
 * Two
 * Three
 * Four
 *
 * Your program should output:
 *
 * one
 * TWO
 * three
 * FOUR
 * */
import { OddLowerEvenUpper, Split } from './nm-streams.module';

process.stdin
  .pipe(new Split('\n'))
  .pipe(new OddLowerEvenUpper())
  .pipe(process.stdout);
