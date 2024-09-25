// fetch Homework data

export async function fetchHomeWorkData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


// add homework data
export async function addHomeworkData(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/add`, {
        method: 'POST',
        body: formData, // Use FormData object here
    });

    if (!res.ok) {
        throw new Error('Failed to add Library data');
    }

    return res.json();
}


// fetch homework by id
export async function fetchHomeWorkById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch assignment data');
    }

    return res.json();
}


// update homework data
export const updateHomeWorkData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update homework data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update homework data: ${error.message}`);
    }
};

// delete homework data
export async function deleteHomeWorkData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/homework/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete homework data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting homework data: ${error.message}`);
    }
}
