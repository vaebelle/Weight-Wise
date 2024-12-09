/**
 * MainPage
 *
 * This component handles the core functionality of the Weight Wise application, which helps users
 * track their weight management progress based on input data such as age, sex, height, weight, target
 * weight, exercise intensity, calories burned, and weight loss/gain per week/month. The component calculates BMR (Basal Metabolic Rate)
 * and AMR (Active Metabolic Rate) and displays weight predictions using the divided difference method for
 * interpolation and extrapolation.
 *
 * The component includes several features:
 * - User information form with fields for age, sex, weight, height, target weight, and exercise intensity
 * - Periodic data input form to record calories burned and weight over specific intervals
 * - Weight prediction functionality based on input data using Newton's Divided Difference method
 * - BMR and AMR status based on initial inputs
 * - Data analysis and visual display of weight trend using a bar chart (prediction at the last part of the graph)
 **/

"use client";
// React hooks for managing state and side effects
import { useEffect, useState } from "react";

// Import for rendering bar chart visualization
import { BarChart } from "@tremor/react";

//UI components
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Separator } from "../components/ui/separator";

import { cx } from "class-variance-authority";

//Import function for calculating AMR
import { calculateAMR } from "./amr";

//Import function for calculating BMR
import { calculateBMR } from "./bmr";

//Import function for Interpolation and Extrapolation calculations using Divided Difference Method
import { dividedDifference } from "./dividedDifference";

/**
 * MainPage Component that holds the entire weight management tool logic
 */
