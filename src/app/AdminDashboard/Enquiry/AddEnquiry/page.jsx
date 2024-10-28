"use client";

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addEnquiryData } from "../../../../../api/enquiryapi"; // add api 
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AddEnquiry() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const { user, error, isLoading } = useUser();


  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    enquiryRelated: "",
    userId: user ? user.sub : '',
  });
  const [validation, setValidation] = useState({
    isContactNumberValid: true,
    isEmailValid: true,
  });
  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  // Handle change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Reset validity on change for contact number and email
    if (name === "contactNumber") {
      setValidation((prev) => ({ ...prev, isContactNumberValid: true }));
    } else if (name === "email") {
      setValidation((prev) => ({ ...prev, isEmailValid: true }));
    }
  };
  // Handle form submission and validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for required fields
    const { name, contactNumber, email, enquiryRelated } = formData;

    if (!name || !contactNumber || !email || !enquiryRelated) {
      alert("Please fill out all required fields.");
      return; // Stop form submission if validation fails
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setValidation({ isEmailValid: false }); // Update email validity
      alert("Please enter a valid email address.");
      return;
    }

    // Validate contact number (for simplicity, let's assume it should be a 10-digit number)
    const contactNumberPattern = /^\d{10}$/;
    if (!contactNumberPattern.test(contactNumber)) {
      setValidation({ isContactNumberValid: false }); // Update contact number validity
      alert("Please enter a valid contact number (10 digits).");
      return;
    }

    // Reset validity if both fields are correct
    setValidation({ isContactNumberValid: true, isEmailValid: true });

    try {
      // Call the API to add the enquiry data
      await addEnquiryData(formData);
      openModal();
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        enquiryRelated: "",
      });
    } catch (error) {
      console.error("Failed to add enquiry data:", error);
      alert("Failed to add enquiry data. Please try again.");
    }
  };


  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Enquiry"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            {/* name */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="name" className="text-lg font-normal text-black">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
            {/* contact number */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="contactNumber" className="text-lg font-normal text-black">Contact Number *</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                style={{
                  color: validation.isContactNumberValid ? 'initial' : 'red', // Change border color based on validity
                }}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="text-lg font-normal text-black">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  color: validation.isEmailValid ? 'initial' : 'red', // Change border color based on validity
                }}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
          </div>

          {/* enquiry related */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="enquiryRelated" className="text-lg font-normal text-black">Enquiry Related *</label>
            <textarea
              id="enquiryRelated"
              name="enquiryRelated"
              value={formData.enquiryRelated}
              onChange={handleChange}
              placeholder="Type here"
              className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Save
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Enquiry Created successfully!"}
              url={"/AdminDashboard/Enquiry"}
            />
          )}
        </form>
      </div>
    </>
  );
}

{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addEnquiryData } from "../../../../../api/enquiryapi";

export default function AddEnquiry() {
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    enquiryRelated: "",
  });

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEnquiryData(formData);
      openModal();
      setFormData({
        name: "",
        contactNumber: "",
        email: "",
        enquiryRelated: "",
      });
    } catch (error) {
      console.error("Failed to add enquiry data:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/Enquiry"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form *
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            {/* name *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
            {/* contact number *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">
                Contact Number *
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
            {/* Email *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Type here"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                required
              />
            </div>
          </div>

          {/* enquiry related *
          <div className="flex flex-col gap-2 w-full">
            <label className="text-lg font-normal text-black">
              Enquiry Related *
            </label>
            <textarea
              name="enquiryRelated"
              value={formData.enquiryRelated}
              onChange={handleChange}
              placeholder="Type here"
              className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
          >
            Save
          </button>
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Enquiry Created successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}
  */}