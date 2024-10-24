"use client";
import React, { Fragment, useState, useEffect } from 'react';
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { fetchCourseData, deleteCourseData } from "../../../../api/courseapi"; //  api for fetch  course and delete 
import { deleteLiveClassData } from "../../../../api/liveclassapi"; // api to delete live class 
import { format } from "date-fns";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function CourseManagementTable({ filter = "", searchTerm = "" }) {
  const [data, setData] = useState({ courses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();

  useEffect(() => {
    async function getData() {
      try {
        const fetchedData = await fetchCourseData(user.sub);
        console.log("Fetched Data:", fetchedData);
        if (fetchedData && Array.isArray(fetchedData.courses)) {
          setData(fetchedData);
        } else {
          console.error("Unexpected data structure:", fetchedData);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const openDelete = (courseId) => {
    setCourseToDelete(courseId);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setCourseToDelete(null);
  };

  const handleDeleteCourse = async () => {
    if (courseToDelete) {
      try {
        // Delete course and its associated live classes
        await deleteCourseData(courseToDelete);
        setData((prevData) => ({
          courses: prevData.courses.filter((course) => course._id !== courseToDelete),
        }));
        closeDelete();
      } catch (error) {
        setError(error.message);
      }
    }
  };
  // use to delete live class 
  const handleDeleteLiveClass = async (liveClassId) => {
    try {
      await deleteLiveClassData(liveClassId);
      // Update state to reflect deletion of live class
      setData((prevData) => {
        const updatedCourses = prevData.courses.map((course) => ({
          ...course,
          liveClasses: course.liveClasses.filter((lc) => lc._id !== liveClassId),
        }));
        return { ...prevData, courses: updatedCourses };
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredData = (data.courses || []).filter(
    (item) =>
      (filter === "" || item.class === filter) &&
      (searchTerm === "" ||
        item.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  console.log("Filtered Data:", filteredData);

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
              <th className="py-4 px-6 text-left">Topic</th>
              <th className="py-4 px-6 text-left">Section</th>
              <th className="py-4 px-6 text-left">Live Room</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Time</th>
              <th className="py-4 px-6 text-left">Assign To</th>
              <th className="py-4 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {/* .map() function iterates through filteredData and renders a <tr> (table row) for each course item. */}
            {filteredData.map((course, index) => (
              <Fragment key={course._id}>
                <tr
                  className={`text-gray-700 text-sm font-normal leading-normal ${index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                >
                  <td className="py-4 px-6 text-left">{index + 1}</td>
                  <td className="py-4 px-6 text-left text-blue-600 underline">
                    <Link href={`/AdminDashboard/LiveClassScreen/CourseName/${course._id}`}>
                      {course.courseName}
                    </Link>
                  </td>
                  {/* Render course details */}
                  {/* .map() function iterates through filteredData and renders a <tr> (table row) for each live class  item. */}
                  {course.liveClasses && course.liveClasses.map((liveClass, lcIndex) => (
                    <Fragment key={liveClass._id}>
                      <td className="py-4 px-6 text-left">{liveClass.topic}</td>
                      <td className="py-4 px-6 text-left">{liveClass.section}</td>
                      <td className="py-4 px-6 text-left">{liveClass.liveRoom}</td>
                      <td className="py-4 px-6 text-left">{format(new Date(liveClass.date), 'MM/dd/yyyy')}</td>
                      <td className="py-4 px-6 text-left">{liveClass.time}</td>
                      <td className="py-4 px-6 text-left">{liveClass.assignTo}</td>
                      <td className="py-4 px-6 text-left flex gap-2">
                        <Link href={`/AdminDashboard/LiveClassScreen/UpdateLiveClasses/${liveClass._id}`}><button className="text-blue-600">Edit</button></Link>
                        <h1 className="text-gray-400">|</h1>
                        <button onClick={() => handleDeleteLiveClass(liveClass._id)} className="text-red-600">
                          Delete
                        </button>
                      </td>
                    </Fragment>
                  ))}
                </tr>
                {/*
                <tr>
                  <td colSpan="9" className="py-4 px-6 text-left">
                    <button onClick={() => openDelete(course._id)} className="text-red-600">
                      Delete Course
                    </button>
                  </td>
                </tr>*/}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {isDelete && (
        <ConfirmationCard
          para={"Do you really want to delete this course?"}
          onClose={closeDelete}
          onConfirm={handleDeleteCourse}
        />
      )}

    </>
  );
}


{/*
import ConfirmationCard from "@/Components/ConfirmationCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchCourseData, deleteCourseData } from "../../../../api/courseapi";
import format from "date-fns/format";

export default function CourseManagementTable({ filter, searchTerm }) {
  const [data, setData] = useState({ courses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchCourseData();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const openDelete = (courseId) => {
    setCourseToDelete(courseId);
    setDelete(true);
  };

  const closeDelete = () => {
    setDelete(false);
    setCourseToDelete(null);
  };

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

  const filteredData = data.courses.filter(
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
              <th className="py-4 px-6 text-left">Topic</th>
              <th className="py-4 px-6 text-left">Section</th>
              <th className="py-4 px-6 text-left">Live Room</th>
              <th className="py-4 px-6 text-left">Date</th>
              <th className="py-4 px-6 text-left">Time</th>
              <th className="py-4 px-6 text-left">Assign To</th>
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
                <td className="py-4 px-6 text-left text-blue-600 underline">
                  <Link href={`/AdminDashboard/LiveClassScreen/CourseName/${item._id}`}>
                    {item.courseName}
                  </Link>s
                </td>
                <td className="py-4 px-6 text-left ">Topic</td>

                <td className="py-4 px-6 text-left">A</td>
                <td className="py-4 px-6 text-left">Live Room 123</td>
                <td className="py-4 px-6 text-left">Date</td>
                <td className="py-4 px-6 text-left">10 a.m</td>
                <td className="py-4 px-6 text-left">All students </td>

                <td className={`py-4 px-6 text-left flex gap-2  `}>
                  <Link href={`/AdminDashboard/CourseManagement/UpdateDetail/${item._id}`}>
                    <button className="text-blue-600">
                      Edit
                    </button>{" "}
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

const liveClassesData = [
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

export default function LiveClassTable({ filter, searchTerm }) {
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
                  <Link href={"/AdminDashboard/LiveClassScreen/CourseName"}>
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
                  <Link
                    href={"/AdminDashboard/LiveClassScreen/UpdateLiveClasses"}
                  >
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
