"use client";



import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchExamData, deleteExamData } from "../../../../api/examapi"; // api to fetch and delete exam data 
import { format } from "date-fns";
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function ExamTable({ filter, searchTerm }) {
  const [examData, setExamData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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
  // call api to fetch exam data 
  useEffect(() => {
    if (!userId) return;
    const loadExamData = async () => {
      try {
        const data = await fetchExamData(userId);
        setExamData(data.exams);
      } catch (error) {
        console.error("Failed to fetch exam data:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    loadExamData();
  }, [userId]);

  const openDelete = (id) => {
    setDeleteId(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteId(null);
  };


  // use to delete exam data 
  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteExamData(deleteId);
        setExamData(examData.filter((item) => item._id !== deleteId));
        closeDelete();
      } catch (error) {
        console.error("Failed to delete exam data:", error);
        // Handle error, e.g., show an error message to the user
      }
    }
  };

  const filteredData = (examData || []).filter(
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
              <th className="py-4 px-6 text-left">Action</th>
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

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={`/teacherspanel/Exam/EditExam/${item._id}`}>
                    <button className="text-blue-600">
                      Edit
                    </button>{" "}
                  </Link>
                  <h1 className="text-gray-400">|</h1>
                  <button onClick={() => openDelete(item._id)} className="text-red-600">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDelete && (
        <ConfirmationCard
          para={"Do you really want to delete this record?"}
          onClose={closeDelete}
          onConfirm={handleDelete}
        />
      )}
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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
    action: { edit: "Edit", delete: "Delete" },
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

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/teacherspanel/Course/CourseDetails"}>
                    <button
                      // onClick={item.action === "Due Amount" ? openNotice : openSlip}
                      className="text-blue-600"
                    >
                      {item.action.edit}
                    </button>{" "}
                  </Link>
                </td>
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
