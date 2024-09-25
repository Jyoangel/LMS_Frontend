"use client";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchTeacherData, deleteTeacherData } from "../../../../../api/teacherapi"; // api to fetch and delete teacher 
import { format } from "date-fns";

export default function TeacherManagementTable({ filter, searchTerm }) {
  const [data, setData] = useState({ teachers: [] });
  const [isDelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const openDelete = (id) => {
    setTeacherToDelete(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setTeacherToDelete(null);
    setDelete(false);
  };

  // handle delete of teacher
  const handleDelete = async () => {
    try {
      await deleteTeacherData(teacherToDelete);
      loadItems();
      closeDelete();
    } catch (error) {
      console.error("Failed to delete student data:", error);
    }
  };

  // use to call fetch teacher api 
  const loadItems = async () => {
    try {
      const data = await fetchTeacherData();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredData = data.teachers.filter(
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
              <th className="py-4 px-6 text-left">Teacher Id</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Subject Taught</th>
              <th className="py-4 px-6 text-left">DOB</th>
              <th className="py-4 px-6 text-left">Gender</th>
              <th className="py-4 px-6 text-left">Aadhar No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Contact No</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each teacher  item. */}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left">{item.teacherID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/Fees/FeeDetails/`}>{item.name}</Link>
                </td>
                <td className="py-4 px-6 text-left">{item.subjectTaught}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent?.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.email}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <button className="text-blue-600">
                    <Link href={`/AdminDashboard/UserManagement/UpdateTeacher/${item._id}`}>
                      Edit
                    </Link>
                  </button>
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
          onConfirm={handleDelete}
          onClose={closeDelete}
        />
      )}
    </>
  );
}


{/*"use client";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const teacherData = [
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
    action: { edit: "Edit", delete: "Delete" },
    color: "bg-gray-100",
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
              <th className="py-4 px-6 text-left">Teacher Id</th>
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

                <td
                  className={`py-4 px-6 text-left flex gap-2 ${item.color.text}`}
                >
                  <button
                    // onClick={item.action === "Due Amount" ? openNotice : openSlip}
                    className="text-blue-600"
                  >
                    <Link href={"/AdminDashboard/UserManagement/UpdateDetails"}>
                      {item.action.edit}
                    </Link>
                  </button>{" "}
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
