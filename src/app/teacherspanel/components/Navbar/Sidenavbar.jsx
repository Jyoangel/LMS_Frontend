"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
import logo from "./img/logo.png";
import calender from "./img/calender.png";
import dashboard from "./img/dashboard.png";
import attendance from "./img/attendance.png";
import classschedule from "./img/classschedule.png";
import assignment from "./img/assignment.png";
import student from "./img/student.png";
import chats from "./img/chats.png";
import library from "./img/library.png";
import reportcard from "./img/reportcard.png";
import exam from "./img/exam.png";
import course from "./img/course.png";

export default function Sidenavbar() {
  const pathname = usePathname(); // Get current route

  // Helper function to check if a route matches exactly
  const isExactMatch = (path) => pathname === path;

  // Helper function to check if a route starts with a base path
  const isActive = (basePath) => pathname.startsWith(basePath);

  return (
    <div className="h-auto w-[280px] flex flex-col shadow-xl">
      <div className="p-5">
        <Image src={logo} alt="logo" />
      </div>

      <Link href="/teacherspanel/Dashboard">
        <button
          className={`${isExactMatch("/teacherspanel/Dashboard")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={dashboard}
            alt="dashboard"
            className={`h-6 w-6 ${isExactMatch("/teacherspanel/Dashboard") ? "invert-0" : "invert"
              }`}
          />
          <h1>Dashboard</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Attendance">
        <button
          className={`${isActive("/teacherspanel/Attendance")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={attendance}
            alt="attendance"
            className={`h-6 w-6 ${isActive("/teacherspanel/Attendance") ? "invert" : "invert-0"
              }`}
          />
          <h1>Attendance</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/ClassSchedule">
        <button
          className={`${isActive("/teacherspanel/ClassSchedule")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={classschedule}
            alt="classschedule"
            className={`h-6 w-6 ${isActive("/teacherspanel/ClassSchedule") ? "invert" : "invert-0"
              }`}
          />
          <h1>Class Schedule</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Assignment">
        <button
          className={`${isActive("/teacherspanel/Assignment")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={assignment}
            alt="assignment"
            className={`h-6 w-6 ${isActive("/teacherspanel/Assignment") ? "invert" : "invert-0"
              }`}
          />
          <h1>Assignments</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Student">
        <button
          className={`${isActive("/teacherspanel/Student")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={student}
            alt="student"
            className={`h-6 w-6 ${isActive("/teacherspanel/Student") ? "invert-0" : "invert"
              }`}
          />
          <h1>Students</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Chats">
        <button
          className={`${isActive("/teacherspanel/Chats")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={chats}
            alt="chats"
            className={`h-6 w-6 ${isActive("/teacherspanel/Chats") ? "invert" : "invert-0"
              }`}
          />
          <h1>Chats</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Library">
        <button
          className={`${isActive("/teacherspanel/Library")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={library}
            alt="library"
            className={`h-6 w-6 ${isActive("/teacherspanel/Library") ? "invert" : "invert-0"
              }`}
          />
          <h1>Library</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/ReportCard">
        <button
          className={`${isActive("/teacherspanel/ReportCard")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={reportcard}
            alt="reportcard"
            className={`h-6 w-6 ${isActive("/teacherspanel/ReportCard") ? "invert" : "invert-0"
              }`}
          />
          <h1>Report Card</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Exam">
        <button
          className={`${isActive("/teacherspanel/Exam")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={exam}
            alt="exam"
            className={`h-6 w-6 ${isActive("/teacherspanel/Exam") ? "invert" : "invert-0"
              }`}
          />
          <h1>Exam</h1>
        </button>
      </Link>

      <Link href="/teacherspanel/Course">
        <button
          className={`${isActive("/teacherspanel/Course")
            ? "bg-blue-600 text-white"
            : "text-black"
            } h-[50px] w-full px-5 py-3 flex gap-3`}
        >
          <Image
            src={course}
            alt="course"
            className={`h-6 w-6 ${isActive("/teacherspanel/Course") ? "invert" : "invert-0"
              }`}
          />
          <h1>Course</h1>
        </button>
      </Link>
    </div>
  );
}
