"use client"
import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { useState } from 'react';



export default function page() {
    const [isSelect, setIsSelect] = useState(false);
    return (
        <div className="h-screen w-full flex flex-col p-5 gap-10">
            <div className="w-full flex justify-between items-center">
                <Link href="/AdminDashboard/ReportCard" >
                    <button className="flex items-center justify-center gap-2">
                        <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                        <h1 className="text-lg font-semibold">Back</h1>
                    </button>
                </Link>
            </div>
            <div className="flex flex-col gap-3 ">
                <div onClick={() => { setIsSelect(!isSelect) }} className="w-96  rounded-md border border-gray-300 px-5 py-4">
                    Select
                </div>
                {isSelect && <div className="w-96  rounded-md border border-gray-300 px-5 py-2 flex flex-col gap-2">
                    <Link href="/AdminDashboard/ReportCard/AdmitCard"><h1>Admit Card</h1></Link>
                    {/* <Link href="/AdminDashboard/ReportCard/AddReportCard"> <h1>Report card</h1></Link> */}
                </div>}
            </div>
        </div >

    )
}

