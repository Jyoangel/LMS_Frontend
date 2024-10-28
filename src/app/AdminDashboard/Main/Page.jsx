"use client"


import { useEffect, useState } from "react";
import ColorCard from "./components/ColorCard";
import EventCard from "./components/EventCard";
import StudentCard from "./components/StudentCard";
import StudentTable from "./components/StudentTable";
import TeacherTable from "./components/TeacherTable";
import staffs from "./img/staffs.png";
import student from "./img/student.png";
import teachers from "./img/teachers.png";
import Link from "next/link";


import { fetchCalendarData } from "../../../../api/calendarapi"; // api to fetch calendar dta 
import SchoolChart from './components/InteractiveGraph';
import { fetchReportCardData } from "../../../../api/reportcardapi"; // api to fetch repoty card
import { fetchSchoolOverviewData } from "../../../../api/attendanceapi"; // api to fetch school overview 

import { getData } from "../../../../api/api";// api to fetch count of all student teacher and staff struggling student excellence student 

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Main() {
  const [data, setData] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topStudents, setTopStudents] = useState([]);
  const [schoolOverviewData, setSchoolOverviewData] = useState(null);
  const { user, isLoading } = useUser();



  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(user.sub);
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchReportCardData(user.sub);
        const filteredStudents = data.filter(student => student.percentage > 80);
        setTopStudents(filteredStudents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // use to fetch upcoming event 
  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await fetchCalendarData(user.sub);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Filter the events to include only those for the current month and year
        const filteredEvents = eventData.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchEvents();
  }, []);
  useEffect(() => {
    // fetch school overview data 
    const getSchoolOverviewData = async () => {
      setLoading(true);
      const data = await fetchSchoolOverviewData();
      if (data) {
        setSchoolOverviewData(data);
      } else {
        setError('Error fetching school overview data.');
      }
      setLoading(false);
    };

    getSchoolOverviewData();
  }, []);



  if (loading) {
    return <div>Loading...</div>;
  }



  if (!data) {
    return <div>No data found</div>;
  }

  const schoolPerformanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: 'Average Student Grades',
        data: [78, 81, 83, 82, 85, 84, 86, 87, 88, 86, 85, 84],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Attendance Rate (%)',
        data: [92, 93, 91, 94, 95, 96, 95, 94, 95, 93, 94, 92],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Teacher Performance Score',
        data: [4.2, 4.3, 4.4, 4.5, 4.6, 4.5, 4.7, 4.8, 4.9, 4.7, 4.6, 4.5],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Extracurricular Participation (%)',
        data: [70, 72, 74, 73, 75, 77, 76, 78, 80, 79, 77, 76],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      }
    ]
  };


  // const schoolOverviewData = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  //   datasets: [
  //     {
  //       label: 'Total Present Students',
  //       data: [65, 67, 70, 73, 75, 77, 80, 82, 80, 78, 75, 73],
  //       borderColor: 'rgb(75, 192, 192)',
  //       backgroundColor: 'rgba(75, 192, 192, 0.5)',
  //     },
  //     {
  //       label: 'Total Present Teachers',
  //       data: [100, 98, 95, 88, 86, 96, 97, 87, 85, 94, 92, 93],
  //       borderColor: 'rgb(153, 102, 255)',
  //       backgroundColor: 'rgba(153, 102, 255, 0.5)',
  //     },

  //     {
  //       label: 'Student Attendance (%)',
  //       data: [95, 94, 93, 96, 97, 95, 96, 95, 94, 93, 92, 93],
  //       borderColor: 'rgb(255, 159, 64)',
  //       backgroundColor: 'rgba(255, 159, 64, 0.2)',
  //     },
  //     {
  //       label: 'Teacher Attendance (%)',
  //       data: [98, 97, 96, 98, 99, 98, 97, 96, 97, 98, 97, 98],
  //       borderColor: 'rgb(54, 162, 235)',
  //       backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //     },


  //   ]
  // };


  return (
    <>
      <div className=" w-full px-10 flex flex-col gap-3  py-10 ">
        <div className="flex w-full gap-9">
          <ColorCard
            icon={student}
            text={"Number of Students"}
            number={data.count}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={student}
            text={"Total Present Students"}
            number={data.presentCount}
            color={"bg-green-600"}
          />
          <ColorCard
            icon={teachers}
            text={"Number of Teachers"}
            number={data.teacherCount}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={teachers}
            text={"Total Present Teacher"}
            number={data.teacherPresentCount}
            color={"bg-green-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Number of Staffs"}
            number={data.staffCount}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Total Present Staffs"}
            number={data.staffPresentCount}
            color={"bg-green-600"}
          />
        </div>

        {/* School Parformance */}

        <div className="h-auto w-full flex flex-row gap-5 items-center justify-center  ">
          <div className="w-[50%]   flex flex-col gap-3">
            <h1 className="text-black text-md font-bold">School Performance</h1>
            {/* <InteractiveGraph /> */}
            <SchoolChart chartId="schoolPerformanceChart" chartData={schoolPerformanceData} />
          </div>
          <div className="w-[50%]   flex flex-col gap-3">
            <h1 className="text-black text-md font-bold">School Overview</h1>
            {schoolOverviewData && (
              <SchoolChart chartId="schoolOverviewChart" chartData={schoolOverviewData} />
            )}
          </div>
        </div>

        {/*  Upcoming School Events */}

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-black text-xl font-bold">Upcoming School Events</h1>
          <div className="flex flex-row gap-3">
            {/* The .map() function iterates over the events array, rendering an EventCard component for each event. */}
            {events.map((event) => (
              <EventCard
                key={event._id}
                name={event.title}
                date={new Date(event.date).toLocaleDateString()}
                time={event.startTime}
                description={event.description}

              />
            ))}
          </div>
        </div>
        {/* Top Student */}

        <div className="flex flex-row gap-3 w-full ">
          <div className="flex flex-col gap-3 w-[50%]">
            <h1 className="text-black text-xl font-bold">Top Student</h1>
            <div className="w-full h-[324px] bg-blue-100 grid grid-cols-2 gap-3 justify-items-center p-5 rounded-lg">
              {error && <p className="text-red-500">{error}</p>}
              {/* The .map() function iterates over the students array, rendering an StudentCard component for each student . */}
              {topStudents.map((student) => (
                <StudentCard
                  key={student.id} // assuming each student has a unique id
                  name={student.studentID.name}
                  percentage={student.percentage}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-[50%]">
            <h1 className="text-lg text-black font-semibold">Top Teachers</h1>
            <div className="w-full h-[324px] bg-blue-100 grid grid-cols-2 gap-3  justify-items-center p-5  rounded-lg">
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
              <StudentCard />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <h1 className="text-lg text-black font-semibold">Teachers Details</h1>
          <div className="flex flex-col ">
            <TeacherTable />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-lg text-black font-semibold">
            Fees Unpaid Students Lists
          </h1>
          <div className="flex flex-col">
            <StudentTable />
          </div>
        </div>
      </div>
    </>
  );
}
