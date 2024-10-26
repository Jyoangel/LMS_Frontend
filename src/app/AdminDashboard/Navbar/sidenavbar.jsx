"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname hook
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

export default function Sidenavbar() {
  const pathname = usePathname(); // Get the current route

  // Helper to determine if the dashboard is active only on exact match
  const isExactMatch = (path) => pathname === path;

  // Helper to determine if a button is active for nested routes
  const isActive = (basePath) => pathname.startsWith(basePath);

  return (
    <>
      <div className="h-auto w-[280px] flex flex-col shadow-xl">
        <div className="p-5">
          <Image src={logo} alt="Logo" />
        </div>

        <Link href="/AdminDashboard">
          <button
            className={`${isExactMatch("/AdminDashboard") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={dashboard}
              alt="Dashboard"
              className={`h-6 w-6 ${isExactMatch("/AdminDashboard") ? "invert-0" : "invert"}`}
            />
            <h1>Dashboard</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/Fees">
          <button
            className={`${isActive("/AdminDashboard/Fees") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={fees}
              alt="Fees"
              className={`h-6 w-6 ${isActive("/AdminDashboard/Fees") ? "invert" : "invert-0"}`}
            />
            <h1>Fees</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/Communication">
          <button
            className={`${isActive("/AdminDashboard/Communication") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={communication}
              alt="Communication"
              className={`h-6 w-6 ${isActive("/AdminDashboard/Communication") ? "invert" : "invert-0"}`}
            />
            <h1>Communication</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/LiveClassScreen">
          <button
            className={`${isActive("/AdminDashboard/LiveClassScreen") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={liveclasses}
              alt="Live Class"
              className={`h-6 w-6 ${isActive("/AdminDashboard/LiveClassScreen") ? "invert" : "invert-0"}`}
            />
            <h1>Live Class</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/CalendarPage">
          <button
            className={`${isActive("/AdminDashboard/CalendarPage") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={calender}
              alt="Calendar"
              className={`h-6 w-6 ${isActive("/AdminDashboard/CalendarPage") ? "invert" : "invert-0"}`}
            />
            <h1>Calendar</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/Payment">
          <button
            className={`${isActive("/AdminDashboard/Payment") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={payment}
              alt="Payment"
              className={`h-6 w-6 ${isActive("/AdminDashboard/Payment") ? "invert" : "invert-0"}`}
            />
            <h1>Payments</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/HotelManagement">
          <button
            className={`${isActive("/AdminDashboard/HotelManagement") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={hotelmanagement}
              alt="Hostel Management"
              className={`h-6 w-6 ${isActive("/AdminDashboard/HotelManagement") ? "invert" : "invert-0"}`}
            />
            <h1>Hostel Management</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/Enquiry">
          <button
            className={`${isActive("/AdminDashboard/Enquiry") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={enquiry}
              alt="Enquiry"
              className={`h-6 w-6 ${isActive("/AdminDashboard/Enquiry") ? "invert" : "invert-0"}`}
            />
            <h1>Enquiry</h1>
          </button>
        </Link>

        <Link href="/AdminDashboard/Configuration">
          <button
            className={`${isActive("/AdminDashboard/Configuration") ? "bg-blue-600 text-white" : "text-black"
              } h-[50px] w-full px-5 py-3 flex gap-3`}
          >
            <Image
              src={configuration}
              alt="Configuration"
              className={`h-6 w-6 ${isActive("/AdminDashboard/Configuration") ? "invert" : "invert-0"}`}
            />
            <h1>Configuration</h1>
          </button>
        </Link>
      </div>
    </>
  );
}
