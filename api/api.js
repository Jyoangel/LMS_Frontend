export async function fetchStudentData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch student data');
    }

    return res.json();
}


export async function addStudentData(studentData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...studentData,
                userId: encodeURIComponent(studentData.userId), // URL-encode the userId to handle special characters
            }),
        });

        if (!res.ok) {
            // Try to extract the error message from the response body
            const errorData = await res.json();
            // Throw an error with the message returned from the server
            throw new Error(errorData.message || 'Failed to add student data');
        }

        return res.json(); // Parse and return the JSON data if the response is OK
    } catch (error) {
        // Catch any network or server errors and rethrow with a proper message
        throw new Error(error.message || 'Something went wrong while adding student data');
    }
}


// // fetch Student data 
// export async function fetchStudentData() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/get`);

//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }

//     return res.json();
// }




// //add student data
// export async function addStudentData(studentData) {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/add`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(studentData),
//         });

//         // Check if the server response is not OK (status code is not in the range of 200-299)
//         if (!res.ok) {
//             // Try to extract the error message from the response body
//             const errorData = await res.json();
//             // Throw an error with the message returned from the server
//             throw new Error(errorData.message || 'Failed to add student data');
//         }

//         return res.json(); // Parse and return the JSON data if the response is OK
//     } catch (error) {
//         // Catch any network or server errors and rethrow with a proper message
//         throw new Error(error.message || 'Something went wrong while adding student data');
//     }
// }


//fetch studentdata by StudentID(string)

export async function fetchStudentById(studentID) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/get/${studentID}`);

    if (!res.ok) {
        throw new Error('Failed to fetch student data');
    }

    return res.json();
}

//fetch student data by objectid
export async function fetchStudentByID(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/gets/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch student data');
    }

    return res.json();
}
// updata student data by studentID
export const updateStudentData = async (studentID, formData) => {
    try {
        // Perform update request with student ID and formData
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/update/${studentID}`, {
            method: 'PUT', // Assuming you use PUT method for updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error('Failed to update student data');
        }
        return await response.json(); // Assuming the response is JSON data
    } catch (error) {
        throw new Error(`Failed to update student data: ${error.message}`);
    }
};

// delete student data by object id
export async function deleteStudentData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/delete/${id}`;

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

//fetch studentby email
export async function fetchStudentByEmail(email) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/student/email/${email}`);
        if (!response.ok) {
            throw new Error('Failed to fetch student data');
        }
        const studentData = await response.json();
        return studentData;
    } catch (error) {
        console.error('Error fetching student by email:', error);
        throw error;
    }
}

// import Student data

export async function importStudentData(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/import`, {
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



//event fetch 

export async function fetcheventData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/event/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
// Count Data for Student


export async function fetchCountData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/count?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


//Fees api

//Add Fee

export async function addFeeData(FeeData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(FeeData),
    });

    if (!res.ok) {
        throw new Error('Failed to add Fee data');
    }

    return res.json();
}

// Fetch all Fee Data for student 

export async function fetchFeeData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/get?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

//Fetch Fee for student using object id

export async function fetchFeeRecordById(id) {
    try {
        console.log(`Fetchinginng fee record for id: ${id}`);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/get/${id}`);

        if (!res.ok) {
            throw new Error('Failed to fetch Fees data');
        }

        const data = await res.json();
        console.log(`Fee record data received: ${data}`);
        return data;
    } catch (error) {
        console.error(`Error fetching fee record: ${error.message}`);
        throw error;
    }
}

//fetch fee data using studentID 
export async function fetchFeeRecordByStudentID(studentID) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/student/${studentID}`);
        if (!res.ok) {
            throw new Error('Failed to fetch Fee data for student');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching fee record:', error.message);
        throw error;
    }
}

//fee Month
// api.js

// fetch fee record using studentID and month
export async function fetchFeeRecordByMonth(studentID, month) {
    console.log(`Fetching fee record for studentID: ${studentID} and month: ${month}`);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/get/${studentID}/${month}`);
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error(`Error fetching fee record: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fee record data:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch fee record:', error);
        throw error;
    }
}

//update fee using studentID and month
export async function updateFeeRecordByMonth(studentID, month, updatedData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/updateByMonth/${studentID}/${month}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });
        if (!res.ok) {
            throw new Error('Failed to update fee data');
        }
    } catch (error) {
        console.error("Error updating fee data:", error);
        throw error;
    }
}

// send fee notice using studentID
export const sendFeeNotice = async (studentID, noticeData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/fees/sendNotice/${studentID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noticeData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Error sending fee notice');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Error sending fee notice');
    }
};


// select student using student ID
export const selectStudent = async (studentId, selected) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/selectStudent/${studentId}`, {
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/sendMessages`, {
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

// send msg through sms
export const sendSMS = async (message) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/sendSMS`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
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

// Count api to fetch all count 
export async function getData(userId) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/count/count?userId=${userId}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}



export async function fetchAllData(userId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/count/all?userId=${userId}`); // Make sure the URL matches your server endpoint

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json(); // Parse the JSON response

        // You can handle the data as needed
        console.log('Students:', data.students);
        console.log('Teachers:', data.teachers);
        console.log('Staff:', data.staff);

        return data; // Return the data if needed

    } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
        return null; // Return null or handle the error as needed
    }
}


// api.js - Function to send messages to all users

export const sendAllMessages = async (subject, message, userId) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/sendAllMessages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subject, message, userId }), // Include userId in the request body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to send messages');
        }

        const data = await response.json();
        return data; // return response data, can include 'Messages sent successfully' or other info
    } catch (error) {
        console.error('Error sending messages:', error.message);
        throw error; // rethrow the error to handle it in the component
    }
};

export async function checkUserRole(email) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/student/check-role?email=${email}`);
        const text = await response.text(); // Get the response as text

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = JSON.parse(text); // Parse the text as JSON
        return result; // Return the parsed result
    } catch (error) {
        console.error("Error fetching user role:", error);
        throw new Error("Failed to fetch user role.");
    }
}