"use client";


import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import UserManagementTable from "./components/UserManagementTable";
import TeacherManagementTable from "./components/TeacherTable";
import StaffManagementTable from "./components/StaffTable";
import { fetchCountData } from "../../../../api/api"; // api to fetch count student 
import { fetchCountTeacherData } from "../../../../api/teacherapi"; // api to fetch teacher count 
import { fetchCountStaffData } from "../../../../api/staffapi";// api to fetch staff count 
import { importStudentData } from "../../../../api/api"; // api to import student 
import { importTeacherData } from "../../../../api/teacherapi"; // api to import teacher 
import { importStaffData } from "../../../../api/staffapi"; // api to import staff 

export default function UserManagement() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1); // Default to Students
  const [totalUsers, setTotalUsers] = useState(0);
  const [file, setFile] = useState(null); // State for handling file import
  const [message, setMessage] = useState(""); // State for import feedback message

  // Reference for the file input element
  const fileInputRef = useRef(null);

  // use to call fetch count api for teacher ,student and staff 
  const handleSelect = async (value) => {
    setSelect(value);
    let fetchData;
    if (value === 1) {
      fetchData = fetchCountData;
    } else if (value === 2) {
      fetchData = fetchCountTeacherData;
    } else if (value === 3) {
      fetchData = fetchCountStaffData;
    }

    try {
      const data = await fetchData();
      setTotalUsers(data.count);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    handleSelect(select);
  }, [select]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Store the selected file
      handleImport(selectedFile); // Automatically trigger import after selection
    }
  };

  const handleImport = async (selectedFile) => {
    if (!selectedFile) {
      setMessage("Please select a file to import.");
      return;
    }

    try {
      let result;
      if (select === 1) {
        result = await importStudentData(selectedFile); // Import student data
      } else if (select === 2) {
        result = await importTeacherData(selectedFile); // Import teacher data
      } else if (select === 3) {
        result = await importStaffData(selectedFile); // Import staff data
      }

      setMessage(result.message || "Import successful!"); // Display server response
    } catch (error) {
      setMessage("Failed to import data.");
    }
  };

  const getAddNewLink = () => {
    if (select === 1) {
      return "/AdminDashboard/UserManagement/StudentDetails";
    } else if (select === 2) {
      return "/AdminDashboard/UserManagement/TeacherDetails";
    } else if (select === 3) {
      return "/AdminDashboard/UserManagement/StaffDetails";
    }
    return "#"; // Fallback to prevent errors if nothing matches
  };

  // Function to trigger file input click
  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simulate click on the hidden file input element
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        {/* total no */}
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Users: {totalUsers}</h1>
          <div className="flex items-center justify-center gap-5">
            <div>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the file input
              />
              <button
                onClick={triggerFileSelect} // Trigger file dialog
                className="text-base font-semibold text-blue-500 underline"
              >
                Import
              </button>
              {message && <p>{message}</p>} {/* Display success/error message */}
            </div>
            <Link href={getAddNewLink()}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* student teacher staff */}
        <div className="h-20  w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
          <button
            onClick={() => handleSelect(1)}
            className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Students
          </button>
          <button
            onClick={() => handleSelect(2)}
            className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleSelect(3)}
            className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Staffs
          </button>
        </div>

        {/* table */}
        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full  flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1>Show</h1>
              <select className="h-6 w-12">
                <option>10</option>
              </select>
              <h1>Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1>Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row  items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <h1>Search</h1>
              </div>
              <div className="flex flex-row gap-1">
                <button
                  className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center"
                  aria-label="page left"
                >
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button
                  className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center "
                  aria-label="page right"
                >
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {select === 1 && (
              <UserManagementTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 2 && (
              <TeacherManagementTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 3 && (
              <StaffManagementTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}


{/*
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import UserManagementTable from "./components/UserManagementTable";
import TeacherManagementTable from "./components/TeacherTable";
import StaffManagementTable from "./components/StaffTable";
import { fetchCountData } from "../../../../api/api"; // Adjust the path as per your file structure
import { fetchCountTeacherData } from "../../../../api/teacherapi";
import { fetchCountStaffData } from "../../../../api/staffapi";

export default function UserManagement() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1); // Default to Students
  const [totalUsers, setTotalUsers] = useState(0);

  const handleSelect = async (value) => {
    setSelect(value);
    let fetchData;
    if (value === 1) {
      fetchData = fetchCountData;
    } else if (value === 2) {
      fetchData = fetchCountTeacherData;
    } else if (value === 3) {
      fetchData = fetchCountStaffData;
    }

    try {
      const data = await fetchData();
      setTotalUsers(data.count);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    handleSelect(select);
  }, [select]);

  const getAddNewLink = () => {
    if (select === 1) {
      return "/AdminDashboard/UserManagement/StudentDetails";
    } else if (select === 2) {
      return "/AdminDashboard/UserManagement/TeacherDetails";
    } else if (select === 3) {
      return "/AdminDashboard/UserManagement/StaffDetails";
    }
    return "#"; // Fallback to prevent errors if nothing matches
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        {/* total no *
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Users: {totalUsers}</h1>
          <div className="flex items-center justify-center gap-5">
            <button className="text-base font-semibold text-blue-500 underline">
              Import
            </button>
            <Link href={getAddNewLink()}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Add New
              </button>
            </Link>
          </div>
        </div>

        {/* student teacher staff *
        <div className="h-20  w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
          <button
            onClick={() => handleSelect(1)}
            className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Students
          </button>
          <button
            onClick={() => handleSelect(2)}
            className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleSelect(3)}
            className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"
              }  font-medium underline-offset-4`}
          >
            Staffs
          </button>
        </div>

        {/* table *
        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full  flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1>Show</h1>
              <select className="h-6 w-12">
                <option>10</option>
              </select>
              <h1>Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1>Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row  items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <h1>Search</h1>
              </div>
              <div className="flex flex-row gap-1">
                <button
                  className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center"
                  aria-label="page left"
                >
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button
                  className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center "
                  aria-label="page right"
                >
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {select === 1 && (
              <UserManagementTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 2 && (
              <TeacherManagementTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 3 && (
              <StaffManagementTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
  */}
