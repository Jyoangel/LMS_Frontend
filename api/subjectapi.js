

"use server"

// fetch subject data 
export async function fetchSubjectData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/subject/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add staff data 

export async function addSubjectData(subjectData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/subject/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subjectData),
    });

    if (!res.ok) {
        throw new Error('Failed to add subject data');
    }

    return res.json();
}

// fetch subject using id 

export async function fetchSubjectById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/subject/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch subject data');
    }

    return res.json();
}


// update subject data
export const updateSubjectData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/subject/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update subject data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update subject data: ${error.message}`);
    }
};

// delete subject data 

export async function deleteSubjectData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/subject/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete subject data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting subject data: ${error.message}`);
    }
}