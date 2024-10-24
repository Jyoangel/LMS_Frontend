// fetch class schedule data
export async function fetchClassScheduleData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


// api/classScheduleApi.js

export const fetchClassScheduleByClass = async (className, userId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/class?class=${encodeURIComponent(className)}&userId=${encodeURIComponent(userId)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch class schedule: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching class schedule:", error);
        throw error;
    }
};



// add class schedule data
export async function addClassScheduleData(classScheduleData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classScheduleData),
    });

    if (!res.ok) {
        throw new Error('Failed to add classSchedule data');
    }

    return res.json();
}

// fetch class schedule data by id
export async function fetchClassScheduleById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch classSchedule data');
    }

    return res.json();
}

//update class schedule data by id
export const updateClassScheduleData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update classSchedule data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update classSchedule data: ${error.message}`);
    }
};


// delete class schedule data

export async function deleteClassScheduleData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/classSchedule/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete classSchedule data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting classSchedule data: ${error.message}`);
    }
}