"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchSubjectById, updateSubjectData } from "../../../../../../api/subjectapi"; // Adjust the path as needed


export default function EditSubject({ params }) {
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        class: "",
        subject: ""
    });
    const [subjectId, setSubjectId] = useState(null);


    useEffect(() => {
        const { id } = params;
        if (id) {
            setSubjectId(id);
            fetchInitialData(id);
        }
    }, [params]);

    const fetchInitialData = async (id) => {
        try {
            const data = await fetchSubjectById(id);
            setFormData({
                class: data.class,
                subject: data.subject
            });
        } catch (error) {
            console.error("Failed to fetch subject data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            await updateSubjectData(subjectId, formData);
            openModal();
        } catch (error) {
            console.error("Failed to update subject data:", error);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/Subject"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {/* Class */}
                    <div className="flex flex-col gap-3 w-full">
                        <label htmlFor="classSelect" className="text-lg font-normal text-black">Class*</label>
                        <select
                            id="classSelect"
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            className="border border-gray-300 rounded-md w-96 py-3 px-5 outline-none"
                        >
                            <option value="" className="text-gray-400">
                                Select
                            </option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full flex flex-row items-center gap-8">
                        {/* subject */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="subjectInput" className="text-lg font-normal text-black">Subject *</label>
                            <input
                                id="subjectInput"
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-600 text-white font-medium text-lg p-3 rounded-lg"
                    >
                        Update
                    </button>
                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Subject updated successfully!"}
                            url={"/AdminDashboard/Subject"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
