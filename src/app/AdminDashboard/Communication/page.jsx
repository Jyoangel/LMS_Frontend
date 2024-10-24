"use client";


import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CommunicationTable from "./CommunicationTable";
import { SlRefresh } from "react-icons/sl";
import MessageCard from "./MessageCard";
import TeacherMessageCard from "./TeacherMessageCard";
import StaffMessageCard from "./StaffMessageCard";
import AllMessageCard from "./AllMessageCard"
import TeacherTable from "./TeacherTable";
import StaffTable from "./StaffTable";
import AllUserTable from "./AllUserTable";
import { fetchCountData } from "../../../../api/api";
import { fetchCountStaffData } from "../../../../api/staffapi";
import { fetchCountTeacherData } from "../../../../api/teacherapi";
import { useUser } from '@auth0/nextjs-auth0/client'; // Import Auth0 client hook

export default function Communication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();
  // use to call fetch count api for teacher ,student and staff 
  const handleSelect = async (value) => {
    setSelect(value);
    let studentCount = 0;
    let teacherCount = 0;
    let staffCount = 0;

    try {
      if (value === 1) {
        const data = await fetchCountData(user.sub);
        setTotalUsers(data?.count || 0);
      } else if (value === 2) {
        const data = await fetchCountTeacherData(user.sub);
        setTotalUsers(data?.count || 0);
      } else if (value === 3) {
        const data = await fetchCountStaffData(user.sub);
        setTotalUsers(data?.count || 0);
      } else if (value === 4) {
        // Handle the "All" case by fetching all users (students, teachers, and staff)
        const [studentData, teacherData, staffData] = await Promise.all([
          fetchCountData(user.sub),
          fetchCountTeacherData(user.sub),
          fetchCountStaffData(user.sub),
        ]);
        studentCount = studentData?.count || 0;
        teacherCount = teacherData?.count || 0;
        staffCount = staffData?.count || 0;
        setTotalUsers(studentCount + teacherCount + staffCount);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    handleSelect(select);
  }, [select]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderMessageCard = () => {
    if (select === 1 && selectedStudent) {
      return <MessageCard onClose={closeModal} selectedStudent={selectedStudent} />;
    } else if (select === 2 && selectedTeacher) {
      return <TeacherMessageCard onClose={closeModal} selectedTeacher={selectedTeacher} />;
    } else if (select === 3 && selectedStaff) {
      return <StaffMessageCard onClose={closeModal} selectedStaff={selectedStaff} />;
    } else if (select === 4) {
      // Handle the case for sending messages to all users
      return (
        <>
          <AllMessageCard onClose={closeModal} />

        </>
      );
    }
    return null;
  };

  const handleMessageButtonClick = () => {
    if ((select === 1 && selectedStudent) || (select === 2 && selectedTeacher) || (select === 3 && selectedStaff)) {
      openModal();
    } else if (select === 4) {
      // Open modal for all users
      openModal();
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between px-5">
          <h1 className="text-black text-lg font-medium">Total Users: {totalUsers}</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select
              className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select</option>
            </select>
          </div>
        </div>

        {/* Tabs for Students, Teachers, Staffs, and All */}
        <div className="h-20 w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
          <button
            onClick={() => handleSelect(1)}
            className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Students
          </button>
          <button
            onClick={() => handleSelect(2)}
            className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleSelect(3)}
            className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Staffs
          </button>
          <button
            onClick={() => handleSelect(4)} // New tab for All
            className={`${select === 4 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            All
          </button>
        </div>

        <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
          <div className="h-20 w-full flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1 className="text-black font-semibold">Show</h1>
              <select className="h-6 w-16 border border-gray-300 rounded-md">
                <option>10</option>
              </select>
              <h1 className="text-black font-semibold">Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1 className="text-black font-semibold">Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 border-gray-300">
                <CiSearch size={25} color="gray" />
                <input
                  type="text"
                  className="text-md text-gray-500 outline-none ml-2"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
              <button
                role="dialog"
                className="text-blue-500 underline text-lg font-semibold"
                onClick={handleMessageButtonClick}
                disabled={
                  select === 1
                    ? !selectedStudent
                    : select === 2
                      ? !selectedTeacher
                      : select === 3
                        ? !selectedStaff
                        : false // Enable for "All" users
                }
              >
                Message
              </button>
              {isModalOpen && renderMessageCard()}
            </div>
          </div>

          <div className="flex flex-col">
            {select === 1 && (
              <CommunicationTable filter={filter} searchTerm={searchTerm} setSelectedStudent={setSelectedStudent} />
            )}
            {select === 2 && (
              <TeacherTable filter={filter} searchTerm={searchTerm} setSelectedTeacher={setSelectedTeacher} />
            )}
            {select === 3 && (
              <StaffTable filter={filter} searchTerm={searchTerm} setSelectedStaff={setSelectedStaff} />
            )}
            {select === 4 && (
              <AllUserTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}


// import { useState, useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import CommunicationTable from "./CommunicationTable";
// import { SlRefresh } from "react-icons/sl";
// import MessageCard from "./MessageCard";
// import TeacherMessageCard from "./TeacherMessageCard";
// import StaffMessageCard from "./StaffMessageCard"; // Import StaffMessageCard
// import TeacherTable from "./TeacherTable";
// import StaffTable from "./StaffTable";
// import { fetchCountData } from "../../../../api/api";
// import { fetchCountStaffData } from "../../../../api/staffapi";
// import { fetchCountTeacherData } from "../../../../api/teacherapi";

// export default function Communication() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filter, setFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [select, setSelect] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   const handleSelect = async (value) => {
//     setSelect(value);
//     let fetchData;
//     if (value === 1) {
//       fetchData = fetchCountData;
//     } else if (value === 2) {
//       fetchData = fetchCountTeacherData;
//     } else if (value === 3) {
//       fetchData = fetchCountStaffData;
//     }

//     try {
//       const data = await fetchData();
//       setTotalUsers(data?.count || 0);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//     }
//   };

//   useEffect(() => {
//     handleSelect(select);
//   }, [select]);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const renderMessageCard = () => {
//     if (select === 1 && selectedStudent) {
//       return <MessageCard onClose={closeModal} selectedStudent={selectedStudent} />;
//     } else if (select === 2 && selectedTeacher) {
//       return <TeacherMessageCard onClose={closeModal} selectedTeacher={selectedTeacher} />;
//     } else if (select === 3 && selectedStaff) {
//       return <StaffMessageCard onClose={closeModal} selectedStaff={selectedStaff} />;
//     }
//     return null;
//   };

//   const handleMessageButtonClick = () => {
//     if (select === 1 && selectedStudent) {
//       openModal();
//     } else if (select === 2 && selectedTeacher) {
//       openModal();
//     } else if (select === 3 && selectedStaff) {
//       openModal();
//     }
//   };

//   return (
//     <>
//       <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
//         <div className="h-12 w-full flex flex-row items-center justify-between px-5">
//           <h1 className="text-black text-lg font-medium">Total Users: {totalUsers}</h1>
//           <div className="flex flex-row gap-2">
//             <h1 className="text-black text-lg font-medium">Filter</h1>
//             <select
//               className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="">Select</option>
//             </select>
//           </div>
//         </div>

//         {/* Tabs for Students, Teachers, Staffs */}
//         <div className="h-20 w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
//           <button
//             onClick={() => handleSelect(1)}
//             className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
//           >
//             Students
//           </button>
//           <button
//             onClick={() => handleSelect(2)}
//             className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
//           >
//             Teachers
//           </button>
//           <button
//             onClick={() => handleSelect(3)}
//             className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
//           >
//             Staffs
//           </button>
//         </div>

//         <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
//           <div className="h-20 w-full flex flex-row items-center justify-between px-5">
//             <div className="flex flex-row gap-5">
//               <h1 className="text-black font-semibold">Show</h1>
//               <select className="h-6 w-16 border border-gray-300 rounded-md">
//                 <option>10</option>
//               </select>
//               <h1 className="text-black font-semibold">Entries</h1>
//               <div className="flex flex-row gap-2 items-center justify-center">
//                 <SlRefresh />
//                 <h1 className="text-black font-semibold">Refresh</h1>
//               </div>
//             </div>
//             <div className="flex flex-row gap-2">
//               <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 border-gray-300">
//                 <CiSearch size={25} color="gray" />
//                 <input
//                   type="text"
//                   className="text-md text-gray-500 outline-none ml-2"
//                   placeholder="Search"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <div className="flex flex-row gap-1">
//                 <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
//                   <FaAngleLeft color="black" size={25} />
//                 </button>
//                 <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
//                   1
//                 </button>
//                 <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
//                   <FaAngleRight color="black" size={25} />
//                 </button>
//               </div>
//               <button
//                 role="dialog"
//                 className="text-blue-500 underline text-lg font-semibold"
//                 onClick={handleMessageButtonClick}
//                 disabled={select === 1 ? !selectedStudent : select === 2 ? !selectedTeacher : !selectedStaff}
//               >
//                 Message
//               </button>
//               {isModalOpen && renderMessageCard()}
//             </div>
//           </div>

//           <div className="flex flex-col">
//             {select === 1 && (
//               <CommunicationTable filter={filter} searchTerm={searchTerm} setSelectedStudent={setSelectedStudent} />
//             )}
//             {select === 2 && (
//               <TeacherTable filter={filter} searchTerm={searchTerm} setSelectedTeacher={setSelectedTeacher} />
//             )}
//             {select === 3 && (
//               <StaffTable filter={filter} searchTerm={searchTerm} setSelectedStaff={setSelectedStaff} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



{/*
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CommunicationTable from "./CommunicationTable";
import { SlRefresh } from "react-icons/sl";
import MessageCard from "./MessageCard";
import TeacherTable from "./TeacherTable";
import StaffTable from "./StaffTable";
import { fetchCountData } from "../../../../api/api";
import { fetchCountStaffData } from "../../../../api/staffapi";
import { fetchCountTeacherData } from "../../../../api/teacherapi";

export default function Communication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student ID

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        {/* Header Section *
        <div className="h-12 w-full flex flex-row items-center justify-between px-5">
          <h1 className="text-black text-lg font-medium">Total Users: {totalUsers}</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select
              className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Select</option>
              {/* Add options based on your filter criteria 
            </select>
          </div>
        </div>

        {/* Tabs for Students, Teachers, Staffs *
        <div className="h-20 w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
          <button
            onClick={() => handleSelect(1)}
            className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"
              } font-medium underline-offset-4`}
          >
            Students
          </button>
          <button
            onClick={() => handleSelect(2)}
            className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"
              } font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleSelect(3)}
            className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"
              } font-medium underline-offset-4`}
          >
            Staffs
          </button>
        </div>

        {/* Table and Control Section *
        <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
          {/* Top Controls *
          <div className="h-20 w-full flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1 className="text-black font-semibold">Show</h1>
              <select className="h-6 w-16 border border-gray-300 rounded-md">
                <option>10</option>
                {/* Add more options based on your pagination needs *
              </select>
              <h1 className="text-black font-semibold">Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1 className="text-black font-semibold">Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              {/* Search Input *
              <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 border-gray-300">
                <CiSearch size={25} color="gray" />
                <input
                  type="text"
                  className="text-md text-gray-500 outline-none ml-2"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Pagination Buttons *
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
              {/* Message Button *
              <button
                className="text-blue-500 underline text-lg font-semibold"
                onClick={() => setSelectedStudent(null) || openModal()}
                disabled={!selectedStudent} // Disable if no student is selected
              >
                Message
              </button>
              {/* Render MessageCard if Modal is Open *
              {isModalOpen && (
                <MessageCard
                  onClose={closeModal}
                  selectedStudent={selectedStudent}
                />
              )}
            </div>
          </div>

          {/* Render Table based on Selection *
          <div className="flex flex-col">
            {select === 1 && (
              <CommunicationTable
                filter={filter}
                searchTerm={searchTerm}
                setSelectedStudent={setSelectedStudent}
              />
            )}
            {select === 2 && (
              <TeacherTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 3 && (
              <StaffTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

{/*
import { useState, useEffect } from "react";

import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CommunicationTable from "./CommunicationTable";

import { SlRefresh } from "react-icons/sl";
import MessageCard from "./MessageCard";
import TeacherTable from "./TeacherTable";
import StaffTable from "./StaffTable";

import { fetchCountData } from "../../../../api/api";
import { fetchCountStaffData } from "../../../../api/staffapi";
import { fetchCountTeacherData } from "../../../../api/teacherapi";

export default function Communication() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [select, setSelect] = useState(1);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between px-5">
          <h1 className="text-black text-lg font-medium">Total Users: {totalUsers}</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>

        <div className="h-20  w-full border border-gray-300 flex flex-row gap-6 p-2 py-4 rounded-lg">
          <button
            onClick={() => handleSelect(1)}
            className={`${select === 1 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Students
          </button>
          <button
            onClick={() => handleSelect(2)}
            className={`${select === 2 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Teachers
          </button>
          <button
            onClick={() => handleSelect(3)}
            className={`${select === 3 ? "text-blue-500 underline" : "text-gray-500 underline"} font-medium underline-offset-4`}
          >
            Staffs
          </button>
        </div>

        <div className="h-auto w-full flex flex-col rounded-lg  border border-gray-300">
          <div className="h-20 w-full flex flex-row items-center justify-between px-5">
            <div className="flex flex-row gap-5">
              <h1 className="text-black font-semibold">Show</h1>
              <select className="h-6 w-16 border border-gray-300 rounded-md">
                <option>10</option>
              </select>
              <h1 className="text-black font-semibold">Entries</h1>
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlRefresh />
                <h1 className="text-black font-semibold">Refresh</h1>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="h-10 w-64 rounded-lg border flex flex-row  items-center p-2  border-gray-300">
                <CiSearch size={25} color="gray" />
                <h1 className="text-md text-gray-500">Search</h1>
              </div>
              <div className="flex flex-row gap-1">
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
                  <FaAngleLeft color="black" size={25} />
                </button>
                <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
                  1
                </button>
                <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
                  <FaAngleRight color="black" size={25} />
                </button>
              </div>
              <button
                className="text-blue-500 underline text-lg font-semibold"
                onClick={openModal}
              >
                Message
              </button>
              {isModalOpen && <MessageCard onClose={closeModal} />}
            </div>
          </div>
          <div className="flex flex-col">
            {select === 1 && (
              <CommunicationTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 2 && (
              <TeacherTable filter={filter} searchTerm={searchTerm} />
            )}
            {select === 3 && (
              <StaffTable filter={filter} searchTerm={searchTerm} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
  */}
