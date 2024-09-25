import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddDetails from '../CalendarPage/AddDetails/page';
import { addCalendarData } from '../../../../api/calendarapi';
import '@testing-library/jest-dom';

// Mock addCalendarData function
jest.mock('../../../../api/calendarapi', () => ({
    addCalendarData: jest.fn(),
}));

describe('AddDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<AddDetails />);
        expect(screen.getByText('Back')).toBeInTheDocument();

        // Using aria-label for form fields
        expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Start Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/End Time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
    });

    test('updates state on input change', () => {
        render(<AddDetails />);

        // Use aria-label to target specific fields
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Meeting' } });
        expect(screen.getByLabelText(/Title/i).value).toBe('Meeting');

        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-08-10' } });
        expect(screen.getByLabelText(/Date/i).value).toBe('2024-08-10');
    });

    test('successful form submission', async () => {
        addCalendarData.mockResolvedValueOnce({});
        render(<AddDetails />);

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Meeting' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-08-10' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(screen.getByText('Event added successfully!')).toBeInTheDocument());
        expect(addCalendarData).toHaveBeenCalledWith(expect.objectContaining({
            title: 'Meeting',
            date: '2024-08-10',
        }));
    });

    test('failed form submission', async () => {
        addCalendarData.mockRejectedValueOnce(new Error('Failed'));
        render(<AddDetails />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Meeting' } });
        fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2024-08-10' } });

        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(screen.getByText('Failed to add event. Please try again.')).toBeInTheDocument());
    });

    test('navigates back on back button click', () => {
        render(<AddDetails />);
        fireEvent.click(screen.getByText('Back'));
        // Verify navigation if possible (depends on routing setup)
    });
});
