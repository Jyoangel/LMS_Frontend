"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "./img/logo.png";
import communication from "./img/communication.png";
import configuration from "./img/configuration.png";
import dashboard from "./img/dashboard.png";
import homework from "./img/homework.png";
import fees from "./img/fees.png";
import chats from "./img/chats.png";
import resources from "./img/resources.png";
import reportcard from "./img/reportcard.png";
import exam from "./img/exam.png";
import course from "./img/course.png";
import attendance from "./img/attendance.png";
import classschedule from "./img/classschedule.png";

export default function Sidenavbar() {
  const [isSelected, setIsSelected] = useState(1);

  const handleSelect = (value) => {
    setIsSelected(value);
  };

  return (
    <>
      <div className="h-auto  w-[280px] flex flex-col shadow-xl">
        <div className="p-5">
          <Image src={logo} alt="logo" />
        </div>

        <Link href={"/StudentPanel/Dashboard"}>
          <button
            onClick={() => {
              handleSelect(1);
            }}
            className={` ${isSelected === 1 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={dashboard}
              alt="dashboard"
              className={`h-6 w-6 ${isSelected === 1 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Dashboard</h1>
          </button>
        </Link>
        <Link href={"/StudentPanel/Attendance"}>
          <button
            onClick={() => {
              handleSelect(10);
            }}
            className={` ${isSelected === 10 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={attendance}
              alt="homework"
              className={`h-6 w-6 ${isSelected === 10 ? "invert" : "invert-0 "
                }`}
            />
            <h1 className="">Attendance</h1>
          </button>
        </Link>
        <Link href={"/StudentPanel/ClassSchedule"}>
          <button
            onClick={() => {
              handleSelect(11);
            }}
            className={` ${isSelected === 11 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={classschedule}
              alt="homework"
              className={`h-6 w-6 ${isSelected === 11 ? "invert" : "invert-0 "
                }`}
            />
            <h1 className="">ClassScedule</h1>
          </button>
        </Link>

        <Link href={"/StudentPanel/Assignment"}>
          <button
            onClick={() => {
              handleSelect(2);
            }}
            className={` ${isSelected === 2 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={communication}
              alt="homework"
              className={`h-6 w-6 ${isSelected === 2 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Assignments</h1>
          </button>
        </Link>

        <Link href={"/StudentPanel/Homework"}>
          <button
            onClick={() => {
              handleSelect(4);
            }}
            className={` ${isSelected === 4 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={homework}
              alt="homework"
              className={`h-6 w-6 ${isSelected === 4 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Homework</h1>
          </button>
        </Link>

        <Link href={"/StudentPanel/Chats"}>
          <button
            onClick={() => {
              handleSelect(5);
            }}
            className={` ${isSelected === 5 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={chats}
              alt="chats"
              className={`h-6 w-6 ${isSelected === 5 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Chats</h1>
          </button>
        </Link>

        <Link href={"/StudentPanel/Resources"}>
          <button
            onClick={() => {
              handleSelect(6);
            }}
            className={` ${isSelected === 6 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={resources}
              alt="resources"
              className={`h-6 w-6 ${isSelected === 6 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Resources</h1>
          </button>
        </Link>
        <Link href={"/StudentPanel/ReportCard"}>
          <button
            onClick={() => {
              handleSelect(7);
            }}
            className={` ${isSelected === 7 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={reportcard}
              alt="reportCard"
              className={`h-6 w-6 ${isSelected === 7 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Report Card</h1>
          </button>
        </Link>
        <Link href={"/StudentPanel/Exam"}>
          <button
            onClick={() => {
              handleSelect(8);
            }}
            className={` ${isSelected === 8 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={exam}
              alt="exam"
              className={`h-6 w-6 ${isSelected === 8 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Exam</h1>
          </button>
        </Link>
        <Link href={"/StudentPanel/Course"}>
          <button
            onClick={() => {
              handleSelect(9);
            }}
            className={` ${isSelected === 9 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={course}
              alt="course"
              className={`h-6 w-6 ${isSelected === 9 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Course</h1>
          </button>
        </Link>
      </div>
    </>
  );
}
