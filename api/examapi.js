"use server"
// fetch exam data
export async function fetchExamData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/exam/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add exam data
export async function addExamData(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/exam/add`, {
        method: 'POST',
        body: formData, // Use FormData object here
    });

    if (!res.ok) {
        throw new Error('Failed to add Library data');
    }

    return res.json();
}

// fetch exam by id
export async function fetchExamById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/exam/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch assignment data');
    }

    return res.json();
}


// update exam by id
export const updateExamData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/exam/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update exam data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update exam data: ${error.message}`);
    }
};


// delete exam by id 

export async function deleteExamData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/exam/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete exam data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting exam data: ${error.message}`);
    }
}