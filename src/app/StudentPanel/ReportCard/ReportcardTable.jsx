"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client"; // Import useUser hook from Auth0
import { fetchStudentByEmail } from "../../../../api/api"; // Assume you have an API to fetch student data by email

export default function ReportCardTable({ filter, searchTerm }) {
  const { user, isLoading } = useUser(); // Get user data from Auth0
  const [data, setData] = useState([]);

  // Fetch student data by email
  useEffect(() => {
    async function fetchData() {
      if (user && user.email) {
        try {
          const studentData = await fetchStudentByEmail(user.email);
          if (studentData) {
            setData([studentData]); // Set the data as an array since we are fetching a single student
          }
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    }

    if (!isLoading) {
      fetchData();
    }
  }, [user, isLoading]);

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Admission Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/StudentPanel/ReportCard/FinalAdmitcard/${item._id}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.admissionNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

{/*
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchStudentByID } from "../../../../api/api"; // api to fetch student data 

export default function ReportCardTable({ filter, searchTerm }) {
  const [data, setData] = useState([]);
  const id = "66b60924e67fa1332d78f238"; // Hardcoded student ID

  // call api to fetch one student 
  useEffect(() => {
    async function fetchData() {
      try {
        const studentData = await fetchStudentByID(id);
        console.log("studentData", studentData); // Fetch student data by studentID
        if (studentData) {
          setData([studentData]); // Set the data as an array since we are fetching by one studentID
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [id]); // studentID as a dependency to re-fetch if it changes

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.student_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Admission Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each student   data*
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/StudentPanel/ReportCard/FinalAdmitcard/${item._id}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.admissionNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

{/*
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchAdmitCardByStudentID } from "../../../../api/reportcardapi";
// Function to fetch admit card details by studentID


export default function ReportCardTable({ filter, searchTerm }) {
  const [data, setData] = useState([]);
  const studentID = "66b60924e67fa1332d78f238"; // Hardcoded student ID

  useEffect(() => {
    async function fetchData() {
      try {
        const admitCardData = await fetchAdmitCardByStudentID(studentID);
        console.log("admitcard", admitCardData); // Fetch admit card by studentID
        if (admitCardData) {
          setData([admitCardData]); // Set the data as an array since we are fetching by one studentID
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, [studentID]); // studentID as a dependency to re-fetch if it changes

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.student_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Examination Roll Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/StudentPanel/ReportCard/FinalAdmitcard/${item._id}`}>
                    {item.student_name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.examination_roll_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

{/*

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchReportCardData } from "../../../../api/reportcardapi";
import { format } from "date-fns";

export default function ReportCardTable() {
  const [studentData, setStudentData] = useState([]);
  const [accessProvided, setAccessProvided] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchReportCardData();
        setStudentData(data);
        setAccessProvided(Array(data.length).fill(false));
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or alert user
      }
    }

    fetchData();
  }, []);

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
              <th className="py-4 px-6 text-left">Examination</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Session</th>
              <th className="py-4 px-6 text-left">Percentage</th>
              <th className="py-4 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {studentData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">{index + 1}</td>
                <td className="py-4 px-6 text-left">{item.type}</td>

                <td className="py-4 px-6 text-left text-blue-600 underline">
                  {" "}
                  <Link href={`/StudentPanel/ReportCard/FinalReportCard/${item._id}`}>
                    {item.name}
                  </Link>

                </td>

                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.session}</td>
                <td className="py-4 px-6 text-left">{item.percentage}</td>
                <td className="py-4 px-6 text-left">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

{/*
import Link from "next/link";
import { useState } from "react";

const reportData = [
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },
  {
    srNo: "01",
    examination: "Half Yearly",
    reportCardName: "Report Card",
    name: "Abhinav Kumar",
    class: "8",
    dof: "14-08-2002",
    session: "2024-2025",
    fatherName: "Vivek Kumar",
    Percentage: "90%",
  },

  // Add more student data as needed
];

export default function ReportcardTable() {
  const [accessProvided, setAccessProvided] = useState(
    Array(reportData.length).fill(false)
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
              <th className="py-4 px-6 text-left">Examination</th>
              <th className="py-4 px-6 text-left">Report Card Name</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">DOF</th>
              <th className="py-4 px-6 text-left">Session</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Percentage</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {reportData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">{item.srNo}</td>
                <td className="py-4 px-6 text-left">{item.examination}</td>

                <td className="py-4 px-6 text-left text-blue-600 underline">
                  {" "}
                  <Link href={"/teacherspanel/Attendance/StudentAtdDetails"}>
                    {item.reportCardName}
                  </Link>
                </td>

                <td className="py-4 px-6 text-left">{item.name}</td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.dof}</td>
                <td className="py-4 px-6 text-left">{item.session}</td>
                <td className="py-4 px-6 text-left">{item.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.Percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
  */}
