"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import download from "./download.png";
import { fetchHomeWorkData, } from "../../../../api/homeworkapi"; // api to fetch homework data 
import { format } from "date-fns";
import { checkUserRole } from "../../../../api/api"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';



export default function HomeworkTable({ filter, searchTerm }) {
  const [homeworkData, setHomeworkData] = useState([]);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();

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

  // call api to fetch homework data 
  useEffect(() => {
    if (!userId) return;
    const loadData = async () => {
      try {
        const data = await fetchHomeWorkData(userId);
        setHomeworkData(data.homeworks);
      } catch (error) {
        console.error("Error fetching homework data:", error);
      }
    };

    loadData();
  }, [userId]);



  const filteredData = (homeworkData || []).filter(
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
              <th className="py-4 px-6 text-left">Home work</th>
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Chapter</th>
              <th className="py-4 px-6 text-left">Create Date</th>
              <th className="py-4 px-6 text-left">Date of Submission</th>
              <th className="py-4 px-6 text-left">Teacher Name</th>
              <th className="py-4 px-6 text-left">Attachment</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each homework  data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left ">

                  {item.homework}

                </td>
                <td className="py-4 px-6 text-left">{item.subjects}</td>
                <td className="py-4 px-6 text-left">{item.chapter}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.startDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.endDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">Kamlesh Kumar</td>
                <td className="py-4 px-6 text-left">{item.attachments}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <Link href={`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/${item.uploadHomework}`} target="_blank">

                    <Image src={download} alt="download" />
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

{/*}
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import download from "./download.png";

const assignmentData = [
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    Homework: "Homework",
    subject: "English ",
    chapter: "Chapter 1 ",
    createDate: "05-06-24",
    dateofSubmission: "08-06-24",
    teacherName: "Kamlesh Kumar",
    attachment: "PDF",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function HomeworkTable({ filter, searchTerm }) {
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
              <th className="py-4 px-6 text-left">Home work</th>
              <th className="py-4 px-6 text-left">Subject</th>
              <th className="py-4 px-6 text-left">Chapter</th>
              <th className="py-4 px-6 text-left">Create Date</th>
              <th className="py-4 px-6 text-left">Date of Submission</th>
              <th className="py-4 px-6 text-left">Teacher Name</th>
              <th className="py-4 px-6 text-left">Attachment</th>
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
                <td className="py-4 px-6 text-left text-blue-500 underline  ">
                  <Link href={"/StudentPanel/Homework/AddHomework"}>
                    {item.Homework}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.subject}</td>

                <td className="py-4 px-6 text-left">{item.chapter}</td>
                <td className="py-4 px-6 text-left">{item.createDate}</td>
                <td className="py-4 px-6 text-left">{item.dateofSubmission}</td>
                <td className="py-4 px-6 text-left">{item.teacherName}</td>
                <td className="py-4 px-6 text-left">{item.attachment}</td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={"/teacherspanel/Assignment/EditDeatils"}>
                    <Image src={download} />
                  </Link>
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
