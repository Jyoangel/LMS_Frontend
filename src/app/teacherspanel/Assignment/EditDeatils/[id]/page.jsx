"use client";


import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchAssignmentById, updateAssignmentData } from "../../../../../../api/assignmentapi"; // api to fetch and update specific assignment data 

export default function EditDetails({ params }) {
    const { id } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        assignmentCode: "",
        assignmentTitle: "",
        dueDate: "",
        attachments: "",
        submissionMethod: "",
        marks: "",
        additionalInstruction: "",
        class: "",
        assignTo: "",
        courseDescription: "",
        createdBy: ""
    });

    // Call API to fetch initial assignment data 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAssignmentById(id);

                // Format dueDate if it's a valid date
                if (data.dueDate) {
                    data.dueDate = new Date(data.dueDate).toISOString().split("T")[0];
                }

                setFormData(data);
            } catch (error) {
                console.error('Error fetching assignment data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    // use to handle submit and update assignment data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAssignmentData(id, formData);
            openModal();
        } catch (error) {
            console.error('Error updating assignment data:', error);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href={"/teacherspanel/Assignment"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">

                            {/* Assignment Code */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="assignmentCode" className="text-lg font-normal text-black">
                                    Assignment Code
                                </label>
                                <input
                                    type="text"
                                    id="assignmentCode"
                                    name="assignmentCode"
                                    value={formData.assignmentCode}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Assignment Title */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="assignmentTitle" className="text-lg font-normal text-black">
                                    Assignment Title
                                </label>
                                <input
                                    type="text"
                                    id="assignmentTitle"
                                    name="assignmentTitle"
                                    value={formData.assignmentTitle}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Due Date */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="dueDate" className="text-lg font-normal text-black">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Attachments */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="attachments" className="text-lg font-normal text-black">
                                    Attachments
                                </label>
                                <input
                                    type="text"
                                    id="attachments"
                                    name="attachments"
                                    value={formData.attachments}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Submission Method */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="submissionMethod" className="text-lg font-normal text-black">
                                    Submission Method
                                </label>
                                <select
                                    id="submissionMethod"
                                    name="submissionMethod"
                                    value={formData.submissionMethod}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>

                            {/* Marks */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="marks" className="text-lg font-normal text-black">
                                    Marks
                                </label>
                                <input
                                    type="text"
                                    id="marks"
                                    name="marks"
                                    value={formData.marks}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Additional Instruction */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="additionalInstruction" className="text-lg font-normal text-black">
                                    Additional Instruction
                                </label>
                                <input
                                    type="text"
                                    id="additionalInstruction"
                                    name="additionalInstruction"
                                    value={formData.additionalInstruction}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Class */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="class" className="text-lg font-normal text-black">
                                    Class
                                </label>
                                <select
                                    id="class"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="">Select</option>
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Assign To */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="assignTo" className="text-lg font-normal text-black">
                                    Assign To
                                </label>
                                <select
                                    id="assignTo"
                                    name="assignTo"
                                    value={formData.assignTo}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="All Students">All Students</option>
                                    <option value="Roll 1-30">Roll 1-30</option>
                                    <option value="Roll 30-60">Roll 30-60</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Course Description */}
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="courseDescription" className="text-lg font-normal text-black">
                            Course Description
                        </label>
                        <textarea
                            id="courseDescription"
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>

                    {/* Created By */}
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="createdBy" className="text-lg font-normal text-black">
                            Created By
                        </label>
                        <input
                            type="text"
                            id="createdBy"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-6 rounded-md"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            //onClick={() => router.back()}
                            className="w-44 text-black border border-gray-400 font-medium text-lg p-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                {isSelectOpen && <Successcard message="Assignment updated successfully!" onClose={closeModal} url={"/teacherspanel/Assignment"} />}
            </div>
        </>
    );
}

{/*
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchAssignmentById, updateAssignmentData } from "../../../../../../api/assignmentapi";

export default function EditDetails({ params }) {
    const { id } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        assignmentCode: "",
        assignmentTitle: "",
        dueDate: "",
        attachments: "",
        submissionMethod: "",
        marks: "",
        additionalInstruction: "",
        class: "",
        assignTo: "",
        courseDescription: "",
        createdBy: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAssignmentById(id);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching assignment data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateAssignmentData(id, formData);
            openModal();
        } catch (error) {
            console.error('Error updating assignment data:', error);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href={"/teacherspanel/Assignment"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">

                            {/* Assignment Code *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Assignment Code
                                </label>
                                <input
                                    type="text"
                                    name="assignmentCode"
                                    value={formData.assignmentCode}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Assignment Title *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Assignment Title
                                </label>
                                <input
                                    type="text"
                                    name="assignmentTitle"
                                    value={formData.assignmentTitle}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Due Date *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Due Date*
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Attachments *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Attachments*
                                </label>
                                <input
                                    type="text"
                                    name="attachments"
                                    value={formData.attachments}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Submission Method *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Submission Method*
                                </label>
                                <select
                                    name="submissionMethod"
                                    value={formData.submissionMethod}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                >
                                    <option value="" className="text-gray-400">
                                        Select
                                    </option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>

                            {/* Marks *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Marks*</label>
                                <input
                                    type="text"
                                    name="marks"
                                    value={formData.marks}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Additional Instruction *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Additional Instruction *
                                </label>
                                <input
                                    type="text"
                                    name="additionalInstruction"
                                    value={formData.additionalInstruction}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            {/* Class *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">Class*</label>
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                >
                                    <option value="" className="text-gray-400">
                                        Select
                                    </option>
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Assign To *
                            <div className="flex flex-col gap-3 w-full">
                                <label className="text-lg font-normal text-black">
                                    Assign To*
                                </label>
                                <select
                                    name="assignTo"
                                    value={formData.assignTo}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                >
                                    <option value="" className="text-gray-400">
                                        Select
                                    </option>
                                    <option value="All Students">All Students</option>
                                    <option value="Roll 1-30">Roll 1-30</option>
                                    <option value="Roll 30 -60 ">Roll 30-60</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Course Description *
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-lg font-normal text-black">
                            Course Description*
                        </label>
                        <textarea
                            name="courseDescription"
                            value={formData.courseDescription}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>

                    {/* Created By *
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-lg font-normal text-black">
                            Created By*
                        </label>
                        <input
                            type="text"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        />
                    </div>

                    <div className="flex gap-5 pb-10">
                        <button
                            type="submit"
                            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            //onClick={() => router.back()}
                            className="w-44 text-black border border-gray-400 font-medium text-lg p-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Assignment updated successfully!"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
    */}
