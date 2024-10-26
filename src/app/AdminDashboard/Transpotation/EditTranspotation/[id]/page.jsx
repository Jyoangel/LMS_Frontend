"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchTranspotationBystudentID, updateTranspotationDataBystudentID } from "../../../../../../api/transpotationapi";// fetch and update api  transportation using studentID 

export default function EditTranspotation({ params }) {
    const { id } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [formData, setFormData] = useState({

        pickupLocation: "",
        dropLocation: "",
        transportationFee: "",
        pickupTime: "",
        dropTime: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // call fetch api for transportation 
    useEffect(() => {
        async function getData() {
            if (id) {
                try {
                    const data = await fetchTranspotationBystudentID(id);
                    setFormData(data);
                    setIsLoading(false);
                } catch (error) {
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        }
        getData();
    }, [id]);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // handle submit and update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pickupLocation) {
            setValidationMessage("Please enter the pickup location.");
            return;
        }
        if (!formData.dropLocation) {
            setValidationMessage("Please enter the drop location.");
            return;
        }
        if (!formData.transportationFee) {
            setValidationMessage("Please enter the transportation fee.");
            return;
        }
        if (!formData.pickupTime) {
            setValidationMessage("Please enter the pickup time.");
            return;
        }
        if (!formData.dropTime) {
            setValidationMessage("Please enter the drop time.");
            return;
        }

        // Validation: Pickup time must be before drop time
        const pickupTime = new Date(`1970-01-01T${formData.pickupTime}:00`);
        const dropTime = new Date(`1970-01-01T${formData.dropTime}:00`);

        if (pickupTime >= dropTime) {
            setValidationMessage("Pickup time must be before drop time.");
            return;
        }

        try {
            await updateTranspotationDataBystudentID(id, formData);
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
                    <Link href={"/AdminDashboard/Transpotation"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">


                        {/* Pickup Location */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="pickupLocation" className="text-lg font-normal text-black">
                                Pickup Location *
                            </label>
                            <input
                                id="pickupLocation"
                                name="pickupLocation"
                                value={formData.pickupLocation}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Drop Location */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="dropLocation" className="text-lg font-normal text-black">
                                Drop Location *
                            </label>
                            <input
                                id="dropLocation"
                                name="dropLocation"
                                value={formData.dropLocation}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Transportation Fee */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="transportationFee" className="text-lg font-normal text-black">
                                Transportation Fee *
                            </label>
                            <input
                                id="transportationFee"
                                name="transportationFee"
                                value={formData.transportationFee}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Type here"
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
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
                            para={"Transpotation Updated successfully!"}
                            url={"AdminDashboard/Transpotation"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
