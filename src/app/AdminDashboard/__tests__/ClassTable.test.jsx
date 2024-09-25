import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClassTable from '../Class/ClassTable';
import { fetchClassData, deleteClassData } from '../../../../api/classapi';

// Mock the API calls
jest.mock('../../../../api/classapi');

describe('ClassTable Component', () => {
    test('calls deleteClassData and updates list when deletion is confirmed', async () => {
        // Mock data
        const mockClassData = {
            classes: [
                { _id: '1', className: 'Math 101', date: '2024-08-10', time: '10:00 AM' },
                { _id: '2', className: 'Science 101', date: '2024-08-11', time: '11:00 AM' }
            ]
        };

        // Mock implementations
        fetchClassData.mockResolvedValueOnce(mockClassData);
        deleteClassData.mockResolvedValueOnce();

        // Render the component
        render(<ClassTable filter="" searchTerm="" />);

        // Wait for the component to load data
        await waitFor(() => screen.getByText('Math 101'));

        // Open delete confirmation for the first item
        fireEvent.click(screen.getAllByText('Delete')[0]);

        // Confirm that the modal appears
        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();

        // Click Confirm in the modal
        const [confirmButton] = screen.getAllByRole('button', { name: /delete/i });
        fireEvent.click(confirmButton);



    });
});
