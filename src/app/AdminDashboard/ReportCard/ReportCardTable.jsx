"use client";



import { useEffect, useState } from "react";
import { fetchStudentData } from "../../../../api/api";// fetch student data 
import Link from "next/link";

export default function ReportCardTable({ filter, searchTerm }) {
  const [data, setData] = useState({ students: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const studentDataResponse = await fetchStudentData();
        setData(studentDataResponse); // Fetch student data instead of admit card data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const filteredData = data.students.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full">
      <table className="w-full bg-white">
        <thead className="bg-blue-200 h-14 py-10">
          <tr className="text-gray-700 text-sm font-normal leading-normal">
            <th className="py-4 px-6 text-left">Sr. No</th>
            <th className="py-4 px-6 text-left">Student Name</th>
            <th className="py-4 px-6 text-left">Class</th>
            <th className="py-4 px-6 text-left">Admission Number</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* .map() function iterates through filteredData and renders a <tr> (table row) for each student item. */}
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="py-4 px-6 text-left">{index + 1}</td>
              <td className="py-4 px-6 text-left text-blue-600 underline">
                <Link href={`/AdminDashboard/ReportCard/AdmitCard/FinalAdmitcard/${item._id}`}>
                  {item.name} {/* Use student name from fetched data */}
                </Link>
              </td>
              <td className="py-4 px-6 text-left">{item.class}</td>
              <td className="py-4 px-6 text-left">{item.admissionNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


{/*

import { useEffect, useState } from "react";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Image from "next/image";
import group from "./group.png";
import { fetchAdmitCardData, deleteAdmitCardData } from "../../../../api/reportcardapi";
import Link from "next/link";
//import FinalAdmitcard from "./AdmitCard/FinalAdmitcard/[id]/page";

export default function ReportCardTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);
  const [data, setData] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const admitCardResponse = await fetchAdmitCardData();
        setData(admitCardResponse); // Only fetch admit card data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const openDelete = (item) => {
    setDelete(true);
    setDeleteItem(item);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteItem(null);
  };

  const handleDelete = async () => {
    try {
      await deleteAdmitCardData(deleteItem._id);
      setData(data.filter((item) => item._id !== deleteItem._id));
      closeDelete();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Examination Roll Number</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/ReportCard/AdmitCard/FinalAdmitcard/${item._id}`}>
                    {item.student_name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.examination_roll_number}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <Link href={`/AdminDashboard/ReportCard/AddReportCard/${item._id}`}>
                    <button className="text-green-600">Add ReportCard |</button>
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link href={`/AdminDashboard/ReportCard/EditAdmitCard/${item._id}`}>
                    <button className="text-blue-600">Edit AdmitCard</button>
                  </Link>
                  <span className="text-gray-400">|</span>
                  <button onClick={() => openDelete(item)} className="text-red-600">
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
import { useEffect, useState } from "react";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Image from "next/image";
import group from "./group.png";
import { fetchReportCardData, fetchAdmitCardData, deleteReportCardData, deleteAdmitCardData } from "../../../../api/reportcardapi";
import Link from "next/link";
import FinalReportcard from "../../AdminDashboard/ReportCard/[id]/FinalReportcard";
import FinalAdmitcard from "../../AdminDashboard/ReportCard/AdmitCard/[id]/FinalAdmitcard";

export default function ReportCardTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);
  const [data, setData] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const admitCardResponse = await fetchAdmitCardData();
        const reportCardResponse = await fetchReportCardData();

        // Combine the data
        const combinedData = [...admitCardResponse, ...reportCardResponse];

        setData(combinedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const openDelete = (item) => {
    setDelete(true);
    setDeleteItem(item);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteItem(null);
  };

  const handleDelete = async () => {
    try {
      if (deleteItem.ReportCard) {
        await deleteReportCardData(deleteItem._id);
      } else if (deleteItem.admitCard) {
        await deleteAdmitCardData(deleteItem._id);
      }
      setData(data.filter((item) => item._id !== deleteItem._id));
      closeDelete();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left"> Card Name</th>
              <th className="py-4 px-6 text-left">Student Name</th>
              <th className="py-4 px-6 text-left">Class</th>
              <th className="py-4 px-6 text-left">Examination Roll Number</th>
              <th className="py-4 px-6 text-left">Action</th>
              <th className="py-4 px-6 text-left">View</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  {item.ReportCard || item.admitCard}
                </td>
                <td className="py-4 px-6 text-left">
                  {item.name || item.student_name}
                </td>
                <td className="py-4 px-6 text-left">{item.class}</td>
                <td className="py-4 px-6 text-left">{item.rollNumber || item.examination_roll_number}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  {item.admitCard && (
                    <>
                      <Link href={`/AdminDashboard/ReportCard/AddReportCard/${item._id}`}>
                        <button className="text-green-600">Add ReportCard |</button>
                      </Link>
                      <Link href={`/AdminDashboard/ReportCard/EditAdmitCard/${item._id}`}>
                        <button className="text-blue-600">Edit AdmitCard</button>
                      </Link>
                    </>
                  )}
                  {item.ReportCard && (
                    <Link href={`/AdminDashboard/ReportCard/EditReportCard/${item._id}`}>
                      <button className="text-blue-600">Edit ReportCard</button>
                    </Link>
                  )}
                  <span className="text-gray-400">|</span>
                  <button onClick={() => openDelete(item)} className="text-red-600">
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 text-left">
                  <button onClick={() => openViewModal(item)}>
                    <Image src={group} alt="View" />
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

      {viewModal && selectedItem && (
        selectedItem.ReportCard ? (
          <FinalReportcard onClose={closeViewModal} params={{ id: selectedItem._id }} />
        ) : (
          <FinalAdmitcard onClose={closeViewModal} params={{ id: selectedItem._id }} />
        )
      )}
    </>
  );
}

{/*
import { useEffect, useState } from "react";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Image from "next/image";
import group from "./group.png";
import { fetchReportCardData, fetchAdmitCardData, deleteReportCardData, deleteAdmitCardData } from "../../../../api/reportcardapi";
import { format } from "date-fns";
import Link from "next/link";
import FinalReportcard from "../../AdminDashboard/ReportCard/[id]/FinalReportcard";
import FinalAdmitcard from "../../AdminDashboard/ReportCard/AdmitCard/[id]/FinalAdmitcard";

export default function ReportCardTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);
  const [data, setData] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const admitCardResponse = await fetchAdmitCardData();
        const reportCardResponse = await fetchReportCardData();

        // Combine the data
        const combinedData = [...admitCardResponse, ...reportCardResponse];

        setData(combinedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const openDelete = (item) => {
    setDelete(true);
    setDeleteItem(item);
  };

  const closeDelete = () => {
    setDelete(false);
    setDeleteItem(null);
  };

  const handleDelete = async () => {
    try {
      if (deleteItem.ReportCard) {
        await deleteReportCardData(deleteItem._id);
      } else if (deleteItem.admitCard) {
        await deleteAdmitCardData(deleteItem._id);
      }
      setData(data.filter((item) => item._id !== deleteItem._id));
      closeDelete();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setViewModal(true);
  };

  const closeViewModal = () => {
    setViewModal(false);
    setSelectedItem(null);
  };

  const filteredData = data.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Report Card Name</th>
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
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  {item.ReportCard || item.admitCard}
                </td>
                <td className="py-4 px-6 text-left">kamlesh Kumar</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.date), "yyyy-MM-dd")}|{item.time}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  {item.admitCard && (
                    <Link href={`/AdminDashboard/ReportCard/EditAdmitCard/${item._id}`}>
                      <button className="text-blue-600">Edit</button>
                    </Link>
                  )}
                  {item.ReportCard && (
                    <Link href={`/AdminDashboard/ReportCard/EditReportCard/${item._id}`}>
                      <button className="text-blue-600">Edit</button>
                    </Link>
                  )}
                  <span className="text-gray-400">|</span>
                  <button onClick={() => openDelete(item)} className="text-red-600">
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 text-left">
                  <button onClick={() => openViewModal(item)}>
                    <Image src={group} alt="View" />
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

      {viewModal && selectedItem && (
        selectedItem.ReportCard ? (
          <FinalReportcard onClose={closeViewModal} params={{ id: selectedItem._id }} />
        ) : (
          <FinalAdmitcard onClose={closeViewModal} params={{ id: selectedItem._id }} />
        )
      )}
    </>
  );
}




{/*
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import group from "./group.png";
import {
  fetchReportCardData,
  fetchAdmitCardData,
  fetchReportCardById,
  fetchAdmitCardById,
} from "../../../../api/reportcardapi";
import format from "date-fns/format";

const ReportCardTable = ({ filter, searchTerm }) => {
  const [isDelete, setDelete] = useState(false);
  const [reportCards, setReportCards] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reportCardData = await fetchReportCardData();
        setReportCards(reportCardData);

        const admitCardData = await fetchAdmitCardData();
        setAdmitCards(admitCardData);

        const combined = [
          ...reportCardData.map((item) => ({ ...item, type: "reportCard" })),
          ...admitCardData.map((item) => ({ ...item, type: "admitCard" })),
        ];

        setCombinedData(combined);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const openDelete = (item) => {
    setSelectedCard(item);
    setDelete(true);
  };

  const closeDelete = () => {
    setSelectedCard(null);
    setDelete(false);
  };

  const handleDelete = async () => {
    if (selectedCard.type === "reportCard") {
      // Add logic to delete report card
    } else {
      // Add logic to delete admit card
    }
    setDelete(false);
  };

  const fetchDateTime = async (item) => {
    try {
      let data;
      if (item.type === "reportCard") {
        data = await fetchReportCardById(item._id);
      } else {
        data = await fetchAdmitCardById(item._id);
      }
      return data ? { date: data.date, time: data.time } : { date: "", time: "" };
    } catch (error) {
      console.error("Failed to fetch date and time:", error);
      return { date: "", time: "" };
    }
  };

  const filteredData = combinedData.filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Report Card Name</th>
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
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link
                    href={
                      item.type === "reportCard"
                        ? `/AdminDashboard/ReportCard/ReportCard/${item._id}`
                        : `/AdminDashboard/ReportCard/AdmitCard/${item._id}`
                    }
                  >
                    {item.type === "reportCard" ? "Report Card" : "Admit Card"}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.createdBy}</td>
                <td className="py-4 px-6 text-left">
                  {fetchDateTime(item).then(({ date, time }) =>
                    date ? `${format(new Date(date), "yyyy-MM-dd")}|${time}` : "N/A"
                  )}
                </td>
                <td className={`py-4 px-6 text-left flex gap-2`}>
                  <Link
                    href={
                      item.type === "reportCard"
                        ? `/AdminDashboard/ReportCard/EditReportCard/${item._id}`
                        : `/AdminDashboard/ReportCard/EditAdmitCard/${item._id}`
                    }
                  >
                    <button className="text-blue-600">Edit</button>
                  </Link>
                  <h1 className="text-gray-400">|</h1>
                  <button onClick={() => openDelete(item)} className="text-red-600">
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 text-left">
                  <Image src={group} alt="group" />
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
};

export default ReportCardTable;


{/*
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import group from "./group.png";

const liveClassesData = [
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

export default function ReportCardTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = liveClassesData.filter(
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
              <th className="py-4 px-6 text-left">Report Card Name</th>
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
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{item.srNo}</td>
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={"/AdminDashboard/ReportCard/AdmitCard"}>
                    {item.reportCardName}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.createdBy}</td>

                <td className="py-4 px-6 text-left">{item.dateTime}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <button className="text-blue-600">Edit</button>{" "}
                  <h1 className="text-gray-400">|</h1>
                  <button onClick={openDelete} className="text-red-600">
                    Delete
                  </button>
                </td>
                <td className="py-4 px-6 text-left"><Image src={group} alt="group" /></td>
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
