"use client"



import { Calendar } from "antd"; // Importing Calendar component from Ant Design
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; // Importing icons for navigation
import Link from "next/link"; // Next.js link for navigation between pages
import { useState, useEffect } from "react"; // React hooks for state and side-effects
import dayjs from "dayjs"; // Importing Day.js for date formatting and manipulation
import { fetchCalendarData } from "../../../../api/calendarapi"; // API function to fetch calendar data

export default function CalendarPage() {
  const [calendarData, setCalendarData] = useState([]); // State to store the calendar events
  const [selectedDate, setSelectedDate] = useState(null); // State to store the currently selected date

  // Fetch calendar data when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the calendar data and update the state
        const data = await fetchCalendarData();
        setCalendarData(data);
        console.log(data); // Log the data for debugging
      } catch (error) {
        console.error("Failed to fetch calendar data:", error); // Handle errors in fetching data
      }
    }
    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array means this runs once on component mount

  // Function to render each cell in the calendar based on the date
  const cellRender = (currentDate, info) => {
    if (info.type === "date") {
      const formattedDate = currentDate.format("YYYY-MM-DD"); // Format the current date
      const events = calendarData.filter((event) =>
        event.date.startsWith(formattedDate) // Filter events based on the date
      );

      return (
        <div className="relative">
          {/* Display events if available for the current date */}
          {events.length > 0
            ? events.map((event, index) => (
              <div key={index} className="mb-1 z-10 bg-white p-1 rounded shadow">
                <Link href={`/AdminDashboard/CalendarPage/EditDetails/${event._id}`}>
                  <span className="text-sm font-medium">
                    {event.type}: {event.title} {/* Show event type and title */}
                  </span>
                </Link>
                <br />
                <span className="text-xs">
                  {event.startTime} - {event.endTime} {/* Show event start and end times */}
                </span>
              </div>
            ))
            : null}

          {/* Add button to create a new event on the selected date */}
          <Link href={`/AdminDashboard/CalendarPage/AddDetails?date=${formattedDate}`}>
            <button
              role="button"
              className={`bottom-0 right-0 text-xs bg-blue-500 text-white px-1 rounded z-20 ${selectedDate === formattedDate ? "" : "hidden"
                }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent cell click event
                setSelectedDate(formattedDate); // Set the selected date
              }}
            >
              Add
            </button>
          </Link>
        </div>
      );
    }
    return info.originNode; // Return the default rendering for other types of cells
  };

  // Function to handle cell click and set the selected date
  const handleCellClick = (value) => {
    const formattedDate = value.format("YYYY-MM-DD"); // Format the clicked date
    setSelectedDate(formattedDate); // Set the selected date in the state
  };

  return (
    <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
      {/* Header section with title and filter option */}
      <div className="h-12 w-full flex flex-row items-center justify-between">
        <h1 className="text-black text-lg font-medium">Calendar</h1>
        <div className="flex flex-row gap-2">
          <h1 className="text-black text-lg font-medium">Filter</h1>
          <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1">
            <option>Select</option> {/* Placeholder for filter options */}
          </select>
        </div>
      </div>

      {/* Month navigation controls */}
      <div className="h-12 w-full flex flex-row items-center justify-between">
        <h1 className="text-black text-lg font-semibold">June</h1> {/* Display the current month */}
        <div className="flex flex-row gap-1">
          <button
            role="button"
            aria-label="Previous month"
            data-testid="prev-button"
            className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center"
          >
            <FaAngleLeft color="black" size={25} /> {/* Left arrow for previous month */}
          </button>

          <button
            role="button"
            aria-label="Next month"
            data-testid="next-button"
            className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center "
          >
            <FaAngleRight color="black" size={25} /> {/* Right arrow for next month */}
          </button>
        </div>
      </div>

      {/* Main calendar component with custom cell render and date selection */}
      <Calendar cellRender={cellRender} onSelect={handleCellClick} />
    </div>
  );
}


{/*
import { Calendar } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Link from "next/link";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import { fetchCalendarData } from "../../../../api/calendarapi";

export default function CalendarPage() {
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCalendarData();
        setCalendarData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch calendar data:", error);
      }
    }
    fetchData();
  }, []);

  const cellRender = (currentDate, info) => {
    if (info.type === 'date') {
      const formattedDate = currentDate.format("YYYY-MM-DD");
      const events = calendarData.filter(
        (event) => event.date.startsWith(formattedDate)
      );

      return (
        <div className="relative">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="mb-1 z-10 bg-white p-1 rounded shadow">
                <Link href={`/AdminDashboard/CalendarPage/EditDetails/${event._id}`}><span className="text-sm font-medium">{event.type}: {event.title}</span></Link>
                <br />
                <span className="text-xs">{event.startTime} - {event.endTime}</span>
              </div>
            ))
          ) : null}
          <Link href={`/AdminDashboard/CalendarPage/AddDetails?date=${formattedDate}`}>
            <button
              role="button"
              className={` bottom-0 right-0 text-xs bg-blue-500 text-white px-1 rounded z-20 ${selectedDate === formattedDate ? '' : 'hidden'}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent cell click event
                setSelectedDate(formattedDate);
              }}
            >
              Add
            </button>
          </Link>
        </div>
      );
    }
    return info.originNode;
  };

  const handleCellClick = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-medium">Calendar</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-semibold">June</h1>
          <div className="flex flex-row gap-1">
            <button
              role="button"
              aria-label="Previous month" // Add aria-label
              data-testid="prev-button" // Or use data-testid
              className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center"
            >
              <FaAngleLeft color="black" size={25} />
            </button>

            <button
              role="button"
              aria-label="Next month" // Add aria-label
              data-testid="next-button" // Or use data-testid
              className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center"
            >
              <FaAngleRight color="black" size={25} />
            </button>
          </div>
        </div>
        <Calendar cellRender={cellRender} onSelect={handleCellClick} />
      </div>
    </>
  );
}



{/*import { Calendar } from "antd";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function CalendarPage() {
  return (
    <>
      <div className="h-screen w-full flex flex-col gap-5 pl-10 pt-10">
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-medium">Calendar</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-black text-lg font-medium">Filter</h1>
            <select className="h-8 w-28 border border-gray-500 outline-none rounded-lg p-1 ">
              <option>Select</option>
            </select>
          </div>
        </div>
        <div className="h-12 w-full flex flex-row items-center justify-between">
          <h1 className="text-black text-lg font-semibold">June</h1>
          <div className="flex flex-row gap-1">
            <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center">
              <FaAngleLeft color="black" size={25} />
            </button>

            <button className="h-10 w-12 bg-gray-300 rounded-md flex items-center justify-center ">
              <FaAngleRight color="black" size={25} />
            </button>
          </div>
        </div>
        <Calendar />;
      </div>
    </>
  );
}

*/}
