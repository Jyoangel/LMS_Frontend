"use client";

import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import Timetable from "./Timetable";

export default function ClassSchedule() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        {/* total no */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Class TimeTable</h1>
        </div>

        {/* table */}
        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full  flex flex-row items-center justify-between px-5">
            <h1>June</h1>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-1">

                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>

                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Timetable filter={filter} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}
