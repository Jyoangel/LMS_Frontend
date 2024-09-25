"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Successcard from "@/Components/Successcard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchEnquiryById, updateEnquiryData } from "../../../../../../api/enquiryapi"; // fetch and update api using id 

export default function EditEnquiry({ params }) {
    const { id } = params;
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        email: "",
        enquiryRelated: "",
    });
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // use to fetch data 
    useEffect(() => {
        if (id) {
            const loadEnquiryData = async () => {
                try {
                    const data = await fetchEnquiryById(id);
                    setFormData({
                        name: data.name,
                        contactNumber: data.contactNumber,
                        email: data.email,
                        enquiryRelated: data.enquiryRelated,
                    });
                    setIsLoading(false);
                } catch (error) {
                    setError(error.message);
                    setIsLoading(false);
                }
            };

            loadEnquiryData();
        }
    }, [id]);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEnquiryData(id, formData);
            openModal();
        } catch (error) {
            setError(error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/Enquiry"}>
                        <button role="button" aria-label="Back to Enquiry" className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <span className="text-lg font-semibold">Back</span>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="name" className="text-lg font-normal text-black">Name *</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="contactNumber" className="text-lg font-normal text-black">Contact Number *</label>
                            <input
                                id="contactNumber"
                                type="number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="email" className="text-lg font-normal text-black">Email *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="enquiryRelated" className="text-lg font-normal text-black">Enquiry Related *</label>
                        <textarea
                            id="enquiryRelated"
                            name="enquiryRelated"
                            value={formData.enquiryRelated}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
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
                            para={"Enquiry updated successfully!"}
                            url={"/AdminDashboard/Enquiry"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}

{/*"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Successcard from "@/Components/Successcard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchEnquiryById, updateEnquiryData } from "../../../../../../api/enquiryapi";

export default function EditEnquiry({ params }) {

    const { id } = params;
    const [formData, setFormData] = useState({
        name: "",
        contactNumber: "",
        email: "",
        enquiryRelated: "",
    });
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const loadEnquiryData = async () => {
                try {
                    const data = await fetchEnquiryById(id);
                    setFormData({
                        name: data.name,
                        contactNumber: data.contactNumber,
                        email: data.email,
                        enquiryRelated: data.enquiryRelated,
                    });
                    setIsLoading(false);
                } catch (error) {
                    setError(error.message);
                    setIsLoading(false);
                }
            };

            loadEnquiryData();
        }
    }, [id]);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEnquiryData(id, formData);
            openModal();
        } catch (error) {
            setError(error.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/Enquiry"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Contact Number *</label>
                            <input
                                type="number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg font-normal text-black">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg font-normal text-black">Enquiry Related *</label>
                        <textarea
                            name="enquiryRelated"
                            value={formData.enquiryRelated}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="h-20 border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                        ></textarea>
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
                            para={"Enquiry updated successfully!"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
    */}
