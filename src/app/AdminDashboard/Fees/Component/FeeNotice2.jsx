"use client";

import React, { useState, useEffect, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "./logo.png";
import { fetchFeeRecordById } from "../../../../../api/api";
import { format } from "date-fns"; // fetch api fee using id 

export default function FeeNotice2({ onClose, feeId }) {
  const [success, setSuccess] = useState(false);
  const [feeRecord, setFeeRecord] = useState(null);
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
  // use to fetch fee 
  useEffect(() => {
    const loadFeeRecord = async () => {
      try {
        const record = await fetchFeeRecordById(feeId);
        setFeeRecord(record);
      } catch (error) {
        console.error("Failed to fetch fee record", error);
      }
    };

    if (feeId) {
      loadFeeRecord();
    }
  }, [feeId]);

  if (!feeRecord) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50"
        data-testid="outside-area"
      >
        <div
          ref={noticeRef}
          className="h-[400px] w-[500px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
          data-testid="notice-area"
        >
          <div className="flex flex-row items-center justify-between ">
            <h1 className="text-black text-sm font-semibold">Fees Notice</h1>
            <button role="button" onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5 border-b border-gray-500 pb-5">
            <Image src={logo} alt="School Logo" />
            <div className="flex flex-col gap-1">
              <h1 className="text-black text-lg font-semibold uppercase" data-testid="school-name">
                Gyan Ganga Public School
              </h1>
              <p className="text-gray-400 uppercase text-sm leading-5 tracking-wider">
                piprahiyan road bhagwati pur barauli gopalganj [ Bihar ] u-dise-
                10151204303 affilation no 217122620211218101625
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-sm text-gray-500 font-semibold ">
              It Is To Inform You That Your Ward{" "}
              <span className="text-black" data-testid="student-name"> {feeRecord.studentID.name} </span> So/{" "}
              {feeRecord.studentID.parent.fatherName} Class-{" "}
              <span className="text-black" data-testid="student-class"> {feeRecord.studentID.class}</span> Student ID-{" "}
              <span className="text-black">{feeRecord.studentID.studentID}</span> , Sr No-{" "}
              {feeRecord.srNo} Contact-
              <span className="text-black">{feeRecord.studentID.contactNumber}</span> Fee is Due Deposit
              The Fee At Fee Counter As Soon As Possible
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              <span className="text-black" data-testid="student-date">Remark</span>: School Fee Deposit
              Will Be {format(new Date(), "yyyy-MM-dd")}.
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Total dues fee: <span className="text-black" data-testid="student-fees">Rs {feeRecord.dueAmount}</span>{" "}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Months:{" "}
              <span className="text-black text-md font-medium" data-testid="months">
                {feeRecord.dueMonths.join(", ")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

{/*
import React, { useState, useEffect, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "./logo.png";
import { fetchFeeRecordById } from "../../../../../api/api";
import { format } from "date-fns";

export default function FeeNotice2({ onClose, feeId }) {
  const [success, setSuccess] = useState(false);
  const [feeRecord, setFeeRecord] = useState(null);
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

  useEffect(() => {
    const loadFeeRecord = async () => {
      try {
        const record = await fetchFeeRecordById(feeId);
        setFeeRecord(record);
      } catch (error) {
        console.error("Failed to fetch fee record", error);
      }
    };

    if (feeId) {
      loadFeeRecord();
    }
  }, [feeId]);

  if (!feeRecord) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50" data-testid="outside-area">
        <div
          ref={noticeRef}
          className="h-[400px] w-[500px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
          data-testid="notice-area"
        >
          <div className="flex flex-row items-center justify-between "  >
            <h1 className="text-black text-sm font-semibold">Fees Notice</h1>
            <button role="button" onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5 border-b border-gray-500 pb-5" >
            <Image src={logo} />
            <div className="flex flex-col gap-1">
              <h1 className="text-black text-lg font-semibold uppercase">
                Gyan Ganga Public School
              </h1>
              <p className="text-gray-400 uppercase text-sm leading-5 tracking-wider">
                piprahiyan road bhagwati pur barauli gopalganj [ Bihar ] u-dise-
                10151204303 affilation no 217122620211218101625
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-sm text-gray-500 font-semibold ">
              It Is To Inform You That Your Ward{" "}
              <span className="text-black"> {feeRecord.studentID.name} </span> So/{" "}
              {feeRecord.studentID.parent.fatherName} Class-{" "}
              <span className="text-black"> {feeRecord.studentID.class}</span> Student ID-{" "}
              <span className="text-black">{feeRecord.studentID.studentID}</span> , Sr No-{" "}
              {feeRecord.srNo} Contact-
              <span className="text-black">{feeRecord.studentID.contactNumber}</span> Fee is Due Deposit
              The Fee At Fee Counter As Soon As Possible
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              <span className="text-black">Remark</span>: School Fee Deposit
              Will Be {format(new Date(), "yyyy-MM-dd")}.
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Total dues fee: <span className="text-black">Rs {feeRecord.dueAmount}</span>{" "}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Months:{" "}
              <span className="text-black text-md font-medium">
                Mar,April
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

{/*
import React, { useState, useEffect, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "./logo.png";
import Successcard from "@/Components/Successcard";

export default function FeeNotice2({ onClose }) {
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
          className="h-[400px] w-[500px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
        >
          <div className="flex flex-row items-center justify-between ">
            <h1 className="text-black text-sm font-semibold">Fees Notice</h1>
            <button onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5 border-b border-gray-500 pb-5">
            <Image src={logo} />
            <div className="flex flex-col gap-1">
              <h1 className="text-black text-lg font-semibold uppercase">
                Gyan Ganga Public School
              </h1>
              <p className="text-gray-400 uppercase text-sm leading-5 tracking-wider">
                piprahiyan road bhagwati pur barauli gopalganj [ Bihar ] u-dise-
                10151204303 affilation no 217122620211218101625
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="text-sm text-gray-500 font-semibold ">
              It Is To Inform You That Your Ward{" "}
              <span className="text-black"> Samir Alam </span> So/ Amir Alam
              Class- <span className="text-black"> 6 (A)</span> Reg No-{" "}
              <span className="text-black">326</span> , Sr No- 0 Contact-
              <span className="text-black">9999999999</span> Fee is Due Deposit
              The Fee At Fee Counter As Soon As Possible
            </h1>
            <p className="text-gray-500 text-sm font-semibold">
              <span className="text-black">Remark</span>: School Fee Deposit
              Will Be 29-05-24.
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Total dues fee: <span className="text-black">Rs 2,200</span>{" "}
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              Months:{" "}
              <span className="text-black text-md font-medium">
                Jan, Feb, March
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
  */}
