/**
 * Perform Lagrange interpolation to find the interpolated value at a specific point.
 * @param x Array of x values
 * @param y Array of corresponding y values
 * @param value The x value at which to interpolate
 * @returns The interpolated y value
 */
export function lagrangeInterpolation(x: number[], y: number[], value: number): number {
    const n = x.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        let term = y[i];
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                term *= (value - x[j]) / (x[i] - x[j]);
            }
        }
        result += term;
    }

    return result;
}
