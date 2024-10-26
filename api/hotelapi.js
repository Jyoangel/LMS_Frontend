"use server"

// fetch hostel data
export async function fetchHotelData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add hostel data
export async function addHotelData(hotelData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelData),
    });

    if (!res.ok) {
        throw new Error('Failed to add hotel data');
    }

    return res.json();
}

// fetch hotel by id
export async function fetchHotelById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch hotel data');
    }

    return res.json();
}


//update hostel by id
export const updateHotelData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update hotel data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update hotel data: ${error.message}`);
    }
};

// delete hostel by id
export async function deleteHotelData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete hotel data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting hotel data: ${error.message}`);
    }
}

//fetch hostel by studentID
export const fetchHotelBystudentID = async (studentID) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/${studentID}`);

        if (!response.ok) {
            if (response.status === 404) {
                // If 404, this means no transportation data was found, return null
                return null;
            } else {
                throw new Error("Failed to fetch transpotation data");
            }
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch transportation data", error);
        throw error;  // Re-throw to handle it in the calling function
    }
};


// update hostel by studentID
export const updateHotelDataByStudentID = async (studentID, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/${studentID}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update hotel data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update hotel data: ${error.message}`);
    }
};

// delete hostel by studentID
export async function deleteHotelDataStudentID(studentID) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/hotel/${studentID}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete hotel data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting hotel data: ${error.message}`);
    }
}