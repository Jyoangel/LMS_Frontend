"use client";
import { useState, useEffect } from "react";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addLibraryData } from "../../../../../api/libraryapi"; // add api for library
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AddLibrary() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const { user, isLoading } = useUser();
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    subject: "",
    class: "",
    authorName: "",
    uploadedBy: "",
    description: "",
    uploadBookPdf: null, // Change to null to handle file upload

  });
  // Set userId when user data is available
  useEffect(() => {
    if (user && user.sub) {
      console.log("User ID:", user.sub); // Log user.sub to confirm it's a valid string
      setUserId(user.sub); // Set userId directly
    }
  }, [user]);
  const [error, setError] = useState(""); // To display error messages

  const openModal = () => {
    setIsSelectOpen(true);
  };

  const closeModal = () => {
    setIsSelectOpen(false);
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      uploadBookPdf: e.target.files[0], // Update file input to handle files
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    for (const key in formData) {
      if (formData[key] === null || formData[key] === "") {
        alert("All fields are required.");
        return;
      }
    }

    // Additional validation for specific fields
    if (formData.title.length < 3) {
      alert("Title must be at least 3 characters long.");
      return;
    }

    if (formData.uploadBookPdf && formData.uploadBookPdf.size > 5 * 1024 * 1024) { // 5MB size limit
      alert("Uploaded PDF file size should be less than 5MB.");
      return;
    }

    // Create a FormData object
    const data = new FormData();
    data.append("title", formData.title);
    data.append("type", formData.type);
    data.append("subject", formData.subject);
    data.append("class", formData.class);
    data.append("authorName", formData.authorName);
    data.append("uploadedBy", formData.uploadedBy);
    data.append("description", formData.description);
    data.append('userId', userId); // Ensure userId is
    // Check if uploadBookPdf is a valid file
    if (formData.uploadBookPdf instanceof File) {
      data.append("uploadBookPdf", formData.uploadBookPdf);
    }

    try {
      await addLibraryData(data);
      openModal();
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Failed to add Library data", error);
      alert("Failed to add Library data. Please try again.");
    }
  };



  return (
    <div className="h-screen w-full flex flex-col p-5 gap-10">
      <div className="w-full">
        <Link href={"/AdminDashboard/LibraryManage"}>
          <button className="flex items-center justify-center gap-2">
            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
            <h1 className="text-lg font-semibold">Back</h1>
          </button>
        </Link>
      </div>

      {/* form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-10" encType="multipart/form-data">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

        {/* Input fields */}
        {/* ... all your input fields here ... */}
        <div className="w-full grid grid-cols-3 items-center gap-8">
          {/* title */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title" className="text-lg font-normal text-black">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Type here"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>

          {/* subject */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="subject" className="text-lg font-normal text-black">
              Subject*
            </label>
            <input
              id="subject"
              name="subject"
              placeholder="Type here"
              value={formData.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>

          {/* class */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="class" className="text-lg font-normal text-black">
              Class*
            </label>
            <input
              id="class"
              name="class"
              placeholder="Type here"
              value={formData.class}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>

          {/* type */}
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="type" className="text-lg font-normal text-black">
              Type*
            </label>
            <input
              id="type"
              name="type"
              placeholder="Type here"
              value={formData.type}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>

          {/* author Name */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="authorName"
              className="text-lg font-normal text-black"
            >
              Author Name*
            </label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              placeholder="Type here"
              value={formData.authorName}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>
          {/* uploaded by */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="uploadedBy"
              className="text-lg font-normal text-black"
            >
              Uploaded By*
            </label>
            <input
              type="text"
              id="uploadedBy"
              name="uploadedBy"
              placeholder="Type here"
              value={formData.uploadedBy}
              onChange={handleChange}
              className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
            />
          </div>
        </div>

        {/* description */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="description"
            className="text-lg font-normal text-black"
          >
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Type here"
            value={formData.description}
            onChange={handleChange}
            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
          ></textarea>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="uploadBookPdf" className="text-lg font-normal text-black">Upload PDF*</label>
          <input
            id="uploadBookPdf"
            type="file"
            name="uploadBookPdf"
            onChange={handleFileChange}
            className="h-20 border border-gray-300 bg-gray-200 rounded-md w-full py-3 text-blue-500 px-5 outline-none"
          />
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
            para={"Library added successfully!"}
            url={"/AdminDashboard/LibraryManage"}
          />
        )}
      </form>
    </div>
  );
}
