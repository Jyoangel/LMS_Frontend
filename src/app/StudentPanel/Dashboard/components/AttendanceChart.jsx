"use client";


"use client";

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const monthNamesToNumbers = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12,
};

const AttendanceChart = ({ attendanceData }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        console.log('Attendance Data:', attendanceData);

        if (attendanceData && attendanceData.monthlyAttendance && attendanceData.monthlyAttendance.length === 12) {
            const monthLabels = Object.keys(monthNamesToNumbers);
            const sortedAttendanceData = monthLabels.map(month => attendanceData.monthlyAttendance[monthNamesToNumbers[month] - 1] || 0);

            const ctx = chartRef.current.getContext('2d');
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: monthLabels,
                    datasets: [{
                        label: 'Student Attendance',
                        data: sortedAttendanceData,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        borderColor: 'rgba(53, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Number of Days Present'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `Days Present: ${context.raw}`;
                                }
                            }
                        }
                    }
                }
            });

            return () => {
                chart.destroy();
            };
        }
    }, [attendanceData]);

    return <canvas ref={chartRef}></canvas>;
};

export default AttendanceChart;




{/*
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const AttendanceChart = ({ attendanceData, selectedStudent }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!window.ResizeObserver) {
            // Mock or prevent chart creation if ResizeObserver is not available
            return;
        }
        const ctx = chartRef.current.getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: `${attendanceData[selectedStudent].studentId.name}'s Attendance`,
                    data: attendanceData[selectedStudent].monthlyAttendance,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    borderColor: 'rgba(53, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        return () => {
            chart.destroy();
        };
    }, [attendanceData, selectedStudent]);

    return <canvas ref={chartRef}></canvas>;
};

export default AttendanceChart;
*/}
