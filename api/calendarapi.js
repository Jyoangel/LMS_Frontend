"use server"

//fetch calendar data
export async function fetchCalendarData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/calendar/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


// add calendar data
export async function addCalendarData(calendarData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/calendar/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(calendarData),
    });

    if (!res.ok) {
        throw new Error('Failed to add calendar data');
    }

    return res.json();
}

// fetch calendar data by id
export async function fetchCalendarById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/calendar/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch assignment data');
    }

    return res.json();
}


// update calendar data
export const updateCalendarData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/calendar/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update calendar data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update calendar data: ${error.message}`);
    }
};

// delete calendar data
export async function deleteCalendarData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/calendar/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete calendar data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting calendar data: ${error.message}`);
    }
}