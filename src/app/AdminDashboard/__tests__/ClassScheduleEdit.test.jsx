import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditClass from '../ClassSchedule/EditClass/[id]/page'; // Adjust the import path as needed
import { fetchClassScheduleById, updateClassScheduleData, deleteClassScheduleData } from '../../../../api/classScheduleapi';

// Mocking dependencies
jest.mock('../../../../api/classScheduleapi');

describe('EditClass Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render EditClass component', () => {
        render(<EditClass params={{ id: '123' }} />);
        expect(screen.getByText('Back')).toBeInTheDocument();
        expect(screen.getByText('Edit')).toBeInTheDocument();
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByLabelText('Subject *')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Time *')).toBeInTheDocument();
        expect(screen.getByLabelText('End Time *')).toBeInTheDocument();
    });

    test('should fetch initial data on mount', async () => {
        fetchClassScheduleById.mockResolvedValue({
            subject: 'Math',
            startTime: '08:00',
            endTime: '09:00'
        });

        render(<EditClass params={{ id: '123' }} />);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Math')).toBeInTheDocument();
            expect(screen.getByDisplayValue('08:00')).toBeInTheDocument();
            expect(screen.getByDisplayValue('09:00')).toBeInTheDocument();
        });
    });

    test('should update state on input change', () => {
        render(<EditClass params={{ id: '123' }} />);

        fireEvent.change(screen.getByLabelText('Subject *'), { target: { value: 'Science' } });
        fireEvent.change(screen.getByLabelText('Start Time *'), { target: { value: '09:00' } });
        fireEvent.change(screen.getByLabelText('End Time *'), { target: { value: '10:00' } });

        expect(screen.getByDisplayValue('Science')).toBeInTheDocument();
        expect(screen.getByDisplayValue('09:00')).toBeInTheDocument();
        expect(screen.getByDisplayValue('10:00')).toBeInTheDocument();
    });



    test('should handle errors during form submission', async () => {
        fetchClassScheduleById.mockResolvedValue({
            subject: 'Math',
            startTime: '08:00',
            endTime: '09:00'
        });
        updateClassScheduleData.mockRejectedValue(new Error('Update failed'));

        render(<EditClass params={{ id: '123' }} />);

        await act(async () => {
            fireEvent.change(screen.getByLabelText('Subject *'), { target: { value: 'Science' } });
            fireEvent.change(screen.getByLabelText('Start Time *'), { target: { value: '09:00' } });
            fireEvent.change(screen.getByLabelText('End Time *'), { target: { value: '10:00' } });
            fireEvent.submit(screen.getByRole('form'));
        });

        await waitFor(() => {
            expect(updateClassScheduleData).toHaveBeenCalledWith('123', {
                subject: 'Science',
                startTime: '09:00',
                endTime: '10:00',
            });
            expect(screen.queryByText('Class schedule successfully updated!')).not.toBeInTheDocument();
        });
    });

    test('should delete class schedule and redirect', async () => {
        deleteClassScheduleData.mockResolvedValue({});

        render(<EditClass params={{ id: '123' }} />);

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(deleteClassScheduleData).toHaveBeenCalledWith('123');
        });
    });

    test('should handle errors during deletion', async () => {
        deleteClassScheduleData.mockRejectedValue(new Error('Delete failed'));

        render(<EditClass params={{ id: '123' }} />);

        fireEvent.click(screen.getByText('Delete'));

        await waitFor(() => {
            expect(deleteClassScheduleData).toHaveBeenCalledWith('123');
        });
    });
});
