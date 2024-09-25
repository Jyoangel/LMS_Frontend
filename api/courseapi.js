// fetch course data

export async function fetchCourseData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/get`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}


// add course data
export async function addCourseData(formData) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/add`, {
            method: 'POST',
            body: formData, // Use FormData object here
        });

        // Check if the server response is not OK (status code is not in the range of 200-299)
        if (!res.ok) {
            // Try to extract the error message from the response body
            const errorData = await res.json();
            // Throw an error with the message returned from the server
            throw new Error(errorData.message || 'Failed to add course data');
        }

        return res.json(); // Parse the JSON data if the response is OK
    } catch (error) {
        // Catch any network or server errors
        throw new Error(error.message || 'Something went wrong while adding course data');
    }
}

// delete course data

export async function deleteCourseData(id) {
    const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/delete/${id}`;

    try {
        const res = await fetch(url, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error('Failed to delete course data');
        }

        return res.json();
    } catch (error) {
        throw new Error(`Error deleting course data: ${error.message}`);
    }
}


// update course data
export async function updateCourseData(id, courseData) {
    console.log('Request body:', courseData); // Add this log
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(courseData)
        });
        console.log(`Response status: ${res.status}`);
        console.log(`Response ok: ${res.ok}`);
        if (!res.ok) {
            throw new Error('Failed to update Course data');
        }
        return res.json();
    } catch (error) {
        console.error(`Error updating course data: ${error}`);
        throw error;
    }
}
// fetch course by id 
export async function fetchCourseById(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/get/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch course data');
    }

    return res.json();
}

// import course data
export async function importCourseData(file) {
    try {
        // Create FormData to upload the file
        const formData = new FormData();
        formData.append('file', file);

        // Send a POST request to the import route
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/course/import`, {
            method: 'POST',
            body: formData,
        });

        // Check for errors in the response
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();
        console.log('Success:', result);

        return result;
    } catch (error) {
        console.error('Error importing course data:', error);
        throw error;
    }
}

