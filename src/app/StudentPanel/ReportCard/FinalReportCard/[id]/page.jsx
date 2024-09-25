"use client";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import logo from "./logo.png";
import { fetchReportCardById } from "../../../../../../api/reportcardapi";
import { format } from "date-fns";

export default function FinalReportCard({ params }) {
    const { id } = params;
    const [reportCard, setReportCard] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReportCardById(id);
                setReportCard(data);
            } catch (error) {
                console.error("Failed to fetch report card data:", error);
            }
        };

        fetchData();
    }, [id]);

    const downloadReportCard = async () => {
        const input = document.getElementById("reportCard");
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save("reportCard.pdf");
    };

    if (!reportCard) return <div>Loading...</div>;

    return (
        <>
            <div className="min-h-screen p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between w-full mb-6">
                    <Link href={"/StudentPanel/ReportCard"}>
                        <button className="flex items-center justify-center gap-3 mb-4 sm:mb-0">
                            <FaArrowLeftLong className="h-10 w-10 bg-gray-100 rounded-full p-2" />
                            <h1 className="text-lg font-semibold">Back</h1>
                        </button>
                    </Link>

                    <button
                        className="text-blue-500 underline"
                        onClick={downloadReportCard}
                    >
                        Download Report Card
                    </button>
                </div>

                <div className="w-full mx-auto bg-white">
                    <div className="flex flex-col lg:flex-row gap-5" id="reportCard">
                        <div className="w-full lg:w-2/3 pr-4 border-2 border-gray-300 rounded-xl shadow-md p-6">
                            <div className="flex items-center mb-4">
                                <Image
                                    src={logo}
                                    alt="Education"
                                    className="lg:h-16 lg:w-auto mr-4"
                                />
                                <div>
                                    <h2 className="lg:text-2xl font-bold text-sm">
                                        Soft Webtechs Solutions
                                    </h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col gap-5">
                                    <p className="font-bold">
                                        <span className="font-normal">
                                            Examination Roll Number:
                                        </span>{" "}
                                        {reportCard.rollNumber}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Session:</span> {reportCard.session}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Student Name:</span> {reportCard.name}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Percentage:</span> {reportCard.percentage}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <p className="font-bold">
                                        <span className="font-normal">Date of Birth:</span>{format(new Date(reportCard.dateOfBirth), "yyyy-MM-dd")}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Examination:</span> {reportCard.type}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Class:</span> {reportCard.class}
                                    </p>
                                    <p className="font-bold">
                                        <span className="font-normal">Status:</span> {reportCard.status}
                                    </p>
                                </div>
                            </div>

                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">Sr. No </th>
                                        <th className="border px-4 py-2"> Subject Name</th>
                                        <th className="border px-4 py-2"> Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportCard.subjects.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border px-4 py-2 lg:pl-16">{index + 1}</td>
                                            <td className="border px-4 py-2 lg:pl-16">{item.subjectName}</td>
                                            <td className="border px-4 py-2 lg:pl-16">{item.marks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


