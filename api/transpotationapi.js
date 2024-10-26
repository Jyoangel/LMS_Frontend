// fetch transportation data 
export async function fetchTranspotationData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


// add tarnsportation data 
export async function addTranspotationData(transpotationData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transpotationData),
    });

    if (!res.ok) {
        throw new Error('Failed to add transpotation data');
    }

    return res.json();
}

// fetch transportation by id 

export async function fetchTranspotationById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch transpotation data');
    }

    return res.json();
}

// upadte Transportation data 

export const updateTranspotationData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update transpotation data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update transpotation data: ${error.message}`);
    }
};

// delete transportation data 
export async function deleteTranspotationData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete transpotation data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting transpotation data: ${error.message}`);
    }
}

// fetch transportation data by studentID


export const fetchTranspotationBystudentID = async (studentID) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/${studentID}`);

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

// update Transportation data by studentID
export const updateTranspotationDataBystudentID = async (studentID, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/${studentID}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update transpotation data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update transpotation data: ${error.message}`);
    }
};

// delete Transportation data by studentID

export async function deleteTranspotationDataByStudentID(studentID) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/transpotation/${studentID}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete transpotation data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting transpotation data: ${error.message}`);
    }
}