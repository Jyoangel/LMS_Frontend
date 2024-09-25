import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditDetails from '../CalendarPage/EditDetails/[id]/page';
import { fetchCalendarById, updateCalendarData, deleteCalendarData } from '../../../../api/calendarapi';

jest.mock('../../../../api/calendarapi', () => ({
    fetchCalendarById: jest.fn(),
    updateCalendarData: jest.fn(),
    deleteCalendarData: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('EditDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form with calendar data', async () => {
        fetchCalendarById.mockResolvedValue({
            type: 'Event',
            title: 'Test Event',
            date: '2024-08-01',
            startTime: '10:00',
            endTime: '12:00',
            duration: '2 hours',
        });

        await act(async () => {
            render(<EditDetails params={{ id: '1' }} navigate={mockNavigate} />);
        });

        expect(await screen.findByLabelText(/Title \*/i)).toHaveValue('Test Event');
        expect(screen.getByLabelText(/Date \*/i)).toHaveValue('2024-08-01');
    });

    test('updates calendar data on form submission', async () => {
        fetchCalendarById.mockResolvedValue({
            type: 'Event',
            title: 'Test Event',
            date: '2024-08-01',
            startTime: '10:00',
            endTime: '12:00',
            duration: '2 hours',
        });

        updateCalendarData.mockResolvedValue({});

        await act(async () => {
            render(<EditDetails params={{ id: '1' }} navigate={mockNavigate} />);
        });

        fireEvent.change(screen.getByLabelText(/Title \*/i), { target: { value: 'Updated Title' } });
        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));

        await waitFor(() => {
            expect(updateCalendarData).toHaveBeenCalledWith('1', {
                type: 'Event',
                title: 'Updated Title',
                date: '2024-08-01',
                startTime: '10:00',
                endTime: '12:00',
                duration: '2 hours',
            });
        });
    });

    test('deletes calendar data and navigates on button click', async () => {
        deleteCalendarData.mockResolvedValue({});

        await act(async () => {
            render(<EditDetails params={{ id: '1' }} navigate={mockNavigate} />);
        });

        fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

        await waitFor(() => {
            expect(deleteCalendarData).toHaveBeenCalledWith('1');
            expect(mockNavigate).toHaveBeenCalledWith('/AdminDashboard/CalendarPage');
        });
    });

    test('displays success message on update', async () => {
        fetchCalendarById.mockResolvedValue({
            type: 'Event',
            title: 'Test Event',
            date: '2024-08-01',
            startTime: '10:00',
            endTime: '12:00',
            duration: '2 hours',
        });

        updateCalendarData.mockResolvedValue({});

        await act(async () => {
            render(<EditDetails params={{ id: '1' }} navigate={mockNavigate} />);
        });

        fireEvent.change(screen.getByLabelText(/Title \*/i), { target: { value: 'Updated Title' } });
        fireEvent.click(screen.getByRole('button', { name: /Edit/i }));

        await waitFor(() => {
            expect(screen.getByText('Event updated successfully!')).toBeInTheDocument();
        });
    });
});
