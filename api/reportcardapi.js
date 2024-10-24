// fetch Report card data

export async function fetchReportCardData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add report card data

export async function addReportCardData(reportcardData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportcardData),
    });

    if (!res.ok) {
        throw new Error('Failed to add report data');
    }

    return res.json();
}


// fetch report card by id
export async function fetchReportCardById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch admitCard data');
    }

    return res.json();
}

// update report card by id 

export const updateReportCardData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/update/${id}`, {
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

// delete report card by id 

export async function deleteReportCardData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete admitcard data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting admitcard data: ${error.message}`);
    }
}


//Admit Card

// fetch admid card 
export async function fetchAdmitCardData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add admit  card
export async function addAdmitCardData(admitcardData) {
    console.log('Sending Admit Card Data:', admitcardData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(admitcardData),
    });

    const data = await res.json();

    if (!res.ok) {
        console.log('Response Status:', res.status);
        console.log('Response Data:', data);
        throw new Error('Failed to add admitcard data');
    }

    return data;
}

// fetch admit card by id

export async function fetchAdmitCardById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch admitCard data');
    }

    return res.json();
}

//update admit card 

export const updateAdmitCardData = async (id, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/update/${id}`, {
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

// delete admit card 
export async function deleteAdmitCardData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete admit card data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting admit card data: ${error.message}`);
    }
}



// fetch report card using admit card id 
export async function fetchReportCardByAdmitCardId(admitCardId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/reportcard/${admitCardId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch report card data');
        }
        const data = await response.json();
        return data.reportCard;
    } catch (error) {
        console.error('Error fetching report card:', error);
        throw error;
    }
}


// fetch report card using studentID

export async function fetchReportCardByStudentID(studentID) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/reportcard/gets/${studentID}`);

        // Check if the response status is not OK (e.g., 404 or 500)
        if (!response.ok) {
            if (response.status === 404) {
                return { error: 'No report card found for this student.' }; // Custom message for 404
            }
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Parse the JSON response
        const reportCard = await response.json();
        return reportCard;

    } catch (error) {
        console.error('Error fetching report card:', error);

        // Return the error message to handle it in the calling code
        return { error: error.message };
    }
}

// fetch admit card using studentID
export async function fetchAdmitCardByStudentID(studentID) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admitcard/gets/${studentID}`);
        if (!response.ok) {
            if (response.status === 404) {
                return { error: "No admit card found for this student." };
            }
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error fetching admit card:", error);
        return { error: error.message };
    }
}