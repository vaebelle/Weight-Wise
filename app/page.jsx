"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart } from "@tremor/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Description } from "@headlessui/react";

// Import the interpolation function
import { newtonMethod } from "./dividedDifference";
import { dividedDifference } from "./dividedDifference";
import { lagrangeInterpolation } from "./lagrange";

// Placeholder for chart only
const chartdata = [
  {
    date: "Jan 23",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 23",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 23",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  // Add other data as needed...
];

export default function MainPage() {
  const [sex, setSex] = useState();
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [tar_weight, setTarWeight] = useState();
  const [ex_int, setIntensity] = useState();
  const [time_int, setTimeInterval] = useState("Weeks");
  const [predict, setPredict] = useState();
  const [no_time, setTime] = useState(1);
  const [rows, setRows] = useState([]);
  const [predictedWeight, setPredictedWeight] = useState(null); // Store the predicted weight

  const handleRadiobutton = (value) => {
    setTimeInterval(value);
    console.log(value);
  };

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

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handlePredictChange = (value) => {
    setPredict(value);
    const calorie_burn = parseFloat(value);

    // Check if the value is a valid number
    if (!isNaN(calorie_burn) && calorie_burn > 0 && rows.length > 1) {
      // Use the Newton Interpolation function to calculate predicted weight
      const xValues = rows.map((row) => parseFloat(row.cal_burn)); // Calories Burned
      const yValues = rows.map((row) => parseFloat(row.weight)); // Weight (kg)

      const predictedValue = dividedDifference(xValues, yValues, calorie_burn);
      setPredictedWeight(predictedValue);
      console.log(xValues);
      console.log(yValues);
      console.log(predictedValue);
    } else {
      setPredictedWeight(null); // Clear the prediction if invalid input
    }
  };

  //console.log(rows);
  return (
    <>
      <div className="my-8 mx-auto text-center">
        <label className="font-bold text-3xl">WEIGHT WISE</label>
      </div>

      {/* User Information Form */}
      <Card className="border-2 border-black mx-5 sm:mx-2 mt-8">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="pt-3 flex flex-col lg:flex-row flex-wrap lg:gap-6 gap-4 justify-center">
            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Sex:</label>
              <Select
                value={sex}
                onValueChange={(value) => {
                  console.log(value);
                  setSex(value);
                }}
              >
                <SelectTrigger className="border-2 border-black ml-2 w-[80px] sm:w-auto h-[28px] rounded-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>select</SelectLabel>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Age in years:</label>
              <input
                type="number"
                className="border-2 border-black"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Weight in Kg.:</label>
              <input
                type="number"
                className="border-2 border-black"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Height in cm:</label>
              <input
                type="number"
                className="border-2 border-black"
                value={height}
                onChange={(e) => {
                  setHeight(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Target Weight:</label>
              <input
                type="number"
                className="border-2 border-black"
                value={tar_weight}
                onChange={(e) => {
                  setTarWeight(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Exercise Intensity:</label>
              <Select
                value={ex_int}
                onValueChange={(value) => {
                  console.log(value);
                  setIntensity(value);
                }}
              >
                <SelectTrigger className="border-2 border-black ml-2 w-[80px] sm:w-auto h-[28px] rounded-none">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>select</SelectLabel>
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
        {/* Table Card */}
        <Card className="border-2 border-black w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Periodic Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-row mt-3">
                <RadioGroup
                  defaultValue="Weeks"
                  value={time_int}
                  onValueChange={handleRadiobutton}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Weeks" id="Weekly" />
                    <Label htmlFor="Weeks">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Months" id="Monthly" />
                    <Label htmlFor="Months">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-3">
                <label>No. of {time_int}:</label>
                <input
                  type="number"
                  className="border-2 border-black ml-2 w-[80px] sm:w-auto"
                  value={no_time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
            <div className="w-auto mt-5 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">{time_int} No.</TableHead>
                    <TableHead>Calories Burned (kcal)</TableHead>
                    <TableHead>Weight (kg)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Dynamic Rows */}
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          className="border-2 border-black"
                          value={row.cal_burn}
                          onChange={(e) => {
                            handleInputChange(
                              index,
                              "cal_burn",
                              e.target.value
                            );
                            console.log(e.target.value);
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          type="number"
                          className="border-2 border-black"
                          value={row.weight}
                          onChange={(e) => {
                            handleInputChange(index, "weight", e.target.value);
                            console.log(e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Weight Prediction Card */}
        <Card className="border-2 border-black w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Data Analysis</CardTitle>
            <CardDescription>(Lagrange Method)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-3">
              <label>Enter Burned Calories to predict weight:</label>
              <input
                type="number"
                className="border-2 border-black ml-2 justify-center"
                value={predict}
                onChange={(e) => {
                  setPredict(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center py-9">
              <label className="italic text-gray-600">
                {predictedWeight
                  ? `${predictedWeight} kg`
                  : "Predicted weight here"}
              </label>
            </div>
            <div className="flex justify-center ">
              <Button onClick={(e) => handlePredictChange(predict)}>
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="mt-10 border-2 border-black mx-5">
        <CardHeader>
          <CardTitle>Your Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            className="h-80 w-full"
            data={chartdata}
            index="date"
            categories={["SolarPanels", "Inverters"]}
            valueFormatter={(number) =>
              `$${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
          />
        </CardContent>
      </Card>
    </>
  );
}
