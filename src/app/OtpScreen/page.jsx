import Image from "next/image";
import forgotpass from "../../Assets/forgotpass.png";
import { MdAccessTime } from "react-icons/md";
import Link from "next/link";

export default function OtpScreen() {
  return (
    <>
      <div className="h-screen w-full flex flex-row  ">
        <div className="h-full w-[50%] bg-blue-200 flex items-center justify-center">
          <Image src={forgotpass} />
        </div>
        <div className="h-full w-[50%] flex p-5 pt-36 ">
          <div className="flex w-full flex-col gap-5">
            <div>
              <h1 className="text-black text-3xl font-bold">
                OTP Verification
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-500">
                We just send a 6digit codeto your 9999999999.Enter the code
                below to confirm account.
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
              <input
                type="text"
                className="h-10 w-14 border border-gray-300 rounded-lg p-2 outline-none "
              />
            </div>

            <div className="flex flex-row justify-between w-[90%]">
              <div className="flex flex-row">
                <h1 className="text-sm text-gray-500">
                  Didn't receive the code?
                </h1>
                <button className="text-yellow-600 underline text-sm">
                  Resend
                </button>
              </div>
              <div className="flex flex-row gap-1 items-center justify-center">
                <MdAccessTime color="gray" size={18} />
                <h1 className="text-sm text-gray-500">00:20sec</h1>
              </div>
            </div>

            <Link href={"/ChangePass"}>
              <button className="h-16 w-[90%] bg-blue-600 text-white text-md font-semibold rounded-lg">
                Continue
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
