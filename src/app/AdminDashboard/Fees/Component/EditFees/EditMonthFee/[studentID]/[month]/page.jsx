"use client";
import Successcard from "@/Components/Successcard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { fetchFeeRecordByMonth, updateFeeRecordByMonth } from "../../../../../../../../../api/api"; // api to update and fetch fee using month 

export default function EditFeeMonth({ params }) {
    const { studentID, month } = params;
    const [isSelectOpen, setisSelectOpen] = useState(false);
    const [feeData, setFeeData] = useState({
        feeMonth: month,
        feePaid: "",
        otherFee: "",
        paymentMode: "",
        referenceNo: "",
        bankName: "",
        remark: "",
        receiptBy: "",
        studentID: studentID
    });

    // Fetch the fee data by studentID and month when the page loads
    useEffect(() => {
        const loadFeeData = async () => {
            try {
                const data = await fetchFeeRecordByMonth(studentID, month);
                setFeeData({
                    feeMonth: month,
                    feePaid: data.feePaid || "",
                    otherFee: data.otherFee || "",
                    paymentMode: data.paymentMode || "",
                    referenceNo: data.referenceNo || "",
                    bankName: data.bankName || "",
                    remark: data.remark || "",
                    receiptBy: data.receiptBy || "",
                    studentID: studentID
                });
            } catch (error) {
                console.error("Failed to load fee data:", error);
            }
        };

        loadFeeData();
    }, [studentID, month]);

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

    // handle submit and update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateFeeRecordByMonth(studentID, month, feeData);
            openModal();
        } catch (error) {
            console.error("Failed to update fee data:", error);
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
                            <label htmlFor="feeMonth" className="text-lg font-normal text-black">Fee Month *</label>
                            <input
                                id="feeMonth"
                                type="text"
                                name="feeMonth"
                                value={feeData.feeMonth}
                                readOnly
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Fee Paid */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="feePaid" className="text-lg font-normal text-black">Fee Paid *</label>
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
                            <label htmlFor="otherFee" className="text-lg font-normal text-black">Other Fee *</label>
                            <input
                                id="otherFee"
                                type="number"
                                name="otherFee"
                                placeholder="Enter other fee"
                                value={feeData.otherFee}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md w-full py-3 px-5 outline-none"
                            />
                        </div>

                        {/* Payment Mode */}
                        <div className="flex flex-col gap-2 w-full">
                            <label htmlFor="paymentMode" className="text-lg font-normal text-black">Payment Mode *</label>
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
                            <label htmlFor="referenceNo" className="text-lg font-normal text-black">Reference No *</label>
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
                            <label htmlFor="bankName" className="text-lg font-normal text-black">Bank Name *</label>
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
                            <label htmlFor="remark" className="text-lg font-normal text-black">Remark *</label>
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
                            <label htmlFor="receiptBy" className="text-lg font-normal text-black">Receipt By *</label>
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
                        Update
                    </button>
                </form>
            </div>

            {isSelectOpen && (
                <Successcard onClose={closeModal} para={"Fees updated successfully!"} url={"/AdminDashboard/Fees"} />
            )}
        </>
    );
}
