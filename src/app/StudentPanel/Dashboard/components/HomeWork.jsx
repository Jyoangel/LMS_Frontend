export default function HomeWork({ homework, dateofSubmission }) {
  return (
    <>
      <div className="h-[70px] w-full bg-white border-2 border-blue-300 rounded-lg p-4 flex items-center justify-between">
        <div className="w-full flex flex-col gap-1  justify-between">
          <h1 className="text-base text-gray-500 font-normal">
            Homework Name:{" "}
            <span className="font-semibold text-black">
              {homework}
            </span>
          </h1>
          <div className="w-full flex items-center justify-between ">
            <h1 className="text-base text-gray-500 font-normal">
              Submission Date:{" "}
              <span className="font-semibold text-black">{dateofSubmission}</span>
            </h1>

            <h1 className="font-semibold text-black"> Kamlesh Kumar</h1>
          </div>
        </div>
      </div>
    </>
  );
}
