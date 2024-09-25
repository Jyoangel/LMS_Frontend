"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchTeacherData, selectTeacher } from "../../../../api/teacherapi"; // Assuming selectTeacher is in teacherapi
import { format } from "date-fns";

export default function TeacherManagementTable({ filter, searchTerm, setSelectedTeacher }) {
  const [data, setData] = useState({ teachers: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

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

  const handleSelectTeacher = async (teacherID, isChecked) => {
    try {
      const updatedTeacher = await selectTeacher(teacherID, isChecked); // Call the API to update the selected status
      setData((prevState) => ({
        ...prevState,
        teachers: prevState.teachers.map((teacher) =>
          teacher.teacherID === teacherID ? { ...teacher, selected: isChecked } : teacher
        ),
      }));
      setSelectedTeacher(teacherID);
    } catch (error) {
      console.error("Failed to update selected status:", error);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const updatedTeachers = filteredData.map((teacher) => ({
      ...teacher,
      selected: newSelectAll,
    }));

    // Update the data locally and call the API for each teacher
    setData((prevState) => ({
      ...prevState,
      teachers: updatedTeachers,
    }));

    updatedTeachers.forEach((teacher) => {
      handleSelectTeacher(teacher.teacherID, newSelectAll);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
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
            <th className="py-4 px-6 text-left">Teacher Id</th>
            <th className="py-4 px-6 text-left">Name</th>
            <th className="py-4 px-6 text-left">Subject Taught</th>
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
                  checked={item.selected || false} // Set checked state based on item.selected
                  aria-label={`Select teacher ${index + 1}`}
                  onChange={(e) => handleSelectTeacher(item.teacherID, e.target.checked)}
                />
                {index + 1}
              </td>
              <td className="py-4 px-6 text-left">{item.teacherID}</td>
              <td className="py-4 px-6 text-left text-blue-600 underline">
                <Link href={`/AdminDashboard/Fees/FeeDetails/`}>{item.name}</Link>
              </td>
              <td className="py-4 px-6 text-left">{item.subjectTaught}</td>
              <td className="py-4 px-6 text-left">
                {format(new Date(item.dateOfBirth), "yyyy-MM-dd")}
              </td>
              <td className="py-4 px-6 text-left">{item.gender}</td>
              <td className="py-4 px-6 text-left">{item.aadharNumber}</td>
              <td className="py-4 px-6 text-left">{item.parent?.fatherName}</td>
              <td className="py-4 px-6 text-left">{item.contactNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


{/*import Link from "next/link";

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
                <td className="py-4 px-6 text-left ">{item.name}</td>

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
                    {item.action.edit}
                  </button>{" "}
                  <h1 className="text-gray-400">|</h1>
                  <button className="text-red-600">{item.action.delete}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
  */}
