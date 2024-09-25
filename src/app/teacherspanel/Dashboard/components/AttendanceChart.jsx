import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useState, useEffect } from 'react';

// Register all necessary components
Chart.register(...registerables);

export default function AttendanceChart({ labels, classData = [], colors }) {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if (Array.isArray(classData) && classData.length > 0) {
            console.log('Class data in useEffect:', classData); // Log to check data format

            // Map month names to month numbers
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

            // Convert labels to month numbers for matching
            const labelsMonthNumbers = labels.map(month => monthNamesToNumbers[month]);

            // Map classData to the chart data
            const data = labelsMonthNumbers.map(month => {
                const monthData = classData.find(item => item.month === month);
                return monthData ? monthData.attendancePercentage : 0;
            });

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Attendance Percentage',
                        data: data,
                        backgroundColor: colors[0], // Assuming a single dataset
                    },
                ],
            });
        }
    }, [classData, labels, colors]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Attendance Percentage',
                },
            },
        },
    };

    if (!chartData || !chartData.datasets) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
}
