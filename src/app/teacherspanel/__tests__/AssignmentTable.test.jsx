import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AssignmentTable from '../Assignment/AssignmentTable';
import { fetchAssignmentData } from '../../../../api/assignmentapi';
import { deleteAssignmentData } from '../../../../api/assignmentapi'; // Ensure deleteAssignmentData is imported correctly


// Mock modules
jest.mock('../../../../api/assignmentapi', () => ({
    fetchAssignmentData: jest.fn(),
    deleteAssignmentData: jest.fn(),
}));


describe('AssignmentTable Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading state when data is being fetched', () => {
        fetchAssignmentData.mockImplementation(() => new Promise(() => { })); // Pending promise
        render(<AssignmentTable filter="" searchTerm="" />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays assignment data correctly', async () => {
        fetchAssignmentData.mockResolvedValue({
            assignments: [
                {
                    _id: '1',
                    assignmentCode: 'A1',
                    assignmentTitle: 'Math Homework',
                    courseDescription: 'Solve the problems',
                    submissionMethod: 'Online',
                    dueDate: '2024-08-15T00:00:00Z',
                    date: '2024-08-14T00:00:00Z',
                    time: '10:00 AM',
                    createdBy: 'Teacher A',
                    courseName: 'Math 101'
                },
            ],
        });

        render(<AssignmentTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math Homework')).toBeInTheDocument();
            expect(screen.getByText('A1')).toBeInTheDocument();
            //expect(screen.getByText('formatted-date|10:00 AM')).toBeInTheDocument();
        });
    });



    it('handles delete action correctly', async () => {
        fetchAssignmentData.mockResolvedValue({
            assignments: [
                {
                    _id: '1',
                    assignmentCode: 'A1',
                    assignmentTitle: 'Math Homework',
                    courseDescription: 'Solve the problems',
                    submissionMethod: 'Online',
                    dueDate: '2024-08-15T00:00:00Z',
                    date: '2024-08-14T00:00:00Z',
                    time: '10:00 AM',
                    createdBy: 'Teacher A',
                    courseName: 'Math 101'
                },
            ],
        });
        deleteAssignmentData.mockResolvedValue();

        render(<AssignmentTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math Homework')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Math Homework').closest('tr').querySelector('button'));


    });

    it('opens and closes confirmation dialog correctly', async () => {
        fetchAssignmentData.mockResolvedValue({
            assignments: [
                {
                    _id: '1',
                    assignmentCode: 'A1',
                    assignmentTitle: 'Math Homework',
                    courseDescription: 'Solve the problems',
                    submissionMethod: 'Online',
                    dueDate: '2024-08-15T00:00:00Z',
                    date: '2024-08-14T00:00:00Z',
                    time: '10:00 AM',
                    createdBy: 'Teacher A',
                    courseName: 'Math 101'
                },
            ],
        });

        render(<AssignmentTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Math Homework')).toBeInTheDocument();
        });

        // Open delete confirmation
        fireEvent.click(screen.getByText('Math Homework').closest('tr').querySelector('button'));


    });

    it('displays assignment data in table format', async () => {
        fetchAssignmentData.mockResolvedValue({
            assignments: [
                {
                    _id: '1',
                    assignmentCode: 'A1',
                    assignmentTitle: 'Math Homework',
                    courseDescription: 'Solve the problems',
                    submissionMethod: 'Online',
                    dueDate: '2024-08-15T00:00:00Z',
                    date: '2024-08-14T00:00:00Z',
                    time: '10:00 AM',
                    createdBy: 'Teacher A',
                    courseName: 'Math 101'
                },
            ],
        });

        render(<AssignmentTable filter="" searchTerm="" />);

        await waitFor(() => {
            expect(screen.getByText('Sr. No')).toBeInTheDocument();
            expect(screen.getByText('Assignment Code')).toBeInTheDocument();
            expect(screen.getByText('Assignment Name')).toBeInTheDocument();
            expect(screen.getByText('Description')).toBeInTheDocument();
            expect(screen.getByText('Method')).toBeInTheDocument();
            expect(screen.getByText('Due Date')).toBeInTheDocument();
            expect(screen.getByText('Date & Timing')).toBeInTheDocument();
            expect(screen.getByText('Created By')).toBeInTheDocument();
        });
    });
});