export function secondsFromMinutes(minutes: number) {
  return minutes * 60;
}

/**
 * Format the specified number of `seconds` to be displayed as part of a
 * timestamp, such as 1:17
 *
 * If `seconds` is not an integer, then it will be rounded to the nearest
 * integer.
 *
 * If the rounded value is a single-digit number, then this function will
 * prepend a "0". So the timestamp will look like 2:06 instead of 2:6 (for
 * example).
 */
export function formatSecondsTimestamp(seconds: number): string {
  if (seconds < 0) {
    throw new Error(`Expected a non-negative number. Received: ${seconds}`);
  }

  const secondsAsInt = Math.round(seconds);

  if (secondsAsInt <= 9) {
    return `0${secondsAsInt}`;
  }

  return secondsAsInt.toString();
}
