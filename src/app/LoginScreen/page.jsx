


// import React from 'react';

// export default function LoginScreen() {
//   return (
//     <>
//       <div><a href="/api/auth/login">Login</a></div>
//       <div><a href="/api/auth/signup">Sign Up</a></div>
//     </>
//   );
// }



"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../../Assets/login.png";
import ForgotPassword from "../ForgotPassword/page";



export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-row  ">
        <div className="h-full w-[50%] bg-blue-200 flex items-center justify-center">
          <Image src={login} />
        </div>
        <div className="h-full w-[50%] flex p-5 pt-36 ">
          <div className="flex w-full flex-col gap-5">
            <div>
              <h1 className="text-black text-3xl font-bold">
                Welcome Back Education
              </h1>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-black text-xl font-semibold">
                Log In Screen
              </h1>
              <p className="text-sm text-gray-500">
                Please Login To Your Account
              </p>
            </div>
            {/* <div className="flex flex-col gap-3 ">
              <h1 className="text-black text-lg font-medium">Email</h1>

              <input
                type="email"
                placeholder="Type here.."
                className="h-14 w-[90%] border border-gray-300 rounded-lg p-2 outline-none"
              />
            </div> */}
            {/* <div className="flex flex-col gap-3 ">
              <h1 className="text-black text-lg font-medium">Password</h1>
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
            </div>
            <div className="flex flex-row justify-between w-[90%]">
              <div className="flex flex-row gap-2">
                <input type="checkbox" />
                <h1 className="text-gray-500 text-sm ">Remember Me</h1>
              </div>
              <div>
                <Link href={"/ForgotPassword"}>
                  <h1 className="text-gray-500 text-sm underline">
                    Forget Password?
                  </h1>
                </Link>
              </div> 
            </div>
            */}
            <div>
              <Link href={"/apis/auth/login"}>
                <button className="h-16 w-[90%] bg-blue-600 text-white text-md font-semibold rounded-lg">
                  Log In
                </button>
              </Link>
            </div>
            <div>
              <Link href={"/apis/auth/signup"}>
                <button className="h-16 w-[90%] bg-blue-600 text-white text-md font-semibold rounded-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

