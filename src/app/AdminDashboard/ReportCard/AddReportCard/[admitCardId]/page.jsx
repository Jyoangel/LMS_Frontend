"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Successcard from "@/Components/Successcard";
import { addReportCardData } from "../../../../../../api/reportcardapi"; // add api report card 
import { fetchAdmitCardById } from "../../../../../../api/reportcardapi"; // fetch api admit card by id 
import { useUser } from '@auth0/nextjs-auth0/client';


export default function AddReportCard({ params }) {
  const { admitCardId } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [admitCard, setAdmitCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");// To store AdmitCard data
  const { user, isLoading } = useUser();


  const [formData, setFormData] = useState({
    //type: "",
    marks: {},
    classTeacher: "",
    admitCardId: admitCardId,
    userId: user.sub
  });

  // Fetch AdmitCard data by ID when component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const admitCardData = await fetchAdmitCardById(admitCardId);
        console.log(admitCardData); // Fetch AdmitCard data
        setAdmitCard(admitCardData); // Set fetched AdmitCard data to state
      } catch (error) {
        console.error("Failed to fetch admit card:", error);
      }
    }

    fetchData();
  }, [admitCardId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMarksChange = (subjectName, e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      marks: {
        ...formData.marks,
        [subjectName]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!formData.classTeacher) {
      setErrorMessage("Class teacher name is required.");
      return;
    }

    if (!Object.keys(formData.marks).length) {
      setErrorMessage("Marks for at least one subject must be provided.");
      return;
    }

    const invalidMarks = Object.values(formData.marks).some(
      (mark) => isNaN(mark) || mark < 0 || mark > 100
    );
    if (invalidMarks) {
      setErrorMessage("Please provide valid marks between 0 and 100.");
      return;
    }


    try {
      // Add admitCardId to formData before submission
      const reportCardData = {
        admitCardId,
        ...formData,
      };

      // Call your API function to add report card data
      const response = await addReportCardData(reportCardData);
      console.log("Report card data added:", response); // Optional: Handle success message or redirect

      // Optionally, open success modal or handle success state
      openModal();
      alert("Report card data added successfully.");
    } catch (error) {
      // Handle specific error cases
      if (error.response && error.response.status === 400) {
        // Status 400 for bad request (could be validation issues)
        alert("Invalid data submitted. Please check your input.");
      } else if (error.response && error.response.status === 409) {
        // Status 409 represents conflict (e.g., duplicate data)
        alert("Report Card already exists for this admit card.");
      } else {
        console.error("Failed to add report card data:", error);
        alert("Failed to add report card data. Please try again.");
      }
    }
  };


  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/ReportCard"}>
            <button className="flex items-center justify-center gap-3">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">



          {/* Marks - Render dynamically based on AdmitCard subjects */}
          {admitCard && (
            <div className="grid grid-cols-2 gap-8">
              {admitCard.examsubjects.map((subject, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <label
                    htmlFor={`marks-${subject.subject}`}
                    className="text-lg font-normal text-black"
                  >
                    {subject.subject} Marks*
                  </label>
                  <input
                    id={`marks-${subject.subject}`}
                    type="number"
                    name={subject.subject}
                    value={formData.marks[subject.subject] || ""}
                    onChange={(e) => handleMarksChange(subject.subject, e)}
                    className="border border-gray-300 rounded-md py-3 px-5 outline-none"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Class Teacher */}
          <div className="flex flex-col gap-3">
            <label htmlFor="classTeacher" className="text-lg font-normal text-black">
              Class Teacher*
            </label>
            <input
              id="classTeacher"
              type="text"
              name="classTeacher"
              value={formData.classTeacher}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-3 px-5 outline-none"
              placeholder="Type here"
              required
            />
          </div>




          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              role="button"
              type="submit"
              className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Success Modal */}
        {isSelectOpen && (
          <Successcard
            para={"Report Card sent Successfully"}
            onClose={closeModal}
            url={"/AdminDashboard/ReportCard"}
          />
        )}
      </div>
    </>
  );
}

