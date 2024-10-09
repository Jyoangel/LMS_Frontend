"use client";

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addCourseData } from "../../../../../api/courseapi"; // api to add course data 

export default function CourseDetail() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    primaryInstructorname: '',
    instructorEmail: '',
    schedule: {
      startDate: '',
      endDate: '',
      classDays: [],
      classTime: ''
    },
    courseObjectives: '',
    supplementaryMaterials: '',
    onlineResources: '',
    courseDescription: '',
    uploadCourse: null,
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };



  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      schedule: {
        ...prevData.schedule,
        [name]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      uploadCourse: e.target.files[0], // Update file input to handle files
    });
  };

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  // use to submit form and call api to add course data 

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Course Data:', courseData);

    // Client-side validation (optional)
    if (!courseData.courseName || !courseData.courseCode || !courseData.primaryInstructorname || !courseData.instructorEmail || !courseData.schedule.startDate || !courseData.schedule.endDate || !courseData.courseDescription) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('courseName', courseData.courseName);
    formData.append('courseCode', courseData.courseCode);
    formData.append('primaryInstructorname', courseData.primaryInstructorname);
    formData.append('instructorEmail', courseData.instructorEmail);
    formData.append('schedule[startDate]', courseData.schedule.startDate);
    formData.append('schedule[endDate]', courseData.schedule.endDate);
    formData.append('schedule[classDays]', JSON.stringify(courseData.schedule.classDays));
    formData.append('schedule[classTime]', courseData.schedule.classTime);
    formData.append('courseObjectives', courseData.courseObjectives);
    formData.append('supplementaryMaterials', courseData.supplementaryMaterials);
    formData.append('onlineResources', courseData.onlineResources);
    formData.append('courseDescription', courseData.courseDescription);

    // If there's a file to upload
    if (courseData.uploadCourse) {
      formData.append("uploadCourse", courseData.uploadCourse);
    }

    try {
      await addCourseData(formData);
      console.log('Course created successfully');

      // Reset form data and file input
      setCourseData({
        courseName: '',
        courseCode: '',
        primaryInstructorname: '',
        instructorEmail: '',
        schedule: {
          startDate: '',
          endDate: '',
          classDays: [],
          classTime: ''
        },
        courseObjectives: '',
        supplementaryMaterials: '',
        onlineResources: '',
        courseDescription: '',
        uploadCourse: null
      });

      openModal();
    } catch (error) {
      // Handle and display the error message
      alert(`Error: ${error.message}`);
    }
  };


  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Course"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form action="#" className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Course Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              {/* Input fields */}
              {/* ... other input fields as you already have them */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="courseName" className="text-lg font-normal text-black">
                  Course Name*
                </label>
                <input
                  type="text"
                  id="courseName"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="courseCode" className="text-lg font-normal text-black">
                  Course Code*
                </label>
                <input
                  type="text"
                  id="courseCode"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="primaryInstructorname" className="text-lg font-normal text-black">
                  Instructor Name*
                </label>
                <input
                  type="text"
                  id="primaryInstructorname"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="primaryInstructorname"
                  value={courseData.primaryInstructorname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="instructorEmail" className="text-lg font-normal text-black">
                  Instructor Email*
                </label>
                <input
                  type="email"
                  id="instructorEmail"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="instructorEmail"
                  value={courseData.instructorEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="startDate" className="text-lg font-normal text-black">
                  Start Date*
                </label>
                <input
                  type="date"
                  id="startDate"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="startDate"
                  value={courseData.schedule.startDate}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="endDate" className="text-lg font-normal text-black">
                  End Date*
                </label>
                <input
                  type="date"
                  id="endDate"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="endDate"
                  value={courseData.schedule.endDate}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="classDays" className="text-lg font-normal text-black">
                  Class Days*
                </label>
                <input
                  type="text"
                  id="classDays"
                  placeholder="Type here (e.g., Monday, Tuesday)"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="classDays"
                  value={courseData.schedule.classDays}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="classTime" className="text-lg font-normal text-black">
                  Class Time*
                </label>
                <input
                  type="text"
                  id="classTime"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="classTime"
                  value={courseData.schedule.classTime}
                  onChange={handleScheduleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="courseObjectives" className="text-lg font-normal text-black">
                Course Objectives*
              </label>
              <textarea
                id="courseObjectives"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="courseObjectives"
                value={courseData.courseObjectives}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="supplementaryMaterials" className="text-lg font-normal text-black">
                Supplementary Materials
              </label>
              <textarea
                id="supplementaryMaterials"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="supplementaryMaterials"
                value={courseData.supplementaryMaterials}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="onlineResources" className="text-lg font-normal text-black">
                Online Resources
              </label>
              <textarea
                id="onlineResources"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="onlineResources"
                value={courseData.onlineResources}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="courseDescription" className="text-lg font-normal text-black">
                Course Description*
              </label>
              <textarea
                id="courseDescription"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="courseDescription"
                value={courseData.courseDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="courseFile" className="text-lg font-normal text-black">
                Upload Course*
              </label>
              <input
                type="file"
                id="courseFile"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                onChange={handleFileChange} // Handle file input
              />
            </div>

            <div className="flex ">
              <button
                role="button"
                type="submit"
                className="bg-blue-600 text-white text-lg font-semibold  py-4 rounded-md w-96">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>

      {isSelectOpen && (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center">
          <Successcard onClose={closeModal} url={"/AdminDashboard/Course"} />
        </div>
      )}
    </>
  );
}




{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addCourseData } from "../../../../../api/courseapi";

export default function CourseDetail() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    courseName: '',
    courseCode: '',
    primaryInstructorname: '',
    instructorEmail: '',
    schedule: {
      startDate: '',
      endDate: '',
      classDays: [],
      classTime: ''
    },
    courseObjectives: '',
    supplementaryMaterials: '',
    onlineResources: '',
    courseDescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'classDays') {
      const daysArray = value.split(',').map(day => day.trim());
      setCourseData({
        ...courseData,
        schedule: {
          ...courseData.schedule,
          [name]: daysArray
        }
      });
    } else if (name === 'classTime') {
      const time = value.replace(/(\d+):(\d+)\s*(AM|PM)/i, (_, h, m, a) => {
        const hour = a.toLowerCase() === 'pm' ? (parseInt(h) % 12) + 12 : parseInt(h) % 12;
        return `${hour.toString().padStart(2, '0')}:${m.padStart(2, '0')}`;
      });
      setCourseData({
        ...courseData,
        schedule: {
          ...courseData.schedule,
          [name]: time
        }
      });
    } else {
      setCourseData({
        ...courseData,
        schedule: {
          ...courseData.schedule,
          [name]: value
        }
      });
    }
  };

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Course Data:', courseData);  // Log course data for debugging

    try {
      await addCourseData(courseData);
      console.log('Course created successfully');
      // Reset form data
      setCourseData({
        courseName: '',
        courseCode: '',
        primaryInstructorname: '',
        instructorEmail: '',
        schedule: {
          startDate: '',
          endDate: '',
          classDays: [],
          classTime: ''
        },
        courseObjectives: '',
        supplementaryMaterials: '',
        onlineResources: '',
        courseDescription: '',
      });
      openModal();
      // You can add code here to refresh the course list in CourseManagementTable if needed
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/UserManagement"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form action="#" className="flex flex-col gap-10" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Course Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Course Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Course Code*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="courseCode"
                  value={courseData.courseCode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Instructor Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="primaryInstructorname"
                  value={courseData.primaryInstructorname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Instructor Email*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="instructorEmail"
                  value={courseData.instructorEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Start Date*
                </label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="startDate"
                  value={courseData.schedule.startDate}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  End Date*
                </label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="endDate"
                  value={courseData.schedule.endDate}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Class Days*
                </label>
                <input
                  type="text"
                  placeholder="Type here (e.g., Monday, Tuesday)"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="classDays"
                  value={courseData.schedule.classDays.join(', ')}
                  onChange={handleScheduleChange}
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Class Time*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  name="classTime"
                  value={courseData.schedule.classTime}
                  onChange={handleScheduleChange}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-lg font-normal text-black">
                Course Objectives*
              </label>
              <textarea
                type="text"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="courseObjectives"
                value={courseData.courseObjectives}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-lg font-normal text-black">
                Supplementary Materials*
              </label>
              <textarea
                type="text"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="supplementaryMaterials"
                value={courseData.supplementaryMaterials}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-lg font-normal text-black">
                Online Resources*
              </label>
              <textarea
                type="text"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="onlineResources"
                value={courseData.onlineResources}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-lg font-normal text-black">
                Course Description*
              </label>
              <textarea
                type="text"
                placeholder="Type here"
                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                name="courseDescription"
                value={courseData.courseDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex gap-5 pb-10">
            <button
              type="submit"
              className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
            >
              Save
            </button>
            <button className="w-44 text-black border border-gray-400 font-medium text-lg p-2">
              Cancel
            </button>
          </div>
        </form>

        {isSelectOpen && (
          <Successcard
            message={"Course Created Successfully"}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
}
*/}
