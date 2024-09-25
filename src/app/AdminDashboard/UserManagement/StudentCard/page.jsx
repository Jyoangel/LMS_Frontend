import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function StudentCard() {
  return (
    <>
      <div className="h-auto w-full flex flex-col p-5 gap-10">
        {/* buttons */}
        <Link href={"/AdminDashboard/LiveClassScreen"}>
          <div className="flex w-full justify-between items-center ">
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>

            <div className="flex gap-3 items-center justify-center">
              <div className="flex items-center justify-center gap-1">
                <button className="text-blue-400 text-lg font-medium">
                  Edit
                </button>{" "}
                <h1 className="text-gray-300 ">|</h1>
                <button className="text-red-500 text-lg font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* student details */}
        <div className="w-full flex flex-col rounded-t-xl overflow-hidden">
          <div className="w-full h-12 px-5 flex items-center bg-blue-200">
            <h1 className="text-blue-600 font-semibold ">Abhinav Kumar</h1>
          </div>

          <div className="p-5 w-full h-auto flex flex-col gap-10 border border-gray-300 rounded-b-lg py-5">
            {/* student name */}
            <div className="flex flex-col gap-5 w-full">
              <h1 className="text-black font-bold text-lg">Student Details</h1>

              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                {/* Form Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Form Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">59284</h1>
                </div>

                {/* Admission Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Admission Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">59284</h1>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">Name</h1>
                  <h1 className="text-black font-bold text-lg">
                    Abhinav Kumar
                  </h1>
                </div>

                {/* Class */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">Class</h1>
                  <h1 className="text-black font-bold text-lg">8</h1>
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Date of Birth
                  </h1>
                  <h1 className="text-black font-bold text-lg">29-05-2024</h1>
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">Gender</h1>
                  <h1 className="text-black font-bold text-lg">Male</h1>
                </div>

                {/* Nationality */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Nationality
                  </h1>
                  <h1 className="text-black font-bold text-lg">Indian</h1>
                </div>

                {/* Mother Tongue */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Mother Tongue
                  </h1>
                  <h1 className="text-black font-bold text-lg">Hindi</h1>
                </div>

                {/* Religion */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Religion
                  </h1>
                  <h1 className="text-black font-bold text-lg">Hindu</h1>
                </div>

                {/* Caste */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">Caste</h1>
                  <h1 className="text-black font-bold text-lg">General</h1>
                </div>

                {/* Blood Group */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Blood Group
                  </h1>
                  <h1 className="text-black font-bold text-lg">A+</h1>
                </div>

                {/* Aadhar Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Aadhar Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">
                    8987456412365478
                  </h1>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Contact Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">99999999999</h1>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <h1 className="text-gray-400 font-normal text-lg">Address </h1>
                <h1 className="text-black font-bold text-lg">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever.
                </h1>
              </div>

              {/* Parent Details */}
              <h1 className="text-black font-bold text-lg">Parent Details</h1>

              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                {/* Father Name */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Father Name
                  </h1>
                  <h1 className="text-black font-bold text-lg">Vivek Kumar</h1>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Contact Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">99999999999</h1>
                </div>

                {/* Aadhar Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Aadhar Number
                  </h1>
                  <h1 className="text-black font-bold text-lg">
                    99293487592837
                  </h1>
                </div>

                {/* Occupation */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Occupation
                  </h1>
                  <h1 className="text-black font-bold text-lg">Bussines Man</h1>
                </div>

                {/* Annual Income */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Annual Income
                  </h1>
                  <h1 className="text-black font-bold text-lg">5,00,000</h1>
                </div>

                {/* Mother Name */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Mother Name
                  </h1>
                  <h1 className="text-black font-bold text-lg">Riya Devi</h1>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <h1 className="text-gray-400 font-normal text-lg">Address </h1>
                <h1 className="text-black font-bold text-lg">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever.
                </h1>
              </div>

              {/* Local Guardian Details  */}
              <h1 className="text-black font-bold text-lg">
                Local Guardian Details{" "}
              </h1>

              <div className="w-full grid grid-cols-5 items-center justify-between gap-5">
                {/* Guardian name */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Guardian name{" "}
                  </h1>
                  <h1 className="text-black font-bold text-lg">Ankit Kumar</h1>
                </div>

                {/* Relation With Student */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Relation With Student{" "}
                  </h1>
                  <h1 className="text-black font-bold text-lg">
                    Brother in Law
                  </h1>
                </div>

                {/* Contact Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Contact Number{" "}
                  </h1>
                  <h1 className="text-black font-bold text-lg">999999999</h1>
                </div>

                {/* Aadhar Number */}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Aadhar Number{" "}
                  </h1>
                  <h1 className="text-black font-bold text-lg">999999999</h1>
                </div>

                {/* Occupation*/}
                <div className="flex flex-col gap-2">
                  <h1 className="text-gray-400 font-normal text-lg">
                    Occupation{" "}
                  </h1>
                  <h1 className="text-black font-bold text-lg">
                    Bussiness Man
                  </h1>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2">
                <h1 className="text-gray-400 font-normal text-lg">Address </h1>
                <h1 className="text-black font-bold text-lg">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
