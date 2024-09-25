"use client"
// src/components/TeacherTable.js
import React, { useEffect, useState } from 'react';
import { fetchTeacherData } from "../../../../../api/teacherapi"



export default function TeacherTable() {
  const [teacherList, setTeacherList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTeacherData();
        setTeacherList(data.teachers || []);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // const getTeacherSalary = (teacherId) => {
  //   const payment = paymentList.find(payment => payment.teacher._id === teacherId);
  //   return payment ? payment.salary : 'N/A';
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <table className="w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-blue-200 h-14 py-10">
          <tr className="text-gray-700 text-sm font-normal leading-normal">
            <th className="py-4 px-6 text-left">Sr. No</th>
            <th className="py-4 px-6 text-left">TeacherId</th>
            <th className="py-4 px-6 text-left">Name</th>
            <th className="py-4 px-6 text-left">Subject</th>
            <th className="py-4 px-6 text-left">Qualification</th>
            <th className="py-4 px-6 text-left">Salary</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {(Array.isArray(teacherList) ? teacherList : []).map((teacher, index) => (
            <tr
              key={teacher._id}
              className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
            >
              <td className="py-4 px-6 text-left">{index + 1}</td>
              <td className="py-4 px-6 text-left">{teacher.teacherID}</td>
              <td className="py-4 px-6 text-left">{teacher.name}</td>
              <td className="py-4 px-6 text-left">{teacher.subjectTaught}</td>
              <td className="py-4 px-6 text-left">{teacher.highestDegreeEarned}</td>
              <td className="py-4 px-6 text-left">{teacher.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{/*const teacherData = [
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    subject: "Account",
    qualification: "PG",
    free: "₹50,000",
    color: "bg-gray-100",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    subject: "Account",
    qualification: "PG",
    free: "₹50,000",
    color: "bg-white",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    subject: "Account",
    qualification: "PG",
    free: "₹50,000",
    color: "bg-gray-100",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    subject: "Account",
    qualification: "PG",
    free: "₹50,000",
    color: "bg-white",
  },
  {
    srNo: "01",
    userId: "US001",
    name: "Jay Kumar Rajak",
    subject: "Account",
    qualification: "PG",
    free: "₹50,000",
    color: "bg-gray-100",
  },
];

export default function TeacherTable() {
  return (
    <>
      <div className=" w-full">
        <table className="w-full bg-white    rounded-lg overflow-hidden">
          <thead className=" bg-blue-200  h-14 py-10">
            <tr className="  text-gray-700   text-sm font-normal leading-normal  ">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">UserId</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Qualification</th>
              <th className="py-4 px-6 text-left">Fee</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {teacherData.map((item, index) => (
              <tr
                key={index}
                className={` text-gray-700   text-sm font-normal leading-normal ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="py-4 px-6 text-left">{item.srNo}</td>
                <td className="py-4 px-6 text-left">{item.userId}</td>
                <td className="py-4 px-6 text-left">{item.name}</td>
                <td className="py-4 px-6 text-left">{item.subject}</td>
                <td className="py-4 px-6 text-left">{item.qualification}</td>
                <td className="py-4 px-6 text-left">{item.free}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
  */}
