"use client";

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { updateCourseData, fetchCourseById } from "../../../../../../api/courseapi"; // api to update and celete specific course data

export default function CourseEdit({ params }) {
    const { id } = params;

    const [courseData, setCourseData] = useState({
        courseName: "",
        courseCode: "",
        primaryInstructorname: "",
        instructorEmail: "",
        schedule: {
            startDate: "",
            endDate: "",
            classDays: [],
            classTime: ""
        },
        courseObjectives: "",
        supplementaryMaterials: "",
        onlineResources: "",
        courseDescription: ""
    });

    const [isSelectOpen, setIsSelectOpen] = useState(false);

    // use to call api to fetch course data 
    useEffect(() => {
        async function fetchData() {
            try {
                const courseData = await fetchCourseById(id);
                if (courseData) {
                    // Format startDate and endDate if they are valid dates
                    if (courseData.schedule?.startDate) {
                        courseData.schedule.startDate = new Date(courseData.schedule.startDate)
                            .toISOString()
                            .split("T")[0];
                    }
                    if (courseData.schedule?.endDate) {
                        courseData.schedule.endDate = new Date(courseData.schedule.endDate)
                            .toISOString()
                            .split("T")[0];
                    }
                    setCourseData(courseData);
                }
            } catch (error) {
                console.error("Failed to fetch course data:", error);
            }
        }

        fetchData();
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleScheduleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'startDate' || name === 'endDate') {
            // Ensure date is formatted as yyyy-MM-dd
            const formattedDate = new Date(value).toISOString().split('T')[0];
            setCourseData((prevState) => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    [name]: formattedDate
                }
            }));
        } else {
            setCourseData((prevState) => ({
                ...prevState,
                schedule: {
                    ...prevState.schedule,
                    [name]: value
                }
            }));
        }
    };

    // use to submit form and call api to update course data 

    const handleSubmit = async () => {
        console.log('Submitting form:', courseData);
        if (!courseData.courseName || !courseData.courseCode || !courseData.primaryInstructorname || !courseData.instructorEmail || !courseData.schedule.startDate || !courseData.schedule.endDate || !courseData.courseDescription) {
            alert("Please fill in all required fields.");
            return;
        }

        // Convert startDate and endDate strings to Date objects
        const startDate = new Date(courseData.schedule.startDate);
        const endDate = new Date(courseData.schedule.endDate);

        // Check that startDate is before endDate
        if (startDate >= endDate) {
            alert("The start date must be before the end date.");
            return;
        }

        try {
            const response = await updateCourseData(id, courseData);
            console.log('Response:', response);
            openModal(); // Optionally open a modal upon successful update
        } catch (error) {
            console.error('Failed to update course data:', error);
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
                    <Link href={"/AdminDashboard/Course"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <h1 className="text-lg font-semibold">Course Details</h1>
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Course Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="courseName"
                                    value={courseData.courseName}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Course Code*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="courseCode"
                                    value={courseData.courseCode}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Instructor Name*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="primaryInstructorname"
                                    value={courseData.primaryInstructorname}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Instructor Email*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="instructorEmail"
                                    value={courseData.instructorEmail}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Start Date*
                                </label>
                                <input
                                    type="date"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="startDate"
                                    value={courseData.schedule.startDate}
                                    onChange={handleScheduleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    End Date*
                                </label>
                                <input
                                    type="date"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="endDate"
                                    value={courseData.schedule.endDate}
                                    onChange={handleScheduleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Class Days*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here (e.g., Monday, Tuesday)"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="classDays"
                                    value={courseData.schedule.classDays.join(', ')}
                                    onChange={handleScheduleChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Class Time*
                                </label>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    name="classTime"
                                    value={courseData.schedule.classTime}
                                    onChange={handleScheduleChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Course Objectives*
                            </label>
                            <textarea
                                type="text"
                                placeholder="Type here"
                                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                name="courseObjectives"
                                value={courseData.courseObjectives}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Supplementary Materials*
                            </label>
                            <textarea
                                type="text"
                                placeholder="Type here"
                                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                name="supplementaryMaterials"
                                value={courseData.supplementaryMaterials}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Online Resources*
                            </label>
                            <textarea
                                type="text"
                                placeholder="Type here"
                                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                name="onlineResources"
                                value={courseData.onlineResources}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <label className="text-lg font-normal text-black">
                                Course Description*
                            </label>
                            <textarea
                                type="text"
                                placeholder="Type here"
                                className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                name="courseDescription"
                                value={courseData.courseDescription}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="flex gap-5 pb-10">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
                        >
                            Update
                        </button>
                        <button className="w-44 text-black border border-gray-400 font-medium text-lg p-2">
                            Cancel
                        </button>
                    </div>
                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Course updated successfully!"}
                            url={"/AdminDashboard/Course"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
