"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { addFeeData } from "../../../../../../../api/api"; // add fee api 

export default function AddFees({ params }) {
    const { studentID } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [feeData, setFeeData] = useState({

        feeMonth: "",
        feePaid: "",
        otherFee: "",
        paymentMode: "",
        referenceNo: "",
        bankName: "",
        remark: "",
        receiptBy: "",
        studentID: studentID // Using params for studentID
    });

    const openModal = () => {
        setisSelectOpen(true);
    };

    const closeModal = () => {
        setisSelectOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    // handle fees submission form 
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks

        // Fee Month validation
        if (!feeData.feeMonth) {
            alert("Please select the fee month.");
            return;
        }

        //Fee Paid validation - ensure a valid fee amount is provided
        if (!feeData.feePaid || isNaN(feeData.feePaid) || parseFloat(feeData.feePaid) <= 0) {
            alert("Please enter a valid fee amount.");
            return;
        }

        // Other Fee validation - ensure other fee is either empty or a valid amount
        if (feeData.otherFee && (isNaN(feeData.otherFee) || parseFloat(feeData.otherFee) < 0)) {
            alert("Please enter a valid amount for other fees.");
            return;
        }

        // Payment Mode validation
        if (!feeData.paymentMode) {
            alert("Please select a payment mode.");
            return;
        }

        // Reference Number validation (if required for non-cash payments)
        if (feeData.paymentMode !== "Cash" && !feeData.referenceNo) {
            alert("Please provide a reference number for non-cash payments.");
            return;
        }

        // Bank Name validation (if payment mode is not cash)
        if (feeData.paymentMode !== "Cash" && !feeData.bankName) {
            alert("Please provide a bank name for non-cash payments.");
            return;
        }

        // Receipt By validation
        if (!feeData.receiptBy) {
            alert("Please enter the name of the person receiving the payment.");
            return;
        }

        try {
            // Call the API to add fee data
            await addFeeData(feeData);
            openModal();
        } catch (error) {
            console.error("Failed to add fee data:", error);
            alert(`Error: ${error.message}`);
        }
    };


    return (
        <>
            <div className="h-screen w-full flex flex-col p-5 gap-10">
                <div className="w-full">
                    <Link href={"/AdminDashboard/Fees"}>
                        <button className="flex items-center justify-center gap-2">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    <div className="w-full grid grid-cols-3 items-center gap-8">


                        {/* Fee Month */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="feeMonth"
                                className="text-lg font-normal text-black">Fee Month *</label>
                            <select
                                id="feeMonth"
                                name="feeMonth"
                                value={feeData.feeMonth}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            >
                                <option value="" disabled>Select a month</option>
                                {[
                                    'January', 'February', 'March', 'April', 'May', 'June',
                                    'July', 'August', 'September', 'October', 'November', 'December'
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/*  Fee Paid */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="feePaid"
                                className="text-lg font-normal text-black">Fee Paid *</label>
                            <input
                                id="feePaid"
                                type="number"
                                name="feePaid"
                                placeholder="Enter monthly fee"
                                value={feeData.feePaid}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Other Fee */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="otherFee"
                                className="text-lg font-normal text-black">
                                Other Fee *
                            </label>
                            <input
                                id="otherFee"
                                type="number"
                                name="otherFee"
                                placeholder="Enter festive fee"
                                value={feeData.otherFee}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>






                        {/* Payment Mode */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="paymentMode"
                                className="text-lg font-normal text-black">
                                Payment Mode *
                            </label>
                            <input
                                id="paymentMode"
                                type="text"
                                name="paymentMode"
                                placeholder="Enter payment mode"
                                value={feeData.paymentMode}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Reference No */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="referenceNo"
                                className="text-lg font-normal text-black">
                                Reference No *
                            </label>
                            <input
                                id="referenceNo"
                                type="text"
                                name="referenceNo"
                                placeholder="Enter reference number"
                                value={feeData.referenceNo}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Bank Name */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="bankName"
                                className="text-lg font-normal text-black">
                                Bank Name *
                            </label>
                            <input
                                id="bankName"
                                type="text"
                                name="bankName"
                                placeholder="Enter bank name"
                                value={feeData.bankName}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Remark */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="remark"
                                className="text-lg font-normal text-black">
                                Remark *
                            </label>
                            <input
                                id="remark"
                                type="text"
                                name="remark"
                                placeholder="Enter remark"
                                value={feeData.remark}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Receipt By */}
                        <div className="flex flex-col gap-2 w-full">
                            <label
                                htmlFor="receiptBy"
                                className="text-lg font-normal text-black">
                                Receipt By *
                            </label>
                            <input
                                id="receiptBy"
                                type="text"
                                name="receiptBy"
                                placeholder="Enter receipt by"
                                value={feeData.receiptBy}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-[33%] bg-blue-400 text-white px-5 py-3 rounded-md ">
                        Submit
                    </button>
                </form>
            </div>

            {isSelectOpen && (
                <Successcard onClose={closeModal} para={"Fees added successfully!"} url={"/AdminDashboard/Fees"} />
            )}
        </>
    );
}