import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseTable from '../Course/CourseTable';
import { fetchCourseData, deleteCourseData } from '../../../../api/courseapi';


// Mock modules
jest.mock('../../../../api/courseapi', () => ({
    fetchCourseData: jest.fn(),
    deleteCourseData: jest.fn(),
}));



describe('CourseTable Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state when data is being fetched', () => {
        fetchCourseData.mockImplementation(() => new Promise(() => { })); // Pending promise
        render(<CourseTable filter="" searchTerm="" />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state if fetching data fails', async () => {
        fetchCourseData.mockRejectedValue(new Error('Failed to fetch'));
        render(<CourseTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
        });
    });

    it('displays course data correctly', async () => {
        fetchCourseData.mockResolvedValue({
            courses: [
                {
                    _id: '1',
                    courseName: 'Math 101',
                    courseCode: 'MTH101',
                    primaryInstructorname: 'Prof. A',
                    schedule: {
                        startDate: '2024-08-01',
                        endDate: '2024-12-15',
                        classTime: '10:00 AM',
                        classDays: ['Monday', 'Wednesday']
                    }
                },
            ],
        });

        render(<CourseTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math 101')).toBeInTheDocument();
            expect(screen.getByText('MTH101')).toBeInTheDocument();
            expect(screen.getByText('Prof. A')).toBeInTheDocument();
            expect(screen.getByText('2024-08-01')).toBeInTheDocument(); // For start date
            expect(screen.getByText('2024-12-15')).toBeInTheDocument(); // For end date
            expect(screen.getByText('10:00 AM')).toBeInTheDocument();
            expect(screen.getByText('Monday, Wednesday')).toBeInTheDocument();
        });
    });



    it('handles delete action correctly', async () => {
        fetchCourseData.mockResolvedValue({
            courses: [
                {
                    _id: '1',
                    courseName: 'Math 101',
                    courseCode: 'MTH101',
                    primaryInstructorname: 'Prof. A',
                    schedule: {
                        startDate: '2024-08-01T00:00:00Z',
                        endDate: '2024-12-15T00:00:00Z',
                        classTime: '10:00 AM',
                        classDays: ['Monday', 'Wednesday']
                    }
                },
            ],
        });
        deleteCourseData.mockResolvedValue();

        render(<CourseTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math 101')).toBeInTheDocument();
        });

        // Open delete confirmation
        fireEvent.click(screen.getByText('Math 101').closest('tr').querySelector('button'));


    });

    it('opens and closes confirmation dialog correctly', async () => {
        fetchCourseData.mockResolvedValue({
            courses: [
                {
                    _id: '1',
                    courseName: 'Math 101',
                    courseCode: 'MTH101',
                    primaryInstructorname: 'Prof. A',
                    schedule: {
                        startDate: '2024-08-01T00:00:00Z',
                        endDate: '2024-12-15T00:00:00Z',
                        classTime: '10:00 AM',
                        classDays: ['Monday', 'Wednesday']
                    }
                },
            ],
        });

        render(<CourseTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math 101')).toBeInTheDocument();
        });

        // Open delete confirmation
        fireEvent.click(screen.getByText('Math 101').closest('tr').querySelector('button'));

        expect(screen.getByText('Do you really want to delete this record?')).toBeInTheDocument();

        // Close confirmation dialog
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByText('Do you really want to delete this record?')).not.toBeInTheDocument();
    });

    it('displays course data in table format', async () => {
        fetchCourseData.mockResolvedValue({
            courses: [
                {
                    _id: '1',
                    courseName: 'Math 101',
                    courseCode: 'MTH101',
                    primaryInstructorname: 'Prof. A',
                    schedule: {
                        startDate: '2024-08-01T00:00:00Z',
                        endDate: '2024-12-15T00:00:00Z',
                        classTime: '10:00 AM',
                        classDays: ['Monday', 'Wednesday']
                    }
                },
            ],
        });

        render(<CourseTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Sr. No')).toBeInTheDocument();
            expect(screen.getByText('Course Name')).toBeInTheDocument();
            expect(screen.getByText('Course Code')).toBeInTheDocument();
            expect(screen.getByText('Instructor Name')).toBeInTheDocument();
            expect(screen.getByText('Start Date')).toBeInTheDocument();
            expect(screen.getByText('End Date')).toBeInTheDocument();
            expect(screen.getByText('Class Timing')).toBeInTheDocument();
            expect(screen.getByText('Class Days')).toBeInTheDocument();
        });
    });
});
