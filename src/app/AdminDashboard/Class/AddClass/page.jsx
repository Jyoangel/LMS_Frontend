"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addClassData } from "../../../../../api/classapi"; //api to add class 

export default function AddClass() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [classData, setClassData] = useState({ className: "" });

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleClassChange = (e) => {
    setClassData({ ...classData, className: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!classData.className) {
      return; // Prevent submission if no class is selected
    }
    try {
      await addClassData(classData);
      openModal();
    } catch (error) {
      console.error("Failed to add class data", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Class"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* class*/}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-black">Class*</label>
            <select
              name="class"
              value={classData.className}
              onChange={handleClassChange}
              className="border border-gray-300 rounded-md w-96 py-3 px-5 outline-none"
            >
              <option value="" className="text-gray-400">
                Select
              </option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            role="button"
            type="submit"
            className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={" class added successfully!"}
              url={"/AdminDashboard/Class"}
            />
          )}
        </form>
      </div>
    </>
  );
}
