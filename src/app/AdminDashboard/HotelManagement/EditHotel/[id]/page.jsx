"use client";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Successcard from "@/Components/Successcard";
import { fetchHotelBystudentID, updateHotelDataByStudentID } from "../../../../../../api/hotelapi"; // api to fetch hostel and update 

export default function EditHotel({ params }) {
    const { id } = params;
    const [typeOfRoom, setTypeOfRoom] = useState("");
    const [floor, setFloor] = useState("");
    const [zone, setZone] = useState("");
    const [price, setPrice] = useState("");
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [error, setError] = useState(null);


    // use to fetch hostel data 
    useEffect(() => {
        const loadHotelData = async () => {
            try {
                const data = await fetchHotelBystudentID(id);
                setTypeOfRoom(data.TypeofRoom);
                setFloor(data.floor);
                setZone(data.zone);
                setPrice(data.price);
            } catch (error) {
                setError(error.message);
            }
        };

        loadHotelData();
    }, [id]);

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            TypeofRoom: typeOfRoom,
            floor: floor,
            zone: zone,
            price: price,
        };
        if (!formData.TypeofRoom) {
            alert("Please select the type of room.");
            return;
        }
        if (!formData.floor) {
            alert("Please enter the floor.");
            return;
        }
        if (!formData.zone) {
            alert("Please enter the zone.");
            return;
        }
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            alert("Please enter a valid price.");
            return;
        }
        try {
            // call the api to update the data 
            await updateHotelDataByStudentID(id, formData);
            openModal();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/HotelManagement"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">
                        {/* type of room */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="typeOfRoom" className="text-lg font-normal text-black">Type of Room*</label>
                            <select
                                id="typeOfRoom"
                                value={typeOfRoom}
                                onChange={(e) => setTypeOfRoom(e.target.value)}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">Select</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>

                        {/* Floor */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="floor" className="text-lg font-normal text-black">Floor*</label>
                            <select
                                id="floor"
                                value={floor}
                                onChange={(e) => setFloor(e.target.value)}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">Select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        {/* Zone */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="zone" className="text-lg font-normal text-black">Zone*</label>
                            <select
                                id="zone"
                                value={zone}
                                onChange={(e) => setZone(e.target.value)}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" className="text-gray-400 px">Select</option>
                                <option value="North">North</option>
                                <option value="South">South</option>
                                <option value="East">East</option>
                                <option value="West">West</option>
                            </select>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="price" className="text-lg font-normal text-black">Price*</label>
                            <input
                                id="price"
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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
                    {error && <p className="text-red-600">{error}</p>}
                    {isSelectOpen && (
                        <Successcard
                            onClose={closeModal}
                            para={"Room updated successfully!"}
                            url={"/AdminDashboard/HotelManagement"}
                        />
                    )}
                </form>
            </div>
        </>
    );
}
