import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Calendar from "./Calender";

export default function Attendance() {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-medium">Calendar</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-semibold">Attendance</h1>
          {/* pagenation  */}
          <div className="flex flex-row gap-3 pr-6">
            <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
              <FaAngleLeft color="black" size={25} />
            </button>

            <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
              <FaAngleRight color="black" size={25} />
            </button>
          </div>
        </div>
        <Calendar />
      </div>
    </>
  );
}
