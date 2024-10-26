import Image from "next/image";
import Link from "next/link";
import course from "./course.png";
import report from "./report.png";
import user from "./user.png";
import library from "./library.png";
import classschedule from "./classschedule.png";
import transpotation from "./transpotation.png";
import subject from "./subject.png";
import hotelmanagement from "./hotelmanagement.png";

export default function Configuration() {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pt-10 pl-10">
        <h1 className="text-black text-xl font-semibold">Configuration</h1>
        <div className="flex flex-wrap gap-10">
          <Link href={"/AdminDashboard/UserManagement"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-10 items-center justify-center rounded-lg">
              <Image src={user} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">
                User Management
              </h1>
            </div>
          </Link>

          <Link href={"/AdminDashboard/Course"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={course} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">
                Course Management
              </h1>
            </div>
          </Link>

          <Link href={"/AdminDashboard/ReportCard"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={report} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">Report Card</h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/LibraryManage"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={library} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">Library</h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/ClassSchedule"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={classschedule} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">
                Class Schedule
              </h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/Transpotation"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={transpotation} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">
                Transpotation
              </h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/Class"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={subject} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">Class</h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/Subject"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={subject} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">Subject</h1>
            </div>
          </Link>
          <Link href={"/AdminDashboard/HotelManagement"}>
            <div className="h-[180px] w-[260px] border border-gray-300 shadow-md flex flex-col gap-5 items-center justify-center rounded-lg">
              <Image src={hotelmanagement} className="h-18 w-20" />
              <h1 className=" text-lg text-black font-semibold">
                Hostel Management
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
