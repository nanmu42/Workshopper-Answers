/**
 * 2017-9-5 13:42:30
 *
 * Modify the recursive repeat function provided in the boilerplate, such that it does not block the event loop
 * (i.e. Timers and IO handlers can fire).  This necessarily requires repeat to be asynchronous.
 *
 * A timeout is queued to fire after 100 milliseconds, which will print the results of the test and exit the process.
 * repeat should release control of the event loop to allow the timeout to interrupt before all of
 * the operations complete.
 *
 * Try to perform as many operations as you can before the timeout fires!
 * */

/* 这段代码的效率是标准答案的将近两倍（以操作调用记） */
function repeat2(operation: Function, num: number): any {
  if (num <= 0) return;
  setImmediate(() => {
    operation();
    return repeat2(operation, --num);
  });
}

module.exports = repeat2;
