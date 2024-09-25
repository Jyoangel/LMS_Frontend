"use client";

import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const teacherData = [
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
  {
    srNo: "01",
    reportCardName: "Admit Card",
    createdBy: "Kamlesh Kumar",
    dateTime: "03-06-24 | 10: 00 AM",
    action: { edit: "Edit", delete: "Delete" },
    view: "Mon, Wed, Fry ",
  },
];

export default function TeacherTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = teacherData.filter(
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
              <th className="py-4 px-6 text-left">Teacher Name</th>
              <th className="py-4 px-6 text-left">Created By</th>
              <th className="py-4 px-6 text-left">Date & Time</th>
              <th className="py-4 px-6 text-left">Action</th>
              <th className="py-4 px-6 text-left">View</th>
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
                    {item.reportCardName}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.createdBy}</td>

                <td className="py-4 px-6 text-left">{item.dateTime}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <button className="text-blue-600">{item.action.edit}</button>{" "}
                  <h1 className="text-gray-400">|</h1>
                  <button onClick={openDelete} className="text-red-600">
                    {item.action.delete}
                  </button>
                </td>
                <td className="py-4 px-6 text-left">{item.view}</td>
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
