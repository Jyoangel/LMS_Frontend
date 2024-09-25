"use server"
export async function fetchClassData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/class/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export async function addClassData(classData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/class/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(classData),
    });

    if (!res.ok) {
        throw new Error('Failed to add class data');
    }

    return res.json();
}


export async function fetchClassById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/class/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch assignment data');
    }

    return res.json();
}

export const updateClassData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/class/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update class data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update class data: ${error.message}`);
    }
};


export async function deleteClassData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/class/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete class data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting exam data: ${error.message}`);
    }
}