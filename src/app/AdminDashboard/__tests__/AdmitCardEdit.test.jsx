import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditAdmitCard from '../ReportCard/EditAdmitCard/[id]/page';
import { fetchAdmitCardById, updateAdmitCardData } from '../../../../api/reportcardapi';

// Mock the API functions
jest.mock('../../../../api/reportcardapi', () => ({
    fetchAdmitCardById: jest.fn(),
    updateAdmitCardData: jest.fn(),
}));

const mockAdmitCardData = {
    examination_roll_number: "123456",
    school_name: "Test School",
    session: "2024",
    examination: "Final",
    student_name: "John Doe",
    class: "10A",
    startdate: "2024-08-01",
    enddate: "2024-08-15",
    examstarting_time: "09:00",
    examending_time: "12:00",
    examsubjects: [{ subject: "Math", examination_date: "2024-08-05" }],
};

describe('EditAdmitCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should fetch and display initial admit card data on load', async () => {
        fetchAdmitCardById.mockResolvedValue(mockAdmitCardData);

        render(<EditAdmitCard params={{ id: '1' }} />);

        // Wait for the form fields to be populated
        await waitFor(() => {
            expect(screen.getByLabelText(/Examination Roll No\*/i)).toHaveValue(mockAdmitCardData.examination_roll_number);
            expect(screen.getByLabelText(/School Name\*/i)).toHaveValue(mockAdmitCardData.school_name);
            expect(screen.getByLabelText(/Session\*/i)).toHaveValue(mockAdmitCardData.session);
            expect(screen.getByLabelText(/Examination\*/i)).toHaveValue(mockAdmitCardData.examination);
            expect(screen.getByLabelText(/Student Name\*/i)).toHaveValue(mockAdmitCardData.student_name);
            expect(screen.getByLabelText(/Class\*/i)).toHaveValue(mockAdmitCardData.class);
            expect(screen.getByLabelText(/Start Date\*/i)).toHaveValue(mockAdmitCardData.startdate);
            expect(screen.getByLabelText(/End Date\*/i)).toHaveValue(mockAdmitCardData.enddate);
            expect(screen.getByLabelText(/Exam Starting Time\*/i)).toHaveValue(mockAdmitCardData.examstarting_time);
            expect(screen.getByLabelText(/Exam Ending Time\*/i)).toHaveValue(mockAdmitCardData.examending_time);
            expect(screen.getByLabelText(/Subject\*/i)).toHaveValue(mockAdmitCardData.examsubjects[0].subject);
            expect(screen.getByLabelText(/Examination Date\*/i)).toHaveValue(mockAdmitCardData.examsubjects[0].examination_date);
        });
    });

    test('should update form data on input change', () => {
        render(<EditAdmitCard params={{ id: '1' }} />);

        // Change values in the form
        fireEvent.change(screen.getByLabelText(/Examination Roll No\*/i), { target: { value: '654321' } });
        fireEvent.change(screen.getByLabelText(/School Name\*/i), { target: { value: 'Updated School' } });

        // Check if form values have been updated
        expect(screen.getByLabelText(/Examination Roll No\*/i)).toHaveValue('654321');
        expect(screen.getByLabelText(/School Name\*/i)).toHaveValue('Updated School');
    });

    test('should add a new subject field', () => {
        render(<EditAdmitCard params={{ id: '1' }} />);

        // Add a new subject field
        fireEvent.click(screen.getByText(/Add Subject/i));

        // Verify new subject field is present
        expect(screen.getAllByLabelText(/Subject\*/i)).toHaveLength(2);
        expect(screen.getAllByLabelText(/Examination Date\*/i)).toHaveLength(2);
    });

    test('shows success modal on successful form submission', async () => {
        updateAdmitCardData.mockResolvedValueOnce({ success: true });

        await act(async () => {
            render(<EditAdmitCard params={{ id: '1' }} />);
        });

        // Find the form element and submit it
        const formElement = screen.getByTestId('form'); // Assuming the form has a role="form"

        await act(async () => {
            fireEvent.submit(formElement);
        });


    });
});
