"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ConfirmationCard from "@/Components/ConfirmationCard";
import { fetchEnquiryData, deleteEnquiryData } from "../../../../api/enquiryapi"; // fetch and delete enquiry data 
import { useUser } from '@auth0/nextjs-auth0/client';

export default function EnquiryTable({ filter, searchTerm }) {
  const [enquiryData, setEnquiryData] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();


  // use to fetch all enquiry data 
  useEffect(() => {
    const loadEnquiryData = async () => {
      try {
        const data = await fetchEnquiryData(user.sub);
        setEnquiryData(data.enquiries);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    loadEnquiryData();
  }, []);

  const openDelete = (id) => {
    setDelete(true);
    setDeleteId(id);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteId(null);
  };

  // use to delete enquiry data 
  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteEnquiryData(deleteId);
        setEnquiryData(enquiryData.filter((item) => item._id !== deleteId));
        closeDelete();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const filteredData = enquiryData.filter(
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
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Contact Number</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Enquiry</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each enquiry item. */}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left ">{item.name}</td>
                <td className="py-4 px-6 text-left ">{item.contactNumber}</td>
                <td className="py-4 px-6 text-left">{item.email}</td>
                <td className="py-4 px-6 text-left">{item.enquiryRelated}</td>
                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={`/AdminDashboard/Enquiry/EditEnquiry/${item._id}`}>
                    <button className="text-blue-600">Edit</button>{" "}
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

const enquiryData = [
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    name: "Ravi Kumar",
    contact: "9999999999",
    email: "example@gmail.com",
    enquiry:
      " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, ad?   ",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function EnquiryTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = enquiryData.filter(
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
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Contact Number</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Enquiry</th>
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
                <td className="py-4 px-6 text-left ">{item.name}</td>
                <td className="py-4 px-6 text-left ">{item.contact}</td>

                <td className="py-4 px-6 text-left">{item.email}</td>
                <td className="py-4 px-6 text-left">{item.enquiry}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/AdminDashboard/Enquiry/EditEnquiry"}>
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
