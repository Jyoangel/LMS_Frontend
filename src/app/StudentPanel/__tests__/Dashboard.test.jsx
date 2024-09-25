import { render, screen, waitFor, act } from '@testing-library/react';
import Dashboard from '../Dashboard/page';
import { useUser } from '@auth0/nextjs-auth0/client';
import { fetcheventData } from '../../../../api/api';
import { fetchHomeWorkData } from '../../../../api/homeworkapi';
import { fetchAssignmentData } from '../../../../api/assignmentapi';
import { fetchClassScheduleData } from '../../../../api/classScheduleapi';

// Mock the required APIs and hooks
jest.mock('@auth0/nextjs-auth0/client');
jest.mock('../../../../api/api');
jest.mock('../../../../api/homeworkapi');
jest.mock('../../../../api/assignmentapi');
jest.mock('../../../../api/classScheduleapi');

describe('Dashboard Component', () => {
    beforeEach(() => {
        useUser.mockReturnValue({
            user: { name: 'Test User' },
            error: null,
            isLoading: false
        });
        fetcheventData.mockResolvedValue([]);
        fetchHomeWorkData.mockResolvedValue({ homeworks: [] });
        fetchAssignmentData.mockResolvedValue({ assignments: [] });
        fetchClassScheduleData.mockResolvedValue([]);
    });

    it('renders without crashing', async () => {
        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText('Total Students')).toBeInTheDocument();
        expect(screen.getByText('Today Learning Hours')).toBeInTheDocument();
    });



    it('displays user data after loading', async () => {
        await act(async () => {
            render(<Dashboard />);
        });

        expect(screen.getByText('Total Students')).toBeInTheDocument();
        expect(screen.getByText('Test User (You)')).toBeInTheDocument();
    });

    it('displays events fetched from API', async () => {
        const mockEvents = [
            {
                eventName: 'Test Event',
                eventDate: '2024-08-21T00:00:00Z',
                eventTime: '10:00 AM',
                description: 'Event Description',
                organizerName: 'Organizer 1'
            }
        ];
        fetcheventData.mockResolvedValue(mockEvents);

        await act(async () => {
            render(<Dashboard />);
        });

        await waitFor(() => {
            expect(screen.getByText('Test Event')).toBeInTheDocument();
            expect(screen.getByText('Event Description')).toBeInTheDocument();
        });
    });



    it('displays homework data', async () => {
        const mockHomeworks = [
            { homework: 'Math Homework', endDate: '2024-08-25T00:00:00Z' }
        ];
        fetchHomeWorkData.mockResolvedValue({ homeworks: mockHomeworks });

        await act(async () => {
            render(<Dashboard />);
        });

        await waitFor(() => {
            expect(screen.getByText('Math Homework')).toBeInTheDocument();
        });
    });



    it('displays assignment data', async () => {
        const mockAssignments = [
            { assignmentTitle: 'Math Assignment', dueDate: '2024-08-23T00:00:00Z' }
        ];
        fetchAssignmentData.mockResolvedValue({ assignments: mockAssignments });

        await act(async () => {
            render(<Dashboard />);
        });


    });



    it('displays class schedule data', async () => {
        const mockClassSchedules = [
            { id: '1', subject: 'Math', startTime: '10:00', endTime: '11:00', day: 'Monday' }
        ];
        fetchClassScheduleData.mockResolvedValue(mockClassSchedules);

        await act(async () => {
            render(<Dashboard />);
        });

        await waitFor(() => {
            expect(screen.getByText('Math')).toBeInTheDocument();
        });
    });


});
