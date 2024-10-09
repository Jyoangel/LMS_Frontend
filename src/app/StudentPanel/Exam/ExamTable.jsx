"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchExamData } from "../../../../api/examapi"; // api to fetch exam data 
import { format } from "date-fns";

export default function ExamTable({ filter, searchTerm }) {
  const [examData, setExamData] = useState([]);

  // call api to fetch exam data 
  useEffect(() => {
    const loadExamData = async () => {
      try {
        const data = await fetchExamData();
        setExamData(data.exams);
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    loadExamData();
  }, []);



  const filteredData = (examData || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())))

  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Exam Title</th>
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Exam Date</th>
              <th className="py-4 px-6 text-left">Start Time</th>
              <th className="py-4 px-6 text-left">Total Marks</th>
              <th className="py-4 px-6 text-left">Passing Marks</th>
              <th className="py-4 px-6 text-left">Created By</th>

            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each exam   data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left ">

                  {item.examTitle}

                </td>
                <td className="py-4 px-6 text-left ">{item.subject}</td>

                <td className="py-4 px-6 text-left">{format(new Date(item.date), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.startTime}</td>
                <td className="py-4 px-6 text-left">{item.totalMarks}</td>
                <td className="py-4 px-6 text-left">{item.passingMarks}</td>
                <td className="py-4 px-6 text-left">kamlesh Kumar</td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
}


{/*

import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const examData = [
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
  {
    srNo: "01",
    examTitle: "Half Yearly",
    subject: "Math",
    examDate: "09-06-2024",
    startTime: "09:00 AM ",
    totalMarks: "100 ",
    passingMarks: "23 ",
    createdBy: "Kamlesh Kumar",
  },
];

export default function ExamTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = examData.filter(
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
              <th className="py-4 px-6 text-left">Exam Title</th>
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Exam Date</th>
              <th className="py-4 px-6 text-left">Start Time</th>
              <th className="py-4 px-6 text-left">Total Marks</th>
              <th className="py-4 px-6 text-left">Passing Marks</th>
              <th className="py-4 px-6 text-left">Created By</th>
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
                <td className="py-4 px-6 text-left ">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.examTitle}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.subject}</td>

                <td className="py-4 px-6 text-left">{item.examDate}</td>
                <td className="py-4 px-6 text-left">{item.startTime}</td>
                <td className="py-4 px-6 text-left">{item.totalMarks}</td>
                <td className="py-4 px-6 text-left">{item.passingMarks}</td>
                <td className="py-4 px-6 text-left">{item.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDelete && (
        <ConfirmationCard
          para={"Do you really want to delete this record?"}
          onClose={closeDelete}
        />
      )}
    </>
  );
}
  */}
