export default function UpcomingDeadline() {
  return (
    <>
      <div className="h-[70px] w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1  justify-between">
          <h1 className="text-base text-gray-500 font-normal">
            Assignment Name:{" "}
            <span className="font-semibold text-black">
              Dummy Assignment Name
            </span>
          </h1>
          <h1 className="text-base text-gray-500 font-normal">
            Submission Date:{" "}
            <span className="font-semibold text-black">07-07-24</span>
          </h1>
        </div>
      </div>
    </>
  );
}
