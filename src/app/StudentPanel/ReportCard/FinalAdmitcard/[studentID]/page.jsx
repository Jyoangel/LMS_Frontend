"use client";

import React, { useState, useEffect, useRef } from "react";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";
import logo from "../logo.png";
import { fetchAdmitCardByStudentID, fetchReportCardByStudentID } from "../../../../../../api/reportcardapi"; // api to fetch admitcard ans report card vy student ID
import { fetchAdminUserByUserId } from "../../../../../../api/adminUser";// use to fetch admin details
import { format } from "date-fns";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { checkUserRole } from "../../../../../../api/api"; // Import checkUserRole function
import { useUser } from '@auth0/nextjs-auth0/client';

export default function FinalAdmitcard({ params, onClose }) {
  const { studentID } = params; // StudentID
  const [admitCardData, setAdmitCardData] = useState(null);
  const [reportCardData, setReportCardData] = useState(null); // For report card data
  const [adminUsers, setAdminUsers] = useState([]); // State for admin users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingReport, setLoadingReport] = useState(false); // To manage report card loading

  const [errorMessage, setErrorMessage] = useState(null);

  const noticeRef = useRef();
  const [userId, setUserId] = useState(null);
  const { user, error: authError, isLoading: userLoading } = useUser();



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

  // call api to fetch admicard bu studentID 
  useEffect(() => {
    fetchAdmitCardByStudentID(studentID)
      .then((data) => {
        setAdmitCardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch admit card data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [studentID]);

  // call api to fetch  report card data by studentID 
  const handleFetchReportCard = () => {
    setLoadingReport(true);

    fetchReportCardByStudentID(studentID)
      .then((reportData) => {
        if (reportData.error) {
          setReportCardData(null);
          setErrorMessage(reportData.error);
        } else {
          setReportCardData(reportData);
          setErrorMessage(null);
        }
        setLoadingReport(false);
      })
      .catch((error) => {
        console.error('Error fetching report card:', error);
        setErrorMessage('An unexpected error occurred while fetching the report card.');
        setLoadingReport(false);
      });
  };
  // Fetch admin users in a separate useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const adminUsers = await fetchAdminUserByUserId(userId);
        console.log(adminUsers); // Fetch admin users
        setAdminUsers(adminUsers); // Store fetched admin users
      } catch (error) {
        console.error('Error fetching admin users:', error);
      }
    };

    fetchUsers(); // Call the fetch function
  }, [userId]); // Empty dependency array means it runs only once when the component mounts
  // use to download  admitcard 
  const downloadAdmitCard = async () => {
    const input = document.getElementById("admitCard");
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 190;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("reportCard.pdf");
  };



  return (
    <>
      <div className="min-h-screen p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-6">
          <Link href={"/StudentPanel/ReportCard"}>
            <button className="flex items-center justify-center gap-3 mb-4 sm:mb-0">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
          <button
            className="text-blue-500 underline"
            onClick={downloadAdmitCard}
          >
            Download Admit Card
          </button>
        </div>


        <div>

          {admitCardData ? (
            <>


              <div className="w-full h-full flex ">
                <div ref={noticeRef} className="relative h-[640px] w-[700px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5" id="admitCard">
                  {/* Admit Card Info */}

                  <div className="flex flex-row gap-20">
                    <Image src={adminUsers?.picture} alt="Logo" className="h-[50px] w-[50px] rounded-full"
                      width={70} // Set width to avoid layout shift
                      height={70} />
                    <h1 className="text-black text-lg font-bold">{adminUsers?.name}</h1>
                  </div>
                  <div className="grid grid-cols-2 w-full gap-5">
                    {/* Left Column */}
                    <div className="flex flex-col gap-5">
                      <h1 className="text-lg font-medium">Examination Roll Number: <span className="text-black text-lg font-bold">{admitCardData?.examination_roll_number}</span></h1>
                      <h1 className="text-lg font-medium">Session: <span className="text-black text-lg font-bold">{admitCardData?.studentID?.session}</span></h1>
                      <h1 className="text-lg font-medium">Student Name: <span className="text-black text-lg font-bold">{admitCardData?.studentID?.name}</span></h1>
                      <h1 className="text-lg font-medium">Start Date: <span className="text-black text-lg font-bold">{admitCardData?.startdate ? format(new Date(admitCardData?.startdate), "yyyy-MM-dd") : "N/A"}</span></h1>
                      <h1 className="text-lg font-medium">Exam Starting Date: <span className="text-black text-lg font-bold">{admitCardData?.examstarting_time}</span></h1>
                    </div>
                    {/* Right Column */}
                    <div className="flex flex-col gap-5">
                      <h1 className="text-lg font-medium">School Name: <span className="text-black text-lg font-bold">{adminUsers?.name}</span></h1>
                      <h1 className="text-lg font-medium">Examination: <span className="text-black text-lg font-bold">{admitCardData?.examination}</span></h1>
                      <h1 className="text-lg font-medium">Class: <span className="text-black text-lg font-bold">{admitCardData?.studentID?.class}</span></h1>
                      <h1 className="text-lg font-medium">End Date: <span className="text-black text-lg font-bold">{admitCardData?.enddate ? format(new Date(admitCardData?.enddate), "yyyy-MM-dd") : "N/A"}</span></h1>
                      <h1 className="text-lg font-medium">Exam Ending Time: <span className="text-black text-lg font-bold">{admitCardData?.examending_time}</span></h1>
                    </div>
                  </div>
                  {/* Subject Table */}
                  <div className="flex flex-col">
                    <table className="w-full">
                      <thead>
                        <tr className="flex flex-row border border-gray-300">
                          <th className="text-black text-lg border-r border-gray-300 py-2 px-5">Sr. no</th>
                          <th className="text-black text-lg border-r border-gray-300 py-2 w-72 mx-auto">Subject Name</th>
                          <th className="text-black text-lg py-2 mx-auto">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {admitCardData?.examsubjects && admitCardData.examsubjects.length > 0 ? (
                          admitCardData.examsubjects.map((subject, index) => (
                            <tr key={index} className="flex flex-row border border-gray-300">
                              <td className="text-black text-lg border-r border-gray-300 py-2 px-5">{index + 1}.</td>
                              <td className="text-black text-lg border-r border-gray-300 py-2 w-72 mx-auto">{subject.subject}</td>
                              <td className="text-black text-lg py-2 mx-auto">{subject.examination_date ? format(new Date(subject.examination_date), "yyyy-MM-dd") : "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center text-black text-lg py-2">No subjects available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>

          ) : (
            !loading && <p>{error}</p>
          )}
        </div>

        {/* Report Card Section */}
        <div>
          <button onClick={handleFetchReportCard} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            View Report Card
          </button>
          {loadingReport && <p>Loading Report Card...</p>}
          {reportCardData ? (
            <div className=" w-full h-full flex ">
              <div
                ref={noticeRef}
                className="h-[720px] w-[700px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
              >

                <div className="flex flex-row gap-20">
                  <Image src={adminUsers?.picture} alt="Logo" className="h-[50px] w-[50px] rounded-full"
                    width={70} // Set width to avoid layout shift
                    height={70} />
                  <h1 className="text-black text-lg font-bold">
                    {adminUsers?.name}
                  </h1>
                </div>
                <div className="grid grid-cols-2 w-full gap-5">
                  <div className="flex flex-col gap-5">
                    <h1 className="text-lg font-medium">
                      Examination Roll Number:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.rollNumber}</span>{" "}
                    </h1>
                    <h1 className="text-lg font-medium">
                      Session:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.studentID.session}</span>{" "}
                    </h1>
                    <h1 className="text-lg font-medium">
                      Student Name:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.studentID.name}</span>{" "}
                    </h1>
                    <h1 className="text-lg font-medium">
                      Percentage:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.percentage}</span>{" "}
                    </h1>

                  </div>
                  <div className="flex flex-col gap-5 ">
                    <h1 className="text-lg font-medium">
                      Examination:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.type}</span>
                    </h1>
                    <h1 className="text-lg font-medium">
                      Class: <span className="text-black text-lg font-bold">{reportCardData.studentID.class}</span>
                    </h1>
                    <h1 className="text-lg font-medium">
                      Date of Birth:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData?.studentID.dateOfBirth ? format(new Date(reportCardData?.studentID.dateOfBirth), "yyyy-MM-dd") : "N/A"}</span>{" "}
                    </h1>
                    <h1 className="text-lg font-medium">
                      Status:{" "}
                      <span className="text-black text-lg font-bold">{reportCardData.status}</span>
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col">
                  <table className="w-full border border-gray-300">
                    <thead>
                      <tr className="border border-gray-300">
                        <th className="text-black text-lg border-r border-gray-300 py-2 px-5">Sr. no</th>
                        <th className="text-black text-lg border-r border-gray-300 py-2">Subject Name</th>
                        <th className="text-black text-lg py-2">Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportCardData.subjects.map((subject, index) => (
                        <tr key={index} className="border border-gray-300">
                          <td className="text-black text-lg border-r border-gray-300 py-2 px-5">{index + 1}</td>
                          <td className="text-black text-lg border-r border-gray-300 py-2">{subject.subjectName}</td>
                          <td className="text-black text-lg py-2">{subject.marks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 flex flex-col gap-5">
                    <p className="font-bold">Remarks</p>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Type here"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !loadingReport && <p>{errorMessage}</p>
          )}
        </div>

      </div >
    </>
  );
}
