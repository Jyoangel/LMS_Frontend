"use client";

import Successcard from "@/Components/Successcard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addClassScheduleData } from "../../../../../../api/classScheduleapi";

export default function CreateTimetable({ params }) {
  const { dayperiod } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => {
    if (dayperiod) {
      const day = dayperiod.slice(0, -1); // Extract the day part
      const period = dayperiod.slice(-1); // Extract the period part
      setDay(day);
      setPeriod(period);
    }
  }, [dayperiod]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const classData = {
      subject,
      startTime,
      endTime,
      day: day.trim(), // Ensure values are trimmed
      period: period.trim(),
    };

    try {
      await addClassScheduleData(classData);
      setIsSelectOpen(true); // Show success message
    } catch (error) {
      console.error("Error adding class schedule data:", error);
      // Optionally, handle the error (e.g., show an error message)
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full flex flex-row justify-between">
          <Link href={"/AdminDashboard/ClassSchedule"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="subject" className="text-lg font-normal text-black">Subject *</label>
              <input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="startTime" className="text-lg font-normal text-black">Start Time *</label>
              <input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="endTime" className="text-lg font-normal text-black">End Time *</label>
              <input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>

          {isSelectOpen && (
            <Successcard onClose={() => setIsSelectOpen(false)} para={"Time Table added successfully!"} />
          )}
        </form>
      </div>
    </>
  );
}

{/*
import Successcard from "@/Components/Successcard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addClassScheduleData } from "../../../../../../api/classScheduleapi";

export default function CreateTimetable({ params }) {
  const { dayperiod } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [day, setDay] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => {
    if (dayperiod) {
      const day = dayperiod.substring(0, dayperiod.length - 1)
      const period = dayperiod.slice(-1);
      setDay(day);
      setPeriod(period);
    }
  }, [dayperiod]);
  console.log(params);


  console.log("Day:", day);
  console.log("period:", period);

  const handleSubmit = async (e) => {

    e.preventDefault();


    const classData = {
      subject,
      startTime,
      endTime,
      day: day ? day.trim() : "", // Handle undefined case
      period: period ? period.trim() : "",
    };
    try {
      await addClassScheduleData(classData);
      setIsSelectOpen(true);
    } catch (error) {
      console.error("Error adding class schedule data:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full flex flex-row justify-between">
          <Link href={"/AdminDashboard/ClassSchedule"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Start Time *</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">End Time *</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>

          {isSelectOpen && (
            <Successcard onClose={() => setIsSelectOpen(false)} para={"Time Table added successfully!"} />
          )}
        </form>
      </div>
    </>
  );
}

{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { addClassScheduleData } from "../../../../../api/classScheduleapi";

export default function CreateTimetable() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const router = useRouter();

  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
    router.push("/AdminDashboard/ClassSchedule"); // Redirect back to timetable
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const classScheduleData = {
      subject,
      startTime,
      endTime,
    };

    try {
      await addClassScheduleData(classScheduleData);
      openModal();
    } catch (error) {
      console.error("Failed to add class schedule data:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full flex flex-row justify-between">
          <Link href={"/AdminDashboard/ClassSchedule"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                Start Time *
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                End Time *
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Time Table added successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}
  */}
