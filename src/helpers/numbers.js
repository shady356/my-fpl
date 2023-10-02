/**
 * Round half up ('round half towards positive infinity')
 * Negative numbers round differently than positive numbers.
 * src: https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
 */
export function round(num, decimalPlaces = 0) {
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}