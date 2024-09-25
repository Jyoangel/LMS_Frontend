"use client";
import React, { useState, useEffect, useRef } from "react";

import Image from "next/image";
import logo from "../AdmitCard/logo.png";

import { fetchReportCardById } from "../../../../../api/reportcardapi";
import { format } from "date-fns";

export default function FinalReportcard({ onClose, params }) {
    const { id } = params;

    const [reportCardData, setReportCardData] = useState(null);
    const noticeRef = useRef();

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (noticeRef.current && !noticeRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [onClose]);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchReportCardById(id);
                setReportCardData(data);
            } catch (error) {
                console.error('Failed to fetch report card data:', error);
            }
        }

        fetchData();
    }, [id]);

    if (!reportCardData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div
                    ref={noticeRef}
                    className="h-[720px] w-[700px] border border-blue-500 bg-white rounded-lg flex flex-col gap-3 p-5"
                >

                    <div className="flex flex-row gap-20">
                        <Image src={logo} />
                        <h1 className="text-black text-lg font-bold">
                            Soft Webtechs Solutions
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 w-full gap-5">
                        <div className="flex flex-col gap-5">
                            <h1 className="text-lg font-medium">
                                Examination Roll Number:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.rollNumber}</span>{" "}
                            </h1>
                            <h1 className="text-lg font-medium">
                                Session:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.session}</span>{" "}
                            </h1>
                            <h1 className="text-lg font-medium">
                                Student Name:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.name}</span>{" "}
                            </h1>
                            <h1 className="text-lg font-medium">
                                Percentage:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.percentage}</span>{" "}
                            </h1>

                        </div>
                        <div className="flex flex-col gap-5 ">
                            <h1 className="text-lg font-medium">
                                Examination:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.type}</span>
                            </h1>
                            <h1 className="text-lg font-medium">
                                Class: <span className="text-black text-lg font-bold">{reportCardData.class}</span>
                            </h1>
                            <h1 className="text-lg font-medium">
                                Date of Birth:{" "}
                                <span className="text-black text-lg font-bold">{format(new Date(reportCardData.dateOfBirth), "yyyy-MM-dd")}</span>{" "}
                            </h1>
                            <h1 className="text-lg font-medium">
                                Status:{" "}
                                <span className="text-black text-lg font-bold">{reportCardData.status}</span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr className="border border-gray-300">
                                    <th className="text-black text-lg border-r border-gray-300 py-2 px-5">Sr. no</th>
                                    <th className="text-black text-lg border-r border-gray-300 py-2">Subject Name</th>
                                    <th className="text-black text-lg py-2">Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportCardData.subjects.map((subject, index) => (
                                    <tr key={index} className="border border-gray-300">
                                        <td className="text-black text-lg border-r border-gray-300 py-2 px-5">{index + 1}</td>
                                        <td className="text-black text-lg border-r border-gray-300 py-2">{subject.subjectName}</td>
                                        <td className="text-black text-lg py-2">{subject.marks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 flex flex-col gap-5">
                            <p className="font-bold">Remarks</p>
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                placeholder="Type here"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


