"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addAssignmentData } from "../../../../../api/assignmentapi"; // api to add assignment data 

export default function AddAssignment() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    assignmentCode: "",
    assignmentTitle: "",
    dueDate: "",
    attachments: "",
    submissionMethod: "",
    marks: "",
    additionalInstruction: "",
    class: "",
    assignTo: "",
    courseDescription: "",
    createdBy: "",
    uploadAssignment: null, // Initialize with null
  });

  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // use to submit  the form and add  call api to add assignment 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = [
      'assignmentCode',
      'assignmentTitle',
      'dueDate',
      'submissionMethod',
      'marks',
      'class',
      'assignTo',
      'courseDescription',
      'createdBy'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || (field === 'uploadAssignment' && !formData[field])) {
        alert(`Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field.`);
        return;
      }
    }

    // Create FormData object
    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }

    try {
      await addAssignmentData(formDataToSend);
      setFormData({
        assignmentCode: "",
        assignmentTitle: "",
        dueDate: "",
        attachments: "",
        submissionMethod: "",
        marks: "",
        additionalInstruction: "",
        class: "",
        assignTo: "",
        courseDescription: "",
        createdBy: "",
        uploadAssignment: null // Clear file input after submission
      });
      openModal();
    } catch (error) {
      console.error('Failed to add assignment data:', error);
      alert(`Error: ${error.message}`);
    }
  };


  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/teacherspanel/Assignment"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Assignment Details */}
          <div className="flex flex-col gap-8">
            <div className="w-full grid grid-cols-3 items-center gap-5">
              {/* Existing fields ... */}
              {/* Assignment Code */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="assignmentCode" className="text-lg font-normal text-black">
                  Assignment Code*
                </label>
                <input
                  type="text"
                  id="assignmentCode"
                  name="assignmentCode"
                  value={formData.assignmentCode}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Assignment Title */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="assignmentTitle" className="text-lg font-normal text-black">
                  Assignment Title*
                </label>
                <input
                  type="text"
                  id="assignmentTitle"
                  name="assignmentTitle"
                  value={formData.assignmentTitle}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Due Date */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="dueDate" className="text-lg font-normal text-black">
                  Due Date*
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Attachments */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="attachments" className="text-lg font-normal text-black">
                  Attachments*
                </label>
                <input
                  type="text"
                  id="attachments"
                  name="attachments"
                  value={formData.attachments}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Submission Method */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="submissionMethod" className="text-lg font-normal text-black">
                  Submission Method*
                </label>
                <select
                  id="submissionMethod"
                  name="submissionMethod"
                  value={formData.submissionMethod}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                >
                  <option value="" className="text-gray-400">
                    Select
                  </option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              {/* Marks */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="marks" className="text-lg font-normal text-black">
                  Marks*
                </label>
                <input
                  type="text"
                  id="marks"
                  name="marks"
                  value={formData.marks}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Additional Instruction */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="additionalInstruction" className="text-lg font-normal text-black">
                  Additional Instruction*
                </label>
                <input
                  type="text"
                  id="additionalInstruction"
                  name="additionalInstruction"
                  value={formData.additionalInstruction}
                  onChange={handleChange}
                  placeholder="Type here"
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                />
              </div>

              {/* Class */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="class" className="text-lg font-normal text-black">Class*</label>
                <select
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                >
                  <option value="" className="text-gray-400">
                    Select
                  </option>
                  {[...Array(10)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                  ))}
                </select>
              </div>


              {/* Assign To */}
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="assignTo" className="text-lg font-normal text-black">
                  Assign To*
                </label>
                <select
                  id="assignTo"
                  name="assignTo"
                  value={formData.assignTo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                  required
                >
                  <option value="" className="text-gray-400">
                    Select
                  </option>
                  <option value="All Students">All Students</option>
                  <option value="Roll 1-30">Roll 1-30</option>
                  <option value="Roll 30 -60 ">Roll 30-60</option>
                </select>
              </div>




            </div>
          </div>



          {/* Course Description */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="courseDescription" className="text-lg font-normal text-black">
              Course Description*
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
              placeholder="Type here"
              className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              required
            ></textarea>
          </div>

          {/* Created By */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="createdBy" className="text-lg font-normal text-black">Created By*</label>
            <input
              type="text"
              id="createdBy"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              placeholder="Type here"
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              required
            />
          </div>

          {/* Upload Assignment */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="uploadAssignment" className="text-lg font-normal text-black">
              Upload Assignment*
            </label>
            <input
              type="file"
              id="uploadAssignment"
              name="uploadAssignment"
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              required
            />
          </div>

          <div className="w-full mt-10 flex justify-end">
            <button
              type="submit"
              className="bg-[#034488] text-white w-44 py-4 rounded-md text-center"
            >
              Add Assignment
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  assignmentCode: "",
                  assignmentTitle: "",
                  dueDate: "",
                  attachments: "",
                  submissionMethod: "",
                  marks: "",
                  additionalInstruction: "",
                  class: "",
                  assignTo: "",
                  courseDescription: "",
                  createdBy: "",
                  uploadAssignment: null, // Reset file input
                })
              }
              className="w-44 text-black border border-gray-400 font-medium text-lg p-2"
            >
              Cancel
            </button>
          </div>
        </form>

        {isSelectOpen && (
          <Successcard
            message={"Assignment has been added successfully!"}
            closeModal={closeModal}
            url={"/teacherspanel/Assignment"}
          />
        )}
      </div>
    </>
  );
}


