import Image from "next/image";
import progress from "../progress.png";

export default function CourseProgress({ course }) {
  return (
    <>
      <div className="py-5 w-full border-2 border-blue-300 rounded-lg bg-white flex flex-row gap-5   items-center justify-center px-10">
        <Image src={progress} alt="img" className="h-16 w-16" />
        <div className="w-full flex flex-col gap-2">
          <h1 className="text-sm font-medium">{course}</h1>

          <div className="w-full bg-blue-100 rounded-full h-4 dark:bg-gray-700">
            <div className="bg-blue-600 h-4 rounded-full w-[30%]"></div>
          </div>

          <h1 className="text-md font-medium">30% of the progress</h1>
        </div>
      </div>
    </>
  );
}
