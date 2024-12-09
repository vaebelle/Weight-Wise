/**
 * Newton's Divided Difference Interpolation Utilities
 *
 * These functions are used to construct a divided difference table and perform interpolation
 * or extrapolation of data points using Newton's Divided Difference method.
 *
 * Functions:
 * - `calculateDividedDifferenceTable`: Constructs a divided difference table for given x and y values.
 * - `dividedDifference`: Computes the interpolated or extrapolated y value for a given x value.
**/

/**
 * Constructs a Divided Difference Table.
 *
 * The divided difference table is a triangular table used for Newton's Divided Difference 
 * interpolation method. It computes the coefficients of the interpolation polynomial.
 *
 * @param x - Array of independent variable values (x-values).
 * @param y - Array of dependent variable values (y-values), corresponding to x-values.
 * @returns A 2D array (table) containing divided difference coefficients.
 **/
export function calculateDividedDifferenceTable(x: number[], y: number[]): number[][] {
  const n = x.length;
  const table: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // Initialize the first column with y values
  for (let i = 0; i < n; i++) {
      table[i][0] = y[i];
  }

  // Calculate divided differences
  for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
          table[i][j] = (table[i + 1][j - 1] - table[i][j - 1]) / (x[i + j] - x[i]);
      }
  }

  return table;
}

/**
* Interpolate or extrapolate a value using Newton's Divided Difference Formula.
* @param x Array of x values
* @param y Array of y values
* @param value The x value to interpolate or extrapolate
* @returns The interpolated or extrapolated y value
*/
export function dividedDifference(x: number[], y: number[], value: number): number {
  const table = calculateDividedDifferenceTable(x, y);
  const n = x.length;
  let result = table[0][0];
  let product = 1;

  for (let i = 1; i < n; i++) {
      product *= (value - x[i - 1]);
      result += table[0][i] * product;
  }

  return result;
}