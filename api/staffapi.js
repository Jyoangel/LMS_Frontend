// fetch staff data 

export async function fetchStaffData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

//add staff
export async function addStaffData(staffData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...staffData,
                userId: encodeURIComponent(staffData.userId), // URL-encode the userId to handle special characters
            }),
        });

        // Check if the server response is not OK (status code is not in the range of 200-299)
        if (!res.ok) {
            // Try to extract the error message from the response body
            const errorData = await res.json();
            // Throw an error with the message returned from the server
            throw new Error(errorData.message || 'Failed to add staff data');
        }

        return res.json(); // Parse and return the JSON data if the response is OK
    } catch (error) {
        // Catch any network or server errors and rethrow with a proper message
        throw new Error(error.message || 'Something went wrong while adding staff data');
    }
}


// fetch staff by id 

export async function fetchStaffById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch Staff data');
    }

    return res.json();
}


// upadte staff data by id 
export const updateStaffData = async (id, formData) => {
    try {
        // Perform update request with Staff ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/update/${id}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update Staff data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update Staff data: ${error.message}`);
    }
};

// delete staff date by id 

export async function deleteStaffData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete student data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting student data: ${error.message}`);
    }
}


// fetch count staff data 
export async function fetchCountStaffData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/staff-count?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


//Payment

// fetch staff payement 
export async function fetchPaymentStaffData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/StaffPayment/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

// add staff payment 
export async function addPaymentData(staffPaymentData) {
    console.log('Sending payment data:', staffPaymentData); // Log data being sent
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/StaffPayment/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffPaymentData),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response from server:', errorText); // Log server response
        throw new Error('Failed to add staff data');
    }

    return res.json();
}

// import satff data

export async function importStaffData(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/import`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error importing student data:', error);
        throw error;
    }
}

// select staff using staff ID
export const selectStaff = async (staffID, selected) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/selectStaff/${staffID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selected }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update selected status');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
//send message to student through email
export const sendMessages = async (subject, message) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/staff/sendMessages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, message }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send messages');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};
