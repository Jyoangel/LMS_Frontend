"use client";

import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData } from "../../../../../api/api"; // fetch student data api 
import { fetchFeeRecordByStudentID } from "../../../../../api/api"; // fetch api fee by studentID 
import { format } from "date-fns";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function FeeTable({ filter, searchTerm }) {
  const [data, setData] = useState({ students: [] });
  const [feeData, setFeeData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Get the authenticated user details from Auth0
  const { user, error: authError, isLoading: userLoading } = useUser();


  // use to fetch fee Record data by studentID
  const loadFeeData = async (studentId) => {
    try {
      const feeDetails = await fetchFeeRecordByStudentID(studentId);
      return {
        totalDueAmount: feeDetails.totalDueAmount || 0,
        recentPaidAmount: feeDetails.recentPaidAmount || 0,
      };
    } catch (error) {
      console.error(`Error fetching fee record for student ${studentId}:`, error);
      return { totalDueAmount: 0, recentPaidAmount: 0 };
    }
  };

  // use to fetch student data 
  const loadItems = async () => {
    try {
      const studentData = await fetchStudentData(user.sub);
      setData(studentData);

      // Fetch fee data for each student
      const feeDetails = await Promise.all(
        studentData.students.map(async (student) => {
          const feeDetail = await loadFeeData(student._id);
          return { studentId: student._id, ...feeDetail };
        })
      );

      // Create an object for easy access by studentId
      const feeDataMap = feeDetails.reduce((acc, feeDetail) => {
        acc[feeDetail.studentId] = feeDetail;
        return acc;
      }, {});

      setFeeData(feeDataMap);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading && !authError) {
      loadItems(); // Load data only when user is authenticated
    }
  }, [user, userLoading, authError]); // Trigger loadItems when user is available

  if (userLoading) return <div>Loading...</div>; // Show loading indicator while fetching user details
  if (authError) return <div>{authError.message}</div>; // Handle authentication error


  const filteredData = data.students.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-3 text-left">Sr. No</th>
              <th className="py-4 px-3 text-left">Student Id</th>
              <th className="py-4 px-3 text-left">Name</th>
              <th className="py-4 px-3 text-left">Class</th>
              <th className="py-4 px-3 text-left">DOB</th>
              <th className="py-4 px-3 text-left">Gender</th>
              <th className="py-4 px-3 text-left">Total Fee</th>
              <th className="py-4 px-3 text-left">Father Name</th>
              <th className="py-4 px-3 text-left">Contact Number</th>
              <th className="py-4 px-3 text-left">Fees</th>
              <th className="py-4 px-3 text-left">Action</th>
              <th className="py-4 px-3 text-left">Total Due Amount</th>
              <th className="py-4 px-3 text-left">Recent Paid Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each student item. */}
            {filteredData.map((item, index) => {
              const feeDetail = feeData[item._id] || {};

              return (
                <tr
                  key={index}
                  className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                >
                  <td className="py-4 px-3 text-left">{index + 1}</td>
                  <td className="py-4 px-3 text-left">{item.studentID}</td>
                  <td className="py-4 px-3 text-left">{item.name}</td>
                  <td className="py-4 px-3 text-left">{item.class}</td>
                  <td className="py-4 px-3 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                  <td className="py-4 px-3 text-left">{item.gender}</td>
                  <td className="py-4 px-3 text-left">{item.totalFee}</td>
                  <td className="py-4 px-3 text-left">{item.parent.fatherName}</td>
                  <td className="py-4 px-3 text-left">{item.contactNumber}</td>
                  <td className="py-4 px-3 text-left ">
                    <button className="text-blue-600">
                      <Link href={`/AdminDashboard/Fees/FeeDetails/${item._id}`}>
                        View Fee Slip
                      </Link>
                    </button>
                  </td>
                  {/* Actions */}
                  <td className="py-4 px-3 text-left ">
                    <button className="text-blue-600">
                      <Link href={`/AdminDashboard/Fees/Component/AddFees/${item._id}`}>
                        Add Fees |
                      </Link>
                    </button>
                    <button className="text-green-600">
                      <Link href={`/AdminDashboard/Fees/Component/EditFees/${item._id}`}>
                        Edit Fees
                      </Link>
                    </button>
                  </td>
                  {/* Total Due Amount and Recent Paid Amount  is fetcht by fee record */}
                  <td className="py-4 px-2 text-left">
                    {feeDetail.totalDueAmount}
                  </td>
                  <td className="py-4 px-2 text-left">
                    {feeDetail.recentPaidAmount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


    </>
  );
}
{/*
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData, fetchFeeData } from "../../../../../api/api";
import { format } from "date-fns";

export default function UserManagementTable({ filter, searchTerm }) {
  const [data, setData] = useState({ students: [] });
  const [feeData, setFeeData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const openDelete = (id) => {
    setStudentToDelete(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setStudentToDelete(null);
    setDelete(false);
  };

  const handleDelete = async () => {
    try {
      await deleteStudentData(studentToDelete);
      loadItems();
      closeDelete();
    } catch (error) {
      console.error("Failed to delete student data:", error);
    }
  };

  const loadItems = async () => {
    try {
      const studentData = await fetchStudentData();
      setData(studentData);

      // Fetch fee data
      const feeDataResponse = await fetchFeeData();
      console.log("Fetched Fee Data:", feeDataResponse);

      // Extract 'fees' array from the response and set it as feeData
      setFeeData(Array.isArray(feeDataResponse.fees) ? feeDataResponse.fees : []);  // Extract fees array
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    loadItems();
  }, []);

  console.log("Fee Data in state:", feeData);

  const filteredData = data.students.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Id</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Gender</th>
              <th className="py-4 px-6 text-left">Aadhar No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Contact Number</th>
              <th className="py-4 px-6 text-left">Fees</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => {
              const feeRecord = feeData.find(fee => fee.studentID._id.toString() === item._id.toString());



              console.log(feeRecord);
              return (
                <tr
                  key={index}
                  className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                >
                  <td className="py-4 px-6 text-left">{index + 1}</td>
                  <td className="py-4 px-6 text-left">{item.studentID}</td>
                  <td className="py-4 px-6 text-left text-blue-600 underline">
                    <Link href={`/AdminDashboard/Fees/FeeDetails/${item._id}`}>
                      {item.name}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-left">{item.class}</td>
                  <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                  <td className="py-4 px-6 text-left">{item.gender}</td>
                  <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                  <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                  <td className="py-4 px-6 text-left">{item.contactNumber}</td>

                  {/* Display fee details *
                  <td className="py-4 px-6 text-left">
                    {feeRecord ? (
                      <Link href={`/AdminDashboard/Fees/FeeDetails/${feeRecord._id}`} className="text-blue-600 underline">
                        View Fee Details
                      </Link>
                    ) : (
                      <span>No Fees</span>
                    )}
                  </td>

                  {/* Actions *
                  <td className="py-4 px-6 text-left flex gap-2">
                    <button className="text-blue-600">
                      <Link href={`/AdminDashboard/Fees/Component/AddFees/${item._id}`}>
                        Add Fees
                      </Link>
                    </button>

                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {isDelete && (
        <ConfirmationCard
          para={"Do you really want to delete this record?"}
          onConfirm={handleDelete}
          onClose={closeDelete}
        />
      )}
    </>
  );
}






{/*
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FeeNotice2 from "./FeeNotice2";
import FeeSlip from "../Component/FeeSlip";
import { fetchFeeData } from "../../../../../api/api";
import { format } from "date-fns";

export default function FeesTable({ filter, searchTerm }) {
  const [feesData, setFeesData] = useState([]);
  const [totalFeesCount, setTotalFeesCount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [selectedFeeId, setSelectedFeeId] = useState(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openSlip = (feeId) => {
    setSelectedFeeId(feeId);
    setIsSlipOpen(true);
  };

  const closeSlip = () => {
    setIsSlipOpen(false);
  };

  const openNotice = (feeId) => {
    setSelectedFeeId(feeId);
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  const loadItems = async () => {
    try {
      const data = await fetchFeeData();
      setFeesData(data.fees);
      setTotalFeesCount(data.totalFeesCount);
      setTotalPaidAmount(data.totalPaidAmount);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredData = feesData.filter(
    (item) =>
      (filter === "" || item.studentID.class === filter) &&
      (searchTerm === "" || item.studentID.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="w-full" data-testid="fees-table">

        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Id</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Gender</th>
              <th className="py-4 px-6 text-left">Aadhar No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Contact No</th>
              <th className="py-4 px-6 text-left">Paid Amount</th>
              <th className="py-4 px-6 text-left">Due Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left">{item.studentID.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/Fees/FeeDetails/${item._id}`}>
                    {item.studentID.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.studentID.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.studentID.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.studentID.gender}</td>
                <td className="py-4 px-6 text-left">{item.studentID.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.studentID.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.studentID.contactNumber}</td>
                <td className="py-4 px-6 text-left text-green-600 underline">
                  <button onClick={() => openSlip(item._id)} data-testid="view-fee-slip">View Fee Slip</button>
                </td>
                <td className="py-4 px-6 text-left text-red-500 underline">
                  <button onClick={() => openNotice(item._id)} data-testid="view-due-notice">View Due Notice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isNoticeOpen && <FeeNotice2 onClose={closeNotice} feeId={selectedFeeId} data-testid="fee-notice" />}
      {isSlipOpen && <FeeSlip onClose={closeSlip} feeId={selectedFeeId} data-testid="fee-slip" />}
    </>
  );
}

{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import FeeNotice2 from "./FeeNotice2";
import FeeSlip from "../Component/FeeSlip";
import { fetchFeeData } from "../../../../../api/api";
import format from "date-fns/format";

export default function FeesTable({ filter, searchTerm }) {
  const [feesData, setFeesData] = useState([]);
  const [totalFeesCount, setTotalFeesCount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [selectedFeeId, setSelectedFeeId] = useState(null);
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openSlip = (feeId) => {
    setSelectedFeeId(feeId);
    setIsSlipOpen(true);
  };

  const closeSlip = () => {
    setIsSlipOpen(false);
  };

  const openNotice = (feeId) => {
    setSelectedFeeId(feeId);
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  const loadItems = async () => {
    try {
      const data = await fetchFeeData();
      setFeesData(data.fees);
      setTotalFeesCount(data.totalFeesCount);
      setTotalPaidAmount(data.totalPaidAmount);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredData = feesData.filter(
    (item) =>
      (filter === "" || item.studentID.class === filter) &&
      (searchTerm === "" || item.studentID.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="w-full">

        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Id</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Gender</th>
              <th className="py-4 px-6 text-left">Aadhar No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Contact No</th>
              <th className="py-4 px-6 text-left">Paid Amount</th>
              <th className="py-4 px-6 text-left">Due Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left">{item.studentID.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/Fees/FeeDetails/${item._id}`}>
                    {item.studentID.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.studentID.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.studentID.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.studentID.gender}</td>
                <td className="py-4 px-6 text-left">{item.studentID.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.studentID.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.studentID.contactNumber}</td>
                <td className="py-4 px-6 text-left text-green-600 underline">
                  <button onClick={() => openSlip(item._id)}>View Fee Slip</button>
                </td>
                <td className="py-4 px-6 text-left text-red-500 underline">
                  <button onClick={() => openNotice(item._id)}>View Due Notice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isNoticeOpen && <FeeNotice2 onClose={closeNotice} feeId={selectedFeeId} />}
      {isSlipOpen && <FeeSlip onClose={closeSlip} feeId={selectedFeeId} />}
    </>
  );
}
{/*
import Link from "next/link";
import { useState } from "react";
import FeeNotice2 from "./FeeNotice2";
import FeeSlip from "./FeeSlip";

const feesData = [
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Paid Amount",
    color: { bg: "bg-gray-100", text: "text-green-600" },
  },
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Due Amount",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Paid Amount",
    color: { bg: "bg-gray-100", text: "text-green-600" },
  },
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Due Amount",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Paid Amount",
    color: { bg: "bg-gray-100", text: "text-green-600" },
  },
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Due Amount",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Paid Amount",
    color: { bg: "bg-gray-100", text: "text-green-600" },
  },
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Due Amount",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Paid Amount",
    color: { bg: "bg-gray-100", text: "text-green-600" },
  },
  {
    srNo: "01",
    StudentId: "316606",
    name: "Abhinav Kumar",
    class: "8",
    DOF: "14-08-2002",
    Gender: "Male",
    aadharNo: "895442252657",
    fatherName: "Vivek Kumar",
    contactNo: "9999999999",
    action: "Due Amount",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  // Add more student data as needed
];

export default function FeesTable({ filter, searchTerm }) {
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [isSlipOpen, setIsSlipOpen] = useState(false);

  const openSlip = () => {
    setIsSlipOpen(true);
  };

  const closeSlip = () => {
    setIsSlipOpen(false);
  };

  const openNotice = () => {
    setIsNoticeOpen(true);
  };

  const closeNotice = () => {
    setIsNoticeOpen(false);
  };

  const filteredData = feesData.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Id</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Gender</th>
              <th className="py-4 px-6 text-left">Aadhar No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Contact No</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left">{item.srNo}</td>
                <td className="py-4 px-6 text-left">{item.StudentId}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={"/AdminDashboard/Fees/FeeDetails"}>
                    {item.name}
                  </Link>
                </td>

                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.DOF}</td>
                <td className="py-4 px-6 text-left">{item.Gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNo}</td>
                <td className="py-4 px-6 text-left">{item.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNo}</td>
                <button
                  onClick={item.action === "Due Amount" ? openNotice : openSlip}
                >
                  <td className={`py-4 px-6 text-left ${item.color.text}`}>
                    {item.action}
                  </td>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isNoticeOpen && <FeeNotice2 onClose={closeNotice} />}
      {isSlipOpen && <FeeSlip onClose={closeSlip} />}
    </>
  );
}
  */}
