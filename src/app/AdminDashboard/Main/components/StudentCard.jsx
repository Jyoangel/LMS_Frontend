import Image from "next/image";
import person1 from "../img/person1.png";
export default function StudentCard({ name, percentage }) {
  return (
    <>
      <div className="h-[80px] w-[250px] bg-white rounded-lg border border-blue-500 flex flex-row p-3 gap-3">
        <Image src={person1} className="h-12 w-12 outline-none  " />
        <div className="flex flex-col gap-1 items-start justify-center">
          <h1 className="text-black text-md font-medium">{name}</h1>
          <p className="text-xs text-gray-400">{percentage}</p>
        </div>
      </div>
    </>
  );
}
