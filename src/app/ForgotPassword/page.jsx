import Image from "next/image";
import forgotpass from "../../Assets/forgotpass.png";
import Link from "next/link";

export default function ForgotPassword() {
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
                Forgot Your Password
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm text-gray-500">
                Enter Your Mobile Number we'll send you a code reset your
                password
              </p>
            </div>
            <div className="flex flex-col gap-3 ">
              <h1 className="text-black text-lg font-medium">
                Register Mobile Number
              </h1>
              <input
                type="email"
                placeholder="Type here.."
                className="h-14 w-[90%] border border-gray-300 rounded-lg p-2 outline-none"
              />
            </div>

            <Link href={"/OtpScreen"}>
              <button className="h-16 w-[90%] bg-blue-600 text-white text-md font-semibold rounded-lg">
                Sent OTP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
