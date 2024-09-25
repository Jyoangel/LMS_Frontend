export default function AssignmentStatus({ assignmentName, date }) {
  return (
    <>
      <div className="h-[70px] w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1  justify-between">
          <h1 className="text-base text-gray-500 font-normal">
            Assignment Name:{" "}
            <span className="font-semibold text-black">
              {assignmentName}
            </span>
          </h1>
          <h1 className="text-base text-gray-500 font-normal">
            Submission Date:{" "}
            <span className="font-semibold text-black">{date}</span>
          </h1>
        </div>

        {/* pending button */}
        <button className="rounded-full px-4 py-2 bg-orange-100 text-orange-600 font-medium">
          Pending
        </button>
      </div>
    </>
  );
}
