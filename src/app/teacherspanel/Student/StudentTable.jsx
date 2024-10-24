"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData } from "../../../../api/api"; //api to fetch student data 
import { format } from "date-fns";
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function StudentTable() {
  const [studentData, setStudentData] = useState([]);
  const [accessProvided, setAccessProvided] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();
  // call api to fetch student data 

  // Check user role and retrieve userId
  useEffect(() => {
    if (!user) return;
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email);
        console.log(result); // Use the imported function

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
  useEffect(() => {
    if (!userId) return;
    async function loadStudentData() {
      try {
        const data = await fetchStudentData(userId);
        if (data && Array.isArray(data.students)) {
          setStudentData(data.students);
          setAccessProvided(Array(data.students.length).fill(false));
        } else {
          console.error("Fetched data does not contain a students array:", data);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    }

    loadStudentData();
  }, [userId]);

  const handleCheckboxChange = (index) => {
    const newAccessProvided = [...accessProvided];
    newAccessProvided[index] = !newAccessProvided[index];
    setAccessProvided(newAccessProvided);
  };

  return (
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
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* .map() function iterates through filteredData and renders a <tr> (table row) for each student   data*/}
          {studentData.map((item, index) => (
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
                <Link href={`/teacherspanel/Attendance/StudentAtdDetails/${item._id}`}>
                  {item.name}
                </Link>
              </td>
              <td className="py-4 px-6 text-left">{item.class}</td>
              <td className="py-4 px-6 text-left">
                {format(new Date(item.dateOfBirth), "yyyy-MM-dd")}
              </td>
              <td className="py-4 px-6 text-left">{item.Gender}</td>
              <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
              <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
              <td className="py-4 px-6 text-left">{item.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{/*
import Link from "next/link";
import { useState } from "react";

const studentData = [
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
    color: { bg: "bg-gray-100", text: "text-orange-400" },
  },

  // Add more student data as needed
];

export default function StudentTable() {
  const [accessProvided, setAccessProvided] = useState(
    Array(studentData.length).fill(false)
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
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {studentData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">
                  <input
                    type="checkbox"
                    checked={accessProvided[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />

                  {item.srNo}
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
*/}