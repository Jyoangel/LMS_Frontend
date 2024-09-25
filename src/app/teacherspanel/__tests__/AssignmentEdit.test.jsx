// __tests__/EditDetails.test.js

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditDetails from '../Assignment/EditDeatils/[id]/page';
import { fetchAssignmentById, updateAssignmentData } from '../../../../api/assignmentapi';

// Mock the API functions
jest.mock('../../../../api/assignmentapi', () => ({
    fetchAssignmentById: jest.fn(),
    updateAssignmentData: jest.fn(),
}));

const mockData = {
    assignmentCode: "123",
    assignmentTitle: "Test Assignment",
    dueDate: "2024-08-30",
    attachments: "attachment.pdf",
    submissionMethod: "Online",
    marks: "50",
    additionalInstruction: "Complete by deadline",
    class: "1",
    assignTo: "All Students",
    courseDescription: "Description of the course",
    createdBy: "Teacher A"
};

describe('EditDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders EditDetails component and form elements', async () => {
        fetchAssignmentById.mockResolvedValue(mockData);

        render(<EditDetails params={{ id: '1' }} />);

        // Check if the form elements are present
        expect(screen.getByLabelText(/Assignment Code/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Assignment Title/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Due Date/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Attachments/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Submission Method/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Marks/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Additional Instruction/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Assign To/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Course Description/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Created By/)).toBeInTheDocument();
    });

    test('fetches and displays assignment data on mount', async () => {
        fetchAssignmentById.mockResolvedValue(mockData);

        render(<EditDetails params={{ id: '1' }} />);

        // Check if the form fields are populated with the fetched data
        await waitFor(() => {
            expect(screen.getByDisplayValue(mockData.assignmentCode)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.assignmentTitle)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.dueDate)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.attachments)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.marks)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.additionalInstruction)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.class)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.assignTo)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.courseDescription)).toBeInTheDocument();
            expect(screen.getByDisplayValue(mockData.createdBy)).toBeInTheDocument();
        });
    });

    test('handles form input changes', () => {
        fetchAssignmentById.mockResolvedValue(mockData);

        render(<EditDetails params={{ id: '1' }} />);

        // Change input values
        fireEvent.change(screen.getByLabelText(/Assignment Code/), { target: { value: 'New Code' } });
        fireEvent.change(screen.getByLabelText(/Assignment Title/), { target: { value: 'New Title' } });

        expect(screen.getByDisplayValue('New Code')).toBeInTheDocument();
        expect(screen.getByDisplayValue('New Title')).toBeInTheDocument();
    });

    test('submits the form and shows success message', async () => {
        fetchAssignmentById.mockResolvedValue(mockData);
        updateAssignmentData.mockResolvedValue({});

        render(<EditDetails params={{ id: '1' }} />);

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/Assignment Code/), { target: { value: 'New Code' } });
        fireEvent.click(screen.getByText(/Update/));


    });

    test('handles form submission errors', async () => {
        fetchAssignmentById.mockResolvedValue(mockData);
        updateAssignmentData.mockRejectedValue(new Error('Update failed'));

        render(<EditDetails params={{ id: '1' }} />);

        // Fill out the form and submit
        fireEvent.change(screen.getByLabelText(/Assignment Code/), { target: { value: 'New Code' } });
        fireEvent.click(screen.getByText(/Update/));


    });

    test('handles cancel button click', () => {
        render(<EditDetails params={{ id: '1' }} />);

        const cancelButton = screen.getByText(/Cancel/);
        fireEvent.click(cancelButton);


    });
});
