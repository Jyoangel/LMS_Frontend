"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import ColorCard from "./components/ColorCard";
import EventCard from "./components/EventCard";
import StudentCard from "./components/StudentCard";
import total from "./total.png";
import struggling from "./struggling.png";
import excellent from "./excellent.png";
import progress from "./progress.png";
import staffs from "./img/staffs.png";
import student from "./img/student.png";
import teachers from "./img/teachers.png";
import InteractiveGraph from "./components/InteractiveGraph";
import { fetchCalendarData } from "../../../../api/calendarapi"; // api to fetch calendar data
import AttendanceChart from "./components/AttendanceChart";
import { fetchReportCardData } from "../../../../api/reportcardapi"; // api to fetch report card data
import { fetchStudentData } from "../../../../api/api"; // api gto fetch student data
import { fetchClassAttendanceData, fetchSchoolOverviewData } from "../../../../api/attendanceapi"; // api to fetch attendance according ti class and api to fetch shool overview data 

import { getData } from "../../../../api/api";// api to fetch count total student and present student
import { checkUserRole } from "../../../../api/teacherapi"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const classColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)']; // Define more colors if needed
export default function Dashboard() {
  const [data, setData] = useState({});

  const [events, setEvents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classData, setClassData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [topPerformingStudents, setTopPerformingStudents] = useState([]);
  const [error, setError] = useState(null);// For the class dropdown
  const [year, setYear] = useState(new Date().getFullYear());
  const [schoolOverviewData, setSchoolOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();




  // Check user role and retrieve userId
  // Check user role and retrieve userId
  useEffect(() => {
    if (!user) return; // Prevent unnecessary fetch if user data isn't available yet

    async function getUserRole() {
      const email = user?.email;
      if (!email) return;

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

  // Fetch data when userId is available
  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        const data = await getData(userId);
        console.log("data", data);
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  // Fetch student data when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const classData = await fetchStudentData(userId);
        setClasses(classData.students);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchData();
  }, [userId]);

  // Fetch class attendance data when a class is selected
  useEffect(() => {
    if (selectedClass) {
      fetchClassAttendanceData(selectedClass).then(data => {
        setClassData(data);
      }).catch(error => {
        console.error('Error fetching attendance data:', error);
      });
    }
  }, [selectedClass]);

  // Fetch top students based on report card data
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const data = await fetchReportCardData(userId);
        const filteredStudents = data.filter(student => student.percentage > 75);
        setTopStudents(filteredStudents.length ? filteredStudents : []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [userId]);

  // Fetch top performing students data
  useEffect(() => {
    if (!userId) return;

    const getTopPerformingStudents = async () => {
      try {
        const reportData = await fetchReportCardData(userId);
        const sortedStudents = reportData.sort((a, b) => b.percentage - a.percentage);
        const top3Students = sortedStudents.slice(0, 3);

        const topStudentsWithSubjects = top3Students.map(student => {
          const topSubjects = student.subjects
            .sort((a, b) => b.marks - a.marks)
            .slice(0, 3);

          return {
            name: student.studentID.name,
            subjects: topSubjects.map(subject => subject.subjectName),
          };
        });

        setTopPerformingStudents(topStudentsWithSubjects);
      } catch (err) {
        setError(err.message);
      }
    };

    getTopPerformingStudents();
  }, [userId]);

  // Fetch school overview data
  useEffect(() => {
    const getSchoolOverviewData = async () => {
      setLoading(true);
      try {
        const data = await fetchSchoolOverviewData();
        setSchoolOverviewData(data);
      } catch (err) {
        setError('Error fetching school overview data.');
      } finally {
        setLoading(false);
      }
    };

    getSchoolOverviewData();
  }, []);

  // Fetch calendar events
  useEffect(() => {
    if (!userId) return;

    async function fetchEvents() {
      try {
        const eventData = await fetchCalendarData(userId);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

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
  }, [userId]);

  if (userLoading || loading) {
    return <div>Loading...</div>; // Display a loading spinner/message when user or data is still loading
  }


  //if (error) return <div>{error}</div>;
  // if (!data) {
  //   return <div>No data found</div>;
  // }
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
      <div className=" w-full px-10 flex flex-col gap-5  py-10 ">
        <div className="flex w-full gap-9">
          <ColorCard
            icon={student}
            text={"Total Students"}
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
            text={"Course Name"}
            number={"50%"}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={teachers}
            text={"Course Name"}
            number={"50%"}
            color={"bg-green-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Home work"}
            number={data.homeworkCount}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Undone Home Work"}
            number={"3"}
            color={"bg-green-600"}
          />
        </div>

        {/*  Upcoming School Events */}

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-black text-xl font-bold">Upcoming School Events</h1>
          <div className="flex flex-row gap-3">
            {/* The .map() function iterates over the events array, rendering an EventCard component for each event. */}
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  name={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  time={event.startTime}
                  description={event.description}

                />
              ))
            ) : (
              <p>No upcoming events available.</p> // Fallback message when no events are available
            )}
          </div>
        </div>

        {/* School Parformance */}

        <div className="h-auto w-full flex flex-row gap-5 items-center justify-center  ">
          <div className="flex flex-col gap-3 w-[50%]">
            <h1 className="text-black text-xl font-bold">Top Student</h1>
            <div className="w-full h-[324px] bg-blue-100 grid grid-cols-2 gap-3 justify-items-center p-5 rounded-lg">
              {error && <p className="text-red-500">{error}</p>}
              {/* The .map() function iterates over the students array, rendering an StudentCard component for each event. */}
              {topStudents.map((student) => (
                <StudentCard
                  key={student.id} // assuming each student has a unique id
                  name={student.studentID.name}
                  percentage={student.percentage}
                />
              ))}
            </div>
          </div>
          <div className="w-[50%]   flex flex-col gap-3">
            <h1 className="text-black text-md font-bold">School Overview</h1>
            {schoolOverviewData && (
              <InteractiveGraph chartId="schoolOverviewChart" chartData={schoolOverviewData} />
            )}
          </div>
        </div>


        {/* Attendance of Student */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <h1>Attendance</h1>
            <div className="flex flex-row items-center justify-between gap-3">
              <h1>Filter</h1>
              <select
                className="h-10 w-24 rounded-lg border border-gray-300 outline-none"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {[...new Set(classes.map((classItem) => classItem.class))].map((classItem, index) => (
                  <option key={index} value={classItem}>{classItem}</option>
                ))}
              </select>
            </div>

          </div>

          {console.log('Class data passed to AttendanceChart:', classData)}
          <AttendanceChart
            labels={months}
            classData={classData}
            colors={classColors}
          />
        </div>



        <div className="flex flex-row gap-5 w-full">
          <div className="w-[50%] flex flex-col  gap-5">
            <h1>Class Statistics</h1>
            <div className="h-[400px] w-full bg-blue-300 flex flex-col gap-10 items-center justify-center rounded-lg">
              <div className="flex flex-row gap-5 items-center justify-center">
                <div className="h-[165px] w-[160px] flex flex-col gap-3 bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={total} alt="total" />
                  <h1 className="text-black text-lg font-semibold">
                    Total Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">{data.count}</h1>
                </div>
                <div className="h-[165px] w-[160px] flex flex-col  bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={struggling} alt="total" />
                  <h1 className="text-black text-lg text-center font-semibold">
                    Excellence Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">{data.excellenceCount}</h1>
                </div>
                <div className="h-[165px] w-[160px] flex flex-col  bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={excellent} alt="total" />
                  <h1 className="text-black text-lg text-center font-semibold">
                    Struggling Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">{data.strugglingCount}</h1>
                </div>
              </div>
              <div className="h-[110px] w-[525px] border border-blue-500 rounded-lg bg-white flex flex-row gap-5">
                <Image src={progress} alt="total" className="h-20 w-20" />
                <div className="flex flex-col">
                  <h1>Class Progress</h1>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
                  </div>
                  <h1>30% of the proress</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%] flex flex-col gap-5">
            <h1>Struggling & Excelling</h1>
            <div className="h-[400px] w-full bg-blue-200 flex flex-col gap-10 rounded-lg p-5">
              <h1>Top 3 Excellent Students</h1>
              {/* The .map() function iterates over the reportcard  array, rendering an topperforming student . */}
              {topPerformingStudents.map((student, index) => (
                <div key={index} className="flex flex-row justify-between w-full">
                  <div className="flex flex-row gap-5">
                    <Image src={excellent} alt="Excellent Student" />

                    <div className="flex flex-col">
                      <h1>{student.name}</h1>
                      <h1 className="text-gray-500 text-sm">
                        {student.subjects.join(", ")}  {/* Display top 3 subjects */}
                      </h1>
                    </div>
                  </div>
                  <div className="h-10 w-16 border border-blue-500 rounded-xl text-blue-500 p-2">
                    View
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
{/*
import { useState, useEffect } from "react";
import Image from "next/image";
import ColorCard from "./components/ColorCard";
import EventCard from "./components/EventCard";
import StudentCard from "./components/StudentCard";
import total from "./total.png";
import struggling from "./struggling.png";
import excellent from "./excellent.png";
import progress from "./progress.png";
import staffs from "./img/staffs.png";
import student from "./img/student.png";
import teachers from "./img/teachers.png";
import InteractiveGraph from "./components/InteractiveGraph";
import { fetchCalendarData } from "../../../../api/calendarapi";
import AttendanceChart from "./components/AttendanceChart";
import { fetchReportCardData } from "../../../../api/reportcardapi";

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const classColors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)']; // Define more colors if needed
export default function Dashboard() {


  const [events, setEvents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classData, setClassData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [topStudents, setTopStudents] = useState([]);
  const [error, setError] = useState(null);// For the class dropdown
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    // Fetch classes once when the component mounts
    fetchClasses().then(data => setClasses(data));
  }, []);

  

  useEffect(() => {
    if (selectedClass) {
      fetchClassAttendanceData(selectedClass).then(data => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setClassData(data);
        } else {
          console.error('Invalid data format:', data);
          setClassData([]);
        }
      });
    }
  }, [selectedClass]);

  
 
  


  

  const fetchClasses = async () => {
    // Replace with your actual API call
    return [
      { id: '1', name: 'Class 1' },
      { id: '2', name: 'Class 2' }
    ];
  };

  const fetchClassAttendanceData = async (classId) => {
    // Replace with your actual API call
    const data = [
      { month: 'January', attendance: 80 },
      { month: 'February', attendance: 82 },
      { month: 'March', attendance: 88 },
      { month: 'April', attendance: 84 },
      { month: 'May', attendance: 72 },
      { month: 'June', attendance: 89 },
      { month: 'July', attendance: 81 },
      { month: 'August', attendance: 86 },
      { month: 'September', attendance: 78 },
      { month: 'October', attendance: 98 },
      { month: 'November', attendance: 92 },
      { month: 'December', attendance: 94 },
      // ... more data
    ];
    return data;
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await fetchReportCardData();
        const filteredStudents = data.filter(student => student.percentage > 80);
        setTopStudents(filteredStudents);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventData = await fetchCalendarData();
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


  const schoolOverviewData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: 'Total Present Students',
        data: [65, 67, 70, 73, 75, 77, 80, 82, 80, 78, 75, 73],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Total Present Teachers',
        data: [100, 98, 95, 88, 86, 96, 97, 87, 85, 94, 92, 93],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },

      {
        label: 'Student Attendance (%)',
        data: [95, 94, 93, 96, 97, 95, 96, 95, 94, 93, 92, 93],
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'Teacher Attendance (%)',
        data: [98, 97, 96, 98, 99, 98, 97, 96, 97, 98, 97, 98],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },


    ]
  };


  return (
    <>
      <div className=" w-full px-10 flex flex-col gap-5  py-10 ">
        <div className="flex w-full gap-9">
          <ColorCard
            icon={student}
            text={"Total Students"}
            number={"60"}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={student}
            text={"Total Present Students"}
            number={"58"}
            color={"bg-green-600"}
          />
          <ColorCard
            icon={teachers}
            text={"Course Name"}
            number={"50%"}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={teachers}
            text={"Course Name"}
            number={"50%"}
            color={"bg-green-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Home work"}
            number={"60"}
            color={"bg-blue-600"}
          />
          <ColorCard
            icon={staffs}
            text={"Undone Home Work"}
            number={"3"}
            color={"bg-green-600"}
          />
        </div>

        {/*  Upcoming School Events *

        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-black text-xl font-bold">Upcoming School Events</h1>
          <div className="flex flex-row gap-3">
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event) => (
                <EventCard
                  key={event._id}
                  name={event.title}
                  date={new Date(event.date).toLocaleDateString()}
                  time={event.startTime}
                  description={event.description}

                />
              ))
            ) : (
              <p>No upcoming events available.</p> // Fallback message when no events are available
            )}
          </div>
        </div>

        {/* School Parformance *

        <div className="h-auto w-full flex flex-row gap-5 items-center justify-center  ">
          <div className="flex flex-col gap-3 w-[50%]">
            <h1 className="text-black text-xl font-bold">Top Student</h1>
            <div className="w-full h-[324px] bg-blue-100 grid grid-cols-2 gap-3 justify-items-center p-5 rounded-lg">
              {error && <p className="text-red-500">{error}</p>}
              {topStudents.map((student) => (
                <StudentCard
                  key={student.id} // assuming each student has a unique id
                  name={student.name}
                  percentage={student.percentage}
                />
              ))}
            </div>
          </div>
          <div className="w-[50%]   flex flex-col gap-3">
            <h1 className="text-black text-md font-bold">School Overview</h1>
            <InteractiveGraph chartId="schoolOverviewChart" chartData={schoolOverviewData} />
          </div>
        </div>
        {/* Attendance of Student *
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between">
            <h1>Attendance</h1>
            <div className="flex flex-row items-center justify-between gap-3">
              <h1>Filter</h1>
              <select
                className="h-10 w-24 rounded-lg border border-gray-300 outline-none"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                ))}
              </select>
            </div>
          </div>
          <AttendanceChart
            labels={months}
            classData={classData}
            colors={classColors}
          />
        </div>

        

        <div className="flex flex-row gap-5 w-full">
          <div className="w-[50%] flex flex-col  gap-5">
            <h1>Class Statistics</h1>
            <div className="h-[400px] w-full bg-blue-300 flex flex-col gap-10 items-center justify-center rounded-lg">
              <div className="flex flex-row gap-5 items-center justify-center">
                <div className="h-[165px] w-[160px] flex flex-col gap-3 bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={total} alt="total" />
                  <h1 className="text-black text-lg font-semibold">
                    Total Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">60</h1>
                </div>
                <div className="h-[165px] w-[160px] flex flex-col gap-3 bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={struggling} alt="total" />
                  <h1 className="text-black text-lg font-semibold">
                    Total Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">40</h1>
                </div>
                <div className="h-[165px] w-[160px] flex flex-col gap-3 bg-white rounded-lg items-center justify-center border border-blue-500">
                  <Image src={excellent} alt="total" />
                  <h1 className="text-black text-lg font-semibold">
                    Total Students
                  </h1>
                  <h1 className="text-black text-xl font-bold">20</h1>
                </div>
              </div>
              <div className="h-[110px] w-[525px] border border-blue-500 rounded-lg bg-white flex flex-row gap-5">
                <Image src={progress} alt="total" className="h-20 w-20" />
                <div className="flex flex-col">
                  <h1>Class Progress</h1>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
                  </div>
                  <h1>30% of the proress</h1>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[50%] flex flex-col  gap-5 ">
            <h1>Struggling & Excelling</h1>
            <div className="h-[400px] w-full bg-blue-200 flex flex-col gap-10   rounded-lg p-5">
              <h1>Top 3 Excellent Student</h1>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-5">
                  <Image src={excellent} alt="total" />

                  <div className="flex flex-col">
                    <h1>Jay Kumar Rajak</h1>
                    <h1 className="text-gray-500 text-sm">
                      English, Hindi, Physics
                    </h1>
                  </div>
                </div>
                <div className="h-10 w-16 border border-blue-500 rounded-xl text-blue-500 p-2">
                  View
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-5">
                  <Image src={excellent} alt="total" />

                  <div className="flex flex-col">
                    <h1>Jay Kumar Rajak</h1>
                    <h1 className="text-gray-500 text-sm">
                      English, Hindi, Physics
                    </h1>
                  </div>
                </div>
                <div className="h-10 w-16 border border-blue-500 rounded-xl text-blue-500 p-2">
                  View
                </div>
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row gap-5">
                  <Image src={excellent} alt="total" />

                  <div className="flex flex-col">
                    <h1>Jay Kumar Rajak</h1>
                    <h1 className="text-gray-500 text-sm">
                      English, Hindi, Physics
                    </h1>
                  </div>
                </div>
                <div className="h-10 w-16 border border-blue-500 rounded-xl text-blue-500 p-2">
                  View
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
*/}