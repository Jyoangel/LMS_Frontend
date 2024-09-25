import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeacherManagementTable from '../Communication/StaffTable';
import { fetchStaffData, deleteStaffData } from '../../../../api/staffapi';

// Mock the fetchStaffData and deleteStaffData functions
jest.mock('../../../../api/staffapi');

const mockStaffData = {
    staff: [
        {
            _id: '1',
            staffID: 'T001',
            name: 'Alice Johnson',
            email: 'alice@example.com',
            dateOfBirth: '1990-01-01',
            gender: 'Female',
            aadharNumber: '123456789012',
            position: 'Teacher',
            contactNumber: '1234567890',
        },
        {
            _id: '2',
            staffID: 'T002',
            name: 'Bob Smith',
            email: 'bob@example.com',
            dateOfBirth: '1985-05-15',
            gender: 'Male',
            aadharNumber: '987654321098',
            position: 'Principal',
            contactNumber: '0987654321',
        },
    ],
};

describe('TeacherManagementTable', () => {
    beforeEach(() => {
        fetchStaffData.mockResolvedValue(mockStaffData);
        deleteStaffData.mockResolvedValue({});
    });

    it('renders loading state initially', async () => {
        render(<TeacherManagementTable filter="" searchTerm="" />);
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('renders table with staff data', async () => {
        render(<TeacherManagementTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
            expect(screen.getByText('Bob Smith')).toBeInTheDocument();
        });
    });

    it('filters staff by search term', async () => {
        render(<TeacherManagementTable filter="" searchTerm="Alice" />);
        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
            expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
        });
    });



    it('displays error message when fetch fails', async () => {
        fetchStaffData.mockRejectedValueOnce(new Error('Fetch failed'));
        render(<TeacherManagementTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument();
        });
    });

    it('opens confirmation dialog on delete button click', async () => {
        render(<TeacherManagementTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText('Delete')[0]);
        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();
    });

    it('calls deleteStaffData on confirm delete', async () => {
        render(<TeacherManagementTable filter="" searchTerm="" />);
        await waitFor(() => {
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText('Delete')[0]);

    });


});
