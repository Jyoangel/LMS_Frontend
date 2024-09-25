"use client";
import { useState } from "react";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addTranspotationData, fetchTranspotationBystudentID } from "../../../../../../api/transpotationapi"; // fetch api of transportation using studntID 

export default function AddTranspotation({ params }) {
  const { studentID } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentID: studentID,
    pickupLocation: "",
    dropLocation: "",
    transportationFee: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.pickupLocation) {
        setValidationMessage("Please select the type of pickupLocation.");
        return;
      }
      if (!formData.dropLocation) {
        setValidationMessage("Please enter the dropLocation.");
        return;
      }
      if (!formData.transportationFee) {
        setValidationMessage("Please enter the Transportation Fee.");
        return;
      }


      // If no data exists (or fetch returns null/undefined), proceed with adding new transportation data
      await addTranspotationData(formData);
      setIsSelectOpen(true);
    } catch (error) {
      console.error("Failed to add transportation data", error);
    }
  };


  const closeModal = () => {
    setIsSelectOpen(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Transpotation"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">

            {/* Pickup Location */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="pickupLocation" className="text-lg font-normal text-black">Pickup Location *</label>
              <input
                id="pickupLocation"
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Enter pickup location"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            {/* Drop Location */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="dropLocation" className="text-lg font-normal text-black">Drop Location *</label>
              <input
                id="dropLocation"
                type="text"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleChange}
                placeholder="Enter drop location"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>

            {/* Transportation Fee */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="transportationFee" className="text-lg font-normal text-black">Transportation Fee *</label>
              <input
                id="transportationFee"
                type="text"
                name="transportationFee"
                value={formData.transportationFee}
                onChange={handleChange}
                placeholder="Enter transportation fee"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
          >
            Submit
          </button>

          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Transportation data added successfully!"}
              url={"/AdminDashboard/Transpotation"}
            />
          )}
        </form>
      </div>
    </>
  );
}
