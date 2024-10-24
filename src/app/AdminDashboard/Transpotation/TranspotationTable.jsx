"use client";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchStudentData } from "../../../../api/api"; // fetch student api 
import { fetchTranspotationBystudentID, deleteTranspotationDataByStudentID } from "../../../../api/transpotationapi"; // Import your fetch and delete api of transportation 
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook


export default function TranspotationTable({ filter, searchTerm }) {
  const [transpotationData, setTranspotationData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();

  // use to fetch student data with transportation data 
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchStudentData(user.sub);
        const students = data.students;

        // Fetch transportation data for each student
        const enrichedData = await Promise.all(
          students.map(async (student) => {
            try {
              const transportation = await fetchTranspotationBystudentID(student._id);
              return {
                ...student,
                pickupLocation: transportation.pickupLocation || "N/A",
                dropLocation: transportation.dropLocation || "N/A",
                pickupTime: transportation.pickupTime || "N/A",
                dropTime: transportation.dropTime || "N/A",
              };
            } catch (err) {
              console.error(`Failed to fetch transportation for student ${student._id}`, err);
              return {
                ...student,
                pickupLocation: "N/A",
                dropLocation: "N/A",
                pickupTime: "N/A",
                dropTime: "N/A",
              };
            }
          })
        );

        setTranspotationData(enrichedData);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  const openDelete = (id) => {
    setDeleteId(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteId(null);
  };
  // use to delete trabsportation data 
  const handleDelete = async () => {
    try {
      await deleteTranspotationDataByStudentID(deleteId);
      setTranspotationData(transpotationData.filter(item => item._id !== deleteId));
      closeDelete();
    } catch (error) {
      setError(error.message);
      closeDelete();
    }
  };

  const filteredData = (transpotationData || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Roll No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Father Contact Number</th>
              <th className="py-4 px-6 text-left">Pickup Location</th>
              <th className="py-4 px-6 text-left">Drop Location</th>
              <th className="py-4 px-6 text-left">Pickup Time</th>
              <th className="py-4 px-6 text-left">Drop Time</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each student item. and  that student transportation data*/}
            {filteredData.map((item, index) => (
              <tr
                key={item._id}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.admissionNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherContactNumber}</td>
                <td className="py-4 px-6 text-left">{item.pickupLocation}</td>
                <td className="py-4 px-6 text-left">{item.dropLocation}</td>
                <td className="py-4 px-6 text-left">{item.pickupTime}</td>
                <td className="py-4 px-6 text-left">{item.dropTime}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  {item.pickupLocation === "N/A" && item.dropLocation === "N/A" && item.pickupTime === "N/A" && item.dropTime === "N/A" ? (
                    <Link href={`/AdminDashboard/Transpotation/AddTranspotation/${item._id}`}>
                      <button className="text-blue-600">
                        Add
                      </button>
                    </Link>
                  ) : (
                    <button disabled className="text-gray-400 cursor-not-allowed">
                      Add
                    </button>
                  )}
                  <h1 className="text-gray-400">|</h1>
                  <Link href={`/AdminDashboard/Transpotation/EditTranspotation/${item._id}`}>
                    <button className="text-blue-600">
                      Edit
                    </button>
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
import { useEffect, useState } from "react";
import { fetchStudentData } from "../../../../api/api";

export default function TranspotationTable({ filter, searchTerm }) {
  const [transpotationData, setTranspotationData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchStudentData();
        console.log(data);
        setTranspotationData(data.students);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }
    getData();
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
      await deleteTranspotationData(deleteId);
      setTranspotationData(transpotationData.filter(item => item._id !== deleteId));
      closeDelete();
    } catch (error) {
      setError(error.message);
      closeDelete();
    }
  };

  const filteredData = (transpotationData || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class </th>
              <th className="py-4 px-6 text-left">Roll No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Father Contact Number</th>
              <th className="py-4 px-6 text-left">Pickup Location</th>
              <th className="py-4 px-6 text-left">Drop Location</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={item._id}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.admissionNumber}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherContactNumber}</td>
                <td className="py-4 px-6 text-left">{item.pickupLocation}</td>
                <td className="py-4 px-6 text-left">{item.dropLocation}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <Link href={`/AdminDashboard/Transpotation/AddTranspotation/${item._id}`}>
                    <button className="text-blue-600">
                      Add
                    </button>
                  </Link>
                  <h1 className="text-gray-400">|</h1>
                  <Link href={`/AdminDashboard/Transpotation/EditTranspotation/${item._id}`}>
                    <button className="text-blue-600">
                      Edit
                    </button>
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

{/*}
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const transpotationData = [
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    studentName: "Abhinav Kumar",
    class: "Class 7",
    rollNo: "24",
    fatherName: "Vivek Kumar",
    fatherContactNumber: "9999999999",
    pickupLocation: "Loaction 1",
    dropLocation: "Location 2  ",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function TranspotationTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = transpotationData.filter(
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
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class </th>
              <th className="py-4 px-6 text-left">Roll No</th>
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left"> Father Contact Number</th>
              <th className="py-4 px-6 text-left">Pickup Location</th>
              <th className="py-4 px-6 text-left">Drop LOcation</th>
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
                    {item.studentName}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.class}</td>

                <td className="py-4 px-6 text-left">{item.rollNo}</td>
                <td className="py-4 px-6 text-left">{item.fatherName}</td>
                <td className="py-4 px-6 text-left">
                  {item.fatherContactNumber}
                </td>
                <td className="py-4 px-6 text-left">{item.pickupLocation}</td>
                <td className="py-4 px-6 text-left">{item.dropLocation}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/AdminDashboard/CourseManagement/UpdateDetail"}>
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
