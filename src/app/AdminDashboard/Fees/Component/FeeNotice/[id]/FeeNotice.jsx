"use client"

import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import Successcard from "@/Components/Successcard";
import logo from "../../../Component/logo.png";
import { sendFeeNotice } from "../../../../../../../api/api"; // Adjust the path based on your project structure
import { fetchAdminUser } from "../../../../../../../api/adminUser";
export default function FeeNotice({ studentID, onClose }) {
  const [message, setMessage] = useState('');
  const [remark, setRemark] = useState('');
  const [dueAmount, setDueAmount] = useState('');
  const [months, setMonths] = useState('');
  const [adminUsers, setAdminUsers] = useState([]); // State for admin users
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const noticeRef = useRef();

  // Fetch admin users in a separate useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminUsers = await fetchAdminUser();
        console.log(adminUsers); // Fetch admin users
        setAdminUsers(adminUsers); // Store fetched admin users
      } catch (error) {
        console.error('Error fetching admin users:', error);
      }
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array means it runs only once when the component mounts
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

  const handleSendNotice = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const noticeData = {
      message,
      remark,
      dueAmount,
      months,
    };

    try {
      await sendFeeNotice(studentID, noticeData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div
          ref={noticeRef}
          className="h-[600px] w-[500px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
        >
          <div className="flex flex-row items-center justify-between ">
            <h1 className="text-black text-sm font-semibold">Fees Notice</h1>
            <button role="button" onClick={onClose} className="cursor-pointer">
              <RxCrossCircled size={20} color="gray" />
            </button>
          </div>
          <div className="flex flex-row gap-5 border-b border-gray-500 pb-5">
            <Image src={adminUsers[0]?.picture} alt="Logo" className="h-[50px] w-[50px] rounded-full"
              width={70} // Set width to avoid layout shift
              height={70} />
            <div className="flex flex-col gap-1">
              <h1 className="text-black text-lg font-semibold uppercase">
                {adminUsers[0]?.name}
              </h1>
              <p className="text-gray-400 uppercase text-sm leading-5 tracking-wider">
                barauli gopalganj [ Bihar ]
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSendNotice}
            className="flex flex-col items-center justify-center w-full gap-3"
          >
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-col">
                <label htmlFor="message" className="text-gray-700 font-medium">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Type here"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="remark" className="text-gray-700 font-medium">Remark</label>
                <input
                  id="remark"
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Type here"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="dueAmount" className="text-gray-700 font-medium">Total Dues Fees Amount</label>
                <input
                  id="dueAmount"
                  type="number"
                  value={dueAmount}
                  onChange={(e) => setDueAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Type here"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="months" className="text-gray-700 font-medium">Months</label>
                <input
                  id="months"
                  type="text"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                  placeholder="Type here"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="h-12 w-full bg-blue-600 text-white font-bold text-xl rounded-md"
            >
              Send
            </button>
          </form>
          {success && (
            <div className="mt-5 w-full flex justify-center">
              <Successcard onClose={onClose} para={"Fee notice sent successfully!"} />
            </div>
          )}
          {error && (
            <div className="mt-5 w-full flex justify-center text-red-500">
              {error}
            </div>
          )}
        </div>
      </div>
    </>
  );
}



{/*
import Successcard from "@/Components/Successcard";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import logo from "../../../Component/logo.png";

export default function FeeNotice({ onClose }) {
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
          className="h-[700px] w-[500px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
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

          <form action="#" className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1>Message</h1>
              <input
                type="text"
                placeholder="Type here"
                className=" w-full border border-gray-300 rounded-lg text-start p-3 outline-none pb-20"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h1>Remark </h1>
                <input
                  type="text"
                  placeholder="Type here"
                  className=" w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Total Dues Fees Amount </h1>
                <input
                  type="text"
                  placeholder="Type here"
                  className=" w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Months</h1>
                <input
                  type="text"
                  placeholder="Type here"
                  className=" w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
              <button
                className="h-12 w-full bg-blue-600 text-white font-bold text-xl rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  setSuccess(true);
                }}
              >
                Send
              </button>
              {success && (
                <Successcard para={"Fee notice send successfully!"} />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
*/}
