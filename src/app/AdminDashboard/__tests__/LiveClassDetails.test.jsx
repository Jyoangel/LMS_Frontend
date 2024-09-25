import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import CourseName from '../LiveClassScreen/CourseName/[id]/page';
import { fetchCourseById } from '../../../../api/courseapi';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// Mock fetchCourseById API function
jest.mock('../../../../api/courseapi', () => ({
    fetchCourseById: jest.fn(),
}));

// Mock next/router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('CourseName Component', () => {
    const mockRouter = {
        push: jest.fn(),
    };

    const mockCourse = {
        courseName: 'Math 101',
        courseCode: 'MTH101',
        courseDescription: 'Introduction to Mathematics',
        primaryInstructorname: 'John Doe',
        instructorEmail: 'john.doe@example.com',
        schedule: {
            startDate: '2024-08-10T00:00:00.000Z',
            endDate: '2024-12-15T00:00:00.000Z',
            classTime: '10:00 AM - 12:00 PM',
        },
        supplementaryMaterials: 'Textbook, Notes',
        courseObjectives: 'Understand basic mathematical concepts',
        onlineResources: 'https://mathresources.com',
    };

    beforeEach(() => {
        useRouter.mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render loading state initially', () => {
        render(<CourseName params={{ id: '1' }} />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render error message on API failure', async () => {
        fetchCourseById.mockRejectedValueOnce(new Error('Failed to fetch course'));

        render(<CourseName params={{ id: '1' }} />);

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch course')).toBeInTheDocument();
        });
    });

    it('should render no course data message if course is not found', async () => {
        fetchCourseById.mockResolvedValueOnce(null);

        render(<CourseName params={{ id: '1' }} />);

        await waitFor(() => {
            expect(screen.getByText('No course data found')).toBeInTheDocument();
        });
    });

    it('should render course details correctly', async () => {
        fetchCourseById.mockResolvedValueOnce(mockCourse);

        render(<CourseName params={{ id: '1' }} />);

        await waitFor(() => {
            expect(screen.getByText(mockCourse.courseName)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.courseCode)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.courseDescription)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.primaryInstructorname)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.instructorEmail)).toBeInTheDocument();
            expect(screen.getByText(format(new Date(mockCourse.schedule.startDate), 'yyyy-MM-dd'))).toBeInTheDocument();
            expect(screen.getByText(format(new Date(mockCourse.schedule.endDate), 'yyyy-MM-dd'))).toBeInTheDocument();
            expect(screen.getByText(mockCourse.schedule.classTime)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.supplementaryMaterials)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.courseObjectives)).toBeInTheDocument();
            expect(screen.getByText(mockCourse.onlineResources)).toBeInTheDocument();
        });
    });

    it('should navigate to Add Live Classes page on button click', async () => {
        fetchCourseById.mockResolvedValueOnce(mockCourse);

        render(<CourseName params={{ id: '1' }} />);

        await waitFor(() => {
            expect(screen.getByText(mockCourse.courseName)).toBeInTheDocument();
        });

        const addButton = screen.getByText('Add Live Classes');
        userEvent.click(addButton);



        expect(addButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/LiveClassScreen/AddLiveClasses/1');
    });

    it('should navigate back to LiveClassScreen on Back button click', async () => {
        fetchCourseById.mockResolvedValueOnce(mockCourse);

        render(<CourseName params={{ id: '1' }} />);

        await waitFor(() => {
            expect(screen.getByText(mockCourse.courseName)).toBeInTheDocument();
        });

        const backButton = screen.getByText('Back');
        userEvent.click(backButton);


        expect(backButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/LiveClassScreen');
    });
});
