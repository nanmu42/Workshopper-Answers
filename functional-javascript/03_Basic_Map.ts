/**
 * 2017-9-4 18:32:11
 *
 * Convert the following code from a for-loop to Array#map:
 *
 * function doubleAll(numbers) {
 *      var result = []
 *      for (var i = 0; i < numbers.length; i++) {
 *        result.push(numbers[i] * 2)
 *      }
 *      return result
 *    }
 *
 * module.exports = doubleAll
 * */

function doubleAll(numbers: number[]) {
  return numbers.map((value => 2 * value))
}

module.exports = doubleAll;
