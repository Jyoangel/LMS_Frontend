"use client";

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import PaymentTable from "./PaymentTable";
import StaffPaymentTable from "./StaffTable";
import { fetchPaymentTeacherData } from "../../../../api/teacherapi"
import { fetchPaymentStaffData } from "../../../../api/staffapi"
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function Payment() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const { user, error: authError, isLoading: userLoading } = useUser();

  const handleSelect = async (value) => {
    setSelect(value);
  };
  // use to fetch payements and total Amount paid 
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (select === 1) {
          const data = await fetchPaymentTeacherData(user.sub);
          setTotalPayments(data.totalPayments);
          setTotalAmountPaid(data.totalAmountPaid);
        } else if (select === 2) {
          const data = await fetchPaymentStaffData(user.sub);
          setTotalPayments(data.totalPayments);
          setTotalAmountPaid(data.totalAmountPaid);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [select]);

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">
              Total Payments: {totalPayments}
            </h1>
            <h1 className="text-gray-500 text-sm">
              Amount:{" "}
              <span className="text-blue-500 text-lg font-semibold">
                ₹{totalAmountPaid.toLocaleString("en-IN")}
              </span>
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="h-12 w-full border border-gray-300 flex flex-row gap-6 p-2 py-3 rounded-lg">
          <button
            onClick={() => {
              handleSelect(1);
            }}
            className={`${select === 1
              ? "text-blue-500 underline"
              : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => {
              handleSelect(2);
            }}
            className={`${select === 2
              ? "text-blue-500 underline"
              : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Staffs
          </button>
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
              <PaymentTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 2 && (
              <StaffPaymentTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

{/*}
import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { SlRefresh } from "react-icons/sl";
import PaymentTable from "./PaymentTable";

export default function Payment() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [select, setSelect] = useState(1);

  const handleSelect = (value) => {
    setSelect(select === value ? 1 : value);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <div className="flex flex-row gap-6">
            <h1 className="text-black text-lg font-medium">
              Total Students:10
            </h1>
            <h1 className="text-gray-500 text-sm">
              Amount:{" "}
              <span className="text-blue-500 text-lg font-semibold">
                ₹1,00,000
              </span>
            </h1>
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="h-12 w-full border border-gray-300 flex flex-row gap-6 p-2 py-3 rounded-lg">
          <button
            onClick={() => {
              handleSelect(1);
            }}
            className={`${
              select === 1
                ? "text-blue-500 underline"
                : "text-gray-500 underline"
            }  font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => {
              handleSelect(2);
            }}
            className={`${
              select === 2
                ? "text-blue-500 underline"
                : "text-gray-500 underline"
            }  font-medium underline-offset-4`}
          >
            Staffs
          </button>
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
              <PaymentTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
*/}