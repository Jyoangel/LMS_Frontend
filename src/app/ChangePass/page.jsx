"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import changepass from "../../Assets/changepass.png";
import Link from "next/link";

export default function ChangePass() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  return (
    <>
      <div className="h-screen w-full flex flex-row  ">
        <div className="h-full w-[50%] bg-blue-200 flex items-center justify-center">
          <Image src={changepass} />
        </div>
        <div className="h-full w-[50%] flex p-5 pt-36 ">
          <div className="flex w-full flex-col gap-5">
            <div>
              <h1 className="text-black text-3xl font-bold">Change Password</h1>
            </div>

            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-medium">New Password</h1>
              <div className="flex items-center  ">
                <input
                  placeholder="Type here.."
                  className="h-14 w-[90%] border border-gray-300 rounded-lg p-2 outline-none"
                  type={passwordVisible ? "text" : "password"}
                  aria-label="Password"
                />
                <button
                  className="absolute right-28 flex-shrink-0 text-teal-500 hover:text-teal-700 py-1 px-2"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? (
                    <FaEyeSlash size={24} />
                  ) : (
                    <FaEye size={24} />
                  )}
                </button>
              </div>
              <p className="text-sm w-[90%] font-medium">
                Your Password must be a least 8 characters and should include a
                combination of a number letters and special characters(!@#$%){" "}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-medium">Confirm Password</h1>
              <div className="flex items-center  ">
                <input
                  placeholder="Type here.."
                  className="h-14 w-[90%] border border-gray-300 rounded-lg p-2 outline-none"
                  type={passwordVisible2 ? "text" : "password"}
                  aria-label="Password"
                />
                <button
                  className="absolute right-28 flex-shrink-0 text-teal-500 hover:text-teal-700 py-1 px-2"
                  type="button"
                  onClick={togglePasswordVisibility2}
                >
                  {passwordVisible2 ? (
                    <FaEyeSlash size={24} />
                  ) : (
                    <FaEye size={24} />
                  )}
                </button>
              </div>
            </div>

            <Link href={"/LoginScreen"}>
              <button className="h-16 w-[90%] bg-blue-600 text-white text-md font-semibold rounded-lg">
                Save & Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
