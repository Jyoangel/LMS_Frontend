"use client";


import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import download from "./download.png";
import { format } from "date-fns";
import { fetchLibraryData } from "../../../../api/libraryapi"; // api to fetch library data 

export default function ResourcesTable({ filter, searchTerm }) {
  const [resourcesData, setResourcesData] = useState([]);

  // call api to fetch library data 
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchLibraryData();
        console.log(data);
        setResourcesData(data.libraryItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  // use to search 
  const filteredData = resourcesData.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        (item.name &&
          item.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );



  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Course</th>
              <th className="py-4 px-6 text-left">Uploaded By</th>
              <th className="py-4 px-6 text-left">Date Uploaded</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each library   data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-500 underline">
                 
                    {item.title}
                 
                </td>
                <td className="py-4 px-6 text-left">{item.description}</td>
                <td className="py-4 px-6 text-left">{item.type}</td>
                <td className="py-4 px-6 text-left">{item.subject}</td>
                <td className="py-4 px-6 text-left">Kamlesh Kumar</td>
                <td className="py-4 px-6 text-left">
                  {format(new Date(item.dateAdded), "yyyy-MM-dd")}
                </td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <Link href={`http://localhost:5000/api/library/${item.uploadBookPdf}`} target="_blank">
                    <Image src={download} alt="Download PDF" />
                  </Link>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}



{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import download from "./download.png";
import { format } from "date-fns";
import { fetchLibraryData } from "../../../../api/libraryapi";



export default function ResourcesTable({ filter, searchTerm }) {

  const [resourcesData, setResourcesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchLibraryData();
        setResourcesData(data.libraryItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);



  const filteredData = resourcesData.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Course</th>
              <th className="py-4 px-6 text-left">Uploaded By</th>
              <th className="py-4 px-6 text-left">Date Uploaded</th>
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
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left  text-blue-500 underline ">
                  <Link href={"/StudentPanel/Assignment/AssingmentDeatils"}>
                    {item.title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.description}</td>
                <td className="py-4 px-6 text-left">{item.type}</td>
                <td className="py-4 px-6 text-left">{item.subject}</td>
                <td className="py-4 px-6 text-left">Kamlesh Kumar</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dateAdded), "yyyy-MM-dd")}</td>
                <td className={`py-4 px-6 text-left flex gap-2`}>
                  <Image src={download} />
                </td>
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
import { useState } from "react";
import Image from "next/image";
import download from "./download.png";

const resourcesData = [
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    title: "Dummy Name",
    description: "Dummy Description ",
    type: "PDF",
    course: "Math001",
    uploadedBy: "Kamlesh Kumar",
    dateUploaded: "04-06-24 |10:00 AM",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function ResourcesTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = resourcesData.filter(
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
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Type</th>
              <th className="py-4 px-6 text-left">Course</th>
              <th className="py-4 px-6 text-left">Uploaded By</th>
              <th className="py-4 px-6 text-left">Date Uploaded</th>
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
                <td className="py-4 px-6 text-left  text-blue-500 underline ">
                  <Link href={"/StudentPanel/Assignment/AssingmentDeatils"}>
                    {item.title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.description}</td>

                <td className="py-4 px-6 text-left">{item.type}</td>
                <td className="py-4 px-6 text-left">{item.course}</td>
                <td className="py-4 px-6 text-left">{item.uploadedBy}</td>
                <td className="py-4 px-6 text-left">{item.dateUploaded}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Image src={download} />
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
