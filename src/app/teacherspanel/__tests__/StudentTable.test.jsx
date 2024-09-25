import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import StudentTable from '../Student/StudentTable';  // Adjust the import path as necessary
import { fetchStudentData } from '../../../../api/api';  // Mock the API

// Mock the fetchStudentData API call
jest.mock('../../../../api/api', () => ({
    fetchStudentData: jest.fn(),
}));

const mockStudentData = {
    students: [
        {
            studentID: 'S001',
            name: 'John Doe',
            class: '10',
            dateOfBirth: '2005-05-15',
            Gender: 'Male',
            aadharNumber: '123456789012',
            parent: { fatherName: 'Mark Doe' },
            contactNumber: '9876543210',
        },
        {
            studentID: 'S002',
            name: 'Jane Smith',
            class: '9',
            dateOfBirth: '2006-07-21',
            Gender: 'Female',
            aadharNumber: '987654321012',
            parent: { fatherName: 'Peter Smith' },
            contactNumber: '9123456789',
        },
    ],
};

describe('StudentTable Component', () => {
    // Test initial rendering
    it('renders the table with correct headings', async () => {
        fetchStudentData.mockResolvedValue(mockStudentData);

        await act(async () => {
            render(<StudentTable />);
        });

        // Check table headings
        expect(screen.getByText('Sr. No')).toBeInTheDocument();
        expect(screen.getByText('Student Id')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Class')).toBeInTheDocument();
        expect(screen.getByText('DOB')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('Aadhar No')).toBeInTheDocument();
        expect(screen.getByText('Father Name')).toBeInTheDocument();
        expect(screen.getByText('Contact No')).toBeInTheDocument();
    });

    // Test data fetching
    it('fetches and displays student data', async () => {
        fetchStudentData.mockResolvedValue(mockStudentData);

        await act(async () => {
            render(<StudentTable />);
        });

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('S001')).toBeInTheDocument();
            expect(screen.getByText('10')).toBeInTheDocument();
            expect(screen.getByText('2005-05-15')).toBeInTheDocument(); // Date formatted
            expect(screen.getByText('Mark Doe')).toBeInTheDocument();
            expect(screen.getByText('9876543210')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });

    // Test checkbox interaction
    it('allows toggling access checkboxes', async () => {
        fetchStudentData.mockResolvedValue(mockStudentData);

        await act(async () => {
            render(<StudentTable />);
        });

        // Checkboxes should be rendered
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(3); // 2 for students + 1 for the header

        // Simulate clicking the checkbox for the first student
        fireEvent.click(checkboxes[1]); // Click the first student checkbox
        expect(checkboxes[1].checked).toBe(true); // Verify it's checked

        fireEvent.click(checkboxes[1]); // Click again to uncheck
        expect(checkboxes[1].checked).toBe(false); // Verify it's unchecked
    });

    // Test that student name links are correctly generated
    it('renders student names with links to attendance details', async () => {
        fetchStudentData.mockResolvedValue(mockStudentData);

        await act(async () => {
            render(<StudentTable />);
        });

        const studentLink = screen.getByText('John Doe');
        expect(studentLink).toBeInTheDocument();
        expect(studentLink).toHaveAttribute(
            'href',
            '/teacherspanel/Attendance/StudentAtdDetails/S001'
        );

        const secondStudentLink = screen.getByText('Jane Smith');
        expect(secondStudentLink).toBeInTheDocument();
        expect(secondStudentLink).toHaveAttribute(
            'href',
            '/teacherspanel/Attendance/StudentAtdDetails/S002'
        );
    });

});
