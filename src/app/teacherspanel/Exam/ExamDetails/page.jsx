"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Successcard from "@/Components/Successcard";
import { addExamData } from "../../../../../api/examapi"; // API to add exam data
import { checkUserRole } from "../../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function ExamDetails() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();
  const [formData, setFormData] = useState({
    type: "",
    examTitle: "",
    subject: "",
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    instruction: "",
    totalMarks: "",
    passingMarks: "",
    userId: "", // Initially set as an empty string
  });

  const [questionPaperFile, setQuestionPaperFile] = useState(null); // For handling file input


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
          console.error("User not found or does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    }

    getUserRole();
  }, [user]);

  // Update formData with userId when userId is fetched
  useEffect(() => {
    if (userId) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: userId,
      }));
    }
  }, [userId]);
  // Handle form input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData state
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value, // Update the specific form field with its new value
      };

      // Calculate the duration if startTime and endTime are available
      if (name === 'startTime' || name === 'endTime') {
        const { startTime, endTime } = updatedData;

        if (startTime && endTime) {
          const start = new Date(`1970-01-01T${startTime}:00`);
          const end = new Date(`1970-01-01T${endTime}:00`);

          if (end > start) {
            const diffMs = end - start; // Difference in milliseconds
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            updatedData.duration = `${diffHours}h ${diffMinutes}m`;
          } else {
            updatedData.duration = '';
          }
        } else {
          updatedData.duration = '';
        }
      }

      return updatedData;
    });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setQuestionPaperFile(e.target.files[0]); // Get the first selected file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    for (const key in formData) {
      if (formData[key] === "" && key !== 'duration') {
        alert(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
        return;
      }
    }

    // Ensure the end time is later than the start time
    if (new Date(`${formData.date}T${formData.endTime}`) <= new Date(`${formData.date}T${formData.startTime}`)) {
      alert('End time must be later than start time.');
      return; // Stop form submission if time validation fails
    }

    // Create a FormData object to include the file and form fields
    const examData = new FormData();
    Object.keys(formData).forEach((key) => {
      examData.append(key, formData[key]);
    });

    if (questionPaperFile) {
      examData.append("uploadQuestionPaper", questionPaperFile); // Append the file
    }

    // // Include userId in the form data
    // if (userId) {
    //   examData.set("userId", userId); // Set the userId if available
    // } else {
    //   alert('User ID not set. Please make sure you are logged in.');
    //   return;
    // }

    try {
      await addExamData(examData); // Send the FormData object
      setIsSelectOpen(true); // Show success modal
    } catch (error) {
      console.error("Failed to add exam data:", error);
      alert('Failed to add exam data. Please try again.');
    }
  };



  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/teacherspanel/Exam"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <div className="w-full grid grid-cols-3 items-center gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="type" className="text-lg font-normal text-black">Type*</label>
                <input
                  id="type"
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="examTitle" className="text-lg font-normal text-black">
                  Exam Title*
                </label>
                <input
                  id="examTitle"
                  type="text"
                  name="examTitle"
                  value={formData.examTitle}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="subject" className="text-lg font-normal text-black">Subject*</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="date" className="text-lg font-normal text-black">Date*</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="startTime" className="text-lg font-normal text-black">Start Time*</label>
                <input
                  id="startTime"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="endTime" className="text-lg font-normal text-black">End Time*</label>
                <input
                  id="endTime"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="duration" className="text-lg font-normal text-black">Duration*</label>
                <input
                  id="duration"
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="totalMarks" className="text-lg font-normal text-black">Total Marks*</label>
                <input
                  id="totalMarks"
                  type="text"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="passingMarks" className="text-lg font-normal text-black">Passing Marks*</label>
                <input
                  id="passingMarks"
                  type="text"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="instruction" className="text-lg font-normal text-black">Instruction*</label>
              <textarea
                id="instruction"
                type="text"
                name="instruction"
                value={formData.instruction}
                onChange={handleChange}
                placeholder="Type here"
                className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="uploadQuestionPaper" className="text-lg font-normal text-black">Upload Question Paper*</label>
            <input
              id="uploadQuestionPaper"
              type="file"
              name="uploadQuestionPaper"
              value={formData.uploadQuestionPaper}
              onChange={handleFileChange}
              placeholder="Upload"
              className="h-20 border border-gray-300 bg-gray-200 rounded-md w-full py-3 text-blue-500 px-5 outline-none"
            />
          </div>

          <div className="flex gap-5 pb-10">
            <button
              type="submit"
              className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-44 text-black border border-gray-400 font-medium text-lg p-2"
              onClick={() => {
                setFormData({
                  type: "",
                  examTitle: "",
                  subject: "",
                  date: "",
                  startTime: "",
                  endTime: "",
                  duration: "",
                  instruction: "",
                  totalMarks: "",
                  passingMarks: "",
                });
                setQuestionPaperFile(null); // Clear the file input
              }}
            >
              Cancel
            </button>
          </div>
          {isSelectOpen && (
            <Successcard
              onClose={() => setIsSelectOpen(false)}
              para={"Exam added successfully!"}
              url={"/teacherspanel/Exam"}
            />
          )}
        </form>
      </div>
    </>
  );
}

