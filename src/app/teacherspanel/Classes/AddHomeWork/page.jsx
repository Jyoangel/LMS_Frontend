"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addHomeworkData } from "../../../../../api/homeworkapi"; // api to add homework data 

export default function AddHomeWork() {
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        class: '',
        subjects: '',
        chapter: '',
        homework: '',
        submissionMethod: '',
        startDate: '',
        endDate: '',
        assignTo: '',
        attachments: '',
        description: ''
    });

    const [file, setFile] = useState(null);

    const openModal = () => {
        setIsSelectOpen(true);
    };

    const closeModal = () => {
        setIsSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // use to submit  the homework data and call add homework api 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        for (const key in formData) {
            if (formData[key] === '' && key !== 'attachments') {
                alert(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`);
                return;
            }
        }

        // Create FormData object
        const formDataWithFile = new FormData();
        Object.keys(formData).forEach(key => {
            formDataWithFile.append(key, formData[key]);
        });
        if (file) {
            formDataWithFile.append('uploadHomework', file);
        }

        try {
            await addHomeworkData(formDataWithFile);
            setFormData({
                class: '',
                subjects: '',
                chapter: '',
                homework: '',
                submissionMethod: '',
                startDate: '',
                endDate: '',
                assignTo: '',
                attachments: '',
                description: ''
            });
            setFile(null);
            openModal();
        } catch (error) {
            console.error("Failed to add homework data:", error);
            alert('Failed to add homework data. Please try again.');
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href={"/teacherspanel/Classes"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            {/* Existing input fields */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="class" className="text-lg font-normal text-black">Class *</label>
                                <input
                                    id="class"
                                    type="text"
                                    name="class"
                                    value={formData.class}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="subjects" className="text-lg font-normal text-black">Subjects *</label>
                                <input
                                    id="subjects"
                                    type="text"
                                    name="subjects"
                                    value={formData.subjects}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="chapter" className="text-lg font-normal text-black">Chapter *</label>
                                <input
                                    id="chapter"
                                    type="text"
                                    name="chapter"
                                    value={formData.chapter}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="homework" className="text-lg font-normal text-black">Home Work *</label>
                                <input
                                    id="homework"
                                    type="text"
                                    name="homework"
                                    value={formData.homework}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="submissionMethod" className="text-lg font-normal text-black">Submission Method *</label>
                                <select
                                    id="submissionMethod"
                                    name="submissionMethod"
                                    value={formData.submissionMethod}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                >
                                    <option value="" className="text-gray-400">Select</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="startDate" className="text-lg font-normal text-black">Start Date *</label>
                                <input
                                    id="startDate"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="endDate" className="text-lg font-normal text-black">End Date *</label>
                                <input
                                    id="endDate"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="assignTo" className="text-lg font-normal text-black">Assign To *</label>
                                <input
                                    id="assignTo"
                                    type="text"
                                    name="assignTo"
                                    value={formData.assignTo}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="attachments" className="text-lg font-normal text-black">Attachments *</label>
                                <input
                                    id="attachments"
                                    type="text"
                                    name="attachments"
                                    value={formData.attachments}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                    required
                                />
                            </div>

                            {/* File upload input */}
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="uploadHomework" className="text-lg font-normal text-black">Upload Homework *</label>
                                <input
                                    id="uploadHomework"
                                    type="file"
                                    name="uploadHomework"
                                    onChange={handleFileChange}
                                    className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
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

                    <div className="flex gap-5 pb-10">
                        <button
                            type="submit"
                            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({
                                class: '',
                                subjects: '',
                                chapter: '',
                                homework: '',
                                submissionMethod: '',
                                startDate: '',
                                endDate: '',
                                assignTo: '',
                                attachments: '',
                                description: ''
                            })}
                            className="w-44 text-black border border-gray-400 font-medium text-lg p-2"
                        >
                            Cancel
                        </button>
                    </div>

                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Homework created successfully!"}
                            url={"/teacherspanel/Classes"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
