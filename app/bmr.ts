interface BMRInput{
    sex: "male" | "female";
    weight: number;
    height: number;
    age: number;
}

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