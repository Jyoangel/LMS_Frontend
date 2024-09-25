"use client";

import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchSubjectData, deleteSubjectData } from "../../../../api/subjectapi";
import { format } from 'date-fns';  // Ensure correct import

export default function SubjectTable({ filter, searchTerm }) {
  const [subjects, setSubjects] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const data = await fetchSubjectData();
        setSubjects(data.subjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };
    getSubjects();
  }, []);

  const openDelete = (id) => {
    setDeleteId(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      await deleteSubjectData(deleteId);
      setSubjects(subjects.filter((subject) => subject._id !== deleteId));
      closeDelete();
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  const filteredData = subjects.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Subject"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>
        <div className="w-full">
          <table className="w-full bg-white">
            <thead className="bg-blue-200 h-14 py-10">
              <tr className="text-gray-700 text-sm font-normal leading-normal">
                <th className="py-4 px-6 text-left">Sr. No</th>
                <th className="py-4 px-6 text-left">Subject</th>
                <th className="py-4 px-6 text-left">Class</th>
                <th className="py-4 px-6 text-left">Date & Time</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  <td className="py-4 px-6 text-left">{index + 1}</td>
                  <td className="py-4 px-6 text-left text-blue-600 underline">
                    <Link href={`/AdminDashboard/LiveClassScreen/CourseName`}>
                      {item.subject}
                    </Link>
                  </td>
                  <td className="py-4 px-6 text-left">{item.class}</td>
                  <td className="py-4 px-6 text-left">
                    {format(new Date(item.date), "yyyy-MM-dd")} | {item.time}
                  </td>
                  <td className={`py-4 px-6 text-left flex gap-2`}>
                    <Link href={`/AdminDashboard/Subject/EditSubject/${item._id}`}>
                      <button className="text-blue-600">Edit</button>
                    </Link>
                    <h1 className="text-gray-400">|</h1>
                    <button
                      role="button"
                      onClick={() => openDelete(item._id)}
                      className="text-red-600"
                      aria-label="Delete"
                    >
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
      </div>
    </>
  );
}

{/*
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const subjectData = [
  {
    srNo: "01",
    subject: "English(+2)",
    class: "Class 1",
    dateAndTime: "15-06-24 | 01:PM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    subject: "English(+2)",
    class: "Class 1",
    dateAndTime: "15-06-24 | 01:PM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    subject: "English(+2)",
    class: "Class 1",
    dateAndTime: "15-06-24 | 01:PM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    subject: "English(+2)",
    class: "Class 1",
    dateAndTime: "15-06-24 | 01:PM",

    action: { edit: "Edit", delete: "Delete" },
  },

  {
    srNo: "01",
    subject: "English(+2)",
    class: "Class 1",
    dateAndTime: "15-06-24 | 01:PM",

    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function SubjectTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = subjectData.filter(
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
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Date & Time</th>

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
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.subject}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.class}</td>
                <td className="py-4 px-6 text-left ">{item.dateAndTime}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/AdminDashboard/Subject/EditSubject"}>
                    <button
                      // onClick={item.action === "Due Amount" ? openNotice : openSlip}
                      className="text-blue-600"
                    >
                      {item.action.edit}
                    </button>{" "}
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