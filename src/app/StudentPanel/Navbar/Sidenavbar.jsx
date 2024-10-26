"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const isExactMatch = (path) => pathname === path;
  const isActive = (basePath) => pathname.startsWith(basePath);

  return (
    <div className="h-auto w-[280px] flex flex-col shadow-xl">
      <div className="p-5">
        <Image src={logo} alt="logo" />
      </div>

      <Link href="/StudentPanel/Dashboard">
        <button
          className={`${isExactMatch("/StudentPanel/Dashboard") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={dashboard} alt="dashboard" className={`h-6 w-6 ${isExactMatch("/StudentPanel/Dashboard") ? "invert-0" : "invert"}`} />
          <h1>Dashboard</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Attendance">
        <button
          className={`${isActive("/StudentPanel/Attendance") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={attendance} alt="attendance" className={`h-6 w-6 ${isActive("/StudentPanel/Attendance") ? "invert" : "invert-0"}`} />
          <h1>Attendance</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/ClassSchedule">
        <button
          className={`${isActive("/StudentPanel/ClassSchedule") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={classschedule} alt="classschedule" className={`h-6 w-6 ${isActive("/StudentPanel/ClassSchedule") ? "invert" : "invert-0"}`} />
          <h1>Class Schedule</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Assignment">
        <button
          className={`${isActive("/StudentPanel/Assignment") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={communication} alt="assignment" className={`h-6 w-6 ${isActive("/StudentPanel/Assignment") ? "invert" : "invert-0"}`} />
          <h1>Assignments</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Homework">
        <button
          className={`${isActive("/StudentPanel/Homework") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={homework} alt="homework" className={`h-6 w-6 ${isActive("/StudentPanel/Homework") ? "invert-0" : "invert"}`} />
          <h1>Homework</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Chats">
        <button
          className={`${isActive("/StudentPanel/Chats") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={chats} alt="chats" className={`h-6 w-6 ${isActive("/StudentPanel/Chats") ? "invert-0" : "invert"}`} />
          <h1>Chats</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Resources">
        <button
          className={`${isActive("/StudentPanel/Resources") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={resources} alt="resources" className={`h-6 w-6 ${isActive("/StudentPanel/Resources") ? "invert-0" : "invert"}`} />
          <h1>Resources</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/ReportCard">
        <button
          className={`${isActive("/StudentPanel/ReportCard") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={reportcard} alt="reportcard" className={`h-6 w-6 ${isActive("/StudentPanel/ReportCard") ? "invert-0" : "invert"}`} />
          <h1>Report Card</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Exam">
        <button
          className={`${isActive("/StudentPanel/Exam") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={exam} alt="exam" className={`h-6 w-6 ${isActive("/StudentPanel/Exam") ? "invert-0" : "invert"}`} />
          <h1>Exam</h1>
        </button>
      </Link>

      <Link href="/StudentPanel/Course">
        <button
          className={`${isActive("/StudentPanel/Course") ? "bg-blue-600 text-white" : "text-black"} h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image src={course} alt="course" className={`h-6 w-6 ${isActive("/StudentPanel/Course") ? "invert-0" : "invert"}`} />
          <h1>Course</h1>
        </button>
      </Link>
    </div>
  );
}
