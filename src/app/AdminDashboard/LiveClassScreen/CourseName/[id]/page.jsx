"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchCourseById } from "../../../../../../api/courseapi"; // fetch api for specific course 
import { format } from "date-fns";



export default function CourseName({ params }) {
  const { id } = params;
  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // use to fetch  cour se data 
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>No course data found</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col p-5 gap-10">
      {/* buttons */}
      <Link href={"/AdminDashboard/LiveClassScreen"}>
        <div className="flex w-full justify-between items-center ">
          <button className="flex items-center justify-center gap-2">
            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
            <h1 className="text-lg font-semibold">Back</h1>
          </button>

          <div className="flex gap-3 items-center justify-center">
            <div className="flex items-center justify-center gap-1">
              <button className="text-blue-400 text-lg font-medium">
                Edit
              </button>{" "}
              <h1 className="text-gray-300 ">|</h1>
              <button className="text-red-500 text-lg font-medium">
                Delete
              </button>
            </div>

            <Link href={`/AdminDashboard/LiveClassScreen/AddLiveClasses/${id}`}>
              <button className="w-36 h-10 rounded-lg bg-blue-500 text-sm font-medium text-white">
                Add Live Classes
              </button>
            </Link>
          </div>
        </div>
      </Link>

      {/* course details */}
      <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
        <div className="w-full h-12 px-5 flex items-center bg-blue-200">
          <h1 className="text-blue-600 font-semibold ">Course Details</h1>
        </div>

        <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
          {/* course name */}
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
              <h1 className="text-gray-400 font-normal text-lg">
                Course Name
              </h1>
              <h1 className="text-gray-400 font-normal text-lg">
                Course Code
              </h1>
              <h1 className="text-gray-400 font-normal text-lg">
                Course Description
              </h1>
              <h1 className="text-gray-400 font-normal text-lg">
                Instruction Name
              </h1>
              <h1 className="text-gray-400 font-normal text-lg  ">
                Instruction Email
              </h1>
            </div>
            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
              <h1 className="text-black font-medium text-lg">
                {course.courseName}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {course.courseCode}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {course.courseDescription}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {course.primaryInstructorname}
              </h1>
              <h1 className="text-black font-medium text-lg  ">
                {course.instructorEmail}
              </h1>
            </div>
          </div>

          {/* start date */}
          <div className="flex flex-col gap-2 w-full">
            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
              <h1 className="text-gray-400 font-normal text-lg">
                Start Date
              </h1>
              <h1 className="text-gray-400 font-normal text-lg">End Date</h1>
              <h1 className="text-gray-400 font-normal text-lg">
                Class Time
              </h1>
              <h1 className="text-gray-400 font-normal text-lg">
                Supplementary Materials
              </h1>
              <h1 className="text-gray-400 font-normal text-lg  ">
                Course Objectives
              </h1>
            </div>
            <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
              <h1 className="text-black font-medium text-lg">
                {format(new Date(course.schedule.startDate), "yyyy-MM-dd")}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {format(new Date(course.schedule.endDate), "yyyy-MM-dd")}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {course.schedule.classTime}
              </h1>
              <h1 className="text-black font-medium text-lg">
                {course.supplementaryMaterials}
              </h1>
              <h1 className="text-black font-medium text-lg  ">
                {course.courseObjectives}
              </h1>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="w-full grid grid-cols-1 items-center  gap-5">
              <h1 className="text-gray-400 font-normal text-lg">
                Online Resources
              </h1>
            </div>
            <div className="w-full grid grid-cols-1 items-center gap-5">
              <h1 className="text-black font-medium text-lg">
                {course.onlineResources}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Assuming fetchCourseById is defined in another file, here's an example:
// export async function fetchCourseById(id) {
//   const res = await fetch(`http://localhost:5000/api/course/get/${id}`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch course data');
//   }

//   return res.json();
// }


{/*import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CourseName() {
  return (
    <>
      <div className="h-screen   w-full flex flex-col p-5 gap-10">
        
        <Link href={"/AdminDashboard/LiveClassScreen"}>
          <div className="flex w-full justify-between items-center ">
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>

            <div className="flex gap-3 items-center justify-center">
              <div className="flex items-center justify-center gap-1">
                <button className="text-blue-400 text-lg font-medium">
                  Edit
                </button>{" "}
                <h1 className="text-gray-300 ">|</h1>
                <button className="text-red-500 text-lg font-medium">
                  Delete
                </button>
              </div>

              <Link href={"/AdminDashboard/LiveClassScreen/AddLiveClasses"}>
                <button className="w-36 h-10 rounded-lg bg-blue-500 text-sm font-medium text-white">
                  Add Live Classes
                </button>
              </Link>
            </div>
          </div>
        </Link>

        
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">Course Details</h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg">
            
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">
                  Course Name
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Course Code
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Course Description
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Instruction Name
                </h1>
                <h1 className="text-gray-400 font-normal text-lg  ">
                  Instruction Email
                </h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">
                  Course Name 1
                </h1>
                <h1 className="text-black font-medium text-lg">59786</h1>
                <h1 className="text-black font-medium text-lg">59786</h1>
                <h1 className="text-black font-medium text-lg">
                  Kamlesh Kumar
                </h1>
                <h1 className="text-black font-medium text-lg  ">
                  Example@gmail.com
                </h1>
              </div>
            </div>

           
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-gray-400 font-normal text-lg">
                  Start Date
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">End Date</h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Class Time
                </h1>
                <h1 className="text-gray-400 font-normal text-lg">
                  Supplementary Materials
                </h1>
                <h1 className="text-gray-400 font-normal text-lg  ">
                  Course Objectives
                </h1>
              </div>
              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                <h1 className="text-black font-medium text-lg">27-05-24</h1>
                <h1 className="text-black font-medium text-lg">27-05-24</h1>
                <h1 className="text-black font-medium text-lg">
                  10: 00 AM to 11: 00 AM
                </h1>
                <h1 className="text-black font-medium text-lg">Dummy</h1>
                <h1 className="text-black font-medium text-lg  ">Dummy</h1>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full grid grid-cols-1 items-center  gap-5">
                <h1 className="text-gray-400 font-normal text-lg">
                  Online Resources
                </h1>
              </div>
              <div className="w-full grid grid-cols-1 items-center gap-5">
                <h1 className="text-black font-medium text-lg">27-05-24</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
  */}
