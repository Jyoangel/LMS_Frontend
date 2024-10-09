"use client"

import Successcard from "@/Components/Successcard";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addCalendarData } from "../../../../../api/calendarapi"; // Importing the API function to add calendar data

// Main component for adding calendar details
const AddDetails = () => {
    // State to manage form data, select dropdown visibility, and success message
    const [formData, setFormData] = useState({
        type: '',            // Calendar entry type (e.g., Event, Exam)
        title: '',           // Title of the calendar entry
        date: '',            // Date of the event
        startTime: '',       // Start time of the event
        endTime: '',         // End time of the event
        duration: '',        // Duration of the event
        description: '',     // Description of the event
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false); // State to control the success message display
    const [successMessage, setSuccessMessage] = useState(''); // Holds the success or error message



    // Handle form input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update formData state
        setFormData((prevData) => {
            const updatedData = {
                ...prevData,
                [name]: value, // Update the specific form field with its new value
            };

            // Calculate the duration if startTime and endTime are available
            if (name === 'startTime' || name === 'endTime') {
                const { startTime, endTime } = updatedData;

                if (startTime && endTime) {
                    const start = new Date(`1970-01-01T${startTime}:00`);
                    const end = new Date(`1970-01-01T${endTime}:00`);

                    if (end > start) {
                        const diffMs = end - start; // Difference in milliseconds
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

                        updatedData.duration = `${diffHours}h ${diffMinutes}m`;
                    } else {
                        updatedData.duration = '';
                    }
                } else {
                    updatedData.duration = '';
                }
            }

            return updatedData;
        });
    };

    // Handle form submission and validation
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { type, title, date, startTime, endTime, duration, description } = formData;

        // Basic form validation to ensure all fields are filled out
        if (!type || !title || !date || !startTime || !endTime || !duration || !description) {
            alert('Please fill out all the fields.'); // Show alert if validation fails
            return; // Stop form submission if validation fails
        }


        // Ensure endTime is after startTime
        if (new Date(`${date}T${endTime}`) <= new Date(`${date}T${startTime}`)) {
            alert('End time must be later than start time.');
            return; // Stop form submission if time validation fails
        }
        try {
            // Call the API to add the calendar data
            await addCalendarData(formData);
            setSuccessMessage('Event added successfully!'); // Success message on successful submission
            setIsSelectOpen(true); // Show the success card
        } catch (error) {
            console.error('Error adding calendar data:', error); // Log error if API call fails
            setSuccessMessage('Failed to add event. Please try again.'); // Error message on failure
            setIsSelectOpen(true); // Show the error message in the success card
        }
    };

    return (
        <>
            {/* Main container for the form */}
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                {/* Back button to navigate to the previous page */}
                <div className="w-full flex flex-row justify-between">
                    <Link href={"/AdminDashboard/CalendarPage"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* Form to input calendar details */}
                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        {/* Dropdown to select the type of event */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Type" // Accessibility label
                            >
                                <option value="" className="text-gray-400 px">
                                    Select
                                </option>
                                <option value="Event">Event</option>
                                <option value="Exam">Exam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Title input field */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Title" // Accessibility label
                            />
                        </div>

                        {/* Date input field */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Date" // Accessibility label
                            />
                        </div>

                        {/* Start Time input field */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Start Time *</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Start Time" // Accessibility label
                            />
                        </div>

                        {/* End Time input field */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">End Time *</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="End Time" // Accessibility label
                            />
                        </div>

                        {/* Duration input field */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Duration *</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                readOnly
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Duration" // Accessibility label
                            />
                        </div>
                    </div>

                    {/* Description input field */}
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="description" className="text-lg font-normal text-black">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                        aria-label="Submit" // Accessibility label
                    >
                        Submit
                    </button>

                    {/* Success message displayed after form submission */}
                    {isSelectOpen && (
                        <Successcard onClose={() => setIsSelectOpen(false)} para={successMessage} url={"/AdminDashboard/CalendarPage"} />
                    )}
                </form>
            </div>
        </>
    );
};

export default AddDetails;

{/*
import Successcard from "@/Components/Successcard";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addCalendarData } from "../../../../../api/calendarapi"; // add api

const AddDetails = () => {
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        duration: '',
        description: '',
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { type, title, date, startTime, endTime, duration, description } = formData;

        if (!type || !title || !date || !startTime || !endTime || !duration || !description) {
            alert('Please fill out all the fields.');
            return; // Stop form submission if validation fails
        }
        try {
            await addCalendarData(formData);
            setSuccessMessage('Event added successfully!');
            setIsSelectOpen(true);
        } catch (error) {
            console.error('Error adding calendar data:', error);
            setSuccessMessage('Failed to add event. Please try again.');
            setIsSelectOpen(true);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full flex flex-row justify-between">
                    <Link href={"/AdminDashboard/CalendarPage"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Type"
                            >
                                <option value="" className="text-gray-400 px">
                                    Select
                                </option>
                                <option value="Event">Event</option>
                                <option value="Exam">Exam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Title"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Date"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Start Time *</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Start Time"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">End Time *</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="End Time"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Duration *</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                aria-label="Duration"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="description" className="text-lg font-normal text-black">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                        aria-label="Submit"
                    >
                        Submit
                    </button>

                    {isSelectOpen && (
                        <Successcard onClose={() => setIsSelectOpen(false)} para={successMessage} url={"/AdminDashboard/CalendarPage"} />
                    )}
                </form>
            </div>
        </>
    );
}

export default AddDetails;

{/*"use client";


import Successcard from "@/Components/Successcard";
import React, { useState } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addCalendarData } from "../../../../../api/calendarapi"; // Adjust the import path as necessary

const AddDetails = () => {
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        duration: '',
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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
            await addCalendarData(formData);
            setSuccessMessage('Event added successfully!');
            setIsSelectOpen(true);
        } catch (error) {
            console.error('Error adding calendar data:', error);
            setSuccessMessage('Failed to add event. Please try again.');
            setIsSelectOpen(true);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full flex flex-row justify-between">
                    <Link href={"/AdminDashboard/CalendarPage"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Type *</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">
                                    Select
                                </option>
                                <option value="Event">Event</option>
                                <option value="Exam">Exam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Date *</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Start Time *</label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">End Time *</label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Duration *</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                    >
                        Submit
                    </button>

                    {isSelectOpen && (
                        <Successcard onClose={() => setIsSelectOpen(false)} para={successMessage} />
                    )}
                </form>
            </div>
        </>
    );
}

export default AddDetails;

{/*
import Successcard from "@/Components/Successcard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

const AddDetails = () => {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full flex flex-row justify-between">
                    <Link href={"/AdminDashboard/CalendarPage"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Type *</label>
                            <select
                                type="text"


                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">
                                    Select
                                </option>
                                <option value="Male">Event</option>
                                <option value="Female">Exam</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Title *</label>
                            <input
                                type="text"


                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Date *</label>
                            <input
                                type="Date"


                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Start Time *</label>
                            <input
                                type="time"


                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">End Time *</label>
                            <input
                                type="time"


                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Duration *</label>
                            <input
                                type="text"


                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                    >
                        Submit
                    </button>

                    {isSelectOpen && (
                        <Successcard onClose={() => setIsSelectOpen(false)} para={" Event added successfully!"} />
                    )}
                </form>
            </div>
        </>
    );
}


export default AddDetails
*/}