"use client";
import { useState, useEffect } from "react";

import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchHomeWorkById, updateHomeWorkData } from "../../../../../../api/homeworkapi"; // api to fetch and update specific homework data 

export default function EditDetails({ params }) {

    const { id } = params;

    const [isSelectOpen, setisSelectOpen] = useState(false);
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

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    // call api to fetch homework data
    const fetchData = async () => {
        try {
            const data = await fetchHomeWorkById(id);
            setFormData(data);
        } catch (error) {
            console.error("Failed to fetch homework data:", error);
        }
    };

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // uset to submit the form and call api to update the homeworl data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHomeWorkData(id, formData);
            openModal();
        } catch (error) {
            console.error("Failed to update homework data:", error);
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

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="flex flex-col gap-8">
                        <div className="w-full grid grid-cols-3 items-center gap-5">
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
                            data-testid="Update"
                        >
                            Update
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
                            para={"Homework updated successfully!"}
                            url={"/teacherspanel/Classes"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
