// components/Timetable.js
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchClassScheduleByClass } from "../../../../api/classScheduleapi"; // Fetch API
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

const Timetable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [visibleCells, setVisibleCells] = useState({});
  const [selectedClass, setSelectedClass] = useState(""); // State to store the selected class
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];


  // Check user role and retrieve userId
  useEffect(() => {
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email); // Use the imported function

        if (result.exists) {
          setUserId(result.userId); // Set userId from the response
        } else {
          setError("User not found or does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError("Failed to fetch user role.");
      }
    }

    getUserRole();
  }, [user]);

  // Call API to fetch the class schedule data based on selected class
  useEffect(() => {
    if (selectedClass) {
      const fetchData = async () => {
        try {
          const data = await fetchClassScheduleByClass(selectedClass, userId);
          console.log("Fetched Schedule Data:", data); // Debugging log
          setScheduleData(data);
        } catch (error) {
          console.error("Failed to fetch class schedule data:", error);
        }
      };
      fetchData();
    }
  }, [selectedClass, userId]);

  const handleCellClick = (day, period) => {
    setVisibleCells((prevState) => ({
      ...prevState,
      [`${day}-${period}`]: !prevState[`${day}-${period}`],
    }));
  };

  const renderCell = (day, period) => {
    const entry = scheduleData.find(
      (item) => item.day === day && item.period.toString() === period.toString()
    );

    if (entry) {
      return (
        <>
          <Link href={`/teacherspanel/ClassSchedule/EditClass/${entry._id}`}>
            <div className="text-blue-600">{entry.subject}</div>
          </Link>
          <div>
            {entry.startTime} - {entry.endTime}
          </div>
        </>
      );
    } else if (visibleCells[`${day}-${period}`]) {
      return (
        <Link href={`/teacherspanel/ClassSchedule/CreateTimetable/${day}${period}`}>
          <button className="bg-blue-500 text-white px-3 py-1 rounded" role="button">
            Create
          </button>
        </Link>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Class Filter */}
      <div className="mb-4">
        <label htmlFor="classFilter" className="mr-2 text-lg font-semibold">
          Select Class:
        </label>
        <select
          id="classFilter"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select Class --</option>
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1}</option>
          ))}
          {/* Add more classes as needed */}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-2 border-gray-100">
          <thead>
            <tr className="bg-blue-200">
              <th className="border-2 border-gray-100 px-4 py-2">#</th>
              {/* Iterating over the 'days' array to dynamically create table headers for each day */}
              {days.map((day) => (
                <th key={day} className="border-2 border-gray-100 px-4 py-2">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Iterating over the 'periods' array to dynamically create table headers for each period */}
            {periods.map((period) => (
              <tr key={period}>
                <td className="border-2 bg-blue-200 border-gray-100 px-4 h-28">{period}</td>
                {days.map((day) => (
                  <td
                    key={day}
                    className="border border-gray-300 px-4 py-2 cursor-pointer"
                    onClick={() => handleCellClick(day, period)}
                  >
                    {renderCell(day, period)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;













{/*
import React from "react";
import Link from "next/link";

const Timetable = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-2 border-gray-100">
          <thead>
            <tr className="bg-blue-200">
              <th className="border-2 border-gray-100 px-4 py-2">#</th>
              <th className="border-2 border-gray-100 px-4 py-2">Monday</th>
              <th className="border-2 border-gray-100 px-4 py-2">Tuesday</th>
              <th className="border-2 border-gray-100 px-4 py-2">Wednesday</th>
              <th className="border-2 border-gray-100 px-4 py-2">Thursday</th>
              <th className="border-2 border-gray-100 px-4 py-2">Friday</th>
              <th className="border-2 border-gray-100 px-4 py-2">Saturday</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(8)].map((_, i) => (
              <tr key={i}>
                <td className="border-2 bg-blue-200 border-gray-100 px-4 h-28">
                  {i + 1}
                </td>
                {i === 0 ? (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="text-blue-600">English</div>
                      <div>9:00 AM - 10:00 AM</div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <Link
                        href={
                          "/AdminDashboard/ClassSchedule/CreateTimetable"
                        }
                      >
                        <button className="bg-blue-500 text-white px-3 py-1 rounded">
                          Create
                        </button>
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                    <td className="border border-gray-300 px-4 py-2"></td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
*/}
