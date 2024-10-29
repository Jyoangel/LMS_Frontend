"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Successcard from "@/Components/Successcard";
import { addAdmitCardData } from "../../../../../api/reportcardapi"; // api to add admit card data 
import { checkUserRole } from "../../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AdmitCard() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();



  // Check user role and retrieve userId
  useEffect(() => {
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

  const [formData, setFormData] = useState({

    examination: "",
    userId: userId,
    class: "",
    startdate: "",
    enddate: "",
    examstarting_time: "",
    examending_time: "",
    examsubjects: [{ subject: "", examination_date: "" }],
  });




  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const newSubjects = formData.examsubjects.slice();
    newSubjects[index] = { ...newSubjects[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      examsubjects: newSubjects,
    }));
  };

  const addSubjectField = () => {
    setFormData((prevData) => ({
      ...prevData,
      examsubjects: [...prevData.examsubjects, { subject: "", examination_date: "" }],
    }));
  };

  // use to submit and call api to add admitcard 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.examination || !formData.class || !formData.startdate || !formData.enddate || !formData.examstarting_time || !formData.examending_time) {
      alert("Please fill out all required fields.");
      return;
    }

    // Validate subjects
    for (const subject of formData.examsubjects) {
      if (!subject.subject || !subject.examination_date) {
        alert("Please complete all subject fields.");
        return;
      }
    }
    console.log('Form Data:', formData);
    try {
      const result = await addAdmitCardData(formData);
      console.log('Server Response:', result);
      setFormData(formData);
      openModal();
    } catch (error) {
      console.error('Failed to add admit card data:', error);
      if (error.response && error.response.status === 400) {
        alert('Invalid data. Please check your input.');
      } else {
        alert('Failed to add admit card data. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/teacherspanel/ReportCard"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10" data-testid="form">
          {/* Student Details */}
          <div className="flex flex-col gap-8">
            <div className="w-full grid grid-cols-3 items-center gap-5">


              {/* Examination */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="examination" className="text-lg font-normal text-black">
                  Examination*
                </label>
                <input
                  id="examination"
                  type="text"
                  name="examination"
                  value={formData.examination}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>



              {/* Class*/}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="class" className="text-lg font-normal text-black">Class*</label>
                <input
                  id="class"
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="startdate" className="text-lg font-normal text-black">
                  Start Date*
                </label>
                <input
                  id="startdate"
                  type="date"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="enddate" className="text-lg font-normal text-black">
                  End Date*
                </label>
                <input
                  id="enddate"
                  type="date"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Exam Starting Time */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="examstarting_time" className="text-lg font-normal text-black">
                  Exam Starting Time*
                </label>
                <input
                  id="examstarting_time"
                  type="text"
                  name="examstarting_time"
                  value={formData.examstarting_time}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Exam Ending Time */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="examending_time" className="text-lg font-normal text-black">
                  Exam Ending Time*
                </label>
                <input
                  id="examending_time"
                  type="text"
                  name="examending_time"
                  value={formData.examending_time}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                />
              </div>
            </div>

            <h1 className="text-black text-xl font-semibold">Add Exam Subject</h1>
            {formData.examsubjects.map((subject, index) => (
              <div key={index} className="w-full grid grid-cols-3 items-center gap-5">
                {/* Subject */}
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor={`subject_${index}`} className="text-lg font-normal text-black">Subject*</label>
                  <input
                    id={`subject_${index}`}
                    type="text"
                    name="subject"
                    value={subject.subject}
                    onChange={(e) => handleSubjectChange(index, e)}
                    placeholder="Type here"
                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  />
                </div>

                {/* Examination Date */}
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor={`examination_date_${index}`} className="text-lg font-normal text-black">
                    Examination Date*
                  </label>
                  <input
                    id={`examination_date_${index}`}
                    type="date"
                    name="examination_date"
                    value={subject.examination_date}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addSubjectField}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-96"
            >
              Add Subject
            </button>
          </div>

          <div className="w-full flex ">
            <button
              role="button"
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
          {isSelectOpen && (
            <Successcard onClose={closeModal} para={"Student added successfully!"} url={"/teacherspanel/ReportCard"} />
          )}
        </form>
      </div>

    </>
  );
}
