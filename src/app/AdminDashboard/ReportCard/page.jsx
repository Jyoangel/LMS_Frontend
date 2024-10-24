"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import ReportCardTable from "./ReportCardTable";
import { fetchCountData } from "../../../../api/api";
import { useUser } from '@auth0/nextjs-auth0/client';


export default function ReportCard() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
  const { user, error, isLoading } = useUser(); // Get user from Auth0
  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchCountData(user.sub);
        setTotalStudents(data.count); // Updated to use data.count
      } catch (error) {
        console.error("Failed to fetch courses data:", error);
      }
    }

    loadStudents();
  }, []);
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        {/* total no */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Report Card: {totalStudents}</h1>
          <div className="flex items-center justify-center gap-5">

            <Link href={"/AdminDashboard/ReportCard/SelectCard"}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* student teacher staff */}
        <div className="h-12 w-full border border-gray-300 flex flex-row gap-6 p-2 py-3 rounded-lg">
          <h1 className="text-blue-500 underline font-medium">Students</h1>

        </div>

        {/* table */}
        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full  flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1>Show</h1>
              <select className="h-6 w-12">
                <option>10</option>
              </select>
              <h1>Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1>Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row  items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <h1>Search</h1>
              </div>
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <ReportCardTable filter={filter} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}

{/*
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import ReportCardTable from "./ReportCardTable";
import TeacherTable from "./TeacherTable";
import StaffTable from "./StaffTable";

export default function ReportCard() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
       
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Report Card: 10</h1>
          <div className="flex items-center justify-center gap-5">
            <button className="text-base font-semibold text-blue-500 underline">
              import
            </button>
            <Link href={"/"}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Add New
              </button>
            </Link>
          </div>
        </div>

        
        <div className="h-12 w-full border border-gray-300 flex flex-row gap-6 p-2 py-3 rounded-lg">
          <h1 className="text-blue-500 underline font-medium">Students</h1>
          <h1 className="text-gray-500 underline font-medium">Teachers</h1>
          <h1 className="text-gray-500 underline font-medium">Staffs</h1>
        </div>

        
        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full  flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1>Show</h1>
              <select className="h-6 w-12">
                <option>10</option>
              </select>
              <h1>Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1>Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row  items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <h1>Search</h1>
              </div>
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {select === 1 && (
              <ReportCardTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 2 && (
              <TeacherTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 3 && (
              <StaffTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
  */}
