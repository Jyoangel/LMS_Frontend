"use client";
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineMail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "./logo.png";
import { fetchFeeRecordById } from "../../../../../api/api"; // api to fetch fee 
import { format } from "date-fns";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function FeeSlip({ onClose, feeId }) {
  const [feeDetails, setFeeDetails] = useState(null);
  const { user, isLoading } = useUser();

  // use to fetch fee data 
  useEffect(() => {
    if (feeId) {
      const fetchDetails = async () => {
        try {
          const feeResponse = await fetchFeeRecordById(feeId);
          setFeeDetails(feeResponse);
        } catch (error) {
          console.error("Error fetching fee record:", error);
        }
      };
      fetchDetails();
    }
  }, [feeId]);

  const noticeRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (noticeRef.current && !noticeRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  if (!feeDetails) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div
          ref={noticeRef}
          className="h-[750px] w-[700px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
        >
          <div className="flex flex-row items-center justify-between " data-testid="feeslip-outside-area">
            <h1 className="text-black text-sm font-semibold">Fees Slip</h1>
            <button role="button" onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5  pb-5" data-testid="feeslip-notice-area">
            {/* <Image src={logo} alt="img" className="h-[80px] w-[80px]" /> */}
            {/* Display user picture and name if authenticated */}
            {!isLoading && user && (

              <Image
                src={user.picture} // User profile picture
                alt={user.name} // User name
                className="h-[50px] w-[50px] rounded-full"
                width={50} // Set width to avoid layout shift
                height={50} // Set height to avoid layout shift
              />


            )}
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-black text-lg font-semibold uppercase">
                  {user.name}
                </h1>
                <p className=" text-gray-400 font-semibold">
                  Barauli, Gopal Ganj, (Bihar){" "}
                </p>
                <p className="text-sm text-black font-semibold">
                  Registration No- {feeDetails.studentID?.admissionNumber}
                </p>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <LuPhone size={20} color="gray" />
                  <h1 className="text-sm text-black font-semibold">
                    {feeDetails.number}
                  </h1>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <MdOutlineMail size={20} color="gray" />
                  <h1 className="text-sm text-black font-semibold">
                    {feeDetails.schoolEmail}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-[30px] w-full bg-gray-300 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Fee Receipt</h1>
              <h1 className="text-sm text-black font-semibold">
                Session: {feeDetails.studentID?.session}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-gray-200 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Receipt No:{feeDetails.receiptNo}
              </h1>
              <h1 className="text-sm text-black font-semibold">Ref No:{feeDetails.referenceNo}</h1>
              <h1 className="text-sm text-black font-semibold">
                Date: {format(new Date(feeDetails.date), "yyyy-MM-dd")}{" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                REG. No: {feeDetails.studentID?.admissionNumber}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                SR No: {feeDetails.srNo}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                Class : {feeDetails.studentID?.class}{" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Name: {feeDetails.studentID?.name}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                DOB:{format(new Date(feeDetails.studentID?.dateOfBirth), "yyyy-MM-dd")}{" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Father Name: {feeDetails.studentID?.parent?.fatherName}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Address: {feeDetails.studentID?.address}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Fee Month: {feeDetails.feeMonth}
              </h1>
            </div>
          </div>
          <div className="flex flex-col border-b border-gray-500">
            <div className="h-[30px] w-full bg-gray-300 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Fee Type</h1>
              <h1 className="text-sm text-black font-semibold">Fee Amount</h1>
            </div>

            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Monthly Fee</h1>
              <h1 className="text-sm text-black font-semibold">
                Rs {feeDetails.studentID?.monthlyFee}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Extra Fee</h1>
              <h1 className="text-sm text-black font-semibold">
                Rs {feeDetails.extraFee}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold"> Fee Paid</h1>
              <h1 className="text-sm text-black font-semibold">
                Rs {feeDetails.feePaid}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Other Fee</h1>
              <h1 className="text-sm text-black font-semibold">
                Rs {feeDetails.otherFee}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-gray-200 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Total :  Rs {feeDetails.total}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                Dues:  Rs {feeDetails.dueAmount}{" "}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                Total:  Rs {feeDetails.total}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Paid :  Rs {feeDetails.paidAmount}
              </h1>
              <h1 className="text-sm text-black font-semibold">
                Balance:  Rs {feeDetails.totalDues}
              </h1>
            </div>

            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black  font-semibold">
                Amount in word  Rs ({feeDetails.amountInWords})
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black  font-semibold">
                Payment Mode: {feeDetails.paymentMode} Reference No: {feeDetails.referenceNo}, Bank Name: {feeDetails.bankName}, Remark: {feeDetails.remark}
              </h1>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between px-5">
            <h1 className="text-red-500 text-sm font-semibold">Student Copy</h1>
            <h1 className="text-black text-sm font-semibold">
              Print: {new Date(feeDetails.printDate).toLocaleString()}
            </h1>
            <h1 className="text-black text-sm font-semibold">
              Receipt By: {feeDetails.receiptBy}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}


{/*
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineMail } from "react-icons/md";

import { LuPhone } from "react-icons/lu";

import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "./logo.png";
import Successcard from "@/Components/Successcard";

export default function FeeSlip({ onClose }) {
  const [success, setSuccess] = useState(false);
  const noticeRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (noticeRef.current && !noticeRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div
          ref={noticeRef}
          className="h-[750px] w-[700px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
        >
          <div className="flex flex-row items-center justify-between ">
            <h1 className="text-black text-sm font-semibold">Fees Slip</h1>
            <button onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5  pb-5">
            <Image src={logo} className="h-[80px] w-[80px]" />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h1 className="text-black text-lg font-semibold uppercase">
                  Gyan Ganga Public School
                </h1>
                <p className=" text-gray-400 font-semibold">
                  Piprahyan Road Bhagwatipur, Barauli, Gopal Ganj, (Bihar){" "}
                </p>
                <p className="text-sm text-black font-semibold">
                  Registration No- 217122620211218101625 U-Dise- 101520430
                </p>
              </div>
              <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <LuPhone size={20} color="gray" />
                  <h1 className="text-sm text-black font-semibold">
                    9999999999
                  </h1>
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                  <MdOutlineMail size={20} color="gray" />
                  <h1 className="text-sm text-black font-semibold">
                    Example@gmail.com
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="h-[30px] w-full bg-gray-300 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Fee Receipt</h1>
              <h1 className="text-sm text-black font-semibold">
                Session: 2023 - 24
              </h1>
            </div>
            <div className="h-[30px] w-full bg-gray-200 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Receipt No: 4247
              </h1>
              <h1 className="text-sm text-black font-semibold">Ref No:</h1>
              <h1 className="text-sm text-black font-semibold">
                Date: 7-feb-24{" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">REG. No: 362</h1>
              <h1 className="text-sm text-black font-semibold">SR No: 0</h1>
              <h1 className="text-sm text-black font-semibold">
                Class : 6 (A){" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Name: SAMIR ALAM
              </h1>
              <h1 className="text-sm text-black font-semibold">
                DOB: 10-Oct-2010{" "}
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Father Name: AMIR ALAM
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Address: PIRAHIYAN, GOPALGANJ
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">
                Fee Month: Dec, Jan
              </h1>
            </div>
          </div>
          <div className="flex flex-col border-b border-gray-500">
            <div className="h-[30px] w-full bg-gray-300 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Fee Type</h1>
              <h1 className="text-sm text-black font-semibold">Fee Amount</h1>
            </div>

            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Monthly Fee</h1>
              <h1 className="text-sm text-black font-semibold">1,400 </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Festive Fee</h1>
              <h1 className="text-sm text-black font-semibold">100 </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Other Fee</h1>
            </div>
            <div className="h-[30px] w-full bg-gray-200 flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Total : 1500</h1>
              <h1 className="text-sm text-black font-semibold">Dues: 0 </h1>
              <h1 className="text-sm text-black font-semibold">Total:1500</h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black font-semibold">Paid : 1500</h1>
              <h1 className="text-sm text-black font-semibold">Balance:0</h1>
            </div>

            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black  font-semibold">
                Amount in word ( One Thousand Five Hundred Rupess Only)
              </h1>
            </div>
            <div className="h-[30px] w-full bg-white flex flex-row items-center justify-between px-5">
              <h1 className="text-sm text-black  font-semibold">
                Payment Mode: CASH Reference No:, Bank Name:, Remark: AMIR ALI
              </h1>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between px-5">
            <h1 className="text-red-500 text-sm font-semibold">Student Copy</h1>
            <h1 className="text-black text-sm font-semibold">
              Print-07-feb24 4:19:01 PM
            </h1>
            <h1 className="text-black text-sm font-semibold">
              Receipt By: BITTU KUMAR
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
*/}