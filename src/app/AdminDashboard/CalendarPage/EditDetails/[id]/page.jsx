"use client";
import Successcard from "@/Components/Successcard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchCalendarById, updateCalendarData, deleteCalendarData } from "../../../../../../api/calendarapi"; // api to fetch update and delete 

const EditDetails = ({ params, navigate }) => {
    const { id } = params;
    const router = useRouter();
    const [calendarData, setCalendarData] = useState({
        type: "",
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        duration: "",
        description: "",
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    // fetch calendar data
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await fetchCalendarById(id);

                    // Format date if it's a valid date
                    if (data.date) {
                        data.date = new Date(data.date).toISOString().split("T")[0];
                    }

                    setCalendarData(data); // Set formatted data into calendarData state
                } catch (error) {
                    console.error("Failed to fetch calendar data:", error);
                }
            };
            fetchData();
        }
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalendarData(prevData => ({ ...prevData, [name]: value }));
    };


    // update calendar data 
    const handleUpdate = async (e) => {
        e.preventDefault();
        const { type, title, date, startTime, endTime, duration, description } = calendarData;

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
            await updateCalendarData(id, calendarData);
            setIsSelectOpen(true); // Show success message
        } catch (error) {
            console.error("Failed to update calendar data:", error);
        }
    };

    // use to delete calendar data 
    const handleDelete = async () => {
        try {
            await deleteCalendarData(id);

            router.push("/AdminDashboard/CalendarPage"); // Redirect to Calendar Page after deletion

        } catch (error) {
            console.error("Failed to delete calendar data:", error);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col p-5 gap-10">
            {/* Back button to navigate to the previous page */}
            <div className="w-full flex flex-row justify-between">
                <Link href={"/AdminDashboard/CalendarPage"}>
                    <button className="flex items-center justify-center gap-2">
                        <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                        <h1 className="text-lg font-semibold">Back</h1>
                    </button>
                </Link>
                <div>
                    <button role="button" className="text-green-500" onClick={handleUpdate}>Edit</button>|
                    <button role="button" className="text-red-500" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            <form className="flex flex-col gap-10" onSubmit={handleUpdate}>
                <div className="w-full grid grid-cols-3 items-center gap-8">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="type" className="text-lg font-normal text-black">Type *</label>
                        <select
                            id="type"
                            name="type"
                            value={calendarData.type}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        >
                            <option value="" className="text-gray-400 px">Select</option>
                            <option value="Event">Event</option>
                            <option value="Exam">Exam</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="title" className="text-lg font-normal text-black">Title *</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={calendarData.title}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="date" className="text-lg font-normal text-black">Date *</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={calendarData.date}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="startTime" className="text-lg font-normal text-black">Start Time *</label>
                        <input
                            id="startTime"
                            type="time"
                            name="startTime"
                            value={calendarData.startTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="endTime" className="text-lg font-normal text-black">End Time *</label>
                        <input
                            id="endTime"
                            type="time"
                            name="endTime"
                            value={calendarData.endTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="duration" className="text-lg font-normal text-black">Duration *</label>
                        <input
                            id="duration"
                            type="text"
                            name="duration"
                            value={calendarData.duration}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>
                    {/* Description input field */}
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="description" className="text-lg font-normal text-black">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={calendarData.description}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>
                </div>

                <button
                    role="button"
                    type="submit"
                    className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                >
                    Submit
                </button>

                {isSelectOpen && (
                    <Successcard
                        key="success-card"
                        onClose={() => setIsSelectOpen(false)}
                        para="Event updated successfully!"
                        url={"/AdminDashboard/CalendarPage"}
                    />
                )}
            </form>
        </div>
    );
};

export default EditDetails;


{/*
import Successcard from "@/Components/Successcard";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchCalendarById, updateCalendarData, deleteCalendarData } from "../../../../../../api/calendarapi";

const EditDetails = ({ params }) => {
    const router = useRouter();

    const { id } = params;

    const [calendarData, setCalendarData] = useState({
        type: "",
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        duration: "",
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
        if (id) {
            async function fetchData() {
                try {
                    const data = await fetchCalendarById(id);
                    setCalendarData(data);
                } catch (error) {
                    console.error("Failed to fetch calendar data:", error);
                }
            }
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCalendarData({ ...calendarData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await updateCalendarData(id, calendarData);
            setIsSelectOpen(true); // Show success message
        } catch (error) {
            console.error("Failed to update calendar data:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCalendarData(id);
            router.push("/AdminDashboard/CalendarPage"); // Redirect to Calendar Page after deletion
        } catch (error) {
            console.error("Failed to delete calendar data:", error);
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
                    <div>
                        <button className="text-green-500" onClick={handleUpdate}>Edit</button>|
                        <button className="text-red-500" onClick={handleDelete}>Delete</button>
                    </div>
                </div>

                <form className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Type *</label>
                            <select
                                name="type"
                                value={calendarData.type}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">Select</option>
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
                                value={calendarData.title}
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
                                value={calendarData.date}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Start Time *</label>
                            <input
                                type="time"
                                name="startTime"
                                value={calendarData.startTime}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">End Time *</label>
                            <input
                                type="time"
                                name="endTime"
                                value={calendarData.endTime}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Duration *</label>
                            <input
                                type="text"
                                name="duration"
                                value={calendarData.duration}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                    >
                        Update
                    </button>

                    {isSelectOpen && (
                        <Successcard onClose={() => setIsSelectOpen(false)} para={"Event updated successfully!"} />
                    )}
                </form>
            </div>
        </>
    );
};

export default EditDetails;
*/}
