import Image from "next/image";

export default function ColorCard({ icon, text, number, color }) {
  return (
    <>
      <div
        className={`h-[150px] w-[180px] rounded-md flex flex-col items-center justify-center gap-3 ${color} p-2`}
      >
        <Image src={icon} />

        <h1 className="text-sm text-white">{text}</h1>
        <h1 className="text-xl font-bold text-white">{number}</h1>
      </div>
    </>
  );
}
