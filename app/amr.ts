/**
 * Active Metabolic Rate (AMR) Calculator
 *
 * This function calculates the Active Metabolic Rate (AMR), which is the total number
 * of calories burned per day, factoring in physical activity levels. It uses the Basal Metabolic Rate (BMR) 
 * and multiplies it by an activity level multiplier.
 */

export function calculateAMR(bmr: number, activityLevel: number): number{
    return bmr*activityLevel;
}

