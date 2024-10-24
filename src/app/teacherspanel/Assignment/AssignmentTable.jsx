"use client";

import { useEffect, useState } from "react";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { fetchAssignmentData, deleteAssignmentData } from "../../../../api/assignmentapi"; // api to fetch and delete assignmnet data 

import { format } from "date-fns";
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AssignmentTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);
  const [assignmentData, setAssignmentData] = useState({ assignments: [] });
  const [isLoading, setLoading] = useState(true);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();



  // Check user role and retrieve userId
  useEffect(() => {
    if (!user) return;
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email); // Use the imported function

        if (result.exists) {
          setUserId(result.userId); // Set userId from the response
        } else {
          setError("User not found or does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError("Failed to fetch user role.");
      }
    }

    getUserRole();
  }, [user]);

  // use to fetch assignment data 
  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      try {
        const data = await fetchAssignmentData(userId);
        setAssignmentData(data);
      } catch (error) {
        console.error('Error fetching assignment data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const openDelete = (id) => {
    setSelectedAssignmentId(id);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setSelectedAssignmentId(null);
  };

  // use to delete assignmnet data 
  const handleDelete = async () => {
    try {
      await deleteAssignmentData(selectedAssignmentId);
      setAssignmentData((prevState) => ({
        assignments: prevState.assignments.filter(
          (assignment) => assignment._id !== selectedAssignmentId
        ),
      }));
    } catch (error) {
      console.error('Error deleting assignment data:', error);
    } finally {
      closeDelete();
    }
  };

  //use to search 
  const filteredData = (assignmentData.assignments || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Assignment Code</th>
              <th className="py-4 px-6 text-left">Assignment Name</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Method</th>
              <th className="py-4 px-6 text-left">Due Date</th>
              <th className="py-4 px-6 text-left">Date & Timing</th>
              <th className="py-4 px-6 text-left">Created By</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each assignment  data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left ">

                  {item.assignmentCode}

                </td>
                <td className="py-4 px-6 text-left  ">
                  {item.assignmentTitle}
                </td>
                <td className="py-4 px-6 text-left">{item.courseDescription}</td>
                <td className="py-4 px-6 text-left">{item.submissionMethod}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.dueDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.date), "yyyy-MM-dd")}|{item.time}</td>
                <td className="py-4 px-6 text-left">{item.createdBy}</td>
                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={`/teacherspanel/Assignment/EditDeatils/${item._id}`}>
                    <button>Edit</button>{" "}
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
          onConfirm={handleDelete} // Add this line
        />
      )}
    </>
  );
}

{/*

import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";

const assignmentData = [
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    assignmentCode: "316606",
    assignmentName: "Dummy Name ",
    description: "Dummy Description",
    method: "Online",
    dueDate: "02-06-2024",
    dateandTime: "04-06-24 |10:00 AM",
    createdBy: "Kamlesh Kumar",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function AssignmentTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = assignmentData.filter(
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
              <th className="py-4 px-6 text-left">Assignment Code</th>
              <th className="py-4 px-6 text-left">Assignment Name</th>
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-left">Method</th>
              <th className="py-4 px-6 text-left">Due Date</th>
              <th className="py-4 px-6 text-left">Date & Timing</th>
              <th className="py-4 px-6 text-left">Created By</th>
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
                <td className="py-4 px-6 text-left ">
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
                    {item.assignmentCode}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left text-blue-500 underline ">
                  {item.assignmentName}
                </td>

                <td className="py-4 px-6 text-left">{item.description}</td>
                <td className="py-4 px-6 text-left">{item.method}</td>
                <td className="py-4 px-6 text-left">{item.dueDate}</td>
                <td className="py-4 px-6 text-left">{item.dateandTime}</td>
                <td className="py-4 px-6 text-left">{item.createdBy}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/teacherspanel/Assignment/EditDeatils"}>
                    <button>{item.action.edit}</button>{" "}
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
