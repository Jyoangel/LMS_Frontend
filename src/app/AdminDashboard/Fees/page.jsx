"use client";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import FeesTable from "./Component/FeesTable";
import { fetchFeeData } from "../../../../api/api";
import { fetchCountData } from "../../../../api/api"; // Import the fetchCountData function

export default function Fees() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalFeesCount, setTotalFeesCount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [totalStudentCount, setTotalStudentCount] = useState(0); // State to store student count
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTotalFees = async () => {
      try {
        // Fetch the fee data
        const feeData = await fetchFeeData();
        setTotalFeesCount(feeData.totalFeesCount);
        setTotalPaidAmount(feeData.totalPaidAmount);

        // Fetch the total student count
        const studentCountData = await fetchCountData();
        setTotalStudentCount(studentCountData.count); // Assuming totalStudents is the correct field

        setLoading(false);
      } catch (error) {
        //setError(error);
        setLoading(false);
      }
    };

    loadTotalFees();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">
              Total Students: {totalStudentCount} {/* Display total student count */}
            </h1>
            <h1 className="text-gray-500 text-sm">
              Collect Amount:{" "}
              <span className="text-blue-500 text-lg font-semibold">
                ₹{totalPaidAmount.toLocaleString()}
              </span>
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select
              className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select</option>
              <option value="8">Class 8</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>

        <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
          <div className="h-20 w-full flex flex-row items-center justify-between px-5">
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
              <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none w-full"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <FeesTable filter={filter} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}
