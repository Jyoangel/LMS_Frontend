"use client";


import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SlRefresh } from "react-icons/sl";
import CourseTable from "./CourseTable";
import { fetchCourseData } from "../../../../api/courseapi"; // api to fetch course data 
import { importCourseData } from "../../../../api/courseapi"; // api to import course data 

export default function Course() {
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCourses, setTotalCourses] = useState(0);
  const [message, setMessage] = useState(""); // For displaying success/error messages
  const fileInputRef = useRef(null); // Reference to the file input


  // use to call api to fetch coursecount 
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await fetchCourseData();
        setTotalCourses(data.count);
      } catch (error) {
        console.error("Failed to fetch courses data:", error);
      }
    }

    loadCourses();
  }, []);

  // Handle file selection and upload
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      try {
        const result = await importCourseData(selectedFile);
        setMessage(result.message || 'Courses imported successfully!');
        // Optionally refresh the courses data
        const data = await fetchCourseData();
        setTotalCourses(data.count);
      } catch (error) {
        setMessage(`Error importing course data: ${error.message}`);
      }
    }
  };

  // Trigger file input dialog
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-6 p-5">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-base font-medium">Total Courses: {totalCourses}</h1>
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
            <Link href={"/teacherspanel/Course/CourseDetails"}>
              <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
                Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
          <div className="h-20 w-full flex flex-row items-center justify-between px-5">
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
              <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 gap-3 border-gray-300">
                <CiSearch size={20} />
                <h1>Search</h1>
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
            </div>
          </div>
          <div className="flex flex-col">
            <CourseTable filter={filter} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </>
  );
}
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
// import { SlRefresh } from "react-icons/sl";
// import CourseTable from "./CourseTable";

// export default function CourseMTable() {
//   const [filter, setFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [totalCourses, setTotalCourses] = useState(0);

//   useEffect(() => {
//     async function loadCourses() {
//       try {
//         const data = await fetchCourseData();
//         setTotalCourses(data.count); // Updated to use data.count
//       } catch (error) {
//         console.error("Failed to fetch courses data:", error);
//       }
//     }

//     loadCourses();
//   }, []);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleImportClick = async () => {
//     if (selectedFile) {
//       try {
//         const formData = new FormData();
//         formData.append("file", selectedFile);

//         const response = await importCourses(formData);
//         console.log('Import response:', response);
//         // Optionally update UI or show success message
//       } catch (error) {
//         console.error('Error importing courses:', error);
//         // Optionally handle error or show error message
//       }
//     } else {
//       console.warn('No file selected.');
//       // Optionally handle case where no file is selected
//     }
//   };

//   return (
//     <>
//       <div className="h-screen w-full flex flex-col gap-6 p-5">
//         {/* total no */}
//         <div className="w-full flex items-center justify-between">
//           <h1 className="text-base font-medium">Total Course: {totalCourses}</h1>
//           <div className="flex items-center justify-center gap-5">
//             <label htmlFor="fileInput" className="text-base font-semibold text-blue-500 underline cursor-pointer">
//               Import
//             </label>
//             <input
//               id="fileInput"
//               type="file"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//             <Link href={"/AdminDashboard/CourseManagement/CourseDetail"}>
//               <button className="text-base font-semibold text-white bg-blue-500 px-4 py-2 rounded-lg">
//                 Add New
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* table */}
//         <div className="h-auto w-full flex flex-col rounded-lg border border-gray-300">
//           <div className="h-20 w-full flex flex-row items-center justify-between px-5">
//             <div className="flex flex-row gap-5">
//               <h1>Show</h1>
//               <select className="h-6 w-12">
//                 <option>10</option>
//               </select>
//               <h1>Entries</h1>
//               <div className="flex flex-row gap-2 items-center justify-center">
//                 <SlRefresh />
//                 <h1>Refresh</h1>
//               </div>
//             </div>
//             <div className="flex flex-row gap-2">
//               <div className="h-10 w-64 rounded-lg border flex flex-row items-center p-2 gap-3 border-gray-300">
//                 <CiSearch size={20} />
//                 <h1>Search</h1>
//               </div>
//               <div className="flex flex-row gap-1">
//                 <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center" aria-label="left">
//                   <FaAngleLeft color="black" size={25} />
//                 </button>
//                 <button className="h-10 w-12 bg-white border border-gray-300 rounded-md text-xl">
//                   1
//                 </button>
//                 <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center " aria-label="right">
//                   <FaAngleRight color="black" size={25} />
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <CourseTable filter={filter} searchTerm={searchTerm} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }




