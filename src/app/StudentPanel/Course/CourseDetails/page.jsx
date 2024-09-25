"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";

import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function CourseDetails() {
  const [isSelectOpen, setisSelectOpen] = useState(false);

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/StudentPanel/Course"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}

        <form action="#" className="flex flex-col gap-10">
          {/* Student Details */}
          <div className="flex flex-col gap-8">
            <h1 className="text-lg font-semibold">Course Details</h1>
            <div className="w-full grid grid-cols-3 items-center gap-5">
              {/*  Course Name* */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Course Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Course Name* */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Course Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Instructor Name*/}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Instructor Name*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Instructor Email */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Instructor Email*
                </label>
                <select
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                >
                  {" "}
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                </select>
              </div>

              {/* Start Date */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Start Date*
                </label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* End Date      */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  End Date *
                </label>
                <input
                  type="date"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Class Days */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Class Days*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Class Time */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Class Time*
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                />
              </div>

              {/* Course Objective */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Course Objective*
                </label>
                <select
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                >
                  {" "}
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                </select>
              </div>

              {/* Supplementary Materials */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Supplementary Materials*
                </label>
                <select
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                >
                  {" "}
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                </select>
              </div>

              {/* Online Resources */}
              <div className="flex flex-col gap-3 w-full">
                <label className="text-lg font-normal text-black">
                  Online Resources*
                </label>
                <select
                  type="text"
                  placeholder="Type here"
                  className="border border-gray-300  rounded-md w-full py-3 px-5 outline-none"
                >
                  {" "}
                  <option value="" className="text-gray-400 px">
                    Select
                  </option>
                </select>
              </div>
            </div>{" "}
          </div>

          {/* Course Description* */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-black">
              Course Description*
            </label>
            <textarea
              type="text"
              placeholder="Type here"
              className="h-20 border border-gray-300  rounded-md w-full py-3
             px-5 outline-none "
            ></textarea>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label className="text-lg font-normal text-black">
              Provide Material*
            </label>
            <textarea
              type="text"
              placeholder="Upload"
              className="h-20 border border-gray-300  rounded-md w-full py-3
             px-5 outline-none "
            ></textarea>
          </div>

          <div className="flex gap-5 pb-10">
            <button

              onClick={openModal}
              className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
            >
              Submit
            </button>
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
