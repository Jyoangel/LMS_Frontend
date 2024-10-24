"use client";



import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchStudentData } from "../../../../api/api"; // api to fetch student data 
import { fetchHotelBystudentID, deleteHotelDataStudentID } from "../../../../api/hotelapi"; // api to fetchhostel and delete hostel data by studentID 
import { format } from "date-fns";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function HotelTable({ filter, searchTerm }) {
  const [hotelData, setHotelData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();

  // use to fetch student data 
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchStudentData(user.sub

        );
        const students = data.students;

        // Fetch hotel data for each student
        const enrichedData = await Promise.all(
          students.map(async (student) => {
            try {
              const hotel = await fetchHotelBystudentID(student._id);
              return {
                ...student,
                typeOfRoom: hotel.typeOfRoom || "N/A",
                floor: hotel.floor || "N/A",
                zone: hotel.zone || "N/A",
                price: hotel.price || "N/A",
                date: hotel.date || "N/A",
                time: hotel.time || "N/A",
              };
            } catch (err) {
              console.error(`Failed to fetch hotel data for student ${student._id}`, err);
              return {
                ...student,
                typeOfRoom: "N/A",
                floor: "N/A",
                zone: "N/A",
                price: "N/A",
                date: "N/A",
                time: "N/A",
              };
            }
          })
        );

        setHotelData(enrichedData);
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

  // use to delete hostel using studenID
  const handleDelete = async () => {
    try {
      await deleteHotelDataStudentID(deleteId);
      setHotelData(hotelData.filter(item => item._id !== deleteId));
      closeDelete();
    } catch (error) {
      setError(error.message);
      closeDelete();
    }
  };

  const filteredData = (hotelData || []).filter(
    (item) =>
      (filter === "" || item.floor === filter) &&
      (searchTerm === "" ||
        item.typeOfRoom.toLowerCase().includes(searchTerm.toLowerCase()))
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
              <th className="py-4 px-6 text-left">Father Name</th>
              <th className="py-4 px-6 text-left">Father Contact Number</th>
              <th className="py-4 px-6 text-left">Type of Room</th>
              <th className="py-4 px-6 text-left">Floor</th>
              <th className="py-4 px-6 text-left">Zone</th>
              <th className="py-4 px-6 text-left">Price</th>

              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each hostel  item. */}
            {filteredData.map((item, index) => (
              <tr
                key={item._id}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/HotelManagement/EditHotel/${item._id}`}>
                    {item.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherName}</td>
                <td className="py-4 px-6 text-left">{item.parent.fatherContactNumber}</td>
                <td className="py-4 px-6 text-left">{item.typeOfRoom}</td>
                <td className="py-4 px-6 text-left">{item.floor}</td>
                <td className="py-4 px-6 text-left">{item.zone}</td>
                <td className="py-4 px-6 text-left">{item.price}</td>

                <td className="py-4 px-6 text-left flex gap-2">
                  {item.typeOfRoom === "N/A" && item.zone === "N/A" && item.floor === "N/A" && item.price === "N/A" ? (
                    <Link href={`/AdminDashboard/HotelManagement/AddHotel/${item._id}`}>
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
                  <Link href={`/AdminDashboard/HotelManagement/EditHotel/${item._id}`}>
                    <button className="text-blue-600">Edit</button>
                  </Link>
                  <h1 className="text-gray-400">|</h1>
                  <button onClick={() => openDelete(item._id)} className="text-red-600">Delete</button>
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

const hotelData = [
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    TypeofRoom: "Normal",
    floor: "Abhinav Kumar",
    zone: "8",
    dateandTime: "14-28-2024 | 10:00AM",

    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function HotelTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = hotelData.filter(
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
              <th className="py-4 px-6 text-left">Type of Room</th>
              <th className="py-4 px-6 text-left">Floor</th>
              <th className="py-4 px-6 text-left">Zone</th>
              <th className="py-4 px-6 text-left">Date and Time</th>
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
                    {item.TypeofRoom}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.floor}</td>

                <td className="py-4 px-6 text-left">{item.zone}</td>
                <td className="py-4 px-6 text-left">{item.dateandTime}</td>
                <td className="py-4 px-6 text-left">{item.discription}</td>

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
