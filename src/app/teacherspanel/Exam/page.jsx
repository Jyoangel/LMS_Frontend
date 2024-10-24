"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import ExamTable from "./ExamTable";
import { fetchExamData } from "../../../../api/examapi"; // api to fetch exam count 
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Exam() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCourses, setTotalCourses] = useState(0);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();



  // Check user role and retrieve userId
  useEffect(() => {
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email); // Use the imported function

        if (result.exists) {
          setUserId(result.userId); // Set userId from the response
        } else {
          setError("User not found or does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError("Failed to fetch user role.");
      }
    }

    getUserRole();
  }, [user]);
  // use to fetch  exam count 
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchExamData(userId);
        setTotalCourses(data.count); // Updated to use data.count
      } catch (error) {
        console.error("Failed to fetch courses data:", error);
      }
    }

    loadCourses();
  }, [userId]);
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        {/* total no */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Exam: {totalCourses}</h1>
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-row items-center justify-between gap-3 ">
              <h1>Filter</h1>
              <select className="h-10 w-24 rounded-lg border border-gray-300 outline-none">
                <option>Select</option>
              </select>
            </div>
            <Link href={"/teacherspanel/Exam/ExamDetails"}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Upload Question Paper
              </button>
            </Link>
          </div>
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
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center" aria-label="left">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center " aria-label="right">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <ExamTable filter={filter} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}
