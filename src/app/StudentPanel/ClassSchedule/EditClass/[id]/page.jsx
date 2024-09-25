"use client";
"use client";

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchClassScheduleById, updateClassScheduleData, deleteClassScheduleData } from "../../../../../../api/classScheduleapi";

export default function EditClass({ params }) {
  const { id } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [classSchedule, setClassSchedule] = useState({
    subject: '',
    startTime: '',
    endTime: ''
  });

  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  const fetchInitialData = async () => {
    if (id) {
      try {
        const data = await fetchClassScheduleById(id);
        setClassSchedule({
          subject: data?.subject || '',
          startTime: data?.startTime || '',
          endTime: data?.endTime || ''
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassSchedule((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateClassScheduleData(id, classSchedule);
      openModal(); // Show success modal
    } catch (error) {
      console.error('Error updating class schedule:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClassScheduleData(id);
      router.push('/AdminDashboard/ClassSchedule'); // Redirect after successful delete
    } catch (error) {
      console.error('Error deleting class schedule:', error);
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
          <div>
            <button className="text-green-500" onClick={handleUpdate}>Edit</button>|
            <button className="text-red-500" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-10" role="form">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="subject" className="text-lg font-normal text-black">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={classSchedule.subject}
                onChange={handleInputChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="startTime" className="text-lg font-normal text-black">
                Start Time *
              </label>
              <input
                id="startTime"
                type="time"
                name="startTime"
                value={classSchedule.startTime}
                onChange={handleInputChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="endTime" className="text-lg font-normal text-black">
                End Time *
              </label>
              <input
                id="endTime"
                type="time"
                name="endTime"
                value={classSchedule.endTime}
                onChange={handleInputChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>
        </form>

        {isSelectOpen && (
          <Successcard message="Class schedule successfully updated!" onClose={closeModal} />
        )}
      </div>
    </>
  );
}

{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { fetchClassScheduleById, updateClassScheduleData, deleteClassScheduleData } from "../../../../../../api/classScheduleapi";

export default function EditClass({ params }) {

  const { id } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [classSchedule, setClassSchedule] = useState({
    subject: '',
    startTime: '',
    endTime: ''
  });

  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  const fetchInitialData = async () => {
    if (id) {
      try {
        const data = await fetchClassScheduleById(id);
        setClassSchedule({
          subject: data.subject,
          startTime: data.startTime,
          endTime: data.endTime
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassSchedule((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateClassScheduleData(id, classSchedule);
      openModal(); // Show success modal
    } catch (error) {
      console.error('Error updating class schedule:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClassScheduleData(id);
      router.push('/AdminDashboard/ClassSchedule'); // Redirect after successful delete
    } catch (error) {
      console.error('Error deleting class schedule:', error);
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
          <div>
            <button className="text-green-500" onClick={handleUpdate}>Edit</button>|
            <button className="text-red-500" onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={classSchedule.subject}
                onChange={handleInputChange}
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
                name="startTime"
                value={classSchedule.startTime}
                onChange={handleInputChange}
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
                name="endTime"
                value={classSchedule.endTime}
                onChange={handleInputChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>
        </form>

        {isSelectOpen && (
          <Successcard message="Class schedule successfully updated!" onClose={closeModal} />
        )}
      </div>
    </>
  );
}



{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";

import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function EditClass() {
  const [isSelectOpen, setisSelectOpen] = useState(false);

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
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
          <div>

            <button className="text-green-500">Edit</button >|
            <button className="text-red-500">Delete</button>

          </div>
        </div>

        

        <form action="#" className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                Subject *
              </label>
              <input
                type="text"
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
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            onsubmit={event.preventDefault()}
            onClick={openModal}
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Update
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={" Time Table Update successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}
  */}
