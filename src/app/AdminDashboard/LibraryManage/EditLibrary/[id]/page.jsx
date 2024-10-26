"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchLibraryById, updateLibraryData } from "../../../../../../api/libraryapi"; // api to fetch and update specific library 

export default function EditLibrary({ params }) {
    const { id } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        class: "",
        type: "",
        authorName: "",
        uploadedBy: "",
        description: "",
    });

    // use to fetch intial library data 
    const router = useRouter();
    useEffect(() => {
        if (id) {
            async function fetchData() {
                try {
                    const data = await fetchLibraryById(id);
                    setFormData({
                        title: data.title || "",
                        subject: data.subject || "",
                        class: data.class || "",
                        type: data.type || "",
                        authorName: data.authorName || "",
                        uploadedBy: data.uploadedBy || "",
                        description: data.description || "",
                    });
                } catch (error) {
                    console.error("Failed to fetch library data:", error);
                }
            }
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    // use to submit and update library data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        for (const key in formData) {
            if (formData[key] === null || formData[key] === "") {
                alert("All fields are required.");
                return;
            }
        }

        // Additional validation for specific fields
        if (formData.title.length < 3) {
            alert("Title must be at least 3 characters long.");
            return;
        }

        if (formData.uploadBookPdf && formData.uploadBookPdf.size > 5 * 1024 * 1024) { // 5MB size limit
            alert("Uploaded PDF file size should be less than 5MB.");
            return;
        }
        try {
            await updateLibraryData(id, formData);
            openModal();
        } catch (error) {
            console.error("Failed to update library data:", error);
        }
    };

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
        router.push("/AdminDashboard/LibraryManage");
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/LibraryManage"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        {/* title */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="title" className="text-lg font-normal text-black">Title *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData?.title || ""}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* subject */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="subject" className="text-lg font-normal text-black">Subject*</label>
                            <input
                                id="subject"
                                name="subject"
                                placeholder="Type here"
                                value={formData?.subject || ""}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* class */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="class" className="text-lg font-normal text-black">Class*</label>
                            <input
                                id="class"
                                name="class"
                                placeholder="Type here"
                                value={formData?.class || ""}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* type */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="type" className="text-lg font-normal text-black">Type*</label>
                            <input
                                id="type"
                                name="type"
                                placeholder="Type here"
                                value={formData?.type || ""}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* author Name */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="authorName" className="text-lg font-normal text-black">Author Name*</label>
                            <input
                                type="text"
                                id="authorName"
                                name="authorName"
                                value={formData?.authorName || ""}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* uploaded by */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="uploadedBy" className="text-lg font-normal text-black">Uploaded By*</label>
                            <input
                                type="text"
                                id="uploadedBy"
                                name="uploadedBy"
                                value={formData?.uploadedBy || ""}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    {/* description */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="description" className="text-lg font-normal text-black">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData?.description || ""}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-400 text-white font-medium text-lg p-3 rounded-lg"
                    >
                        Update
                    </button>
                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Library updated successfully!"}
                            url={"/AdminDashboard/LibraryManage"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
