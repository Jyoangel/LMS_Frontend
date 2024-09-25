import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Timetable from '../ClassSchedule/Timetable'; // Adjust the import path as needed
import { fetchClassScheduleData } from '../../../../api/classScheduleapi';

// Mocking the fetchClassScheduleData API call
jest.mock('../../../../api/classScheduleapi');

describe('Timetable Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render timetable headers', () => {
        render(<Timetable />);
        expect(screen.getByText('#')).toBeInTheDocument();
        expect(screen.getByText('Monday')).toBeInTheDocument();
        expect(screen.getByText('Tuesday')).toBeInTheDocument();
        expect(screen.getByText('Wednesday')).toBeInTheDocument();
        expect(screen.getByText('Thursday')).toBeInTheDocument();
        expect(screen.getByText('Friday')).toBeInTheDocument();
        expect(screen.getByText('Saturday')).toBeInTheDocument();
    });

    test('should render timetable periods', () => {
        render(<Timetable />);
        const periods = [1, 2, 3, 4, 5, 6, 7, 8];
        periods.forEach(period => {
            expect(screen.getByText(period.toString())).toBeInTheDocument();
        });
    });

    test('should fetch and render schedule data', async () => {
        const mockData = [
            { _id: '1', day: 'Monday', period: 1, subject: 'Math', startTime: '08:00', endTime: '09:00' },
            { _id: '2', day: 'Tuesday', period: 2, subject: 'Science', startTime: '09:00', endTime: '10:00' },
        ];
        fetchClassScheduleData.mockResolvedValue(mockData);

        render(<Timetable />);

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
            expect(screen.getByText('Science')).toBeInTheDocument();
        });
    });



    test('should navigate to edit page on schedule data click', async () => {
        const mockData = [
            { _id: '1', day: 'Monday', period: 1, subject: 'Math', startTime: '08:00', endTime: '09:00' },
        ];
        fetchClassScheduleData.mockResolvedValue(mockData);

        render(<Timetable />);

        await waitFor(() => {
            const link = screen.getByText('Math');
            expect(link.closest('a')).toHaveAttribute('href', '/AdminDashboard/ClassSchedule/EditClass/1');
        });
    });



    test('should handle fetch data error', async () => {
        fetchClassScheduleData.mockRejectedValue(new Error('Fetch failed'));

        render(<Timetable />);

        await waitFor(() => {
            expect(screen.queryByText('Math')).not.toBeInTheDocument();
            expect(screen.queryByText('Science')).not.toBeInTheDocument();
        });
    });
});
