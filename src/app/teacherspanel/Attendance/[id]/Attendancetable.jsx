


import React, { useState, useEffect } from 'react';
import { fetchAttendanceData, updateAttendance } from '../../../../../api/attendanceapi'; // api to fetch and update attendance data 
import { format } from "date-fns";
import Link from "next/link";
import { checkUserRole } from "../../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Attendancetable({ setSelectedStudents }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [checkboxState, setCheckboxState] = useState({}); // For tracking selected checkboxes
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();



  // Check user role and retrieve userId
  useEffect(() => {
    if (!user) return;
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

  // use to fetch attendance data 
  useEffect(() => {
    if (!userId) return;
    async function fetchData() {
      try {
        const data = await fetchAttendanceData(userId);
        setAttendanceData(data.attendance);
        console.log(data); // Check if data includes populated student details
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    }

    fetchData();
  }, [userId]);

  const handleCheckboxChange = (studentId) => {
    setCheckboxState((prev) => ({
      ...prev,
      [studentId]: !prev[studentId], // Toggle checkbox state
    }));

    // Update selected students for access
    setSelectedStudents((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleStatusChange = async (index) => {
    const updatedData = [...attendanceData];
    const item = updatedData[index];
    const newStatus = !item.present; // Toggle the present status
    item.present = newStatus; // Update local state

    setAttendanceData(updatedData);

    try {
      await updateAttendance(item._id, newStatus); // Pass the item._id and newStatus
    } catch (error) {
      console.error('Failed to update attendance data:', error);
      // Revert local state if update fails
      item.present = !newStatus;
      setAttendanceData([...updatedData]);
    }
  };

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="bg-blue-200 h-14 py-10">
          <tr className="text-gray-700 text-sm font-normal leading-normal">
            <th className="py-4 px-6 text-left">Select</th>
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
          {/* .map() function iterates through filteredData and renders a <tr> (table row) for each attendance   data*/}
          {attendanceData.map((item, index) => (
            <tr key={index} className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <td className="py-4 px-6 text-left">
                <input
                  type="checkbox"
                  checked={!!checkboxState[item.studentId._id]} // Control checkbox state
                  onChange={() => handleCheckboxChange(item.studentId._id)}
                />
              </td>
              <td className="py-4 px-6 text-left">{index + 1}</td>
              <td className="py-4 px-6 text-left">{item.studentId.studentID}</td>
              <Link href={`/teacherspanel/Attendance/StudentAtdDetails/${item.studentId._id}`}>
                <td className="py-4 px-6 text-left">{item.studentId.name}</td>
              </Link>
              <td className="py-4 px-6 text-left">{item.studentId.class}</td>
              <td className="py-4 px-6 text-left">{format(new Date(item.studentId.dateOfBirth), "yyyy-MM-dd")}</td>
              <td className="py-4 px-6 text-left">{item.studentId.gender}</td>
              <td className="py-4 px-6 text-left">{item.studentId.aadharNumber}</td>
              <td className="py-4 px-6 text-left">{item.studentId.parent.fatherName}</td>
              <td className="py-4 px-6 text-left">{item.studentId.contactNumber}</td>
              <td className="py-4 px-6 text-left">
                <button
                  onClick={() => handleStatusChange(index)}
                  className={`underline ${item.present ? 'text-green-500' : 'text-red-500'}`}
                >
                  {item.present ? 'Present' : 'Absent'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


{/*

import React, { useState, useEffect } from 'react';
import { fetchAttendanceData, updateAttendance } from '../../../../../api/attendanceapi';
import { format } from "date-fns";

export default function Attendancetable() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchAttendanceData();
        setAttendanceData(data);
        console.log(data); // Check if data includes populated student details
      } catch (error) {
        console.error('Failed to fetch attendance data:', error);
      }
    }

    fetchData();
  }, []);

  const handleStatusChange = async (index) => {
    const updatedData = [...attendanceData];
    const item = updatedData[index];
    const newStatus = !item.present; // Toggle the present status
    item.present = newStatus; // Update local state

    setAttendanceData(updatedData);

    try {
      await updateAttendance(item._id, newStatus); // Pass the item._id and newStatus
    } catch (error) {
      console.error('Failed to update attendance data:', error);
      // Revert local state if update fails
      item.present = !newStatus;
      setAttendanceData([...updatedData]);
    }
  };

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="bg-blue-200 h-14 py-10">
          <tr className="text-gray-700 text-sm font-normal leading-normal">
            <th className="py-4 px-6 text-left flex gap-2">
              Sr. No</th>
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
          {attendanceData.map((item, index) => (
            <tr key={index} className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
              <td className="py-4 px-6 text-left flex gap-2">

                {index + 1}</td>
              <td className="py-4 px-6 text-left">{item.studentId.studentID}</td>
              <td className="py-4 px-6 text-left">{item.studentId.name}</td>
              <td className="py-4 px-6 text-left">{item.studentId.class}</td>
              <td className="py-4 px-6 text-left">{format(new Date(item.studentId.dateOfBirth), "yyyy-MM-dd")}</td>
              <td className="py-4 px-6 text-left">{item.studentId.gender}</td>
              <td className="py-4 px-6 text-left">{item.studentId.aadharNumber}</td>
              <td className="py-4 px-6 text-left">{item.studentId.parent.fatherName}</td>
              <td className="py-4 px-6 text-left">{item.studentId.contactNumber}</td>
              <td className="py-4 px-6 text-left">
                <button
                  onClick={() => handleStatusChange(index)}
                  className={`underline ${item.present ? 'text-green-500' : 'text-red-500'}`}
                >
                  {item.present ? 'Present' : 'Absent'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




{/*
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData } from "../../../../api/api";
import format from "date-fns/format";

const Attendancetable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [accessProvider, setAccessProvider] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData();
        if (data && Array.isArray(data.students)) {
          const studentsWithDefaultAttendance = data.students.map(student => ({
            ...student,
            action: "Absent" // Set default attendance to "Absent"
          }));
          setAttendanceData(studentsWithDefaultAttendance);
        } else {
          console.error('Error: Fetch data is not in expected format', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    setAccessProvider(index);
  };

  const handleAttendanceChange = (index) => {
    if (accessProvider !== null) {
      const updatedAttendanceData = [...attendanceData];
      updatedAttendanceData[index].action = updatedAttendanceData[index].action === "Present" ? "Absent" : "Present";
      setAttendanceData(updatedAttendanceData);
    }
  };

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left flex gap-2">
                <input type="checkbox" />
                Sr. No
              </th>
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
            {attendanceData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">
                  <input
                    type="checkbox"
                    checked={accessProvider === index}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-left">{item.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/teacherspanel/Attendance/StudentAtdDetails/${item.studentID}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.Gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNumber}</td>
                <td
                  className={`py-4 px-6 text-left underline ${accessProvider !== null ? "text-green-500 cursor-pointer" : "text-gray-500"
                    }`}
                  onClick={() => handleAttendanceChange(index)}
                >
                  {attendanceData[index].action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Attendancetable;

{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData } from "../../../../api/api";
import format from "date-fns/format";

const Attendancetable = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [accessProvided, setAccessProvided] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStudentData();
        if (data && Array.isArray(data.students)) {
          setAttendanceData(data.students);
          setAccessProvided(Array(data.students.length).fill(false));
        } else {
          console.error('Error: Fetch data is not in expected format', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (index) => {
    const newAccessProvided = [...accessProvided];
    newAccessProvided[index] = !newAccessProvided[index];
    setAccessProvided(newAccessProvided);

    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData[index].action = newAccessProvided[index] ? "Present" : "Absent";
    setAttendanceData(updatedAttendanceData);
  };

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left flex gap-2">
                <input type="checkbox" />
                Sr. No
              </th>
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
            {attendanceData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">
                  <input
                    type="checkbox"
                    checked={accessProvided[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-left">{item.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/teacherspanel/Attendance/StudentAtdDetails/${item.studentID}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.Gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNumber}</td>
                <td className={`py-4 px-6 text-left underline text-green-500`}>
                  {accessProvided[index] ? "Present" : "Absent"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Attendancetable;


{/*
import Link from "next/link";
import { useState } from "react";

const attendanceData = [
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
    action: "Present",
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
    action: "Absent",
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
    action: "Present",
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
    action: "Absent",
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
    action: "Present",
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
    action: "Absent",
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
    action: "Present",
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
    action: "Absent",
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
    action: "Present",
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
    action: "Absent",
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  // Add more student data as needed
];

export default function Attendancetable() {
  const [accessProvided, setAccessProvided] = useState(
    Array(attendanceData.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const newAccessProvided = [...accessProvided];
    newAccessProvided[index] = !newAccessProvided[index];
    setAccessProvided(newAccessProvided);
  };
  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left flex gap-2">Sr. No</th>
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
            {attendanceData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">{item.srNo}</td>
                <td className="py-4 px-6 text-left">{item.StudentId}</td>

                <td className="py-4 px-6 text-left text-blue-600 underline">
                  {" "}
                  <Link href={"/teacherspanel/Attendance/StudentAtdDetails"}>
                    {item.name}
                  </Link>
                </td>

                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.DOF}</td>
                <td className="py-4 px-6 text-left">{item.Gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNo}</td>
                <td className="py-4 px-6 text-left">{item.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNo}</td>
                <button>
                  <td
                    className={`py-4 px-6 text-left underline ${item.color.text}`}
                  >
                    {item.action}
                  </td>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
*/}