{/*
import { useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Successcard from "@/Components/Successcard";
import { addSExamData } from "../../../../../api/examapi"; // Update the path to where the addSExamData function is located

export default function ExamDetails() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    examTitle: "",
    subject: "",
    date: "",
    startTime: "",
    duration: "",
    instruction: "",
    totalMarks: "",
    passingMarks: "",
    uploadQuestionPaper: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSExamData(formData);
      setIsSelectOpen(true);
    } catch (error) {
      console.error("Failed to add exam data:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/teacherspanel/Exam"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex flex-col gap-8">
            <div className="w-full grid grid-cols-3 items-center gap-5">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Type*</label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Exam Title*
                </label>
                <input
                  type="text"
                  name="examTitle"
                  value={formData.examTitle}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Subject*</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Date*</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Start Time*</label>
                <input
                  type="text"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                >

                </input>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Duration*</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Instruction*</label>
                <input
                  type="text"
                  name="instruction"
                  value={formData.instruction}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Total Marks*</label>
                <input
                  type="text"
                  name="totalMarks"
                  value={formData.totalMarks}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Passing Marks*</label>
                <input
                  type="text"
                  name="passingMarks"
                  value={formData.passingMarks}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-black">Upload Question Paper*</label>
            <input
              type="file"
              name="uploadQuestionPaper"
              value={formData.uploadQuestionPaper}
              onChange={handleChange}
              placeholder="Upload"
              className="h-20 border border-gray-300 bg-gray-200 rounded-md w-full py-3 text-blue-500 px-5 outline-none"
            />
          </div>

          <div className="flex gap-5 pb-10">
            <button
              type="submit"
              className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-44 text-black border border-gray-400 font-medium text-lg p-2"
              onClick={() => setFormData({
                type: "",
                examTitle: "",
                subject: "",
                date: "",
                startTime: "",
                duration: "",
                instruction: "",
                totalMarks: "",
                passingMarks: "",
                uploadQuestionPaper: "",
              })}
            >
              Cancel
            </button>
          </div>
          {isSelectOpen && (
            <Successcard
              onClose={() => setIsSelectOpen(false)}
              para={"Exam added successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}


{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";

//import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import SubmitButton from "../SubmitButton";
import { addSExamData } from "../../../../../api/examapi";

export default function ExamDetails() {
  //const [isSelectOpen, setisSelectOpen] = useState(false);

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/teacherspanel/Exam"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        

        <form action={addSExamData} className="flex flex-col gap-10">
         
          <div className="flex flex-col gap-8">
            <div className="w-full grid grid-cols-3 items-center gap-5">
              
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Type*</label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Exam Title*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Subject*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">Date*</label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

             
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Start Time*
                </label>
                <input
                  type="text"
                  name="starttime"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />


              </div>

              
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Duration*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              }
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Instruction*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Total Marks*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Passing Maarks*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>{" "}
          </div>
           {/*
          Course Description*
          <div className="w-full flex items-center justify-center">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer h-[90px] w-full bg-blue-200 border-dashed border-4  p-4 rounded-lg  flex items-center justify-center"
            >
              <div className="flex flex-col ">
                <span className="text-md text-blue-600 underline ">
                  Upload Documents/Picture
                </span>
                <span className="text-md text-blue-600 ">
                  .pdf .PNG .JPG . JPEG
                </span>
              </div>

              <input
                id="file-upload"
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"

              />
            </label>
          </div>
          


          <div className="flex gap-5 pb-10">
            <SubmitButton title={"SUBMIT"} textColor={"text-blue-500"} />
            <button className="w-44   text-black border border-gray-400 font-medium text-lg p-2  ">
              Cancle
            </button>
          </div>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Course added successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}
  */}
