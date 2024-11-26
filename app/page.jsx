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
      <div className="my-8 mx-[650px]">
        <label className="font-bold text-center text-3xl">WEIGHT WISE</label>
      </div>
      {/* User Information Form */}
      <Card className="border-2 border-black mx-8 my-20">
        <CardContent className="flex flex-row gap-60 mx-40">
          <div className="pt-8 flex flex-col">
            <div className="flex flex-row gap-28">
              <label>Sex:</label>
              <input type="text" className="border-2 border-black" />
            </div>

            <div className="mt-3 flex flex-row gap-12">
              <label>Age in years:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="mt-3 flex flex-row gap-11">
              <label>Weight in Kg.:</label>
              <input type="number" className="border-2 border-black" />
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-row gap-14">
              <label>Height in cm:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="mt-3 flex flex-row gap-12">
              <label>Target Weight:</label>
              <input type="number" className="border-2 border-black" />
            </div>

            <div className="mt-3 flex flex-row gap-5">
              <label>Exercise Intensity:</label>
              <input type="text" className="border-2 border-black" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table and Weight Prediction Section */}
      <div className="flex flex-row mx-5">
        {/* Table Card */}
        <Card className="border-2 border-black mx-3 w-[900px]">
          <CardContent>
            <div className="mt-3">
              <label>No. of Weeks:</label>
              <input type="number" className="border-2 border-black ml-2" />
            </div>
            <div className="w-auto mt-5">
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
        <Card className="border-2 border-black w-[540px]">
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
      <Card className="mt-10 border-2 border-black mx-8">
        <CardHeader>
          <CardTitle>Your Weight Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart
            className="h-80"
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
