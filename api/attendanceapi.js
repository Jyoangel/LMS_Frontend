"use server"
// fetch all attendance data
export async function fetchAttendanceData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add attendance data
export async function addAttendanceData(attendanceData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceData),
    });

    if (!res.ok) {
        throw new Error('Failed to add enquiry data');
    }

    return res.json();
}

// fetch attendnce data by object id
export async function fetchAttendanceById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch enquiry data');
    }

    return res.json();
}

// update attendance data 
export async function updateAttendance(id, isPresent) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/update/${id}`, {
            method: 'PUT', // Changed to PUT to match your router.put('/update/:id')
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ present: isPresent }),
        });

        if (!response.ok) {
            throw new Error('Failed to update attendance');
        }

        const updatedData = await response.json();
        console.log('Attendance updated:', updatedData);
    } catch (error) {
        console.error('Error:', error);
    }
}

// update attendance data using studentID
export async function updateAttendanceByStudentId(studentId, isPresent) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/updates/${studentId}`, {
            method: 'PUT', // Changed to PUT to match your router.put('/update/:id')
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ present: isPresent }),
        });

        if (!response.ok) {
            throw new Error('Failed to update attendance');
        }

        const updatedData = await response.json();
        console.log('Attendance updated:', updatedData);
    } catch (error) {
        console.error('Error:', error);
    }
}



// src/api/attendanceApi.js

// Function to fetch attendance records by student ID
export async function fetchAttendanceByStudentId(studentId) {
    try {
        console.log(`Fetching attendance for studentId: ${studentId}`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/gets/${studentId}`);

        // Log the response status and response object for debugging
        console.log('Response Status:', response.status);
        console.log('Response Object:', response);

        if (!response.ok) {
            throw new Error('Failed to fetch attendance records');
        }

        const data = await response.json();

        // Log the fetched data to see what is being returned
        console.log('Fetched attendance data:', data);

        return data;
    } catch (error) {
        console.error('Error fetching attendance records:', error);
        throw error;
    }
};







// fetch attendance data using class

export const fetchClassAttendanceData = async (classId, year) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/attendance/${classId}?year=${year}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return [];
    }
};


//fetch schoolOverview data

export const fetchSchoolOverviewData = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/attendance/schooloverview`); // Adjust this URL as per your backend route setup
        if (!response.ok) {
            throw new Error('Failed to fetch school overview data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching school overview data:', error);
        return null;
    }
};