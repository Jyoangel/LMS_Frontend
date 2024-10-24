// components/Calendar.js
"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import dayjs from "dayjs";
import { useUser } from '@auth0/nextjs-auth0/client'; // fetch login user from auth0
import { fetchAttendanceByStudentId } from "../../../../api/attendanceapi"; // api to fetch attendance by studentID 
import { updateAttendanceByStudentId } from "../../../../api/attendanceapi"; // api to update attendance by studentID 
import { checkUserRole } from "../../../../api/api"; // Import checkUserRole function

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const [studentID, setstudentID] = useState(null);
  const { user, isLoading } = useUser();
  const today = dayjs().format("YYYY-MM-DD");
  useEffect(() => {
    if (!user) return;
    async function getUserRole() {
      const email = user?.email; // Ensure user email is available
      if (!email) return; // Prevent unnecessary fetch

      try {
        const result = await checkUserRole(email); // Use the imported function

        if (result.exists) {
          setstudentID(result.studentID); // Set userId from the response
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

  //const studentId = studentID//"6715f330d0d7206596a83087"; // Example studentId, should be dynamic

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = '/api/auth/login'; // Redirect if not logged in
    }
  }, [user, isLoading]);

  useEffect(() => {
    // Fetch attendance data by the studentId
    if (!studentID) return;
    const fetchData = async () => {
      try {
        const data = await fetchAttendanceByStudentId(studentID);
        if (data.length > 0 && data[0].dates) {
          // Map attendance to the date in 'YYYY-MM-DD' format
          const formattedAttendance = data[0].dates.reduce((acc, record) => {
            const formattedDate = dayjs(record.date).format("YYYY-MM-DD");
            acc[formattedDate] = record.present ? "Present" : "Absent";
            return acc;
          }, {});
          setAttendance(formattedAttendance);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };

    fetchData();
  }, [studentID]);

  const handleAttendanceToggle = async (dateKey) => {
    if (dateKey !== today) {
      alert("You can only mark attendance for today.");
      return;
    }

    // Disable toggling if already marked as "Present"
    if (attendance[dateKey] === "Present") {
      alert("Attendance for today is already marked as 'Present'.");
      return;
    }

    try {
      console.log("Sending update request for date:", today);
      // Call the API to mark attendance as "Present" for today
      await updateAttendanceByStudentId(studentId, true);

      // Update the state with new attendance data
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        [dateKey]: "Present",
      }));

      alert("Attendance marked as 'Present' for today.");
    } catch (error) {
      console.error("Failed to mark attendance:", error);
      alert("Error marking attendance.");
    }
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const attendanceStatus = attendance[dateKey];

    let statusText;
    let statusColor;

    if (attendanceStatus === "Present") {
      statusText = "Present";
      statusColor = "green";
    } else if (attendanceStatus === "Absent") {
      statusText = "Absent";
      statusColor = "red";
    } else {
      statusText = "Mark Attendance";
      statusColor = "blue";
    }

    return (
      <div
        onClick={() => attendanceStatus ? null : handleAttendanceToggle(dateKey)}
        data-testid={`calendar-cell-${dateKey}`}
        style={{
          cursor: dateKey === today && attendanceStatus !== "Present" ? "pointer" : "default",
          textAlign: "center",
          padding: "5px",
          borderRadius: "4px",
          backgroundColor: attendanceStatus ? (attendanceStatus === "Present" ? "#f6ffed" : "#fff1f0") : "#e6f7ff",
        }}
      >
        <Badge status={statusColor} text={statusText} />
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ padding: "20px" }}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default AttendanceCalendar;

{/*}
import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import dayjs from "dayjs";
import { useUser } from '@auth0/nextjs-auth0/client';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const { user, isLoading } = useUser(); // Use Auth0 hook to get user info
  const today = dayjs().format("YYYY-MM-DD");

  // Hard-coded selected students for demonstration
  const selectedStudents = ["66cc0a5e9fae1990a3916b66"];
  //"66b60924e67fa1332d78f238"
  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      window.location.href = '/api/auth/login';
    }
  }, [user, isLoading]);

  useEffect(() => {
    //   // Initialize attendance status for selected students
    const initialAttendance = selectedStudents.reduce((acc, studentId) => {
      //     // This could be more complex depending on your actual data structure
      //acc[studentId] = "Absent"; // Default status
      return acc;
    }, {});

    setAttendance(initialAttendance);
  }, [selectedStudents]);

  const handleAttendanceToggle = (dateKey) => {
    if (dateKey !== today) {
      alert("You can only mark attendance for today.");
      return;
    }

    // Disable toggling if already marked as "Present"
    if (attendance[dateKey] === "Present") {
      return;
    }

    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [dateKey]: "Present",
    }));
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const attendanceStatus = attendance[dateKey];

    let statusText;
    let statusColor;

    if (attendanceStatus === "Present") {
      statusText = "Present";
      statusColor = "green";
    } else {
      statusText = "Mark Attendance";
      statusColor = "blue";
    }

    return (
      <div
        onClick={() => handleAttendanceToggle(dateKey)}
        data-testid={`calendar-cell-${dateKey}`} // Added data-testid
        style={{
          cursor: dateKey === today && attendanceStatus !== "Present" ? "pointer" : "default",
          textAlign: "center",
          padding: "5px",
          borderRadius: "4px",
          backgroundColor: statusColor === "green" ? "#f6ffed" : "#e6f7ff",
          opacity: attendanceStatus === "Present" ? 0.6 : 1, // Indicate disabled state
        }}
      >
        <Badge status={statusColor} text={statusText} />
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ padding: "20px" }}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default AttendanceCalendar;



{/*
import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import dayjs from "dayjs";
import { useUser } from '@auth0/nextjs-auth0/client';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const { user, isLoading } = useUser(); // Use Auth0 hook to get user info
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      window.location.href = '/api/auth/login';
    }
  }, [user, isLoading]);

  const handleAttendanceToggle = (dateKey) => {
    if (dateKey !== today) {
      alert("You can only mark attendance for today.");
      return;
    }

    // Disable toggling if already marked as "Present"
    if (attendance[dateKey] === "Present") {
      return;
    }

    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [dateKey]: "Present",
    }));
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const attendanceStatus = attendance[dateKey];

    let statusText;
    let statusColor;

    if (attendanceStatus === "Present") {
      statusText = "Present";
      statusColor = "green";
    } else {
      statusText = "Mark Attendance";
      statusColor = "blue";
    }

    return (
      <div
        onClick={() => handleAttendanceToggle(dateKey)}
        data-testid={`calendar-cell-${dateKey}`} // Added data-testid
        style={{
          cursor: dateKey === today && attendanceStatus !== "Present" ? "pointer" : "default",
          textAlign: "center",
          padding: "5px",
          borderRadius: "4px",
          backgroundColor: statusColor === "green" ? "#f6ffed" : "#e6f7ff",
          opacity: attendanceStatus === "Present" ? 0.6 : 1, // Indicate disabled state
        }}
      >
        <Badge status={statusColor} text={statusText} />
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ padding: "20px" }}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default AttendanceCalendar;

{/*
import React, { useState, useEffect } from "react";
import { Calendar, Badge } from "antd";
import dayjs from "dayjs";
import { useUser } from '@auth0/nextjs-auth0/client';

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState({});
  const { user, isLoading } = useUser(); // Use Auth0 hook to get user info
  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login if not authenticated
      window.location.href = '/api/auth/login';
    }
  }, [user, isLoading]);

  const handleAttendanceToggle = (dateKey) => {
    if (dateKey !== today) {
      alert("You can only mark attendance for today.");
      return;
    }

    // Disable toggling if already marked as "Present"
    if (attendance[dateKey] === "Present") {
      return;
    }

    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [dateKey]: "Present",
    }));
  };

  const dateCellRender = (value) => {
    const dateKey = value.format("YYYY-MM-DD");
    const attendanceStatus = attendance[dateKey];

    let statusText;
    let statusColor;

    if (attendanceStatus === "Present") {
      statusText = "Present";
      statusColor = "green";
    } else {
      statusText = "Mark Attendance";
      statusColor = "blue";
    }

    return (
      <div
        onClick={() => handleAttendanceToggle(dateKey)}
        style={{
          cursor: dateKey === today && attendanceStatus !== "Present" ? "pointer" : "default",
          textAlign: "center",
          padding: "5px",
          borderRadius: "4px",
          backgroundColor: statusColor === "green" ? "#f6ffed" : "#e6f7ff",
          opacity: attendanceStatus === "Present" ? 0.6 : 1, // Indicate disabled state
        }}
      >
        <Badge status={statusColor} text={statusText} />
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ padding: "20px" }}>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  );
};

export default AttendanceCalendar;




{/*

import { useState } from "react";

const Calendar = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const [attendance, setAttendance] = useState({
    1: "Present",
    2: "Mark Attendance",
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">June</h2>
      </div>
      <div className="grid grid-cols-7  bg-white text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-2 font-semibold bg-blue-200 ">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className="h-24 border text-lg font-bold flex flex-col items-center justify-center"
          >
            <span>{day}</span>
            {attendance[day] && (
              <div
                className={`mt-2 px-2 py-1 rounded ${
                  attendance[day] === "Present" ? "bg-green-200" : "bg-blue-200"
                }`}
              >
                {attendance[day]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
*/}
