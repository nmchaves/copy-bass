import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Inspired by `zipWith` from `fp-ts`:
 * https://gcanti.github.io/fp-ts/modules/Array.ts.html#zipwith
 *
 * Applies a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array. If one input array is shorter than the
 * other, excess elements of the longer array will be discarded.
 */
export function zipWith<A1, A2, Zipped>(
  arr1: Array<A1>,
  arr2: Array<A2>,
  fn: (a1: A1, a2: A2) => Zipped,
): Array<Zipped> {
  const minLength = Math.min(arr1.length, arr2.length);
  return arr1.slice(0, minLength).map((a1, idx) => fn(a1, arr2[idx]));
}
