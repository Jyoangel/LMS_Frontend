"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchClassById, updateClassData } from "../../../../../../api/classapi"; // api to fetch and dupdate  specific class 

export default function EditClass({ params }) {
    const { id } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [className, setClassName] = useState("");

    useEffect(() => {
        if (id) {
            async function loadClassData() {
                try {
                    const data = await fetchClassById(id);
                    // Ensure data is defined before accessing its properties
                    if (data && data.className) {
                        setClassName(data.className);
                    } else {
                        console.error('Received undefined data or missing className');
                    }
                } catch (error) {
                    console.error('Failed to fetch class data', error);
                }
            }

            loadClassData();
        }
    }, [id]);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!className) {
            console.error('Class name is required');
            return;
        }

        const formData = { className };

        try {
            if (id) {
                await updateClassData(id, formData);
            } else {
                // Removed addClassData since it's not used
                // await addClassData(formData);
            }

            openModal();
        } catch (error) {
            console.error('Failed to save class data', error);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/Class"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {/* class*/}
                    <div className="flex flex-col gap-3 w-full">
                        <label className="text-lg font-normal text-black">Class*</label>
                        <select
                            name="class"
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            className="border border-gray-300 rounded-md w-96 py-3 px-5 outline-none"
                        >
                            <option value="" className="text-gray-400">
                                Select
                            </option>
                            {[...Array(10)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {index + 1}
                                </option>
                            ))}
                        </select>
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
                            para={"class added/updated successfully!"}
                            url={"/AdminDashboard/Class"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
