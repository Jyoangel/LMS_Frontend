"use client";



import Image from "next/image";
import download from "./download.png";
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchCourseData, deleteCourseData } from "../../../../api/courseapi"; // api to fetch course  and delete 
import { format } from "date-fns";
import { checkUserRole } from "../../../../api/api"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function CourseTable({ filter, searchTerm }) {
  const [data, setData] = useState({ courses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();
  // Fetch  library data on component mount

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


  // call api to fetch the course data 
  useEffect(() => {
    if (!userId) return;
    async function getData() {
      try {
        const data = await fetchCourseData(userId);
        setData(data); // set course data 
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    getData();
  }, [userId]);

  const openDelete = (courseId) => {
    setCourseToDelete(courseId);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setCourseToDelete(null);
  };

  // use to delete course 
  const handleDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourseData(courseToDelete);
        setData((prevData) => ({
          courses: prevData.courses.filter(course => course._id !== courseToDelete)
        }));
        closeDelete();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const filteredData = (data.courses || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="w-full">
        <table className="w-full bg-white">
          <thead className="bg-blue-200 h-14 py-10">
            <tr className="text-gray-700 text-sm font-normal leading-normal">
              <th className="py-4 px-6 text-left">Sr. No</th>
              <th className="py-4 px-6 text-left">Course Name</th>
              <th className="py-4 px-6 text-left">Course Code</th>
              <th className="py-4 px-6 text-left">Instructor Name</th>
              <th className="py-4 px-6 text-left">Start Date</th>
              <th className="py-4 px-6 text-left">End Date</th>
              <th className="py-4 px-6 text-left">Class Timing</th>
              <th className="py-4 px-6 text-left">Class Days</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each course  data*/}
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
              >
                <td className="py-4 px-6 text-left">{index + 1}</td>
                <td className="py-4 px-6 text-left">

                  {item.courseName}

                </td>
                <td className="py-4 px-6 text-left">{item.courseCode}</td>
                <td className="py-4 px-6 text-left">{item.primaryInstructorname}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.schedule.startDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{format(new Date(item.schedule.endDate), "yyyy-MM-dd")}</td>
                <td className="py-4 px-6 text-left">{item.schedule.classTime}</td>
                <td className="py-4 px-6 text-left">{item.schedule.classDays.join(', ')}</td>
                <td className="py-4 px-6 text-left flex gap-2">
                  <Link href={`http://localhost:5000/api/course/${item.uploadCourse}`} target="_blank">
                    <button >
                      <Image src={download} alt="Download" />
                    </button>
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
          onConfirm={handleDelete}
        />
      )}
    </>
  );
}

{/*
const courseData = [
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
  {
    srNo: "01",
    courseName: "Course Name 1",
    courseCode: "5678",
    instName: "Kamlesh Kumar",
    startDate: "14-08-2002",
    endDate: "14-08-2002",
    classTiming: "10:00 AM to 11: 00 AM",

    classDays: "Mon, Wed, Fry ",
    action: { edit: "Edit", delete: "Delete" },
  },
];

export default function CourseTable({ filter, searchTerm }) {
  const [isDelete, setDelete] = useState(false);

  const openDelete = () => {
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
  };

  const filteredData = courseData.filter(
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
              <th className="py-4 px-6 text-left">Course Name</th>
              <th className="py-4 px-6 text-left">Course Code</th>
              <th className="py-4 px-6 text-left">Instructor Name</th>
              <th className="py-4 px-6 text-left">Start Date</th>
              <th className="py-4 px-6 text-left">End Date</th>
              <th className="py-4 px-6 text-left">Class Timing</th>
              <th className="py-4 px-6 text-left">Class Days</th>
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
                  <Link href={"/StudentPanel/Course/CourseDetails"}>
                    {item.courseName}
                  </Link>
                </td>
                <td className="py-4 px-6 text-left ">{item.courseCode}</td>

                <td className="py-4 px-6 text-left">{item.instName}</td>
                <td className="py-4 px-6 text-left">{item.startDate}</td>
                <td className="py-4 px-6 text-left">{item.endDate}</td>
                <td className="py-4 px-6 text-left">{item.classTiming}</td>
                <td className="py-4 px-6 text-left">{item.classDays}</td>

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
