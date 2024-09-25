import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditClass from '../../AdminDashboard/Class/EditClass/[id]/page';
import { fetchClassById, updateClassData } from '../../../../api/classapi';

// Mock the functions from the API module
jest.mock('../../../../api/classapi');

describe('EditClass Component', () => {
    const mockParams = { id: '123' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component correctly', async () => {
        fetchClassById.mockResolvedValueOnce({ className: 'Class 1' });

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Class*')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });

    test('fetches and displays class data when ID is provided', async () => {
        fetchClassById.mockResolvedValueOnce({ className: 'Class 1' });

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        await waitFor(() => expect(fetchClassById).toHaveBeenCalledWith('123'));

        expect(screen.getByDisplayValue('Class 1')).toBeInTheDocument();
    });

    test('updates class data when form is submitted with an ID', async () => {
        fetchClassById.mockResolvedValueOnce({ className: 'Class 1' });
        updateClassData.mockResolvedValueOnce();

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        await waitFor(() => expect(fetchClassById).toHaveBeenCalledWith('123'));

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Class 2' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(updateClassData).toHaveBeenCalledWith('123', { className: 'Class 2' }));

        expect(screen.getByText(/class added\/updated successfully!/i)).toBeInTheDocument();
    });

    test('does not submit form if no class is selected', async () => {
        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => {
            expect(updateClassData).not.toHaveBeenCalled();
        });
    });

    test('handles error when fetching class data fails', async () => {
        console.error = jest.fn(); // Suppress error output in the test
        fetchClassById.mockRejectedValueOnce(new Error('Failed to fetch'));

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        await waitFor(() => expect(fetchClassById).toHaveBeenCalledWith('123'));

        expect(console.error).toHaveBeenCalledWith('Failed to fetch class data', new Error('Failed to fetch'));
    });

    test('handles error when updating class data fails', async () => {
        console.error = jest.fn(); // Suppress error output in the test
        fetchClassById.mockResolvedValueOnce({ className: 'Class 1' });
        updateClassData.mockRejectedValueOnce(new Error('Failed to update'));

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        await waitFor(() => expect(fetchClassById).toHaveBeenCalledWith('123'));

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Class 2' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(updateClassData).toHaveBeenCalledWith('123', { className: 'Class 2' }));

        expect(console.error).toHaveBeenCalledWith('Failed to save class data', new Error('Failed to update'));
    });

    test('closes success modal when close button is clicked', async () => {
        fetchClassById.mockResolvedValueOnce({ className: 'Class 1' });
        updateClassData.mockResolvedValueOnce();

        await act(async () => {
            render(<EditClass params={mockParams} />);
        });

        await waitFor(() => expect(fetchClassById).toHaveBeenCalledWith('123'));

        fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Class 2' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(updateClassData).toHaveBeenCalledWith('123', { className: 'Class 2' }));

        const closeButton = screen.getByText('Done'); // Adjust text to match the actual close button text in Successcard
        fireEvent.click(closeButton);

        expect(screen.queryByText(/class added\/updated successfully!/i)).not.toBeInTheDocument();
    });
});
