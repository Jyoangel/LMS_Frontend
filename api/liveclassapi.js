"use server"

// fetch live class data
export async function fetchLiveClassData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/liveclass/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add live class data
export async function addLiveClassData(liveclassData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/liveclass/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(liveclassData),
    });

    if (!res.ok) {
        throw new Error('Failed to add liveclass data');
    }

    return res.json();
}

// fetch LiveClass by id 
export async function fetchLiveClassById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/liveclass/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch liveclass data');
    }

    return res.json();
}


// update live class by id
export const updateLiveClassData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/liveclass/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update liveclass data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update liveclass data: ${error.message}`);
    }
};

// delete live class by id 

export async function deleteLiveClassData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/liveclass/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete liveclass data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting liveclass data: ${error.message}`);
    }
}