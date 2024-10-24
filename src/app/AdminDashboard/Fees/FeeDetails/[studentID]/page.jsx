"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../../Component/FeeNotice/[id]/FeeNotice";
import FeeSlip from "../../Component/FeeSlip"; // Import your FeeSlip component
import { fetchStudentByID, fetchFeeRecordByMonth } from "../../../../../../api/api";
import { format } from "date-fns";
import Successcard from '../../../../../Components/Successcard';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function FeeDetails({ params }) {
  const { studentID } = params;
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [feeSlipData, setFeeSlipData] = useState([]); // Store fee slips as an object by month
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedSlip, setSelectedSlip] = useState(null); // Store selected slip for modal

  useEffect(() => {
    if (studentID) {
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data

        try {
          const data = await fetchStudentByID(studentID);

          setStudentData(data);

          // Initialize an object to hold fee slips for each month
          const feeSlipsByMonth = {};

          await Promise.all(
            months.map(async (month) => {
              try {
                const feeData = await fetchFeeRecordByMonth(studentID, month);
                console.log(`Fee data for ${month}:`, feeData);
                console.log("fee data length", feeData.length);
                // Store fee data by month, ensuring arrays are initialized correctly
                feeSlipsByMonth[month] = feeData;
              } catch (error) {
                console.error(`Error fetching fee data for ${month}:`, error);
                feeSlipsByMonth[month] = []; // Ensure an empty array is set on error
              }
            })
          );
          setFeeSlipData(feeSlipsByMonth);

          // Update state with the structured data
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false); // Ensure loading is set to false after completion
        }
      };

      fetchData();
    }
  }, [studentID]);


  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  // const handleMonthClick = async (month) => {
  //   try {
  //     const feeData = await fetchFeeRecordByMonth(studentID, month);
  //     setFeeSlipData((prev) => ({ ...prev, [month]: feeData })); // Store fee data by month
  //   } catch (error) {
  //     console.error('Error fetching fee slip for the month:', error);
  //   }
  // };

  const openSlip = (slip) => {
    console.log('Selected Slip:', slip);
    setSelectedSlip(slip);
  };

  const closeSlip = () => {
    setSelectedSlip(null);
  };
  console.log("feeSlipDataaaa:", feeSlipData);
  console.log("months:", months);
  if (!feeSlipData) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        {/* buttons */}
        <div className="flex w-full justify-between items-center">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 data-testid="back-button" className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button
                data-testid="fee-notice-button"
                className="text-blue-400 text-lg font-medium underline"
                onClick={openNotice}
              >
                Fee Notice
              </button>
              {isNoticeOpen && (
                <FeeNotice
                  studentID={studentID}
                  onClose={closeNotice}
                />
              )}
            </div>
          </div>
        </div>

        {/* success message */}
        {success && (
          <div className="mt-5 w-full flex justify-center">
            <Successcard onClose={() => setSuccess(false)} para={"Fee notice sent successfully!"} />
          </div>
        )}

        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">
              {studentData?.name}
            </h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            {/* student details */}
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Student Id</h1>
                <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                <h1 className="text-gray-400 font-normal text-lg">Date of Birth</h1>
                <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 data-testid="student-id" className="text-black font-medium text-lg">
                  {studentData?.studentID}
                </h1>
                <h1 data-testid="student-name" className="text-black font-medium text-lg">
                  {studentData?.name}
                </h1>
                <h1 data-testid="student-class" className="text-black font-medium text-lg">
                  {studentData?.class}
                </h1>
                <h1 data-testid="student-dob" className="text-black font-medium text-lg">
                  {format(new Date(studentData?.dateOfBirth), "yyyy-MM-dd")}
                </h1>
                <h1 data-testid="student-gender" className="text-black font-medium text-lg">
                  {studentData?.gender}
                </h1>
              </div>
            </div>
            {/* additional details */}
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Aadhar Number</h1>
                <h1 className="text-gray-400 font-normal text-lg">Father Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Contact Number</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">{studentData?.aadharNumber}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.parent.fatherName}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.contactNumber}</h1>
              </div>
            </div>

            {/* Months table */}
            <div className="w-full flex flex-col mt-5">
              <h2 className="text-xl font-semibold mb-3">Fee Slips by Month</h2>
              {/* Existing Table for Viewing Fee Slips */}
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {months.map((month) => (
                      <th key={month} className="border border-gray-300 p-2 text-center">
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {months.map((month) => (
                      <>
                        {//console.log("feeSlipData", feeSlipData[month])
                          console.log("feeSlipDatalength", feeSlipData[month].length)}
                        {console.log("months", month)}

                        <td key={month} className="border border-gray-300 p-2 text-center">
                          {feeSlipData[month] && feeSlipData[month].length > 0 ? (
                            [...feeSlipData[month]].reverse().map((slip) => (
                              console.log("Slip", slip),

                              <div key={slip._id} className="mt-1">
                                <button
                                  className="text-blue-500 underline"
                                  onClick={() => openSlip(slip)}
                                >
                                  View Slip
                                </button>
                              </div>
                            ))
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </td>
                      </>))}

                  </tr >
                </tbody>
              </table>
            </div>



            {/* Fee Slip Modal */}
            {selectedSlip && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded-md w-1/2">
                  <FeeSlip
                    feeId={selectedSlip._id} // Pass the correct fee ID
                    onClose={closeSlip}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}





{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../../Component/FeeNotice/[id]/FeeNotice";
import FeeSlip from "../../Component/FeeSlip";
import { fetchStudentByID, fetchFeeRecordByMonth } from "../../../../../../api/api";
import { format } from "date-fns";
import Successcard from '../../../../../Components/Successcard';

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function FeeDetails({ params }) {
  const { studentID } = params;
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [feeSlipData, setFeeSlipData] = useState(null);

  useEffect(() => {
    if (studentID) {
      const fetchData = async () => {
        try {
          console.log(`Fetching student data for studentID: ${studentID}`);
          const data = await fetchStudentByID(studentID);
          console.log('Student data fetched:', data);
          setStudentData(data);
        } catch (error) {
          console.error('Error fetching student data:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [studentID]);

  const openNotice = () => {
    console.log('Opening fee notice');
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    console.log('Closing fee notice');
    setIsNoticeOpen(false);
  };

  const handleMonthClick = async (month) => {
    console.log(`Month clicked: ${month}`);
    try {
      const feeData = await fetchFeeRecordByMonth(studentID, month);
      console.log('Fee data fetched for month:', feeData);
      setFeeSlipData(feeData);
      setSelectedMonth(month);
    } catch (error) {
      console.error('Error fetching fee slip for the month:', error);
    }
  };

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        {/* buttons *
        <div className="flex w-full justify-between items-center">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 data-testid="back-button" className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button
                data-testid="fee-notice-button"
                className="text-blue-400 text-lg font-medium underline"
                onClick={openNotice}
              >
                Fee Notice
              </button>
              {isNoticeOpen && (
                <FeeNotice
                  studentID={studentID}
                  onClose={closeNotice}
                />
              )}
            </div>
          </div>
        </div>

        {/* success message *
        {success && (
          <div className="mt-5 w-full flex justify-center">
            <Successcard onClose={() => setSuccess(false)} para={"Fee notice sent successfully!"} />
          </div>
        )}


        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">
              {studentData?.name}
            </h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            {/* student details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Student Id</h1>
                <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                <h1 className="text-gray-400 font-normal text-lg">Date of Birth</h1>
                <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 data-testid="student-id" className="text-black font-medium text-lg">
                  {studentData?.studentID}
                </h1>
                <h1 data-testid="student-name" className="text-black font-medium text-lg">
                  {studentData?.name}
                </h1>
                <h1 data-testid="student-class" className="text-black font-medium text-lg">
                  {studentData?.class}
                </h1>
                <h1 data-testid="student-dob" className="text-black font-medium text-lg">
                  {format(new Date(studentData?.dateOfBirth), "yyyy-MM-dd")}
                </h1>
                <h1 data-testid="student-gender" className="text-black font-medium text-lg">
                  {studentData?.gender}
                </h1>
              </div>
            </div>
            {/* additional details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Aadhar Number</h1>
                <h1 className="text-gray-400 font-normal text-lg">Father Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Contact Number</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">{studentData?.aadharNumber}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.parent.fatherName}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.contactNumber}</h1>
              </div>
            </div>


            {/* Months table *

            <div className="w-full flex flex-col mt-5">
              <h2 className="text-xl font-semibold mb-3">Select Month for Fee Slip</h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {months.map((month, index) => (
                      <th
                        key={month}
                        className="border border-gray-300 p-2 cursor-pointer"
                        onClick={() => handleMonthClick(month)} // Set month index (1 for January, 12 for December)
                      >
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Fee slip modal *
            {feeSlipData && (
              <FeeSlip
                feeId={feeSlipData._id}
                onClose={() => setFeeSlipData(null)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}


{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../../Component/FeeNotice/[id]/FeeNotice";
import FeeSlip from "../../Component/FeeSlip"; // Import FeeSlip
import { fetchFeeRecordById } from "../../../../../../api/api";
import { format } from "date-fns";
import Successcard from "../../../../../Components/Successcard";

export default function FeeDetails({ params }) {
  const { studentID } = params;
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null); // To store the selected month for FeeSlip

  // Array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get selected month name
  const selectedMonthName = selectedMonth ? monthNames[selectedMonth - 1] : null;

  useEffect(() => {
    if (studentID) {
      const fetchData = async () => {
        try {
          const data = await fetchFeeRecordById(studentID);
          setStudentData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [studentID]);

  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex); // Set the selected month for FeeSlip component
  };

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  const feeData = studentData && studentData.feeMonth === selectedMonthName ? studentData : null;

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        {/* Header and Back Button *
        <div className="flex w-full justify-between items-center">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 data-testid="back-button" className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <button
              data-testid="fee-notice-button"
              className="text-blue-400 text-lg font-medium underline"
              onClick={openNotice}
            >
              Fee Notice
            </button>
            {isNoticeOpen && (
              <FeeNotice
                studentID={studentID}
                onClose={closeNotice}
              />
            )}
          </div>
        </div>

        {/* Success Message *
        {success && (
          <div className="mt-5 w-full flex justify-center">
            <Successcard onClose={() => setSuccess(false)} para={"Fee notice sent successfully!"} />
          </div>
        )}

        {/* Student Details Card *
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">
              {studentData?.studentID.name}
            </h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            <div className="grid grid-cols-5 gap-5">
              <h1 className="text-gray-400 font-normal text-lg">Student Id</h1>
              <h1 className="text-gray-400 font-normal text-lg">Name</h1>
              <h1 className="text-gray-400 font-normal text-lg">Class</h1>
              <h1 className="text-gray-400 font-normal text-lg">Date of Birth</h1>
              <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
            </div>
            <div className="grid grid-cols-5 gap-5">
              <h1 data-testid="student-id" className="text-black font-medium text-lg">
                {studentData?.studentID.studentID}
              </h1>
              <h1 data-testid="student-name" className="text-black font-medium text-lg">
                {studentData?.studentID.name}
              </h1>
              <h1 data-testid="student-class" className="text-black font-medium text-lg">
                {studentData?.studentID.class}
              </h1>
              <h1 data-testid="student-dob" className="text-black font-medium text-lg">
                {format(new Date(studentData?.studentID.dateOfBirth), "yyyy-MM-dd")}
              </h1>
              <h1 data-testid="student-gender" className="text-black font-medium text-lg">
                {studentData?.studentID.gender}
              </h1>
            </div>
          </div>
        </div>

        {/* Fee Slip Table *
        <div className="w-full flex flex-col mt-5">
          <h2 className="text-xl font-semibold mb-3">Select Month for Fee Slip</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {monthNames.map((month, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 p-2 cursor-pointer"
                    onClick={() => handleMonthClick(index + 1)} // Set month index (1 for January, 12 for December)
                  >
                    {month}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/* Display Fee Slip Modal *
        {console.log("Student Data: ", studentData)}
        {console.log("Selected Month: ", selectedMonth)}
        {console.log("Fees: ", studentData?.fees)}
        {selectedMonth !== null && (
          feeData ? (
            <FeeSlip
              feeId={feeData._id}
              onClose={() => setSelectedMonth(null)}
            />
          ) : (
            <div>No slip found for {selectedMonthName}</div>
          )
        )}
      </div>
    </>
  );
}


{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../../Component/FeeNotice/[id]/FeeNotice";
import { fetchFeeRecordById } from "../../../../../../api/api";
import { format } from "date-fns";
import Successcard from '../../../../../Components/Successcard';

export default function FeeDetails({ params }) {
  const { studentID } = params;
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (studentID) {
      const fetchData = async () => {
        try {
          const data = await fetchFeeRecordById(studentID);
          setStudentData(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [studentID]);

  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (error) {
    return <div data-testid="error">Error: {error}</div>;
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        {/* buttons *
        <div className="flex w-full justify-between items-center">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 data-testid="back-button" className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button
                data-testid="fee-notice-button"
                className="text-blue-400 text-lg font-medium underline"
                onClick={openNotice}
              >
                Fee Notice
              </button>
              {isNoticeOpen && (
                <FeeNotice
                  studentID={studentID}
                  onClose={closeNotice}
                />
              )}
            </div>
          </div>
        </div>

        {/* success message *
        {success && (
          <div className="mt-5 w-full flex justify-center">
            <Successcard onClose={() => setSuccess(false)} para={"Fee notice sent successfully!"} />
          </div>
        )}

        {/* student details *
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">
              {studentData?.studentID.name}
            </h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            {/* student details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Student Id</h1>
                <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                <h1 className="text-gray-400 font-normal text-lg">Date of Birth</h1>
                <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 data-testid="student-id" className="text-black font-medium text-lg">
                  {studentData?.studentID.studentID}
                </h1>
                <h1 data-testid="student-name" className="text-black font-medium text-lg">
                  {studentData?.studentID.name}
                </h1>
                <h1 data-testid="student-class" className="text-black font-medium text-lg">
                  {studentData?.studentID.class}
                </h1>
                <h1 data-testid="student-dob" className="text-black font-medium text-lg">
                  {format(new Date(studentData?.studentID.dateOfBirth), "yyyy-MM-dd")}
                </h1>
                <h1 data-testid="student-gender" className="text-black font-medium text-lg">
                  {studentData?.studentID.gender}
                </h1>
              </div>
            </div>

            {/* additional details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Aadhar Number</h1>
                <h1 className="text-gray-400 font-normal text-lg">Father Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Contact Number</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 data-testid="student-aadhar" className="text-black font-medium text-lg">
                  {studentData?.studentID.aadharNumber}
                </h1>
                <h1 data-testid="student-father-name" className="text-black font-medium text-lg">
                  {studentData?.studentID.parent.fatherName}
                </h1>
                <h1 data-testid="student-contact" className="text-black font-medium text-lg">
                  {studentData?.studentID.contactNumber}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../../Component/FeeNotice/[id]/FeeNotice";
import { fetchFeeRecordById } from "../../../../../../api/api";
import { format } from "date-fns";

export default function FeeDetails({ params }) {
  const { studentID } = params;
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching data for student ID:", studentID);
    if (studentID) {
      const fetchData = async () => {
        try {
          const data = await fetchFeeRecordById(studentID);
          console.log("Fetched data:", data);
          setStudentData(data);
        } catch (error) {
          console.error("Error fetching fee record:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [studentID]);

  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        {/* buttons *
        <div className="flex w-full justify-between items-center">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button
                className="text-blue-400 text-lg font-medium underline"
                onClick={openNotice}
              >
                Fee Notice
              </button>
              {isNoticeOpen && (
                <FeeNotice
                  studentID={studentID}
                  onClose={closeNotice}
                />
              )}
            </div>
          </div>
        </div>

        {/* student details *
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">{studentData?.studentID.name}</h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            {/* student details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Student Id</h1>
                <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                <h1 className="text-gray-400 font-normal text-lg">Date of Birth</h1>
                <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.studentID}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.name}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.class}</h1>
                <h1 className="text-black font-medium text-lg">{format(new Date(studentData?.studentID.dateOfBirth), "yyyy-MM-dd")}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.gender}</h1>
              </div>
            </div>

            {/* additional details *
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">Aadhar Number</h1>
                <h1 className="text-gray-400 font-normal text-lg">Father Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Contact Number</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.aadharNumber}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.parent.fatherName}</h1>
                <h1 className="text-black font-medium text-lg">{studentData?.studentID.contactNumber}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



{/*
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import FeeNotice from "../Component/FeeNotice";

export default function FeeDetails() {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  return (
    <>
      <div className="h-screen   w-full flex flex-col p-5 gap-10">
       
        <div className="flex w-full justify-between items-center ">
          <Link href={"/AdminDashboard/Fees"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button
                className="text-blue-400 text-lg font-medium underline"
                onClick={openNotice}
              >
                Fee Notice
              </button>{" "}
              {isNoticeOpen && <FeeNotice onClose={closeNotice} />}
            </div>
          </div>
        </div>

        
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">Abhinav Kumar</h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
           
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">
                  Student Id
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Date of Birth
                </h1>
                <h1 className="text-gray-400 font-normal text-lg  ">Gender</h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">59248</h1>
                <h1 className="text-black font-medium text-lg">
                  Abhinav Kumar
                </h1>
                <h1 className="text-black font-medium text-lg">8</h1>
                <h1 className="text-black font-medium text-lg">29-05-2024</h1>
                <h1 className="text-black font-medium text-lg  ">Male</h1>
              </div>
            </div>

            
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">
                  Aadhar Number
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Father Name
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Contact Number
                </h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">
                  8978565423156987
                </h1>
                <h1 className="text-black font-medium text-lg">Vivek Kumar</h1>
                <h1 className="text-black font-medium text-lg">9999999999</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
*/}
