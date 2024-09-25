export default function ClassSchedule({ subject, startTime, endTime, day }) {
  return (
    <>
      <div className="h-[70px] w-[250px] bg-white rounded-lg border-2 border-blue-300 p-2 flex items-center gap-3">
        <div className="h-full  w-1.5 bg-green-600 rounded-lg" />
        <div className="flex flex-col justify-between">
          <h1 className="text-base font-normal">{startTime} - {endTime}</h1>

          <div className="flex items-center justify-center gap-5">
            <h1 className="text-base text-gray-500 font-normal"> {subject}</h1>
            <h1 className="text-base text-gray-500 font-normal">
              {" "}
              {day}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
