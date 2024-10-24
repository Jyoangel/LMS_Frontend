//fetch Library get 
export async function fetchLibraryData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/library/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add library data


export async function addLibraryData(formData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/library/add`, {
        method: 'POST',
        body: formData, // Use FormData object here
    });

    if (!res.ok) {
        throw new Error('Failed to add Library data');
    }

    return res.json();
}


// fetch libray data by id 
export async function fetchLibraryById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/library/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch Library data');
    }

    return res.json();
}


// update library data by id 
export const updateLibraryData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/library/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update library data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update library data: ${error.message}`);
    }
};

// delete library data
export async function deletelibraryData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/library/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete library data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting library data: ${error.message}`);
    }
}