import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateTimetable from '../ClassSchedule/CreateTimetable/[dayperiod]/page';
import { addClassScheduleData } from '../../../../api/classScheduleapi';


// Mock the addClassScheduleData function
jest.mock('../../../../api/classScheduleapi', () => ({
    addClassScheduleData: jest.fn(),
}));

describe('CreateTimetable Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders CreateTimetable component', () => {
        render(<CreateTimetable params={{ dayperiod: 'Monday1' }} />);

        expect(screen.getByText('Subject *')).toBeInTheDocument();
        expect(screen.getByLabelText('Start Time *')).toBeInTheDocument();
        expect(screen.getByLabelText('End Time *')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    test('initializes day and period from URL params', () => {
        render(<CreateTimetable params={{ dayperiod: 'Wednesday3' }} />);

        expect(screen.getByLabelText('Start Time *').value).toBe('');
        expect(screen.getByLabelText('End Time *').value).toBe('');
        expect(screen.queryByText('Time Table added successfully!')).toBeNull();
    });

    test('updates subject, startTime, and endTime state on user input', () => {
        render(<CreateTimetable params={{ dayperiod: 'Tuesday2' }} />);

        fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'Math' } });
        expect(screen.getByPlaceholderText('Type here').value).toBe('Math');

        fireEvent.change(screen.getByLabelText('Start Time *'), { target: { value: '08:00' } });
        expect(screen.getByLabelText('Start Time *').value).toBe('08:00');

        fireEvent.change(screen.getByLabelText('End Time *'), { target: { value: '09:00' } });
        expect(screen.getByLabelText('End Time *').value).toBe('09:00');
    });

    test('handles form submission and shows success message', async () => {
        addClassScheduleData.mockResolvedValueOnce({ success: true });

        render(<CreateTimetable params={{ dayperiod: 'Thursday4' }} />);

        fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'Science' } });
        fireEvent.change(screen.getByLabelText('Start Time *'), { target: { value: '10:00' } });
        fireEvent.change(screen.getByLabelText('End Time *'), { target: { value: '11:00' } });

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(addClassScheduleData).toHaveBeenCalledWith({
            subject: 'Science',
            startTime: '10:00',
            endTime: '11:00',
            day: 'Thursday',
            period: '4'
        }));

        expect(screen.getByText('Time Table added successfully!')).toBeInTheDocument();
    });

    test('handles error during form submission', async () => {
        addClassScheduleData.mockRejectedValueOnce(new Error('Failed to add class schedule'));

        render(<CreateTimetable params={{ dayperiod: 'Friday5' }} />);

        fireEvent.change(screen.getByPlaceholderText('Type here'), { target: { value: 'History' } });
        fireEvent.change(screen.getByLabelText('Start Time *'), { target: { value: '12:00' } });
        fireEvent.change(screen.getByLabelText('End Time *'), { target: { value: '01:00' } });

        fireEvent.click(screen.getByText('Submit'));

        await waitFor(() => expect(addClassScheduleData).toHaveBeenCalledWith({
            subject: 'History',
            startTime: '12:00',
            endTime: '01:00',
            day: 'Friday',
            period: '5'
        }));

        expect(screen.queryByText('Time Table added successfully!')).toBeNull();
    });



    test('handles navigation back button', () => {
        render(<CreateTimetable params={{ dayperiod: 'Monday1' }} />);
        expect(screen.getByText('Back')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Back'));
        // Assuming you want to check if it redirects to the correct URL or handle the back button action
    });
});
