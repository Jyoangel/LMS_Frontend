
// components/Timetable.js
"use client";

import React, { useEffect, useState } from "react";
import { fetchClassScheduleByClass } from "../../../../api/classScheduleapi"; // api to fetch the class schedule
import { useUser } from "@auth0/nextjs-auth0/client"; // Assuming you are using Auth0
import { fetchStudentByEmail } from "../../../../api/api"; // API to fetch student data by email
import { checkUserRole } from "../../../../api/api"; // Import checkUserRole function

const Timetable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [studentClass, setStudentClass] = useState(null);
  const { user, isLoading } = useUser(); // Get user information from Auth0
  const [userId, setUserId] = useState(null);

  // Check user role and retrieve userId
  useEffect(() => {
    if (!user) return;
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  // Fetch student class and class schedule data
  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return;

      try {
        if (user && user.email) {
          // Fetch student data by user email
          const studentData = await fetchStudentByEmail(user.email);
          if (studentData && studentData.class) {
            setStudentClass(studentData.class);

            // Fetch class schedule data using the student's class
            const scheduleData = await fetchClassScheduleByClass(studentData.class, userId);
            console.log("Fetched Schedule Data:", scheduleData); // Debugging log
            setScheduleData(scheduleData);
          }
        }
      } catch (error) {
        console.error("Failed to fetch class schedule data:", error);
      }
    };
    fetchData();
  }, [user, userId, isLoading]);

  const renderCell = (day, period) => {
    const entry = scheduleData.find(
      (item) => item.day === day && item.period.toString() === period.toString()
    );

    if (entry) {
      return (
        <>
          <div className="text-blue-600">{entry.subject}</div>
          <div>
            {entry.startTime} - {entry.endTime}
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
            {/* Iterating over the 'period ' array to dynamically create table headers for each period  */}
            {periods.map((period) => (
              <tr key={period}>
                <td className="border-2 bg-blue-200 border-gray-100 px-4 h-28">
                  {period}
                </td>
                {days.map((day) => (
                  <td key={day} className="border border-gray-300 px-4 py-2">
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
import React, { useEffect, useState } from "react";
import { fetchClassScheduleData } from "../../../../api/classScheduleapi"; // api to fetch the class schedule 

const Timetable = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [visibleCells, setVisibleCells] = useState({});

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const periods = [1, 2, 3, 4, 5, 6, 7, 8];

  //call api to fetch the class schedule data 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchClassScheduleData();
        console.log("Fetched Schedule Data:", data); // Debugging log
        setScheduleData(data);
      } catch (error) {
        console.error("Failed to fetch class schedule data:", error);
      }
    };
    fetchData();
  }, []);

  const renderCell = (day, period) => {
    const entry = scheduleData.find(item => item.day === day && item.period.toString() === period.toString());

    if (entry) {
      return (
        <>
          <div className="text-blue-600">{entry.subject}</div>
          <div>{entry.startTime} - {entry.endTime}</div>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border-2 border-gray-100">
          <thead>
            <tr className="bg-blue-200">
              <th className="border-2 border-gray-100 px-4 py-2">#</th>
              {/* Iterating over the 'days' array to dynamically create table headers for each day *
              {days.map(day => (
                <th key={day} className="border-2 border-gray-100 px-4 py-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Iterating over the 'period ' array to dynamically create table headers for each period  *
            {periods.map(period => (
              <tr key={period}>
                <td className="border-2 bg-blue-200 border-gray-100 px-4 h-28">{period}</td>
                {days.map(day => (
                  <td
                    key={day}
                    className="border border-gray-300 px-4 py-2"
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
