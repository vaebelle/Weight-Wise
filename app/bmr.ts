/**
 * Basal Metabolic Rate (BMR) Calculator
 *
 * This function calculates the Basal Metabolic Rate (BMR), which is the number of calories
 * your body requires to perform basic functions at rest, such as breathing and maintaining body temperature.
 * The formula used is based on the Mifflin-St Jeor Equation.
 *
 * The function supports both male and female inputs and requires weight, height, and age as parameters.
 */


/**
 * Interface for BMR Input
 *
 * Defines the structure of the input required by the `calculateBMR` function.
 * - `sex`: Specifies the biological sex of the individual. Accepted values are `"male"` or `"female"`.
 * - `weight`: The weight of the individual in kilograms (kg).
 * - `height`: The height of the individual in centimeters (cm).
 * - `age`: The age of the individual in years.
 **/
interface BMRInput{
    sex: "male" | "female";
    weight: number;
    height: number;
    age: number;
}

/**
 * Calculates the Basal Metabolic Rate (BMR).
 *
 * The BMR is calculated using the Mifflin-St Jeor Equation:
 * - For males: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
 * - For females: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161
 *
 * @param input - An object of type `BMRInput` containing the following:
 *   - `sex`: `"male"` or `"female"`, indicating the biological sex.
 *   - `weight`: The weight in kilograms.
 *   - `height`: The height in centimeters.
 *   - `age`: The age in years.
 * @returns The calculated BMR as a number, representing calories required per day.
 * @throws An error if any input is missing or invalid.
 * */
export function calculateBMR(input: BMRInput): number{
    const {sex, weight, height, age} = input;

    if (!weight || !height || !age || !sex) {
        throw new Error("All inputs (sex, weight, height, and age) are required.");
      }
    
      if (sex === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
      } else if (sex === "female") {
        return 10 * weight + 6.25 * height - 5 * age - 161;
      } else {
        throw new Error("Invalid sex provided. Must be 'male' or 'female'.");
      }
}