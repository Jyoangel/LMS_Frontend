import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagement from '../UserManagement/page'; // Adjust the import path as necessary
import { fetchCountData } from '../../../../api/api';
import '@testing-library/jest-dom';

// Mock API calls
jest.mock('../../../../api/api', () => ({
    fetchCountData: jest.fn(),
    fetchCountTeacherData: jest.fn(),
    fetchCountStaffData: jest.fn(),
}));

describe('UserManagement Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders with initial state', () => {
        render(<UserManagement />);
        expect(screen.getByText('Total Users: 0')).toBeInTheDocument();
        expect(screen.getByText('Students')).toHaveClass('text-blue-500');
        expect(screen.queryByText('Teachers')).toHaveClass('text-gray-500');
        expect(screen.queryByText('Staffs')).toHaveClass('text-gray-500');
    });

    test('fetches and displays total users correctly for Students', async () => {
        fetchCountData.mockResolvedValueOnce({ count: 100 });
        render(<UserManagement />);

        await waitFor(() => {
            expect(screen.getByText('Total Users: 100')).toBeInTheDocument();
        });
    });

    test('renders the correct links and buttons', () => {
        render(<UserManagement />);
        expect(screen.getByText('import')).toHaveClass('text-blue-500');
        expect(screen.getByText('Add New')).toHaveClass('text-white bg-blue-500');
        expect(screen.getByText('Show')).toBeInTheDocument();
        expect(screen.getByText('Refresh')).toBeInTheDocument();
    });

    test('handles page navigation buttons', () => {
        render(<UserManagement />);
        fireEvent.click(screen.getByRole('button', { name: /page left/i }));
        fireEvent.click(screen.getByRole('button', { name: /page right/i }));
        // You might need to mock page navigation logic if it's part of the component's functionality
    });
});
