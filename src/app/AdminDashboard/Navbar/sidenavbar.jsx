"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../Assets/logo.png";
import calender from "./img/calender.png";
import communication from "./img/communication.png";
import configuration from "./img/configuration.png";
import dashboard from "./img/dashboard.png";
import liveclasses from "./img/liveclasses.png";
import payment from "./img/payment.png";
import fees from "./img/fees.png";
import enquiry from "./img/enquiry.png";
import hotelmanagement from "./img/hotelmanagement.png";

export default function sidenavbar() {
  const [isSelected, setIsSelected] = useState(1);

  const handleSelect = (value) => {
    setIsSelected(value);
  };

  return (
    <>
      <div className="h-auto  w-[280px] flex flex-col shadow-xl">
        <div className="p-5">
          <Image src={logo} />
        </div>

        <Link href={"/AdminDashboard"}>
          <button
            onClick={() => {
              handleSelect(1);
            }}
            className={` ${isSelected === 1 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={dashboard}
              className={`h-6 w-6 ${isSelected === 1 ? "invert-0" : "invert "}`}
            />
            <h1 className="">Dashboard</h1>
          </button>
        </Link>
        <Link href={"/AdminDashboard/Fees"}>
          <button
            onClick={() => {
              handleSelect(7);
            }}
            className={` ${isSelected === 7 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={fees}
              className={`h-6 w-6 ${isSelected === 7 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Fees</h1>
          </button>
        </Link>

        <Link href={"/AdminDashboard/Communication"}>
          <button
            onClick={() => {
              handleSelect(2);
            }}
            className={` ${isSelected === 2 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={communication}
              className={`h-6 w-6 ${isSelected === 2 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Communication</h1>
          </button>
        </Link>

        <Link href={"/AdminDashboard/LiveClassScreen"}>
          <button
            onClick={() => {
              handleSelect(3);
            }}
            className={` ${isSelected === 3 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={liveclasses}
              className={`h-6 w-6 ${isSelected === 3 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Live class</h1>
          </button>
        </Link>

        <Link href={"/AdminDashboard/CalendarPage"}>
          <button
            onClick={() => {
              handleSelect(4);
            }}
            className={` ${isSelected === 4 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={calender}
              className={`h-6 w-6 ${isSelected === 4 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Calendar</h1>
          </button>
        </Link>

        <Link href={"/AdminDashboard/Payment"}>
          <button
            onClick={() => {
              handleSelect(5);
            }}
            className={` ${isSelected === 5 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={payment}
              className={`h-6 w-6 ${isSelected === 5 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Payments</h1>
          </button>
        </Link>
        <Link href={"/AdminDashboard/HotelManagement"}>
          <button
            onClick={() => {
              handleSelect(6);
            }}
            className={` ${isSelected === 6 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={hotelmanagement}
              className={`h-6 w-6 ${isSelected === 6 ? "invert" : "invert-0 "}`}
            />
            <h1 className="">Hostel Management</h1>
          </button>
        </Link>
        <Link href={"/AdminDashboard/Enquiry"}>
          <button
            onClick={() => {
              handleSelect(10);
            }}
            className={` ${isSelected === 10 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={enquiry}
              className={`h-6 w-6 ${isSelected === 10 ? "invert" : "invert-0 "
                }`}
            />
            <h1 className="">Enquiry</h1>
          </button>
        </Link>

        <Link href={"/AdminDashboard/Configuration"}>
          <button
            onClick={() => {
              handleSelect(11);
            }}
            className={` ${isSelected === 11 ? "bg-blue-600 text-white" : " text-black"
              } h-[50px] w-full  px-5 py-3 flex gap-3`}
          >
            <Image
              src={configuration}
              className={`h-6 w-6 ${isSelected === 11 ? "invert" : "invert-0 "
                }`}
            />
            <h1 className="">Configuration</h1>
          </button>
        </Link>
      </div>
    </>
  );
}
