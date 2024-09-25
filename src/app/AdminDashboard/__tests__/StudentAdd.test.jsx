import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentDetails from '../UserManagement/StudentDetails/page';
import { addStudentData } from '../../../../api/api';

// Mocking the API function
jest.mock('../../../../api/api', () => ({
    addStudentData: jest.fn(),
}));

describe('StudentDetails Component', () => {
    beforeEach(() => {
        render(<StudentDetails />);
    });

    test('renders the form correctly', () => {
        expect(screen.getByLabelText(/Student ID\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Form Number\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Admission Number\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Name\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Class\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Admission Type\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gender\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nationality\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Mother Tongue\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Religion\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Caste\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Blood Group\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Aadhar Number\*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contact Number\*/i)).toBeInTheDocument();
        expect(screen.getByText(/Back/i)).toBeInTheDocument();
        expect(screen.getByText(/Student Details/i)).toBeInTheDocument();
    });

    test('handles input changes correctly', () => {
        fireEvent.change(screen.getByLabelText(/Student ID\*/i), {
            target: { value: '123' },
        });
        expect(screen.getByLabelText(/Student ID\*/i).value).toBe('123');
    });

    test('submits the form and calls addStudentData API', async () => {
        fireEvent.change(screen.getByLabelText(/Student ID\*/i), {
            target: { value: '123' },
        });
        fireEvent.change(screen.getByLabelText(/Name\*/i), {
            target: { value: 'John Doe' },
        });
        fireEvent.change(screen.getByLabelText(/Class\*/i), {
            target: { value: '10' },
        });

        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => expect(addStudentData).toHaveBeenCalled());
    });

    test('opens and closes the success modal correctly', async () => {
        // Mock the API call to be successful
        addStudentData.mockResolvedValueOnce({});

        fireEvent.click(screen.getByText(/Submit/i));




    });



    test('resets form data after successful submission', async () => {
        fireEvent.change(screen.getByLabelText(/Student ID\*/i), {
            target: { value: '123' },
        });
        fireEvent.click(screen.getByText(/Submit/i));

        await waitFor(() => expect(screen.getByLabelText(/Student ID\*/i).value).toBe(''));
    });
});