export default function MainPage() {
  // States to manage form input data
  const [sex, setSex] = useState(""); // User's sex (male or female)
  const [age, setAge] = useState(0); // User's age in years
  const [weight, setWeight] = useState(0); // User's weight in kg
  const [height, setHeight] = useState(0); // User's height in cm
  const [tar_weight, setTarWeight] = useState(0); // User's target weight in kg
  const [ex_int, setIntensity] = useState(""); // Exercise intensity factor
  const [time_int, setTimeInterval] = useState("Week"); // Time interval (Weekly/Monthly)
  const [predict, setPredict] = useState(0); // Predicted calories burned
  const [no_time, setTime] = useState(1); // Number of time intervals for periodic data
  const [rows, setRows] = useState([]); // Array to hold periodic data
  const [predictedWeight, setPredictedWeight] = useState(null); // Store predicted weight
  const [isFormComplete, setIsFormComplete] = useState(false); // Flag to check if the form is complete
  const [bmr, setBMR] = useState(null); // Store calculated BMR value
  const [amr, setAMR] = useState(null); // Store calculated AMR value

  /**
   * Custom tooltip for the bar chart (design and color schemes)
   * Displays calories burned and weight when hovering over bars in two decimal places.
   */
  const customTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload; // Extract data for the active bar

    return (
      <div className="flex flex-col w-52 rounded-lg border border-gray-300 bg-white p-2 shadow-lg text-center">
        <div className="font-semibold text-gray-700">{data.calorie} kcal</div>
        <hr className="my-1 border-gray-300" />
        <div className="flex justify-between text-gray-600">
          <span>Weight:</span>
          <span>{data.Weight.toFixed(2)} kg</span>
        </div>
      </div>
    );
  };

  /**
   * Handler to update time interval based on selected radio button (Weekly or Monthly)
   */
  const handleRadiobutton = (value) => {
    setTimeInterval(value);
  };

  /**
   * UseEffect Hook that updates rows array based on the number of time intervals inputted by the user
   */
  useEffect(() => {
    if (no_time && parseInt(no_time) > 0) {
      const newRows = Array.from({ length: parseInt(no_time) }, (_, index) => ({
        id: index + 1,
        cal_burn: 0, // Initialize with empty values
        weight: 0, // Initialize with empty values
      }));
      setRows(newRows);
    } else {
      setRows([]);
    }
  }, [no_time]);

  /**
   * Handler for input changes in periodic data table (Calories burned and weight)
   */
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  /**
   * Handler for prediction changes based on calories burned
   * Uses Newton's Divided Difference Method for interpolation and extrapolation
   */
  const handlePredictChange = (value) => {
    setPredict(value);
    const calorie_burn = parseFloat(value);

    // Check if the value is a valid number
    if (!isNaN(calorie_burn) && calorie_burn > 0 && rows.length > 1) {
      // Use the Newton Interpolation function to calculate predicted weight
      const xValues = rows.map((row) => parseFloat(row.cal_burn)); // Calories Burned
      const yValues = rows.map((row) => parseFloat(row.weight)); // Weight (kg)

      const predictedValue = dividedDifference(xValues, yValues, calorie_burn);
      setPredictedWeight(Math.round(predictedValue * 100) / 100);
    } else {
      setPredictedWeight(null); // Clear the prediction if invalid input
    }
  };

  /**
   * UseEffect Hook that checks if all the form data is completed. If true, Periodic Table Section is enabled, hence otherwise.
   */
  useEffect(() => {
    const isComplete =
      sex &&
      age > 0 &&
      weight > 0 &&
      height > 0 &&
      tar_weight > 0 &&
      ex_int > 0;
    setIsFormComplete(isComplete);
  }, [sex, age, weight, height, tar_weight, ex_int]);

  // Preparing chart data for the bar chart visualization
  const chartdata =
    rows.map((row) => ({
      calorie: parseFloat(row.cal_burn),
      Weight: parseFloat(row.weight),
    })) || [];

  // If prediction exists, add to the chart data
  if (predictedWeight) {
    chartdata.push({ calorie: predict, Weight: predictedWeight });
  }

  /**
   * Function to calculate BMR and AMR whenever form data is updated
   */
  useEffect(() => {
    // Ensure all inputs are valid before calculating
    if (sex && weight > 0 && height > 0 && age > 0) {
      const input = {
        sex,
        weight: parseFloat(weight),
        height: parseFloat(height),
        age: parseInt(age, 10),
      };

      const calculatedBMR = calculateBMR(input);
      setBMR(calculatedBMR);

      // Calculate AMR only if exercise intensity is valid
      if (ex_int > 0) {
        const calculatedAMR = calculateAMR(calculatedBMR, parseFloat(ex_int));
        setAMR(calculatedAMR);
      }
    } else {
      setBMR(null); // Reset BMR if inputs are invalid
      setAMR(null); // Reset AMR if inputs are invalid
    }
  }, [sex, weight, height, age, ex_int]);

  return (
    <>
      <div className="bg-[radial-gradient(circle,_rgba(165,214,167,0.7)_10%,_rgba(165,214,167,0.3)_40%,_rgba(165,214,167,0.6)_70%,_rgba(165,214,167,0.9)_100%)]">
        <div className="py-8 mx-auto text-center">
          <label className="font-bold text-3xl text-[#2E7D32]">
            WEIGHT WISE
          </label>
        </div>

        {/* Weight Wise Description */}
        <div className="mx-5 sm:mx-10 mt-4 text-center">
          <p>
            Weight Wise is a health and fitness tool designed to help users
            manage their weight effectively. It calculates your Basal Metabolic
            Rate (BMR) and Active Metabolic Rate (AMR) based on your personal
            details, including sex, age, weight, height, target weight, and
            exercise intensity. Using metric units, it provides insightful data
            analysis and offers interpolation and extrapolation functionality to
            project trends based on your input.
          </p>
        </div>

        {/* User Information Form */}
        <Card className="border-2 border-[#2E7D32] mx-5 mt-8 bg-[#E8F5E9] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#2E7D32]">User Information</CardTitle>
          </CardHeader>
          <CardContent className=" flex flex-col justify-between">
            <div className="pt-3 flex flex-col lg:flex-row flex-wrap lg:gap-6 gap-4 justify-center">
              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Sex:</label>
                <Select
                  value={sex}
                  onValueChange={(value) => {
                    console.log(value);
                    setSex(value);
                  }}
                >
                  <SelectTrigger className="border-2 border-[#388E3C] bg-white rounded-lg">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Age in years:</label>
                <input
                  type="number"
                  className="border-2 border-[#388E3C] bg-white rounded-lg p-1"
                  value={age || ""}
                  onChange={(e) => {
                    setAge(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Weight in Kg.:</label>
                <input
                  type="number"
                  className="border-2 border-[#388E3C] bg-white rounded-lg p-1"
                  value={weight || ""}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Height in cm:</label>
                <input
                  type="number"
                  className="border-2 border-[#388E3C] bg-white rounded-lg p-1"
                  value={height || ""}
                  onChange={(e) => {
                    setHeight(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Target Weight:</label>
                <input
                  type="number"
                  className="border-2 border-[#388E3C] bg-white rounded-lg p-1"
                  value={tar_weight || ""}
                  onChange={(e) => {
                    setTarWeight(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col w-full lg:w-[200px]">
                <label className="text-[#388E3C]">Exercise Intensity:</label>
                <Select
                  value={ex_int}
                  onValueChange={(value) => {
                    console.log(value);
                    setIntensity(value);
                  }}
                >
                  <SelectTrigger className="border-2 border-[#388E3C] bg-white rounded-lg">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Options</SelectLabel>
                      <SelectItem value="1.15">Light</SelectItem>
                      <SelectItem value="1.35">Moderate</SelectItem>
                      <SelectItem value="1.85">Vigorous</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table and Weight Prediction Section */}
        <div className="flex flex-col lg:flex-row mx-5 mt-8 gap-6">
          <Card className="border-2 border-[#2E7D32] w-full lg:w-2/3 bg-[#E8F5E9] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#2E7D32]">Periodic Data</CardTitle>
            </CardHeader>
            <CardContent>
              {!isFormComplete ? (
                <div className="text-red-500 text-center lg:pt-28">
                  Please complete the User Information Form.
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-row mt-3">
                      <RadioGroup
                        defaultValue="Week"
                        value={time_int}
                        onValueChange={handleRadiobutton}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Week" id="Weekly" />
                          <Label htmlFor="Weeks" className="text-[#388E3C]">
                            Weekly
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Month" id="Monthly" />
                          <Label htmlFor="Months" className="text-[#388E3C]">
                            Monthly
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mt-3">
                      <label className="text-[#388E3C]">
                        No. of {time_int}s:
                      </label>
                      <input
                        type="number"
                        className="border-2 border-[#388E3C] bg-white rounded-lg ml-2 p-1"
                        value={no_time || ""}
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-auto mt-5 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-[#388E3C]">
                            {time_int} no.
                          </TableHead>
                          <TableHead className="text-[#388E3C]">
                            Calories Burned (kcal)
                          </TableHead>
                          <TableHead className="text-[#388E3C]">
                            Weight (kg)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              <input
                                type="number"
                                className="border-2 border-[#388E3C] bg-white rounded-lg"
                                value={row.cal_burn || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "cal_burn",
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <input
                                type="number"
                                className="border-2 border-[#388E3C] bg-white rounded-lg"
                                value={row.weight || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "weight",
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Weight Prediction Card */}
          <Card className="border-2 border-[#2E7D32] w-full lg:w-1/3 bg-[#E8F5E9] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#2E7D32]">Data Analysis</CardTitle>
              <CardDescription className="text-[#388E3C]">
                (Divided Difference Method)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="flex justify-between mt-5">
                {bmr !== null && amr !== null && (
                  <>
                    <div className="flex-1 text-center text-[#388E3C]">
                      <label className="font-semibold">Your BMR:</label>
                      <div>{bmr.toFixed(2)} kcal/day</div>
                    </div>

                    <div className="flex-1 text-center text-[#388E3C]">
                      <label className="font-semibold">Your AMR:</label>
                      <div>{amr.toFixed(2)} kcal/day</div>
                    </div>
                  </>
                )}
              </div>
              <Separator className="my-4" />
              <div className="mt-6">
                <label className="text-[#388E3C]">
                  Enter Burned Calories to predict weight:
                </label>
                <input
                  type="number"
                  className="border-2 border-[#388E3C] bg-white rounded-lg ml-2 p-1"
                  value={predict || ""}
                  onChange={(e) => {
                    setPredict(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center py-9">
                <label className="italic text-[#2E7D32]">
                  {predictedWeight
                    ? `${predictedWeight.toFixed(2)} kg`
                    : "Predicted weight here"}
                </label>
              </div>

              <div className="mt-4 text-center">
                {predictedWeight && weight && (
                  <div>
                    {predictedWeight > tar_weight ? (
                      <span className="text-red-500 font-bold">
                        Your predicted weight exceeds your target weight.
                        Consider increasing your exercise intensity or calorie
                        burn to meet your target.
                      </span>
                    ) : predictedWeight < tar_weight ? (
                      <span className="text-blue-500 font-bold">
                        Your predicted weight is below your target weight.
                        Adjust your activity level to align with your goals.
                      </span>
                    ) : parseFloat(predictedWeight) ===
                      parseFloat(tar_weight) ? (
                      <span className="text-green-500 font-bold">
                        You reached the target weight! Keep up the good work!
                      </span>
                    ) : (
                      <span className="text-green-500 font-bold">
                        You are on track to reach your target weight. Keep up
                        the good work!
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-11">
                <Button onClick={(e) => handlePredictChange(predict)}>
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <div className="pb-12">
          <Card className="mt-10 border-2 border-[#2E7D32] mx-5 bg-[#E8F5E9] shadow-lg">
            <CardHeader>
              <CardTitle className="text-[#2E7D32]">
                Your Weight Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                className={cx("h-80 w-full fill-[#4da851]")}
                data={chartdata}
                index="calorie"
                yAxisLabel="Weight (kg)"
                xAxisLabel="Burned Calories (kcal)"
                categories={["Weight"]}
                customTooltip={customTooltip}
                showLegend={false}
                onValueChange={(v) => console.log(v)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
