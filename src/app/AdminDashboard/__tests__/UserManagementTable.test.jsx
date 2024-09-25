import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagementTable from '../UserManagement/components/UserManagementTable';
import { fetchStudentData, deleteStudentData } from '../../../../api/api';
import '@testing-library/jest-dom';


// Mock API calls
jest.mock('../../../../api/api', () => ({
    fetchStudentData: jest.fn(),
    deleteStudentData: jest.fn(),
}));

describe('UserManagementTable', () => {
    const mockStudents = [
        {
            _id: '1',
            studentID: 'S001',
            name: 'John Doe',
            class: '10',
            dateOfBirth: '2006-01-01T00:00:00.000Z',
            gender: 'Male',
            aadharNumber: '123456789012',
            parent: { fatherName: 'James Doe' },
            contactNumber: '9876543210',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly with initial state', () => {
        render(<UserManagementTable filter="" searchTerm="" />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('fetches and displays student data', async () => {
        fetchStudentData.mockResolvedValueOnce({ students: mockStudents });
        render(<UserManagementTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });

    test('handles fetch error', async () => {
        fetchStudentData.mockRejectedValueOnce(new Error('Fetch error'));
        render(<UserManagementTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Error: Fetch error')).toBeInTheDocument();
        });
    });



    test('filters and searches correctly', async () => {
        fetchStudentData.mockResolvedValueOnce({ students: mockStudents });
        render(<UserManagementTable filter="10" searchTerm="John" />);

        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.queryByText('No results found')).not.toBeInTheDocument();
        });
    });

    test('renders table with student data', async () => {
        fetchStudentData.mockResolvedValueOnce({ students: mockStudents });
        render(<UserManagementTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('S001')).toBeInTheDocument();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
        });
    });

    test('renders links correctly', async () => {
        fetchStudentData.mockResolvedValueOnce({ students: mockStudents });
        render(<UserManagementTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Edit')).toHaveAttribute('href', '/AdminDashboard/UserManagement/UpdateDetails/S001');
            expect(screen.getByText('John Doe')).toHaveAttribute('href', '/AdminDashboard/Fees/FeeDetails/S001');
        });
    });



    test('handles component unmount correctly', () => {
        const { unmount } = render(<UserManagementTable filter="" searchTerm="" />);
        unmount();
        // No specific assertions here, just ensuring it unmounts without errors
    });
});
