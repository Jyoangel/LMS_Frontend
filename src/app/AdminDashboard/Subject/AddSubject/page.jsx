"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addSubjectData } from "../../../../../api/subjectapi"; // Adjust the path as needed

export default function AddLibrary() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    class: "",
    subject: ""
  });

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSubjectData(formData);
      openModal();
    } catch (error) {
      console.error("Failed to add subject data:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Subject"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Class */}
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="class-select" className="text-lg font-normal text-black">Class*</label>
            <select
              id="class-select"
              name="class"
              value={formData.class}
              onChange={handleInputChange}
              className="border border-gray-300 rounded-md w-96 py-3 px-5 outline-none"
            >
              <option value="" className="text-gray-400">
                Select
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-row items-center gap-8">
            {/* subject */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="subject-input" className="text-lg font-normal text-black">Subject *</label>
              <input
                id="subject-input"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-96 py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Subject added successfully!"}
              url={"/AdminDashboard/Subject"}
            />
          )}
        </form>
      </div>
    </>
  );
}
