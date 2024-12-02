"use client";
import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

//placeholder for chart only
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
  {
    date: "Apr 23",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 23",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 23",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 23",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 23",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 23",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 23",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 23",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 23",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

export default function MainPage() {
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
              <input type="text" className="border-2 border-black" />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Age in years:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Weight in Kg.:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Height in cm:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Target Weight:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="flex flex-col w-full lg:w-[200px]">
              <label>Exercise Intensity:</label>
              <input type="text" className="border-2 border-black" />
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
                <RadioGroup defaultValue="Weekly">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Weekly" id="Weekly" />
                    <Label htmlFor="Weekly">Weekly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Monthly" id="Monthly" />
                    <Label htmlFor="Monthly">Monthly</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="mt-3">
                <label>No. of Weeks:</label>
                <input
                  type="number"
                  className="border-2 border-black ml-2 w-[80px] sm:w-auto"
                />
              </div>
            </div>
            <div className="w-auto mt-5 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-auto">Week No.</TableHead>
                    <TableHead>Calories Burned</TableHead>
                    <TableHead>Weight</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Example Row */}
                  <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>500</TableCell>
                    <TableCell>70</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Weight Prediction Card */}
        <Card className="border-2 border-black w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Data Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mt-3">
              <label>Enter Week # to predict weight:</label>
              <input type="number" className="border-2 border-black ml-2" />
            </div>
            <div className="flex justify-center py-9">
              <label className="italic text-gray-600">
                Predicted weight here
              </label>
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
