// TypeScript program for implementing
// Newton divided difference formula

// Function to find the product term
export function proterm(i: number, value: number, x: number[]): number {
    let pro = 1;
    for (let j = 0; j < i; j++) {
        pro *= (value - x[j]);
    }
    return pro;
}

// Function for calculating
// divided difference table
export function dividedDiffTable(x: number[], y: number[][], n: number): void {
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            y[j][i] = (y[j][i - 1] - y[j + 1][i - 1]) / (x[j] - x[i + j]);
        }
    }
}

// Function for applying Newton's
// divided difference formula
export function applyFormula(value: number, x: number[], y: number[][], n: number): number {
    let sum = y[0][0];

    for (let i = 1; i < n; i++) {
        sum += (proterm(i, value, x) * y[0][i]);
    }
    return sum;
}

