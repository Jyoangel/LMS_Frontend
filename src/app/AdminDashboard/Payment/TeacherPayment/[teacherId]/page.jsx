"use client";
import Successcard from "@/Components/Successcard";
import { useEffect, useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { addPaymentData } from "../../../../../../api/teacherapi"; // add api for teacher payment 
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function PaymentEdit({ teacherId, onClose }) {

  const [success, setSuccess] = useState(false);
  const [salaryPaid, setSalaryPaid] = useState('');
  const [month, setMonth] = useState('');
  const [remark, setRemark] = useState('');
  const [error, setError] = useState(null);

  const editRef = useRef();
  const { user, error: authError, isLoading: userLoading } = useUser();


  const openModal = () => {
    setSuccess(true);
  };

  const closeModal = () => {
    setSuccess(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleSend = async () => {
    // Basic validation
    if (!month || !salaryPaid) {
      alert("Teacher ID, month, and salary paid are required.");
      return;
    }

    if (isNaN(Number(salaryPaid)) || Number(salaryPaid) <= 0) {
      alert("Salary paid must be a positive number.");
      return;
    }

    const teacherPaymentData = {
      teacherId: teacherId,
      month,
      paidAmount: Number(salaryPaid),
      remark,
      userId: user.sub
    };

    try {
      // Call the API to add the payment data
      await addPaymentData(teacherPaymentData);
      openModal();
      setError(null);
      //alert("Payment data sent successfully.");
    } catch (err) {
      console.error("Failed to send payment data:", err);
      alert("Failed to send payment data. Please try again.");
    }
  };


  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div
          ref={editRef}
          className="h-[500px] w-[450px] border border-gray-300 bg-white rounded-lg p-5 flex flex-col gap-5"
        >
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-black text-sm font-semibold">Payment</h1>
            <button role="button" onClick={onClose}>
              <RxCrossCircled color="gray" size={20} />
            </button>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-black text-sm font-semibold ">Salary Paid</h1>
            <input
              type="text"
              placeholder="Type here"
              value={salaryPaid}
              onChange={(e) => setSalaryPaid(e.target.value)}
              className="h-10 w-full text-black border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-black text-sm font-semibold ">Month</h1>
            <input
              type="text"
              placeholder="Type here"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="h-10 w-full text-black border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-black text-sm font-semibold ">Remark</h1>
            <input
              type="text"
              placeholder="Type here"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className=" w-full text-black border border-gray-300 rounded-lg pb-20 p-2"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="h-12 w-full bg-blue-600 text-white font-bold text-xl rounded-md"
            onClick={handleSend}
          >
            Send
          </button>
          {success && (
            <Successcard
              para={"Payment send was successfully! "}
              onClose={onClose}
              url={"/AdminDashboard/Payment"}
            />
          )}
        </div>
      </div>
    </>
  );
}
