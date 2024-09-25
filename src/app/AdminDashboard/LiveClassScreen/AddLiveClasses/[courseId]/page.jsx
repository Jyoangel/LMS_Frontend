"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addLiveClassData } from "../../../../../../api/liveclassapi"; // add api of live class 

export default function AddLiveClasses({ params }) {
    const { courseId } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [liveclassData, setLiveclassData] = useState({
        topic: "",
        section: "",
        liveRoom: "",
        date: "",
        time: "",
        duration: "",
        assignTo: "",
        noteToStudents: "",
        courseId: courseId
    });

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLiveclassData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        for (const key in liveclassData) {
            if (liveclassData[key] === null || liveclassData[key] === "") {
                alert("All fields are required.");
                return;
            }
        }

        // Additional validation for date and time
        const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        if (!datePattern.test(liveclassData.date)) {
            alert("Date must be in the format YYYY-MM-DD.");
            return;
        }

        const timePattern = /^\d{2}:\d{2}$/; // HH:MM format
        if (!timePattern.test(liveclassData.time)) {
            alert("Time must be in the format HH:MM.");
            return;
        }



        try {

            // call the api to add live class 
            await addLiveClassData(liveclassData);
            openModal();
        } catch (error) {
            console.error("Failed to add live class data:", error);
            alert("Failed to add live class data. Please try again.");
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/LiveClassScreen"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        {/* live classes topic */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="topic"
                                className="text-lg font-normal text-black">
                                Live Classes Topic *
                            </label>
                            <input
                                id="topic"
                                type="text"
                                name="topic"
                                placeholder="Type here"
                                value={liveclassData.topic}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* section */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="section"
                                className="text-lg font-normal text-black">Section*</label>
                            <input
                                id="section"
                                name="section"
                                placeholder="Type here"
                                value={liveclassData.section}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Live Room */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="liveRoom"
                                className="text-lg font-normal text-black">
                                Live Room*
                            </label>
                            <input
                                id="liveRoom"
                                name="liveRoom"
                                placeholder="Type here"
                                value={liveclassData.liveRoom}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Date */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="date"
                                className="text-lg font-normal text-black">Date*</label>
                            <input
                                id="date"
                                type="date"
                                name="date"
                                value={liveclassData.date}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* time */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="time"
                                className="text-lg font-normal text-black">Time*</label>
                            <input
                                id="time"
                                type="time"
                                name="time"
                                value={liveclassData.time}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* duration */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="duration"
                                className="text-lg font-normal text-black">
                                Duration*
                            </label>
                            <input
                                id="duration"
                                type="text"
                                name="duration"
                                placeholder="Type here"
                                value={liveclassData.duration}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="assignTo"
                                className="text-lg font-normal text-black">
                                Assign To*
                            </label>
                            <input
                                id="assignTo"
                                type="text"
                                name="assignTo"
                                placeholder="Type here"
                                value={liveclassData.assignTo}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    {/* Note to the students * */}
                    <div className="flex flex-col gap-2 w-full">
                        <label
                            htmlFor="noteToStudents"
                            className="text-lg font-normal text-black">
                            Note to the students **
                        </label>
                        <textarea
                            id="noteToStudents"
                            name="noteToStudents"
                            placeholder="Type here"
                            value={liveclassData.noteToStudents}
                            onChange={handleChange}
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
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
                            para={" Live class added successfully!"}
                            url={"/AdminDashboard/LiveClassScreen"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
