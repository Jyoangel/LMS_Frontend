"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Successcard from "@/Components/Successcard";
import { fetchExamById, updateExamData } from "../../../../../../api/examapi"; // api to fetch and update the specifuc exam data 

export default function ExamDetails({ params }) {
    const { id } = params;
    const [formData, setFormData] = useState({
        type: "",
        examTitle: "",
        subject: "",
        date: "",
        startTime: "",
        duration: "",
        instruction: "",
        totalMarks: "",
        passingMarks: "",
        uploadQuestionPaper: ""
    });
    const [isSelectOpen, setIsSelectOpen] = useState(false);

    useEffect(() => {
        const loadExamData = async () => {
            try {
                const data = await fetchExamById(id);
                setFormData(data);
            } catch (error) {
                console.error("Failed to fetch exam data:", error);
                // Handle error, e.g., show an error message to the user
            }
        };

        loadExamData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "file" ? files[0] : value,
        }));
    };


    // use to handle submit the form and call api to update exam data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateExamData(id, formData);
            setIsSelectOpen(true);
        } catch (error) {
            console.error("Failed to update exam data:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col px-5 py-10 gap-10">
                <div className="w-full">
                    <Link href={"/teacherspanel/Exam"}>
                        <button className="flex items-center justify-center gap-3">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="type" className="text-lg font-normal text-black">Type*</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="examTitle" className="text-lg font-normal text-black">Exam Title*</label>
                                <input
                                    type="text"
                                    id="examTitle"
                                    name="examTitle"
                                    value={formData.examTitle}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="subject" className="text-lg font-normal text-black">Subject*</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="date" className="text-lg font-normal text-black">Date*</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="startTime" className="text-lg font-normal text-black">Start Time*</label>
                                <input
                                    type="text"
                                    id="startTime"
                                    name="startTime"
                                    value={formData.startTime}
                                    onChange={handleChange}
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="duration" className="text-lg font-normal text-black">Duration*</label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="instruction" className="text-lg font-normal text-black">Instruction*</label>
                                <input
                                    type="text"
                                    id="instruction"
                                    name="instruction"
                                    value={formData.instruction}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="totalMarks" className="text-lg font-normal text-black">Total Marks*</label>
                                <input
                                    type="text"
                                    id="totalMarks"
                                    name="totalMarks"
                                    value={formData.totalMarks}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                                <label htmlFor="passingMarks" className="text-lg font-normal text-black">Passing Marks*</label>
                                <input
                                    type="text"
                                    id="passingMarks"
                                    name="passingMarks"
                                    value={formData.passingMarks}
                                    onChange={handleChange}
                                    placeholder="Type here"
                                    className="border border-gray-300 bg-gray-200 rounded-md w-full py-3 px-5 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="uploadQuestionPaper" className="text-lg font-normal text-black">Upload Question Paper*</label>
                        <input
                            type="file"
                            id="uploadQuestionPaper"
                            name="uploadQuestionPaper"
                            onChange={handleChange}
                            className="h-20 border border-gray-300 bg-gray-200 rounded-md w-full py-3 text-blue-500 px-5 outline-none"
                        />
                    </div>

                    <div className="flex gap-5 pb-10">
                        <button
                            type="submit"
                            className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="w-44 text-black border border-gray-400 font-medium text-lg p-2"
                        >
                            Cancel
                        </button>
                    </div>
                    {isSelectOpen && (
                        <Successcard
                            onClose={() => setIsSelectOpen(false)}
                            para={"Exam added successfully!"}
                            url={"/teacherspanel/Exam"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
