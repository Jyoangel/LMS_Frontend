import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseManagementTable from '../LiveClassScreen/LiveClassTable'; // Adjust the path accordingly
import { fetchCourseData, deleteCourseData } from '../../../../api/courseapi';
import { deleteLiveClassData } from '../../../../api/liveclassapi';
import '@testing-library/jest-dom';

jest.mock('../../../../api/courseapi', () => ({
    fetchCourseData: jest.fn(),
    deleteCourseData: jest.fn(),
}));

jest.mock('../../../../api/liveclassapi', () => ({
    deleteLiveClassData: jest.fn(),
}));

describe('CourseManagementTable', () => {
    const mockCourses = [
        {
            _id: 'course1',
            courseName: 'Math 101',
            liveClasses: [
                {
                    _id: 'liveClass1',
                    topic: 'Algebra',
                    section: 'A',
                    liveRoom: 'Room 1',
                    date: '2023-08-01',
                    time: '10:00 AM',
                    assignTo: 'Teacher 1',
                },
            ],
        },
        {
            _id: 'course2',
            courseName: 'Science 101',
            liveClasses: [
                {
                    _id: 'liveClass2',
                    topic: 'Physics',
                    section: 'B',
                    liveRoom: 'Room 2',
                    date: '2023-08-02',
                    time: '11:00 AM',
                    assignTo: 'Teacher 2',
                },
            ],
        },
    ];

    beforeEach(() => {
        fetchCourseData.mockResolvedValue({ courses: mockCourses });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render without crashing', async () => {
        render(<CourseManagementTable />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Math 101')).toBeInTheDocument();
        expect(screen.getByText('Science 101')).toBeInTheDocument();
    });

    it('should display an error message if fetching data fails', async () => {
        fetchCourseData.mockRejectedValueOnce(new Error('Failed to fetch data'));
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Error: Failed to fetch data')).toBeInTheDocument();
    });

    it('should filter courses based on search term', async () => {
        render(<CourseManagementTable searchTerm="Math" />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));
        expect(screen.getByText('Math 101')).toBeInTheDocument();
        expect(screen.queryByText('Science 101')).not.toBeInTheDocument();
    });



    it('should delete a course and its associated live classes', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));

        fireEvent.click(screen.getAllByText('Delete')[0]);
        await waitFor(() => expect(deleteLiveClassData).toHaveBeenCalledWith('liveClass1'));




    });

    it('should call deleteLiveClassData when deleting a live class', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));

        fireEvent.click(screen.getAllByText('Delete')[0]);
        await waitFor(() => expect(deleteLiveClassData).toHaveBeenCalledWith('liveClass1'));

        expect(screen.queryByText('Algebra')).not.toBeInTheDocument();
    });



    it('should format the date correctly', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));
        expect(screen.getByText('08/01/2023')).toBeInTheDocument();
    });

    it('should display the correct data in the table', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));

        expect(screen.getByText('Math 101')).toBeInTheDocument();
        expect(screen.getByText('Algebra')).toBeInTheDocument();
        expect(screen.getByText('Room 1')).toBeInTheDocument();
        expect(screen.getByText('Teacher 1')).toBeInTheDocument();
    });

    it('should render Edit and Delete buttons for each live class', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));

        expect(screen.getAllByText('Edit').length).toBe(2);
        expect(screen.getAllByText('Delete').length).toBe(2);
    });

    it('should navigate to the correct edit page when Edit is clicked', async () => {
        render(<CourseManagementTable />);
        await waitFor(() => expect(fetchCourseData).toHaveBeenCalledTimes(1));

        const editButton = screen.getAllByText('Edit')[0];
        expect(editButton.closest('a')).toHaveAttribute('href', '/AdminDashboard/LiveClassScreen/UpdateLiveClasses/liveClass1');
    });


});
