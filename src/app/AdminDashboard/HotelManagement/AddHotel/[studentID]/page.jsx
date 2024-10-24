"use client";

import { useState } from "react";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addHotelData } from "../../../../../../api/hotelapi"; // addd and fetch api

export default function AddHotel({ params }) {
  const { studentID } = params;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentID: studentID,
    typeOfRoom: "",
    floor: "",
    zone: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.typeOfRoom) {
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


      // Proceed with adding new hotel data if none exists
      await addHotelData(formData);
      setIsSelectOpen(true);
    } catch (error) {
      console.error("Failed to add hotel data", error);
    }
  };

  const closeModal = () => {
    setIsSelectOpen(false);
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">

            {/* Type of Room */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="typeOfRoom" className="text-lg font-normal text-black">Type of Room *</label>
              <select
                id="typeOfRoom"
                name="typeOfRoom"
                value={formData.typeOfRoom}
                onChange={handleChange}
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              >
                <option value="" className="text-gray-400">Select</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            {/* Floor */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="floor" className="text-lg font-normal text-black">Floor *</label>
              <select
                id="floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              >
                <option value="" className="text-gray-400">Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            {/* Zone */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="zone" className="text-lg font-normal text-black">Zone *</label>
              <select
                id="zone"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              >
                <option value="" className="text-gray-400">Select</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="price" className="text-lg font-normal text-black">Price *</label>
              <input
                id="price"
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
              />
            </div>
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
              para={"Hotel data added successfully!"}
              url={"/AdminDashboard/HotelManagement"}
            />
          )}
        </form>
      </div>
    </>
  );
}


{/*
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import Successcard from "@/Components/Successcard";
import { addHotelData } from "../../../../../api/hotelapi"; // Adjust the path as necessary

export default function AddHotel() {
  const [typeOfRoom, setTypeOfRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [zone, setZone] = useState("");
  const [price, setPrice] = useState("");
  const [isSelectOpen, setisSelectOpen] = useState(false);
  const [error, setError] = useState(null);

  const openModal = () => {
    setisSelectOpen(true);
  };

  const closeModal = () => {
    setisSelectOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hotelData = {
      typeOfRoom,
      floor,
      zone,
      price,
    };

    try {
      await addHotelData(hotelData);
      openModal();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col p-5 gap-10">
        <div className="w-full">
          <Link href={"/AdminDashboard/HotelManagement/AddHotel"}>
            <button className="flex items-center justify-center gap-2">
              <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
              <h1 className="text-lg font-semibold">Back</h1>
            </button>
          </Link>
        </div>

        {/* form *
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="w-full grid grid-cols-3 items-center gap-8">
            {/* type of room *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Type of Room*</label>
              <select
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

            {/* Floor *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Floor*</label>
              <select
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

            {/* Zone *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Zone*</label>
              <select
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

            {/* Price *
            <div className="flex flex-col gap-2 w-full">
              <label className="text-lg font-normal text-black">Price*</label>
              <input
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
            Submit
          </button>
          {error && <p className="text-red-600">{error}</p>}
          {isSelectOpen && (
            <Successcard
              onClose={closeModal}
              para={"Room Created successfully!"}
            />
          )}
        </form>
      </div>
    </>
  );
}
  */}
