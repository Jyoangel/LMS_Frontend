import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import EventCard from "../Main/components/EventCard";

const EventData = [
  {
    subjectName: "Hindi",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "English",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Maths",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Science",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Hindi",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "English",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Maths",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Science",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Hindi",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "English",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Maths",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Science",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Hindi",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "English",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Maths",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
  {
    subjectName: "Science",
    time: "22-05-24 | 10:00 AM",
    discription: "Discription",
  },
];

export default function SeeAll() {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 p-5">
        <div className="w-full">
          <Link href={"/AdminDashboard"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid lg:grid-cols-4 gap-5">
          {EventData.map((item) => {
            return (
              <>
                <EventCard
                  subjectName={item.subjectName}
                  time={item.time}
                  discription={item.discription}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
