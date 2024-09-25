"use client";



import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchHomeWorkData, deleteHomeWorkData } from "../../../../api/homeworkapi"; // api to fetch and felete homework data 
import { format } from "date-fns";

export default function ClassesTable({ filter, searchTerm }) {
  const [homeworkData, setHomeworkData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchHomeWorkData();
        setHomeworkData(data.homeworks);
      } catch (error) {
        console.error("Failed to fetch homework data:", error);
      }
    };

    loadData();
  }, []);

  const openDelete = (id) => {
    setDeleteId(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setDeleteId(null);
    setDelete(false);
  };

  // use to delete homework data 
  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteHomeWorkData(deleteId);
        setHomeworkData((prevData) => prevData.filter((item) => item._id !== deleteId));
        closeDelete();
      } catch (error) {
        console.error("Failed to delete homework:", error);
      }
    }
  };

  const filteredData = (homeworkData || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.homework.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Class Name</th>
              <th className="py-4 px-6 text-left">Student</th>
              <th className="py-4 px-6 text-left">Home work</th>
              <th className="py-4 px-6 text-left">Create Date</th>
              <th className="py-4 px-6 text-left">Date of Submission</th>
              <th className="py-4 px-6 text-left">Home Work Done</th>
              <th className="py-4 px-6 text-left">Undone Home Work</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each homework  data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left ">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.class}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.assignTo}</td>

                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  <Link href={"/teacherspanel/Classes/HomeWorkName"}>
                    {item.homework}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{format(new Date(item.startDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.endDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  {item.homeworkDone}
                </td>
                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  {item.undoneHomework}
                </td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={`/teacherspanel/Classes/EditDetails/${item._id}`}>
                    <button>{item.action?.edit || "Edit"}</button>{" "}
                  </Link>
                  <h1 className="text-gray-400">|</h1>

                  <button
                    onClick={() => openDelete(item._id)}
                    className="text-red-600"
                  >
                    {item.action?.delete || "Delete"}
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

const classData = [
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    className: "Class 1",
    student: "20",
    homeWork: "Dummy Home Work",
    createDate: "05-06-24",
    dateOfSubmission: "08-06-24",
    homeWorkDone: "15",
    undoneHomeWork: "5",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function ClassesTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = classData.filter(
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
              <th className="py-4 px-6 text-left">Class Name</th>
              <th className="py-4 px-6 text-left">Student</th>
              <th className="py-4 px-6 text-left">Home work</th>
              <th className="py-4 px-6 text-left">Create Date</th>
              <th className="py-4 px-6 text-left">Date of Submission</th>
              <th className="py-4 px-6 text-left">Home Work Done</th>
              <th className="py-4 px-6 text-left">Undone Home Work</th>
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
                    {item.className}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.student}</td>

                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  <Link href={"/teacherspanel/Classes/HomeWorkName"}>
                    {item.homeWork}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.createDate}</td>
                <td className="py-4 px-6 text-left">{item.dateOfSubmission}</td>
                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  {item.homeWorkDone}
                </td>
                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  {item.undoneHomeWork}
                </td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/teacherspanel/Classes/EditDetails"}>
                    <button>{item.action.edit}</button>{" "}
                  </Link>
                  <h1 className="text-gray-400">|</h1>

                  <button onClick={openDelete} className="text-red-600">
                    {item.action.delete}
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
        />
      )}
    </>
  );
}
  */}
