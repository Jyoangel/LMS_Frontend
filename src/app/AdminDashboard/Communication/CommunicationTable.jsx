"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchStudentData, selectStudent } from "../../../../api/api"; // Replace with your actual API functions
import { format } from "date-fns";

export default function CommunicationTable({ filter, searchTerm, setSelectedStudent }) {
  const [data, setData] = useState({ students: [] });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectAll, setSelectAll] = useState(false);



  const loadItems = async () => {
    try {
      const data = await fetchStudentData();
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

  const filteredData = data.students.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectStudent = async (studentID, isChecked) => {
    try {
      const updatedData = await selectStudent(studentID, isChecked); // Update selected status to isChecked (true/false)
      setData((prevState) => ({
        ...prevState,
        students: prevState.students.map((student) =>
          student.studentID === studentID ? { ...student, selected: isChecked } : student
        ),
      }));
      setSelectedStudent(studentID); // Update selected student in parent component state if needed
    } catch (error) {
      console.error("Failed to update selected status:", error);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedStudents = filteredData.map((student) => ({
      ...student,
      selected: newSelectAll,
    }));

    // Optionally send an API call for selecting all if needed.
    setData((prevState) => ({
      ...prevState,
      students: updatedStudents,
    }));

    updatedStudents.forEach((student) => {
      handleSelectStudent(student.studentID, newSelectAll);
    });
  };

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
              <th className="py-4 px-6 text-left">
                <input
                  type="checkbox"
                  aria-label="Select All"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
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
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">
                  <input
                    type="checkbox"
                    checked={item.selected} // Set checked state based on item.selected
                    aria-label={`Select student ${index + 1}`}
                    onChange={(e) => handleSelectStudent(item.studentID, e.target.checked)}
                  />
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-left">{item.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/Fees/FeeDetails/${item.studentID}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNumber}</td>

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
import { useState, useEffect } from "react";
import { fetchStudentData, deleteStudentData } from "../../../../api/api";
import format from "date-fns/format";

export default function CommunicationTable({ filter, searchTerm }) {
  const [data, setData] = useState({ students: [] });
  const [isDelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const openDelete = (id) => {
    setStudentToDelete(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setStudentToDelete(null);
    setDelete(false);
  };

  const handleDelete = async () => {
    try {
      await deleteStudentData(studentToDelete);
      loadItems();
      closeDelete();
    } catch (error) {
      console.error("Failed to delete student data:", error);
    }
  };

  const loadItems = async () => {
    try {
      const data = await fetchStudentData();
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

  const filteredData = data.students.filter(
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
              <th className="py-4 px-6 text-left">
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
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left flex gap-2">
                  <input
                    type="checkbox"

                  />
                  {index + 1}
                </td>
                <td className="py-4 px-6 text-left">{item.studentID}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/Fees/FeeDetails/${item.studentID}`}>{item.name}</Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateOfBirth), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.gender}</td>
                <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.contactNumber}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <button className="text-blue-600">
                    <Link href={`/AdminDashboard/UserManagement/UpdateDetails/${item.studentID}`}>
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

*/}





